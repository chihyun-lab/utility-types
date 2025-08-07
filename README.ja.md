# 高度な TypeScript ユーティリティタイプ

[English](./README.md) | [한국어](./README.ko.md) | [中文](./README.zh.md) | [日本語](./README.ja.md)

実用的な開発のための包括的な高度 TypeScript ユーティリティタイプのコレクションです。このパッケージは、TypeScript プロジェクトでタイプセーフティと開発者体験を向上させる幅広いタイプレベルユーティリティを提供します。

<div style="text-align: center;">
<a href="https://www.buymeacoffee.com/kelvinchihyun" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" alt="Buy Me A Coffee" style="height: 50px !important;width: 160px !important;" ></a>
</div>

## インストール

```bash
npm install advanced-ts-utility-types
```


## タイプカテゴリ

### オブジェクト操作タイプ
- `DeepPartial<T>` - すべてのプロパティを再帰的にオプショナルにする
- `DeepRequired<T>` - すべてのプロパティを再帰的に必須にする
- `DeepReadonly<T>` - すべてのプロパティを再帰的に読み取り専用にする
- `PickByType<T, U>` - 値の型でプロパティを選択
- `OmitByType<T, U>` - 値の型でプロパティを除外
- `Merge<T, U>` - 2つのオブジェクトタイプをマージ
- `OptionalKeys<T>` - オプショナルプロパティキーを抽出
- `RequiredKeys<T>` - 必須プロパティキーを抽出

### 配列操作タイプ
- `ArrayElement<T>` - 配列要素タイプを抽出
- `NonEmptyArray<T>` - 少なくとも1つの要素を持つ配列
- `Head<T>` - タプルの最初の要素
- `Tail<T>` - 最初以外のすべての要素
- `Last<T>` - タプルの最後の要素
- `Reverse<T>` - タプルの順序を逆転
- `FlattenArray<T>` - ネストした配列を平坦化
- `Includes<T, U>` - 配列がタイプを含むかチェック

### 関数タイプ
- `Parameters<T>` - 関数パラメータを抽出
- `FirstParameter<T>` - 最初のパラメータを抽出
- `LastParameter<T>` - 最後のパラメータを抽出
- `PromiseReturnType<T>` - Promise の戻り値タイプを抽出
- `Curry<T>` - カリー化関数タイプ
- `Predicate<T>` - 真偽値述語関数
- `TypePredicate<T, U>` - タイプガード述語

### 文字列操作タイプ
- `Capitalize<S>` - 最初の文字を大文字化
- `Replace<S, From, To>` - 文字列パターンを置換
- `ReplaceAll<S, From, To>` - すべての出現を置換
- `Split<S, D>` - 区切り文字で文字列を分割
- `Join<T, D>` - 区切り文字で文字列配列を結合
- `Trim<S>` - 空白文字を削除
- `StringLength<S>` - 文字列の長さを取得
- `StartsWith<S, T>` - 文字列がパターンで始まるかチェック
- `ExtractRouteParams<T>` - ルートパラメータを抽出

### 条件タイプ
- `If<C, T, F>` - 条件タイプ選択
- `IsEqual<T, U>` - タイプの等価性をチェック
- `IsNever<T>` - タイプが never かチェック
- `IsAny<T>` - タイプが any かチェック
- `IsArray<T>` - タイプが配列かチェック
- `IsFunction<T>` - タイプが関数かチェック
- `NonNullish<T>` - null と undefined を削除
- `Maybe<T>` - null と undefined を追加

### ブランドタイプ
- `Brand<T, B>` - ブランドタイプを作成
- `Opaque<T, B>` - 不透明タイプを作成
- 一般的なブランドタイプ：`UserId`、`Email`、`URL`、`UUID`、`Timestamp`
- 検証ヘルパー：`createUserId`、`createEmail`、`createURL`
- `UnBrand<T>` - ブランドタイプから元のタイプを抽出

### タイプガードと述語
ランタイムタイプチェック関数：
- `isString`、`isNumber`、`isBoolean`、`isNull`、`isUndefined`
- `isObject`、`isArray`、`isFunction`
- `isNonEmptyString`、`isNonEmptyArray`
- `hasProperty`、`hasMethod`
- `isInstanceOf`、`isOneOf`

