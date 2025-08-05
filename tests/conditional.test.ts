import {
  If,
  Not,
  And,
  Or,
  IsEqual,
  IsNever,
  IsAny,
  IsUnknown,
  IsArray,
  IsFunction,
  IsObject,
  IsPrimitive,
  NonNullish,
  Nullable,
  Optional,
  Maybe,
} from '../src/types/conditional';

describe('Conditional Types', () => {
  describe('If', () => {
    it('should work as conditional type', () => {
      type TrueCase = If<true, 'yes', 'no'>;
      type FalseCase = If<false, 'yes', 'no'>;
      
      // Type tests
      const trueResult: TrueCase = 'yes';
      const falseResult: FalseCase = 'no';
      
      expect(trueResult).toBe('yes');
      expect(falseResult).toBe('no');
    });
  });

  describe('Not', () => {
    it('should negate boolean types', () => {
      type NotTrue = Not<true>;
      type NotFalse = Not<false>;
      
      // Type tests
      const notTrue: NotTrue = false;
      const notFalse: NotFalse = true;
      
      expect(notTrue).toBe(false);
      expect(notFalse).toBe(true);
    });
  });

  describe('And', () => {
    it('should work as logical AND', () => {
      type TrueAndTrue = And<true, true>;
      type TrueAndFalse = And<true, false>;
      type FalseAndTrue = And<false, true>;
      type FalseAndFalse = And<false, false>;
      
      // Type tests
      const tt: TrueAndTrue = true;
      const tf: TrueAndFalse = false;
      const ft: FalseAndTrue = false;
      const ff: FalseAndFalse = false;
      
      expect(tt).toBe(true);
      expect(tf).toBe(false);
      expect(ft).toBe(false);
      expect(ff).toBe(false);
    });
  });

  describe('Or', () => {
    it('should work as logical OR', () => {
      type TrueOrTrue = Or<true, true>;
      type TrueOrFalse = Or<true, false>;
      type FalseOrTrue = Or<false, true>;
      type FalseOrFalse = Or<false, false>;
      
      // Type tests
      const tt: TrueOrTrue = true;
      const tf: TrueOrFalse = true;
      const ft: FalseOrTrue = true;
      const ff: FalseOrFalse = false;
      
      expect(tt).toBe(true);
      expect(tf).toBe(true);
      expect(ft).toBe(true);
      expect(ff).toBe(false);
    });
  });

  describe('IsEqual', () => {
    it('should check type equality', () => {
      type StringEqualsString = IsEqual<string, string>;
      type StringEqualsNumber = IsEqual<string, number>;
      type NumberEqualsNumber = IsEqual<number, number>;
      
      // Type tests
      const stringString: StringEqualsString = true;
      const stringNumber: StringEqualsNumber = false;
      const numberNumber: NumberEqualsNumber = true;
      
      expect(stringString).toBe(true);
      expect(stringNumber).toBe(false);
      expect(numberNumber).toBe(true);
    });
  });

  describe('IsNever', () => {
    it('should detect never type', () => {
      type NeverCheck = IsNever<never>;
      type StringCheck = IsNever<string>;
      
      // Type tests
      const neverResult: NeverCheck = true;
      const stringResult: StringCheck = false;
      
      expect(neverResult).toBe(true);
      expect(stringResult).toBe(false);
    });
  });

  describe('IsAny', () => {
    it('should detect any type', () => {
      type AnyCheck = IsAny<any>;
      type StringCheck = IsAny<string>;
      type UnknownCheck = IsAny<unknown>;
      
      // Type tests
      const anyResult: AnyCheck = true;
      const stringResult: StringCheck = false;
      const unknownResult: UnknownCheck = false;
      
      expect(anyResult).toBe(true);
      expect(stringResult).toBe(false);
      expect(unknownResult).toBe(false);
    });
  });

  describe('IsUnknown', () => {
    it('should detect unknown type', () => {
      type UnknownCheck = IsUnknown<unknown>;
      type AnyCheck = IsUnknown<any>;
      type StringCheck = IsUnknown<string>;
      
      // Type tests
      const unknownResult: UnknownCheck = true;
      const anyResult: AnyCheck = false;
      const stringResult: StringCheck = false;
      
      expect(unknownResult).toBe(true);
      expect(anyResult).toBe(false);
      expect(stringResult).toBe(false);
    });
  });

  describe('IsArray', () => {
    it('should detect array types', () => {
      type ArrayCheck = IsArray<string[]>;
      type TupleCheck = IsArray<[string, number]>;
      type StringCheck = IsArray<string>;
      type ObjectCheck = IsArray<{ length: number }>;
      
      // Type tests
      const arrayResult: ArrayCheck = true;
      const tupleResult: TupleCheck = true;
      const stringResult: StringCheck = false;
      const objectResult: ObjectCheck = false;
      
      expect(arrayResult).toBe(true);
      expect(tupleResult).toBe(true);
      expect(stringResult).toBe(false);
      expect(objectResult).toBe(false);
    });
  });

  describe('IsFunction', () => {
    it('should detect function types', () => {
      type FunctionCheck = IsFunction<() => void>;
      type ArrowFunctionCheck = IsFunction<(x: number) => string>;
      type StringCheck = IsFunction<string>;
      type ObjectCheck = IsFunction<{}>;
      
      // Type tests
      const functionResult: FunctionCheck = true;
      const arrowResult: ArrowFunctionCheck = true;
      const stringResult: StringCheck = false;
      const objectResult: ObjectCheck = false;
      
      expect(functionResult).toBe(true);
      expect(arrowResult).toBe(true);
      expect(stringResult).toBe(false);
      expect(objectResult).toBe(false);
    });
  });

  describe('IsObject', () => {
    it('should detect object types', () => {
      type ObjectCheck = IsObject<{ a: string }>;
      type ArrayCheck = IsObject<string[]>;
      type StringCheck = IsObject<string>;
      type NullCheck = IsObject<null>;
      
      // Type tests
      const objectResult: ObjectCheck = true;
      const arrayResult: ArrayCheck = false; // Arrays are excluded
      const stringResult: StringCheck = false;
      const nullResult: NullCheck = false;
      
      expect(objectResult).toBe(true);
      expect(arrayResult).toBe(false);
      expect(stringResult).toBe(false);
      expect(nullResult).toBe(false);
    });
  });

  describe('IsPrimitive', () => {
    it('should detect primitive types', () => {
      type StringCheck = IsPrimitive<string>;
      type NumberCheck = IsPrimitive<number>;
      type BooleanCheck = IsPrimitive<boolean>;
      type NullCheck = IsPrimitive<null>;
      type UndefinedCheck = IsPrimitive<undefined>;
      type SymbolCheck = IsPrimitive<symbol>;
      type BigIntCheck = IsPrimitive<bigint>;
      type ObjectCheck = IsPrimitive<{}>;
      type ArrayCheck = IsPrimitive<[]>;
      
      // Type tests
      const stringResult: StringCheck = true;
      const numberResult: NumberCheck = true;
      const booleanResult: BooleanCheck = true;
      const nullResult: NullCheck = true;
      const undefinedResult: UndefinedCheck = true;
      const symbolResult: SymbolCheck = true;
      const bigintResult: BigIntCheck = true;
      const objectResult: ObjectCheck = false;
      const arrayResult: ArrayCheck = false;
      
      expect(stringResult).toBe(true);
      expect(numberResult).toBe(true);
      expect(booleanResult).toBe(true);
      expect(nullResult).toBe(true);
      expect(undefinedResult).toBe(true);
      expect(symbolResult).toBe(true);
      expect(bigintResult).toBe(true);
      expect(objectResult).toBe(false);
      expect(arrayResult).toBe(false);
    });
  });

  describe('NonNullish', () => {
    it('should remove null and undefined', () => {
      type StringOrNull = string | null;
      type StringOrUndefined = string | undefined;
      type StringOrNullish = string | null | undefined;
      
      type CleanString1 = NonNullish<StringOrNull>;
      type CleanString2 = NonNullish<StringOrUndefined>;
      type CleanString3 = NonNullish<StringOrNullish>;
      
      // Type tests - should all be string
      const clean1: CleanString1 = 'test';
      const clean2: CleanString2 = 'test';
      const clean3: CleanString3 = 'test';
      
      expect(clean1).toBe('test');
      expect(clean2).toBe('test');
      expect(clean3).toBe('test');
    });
  });

  describe('Nullable', () => {
    it('should add null to type', () => {
      type NullableString = Nullable<string>;
      
      // Type tests
      const str: NullableString = 'test';
      const nullValue: NullableString = null;
      
      expect(str).toBe('test');
      expect(nullValue).toBe(null);
    });
  });

  describe('Optional', () => {
    it('should add undefined to type', () => {
      type OptionalString = Optional<string>;
      
      // Type tests
      const str: OptionalString = 'test';
      const undefinedValue: OptionalString = undefined;
      
      expect(str).toBe('test');
      expect(undefinedValue).toBe(undefined);
    });
  });

  describe('Maybe', () => {
    it('should add null and undefined to type', () => {
      type MaybeString = Maybe<string>;
      
      // Type tests
      const str: MaybeString = 'test';
      const nullValue: MaybeString = null;
      const undefinedValue: MaybeString = undefined;
      
      expect(str).toBe('test');
      expect(nullValue).toBe(null);
      expect(undefinedValue).toBe(undefined);
    });
  });
});