import {
  FirstParameter,
  LastParameter,
  PromiseReturnType,
  AsyncFunction,
  Predicate,
  TypePredicate,
} from "../src/types/function";

describe("Function Utility Types", () => {
  describe("FirstParameter", () => {
    it("should extract first parameter type", () => {
      function testFunc(first: string, second: number): void {}

      type FirstParam = FirstParameter<typeof testFunc>;

      // Type test - should be string
      const param: FirstParam = "test";
      expect(param).toBe("test");
    });
  });

  describe("LastParameter", () => {
    it("should extract last parameter type", () => {
      function testFunc(first: string, second: number, last: boolean): void {}

      type LastParam = LastParameter<typeof testFunc>;

      // Type test - should be boolean
      const param: LastParam = true;
      expect(param).toBe(true);
    });
  });

  describe("PromiseReturnType", () => {
    it("should extract promise return type", () => {
      async function fetchUser(): Promise<{ id: string; name: string }> {
        return { id: "1", name: "John" };
      }

      type UserType = PromiseReturnType<typeof fetchUser>;

      // Type test
      const user: UserType = { id: "1", name: "John" };
      expect(user.id).toBe("1");
      expect(user.name).toBe("John");
    });
  });

  describe("AsyncFunction", () => {
    it("should define async function type", () => {
      const asyncFunc: AsyncFunction<[string], number> = async (
        str: string
      ) => {
        return str.length;
      };

      expect(asyncFunc).toBeDefined();
      expect(asyncFunc("test")).resolves.toBe(4);
    });
  });

  describe("Predicate", () => {
    it("should define predicate function type", () => {
      const isEven: Predicate<number> = (n) => n % 2 === 0;
      const isLongString: Predicate<string> = (s) => s.length > 5;

      expect(isEven(4)).toBe(true);
      expect(isEven(3)).toBe(false);
      expect(isLongString("hello world")).toBe(true);
      expect(isLongString("hi")).toBe(false);
    });
  });

  describe("TypePredicate", () => {
    it("should define type guard function", () => {
      const isString: TypePredicate<unknown, string> = (
        value
      ): value is string => {
        return typeof value === "string";
      };

      expect(isString("test")).toBe(true);
      expect(isString(123)).toBe(false);
      expect(isString(null)).toBe(false);
    });
  });
});
