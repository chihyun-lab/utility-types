/**
 * Function utility types
 * Provides advanced type-level operations for functions
 *
 * Note: ReturnType and Parameters are built-in TypeScript utility types
 * We use TypeScript's built-in versions for better compatibility
 */

/**
 * Extract the first parameter type from a function
 * @template T - The function type
 * @example
 * function test(name: string, age: number) {}
 * type FirstParam = FirstParameter<typeof test> // string
 */
export type FirstParameter<T extends (...args: any) => any> = T extends (
  arg: infer P,
  ...args: any[]
) => any
  ? P
  : never;

/**
 * Extract the last parameter type from a function
 * @template T - The function type
 * @example
 * function test(name: string, age: number) {}
 * type LastParam = LastParameter<typeof test> // number
 */
export type LastParameter<T extends (...args: any) => any> =
  Parameters<T> extends [...any[], infer P] ? P : never;

/**
 * Extract the resolved type from a Promise-returning function
 * @template T - The async function type
 * @example
 * async function fetchUser(): Promise<{ id: string }> {}
 * type User = PromiseReturnType<typeof fetchUser> // { id: string }
 */
export type PromiseReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : never;

// Async function type
export type AsyncFunction<T extends any[] = any[], R = any> = (
  ...args: T
) => Promise<R>;

// Curried function
export type Curry<T> = T extends (...args: infer Args) => infer Return
  ? Args extends [infer First, ...infer Rest]
    ? (
        arg: First
      ) => Rest extends [] ? Return : Curry<(...args: Rest) => Return>
    : Return
  : never;

// Function with specific arity
export type Arity1<T, R> = (arg: T) => R;
export type Arity2<T1, T2, R> = (arg1: T1, arg2: T2) => R;
export type Arity3<T1, T2, T3, R> = (arg1: T1, arg2: T2, arg3: T3) => R;

/**
 * Function that returns a boolean for a given input
 * @template T - The input type
 * @example
 * const isEven: Predicate<number> = (n) => n % 2 === 0
 */
export type Predicate<T> = (value: T) => boolean;

/**
 * Type guard function that narrows a type
 * @template T - The input type
 * @template U - The narrowed type (must extend T)
 * @example
 * const isString: TypePredicate<unknown, string> = (x): x is string => typeof x === 'string'
 */
export type TypePredicate<T, U extends T> = (value: T) => value is U;
