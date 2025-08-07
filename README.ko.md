# 고급 TypeScript 유틸리티 타입

[English](./README.md) | [한국어](./README.ko.md) | [中文](./README.zh.md) | [日本語](./README.ja.md)

실용적인 개발을 위한 포괄적인 고급 TypeScript 유틸리티 타입 모음입니다. 이 패키지는 TypeScript 프로젝트에서 타입 안전성과 개발자 경험을 향상시키는 다양한 타입 레벨 유틸리티를 제공합니다.

<div style="text-align: center;">
<a href="https://www.buymeacoffee.com/kelvinchihyun" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" alt="Buy Me A Coffee" style="height: 50px !important;width: 160px !important;" ></a>
</div>

## 설치

```bash
npm install advanced-ts-utility-types
```


## 타입 카테고리

### 객체 조작 타입
- `DeepPartial<T>` - 모든 속성을 재귀적으로 선택적으로 만듦
- `DeepRequired<T>` - 모든 속성을 재귀적으로 필수로 만듦
- `DeepReadonly<T>` - 모든 속성을 재귀적으로 읽기 전용으로 만듦
- `PickByType<T, U>` - 값 타입으로 속성 선택
- `OmitByType<T, U>` - 값 타입으로 속성 제외
- `Merge<T, U>` - 두 객체 타입 병합
- `OptionalKeys<T>` - 선택적 속성 키 추출
- `RequiredKeys<T>` - 필수 속성 키 추출

### 배열 조작 타입
- `ArrayElement<T>` - 배열 요소 타입 추출
- `NonEmptyArray<T>` - 최소 하나의 요소를 가진 배열
- `Head<T>` - 튜플의 첫 번째 요소
- `Tail<T>` - 첫 번째를 제외한 모든 요소
- `Last<T>` - 튜플의 마지막 요소
- `Reverse<T>` - 튜플 순서 뒤집기
- `FlattenArray<T>` - 중첩 배열 평탄화
- `Includes<T, U>` - 배열이 타입을 포함하는지 확인

### 함수 타입
- `Parameters<T>` - 함수 매개변수 추출
- `FirstParameter<T>` - 첫 번째 매개변수 추출
- `LastParameter<T>` - 마지막 매개변수 추출
- `PromiseReturnType<T>` - Promise 반환 타입 추출
- `Curry<T>` - 커리된 함수 타입
- `Predicate<T>` - 불린 술어 함수
- `TypePredicate<T, U>` - 타입 가드 술어

### 문자열 조작 타입
- `Capitalize<S>` - 첫 글자 대문자화
- `Replace<S, From, To>` - 문자열 패턴 치환
- `ReplaceAll<S, From, To>` - 모든 출현 치환
- `Split<S, D>` - 구분자로 문자열 분할
- `Join<T, D>` - 구분자로 문자열 배열 결합
- `Trim<S>` - 공백 제거
- `StringLength<S>` - 문자열 길이 구하기
- `StartsWith<S, T>` - 문자열이 패턴으로 시작하는지 확인
- `ExtractRouteParams<T>` - 라우트 매개변수 추출

### 조건부 타입
- `If<C, T, F>` - 조건부 타입 선택
- `IsEqual<T, U>` - 타입 동등성 확인
- `IsNever<T>` - 타입이 never인지 확인
- `IsAny<T>` - 타입이 any인지 확인
- `IsArray<T>` - 타입이 배열인지 확인
- `IsFunction<T>` - 타입이 함수인지 확인
- `NonNullish<T>` - null과 undefined 제거
- `Maybe<T>` - null과 undefined 추가

### 브랜드 타입
- `Brand<T, B>` - 브랜드 타입 생성
- `Opaque<T, B>` - 불투명 타입 생성
- 일반적인 브랜드 타입: `UserId`, `Email`, `URL`, `UUID`, `Timestamp`
- 검증 헬퍼: `createUserId`, `createEmail`, `createURL`
- `UnBrand<T>` - 브랜드 타입에서 원본 타입 추출

### 타입 가드와 술어
런타임 타입 검사 함수:
- `isString`, `isNumber`, `isBoolean`, `isNull`, `isUndefined`
- `isObject`, `isArray`, `isFunction`
- `isNonEmptyString`, `isNonEmptyArray`
- `hasProperty`, `hasMethod`
- `isInstanceOf`, `isOneOf`

