# Advanced TypeScript Utility Types

[English](./README.md) | [한국어](./README.ko.md) | [中文](./README.zh.md) | [日本語](./README.ja.md)

A comprehensive collection of advanced TypeScript utility types for practical development use. This package provides a wide range of type-level utilities to enhance type safety and developer experience in TypeScript projects.

<div style="text-align: center;">
<a href="https://www.buymeacoffee.com/kelvinchihyun" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" alt="Buy Me A Coffee" style="height: 50px !important;width: 160px !important;" ></a>
</div>

## Installation

```bash
npm install advanced-ts-utility-types
```


## Type Categories

### Object Manipulation Types
- `DeepPartial<T>` - Makes all properties optional recursively
- `DeepRequired<T>` - Makes all properties required recursively
- `DeepReadonly<T>` - Makes all properties readonly recursively
- `PickByType<T, U>` - Pick properties by their value type
- `OmitByType<T, U>` - Omit properties by their value type
- `Merge<T, U>` - Merge two object types
- `OptionalKeys<T>` - Extract optional property keys
- `RequiredKeys<T>` - Extract required property keys

### Array Manipulation Types
- `ArrayElement<T>` - Extract array element type
- `NonEmptyArray<T>` - Array with at least one element
- `Head<T>` - First element of tuple
- `Tail<T>` - All elements except first
- `Last<T>` - Last element of tuple
- `Reverse<T>` - Reverse tuple order
- `FlattenArray<T>` - Flatten nested arrays
- `Includes<T, U>` - Check if array includes type

### Function Types
- `Parameters<T>` - Extract function parameters
- `FirstParameter<T>` - Extract first parameter
- `LastParameter<T>` - Extract last parameter
- `PromiseReturnType<T>` - Extract promise return type
- `Curry<T>` - Curried function type
- `Predicate<T>` - Boolean predicate function
- `TypePredicate<T, U>` - Type guard predicate

### String Manipulation Types
- `Capitalize<S>` - Capitalize first letter
- `Replace<S, From, To>` - Replace string pattern
- `ReplaceAll<S, From, To>` - Replace all occurrences
- `Split<S, D>` - Split string by delimiter
- `Join<T, D>` - Join string array with delimiter
- `Trim<S>` - Remove whitespace
- `StringLength<S>` - Get string length
- `StartsWith<S, T>` - Check if string starts with pattern
- `ExtractRouteParams<T>` - Extract route parameters

### Conditional Types
- `If<C, T, F>` - Conditional type selection
- `IsEqual<T, U>` - Check type equality
- `IsNever<T>` - Check if type is never
- `IsAny<T>` - Check if type is any
- `IsArray<T>` - Check if type is array
- `IsFunction<T>` - Check if type is function
- `NonNullish<T>` - Remove null and undefined
- `Maybe<T>` - Add null and undefined

### Branded Types
- `Brand<T, B>` - Create branded type
- `Opaque<T, B>` - Create opaque type
- Common branded types: `UserId`, `Email`, `URL`, `UUID`, `Timestamp`
- Validation helpers: `createUserId`, `createEmail`, `createURL`
- `UnBrand<T>` - Extract original type from branded type

### Type Guards and Predicates
Runtime type checking functions:
- `isString`, `isNumber`, `isBoolean`, `isNull`, `isUndefined`
- `isObject`, `isArray`, `isFunction`
- `isNonEmptyString`, `isNonEmptyArray`
- `hasProperty`, `hasMethod`
- `isInstanceOf`, `isOneOf`

Assertion functions:
- `assertIsString` - Assert value is string (throws if not)
- `assertIsNumber` - Assert value is number (throws if not)
- `assertIsNonNull` - Assert value is not null or undefined (throws if nullish)

## Usage

### Object Manipulation Types

```typescript
import { DeepPartial, DeepRequired, DeepReadonly, PickByType, OmitByType, Merge, OptionalKeys, RequiredKeys } from 'advanced-ts-utility-types';

interface User {
  id?: string;
  name: string;
  profile: {
    email?: string;
    age: number;
    settings: {
      theme: 'light' | 'dark';
      notifications?: boolean;
    };
  };
}

// DeepPartial - Makes all properties optional recursively
type PartialUser = DeepPartial<User>;
// Result: { id?: string; name?: string; profile?: { email?: string; age?: number; settings?: { theme?: 'light' | 'dark'; notifications?: boolean; }; }; }

// DeepRequired - Makes all properties required recursively
type RequiredUser = DeepRequired<User>;
// Result: { id: string; name: string; profile: { email: string; age: number; settings: { theme: 'light' | 'dark'; notifications: boolean; }; }; }

// DeepReadonly - Makes all properties readonly recursively
type ReadonlyUser = DeepReadonly<User>;
// Result: { readonly id?: string; readonly name: string; readonly profile: { readonly email?: string; readonly age: number; readonly settings: { readonly theme: 'light' | 'dark'; readonly notifications?: boolean; }; }; }

// PickByType - Pick properties by their value type
type StringProps = PickByType<User, string>; // { name: string }
type OptionalProps = PickByType<User, string | undefined>; // { id?: string }

// OmitByType - Omit properties by their value type
type NonStringProps = OmitByType<User, string>; // { profile: { ... } }

// Merge - Merge two object types
type UserWithExtra = Merge<User, { createdAt: Date; updatedAt: Date }>;
// Result: { id?: string; name: string; profile: { ... }; createdAt: Date; updatedAt: Date; }

// OptionalKeys - Extract optional property keys
type OptKeys = OptionalKeys<User>; // 'id'

// RequiredKeys - Extract required property keys  
type ReqKeys = RequiredKeys<User>; // 'name' | 'profile'
```

