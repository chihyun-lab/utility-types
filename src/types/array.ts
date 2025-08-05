/**
 * Array utility types
 * Provides advanced type-level operations for arrays and tuples
 */

/**
 * Extract the element type from an array type
 * @template ArrayType - The array type to extract from
 * @example
 * type StringArray = string[]
 * type Element = ArrayElement<StringArray> // string
 */
export type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

/**
 * Array type that ensures at least one element
 * @template T - The element type
 * @example
 * function process(items: NonEmptyArray<string>) {
 *   const first = items[0] // guaranteed to exist
 * }
 */
export type NonEmptyArray<T> = [T, ...T[]];

/**
 * Extract the first element type from a tuple
 * @template T - The tuple type
 * @example
 * type Colors = ['red', 'green', 'blue']
 * type FirstColor = Head<Colors> // 'red'
 */
export type Head<T extends readonly any[]> = T extends readonly [infer H, ...any[]] ? H : never;

/**
 * Extract all elements except the first from a tuple
 * @template T - The tuple type
 * @example
 * type Colors = ['red', 'green', 'blue']
 * type RestColors = Tail<Colors> // ['green', 'blue']
 */
export type Tail<T extends readonly any[]> = T extends readonly [any, ...infer Rest] ? Rest : [];

/**
 * Extract the last element type from a tuple
 * @template T - The tuple type
 * @example
 * type Colors = ['red', 'green', 'blue']
 * type LastColor = Last<Colors> // 'blue'
 */
export type Last<T extends readonly any[]> = T extends readonly [...any[], infer L] ? L : never;

// Length of tuple
export type Length<T extends readonly any[]> = T['length'];

// Reverse array
export type Reverse<T extends readonly any[]> = T extends readonly [...infer Rest, infer Last]
  ? [Last, ...Reverse<Rest>]
  : [];

// Flatten array
export type FlattenArray<T extends readonly any[]> = T extends readonly [infer First, ...infer Rest]
  ? First extends readonly any[]
    ? [...FlattenArray<First>, ...FlattenArray<Rest>]
    : [First, ...FlattenArray<Rest>]
  : [];

// Zip two arrays
export type Zip<T extends readonly any[], U extends readonly any[]> = T extends readonly [infer T1, ...infer TRest]
  ? U extends readonly [infer U1, ...infer URest]
    ? [[T1, U1], ...Zip<TRest, URest>]
    : []
  : [];

// Includes type in array
export type Includes<T extends readonly any[], U> = T extends readonly [infer First, ...infer Rest]
  ? First extends U
    ? true
    : Includes<Rest, U>
  : false;