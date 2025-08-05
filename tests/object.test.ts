import {
  DeepPartial,
  DeepRequired,
  DeepReadonly,
  PickByType,
  OmitByType,
  Merge,
  OptionalKeys,
  RequiredKeys,
} from '../src/types/object';

describe('Object Utility Types', () => {
  describe('DeepPartial', () => {
    it('should make all properties optional recursively', () => {
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

      type PartialUser = DeepPartial<User>;

      // Type tests - these should compile without errors
      const partialUser1: PartialUser = {};
      const partialUser2: PartialUser = { id: 'test' };
      const partialUser3: PartialUser = {
        profile: {
          name: 'John',
          settings: {}
        }
      };

      expect(partialUser1).toBeDefined();
      expect(partialUser2).toBeDefined();
      expect(partialUser3).toBeDefined();
    });
  });

  describe('PickByType', () => {
    it('should pick properties by value type', () => {
      interface TestObject {
        stringProp: string;
        numberProp: number;
        booleanProp: boolean;
        stringProp2: string;
      }

      type StringProps = PickByType<TestObject, string>;
      
      // Type test - should only have string properties
      const stringOnly: StringProps = {
        stringProp: 'test',
        stringProp2: 'test2'
      };

      expect(stringOnly.stringProp).toBe('test');
      expect(stringOnly.stringProp2).toBe('test2');
    });
  });

  describe('OmitByType', () => {
    it('should omit properties by value type', () => {
      interface TestObject {
        stringProp: string;
        numberProp: number;
        booleanProp: boolean;
      }

      type NonStringProps = OmitByType<TestObject, string>;
      
      // Type test - should not have string properties
      const nonStringOnly: NonStringProps = {
        numberProp: 42,
        booleanProp: true
      };

      expect(nonStringOnly.numberProp).toBe(42);
      expect(nonStringOnly.booleanProp).toBe(true);
    });
  });

  describe('Merge', () => {
    it('should merge two object types', () => {
      interface TypeA {
        a: string;
        shared: number;
      }

      interface TypeB {
        b: boolean;
        shared: string; // This should override TypeA's shared property
      }

      type Merged = Merge<TypeA, TypeB>;

      const merged: Merged = {
        a: 'test',
        b: true,
        shared: 'overridden' // Should be string, not number
      };

      expect(merged.a).toBe('test');
      expect(merged.b).toBe(true);
      expect(merged.shared).toBe('overridden');
    });
  });
});