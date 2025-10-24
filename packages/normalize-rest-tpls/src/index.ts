// src/ApiResourceNormalizer.ts
// AI: https://chat.qwen.ai/c/8b7d2be1-4daf-4b0a-b3da-3397efb33fd3

import type {
  TemplateType,
  ResourceInput,
  NormalizedOutput,
  BuiltInTemplate,
  TemplateMap,
  ResourceConfig,
  TemplateEntry,
  HttpMethod
} from './types';
import { TEMPLATE_HOOKS } from './templates';
import { parseNameInput } from './utils';

const STD_KEYS = ['index', 'show', 'create', 'update', 'destroy'] as const;

export class ApiResourceNormalizer {
  private templates: TemplateMap;
  private isBuiltIn: boolean;
  private builtInType: BuiltInTemplate | null;

  constructor(template: TemplateType = 'rails') {
    this.isBuiltIn = typeof template === 'string';
    this.builtInType =
      this.isBuiltIn && (template === 'rails' || template === 'postify') ? template : null;

    if (this.builtInType) {
      this.templates = TEMPLATE_HOOKS[this.builtInType];
    } else if (template && typeof template === 'object') {
      this.templates = template;
    } else {
      this.templates = TEMPLATE_HOOKS.rails;
    }
  }

  /**
   * 获取某个动作的模板，内置模板支持自动推导自定义动作（member 路由）
   */
  private getTemplateForAction(action: string): readonly [string, string] | undefined {
    if (this.templates[action]) {
      return this.templates[action];
    }

    // 仅内置模板（rails/postify）支持自动推导自定义动作
    if (this.isBuiltIn) {
      return ['post', `@/{id}/${action}`] as const;
    }

    return undefined;
  }

  /**
   * 标准化资源列表，返回扁平化的 items 对象
   */
  normalize(resources: ResourceInput[] | null | undefined): NormalizedOutput {
    if (!resources?.length) {
      return { items: {} };
    }

    // ✅ 显式声明类型
    const allItems: Record<string, TemplateEntry> = {};

    for (const input of resources) {
      const config = this.normalizeToConfig(input);
      if (!config.name) continue;

      const { nameSnakeCase, actualResourceName, subpath } = parseNameInput(
        config.name,
        config.subpath,
        config.resName
      );
      // 显式声明为 string[]，因为动作可能包含自定义字符串
      let actions: string[] = [...STD_KEYS];

      if (config.only?.length) {
        if (config.only.includes('*')) {
          const extras = config.only.filter((x) => x !== '*');
          actions = [...STD_KEYS, ...extras];
        } else {
          actions = [...config.only]; // config.only 是 string[]，现在可以赋值
        }
      }

      if (config.except?.length) {
        actions = actions.filter((a) => !config.except!.includes(a));
      }

      if (config.except?.length) {
        actions = actions.filter((a) => !config.except!.includes(a));
      }

      // 生成路由项
      for (const action of actions) {
        const template = this.getTemplateForAction(action);
        if (!template) continue;

        const [method, pathTemplate] = template;
        const basePath =
          subpath === '/' ? `/${actualResourceName}` : `${subpath}/${actualResourceName}`;
        let finalPath = pathTemplate.replace('@', basePath).replace(/^\/+/, '/');

        const key = `${nameSnakeCase}_${action}`;
        allItems[key] = [method as HttpMethod, finalPath];
      }
    }

    return { items: allItems };
  }

  /**
   * 将任意 ResourceInput 转为统一 ResourceConfig
   */
  private normalizeToConfig(
    input: ResourceInput
  ): Required<Pick<ResourceConfig, 'name'>> & Partial<ResourceConfig> {
    if (typeof input === 'string' || Array.isArray(input)) {
      return { name: input };
    }
    return input as any;
  }
}

export default ApiResourceNormalizer;
