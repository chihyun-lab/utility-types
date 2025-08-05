# 高级 TypeScript 实用类型

[English](./README.md) | [한국어](./README.ko.md) | [中文](./README.zh.md) | [日本語](./README.ja.md)

用于实际开发的全面高级 TypeScript 实用类型集合。此包提供了广泛的类型级实用工具，以增强 TypeScript 项目中的类型安全性和开发者体验。

## 安装

```bash
npm install advanced-ts-utility-types
```

## 用法

```typescript
import { DeepPartial, NonEmptyArray, Brand } from 'utility-types';

// 深度可选示例
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

type PartialUser = DeepPartial<User>; // 所有属性递归变为可选

// 非空数组示例
function processItems<T>(items: NonEmptyArray<T>) {
  // TypeScript 知道 items 至少有一个元素
  const first = items[0]; // 无需 undefined 检查
  return items.map(item => transform(item));
}

// 品牌类型示例
type UserId = Brand<string, 'UserId'>;
const userId: UserId = createUserId('user-123');
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
- `assertIsString`、`assertIsNumber`、`assertIsNonNull`

## 示例

### 对象类型
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

// 所有属性变为可选
type PartialConfig = DeepPartial<Config>;

// 仅选择字符串属性
type StringProps = PickByType<Config['database'], string>; // { host: string }
```

### 数组类型
```typescript
type Colors = ['red', 'green', 'blue'];
type FirstColor = Head<Colors>; // 'red'
type RestColors = Tail<Colors>; // ['green', 'blue']
type LastColor = Last<Colors>; // 'blue'
type ReversedColors = Reverse<Colors>; // ['blue', 'green', 'red']
```

### 字符串类型
```typescript
type Route = '/api/users/:userId/posts/:postId';
type Params = ExtractRouteParams<Route>; // 'userId' | 'postId'

type Message = 'Hello World';
type Shouting = Uppercase<Message>; // 'HELLO WORLD'
type Words = Split<Message, ' '>; // ['Hello', 'World']
```

### 函数类型
```typescript
function fetchUser(id: string, options?: { includeProfile: boolean }): Promise<User> {
  // 实现
}

type UserFetchParams = Parameters<typeof fetchUser>; // [string, { includeProfile: boolean }?]
type UserResult = PromiseReturnType<typeof fetchUser>; // User
```

## 贡献

欢迎贡献！请随时提交 Pull Request。

## 许可证

MIT