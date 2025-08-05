// Conditional utility types

// If-else type
export type If<C extends boolean, T, F> = C extends true ? T : F;

// Not type
export type Not<T extends boolean> = T extends true ? false : true;

// And type
export type And<A extends boolean, B extends boolean> = A extends true ? B : false;

// Or type
export type Or<A extends boolean, B extends boolean> = A extends true ? true : B;

// IsEqual type
export type IsEqual<T, U> = [T] extends [U] ? [U] extends [T] ? true : false : false;

// IsNever type
export type IsNever<T> = [T] extends [never] ? true : false;

// IsAny type
export type IsAny<T> = 0 extends 1 & T ? true : false;

// IsUnknown type
export type IsUnknown<T> = IsAny<T> extends true ? false : unknown extends T ? true : false;

// IsArray type
export type IsArray<T> = T extends readonly any[] ? true : false;

// IsFunction type
export type IsFunction<T> = T extends (...args: any[]) => any ? true : false;

// IsObject type
export type IsObject<T> = T extends object ? T extends any[] ? false : true : false;

// IsPrimitive type
export type IsPrimitive<T> = T extends string | number | boolean | null | undefined | symbol | bigint ? true : false;

// NonNullable enhanced
export type NonNullish<T> = T extends null | undefined ? never : T;

// Nullable type
export type Nullable<T> = T | null;

// Optional type
export type Optional<T> = T | undefined;

// Maybe type (both null and undefined)
export type Maybe<T> = T | null | undefined;