# 고급 TypeScript 유틸리티 타입

[English](./README.md) | [한국어](./README.ko.md) | [中文](./README.zh.md) | [日本語](./README.ja.md)

실용적인 개발을 위한 포괄적인 고급 TypeScript 유틸리티 타입 모음입니다. 이 패키지는 TypeScript 프로젝트에서 타입 안전성과 개발자 경험을 향상시키는 다양한 타입 레벨 유틸리티를 제공합니다.

## 설치

```bash
npm install advanced-ts-utility-types
```

## 사용법

```typescript
import { DeepPartial, NonEmptyArray, Brand } from 'utility-types';

// 깊은 부분형 예제
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

type PartialUser = DeepPartial<User>; // 모든 속성이 재귀적으로 선택적

// 비어있지 않은 배열 예제
function processItems<T>(items: NonEmptyArray<T>) {
  // TypeScript는 items에 최소 하나의 요소가 있다는 것을 알고 있음
  const first = items[0]; // undefined 체크 불필요
  return items.map(item => transform(item));
}

// 브랜드 타입 예제
type UserId = Brand<string, 'UserId'>;
const userId: UserId = createUserId('user-123');
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
- `assertIsString`, `assertIsNumber`, `assertIsNonNull`

## 예제

### 객체 타입
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

// 모든 속성이 선택적이 됨
type PartialConfig = DeepPartial<Config>;

// 문자열 속성만 선택
type StringProps = PickByType<Config['database'], string>; // { host: string }
```

### 배열 타입
```typescript
type Colors = ['red', 'green', 'blue'];
type FirstColor = Head<Colors>; // 'red'
type RestColors = Tail<Colors>; // ['green', 'blue']
type LastColor = Last<Colors>; // 'blue'
type ReversedColors = Reverse<Colors>; // ['blue', 'green', 'red']
```

### 문자열 타입
```typescript
type Route = '/api/users/:userId/posts/:postId';
type Params = ExtractRouteParams<Route>; // 'userId' | 'postId'

type Message = 'Hello World';
type Shouting = Uppercase<Message>; // 'HELLO WORLD'
type Words = Split<Message, ' '>; // ['Hello', 'World']
```

### 함수 타입
```typescript
function fetchUser(id: string, options?: { includeProfile: boolean }): Promise<User> {
  // 구현
}

type UserFetchParams = Parameters<typeof fetchUser>; // [string, { includeProfile: boolean }?]
type UserResult = PromiseReturnType<typeof fetchUser>; // User
```

## 기여하기

기여를 환영합니다! Pull Request를 자유롭게 제출해 주세요.

## 라이선스

MIT