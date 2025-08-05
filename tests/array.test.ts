import {
  ArrayElement,
  NonEmptyArray,
  Head,
  Tail,
  Last,
  Length,
  Reverse,
  FlattenArray,
  Includes,
} from '../src/types/array';

describe('Array Utility Types', () => {
  describe('ArrayElement', () => {
    it('should extract array element type', () => {
      type StringArray = string[];
      type ElementType = ArrayElement<StringArray>;

      // Type test
      const element: ElementType = 'test';
      expect(element).toBe('test');
    });
  });

  describe('NonEmptyArray', () => {
    it('should ensure array has at least one element', () => {
      const nonEmpty: NonEmptyArray<string> = ['first', 'second'];
      const singleElement: NonEmptyArray<number> = [42];

      expect(nonEmpty.length).toBeGreaterThan(0);
      expect(singleElement.length).toBe(1);
      expect(nonEmpty[0]).toBe('first');
      expect(singleElement[0]).toBe(42);
    });
  });

  describe('Head', () => {
    it('should extract first element type', () => {
      type TestTuple = ['first', 'second', 'third'];
      type FirstElement = Head<TestTuple>;

      // Type test - should be 'first'
      const first: FirstElement = 'first';
      expect(first).toBe('first');
    });
  });

  describe('Tail', () => {
    it('should extract all elements except first', () => {
      type TestTuple = ['first', 'second', 'third'];
      type RestElements = Tail<TestTuple>;

      // Type test - should be ['second', 'third']
      const rest: RestElements = ['second', 'third'];
      expect(rest).toEqual(['second', 'third']);
    });
  });

  describe('Last', () => {
    it('should extract last element type', () => {
      type TestTuple = ['first', 'second', 'third'];
      type LastElement = Last<TestTuple>;

      // Type test - should be 'third'
      const last: LastElement = 'third';
      expect(last).toBe('third');
    });
  });

  describe('Length', () => {
    it('should get tuple length', () => {
      type TestTuple = ['a', 'b', 'c'];
      type TupleLength = Length<TestTuple>;

      // Type test - should be 3
      const length: TupleLength = 3;
      expect(length).toBe(3);
    });
  });

  describe('Reverse', () => {
    it('should reverse tuple order', () => {
      type TestTuple = ['first', 'second', 'third'];
      type ReversedTuple = Reverse<TestTuple>;

      // Type test - should be ['third', 'second', 'first']
      const reversed: ReversedTuple = ['third', 'second', 'first'];
      expect(reversed).toEqual(['third', 'second', 'first']);
    });
  });

  describe('Includes', () => {
    it('should check if array includes type', () => {
      type TestTuple = ['apple', 'banana', 'cherry'];
      type HasApple = Includes<TestTuple, 'apple'>;
      type HasGrape = Includes<TestTuple, 'grape'>;

      // Type tests
      const hasApple: HasApple = true;
      const hasGrape: HasGrape = false;

      expect(hasApple).toBe(true);
      expect(hasGrape).toBe(false);
    });
  });
});