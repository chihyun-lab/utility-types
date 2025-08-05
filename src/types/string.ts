// String manipulation utility types

// Capitalize first letter
export type Capitalize<S extends string> = S extends `${infer F}${infer R}` ? `${Uppercase<F>}${R}` : S;

// Uncapitalize first letter
export type Uncapitalize<S extends string> = S extends `${infer F}${infer R}` ? `${Lowercase<F>}${R}` : S;

// Replace string
export type Replace<S extends string, From extends string, To extends string> = 
  S extends `${infer Before}${From}${infer After}` ? `${Before}${To}${After}` : S;

// Replace all occurrences
export type ReplaceAll<S extends string, From extends string, To extends string> = 
  S extends `${infer Before}${From}${infer After}` 
    ? `${Before}${To}${ReplaceAll<After, From, To>}` 
    : S;

// Split string
export type Split<S extends string, D extends string> = 
  S extends `${infer T}${D}${infer U}` ? [T, ...Split<U, D>] : [S];

// Join array of strings
export type Join<T extends readonly string[], D extends string> = 
  T extends readonly [infer F, ...infer R]
    ? F extends string
      ? R extends readonly string[]
        ? R['length'] extends 0
          ? F
          : `${F}${D}${Join<R, D>}`
        : never
      : never
    : '';

// Trim whitespace
export type Trim<S extends string> = S extends ` ${infer Rest}` 
  ? Trim<Rest> 
  : S extends `${infer Rest} ` 
    ? Trim<Rest> 
    : S;

// String length
export type StringLength<S extends string, Count extends readonly any[] = []> = 
  S extends `${infer First}${infer Rest}` 
    ? StringLength<Rest, [...Count, First]> 
    : Count['length'];

// Reverse string
export type ReverseString<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${ReverseString<Rest>}${First}`
  : '';

// Check if string starts with
export type StartsWith<S extends string, T extends string> = S extends `${T}${any}` ? true : false;

// Check if string ends with
export type EndsWith<S extends string, T extends string> = S extends `${any}${T}` ? true : false;

// Extract template literal types
export type ExtractRouteParams<T extends string> = T extends `${infer _Start}:${infer Param}/${infer Rest}`
  ? Param | ExtractRouteParams<`/${Rest}`>
  : T extends `${infer _Start}:${infer Param}`
  ? Param
  : never;