// src/templates.ts

import type { TemplateMap } from './types';

export const RAILS_TEMPLATES: TemplateMap = {
  index: ['get', '@'] as const,
  show: ['get', '@/{id}'] as const,
  create: ['post', '@'] as const,
  update: ['put', '@/{id}'] as const,
  destroy: ['delete', '@/{id}'] as const
};

export const POSTIFY_TEMPLATES: TemplateMap = {
  index: ['post', '@/page'] as const,
  show: ['post', '@/editInit'] as const,
  create: ['post', '@/add'] as const,
  update: ['post', '@/edit'] as const,
  destroy: ['post', '@/delete'] as const
};

export const TEMPLATE_HOOKS = {
  rails: RAILS_TEMPLATES,
  postify: POSTIFY_TEMPLATES
} as const;