### Array Manipulation Types

```typescript
import { ArrayElement, NonEmptyArray, Head, Tail, Last, Reverse, FlattenArray, Includes } from 'advanced-ts-utility-types';

type Numbers = [1, 2, 3, 4, 5];
type Colors = ['red', 'green', 'blue'];
type NestedArray = [[1, 2], [3, [4, 5]], 6];

// ArrayElement - Extract array element type
type NumberArrayElement = ArrayElement<number[]>; // number
type ColorElement = ArrayElement<Colors>; // 'red' | 'green' | 'blue'

// NonEmptyArray - Array with at least one element
function processItems<T>(items: NonEmptyArray<T>) {
  const first = items[0]; // No undefined check needed
  return items.map(item => transform(item));
}

// Head - First element of tuple
type FirstColor = Head<Colors>; // 'red'
type FirstNumber = Head<Numbers>; // 1

// Tail - All elements except first
type RestColors = Tail<Colors>; // ['green', 'blue']
type RestNumbers = Tail<Numbers>; // [2, 3, 4, 5]

// Last - Last element of tuple
type LastColor = Last<Colors>; // 'blue'
type LastNumber = Last<Numbers>; // 5

// Reverse - Reverse tuple order
type ReversedColors = Reverse<Colors>; // ['blue', 'green', 'red']
type ReversedNumbers = Reverse<Numbers>; // [5, 4, 3, 2, 1]

// FlattenArray - Flatten nested arrays
type FlatArray = FlattenArray<NestedArray>; // [1, 2, 3, 4, 5, 6]

// Includes - Check if array includes type
type HasRed = Includes<Colors, 'red'>; // true
type HasYellow = Includes<Colors, 'yellow'>; // false
```

### Function Types

```typescript
import { Parameters, FirstParameter, LastParameter, PromiseReturnType, Curry, Predicate, TypePredicate } from 'advanced-ts-utility-types';

function fetchUser(id: string, options?: { includeProfile: boolean }, metadata?: Record<string, any>): Promise<User> {
  // implementation
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

// Parameters - Extract function parameters (built-in, but included for completeness)
type FetchParams = Parameters<typeof fetchUser>; // [string, { includeProfile: boolean }?, Record<string, any>?]

// FirstParameter - Extract first parameter
type FirstParam = FirstParameter<typeof fetchUser>; // string

// LastParameter - Extract last parameter
type LastParam = LastParameter<typeof fetchUser>; // Record<string, any> | undefined

// PromiseReturnType - Extract promise return type
type UserResult = PromiseReturnType<typeof fetchUser>; // User

// Curry - Curried function type
type CurriedFetch = Curry<typeof fetchUser>;
// Result: (id: string) => (options?: { includeProfile: boolean }) => (metadata?: Record<string, any>) => Promise<User>

// Predicate - Boolean predicate function
type StringPredicate = Predicate<string>; // (value: string) => boolean

// TypePredicate - Type guard predicate
type StringTypePredicate = TypePredicate<unknown, string>; // (value: unknown) => value is string
```

### String Manipulation Types

```typescript
import { Capitalize, Replace, ReplaceAll, Split, Join, Trim, StringLength, StartsWith, ExtractRouteParams } from 'advanced-ts-utility-types';

type Message = 'hello world';
type SpacedText = '  hello world  ';
type Route = '/api/users/:userId/posts/:postId';
type Words = ['hello', 'world'];

// Capitalize - Capitalize first letter (built-in, but enhanced)
type Capitalized = Capitalize<Message>; // 'Hello world'

// Replace - Replace string pattern
type Replaced = Replace<Message, 'world', 'TypeScript'>; // 'hello TypeScript'

// ReplaceAll - Replace all occurrences
type AllReplaced = ReplaceAll<'hello hello world', 'hello', 'hi'>; // 'hi hi world'

// Split - Split string by delimiter
type SplitWords = Split<Message, ' '>; // ['hello', 'world']
type SplitChars = Split<'abc', ''>; // ['a', 'b', 'c']

// Join - Join string array with delimiter
type Joined = Join<Words, ' '>; // 'hello world'
type JoinedWithDash = Join<Words, '-'>; // 'hello-world'

// Trim - Remove whitespace
type Trimmed = Trim<SpacedText>; // 'hello world'

// StringLength - Get string length
type Length = StringLength<Message>; // 11

// StartsWith - Check if string starts with pattern
type StartsWithHello = StartsWith<Message, 'hello'>; // true
type StartsWithWorld = StartsWith<Message, 'world'>; // false

// ExtractRouteParams - Extract route parameters
type RouteParams = ExtractRouteParams<Route>; // 'userId' | 'postId'
```

