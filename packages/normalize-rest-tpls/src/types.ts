// src/types.ts

export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';
export type TemplateEntry = readonly [HttpMethod, string];
export type TemplateMap = Record<string, TemplateEntry>;

export type BuiltInTemplate = 'rails' | 'postify';
export type TemplateType = BuiltInTemplate | TemplateMap | undefined;

export type ResourceNameInput = string | [string, string];

export interface ResourceConfig {
  name?: ResourceNameInput;
  prefix?: string;
  suffix?: string;
  only?: readonly string[];
  except?: readonly string[];
  subpath?: string; // 显式父路径
  resName?: string; // 显式资源名（替代 resourceName）
  [key: string]: any;
}

export type ResourceInput = ResourceNameInput | ResourceConfig;

export interface NormalizedOutput {
  items: Record<string, TemplateEntry>;
}
