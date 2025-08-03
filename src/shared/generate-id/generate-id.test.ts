import { describe, it, expect } from 'vitest';
import { generateId } from './generate-id';

describe('generateId', () => {
  it('should require an object parameter', () => {
    // @ts-expect-error - should not accept non-object
    expect(() => generateId('string')).toThrow();
    
    // @ts-expect-error - should not accept null
    expect(() => generateId(null)).toThrow();
    
    // @ts-expect-error - should not accept undefined
    expect(() => generateId(undefined)).toThrow();
  });

  it('should generate deterministic IDs for same object', () => {
    const data = { name: 'John', age: 30, city: 'Amsterdam' };
    const id1 = generateId(data);
    const id2 = generateId(data);
    
    expect(id1).toBe(id2);
  });

  it('should handle any object shape', () => {
    const shapes = [
      {},
      { simple: 'value' },
      { nested: { deep: { value: 'test' } } },
      { array: [1, 2, 3], mixed: 'types' },
      { null: null, undefined: undefined, boolean: true },
      { special: 'José María', symbols: '!@#$%^&*()' }
    ];
    
    shapes.forEach(shape => {
      const id = generateId(shape);
      expect(id).toMatch(/^[a-f0-9]{8}$/);
    });
  });
});