### Conditional Types

```typescript
import { If, IsEqual, IsNever, IsAny, IsArray, IsFunction, NonNullish, Maybe } from 'advanced-ts-utility-types';

type A = string;
type B = number;
type C = never;
type D = any;

// If - Conditional type selection
type Result1 = If<true, 'yes', 'no'>; // 'yes'
type Result2 = If<false, 'yes', 'no'>; // 'no'

// IsEqual - Check type equality
type Equal1 = IsEqual<string, string>; // true
type Equal2 = IsEqual<string, number>; // false

// IsNever - Check if type is never
type NeverCheck1 = IsNever<never>; // true
type NeverCheck2 = IsNever<string>; // false

// IsAny - Check if type is any
type AnyCheck1 = IsAny<any>; // true
type AnyCheck2 = IsAny<unknown>; // false

// IsArray - Check if type is array
type ArrayCheck1 = IsArray<string[]>; // true
type ArrayCheck2 = IsArray<string>; // false

// IsFunction - Check if type is function
type FunctionCheck1 = IsFunction<() => void>; // true
type FunctionCheck2 = IsFunction<string>; // false

// NonNullish - Remove null and undefined
type NonNull = NonNullish<string | null | undefined>; // string

// Maybe - Add null and undefined
type Nullable = Maybe<string>; // string | null | undefined
```

### Branded Types

```typescript
import { Brand, Opaque, UserId, Email, URL, UUID, Timestamp, createUserId, createEmail, createURL, UnBrand } from 'advanced-ts-utility-types';

// Brand - Create branded type
type ProductId = Brand<string, 'ProductId'>;
type Price = Brand<number, 'Price'>;

// Create branded values
const productId = 'prod-123' as ProductId;
const price = 29.99 as Price;

// Opaque - Create opaque type (similar to Brand but more restrictive)
type Token = Opaque<string, 'Token'>;
const token = 'abc123' as Token;

// Pre-defined branded types
const userId: UserId = createUserId('user-123');
const email: Email = createEmail('user@example.com');
const url: URL = createURL('https://example.com');
const uuid: UUID = 'f47ac10b-58cc-4372-a567-0e02b2c3d479' as UUID;
const timestamp: Timestamp = Date.now() as Timestamp;

// UnBrand - Extract original type from branded type
type OriginalUserId = UnBrand<UserId>; // string
type OriginalPrice = UnBrand<Price>; // number

// Usage in functions
function getProduct(id: ProductId): Product {
  // id is guaranteed to be a ProductId, not just any string
  return database.products.find(p => p.id === id);
}

function calculateTotal(price: Price, quantity: number): Price {
  return (price * quantity) as Price;
}
```

### Type Guards and Predicates

```typescript
import { 
  isString, isNumber, isBoolean, isNull, isUndefined, isNullish,
  isObject, isArray, isFunction, isNonEmptyString, isNonEmptyArray,
  hasProperty, hasMethod, isInstanceOf, isOneOf,
  assertIsString, assertIsNumber, assertIsNonNull
} from 'advanced-ts-utility-types';

// Basic type guards
function processValue(value: unknown) {
  if (isString(value)) {
    return value.toUpperCase(); // TypeScript knows value is string
  }
  if (isNumber(value)) {
    return value.toFixed(2); // TypeScript knows value is number
  }
  if (isArray(value)) {
    return value.length; // TypeScript knows value is array
  }
}

// Object property checks
function processUser(obj: unknown) {
  if (hasProperty(obj, 'name') && isString(obj.name)) {
    console.log(`User name: ${obj.name}`);
  }
  if (hasMethod(obj, 'getName')) {
    const name = obj.getName(); // TypeScript knows getName exists
  }
}

// Instance and value checks
const isDate = isInstanceOf(Date);
const isValidStatus = isOneOf('active', 'inactive', 'pending');

if (isDate(someValue)) {
  console.log(someValue.getFullYear()); // TypeScript knows it's a Date
}

if (isValidStatus(status)) {
  // TypeScript knows status is 'active' | 'inactive' | 'pending'
  console.log(`Status: ${status}`);
}

// Assertion functions
function validateInput(data: unknown) {
  assertIsString(data); // Throws if not string
  return data.trim(); // TypeScript knows data is string
}

function processUser(user: User | null) {
  assertIsNonNull(user); // Throws if null/undefined
  return user.profile.name; // TypeScript knows user is User
}

// Non-empty checks
function processItems(items: unknown[]) {
  if (isNonEmptyArray(items)) {
    const first = items[0]; // No undefined check needed
    return items.map(item => process(item));
  }
}

function processText(text: string) {
  if (isNonEmptyString(text)) {
    return text.charAt(0); // TypeScript knows string is not empty
  }
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT