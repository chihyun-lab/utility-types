# 高级 TypeScript 实用类型

[English](./README.md) | [한국어](./README.ko.md) | [中文](./README.zh.md) | [日本語](./README.ja.md)

用于实际开发的全面高级 TypeScript 实用类型集合。此包提供了广泛的类型级实用工具，以增强 TypeScript 项目中的类型安全性和开发者体验。

<div style="text-align: center;">
<a href="https://www.buymeacoffee.com/kelvinchihyun" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" alt="Buy Me A Coffee" style="height: 50px !important;width: 160px !important;" ></a>
</div>

## 安装

```bash
npm install advanced-ts-utility-types
```


## 类型分类

### 对象操作类型
- `DeepPartial<T>` - 递归地使所有属性变为可选
- `DeepRequired<T>` - 递归地使所有属性变为必需
- `DeepReadonly<T>` - 递归地使所有属性变为只读
- `PickByType<T, U>` - 根据值类型选择属性
- `OmitByType<T, U>` - 根据值类型排除属性
- `Merge<T, U>` - 合并两个对象类型
- `OptionalKeys<T>` - 提取可选属性键
- `RequiredKeys<T>` - 提取必需属性键

### 数组操作类型
- `ArrayElement<T>` - 提取数组元素类型
- `NonEmptyArray<T>` - 至少有一个元素的数组
- `Head<T>` - 元组的第一个元素
- `Tail<T>` - 除第一个外的所有元素
- `Last<T>` - 元组的最后一个元素
- `Reverse<T>` - 反转元组顺序
- `FlattenArray<T>` - 展平嵌套数组
- `Includes<T, U>` - 检查数组是否包含类型

### 函数类型
- `Parameters<T>` - 提取函数参数
- `FirstParameter<T>` - 提取第一个参数
- `LastParameter<T>` - 提取最后一个参数
- `PromiseReturnType<T>` - 提取 Promise 返回类型
- `Curry<T>` - 柯里化函数类型
- `Predicate<T>` - 布尔谓词函数
- `TypePredicate<T, U>` - 类型守卫谓词

### 字符串操作类型
- `Capitalize<S>` - 首字母大写
- `Replace<S, From, To>` - 替换字符串模式
- `ReplaceAll<S, From, To>` - 替换所有匹配项
- `Split<S, D>` - 按分隔符分割字符串
- `Join<T, D>` - 用分隔符连接字符串数组
- `Trim<S>` - 删除空白字符
- `StringLength<S>` - 获取字符串长度
- `StartsWith<S, T>` - 检查字符串是否以模式开头
- `ExtractRouteParams<T>` - 提取路由参数

### 条件类型
- `If<C, T, F>` - 条件类型选择
- `IsEqual<T, U>` - 检查类型相等性
- `IsNever<T>` - 检查类型是否为 never
- `IsAny<T>` - 检查类型是否为 any
- `IsArray<T>` - 检查类型是否为数组
- `IsFunction<T>` - 检查类型是否为函数
- `NonNullish<T>` - 移除 null 和 undefined
- `Maybe<T>` - 添加 null 和 undefined

### 品牌类型
- `Brand<T, B>` - 创建品牌类型
- `Opaque<T, B>` - 创建不透明类型
- 常用品牌类型：`UserId`、`Email`、`URL`、`UUID`、`Timestamp`
- 验证助手：`createUserId`、`createEmail`、`createURL`
- `UnBrand<T>` - 从品牌类型中提取原始类型

### 类型守卫和谓词
运行时类型检查函数：
- `isString`、`isNumber`、`isBoolean`、`isNull`、`isUndefined`
- `isObject`、`isArray`、`isFunction`
- `isNonEmptyString`、`isNonEmptyArray`
- `hasProperty`、`hasMethod`
- `isInstanceOf`、`isOneOf`

断言函数：
- `assertIsString` - 断言值为字符串（否则抛出异常）
- `assertIsNumber` - 断言值为数字（否则抛出异常）
- `assertIsNonNull` - 断言值非空（null/undefined 时抛出异常）

## 用法

### 对象操作类型

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

// DeepPartial - 递归地使所有属性变为可选
type PartialUser = DeepPartial<User>;
// 结果: { id?: string; name?: string; profile?: { email?: string; age?: number; settings?: { theme?: 'light' | 'dark'; notifications?: boolean; }; }; }

// DeepRequired - 递归地使所有属性变为必需
type RequiredUser = DeepRequired<User>;
// 结果: { id: string; name: string; profile: { email: string; age: number; settings: { theme: 'light' | 'dark'; notifications: boolean; }; }; }

// DeepReadonly - 递归地使所有属性变为只读
type ReadonlyUser = DeepReadonly<User>;
// 结果: { readonly id?: string; readonly name: string; readonly profile: { readonly email?: string; readonly age: number; readonly settings: { readonly theme: 'light' | 'dark'; readonly notifications?: boolean; }; }; }

// PickByType - 根据值类型选择属性
type StringProps = PickByType<User, string>; // { name: string }
type OptionalProps = PickByType<User, string | undefined>; // { id?: string }

// OmitByType - 根据值类型排除属性
type NonStringProps = OmitByType<User, string>; // { profile: { ... } }

// Merge - 合并两个对象类型
type UserWithExtra = Merge<User, { createdAt: Date; updatedAt: Date }>;
// 结果: { id?: string; name: string; profile: { ... }; createdAt: Date; updatedAt: Date; }

// OptionalKeys - 提取可选属性键
type OptKeys = OptionalKeys<User>; // 'id'

// RequiredKeys - 提取必需属性键  
type ReqKeys = RequiredKeys<User>; // 'name' | 'profile'
```

### 数组操作类型

```typescript
import { ArrayElement, NonEmptyArray, Head, Tail, Last, Reverse, FlattenArray, Includes } from 'advanced-ts-utility-types';

type Numbers = [1, 2, 3, 4, 5];
type Colors = ['red', 'green', 'blue'];
type NestedArray = [[1, 2], [3, [4, 5]], 6];

// ArrayElement - 提取数组元素类型
type NumberArrayElement = ArrayElement<number[]>; // number
type ColorElement = ArrayElement<Colors>; // 'red' | 'green' | 'blue'

// NonEmptyArray - 至少有一个元素的数组
function processItems<T>(items: NonEmptyArray<T>) {
  const first = items[0]; // 无需 undefined 检查
  return items.map(item => transform(item));
}

// Head - 元组的第一个元素
type FirstColor = Head<Colors>; // 'red'
type FirstNumber = Head<Numbers>; // 1

// Tail - 除第一个外的所有元素
type RestColors = Tail<Colors>; // ['green', 'blue']
type RestNumbers = Tail<Numbers>; // [2, 3, 4, 5]

// Last - 元组的最后一个元素
type LastColor = Last<Colors>; // 'blue'
type LastNumber = Last<Numbers>; // 5

// Reverse - 反转元组顺序
type ReversedColors = Reverse<Colors>; // ['blue', 'green', 'red']
type ReversedNumbers = Reverse<Numbers>; // [5, 4, 3, 2, 1]

// FlattenArray - 展平嵌套数组
type FlatArray = FlattenArray<NestedArray>; // [1, 2, 3, 4, 5, 6]

// Includes - 检查数组是否包含类型
type HasRed = Includes<Colors, 'red'>; // true
type HasYellow = Includes<Colors, 'yellow'>; // false
```

### 函数类型

```typescript
import { Parameters, FirstParameter, LastParameter, PromiseReturnType, Curry, Predicate, TypePredicate } from 'advanced-ts-utility-types';

function fetchUser(id: string, options?: { includeProfile: boolean }, metadata?: Record<string, any>): Promise<User> {
  // 实现
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

// Parameters - 提取函数参数（内置类型，但为了完整性而包含）
type FetchParams = Parameters<typeof fetchUser>; // [string, { includeProfile: boolean }?, Record<string, any>?]

// FirstParameter - 提取第一个参数
type FirstParam = FirstParameter<typeof fetchUser>; // string

// LastParameter - 提取最后一个参数
type LastParam = LastParameter<typeof fetchUser>; // Record<string, any> | undefined

// PromiseReturnType - 提取 Promise 返回类型
type UserResult = PromiseReturnType<typeof fetchUser>; // User

// Curry - 柯里化函数类型
type CurriedFetch = Curry<typeof fetchUser>;
// 结果: (id: string) => (options?: { includeProfile: boolean }) => (metadata?: Record<string, any>) => Promise<User>

// Predicate - 布尔谓词函数
type StringPredicate = Predicate<string>; // (value: string) => boolean

// TypePredicate - 类型守卫谓词
type StringTypePredicate = TypePredicate<unknown, string>; // (value: unknown) => value is string
```

### 字符串操作类型

```typescript
import { Capitalize, Replace, ReplaceAll, Split, Join, Trim, StringLength, StartsWith, ExtractRouteParams } from 'advanced-ts-utility-types';

type Message = 'hello world';
type SpacedText = '  hello world  ';
type Route = '/api/users/:userId/posts/:postId';
type Words = ['hello', 'world'];

// Capitalize - 首字母大写（内置类型，但经过增强）
type Capitalized = Capitalize<Message>; // 'Hello world'

// Replace - 替换字符串模式
type Replaced = Replace<Message, 'world', 'TypeScript'>; // 'hello TypeScript'

// ReplaceAll - 替换所有匹配项
type AllReplaced = ReplaceAll<'hello hello world', 'hello', 'hi'>; // 'hi hi world'

// Split - 按分隔符分割字符串
type SplitWords = Split<Message, ' '>; // ['hello', 'world']
type SplitChars = Split<'abc', ''>; // ['a', 'b', 'c']

// Join - 用分隔符连接字符串数组
type Joined = Join<Words, ' '>; // 'hello world'
type JoinedWithDash = Join<Words, '-'>; // 'hello-world'

// Trim - 删除空白字符
type Trimmed = Trim<SpacedText>; // 'hello world'

// StringLength - 获取字符串长度
type Length = StringLength<Message>; // 11

// StartsWith - 检查字符串是否以模式开头
type StartsWithHello = StartsWith<Message, 'hello'>; // true
type StartsWithWorld = StartsWith<Message, 'world'>; // false

// ExtractRouteParams - 提取路由参数
type RouteParams = ExtractRouteParams<Route>; // 'userId' | 'postId'
```

### 条件类型

```typescript
import { If, IsEqual, IsNever, IsAny, IsArray, IsFunction, NonNullish, Maybe } from 'advanced-ts-utility-types';

type A = string;
type B = number;
type C = never;
type D = any;

// If - 条件类型选择
type Result1 = If<true, 'yes', 'no'>; // 'yes'
type Result2 = If<false, 'yes', 'no'>; // 'no'

// IsEqual - 检查类型相等性
type Equal1 = IsEqual<string, string>; // true
type Equal2 = IsEqual<string, number>; // false

// IsNever - 检查类型是否为 never
type NeverCheck1 = IsNever<never>; // true
type NeverCheck2 = IsNever<string>; // false

// IsAny - 检查类型是否为 any
type AnyCheck1 = IsAny<any>; // true
type AnyCheck2 = IsAny<unknown>; // false

// IsArray - 检查类型是否为数组
type ArrayCheck1 = IsArray<string[]>; // true
type ArrayCheck2 = IsArray<string>; // false

// IsFunction - 检查类型是否为函数
type FunctionCheck1 = IsFunction<() => void>; // true
type FunctionCheck2 = IsFunction<string>; // false

// NonNullish - 移除 null 和 undefined
type NonNull = NonNullish<string | null | undefined>; // string

// Maybe - 添加 null 和 undefined
type Nullable = Maybe<string>; // string | null | undefined
```

### 品牌类型

```typescript
import { Brand, Opaque, UserId, Email, URL, UUID, Timestamp, createUserId, createEmail, createURL, UnBrand } from 'advanced-ts-utility-types';

// Brand - 创建品牌类型
type ProductId = Brand<string, 'ProductId'>;
type Price = Brand<number, 'Price'>;

// 创建品牌值
const productId = 'prod-123' as ProductId;
const price = 29.99 as Price;

// Opaque - 创建不透明类型（类似于 Brand 但更严格）
type Token = Opaque<string, 'Token'>;
const token = 'abc123' as Token;

// 预定义的品牌类型
const userId: UserId = createUserId('user-123');
const email: Email = createEmail('user@example.com');
const url: URL = createURL('https://example.com');
const uuid: UUID = 'f47ac10b-58cc-4372-a567-0e02b2c3d479' as UUID;
const timestamp: Timestamp = Date.now() as Timestamp;

// UnBrand - 从品牌类型中提取原始类型
type OriginalUserId = UnBrand<UserId>; // string
type OriginalPrice = UnBrand<Price>; // number

// 在函数中使用
function getProduct(id: ProductId): Product {
  // id 被保证是 ProductId，不是普通字符串
  return database.products.find(p => p.id === id);
}

function calculateTotal(price: Price, quantity: number): Price {
  return (price * quantity) as Price;
}
```

### 类型守卫和谓词

```typescript
import { 
  isString, isNumber, isBoolean, isNull, isUndefined, isNullish,
  isObject, isArray, isFunction, isNonEmptyString, isNonEmptyArray,
  hasProperty, hasMethod, isInstanceOf, isOneOf,
  assertIsString, assertIsNumber, assertIsNonNull
} from 'advanced-ts-utility-types';

// 基本类型守卫
function processValue(value: unknown) {
  if (isString(value)) {
    return value.toUpperCase(); // TypeScript 知道 value 是 string
  }
  if (isNumber(value)) {
    return value.toFixed(2); // TypeScript 知道 value 是 number
  }
  if (isArray(value)) {
    return value.length; // TypeScript 知道 value 是 array
  }
}

// 对象属性检查
function processUser(obj: unknown) {
  if (hasProperty(obj, 'name') && isString(obj.name)) {
    console.log(`用户名: ${obj.name}`);
  }
  if (hasMethod(obj, 'getName')) {
    const name = obj.getName(); // TypeScript 知道 getName 存在
  }
}

// 实例和值检查
const isDate = isInstanceOf(Date);
const isValidStatus = isOneOf('active', 'inactive', 'pending');

if (isDate(someValue)) {
  console.log(someValue.getFullYear()); // TypeScript 知道它是 Date
}

if (isValidStatus(status)) {
  // TypeScript 知道 status 是 'active' | 'inactive' | 'pending'
  console.log(`状态: ${status}`);
}

// 断言函数
function validateInput(data: unknown) {
  assertIsString(data); // 不是字符串则抛出异常
  return data.trim(); // TypeScript 知道 data 是 string
}

function processUser(user: User | null) {
  assertIsNonNull(user); // null/undefined 则抛出异常
  return user.profile.name; // TypeScript 知道 user 是 User
}

// 非空检查
function processItems(items: unknown[]) {
  if (isNonEmptyArray(items)) {
    const first = items[0]; // 无需 undefined 检查
    return items.map(item => process(item));
  }
}

function processText(text: string) {
  if (isNonEmptyString(text)) {
    return text.charAt(0); // TypeScript 知道字符串不为空
  }
}
```

## 贡献

欢迎贡献！请随时提交 Pull Request。

## 许可证

MIT