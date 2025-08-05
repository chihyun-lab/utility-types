// Function utility types

// Extract return type from function
export type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

// Extract parameters from function
export type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

// Extract first parameter
export type FirstParameter<T extends (...args: any) => any> = T extends (arg: infer P, ...args: any[]) => any ? P : never;

// Extract last parameter
export type LastParameter<T extends (...args: any) => any> = T extends (...args: [...any[], infer P]) => any ? P : never;

// Promise return type
export type PromiseReturnType<T extends (...args: any) => Promise<any>> = T extends (...args: any) => Promise<infer R> ? R : never;

// Async function type
export type AsyncFunction<T extends any[] = any[], R = any> = (...args: T) => Promise<R>;

// Curried function
export type Curry<T> = T extends (...args: infer Args) => infer Return
  ? Args extends [infer First, ...infer Rest]
    ? (arg: First) => Rest extends []
      ? Return
      : Curry<(...args: Rest) => Return>
    : Return
  : never;

// Function with specific arity
export type Arity1<T, R> = (arg: T) => R;
export type Arity2<T1, T2, R> = (arg1: T1, arg2: T2) => R;
export type Arity3<T1, T2, T3, R> = (arg1: T1, arg2: T2, arg3: T3) => R;

// Predicate function
export type Predicate<T> = (value: T) => boolean;

// Type predicate function
export type TypePredicate<T, U extends T> = (value: T) => value is U;