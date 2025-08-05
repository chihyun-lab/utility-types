# 高度な TypeScript ユーティリティタイプ

[English](./README.md) | [한국어](./README.ko.md) | [中文](./README.zh.md) | [日本語](./README.ja.md)

実用的な開発のための包括的な高度 TypeScript ユーティリティタイプのコレクションです。このパッケージは、TypeScript プロジェクトでタイプセーフティと開発者体験を向上させる幅広いタイプレベルユーティリティを提供します。

## インストール

```bash
npm install advanced-ts-utility-types
```

## 使用方法

```typescript
import { DeepPartial, NonEmptyArray, Brand } from 'utility-types';

// 深いパーシャルの例
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

type PartialUser = DeepPartial<User>; // すべてのプロパティが再帰的にオプショナル

// 空でない配列の例
function processItems<T>(items: NonEmptyArray<T>) {
  // TypeScript は items に少なくとも1つの要素があることを知っている
  const first = items[0]; // undefined チェック不要
  return items.map(item => transform(item));
}

// ブランドタイプの例
type UserId = Brand<string, 'UserId'>;
const userId: UserId = createUserId('user-123');
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
- `assertIsString`、`assertIsNumber`、`assertIsNonNull`

## 例

### オブジェクトタイプ
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

// すべてのプロパティがオプショナルになる
type PartialConfig = DeepPartial<Config>;

// 文字列プロパティのみを選択
type StringProps = PickByType<Config['database'], string>; // { host: string }
```

### 配列タイプ
```typescript
type Colors = ['red', 'green', 'blue'];
type FirstColor = Head<Colors>; // 'red'
type RestColors = Tail<Colors>; // ['green', 'blue']
type LastColor = Last<Colors>; // 'blue'
type ReversedColors = Reverse<Colors>; // ['blue', 'green', 'red']
```

### 文字列タイプ
```typescript
type Route = '/api/users/:userId/posts/:postId';
type Params = ExtractRouteParams<Route>; // 'userId' | 'postId'

type Message = 'Hello World';
type Shouting = Uppercase<Message>; // 'HELLO WORLD'
type Words = Split<Message, ' '>; // ['Hello', 'World']
```

### 関数タイプ
```typescript
function fetchUser(id: string, options?: { includeProfile: boolean }): Promise<User> {
  // 実装
}

type UserFetchParams = Parameters<typeof fetchUser>; // [string, { includeProfile: boolean }?]
type UserResult = PromiseReturnType<typeof fetchUser>; // User
```

## 貢献

貢献を歓迎します！プルリクエストをお気軽に提出してください。

## ライセンス

MIT