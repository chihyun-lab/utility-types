/**
 * Deep utility types for object manipulation
 * Provides advanced type-level operations for objects
 */

/**
 * Makes all properties optional recursively
 * @template T - The type to make deeply partial
 * @example
 * type User = { profile: { name: string; email: string } }
 * type PartialUser = DeepPartial<User> // { profile?: { name?: string; email?: string } }
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Makes all properties required recursively
 * @template T - The type to make deeply required
 * @example
 * type PartialUser = { profile?: { name?: string } }
 * type RequiredUser = DeepRequired<PartialUser> // { profile: { name: string } }
 */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

/**
 * Makes all properties readonly recursively
 * @template T - The type to make deeply readonly
 * @example
 * type User = { profile: { name: string } }
 * type ReadonlyUser = DeepReadonly<User> // { readonly profile: { readonly name: string } }
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/**
 * Pick properties by their value type
 * @template T - The source object type
 * @template U - The value type to pick by
 * @example
 * type Mixed = { a: string; b: number; c: string }
 * type StringProps = PickByType<Mixed, string> // { a: string; c: string }
 */
export type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

/**
 * Omit properties by their value type
 * @template T - The source object type
 * @template U - The value type to omit by
 * @example
 * type Mixed = { a: string; b: number; c: string }
 * type NonStringProps = OmitByType<Mixed, string> // { b: number }
 */
export type OmitByType<T, U> = {
  [K in keyof T as T[K] extends U ? never : K]: T[K];
};

// Merge two types
export type Merge<T, U> = {
  [K in keyof T | keyof U]: K extends keyof U ? U[K] : K extends keyof T ? T[K] : never;
};

// Optional keys
export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

// Required keys
export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

// Flatten nested object types
export type Flatten<T> = T extends object
  ? T extends any[]
    ? T
    : { [K in keyof T]: Flatten<T[K]> }
  : T;