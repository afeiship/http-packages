import type { ResourceNameInput } from './types';

export function toSnakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1_$2')
    .toLowerCase()
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');
}

interface ParsedName {
  nameSnakeCase: string;
  actualResourceName: string;
  subpath: string;
}

/**
 * 解析资源名称输入，支持字符串、路径、元组，并可被 subpath/resName 覆盖
 */
export function parseNameInput(
  nameInput: ResourceNameInput,
  explicitSubpath?: string,
  explicitResName?: string
): ParsedName {
  let actualPath: string;
  let nameSnakeCase: string;

  if (Array.isArray(nameInput)) {
    nameSnakeCase = nameInput[0];
    actualPath = nameInput[1];
  } else if (nameInput.startsWith('/')) {
    actualPath = nameInput;
    const segments = actualPath.split('/').filter(Boolean);
    const rawName = segments.pop() || '';
    nameSnakeCase = toSnakeCase(rawName);
  } else {
    actualPath = '/' + nameInput;
    nameSnakeCase = toSnakeCase(nameInput);
  }

  // 如果显式指定了 subpath 或 resName，则覆盖自动解析
  if (explicitSubpath !== undefined || explicitResName !== undefined) {
    const subpath = explicitSubpath ?? (actualPath.substring(0, actualPath.lastIndexOf('/')) || '');
    const actualResourceName = explicitResName ?? nameInput;
    return {
      nameSnakeCase,
      actualResourceName: String(actualResourceName),
      subpath: subpath || '/'
    };
  }

  // 否则从路径自动解析
  const pathSegments = actualPath.split('/').filter(Boolean);
  const actualResourceName = pathSegments.pop() || '';
  const subpath = '/' + pathSegments.join('/');

  return {
    nameSnakeCase,
    actualResourceName,
    subpath: subpath || '/'
  };
}