단언 함수:
- `assertIsString` - 문자열임을 단언 (아니면 예외 발생)
- `assertIsNumber` - 숫자임을 단언 (아니면 예외 발생)
- `assertIsNonNull` - null/undefined가 아님을 단언 (null이면 예외 발생)

## 사용법

### 객체 조작 타입

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

// DeepPartial - 모든 속성을 재귀적으로 선택적으로 만듦
type PartialUser = DeepPartial<User>;
// 결과: { id?: string; name?: string; profile?: { email?: string; age?: number; settings?: { theme?: 'light' | 'dark'; notifications?: boolean; }; }; }

// DeepRequired - 모든 속성을 재귀적으로 필수로 만듦
type RequiredUser = DeepRequired<User>;
// 결과: { id: string; name: string; profile: { email: string; age: number; settings: { theme: 'light' | 'dark'; notifications: boolean; }; }; }

// DeepReadonly - 모든 속성을 재귀적으로 읽기 전용으로 만듦
type ReadonlyUser = DeepReadonly<User>;
// 결과: { readonly id?: string; readonly name: string; readonly profile: { readonly email?: string; readonly age: number; readonly settings: { readonly theme: 'light' | 'dark'; readonly notifications?: boolean; }; }; }

// PickByType - 값 타입으로 속성 선택
type StringProps = PickByType<User, string>; // { name: string }
type OptionalProps = PickByType<User, string | undefined>; // { id?: string }

// OmitByType - 값 타입으로 속성 제외
type NonStringProps = OmitByType<User, string>; // { profile: { ... } }

// Merge - 두 객체 타입 병합
type UserWithExtra = Merge<User, { createdAt: Date; updatedAt: Date }>;
// 결과: { id?: string; name: string; profile: { ... }; createdAt: Date; updatedAt: Date; }

// OptionalKeys - 선택적 속성 키 추출
type OptKeys = OptionalKeys<User>; // 'id'

// RequiredKeys - 필수 속성 키 추출  
type ReqKeys = RequiredKeys<User>; // 'name' | 'profile'
```

### 배열 조작 타입

```typescript
import { ArrayElement, NonEmptyArray, Head, Tail, Last, Reverse, FlattenArray, Includes } from 'advanced-ts-utility-types';

type Numbers = [1, 2, 3, 4, 5];
type Colors = ['red', 'green', 'blue'];
type NestedArray = [[1, 2], [3, [4, 5]], 6];

// ArrayElement - 배열 요소 타입 추출
type NumberArrayElement = ArrayElement<number[]>; // number
type ColorElement = ArrayElement<Colors>; // 'red' | 'green' | 'blue'

// NonEmptyArray - 최소 하나의 요소를 가진 배열
function processItems<T>(items: NonEmptyArray<T>) {
  const first = items[0]; // undefined 검사 불필요
  return items.map(item => transform(item));
}

// Head - 튜플의 첫 번째 요소
type FirstColor = Head<Colors>; // 'red'
type FirstNumber = Head<Numbers>; // 1

// Tail - 첫 번째를 제외한 모든 요소
type RestColors = Tail<Colors>; // ['green', 'blue']
type RestNumbers = Tail<Numbers>; // [2, 3, 4, 5]

// Last - 튜플의 마지막 요소
type LastColor = Last<Colors>; // 'blue'
type LastNumber = Last<Numbers>; // 5

// Reverse - 튜플 순서 역전
type ReversedColors = Reverse<Colors>; // ['blue', 'green', 'red']
type ReversedNumbers = Reverse<Numbers>; // [5, 4, 3, 2, 1]

// FlattenArray - 중첩 배열 평면화
type FlatArray = FlattenArray<NestedArray>; // [1, 2, 3, 4, 5, 6]

// Includes - 배열이 타입을 포함하는지 확인
type HasRed = Includes<Colors, 'red'>; // true
type HasYellow = Includes<Colors, 'yellow'>; // false
```

### 함수 타입

```typescript
import { Parameters, FirstParameter, LastParameter, PromiseReturnType, Curry, Predicate, TypePredicate } from 'advanced-ts-utility-types';

