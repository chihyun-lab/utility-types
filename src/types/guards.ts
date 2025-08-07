export const isString = (value: unknown): value is string => typeof value === 'string';
export const isNumber = (value: unknown): value is number => typeof value === 'number' && !isNaN(value);
export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';
export const isNull = (value: unknown): value is null => value === null;
export const isUndefined = (value: unknown): value is undefined => value === undefined;
export const isNullish = (value: unknown): value is null | undefined => value == null;
export const isObject = (value: unknown): value is Record<string, unknown> => 
  value !== null && typeof value === 'object' && !Array.isArray(value);
export const isArray = (value: unknown): value is unknown[] => Array.isArray(value);
export const isFunction = (value: unknown): value is Function => typeof value === 'function';
export const isNonEmptyString = (value: unknown): value is string => 
  isString(value) && value.length > 0;
export const isNonEmptyArray = <T>(value: T[]): value is [T, ...T[]] => 
  Array.isArray(value) && value.length > 0;
export const hasProperty = <K extends string>(
  obj: unknown,
  key: K
): obj is Record<K, unknown> => 
  isObject(obj) && key in obj;
export const hasMethod = <K extends string>(
  obj: unknown,
  method: K
): obj is Record<K, Function> => 
  hasProperty(obj, method) && isFunction(obj[method]);
export function isInstanceOf<T>(
  constructor: new (...args: any[]) => T
): (value: unknown) => value is T {
  return (value: unknown): value is T => value instanceof constructor;
}
export function isOneOf<T extends readonly unknown[]>(
  ...values: T
): (value: unknown) => value is T[number] {
  return (value: unknown): value is T[number] => values.includes(value as any);
}

export function assertIsString(value: unknown): asserts value is string {
  if (!isString(value)) {
    throw new Error('Expected string');
  }
}

export function assertIsNumber(value: unknown): asserts value is number {
  if (!isNumber(value)) {
    throw new Error('Expected number');
  }
}

export function assertIsNonNull<T>(value: T | null | undefined): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error('Expected non-null value');
  }
}