# Advanced TypeScript Utility Types

[English](./README.md) | [한국어](./README.ko.md) | [中文](./README.zh.md) | [日本語](./README.ja.md)

A comprehensive collection of advanced TypeScript utility types for practical development use. This package provides a wide range of type-level utilities to enhance type safety and developer experience in TypeScript projects.

## Installation

```bash
npm install advanced-ts-utility-types
```

## Usage

```typescript
import { DeepPartial, NonEmptyArray, Brand } from 'utility-types';

// Deep partial example
interface User {
  id: string;
  profile: {
    name: string;
    email: string;
    settings: {
      theme: 'light' | 'dark';
      notifications: boolean;
    };
  };
}

type PartialUser = DeepPartial<User>; // All properties optional recursively

// Non-empty array example
function processItems<T>(items: NonEmptyArray<T>) {
  // TypeScript knows items has at least one element
  const first = items[0]; // No undefined check needed
  return items.map(item => transform(item));
}

// Branded types example
type UserId = Brand<string, 'UserId'>;
const userId: UserId = createUserId('user-123');
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
- `assertIsString`, `assertIsNumber`, `assertIsNonNull`

## Examples

### Object Types
```typescript
interface Config {
  database: {
    host: string;
    port: number;
    ssl: {
      enabled: boolean;
      cert: string;
    };
  };
}

// All properties become optional
type PartialConfig = DeepPartial<Config>;

// Pick only string properties
type StringProps = PickByType<Config['database'], string>; // { host: string }
```

### Array Types
```typescript
type Colors = ['red', 'green', 'blue'];
type FirstColor = Head<Colors>; // 'red'
type RestColors = Tail<Colors>; // ['green', 'blue']
type LastColor = Last<Colors>; // 'blue'
type ReversedColors = Reverse<Colors>; // ['blue', 'green', 'red']
```

### String Types
```typescript
type Route = '/api/users/:userId/posts/:postId';
type Params = ExtractRouteParams<Route>; // 'userId' | 'postId'

type Message = 'Hello World';
type Shouting = Uppercase<Message>; // 'HELLO WORLD'
type Words = Split<Message, ' '>; // ['Hello', 'World']
```

### Function Types
```typescript
function fetchUser(id: string, options?: { includeProfile: boolean }): Promise<User> {
  // implementation
}

type UserFetchParams = Parameters<typeof fetchUser>; // [string, { includeProfile: boolean }?]
type UserResult = PromiseReturnType<typeof fetchUser>; // User
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT