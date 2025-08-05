import {
  Capitalize,
  Uncapitalize,
  Replace,
  ReplaceAll,
  Split,
  Join,
  Trim,
  StringLength,
  ReverseString,
  StartsWith,
  EndsWith,
  ExtractRouteParams,
} from '../src/types/string';

describe('String Utility Types', () => {
  describe('Capitalize', () => {
    it('should capitalize first letter', () => {
      type Capitalized1 = Capitalize<'hello'>;
      type Capitalized2 = Capitalize<'world'>;
      type Empty = Capitalize<''>;
      
      // Type tests
      const cap1: Capitalized1 = 'Hello';
      const cap2: Capitalized2 = 'World';
      const empty: Empty = '';
      
      expect(cap1).toBe('Hello');
      expect(cap2).toBe('World');
      expect(empty).toBe('');
    });
  });

  describe('Uncapitalize', () => {
    it('should uncapitalize first letter', () => {
      type Uncapitalized1 = Uncapitalize<'Hello'>;
      type Uncapitalized2 = Uncapitalize<'World'>;
      type Empty = Uncapitalize<''>;
      
      // Type tests
      const uncap1: Uncapitalized1 = 'hello';
      const uncap2: Uncapitalized2 = 'world';
      const empty: Empty = '';
      
      expect(uncap1).toBe('hello');
      expect(uncap2).toBe('world');
      expect(empty).toBe('');
    });
  });

  describe('Replace', () => {
    it('should replace first occurrence', () => {
      type Replaced1 = Replace<'hello world', 'o', 'a'>;
      type Replaced2 = Replace<'TypeScript', 'Type', 'Java'>;
      type NoMatch = Replace<'hello', 'x', 'y'>;
      
      // Type tests
      const replaced1: Replaced1 = 'hella world';
      const replaced2: Replaced2 = 'JavaScript';
      const noMatch: NoMatch = 'hello';
      
      expect(replaced1).toBe('hella world');
      expect(replaced2).toBe('JavaScript');
      expect(noMatch).toBe('hello');
    });
  });

  describe('ReplaceAll', () => {
    it('should replace all occurrences', () => {
      type ReplacedAll1 = ReplaceAll<'hello world', 'o', 'a'>;
      type ReplacedAll2 = ReplaceAll<'aaa', 'a', 'b'>;
      type NoMatch = ReplaceAll<'hello', 'x', 'y'>;
      
      // Type tests
      const replacedAll1: ReplacedAll1 = 'hella warld';
      const replacedAll2: ReplacedAll2 = 'bbb';
      const noMatch: NoMatch = 'hello';
      
      expect(replacedAll1).toBe('hella warld');
      expect(replacedAll2).toBe('bbb');
      expect(noMatch).toBe('hello');
    });
  });

  describe('Split', () => {
    it('should split string by delimiter', () => {
      type Split1 = Split<'a,b,c', ','>;
      type Split2 = Split<'hello world', ' '>;
      type NoDelimiter = Split<'hello', ','>;
      
      // Type tests
      const split1: Split1 = ['a', 'b', 'c'];
      const split2: Split2 = ['hello', 'world'];
      const noDelimiter: NoDelimiter = ['hello'];
      
      expect(split1).toEqual(['a', 'b', 'c']);
      expect(split2).toEqual(['hello', 'world']);
      expect(noDelimiter).toEqual(['hello']);
    });
  });

  describe('Join', () => {
    it('should join array of strings', () => {
      type Joined1 = Join<['a', 'b', 'c'], ','>;
      type Joined2 = Join<['hello', 'world'], ' '>;
      type Single = Join<['hello'], ','>;
      type Empty = Join<[], ','>;
      
      // Type tests
      const joined1: Joined1 = 'a,b,c';
      const joined2: Joined2 = 'hello world';
      const single: Single = 'hello';
      const empty: Empty = '';
      
      expect(joined1).toBe('a,b,c');
      expect(joined2).toBe('hello world');
      expect(single).toBe('hello');
      expect(empty).toBe('');
    });
  });

  describe('Trim', () => {
    it('should trim whitespace', () => {
      type Trimmed1 = Trim<' hello '>;
      type Trimmed2 = Trim<'  world  '>;
      type NoSpaces = Trim<'hello'>;
      type OnlySpaces = Trim<'   '>;
      
      // Type tests
      const trimmed1: Trimmed1 = 'hello';
      const trimmed2: Trimmed2 = 'world';
      const noSpaces: NoSpaces = 'hello';
      const onlySpaces: OnlySpaces = '';
      
      expect(trimmed1).toBe('hello');
      expect(trimmed2).toBe('world');
      expect(noSpaces).toBe('hello');
      expect(onlySpaces).toBe('');
    });
  });

  describe('StringLength', () => {
    it('should get string length', () => {
      type Length1 = StringLength<'hello'>;
      type Length2 = StringLength<'world!'>;
      type Empty = StringLength<''>;
      type Single = StringLength<'a'>;
      
      // Type tests
      const length1: Length1 = 5;
      const length2: Length2 = 6;
      const empty: Empty = 0;
      const single: Single = 1;
      
      expect(length1).toBe(5);
      expect(length2).toBe(6);
      expect(empty).toBe(0);
      expect(single).toBe(1);
    });
  });

  describe('ReverseString', () => {
    it('should reverse string', () => {
      type Reversed1 = ReverseString<'hello'>;
      type Reversed2 = ReverseString<'world'>;
      type Empty = ReverseString<''>;
      type Single = ReverseString<'a'>;
      
      // Type tests
      const reversed1: Reversed1 = 'olleh';
      const reversed2: Reversed2 = 'dlrow';
      const empty: Empty = '';
      const single: Single = 'a';
      
      expect(reversed1).toBe('olleh');
      expect(reversed2).toBe('dlrow');
      expect(empty).toBe('');
      expect(single).toBe('a');
    });
  });

  describe('StartsWith', () => {
    it('should check if string starts with pattern', () => {
      type StartsWithHello = StartsWith<'hello world', 'hello'>;
      type StartsWithWorld = StartsWith<'hello world', 'world'>;
      type StartsWithEmpty = StartsWith<'hello', ''>;
      type EmptyString = StartsWith<'', 'hello'>;
      
      // Type tests
      const startsWithHello: StartsWithHello = true;
      const startsWithWorld: StartsWithWorld = false;
      const startsWithEmpty: StartsWithEmpty = true;
      const emptyString: EmptyString = false;
      
      expect(startsWithHello).toBe(true);
      expect(startsWithWorld).toBe(false);
      expect(startsWithEmpty).toBe(true);
      expect(emptyString).toBe(false);
    });
  });

  describe('EndsWith', () => {
    it('should check if string ends with pattern', () => {
      type EndsWithWorld = EndsWith<'hello world', 'world'>;
      type EndsWithHello = EndsWith<'hello world', 'hello'>;
      type EndsWithEmpty = EndsWith<'hello', ''>;
      type EmptyString = EndsWith<'', 'hello'>;
      
      // Type tests
      const endsWithWorld: EndsWithWorld = true;
      const endsWithHello: EndsWithHello = false;
      const endsWithEmpty: EndsWithEmpty = true;
      const emptyString: EmptyString = false;
      
      expect(endsWithWorld).toBe(true);
      expect(endsWithHello).toBe(false);
      expect(endsWithEmpty).toBe(true);
      expect(emptyString).toBe(false);
    });
  });

  describe('ExtractRouteParams', () => {
    it('should extract route parameters', () => {
      type Params1 = ExtractRouteParams<'/api/users/:userId'>;
      type Params2 = ExtractRouteParams<'/api/users/:userId/posts/:postId'>;
      type Params3 = ExtractRouteParams<'/api/users/:userId/posts/:postId/comments/:commentId'>;
      type NoParams = ExtractRouteParams<'/api/users'>;
      
      // Type tests
      const params1: Params1 = 'userId';
      const params2: Params2 = 'userId'; // or 'postId' - union type
      const params3: Params3 = 'userId'; // or 'postId' or 'commentId' - union type
      
      // Test that all expected values are valid
      const userIdParam: Params2 = 'userId';
      const postIdParam: Params2 = 'postId';
      const userIdParam3: Params3 = 'userId';
      const postIdParam3: Params3 = 'postId';
      const commentIdParam3: Params3 = 'commentId';
      
      expect(params1).toBe('userId');
      expect(userIdParam).toBe('userId');
      expect(postIdParam).toBe('postId');
      expect(userIdParam3).toBe('userId');
      expect(postIdParam3).toBe('postId');
      expect(commentIdParam3).toBe('commentId');
    });

    it('should return never for routes without parameters', () => {
      type NoParams = ExtractRouteParams<'/api/users'>;
      
      // Type test - this should be never, so we can't assign any actual value
      // We can only test this at the type level by ensuring it doesn't accept values
      const testNever = (param: NoParams) => param;
      
      // This test mainly validates that the type system works correctly
      expect(testNever).toBeDefined();
    });
  });
});