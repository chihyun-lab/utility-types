import {
  isString,
  isNumber,
  isBoolean,
  isNull,
  isUndefined,
  isNullish,
  isObject,
  isArray,
  isFunction,
  isNonEmptyString,
  isNonEmptyArray,
  hasProperty,
  hasMethod,
  isInstanceOf,
  isOneOf,
  assertIsString,
  assertIsNumber,
  assertIsNonNull,
} from '../src/types/guards';

describe('Type Guards and Predicates', () => {
  describe('Basic type guards', () => {
    describe('isString', () => {
      it('should correctly identify strings', () => {
        expect(isString('hello')).toBe(true);
        expect(isString('')).toBe(true);
        expect(isString(123)).toBe(false);
        expect(isString(null)).toBe(false);
        expect(isString(undefined)).toBe(false);
        expect(isString({})).toBe(false);
      });
    });

    describe('isNumber', () => {
      it('should correctly identify numbers', () => {
        expect(isNumber(123)).toBe(true);
        expect(isNumber(0)).toBe(true);
        expect(isNumber(-456)).toBe(true);
        expect(isNumber(3.14)).toBe(true);
        expect(isNumber(NaN)).toBe(false); // NaN is excluded
        expect(isNumber('123')).toBe(false);
        expect(isNumber(null)).toBe(false);
        expect(isNumber(undefined)).toBe(false);
      });
    });

    describe('isBoolean', () => {
      it('should correctly identify booleans', () => {
        expect(isBoolean(true)).toBe(true);
        expect(isBoolean(false)).toBe(true);
        expect(isBoolean(0)).toBe(false);
        expect(isBoolean(1)).toBe(false);
        expect(isBoolean('true')).toBe(false);
        expect(isBoolean(null)).toBe(false);
      });
    });

    describe('isNull', () => {
      it('should correctly identify null', () => {
        expect(isNull(null)).toBe(true);
        expect(isNull(undefined)).toBe(false);
        expect(isNull(0)).toBe(false);
        expect(isNull('')).toBe(false);
        expect(isNull(false)).toBe(false);
      });
    });

    describe('isUndefined', () => {
      it('should correctly identify undefined', () => {
        expect(isUndefined(undefined)).toBe(true);
        expect(isUndefined(null)).toBe(false);
        expect(isUndefined(0)).toBe(false);
        expect(isUndefined('')).toBe(false);
        expect(isUndefined(false)).toBe(false);
      });
    });

    describe('isNullish', () => {
      it('should correctly identify null or undefined', () => {
        expect(isNullish(null)).toBe(true);
        expect(isNullish(undefined)).toBe(true);
        expect(isNullish(0)).toBe(false);
        expect(isNullish('')).toBe(false);
        expect(isNullish(false)).toBe(false);
      });
    });
  });

  describe('Object type guards', () => {
    describe('isObject', () => {
      it('should correctly identify objects', () => {
        expect(isObject({})).toBe(true);
        expect(isObject({ a: 1 })).toBe(true);
        expect(isObject([])).toBe(false); // Arrays are excluded
        expect(isObject(null)).toBe(false);
        expect(isObject('string')).toBe(false);
        expect(isObject(123)).toBe(false);
        expect(isObject(() => {})).toBe(false);
      });
    });

    describe('isArray', () => {
      it('should correctly identify arrays', () => {
        expect(isArray([])).toBe(true);
        expect(isArray([1, 2, 3])).toBe(true);
        expect(isArray(['a', 'b'])).toBe(true);
        expect(isArray({})).toBe(false);
        expect(isArray(null)).toBe(false);
        expect(isArray('string')).toBe(false);
      });
    });

    describe('isFunction', () => {
      it('should correctly identify functions', () => {
        expect(isFunction(() => {})).toBe(true);
        expect(isFunction(function() {})).toBe(true);
        expect(isFunction(Math.max)).toBe(true);
        expect(isFunction({})).toBe(false);
        expect(isFunction(null)).toBe(false);
        expect(isFunction('function')).toBe(false);
      });
    });
  });

  describe('Advanced type guards', () => {
    describe('isNonEmptyString', () => {
      it('should correctly identify non-empty strings', () => {
        expect(isNonEmptyString('hello')).toBe(true);
        expect(isNonEmptyString('a')).toBe(true);
        expect(isNonEmptyString('')).toBe(false);
        expect(isNonEmptyString(123)).toBe(false);
        expect(isNonEmptyString(null)).toBe(false);
      });
    });

    describe('isNonEmptyArray', () => {
      it('should correctly identify non-empty arrays', () => {
        expect(isNonEmptyArray([1])).toBe(true);
        expect(isNonEmptyArray([1, 2, 3])).toBe(true);
        expect(isNonEmptyArray(['a'])).toBe(true);
        expect(isNonEmptyArray([])).toBe(false);
      });
    });

    describe('hasProperty', () => {
      it('should check if object has property', () => {
        const obj = { name: 'John', age: 30 };
        
        expect(hasProperty(obj, 'name')).toBe(true);
        expect(hasProperty(obj, 'age')).toBe(true);
        expect(hasProperty(obj, 'email')).toBe(false);
        expect(hasProperty(null, 'name')).toBe(false);
        expect(hasProperty('string', 'length')).toBe(false); // strings are not objects in our guard
      });
    });

    describe('hasMethod', () => {
      it('should check if object has method', () => {
        const obj = {
          name: 'John',
          greet: () => 'Hello',
          age: 30
        };
        
        expect(hasMethod(obj, 'greet')).toBe(true);
        expect(hasMethod(obj, 'name')).toBe(false); // property exists but not a function
        expect(hasMethod(obj, 'age')).toBe(false);
        expect(hasMethod(obj, 'missing')).toBe(false);
        expect(hasMethod(null, 'greet')).toBe(false);
      });
    });
  });

  describe('Generic type predicates', () => {
    describe('isInstanceOf', () => {
      it('should create instance checker', () => {
        class TestClass {
          value: string;
          constructor(value: string) {
            this.value = value;
          }
        }
        
        const isTestClass = isInstanceOf(TestClass);
        const instance = new TestClass('test');
        const notInstance = { value: 'test' };
        
        expect(isTestClass(instance)).toBe(true);
        expect(isTestClass(notInstance)).toBe(false);
        expect(isTestClass(null)).toBe(false);
      });
    });

    describe('isOneOf', () => {
      it('should check if value is one of specified values', () => {
        const isColor = isOneOf('red', 'green', 'blue');
        
        expect(isColor('red')).toBe(true);
        expect(isColor('green')).toBe(true);
        expect(isColor('blue')).toBe(true);
        expect(isColor('yellow')).toBe(false);
        expect(isColor(null)).toBe(false);
        expect(isColor(123)).toBe(false);
      });

      it('should work with numbers', () => {
        const isValidCode = isOneOf(200, 404, 500);
        
        expect(isValidCode(200)).toBe(true);
        expect(isValidCode(404)).toBe(true);
        expect(isValidCode(500)).toBe(true);
        expect(isValidCode(201)).toBe(false);
        expect(isValidCode('200')).toBe(false);
      });
    });
  });

  describe('Assertion functions', () => {
    describe('assertIsString', () => {
      it('should pass for strings', () => {
        expect(() => assertIsString('hello')).not.toThrow();
        expect(() => assertIsString('')).not.toThrow();
      });

      it('should throw for non-strings', () => {
        expect(() => assertIsString(123)).toThrow('Expected string');
        expect(() => assertIsString(null)).toThrow('Expected string');
        expect(() => assertIsString(undefined)).toThrow('Expected string');
        expect(() => assertIsString({})).toThrow('Expected string');
      });
    });

    describe('assertIsNumber', () => {
      it('should pass for numbers', () => {
        expect(() => assertIsNumber(123)).not.toThrow();
        expect(() => assertIsNumber(0)).not.toThrow();
        expect(() => assertIsNumber(-456)).not.toThrow();
      });

      it('should throw for non-numbers', () => {
        expect(() => assertIsNumber('123')).toThrow('Expected number');
        expect(() => assertIsNumber(NaN)).toThrow('Expected number');
        expect(() => assertIsNumber(null)).toThrow('Expected number');
        expect(() => assertIsNumber(undefined)).toThrow('Expected number');
      });
    });

    describe('assertIsNonNull', () => {
      it('should pass for non-null values', () => {
        expect(() => assertIsNonNull('hello')).not.toThrow();
        expect(() => assertIsNonNull(0)).not.toThrow();
        expect(() => assertIsNonNull(false)).not.toThrow();
        expect(() => assertIsNonNull({})).not.toThrow();
        expect(() => assertIsNonNull([])).not.toThrow();
      });

      it('should throw for null or undefined', () => {
        expect(() => assertIsNonNull(null)).toThrow('Expected non-null value');
        expect(() => assertIsNonNull(undefined)).toThrow('Expected non-null value');
      });
    });
  });
});