function fetchUser(id: string, options?: { includeProfile: boolean }, metadata?: Record<string, any>): Promise<User> {
  // 구현
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

// Parameters - 함수 매개변수 추출 (내장 타입이지만 완전성을 위해 포함)
type FetchParams = Parameters<typeof fetchUser>; // [string, { includeProfile: boolean }?, Record<string, any>?]

// FirstParameter - 첫 번째 매개변수 추출
type FirstParam = FirstParameter<typeof fetchUser>; // string

// LastParameter - 마지막 매개변수 추출
type LastParam = LastParameter<typeof fetchUser>; // Record<string, any> | undefined

// PromiseReturnType - Promise 반환 타입 추출
type UserResult = PromiseReturnType<typeof fetchUser>; // User

// Curry - 커리된 함수 타입
type CurriedFetch = Curry<typeof fetchUser>;
// 결과: (id: string) => (options?: { includeProfile: boolean }) => (metadata?: Record<string, any>) => Promise<User>

// Predicate - 불린 술어 함수
type StringPredicate = Predicate<string>; // (value: string) => boolean

// TypePredicate - 타입 가드 술어
type StringTypePredicate = TypePredicate<unknown, string>; // (value: unknown) => value is string
```

### 문자열 조작 타입

```typescript
import { Capitalize, Replace, ReplaceAll, Split, Join, Trim, StringLength, StartsWith, ExtractRouteParams } from 'advanced-ts-utility-types';

type Message = 'hello world';
type SpacedText = '  hello world  ';
type Route = '/api/users/:userId/posts/:postId';
type Words = ['hello', 'world'];

// Capitalize - 첫 글자 대문자화 (내장 타입이지만 향상됨)
type Capitalized = Capitalize<Message>; // 'Hello world'

// Replace - 문자열 패턴 교체
type Replaced = Replace<Message, 'world', 'TypeScript'>; // 'hello TypeScript'

// ReplaceAll - 모든 발생 교체
type AllReplaced = ReplaceAll<'hello hello world', 'hello', 'hi'>; // 'hi hi world'

// Split - 구분자로 문자열 분할
type SplitWords = Split<Message, ' '>; // ['hello', 'world']
type SplitChars = Split<'abc', ''>; // ['a', 'b', 'c']

// Join - 구분자로 문자열 배열 결합
type Joined = Join<Words, ' '>; // 'hello world'
type JoinedWithDash = Join<Words, '-'>; // 'hello-world'

// Trim - 공백 문자 제거
type Trimmed = Trim<SpacedText>; // 'hello world'

// StringLength - 문자열 길이 구하기
type Length = StringLength<Message>; // 11

// StartsWith - 문자열이 패턴으로 시작하는지 확인
type StartsWithHello = StartsWith<Message, 'hello'>; // true
type StartsWithWorld = StartsWith<Message, 'world'>; // false

// ExtractRouteParams - 라우트 매개변수 추출
type RouteParams = ExtractRouteParams<Route>; // 'userId' | 'postId'
```

### 조건부 타입

```typescript
import { If, IsEqual, IsNever, IsAny, IsArray, IsFunction, NonNullish, Maybe } from 'advanced-ts-utility-types';

type A = string;
type B = number;
type C = never;
type D = any;

// If - 조건부 타입 선택
type Result1 = If<true, 'yes', 'no'>; // 'yes'
type Result2 = If<false, 'yes', 'no'>; // 'no'

// IsEqual - 타입 동등성 확인
type Equal1 = IsEqual<string, string>; // true
type Equal2 = IsEqual<string, number>; // false

// IsNever - 타입이 never인지 확인
type NeverCheck1 = IsNever<never>; // true
type NeverCheck2 = IsNever<string>; // false

// IsAny - 타입이 any인지 확인
type AnyCheck1 = IsAny<any>; // true
type AnyCheck2 = IsAny<unknown>; // false

// IsArray - 타입이 배열인지 확인
type ArrayCheck1 = IsArray<string[]>; // true
type ArrayCheck2 = IsArray<string>; // false

// IsFunction - 타입이 함수인지 확인
type FunctionCheck1 = IsFunction<() => void>; // true
type FunctionCheck2 = IsFunction<string>; // false

// NonNullish - null과 undefined 제거
type NonNull = NonNullish<string | null | undefined>; // string

// Maybe - null과 undefined 추가
type Nullable = Maybe<string>; // string | null | undefined
```

### 브랜드 타입

```typescript
import { Brand, Opaque, UserId, Email, URL, UUID, Timestamp, createUserId, createEmail, createURL, UnBrand } from 'advanced-ts-utility-types';

// Brand - 브랜드 타입 생성
type ProductId = Brand<string, 'ProductId'>;
type Price = Brand<number, 'Price'>;

// 브랜드 값 생성
const productId = 'prod-123' as ProductId;
const price = 29.99 as Price;

// Opaque - 불투명 타입 생성 (Brand와 유사하지만 더 제한적)
type Token = Opaque<string, 'Token'>;
const token = 'abc123' as Token;

// 미리 정의된 브랜드 타입
const userId: UserId = createUserId('user-123');
const email: Email = createEmail('user@example.com');
const url: URL = createURL('https://example.com');
const uuid: UUID = 'f47ac10b-58cc-4372-a567-0e02b2c3d479' as UUID;
const timestamp: Timestamp = Date.now() as Timestamp;

// UnBrand - 브랜드 타입에서 원본 타입 추출
type OriginalUserId = UnBrand<UserId>; // string
type OriginalPrice = UnBrand<Price>; // number

// 함수에서 사용
function getProduct(id: ProductId): Product {
  // id는 ProductId로 보장되며, 단순한 문자열이 아님
  return database.products.find(p => p.id === id);
}

function calculateTotal(price: Price, quantity: number): Price {
  return (price * quantity) as Price;
}
```

### 타입 가드와 술어

```typescript
import { 
  isString, isNumber, isBoolean, isNull, isUndefined, isNullish,
  isObject, isArray, isFunction, isNonEmptyString, isNonEmptyArray,
  hasProperty, hasMethod, isInstanceOf, isOneOf,
  assertIsString, assertIsNumber, assertIsNonNull
} from 'advanced-ts-utility-types';

// 기본 타입 가드
function processValue(value: unknown) {
  if (isString(value)) {
    return value.toUpperCase(); // TypeScript가 value가 string임을 인식
  }
  if (isNumber(value)) {
    return value.toFixed(2); // TypeScript가 value가 number임을 인식
  }
  if (isArray(value)) {
    return value.length; // TypeScript가 value가 array임을 인식
  }
}

// 객체 속성 확인
function processUser(obj: unknown) {
  if (hasProperty(obj, 'name') && isString(obj.name)) {
    console.log(`사용자 이름: ${obj.name}`);
  }
  if (hasMethod(obj, 'getName')) {
    const name = obj.getName(); // TypeScript가 getName이 존재함을 인식
  }
}

// 인스턴스와 값 확인
const isDate = isInstanceOf(Date);
const isValidStatus = isOneOf('active', 'inactive', 'pending');

if (isDate(someValue)) {
  console.log(someValue.getFullYear()); // TypeScript가 Date임을 인식
}

if (isValidStatus(status)) {
  // TypeScript가 status가 'active' | 'inactive' | 'pending'임을 인식
  console.log(`상태: ${status}`);
}

// 단언 함수
function validateInput(data: unknown) {
  assertIsString(data); // string이 아니면 예외 발생
  return data.trim(); // TypeScript가 data가 string임을 인식
}

function processUser(user: User | null) {
  assertIsNonNull(user); // null/undefined이면 예외 발생
  return user.profile.name; // TypeScript가 user가 User임을 인식
}

// 비어있지 않음 확인
function processItems(items: unknown[]) {
  if (isNonEmptyArray(items)) {
    const first = items[0]; // undefined 검사 불필요
    return items.map(item => process(item));
  }
}

function processText(text: string) {
  if (isNonEmptyString(text)) {
    return text.charAt(0); // TypeScript가 문자열이 비어있지 않음을 인식
  }
}
```

## 기여하기

기여를 환영합니다! Pull Request를 자유롭게 제출해 주세요.

## 라이선스

MIT