アサーション関数：
- `assertIsString` - 文字列であることをアサート（そうでなければ例外をスロー）
- `assertIsNumber` - 数値であることをアサート（そうでなければ例外をスロー）
- `assertIsNonNull` - null でないことをアサート（null/undefined の場合例外をスロー）

## 使用方法

### オブジェクト操作タイプ

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

// DeepPartial - すべてのプロパティを再帰的にオプショナルにする
type PartialUser = DeepPartial<User>;
// 結果: { id?: string; name?: string; profile?: { email?: string; age?: number; settings?: { theme?: 'light' | 'dark'; notifications?: boolean; }; }; }

// DeepRequired - すべてのプロパティを再帰的に必須にする
type RequiredUser = DeepRequired<User>;
// 結果: { id: string; name: string; profile: { email: string; age: number; settings: { theme: 'light' | 'dark'; notifications: boolean; }; }; }

// DeepReadonly - すべてのプロパティを再帰的に読み取り専用にする
type ReadonlyUser = DeepReadonly<User>;
// 結果: { readonly id?: string; readonly name: string; readonly profile: { readonly email?: string; readonly age: number; readonly settings: { readonly theme: 'light' | 'dark'; readonly notifications?: boolean; }; }; }

// PickByType - 値の型でプロパティを選択
type StringProps = PickByType<User, string>; // { name: string }
type OptionalProps = PickByType<User, string | undefined>; // { id?: string }

// OmitByType - 値の型でプロパティを除外
type NonStringProps = OmitByType<User, string>; // { profile: { ... } }

// Merge - 2つのオブジェクトタイプをマージ
type UserWithExtra = Merge<User, { createdAt: Date; updatedAt: Date }>;
// 結果: { id?: string; name: string; profile: { ... }; createdAt: Date; updatedAt: Date; }

// OptionalKeys - オプショナルプロパティキーを抽出
type OptKeys = OptionalKeys<User>; // 'id'

// RequiredKeys - 必須プロパティキーを抽出  
type ReqKeys = RequiredKeys<User>; // 'name' | 'profile'
```

### 配列操作タイプ

```typescript
import { ArrayElement, NonEmptyArray, Head, Tail, Last, Reverse, FlattenArray, Includes } from 'advanced-ts-utility-types';

type Numbers = [1, 2, 3, 4, 5];
type Colors = ['red', 'green', 'blue'];
type NestedArray = [[1, 2], [3, [4, 5]], 6];

// ArrayElement - 配列要素タイプを抽出
type NumberArrayElement = ArrayElement<number[]>; // number
type ColorElement = ArrayElement<Colors>; // 'red' | 'green' | 'blue'

// NonEmptyArray - 少なくとも1つの要素を持つ配列
function processItems<T>(items: NonEmptyArray<T>) {
  const first = items[0]; // undefined チェック不要
  return items.map(item => transform(item));
}

// Head - タプルの最初の要素
type FirstColor = Head<Colors>; // 'red'
type FirstNumber = Head<Numbers>; // 1

// Tail - 最初以外のすべての要素
type RestColors = Tail<Colors>; // ['green', 'blue']
type RestNumbers = Tail<Numbers>; // [2, 3, 4, 5]

// Last - タプルの最後の要素
type LastColor = Last<Colors>; // 'blue'
type LastNumber = Last<Numbers>; // 5

// Reverse - タプルの順序を逆転
type ReversedColors = Reverse<Colors>; // ['blue', 'green', 'red']
type ReversedNumbers = Reverse<Numbers>; // [5, 4, 3, 2, 1]

// FlattenArray - ネストした配列を平坦化
type FlatArray = FlattenArray<NestedArray>; // [1, 2, 3, 4, 5, 6]

// Includes - 配列がタイプを含むかチェック
type HasRed = Includes<Colors, 'red'>; // true
type HasYellow = Includes<Colors, 'yellow'>; // false
```

### 関数タイプ

```typescript
import { Parameters, FirstParameter, LastParameter, PromiseReturnType, Curry, Predicate, TypePredicate } from 'advanced-ts-utility-types';

