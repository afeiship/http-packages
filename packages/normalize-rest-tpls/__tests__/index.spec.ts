import { ApiResourceNormalizer } from '../src';

describe('ApiResourceNormalizer', () => {
  // Test case 1: Default 'rails' template
  test('should normalize resources with default rails template', () => {
    const normalizer = new ApiResourceNormalizer();
    const resources = ['users', 'posts'];
    const normalized = normalizer.normalize(resources);
    expect(normalized).toEqual({
      items: {
        users_index: ['get', '/users'],
        users_show: ['get', '/users/{id}'],
        users_create: ['post', '/users'],
        users_update: ['put', '/users/{id}'],
        users_destroy: ['delete', '/users/{id}'],
        posts_index: ['get', '/posts'],
        posts_show: ['get', '/posts/{id}'],
        posts_create: ['post', '/posts'],
        posts_update: ['put', '/posts/{id}'],
        posts_destroy: ['delete', '/posts/{id}'],
      },
    });
  });

  // Test case 2: 'postify' template
  test('should normalize resources with postify template', () => {
    const normalizer = new ApiResourceNormalizer('postify');
    const resources = ['comments'];
    const normalized = normalizer.normalize(resources);
    expect(normalized).toEqual({
      items: {
        comments_index: ['post', '/comments/page'],
        comments_show: ['post', '/comments/editInit'],
        comments_create: ['post', '/comments/add'],
        comments_update: ['post', '/comments/edit'],
        comments_destroy: ['post', '/comments/delete'],
      },
    });
  });

  // Test case 3: Custom template
  test('should normalize resources with a custom template', () => {
    const customTemplate = {
      list: ['get', '/api/@'],
      add: ['post', '/api/@'],
    } as any;
    const normalizer = new ApiResourceNormalizer(customTemplate);
    const resources = ['products'];
    const normalized = normalizer.normalize(resources);
    expect(normalized).toEqual({
      items: {
        products_list: ['get', '/api/products'],
        products_add: ['post', '/api/products'],
      },
    });
  });

  // Test case 4: Empty resources array
  test('should return empty items for empty resources array', () => {
    const normalizer = new ApiResourceNormalizer();
    const resources: string[] = [];
    const normalized = normalizer.normalize(resources);
    expect(normalized).toEqual({ items: {} });
  });

  // Test case 5: Null or undefined resources
  test('should return empty items for null or undefined resources', () => {
    const normalizer = new ApiResourceNormalizer();
    expect(normalizer.normalize(null)).toEqual({ items: {} });
    expect(normalizer.normalize(undefined)).toEqual({ items: {} });
  });

  // Test case 6: Resource with 'only' option
  test('should filter actions based on only option', () => {
    const normalizer = new ApiResourceNormalizer();
    const resources = [{ name: 'users', only: ['index', 'show'] }];
    const normalized = normalizer.normalize(resources);
    expect(normalized).toEqual({
      items: {
        users_index: ['get', '/users'],
        users_show: ['get', '/users/{id}'],
      },
    });
  });

  // Test case 7: Resource with 'except' option
  test('should filter actions based on except option', () => {
    const normalizer = new ApiResourceNormalizer();
    const resources = [{ name: 'posts', except: ['create', 'destroy'] }];
    const normalized = normalizer.normalize(resources);
    expect(normalized).toEqual({
      items: {
        posts_index: ['get', '/posts'],
        posts_show: ['get', '/posts/{id}'],
        posts_update: ['put', '/posts/{id}'],
      },
    });
  });

  // Test case 8: Resource with 'only' and custom actions
  test('should include custom actions when only contains *', () => {
    const normalizer = new ApiResourceNormalizer();
    const resources = [{ name: 'products', only: ['*', 'archive'] }];
    const normalized = normalizer.normalize(resources);
    expect(normalized.items).toHaveProperty('products_archive');
    expect(normalized.items.products_archive).toEqual(['post', '/products/{id}/archive']);
    expect(normalized.items).toHaveProperty('products_index');
  });

  // Test case 9: Resource with subpath
  test('should apply subpath correctly', () => {
    const normalizer = new ApiResourceNormalizer();
    const resources = [{ name: 'items', subpath: '/admin' }] as any;
    const normalized = normalizer.normalize(resources);
    expect(normalized.items.items_index).toEqual(['get', '/admin/items']);
    expect(normalized.items.items_show).toEqual(['get', '/admin/items/{id}']);
  });

  // Test case 10: Resource with resName
  test('should apply resName correctly', () => {
    const normalizer = new ApiResourceNormalizer();
    const resources = [{ name: 'users', resName: 'members' }];
    const normalized = normalizer.normalize(resources);
    expect(normalized.items.users_index).toEqual(['get', '/members']);
    expect(normalized.items.users_show).toEqual(['get', '/members/{id}']);
  });

  // Test case 11: Resource with array name input and subpath/resName
  test('should handle array name input with subpath and resName', () => {
    const normalizer = new ApiResourceNormalizer();
    const resources = [
      { name: ['products', '/api/v1/goods'], subpath: '/shop', resName: 'merchandise' }
    ] as any;
    const normalized = normalizer.normalize(resources);
    expect(normalized.items.products_index).toEqual(['get', '/shop/merchandise']);
    expect(normalized.items.products_show).toEqual(['get', '/shop/merchandise/{id}']);
  });

  // Test case 12: Resource with name starting with '/' and explicit subpath/resName
  test('should handle name starting with / with explicit subpath and resName', () => {
    const normalizer = new ApiResourceNormalizer();
    const resources = [{ name: '/api/v2/items', subpath: '/data', resName: 'elements' }];
    const normalized = normalizer.normalize(resources);
    expect(normalized.items.items_index).toEqual(['get', '/data/elements']);
    expect(normalized.items.items_show).toEqual(['get', '/data/elements/{id}']);
  });

  // Test case 13: Resource with name starting with '/' and no explicit subpath/resName
  test('should handle name starting with / without explicit subpath and resName', () => {
    const normalizer = new ApiResourceNormalizer();
    const resources = [{ name: '/api/v3/widgets' }];
    const normalized = normalizer.normalize(resources);
    expect(normalized.items.widgets_index).toEqual(['get', '/api/v3/widgets']);
    expect(normalized.items.widgets_show).toEqual(['get', '/api/v3/widgets/{id}']);
  });

  // Test case 14: Resource with name as string and explicit subpath/resName
  test('should handle name as string with explicit subpath and resName', () => {
    const normalizer = new ApiResourceNormalizer();
    const resources = [{ name: 'books', subpath: '/library', resName: 'volumes' }];
    const normalized = normalizer.normalize(resources);
    expect(normalized.items.books_index).toEqual(['get', '/library/volumes']);
    expect(normalized.items.books_show).toEqual(['get', '/library/volumes/{id}']);
  });

  // Test case 15: Resource with name as string and no explicit subpath/resName
  test('should handle name as string without explicit subpath and resName', () => {
    const normalizer = new ApiResourceNormalizer();
    const resources = [{ name: 'authors' }];
    const normalized = normalizer.normalize(resources);
    expect(normalized.items.authors_index).toEqual(['get', '/authors']);
    expect(normalized.items.authors_show).toEqual(['get', '/authors/{id}']);
  });

  // Test case 16: Multiple resources with mixed configurations
  test('should handle multiple resources with mixed configurations', () => {
    const normalizer = new ApiResourceNormalizer();
    const resources = [
      { name: 'users', only: ['index'] },
      { name: 'posts', except: ['destroy'], subpath: '/blog' },
      { name: ['comments', '/feedback'], resName: 'feedback' },
    ] as any;
    const normalized = normalizer.normalize(resources);
    expect(normalized).toEqual({
      items: {
        users_index: ['get', '/users'],
        posts_index: ['get', '/blog/posts'],
        posts_show: ['get', '/blog/posts/{id}'],
        posts_create: ['post', '/blog/posts'],
        posts_update: ['put', '/blog/posts/{id}'],
        comments_index: ['get', '/feedback'],
        comments_show: ['get', '/feedback/{id}'],
        comments_create: ['post', '/feedback'],
        comments_update: ['put', '/feedback/{id}'],
        comments_destroy: ['delete', '/feedback/{id}'],
      },
    });
  });

  // Test case 17: Custom template with dynamic path segments
  test('should handle custom template with dynamic path segments', () => {
    const customTemplate = {
      search: ['get', '/find/@/query/:queryId'],
    } as any;
    const normalizer = new ApiResourceNormalizer(customTemplate);
    const resources = [{ name: 'products' }];
    const normalized = normalizer.normalize(resources);
    expect(normalized).toEqual({
      items: {
        products_search: ['get', '/find/products/query/:queryId'],
      },
    });
  });

  // Test case 19: Resource name with multiple slashes
  test('should handle resource names with multiple slashes in path', () => {
    const normalizer = new ApiResourceNormalizer();
    const resources = [{ name: '/api//v1///users' }];
    const normalized = normalizer.normalize(resources);
    expect(normalized.items.users_index).toEqual(['get', '/api/v1/users']);
  });

  // Test case 20: Resource with only '*' and no extra actions
  test('should include all standard actions when only contains * and no extras', () => {
    const normalizer = new ApiResourceNormalizer();
    const resources = [{ name: 'widgets', only: ['*'] }];
    const normalized = normalizer.normalize(resources);
    expect(Object.keys(normalized.items).length).toBe(5); // STD_KEYS length
    expect(normalized.items).toHaveProperty('widgets_index');
    expect(normalized.items).toHaveProperty('widgets_show');
    expect(normalized.items).toHaveProperty('widgets_create');
    expect(normalized.items).toHaveProperty('widgets_update');
    expect(normalized.items).toHaveProperty('widgets_destroy');
  });

  // Test case 22: Resource with only '*' and some extra actions, with built-in template
  test('should auto-infer custom actions with built-in template when only contains *', () => {
    const normalizer = new ApiResourceNormalizer('rails');
    const resources = [{ name: 'items', only: ['*', 'activate'] }];
    const normalized = normalizer.normalize(resources);
    expect(normalized.items).toHaveProperty('items_activate');
    expect(normalized.items.items_activate).toEqual(['post', '/items/{id}/activate']);
    expect(normalized.items).toHaveProperty('items_index');
  });

  // Test case 26: Resource with name as array, first element valid, second element invalid path
  test('should handle array name input with valid name and invalid path', () => {
    const normalizer = new ApiResourceNormalizer();
    const resources = [{ name: ['reports', 'invalid-path'] }] as any;
    const normalized = normalizer.normalize(resources);
    expect(normalized.items.reports_index).toEqual(['get', '/invalid-path']);
  });

  // Test case 27: Resource with name as array, first element valid, second element valid path
  test('should handle array name input with valid name and valid path', () => {
    const normalizer = new ApiResourceNormalizer();
    const resources = [{ name: ['analytics', '/data/analytics'] }] as any;
    const normalized = normalizer.normalize(resources);
    expect(normalized.items.analytics_index).toEqual(['get', '/data/analytics']);
  });

  // Test case 28: Resource with prefix and suffix
  test('should apply prefix and suffix correctly to generated keys', () => {
    const normalizer = new ApiResourceNormalizer();
    const resources = [{ name: 'products', prefix: 'api_', suffix: '_v1' }];
    const normalized = normalizer.normalize(resources);
    expect(normalized.items).toHaveProperty('api_products_index_v1');
    expect(normalized.items.api_products_index_v1).toEqual(['get', '/products']);
    expect(normalized.items).toHaveProperty('api_products_show_v1');
    expect(normalized.items.api_products_show_v1).toEqual(['get', '/products/{id}']);
  });
});