function fetchUser(id: string, options?: { includeProfile: boolean }, metadata?: Record<string, any>): Promise<User> {
  // 実装
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

// Parameters - 関数パラメータを抽出（組み込みタイプですが、完全性のため含まれています）
type FetchParams = Parameters<typeof fetchUser>; // [string, { includeProfile: boolean }?, Record<string, any>?]

// FirstParameter - 最初のパラメータを抽出
type FirstParam = FirstParameter<typeof fetchUser>; // string

// LastParameter - 最後のパラメータを抽出
type LastParam = LastParameter<typeof fetchUser>; // Record<string, any> | undefined

// PromiseReturnType - Promise の戻り値タイプを抽出
type UserResult = PromiseReturnType<typeof fetchUser>; // User

// Curry - カリー化関数タイプ
type CurriedFetch = Curry<typeof fetchUser>;
// 結果: (id: string) => (options?: { includeProfile: boolean }) => (metadata?: Record<string, any>) => Promise<User>

// Predicate - 真偽値述語関数
type StringPredicate = Predicate<string>; // (value: string) => boolean

// TypePredicate - タイプガード述語
type StringTypePredicate = TypePredicate<unknown, string>; // (value: unknown) => value is string
```

### 文字列操作タイプ

```typescript
import { Capitalize, Replace, ReplaceAll, Split, Join, Trim, StringLength, StartsWith, ExtractRouteParams } from 'advanced-ts-utility-types';

type Message = 'hello world';
type SpacedText = '  hello world  ';
type Route = '/api/users/:userId/posts/:postId';
type Words = ['hello', 'world'];

// Capitalize - 最初の文字を大文字化（組み込みタイプですが、強化されています）
type Capitalized = Capitalize<Message>; // 'Hello world'

// Replace - 文字列パターンを置換
type Replaced = Replace<Message, 'world', 'TypeScript'>; // 'hello TypeScript'

// ReplaceAll - すべての出現を置換
type AllReplaced = ReplaceAll<'hello hello world', 'hello', 'hi'>; // 'hi hi world'

// Split - 区切り文字で文字列を分割
type SplitWords = Split<Message, ' '>; // ['hello', 'world']
type SplitChars = Split<'abc', ''>; // ['a', 'b', 'c']

// Join - 区切り文字で文字列配列を結合
type Joined = Join<Words, ' '>; // 'hello world'
type JoinedWithDash = Join<Words, '-'>; // 'hello-world'

// Trim - 空白文字を削除
type Trimmed = Trim<SpacedText>; // 'hello world'

// StringLength - 文字列の長さを取得
type Length = StringLength<Message>; // 11

// StartsWith - 文字列がパターンで始まるかチェック
type StartsWithHello = StartsWith<Message, 'hello'>; // true
type StartsWithWorld = StartsWith<Message, 'world'>; // false

// ExtractRouteParams - ルートパラメータを抽出
type RouteParams = ExtractRouteParams<Route>; // 'userId' | 'postId'
```

### 条件タイプ

```typescript
import { If, IsEqual, IsNever, IsAny, IsArray, IsFunction, NonNullish, Maybe } from 'advanced-ts-utility-types';

type A = string;
type B = number;
type C = never;
type D = any;

// If - 条件タイプ選択
type Result1 = If<true, 'yes', 'no'>; // 'yes'
type Result2 = If<false, 'yes', 'no'>; // 'no'

// IsEqual - タイプの等価性をチェック
type Equal1 = IsEqual<string, string>; // true
type Equal2 = IsEqual<string, number>; // false

// IsNever - タイプが never かチェック
type NeverCheck1 = IsNever<never>; // true
type NeverCheck2 = IsNever<string>; // false

// IsAny - タイプが any かチェック
type AnyCheck1 = IsAny<any>; // true
type AnyCheck2 = IsAny<unknown>; // false

// IsArray - タイプが配列かチェック
type ArrayCheck1 = IsArray<string[]>; // true
type ArrayCheck2 = IsArray<string>; // false

// IsFunction - タイプが関数かチェック
type FunctionCheck1 = IsFunction<() => void>; // true
type FunctionCheck2 = IsFunction<string>; // false

// NonNullish - null と undefined を削除
type NonNull = NonNullish<string | null | undefined>; // string

// Maybe - null と undefined を追加
type Nullable = Maybe<string>; // string | null | undefined
```

### ブランドタイプ

```typescript
import { Brand, Opaque, UserId, Email, URL, UUID, Timestamp, createUserId, createEmail, createURL, UnBrand } from 'advanced-ts-utility-types';

// Brand - ブランドタイプを作成
type ProductId = Brand<string, 'ProductId'>;
type Price = Brand<number, 'Price'>;

// ブランド値を作成
const productId = 'prod-123' as ProductId;
const price = 29.99 as Price;

// Opaque - 不透明タイプを作成（Brand に似ているがより制限的）
type Token = Opaque<string, 'Token'>;
const token = 'abc123' as Token;

// 事前定義されたブランドタイプ
const userId: UserId = createUserId('user-123');
const email: Email = createEmail('user@example.com');
const url: URL = createURL('https://example.com');
const uuid: UUID = 'f47ac10b-58cc-4372-a567-0e02b2c3d479' as UUID;
const timestamp: Timestamp = Date.now() as Timestamp;

// UnBrand - ブランドタイプから元のタイプを抽出
type OriginalUserId = UnBrand<UserId>; // string
type OriginalPrice = UnBrand<Price>; // number

// 関数での使用
function getProduct(id: ProductId): Product {
  // id は ProductId として保証され、ただの文字列ではない
  return database.products.find(p => p.id === id);
}

function calculateTotal(price: Price, quantity: number): Price {
  return (price * quantity) as Price;
}
```

### タイプガードと述語

```typescript
import { 
  isString, isNumber, isBoolean, isNull, isUndefined, isNullish,
  isObject, isArray, isFunction, isNonEmptyString, isNonEmptyArray,
  hasProperty, hasMethod, isInstanceOf, isOneOf,
  assertIsString, assertIsNumber, assertIsNonNull
} from 'advanced-ts-utility-types';

// 基本的なタイプガード
function processValue(value: unknown) {
  if (isString(value)) {
    return value.toUpperCase(); // TypeScript は value が string であることを知っている
  }
  if (isNumber(value)) {
    return value.toFixed(2); // TypeScript は value が number であることを知っている
  }
  if (isArray(value)) {
    return value.length; // TypeScript は value が array であることを知っている
  }
}

// オブジェクトプロパティチェック
function processUser(obj: unknown) {
  if (hasProperty(obj, 'name') && isString(obj.name)) {
    console.log(`ユーザー名: ${obj.name}`);
  }
  if (hasMethod(obj, 'getName')) {
    const name = obj.getName(); // TypeScript は getName が存在することを知っている
  }
}

// インスタンスと値のチェック
const isDate = isInstanceOf(Date);
const isValidStatus = isOneOf('active', 'inactive', 'pending');

if (isDate(someValue)) {
  console.log(someValue.getFullYear()); // TypeScript は Date であることを知っている
}

if (isValidStatus(status)) {
  // TypeScript は status が 'active' | 'inactive' | 'pending' であることを知っている
  console.log(`ステータス: ${status}`);
}

// アサーション関数
function validateInput(data: unknown) {
  assertIsString(data); // 文字列でなければ例外をスロー
  return data.trim(); // TypeScript は data が string であることを知っている
}

function processUser(user: User | null) {
  assertIsNonNull(user); // null/undefined の場合例外をスロー
  return user.profile.name; // TypeScript は user が User であることを知っている
}

// 非空チェック
function processItems(items: unknown[]) {
  if (isNonEmptyArray(items)) {
    const first = items[0]; // undefined チェック不要
    return items.map(item => process(item));
  }
}

function processText(text: string) {
  if (isNonEmptyString(text)) {
    return text.charAt(0); // TypeScript は文字列が空でないことを知っている
  }
}
```

## 貢献

貢献を歓迎します！プルリクエストをお気軽に提出してください。

## ライセンス

MIT