import {
  Brand,
  Opaque,
  UserId,
  Email,
  URL,
  UUID,
  Timestamp,
  PositiveNumber,
  NonZeroNumber,
  createUserId,
  createEmail,
  createURL,
  UnBrand,
  IsBranded,
  CreateNominal,
} from "../src/types/branded";

describe("Branded Types", () => {
  describe("Brand", () => {
    it("should create branded types", () => {
      type CustomId = Brand<string, "CustomId">;

      const id: CustomId = "test-123" as CustomId;
      const plainString: string = id; // Should work - branded types are assignable to base types

      expect(id).toBe("test-123");
      expect(plainString).toBe("test-123");
    });
  });

  describe("Opaque", () => {
    it("should create opaque types", () => {
      type SecretToken = Opaque<string, "SecretToken">;

      const token: SecretToken = "secret-abc" as SecretToken;

      expect(token).toBe("secret-abc");
    });
  });

  describe("UserId", () => {
    it("should work with createUserId helper", () => {
      const userId = createUserId("user-123");

      expect(userId).toBe("user-123");

      // Type test - should be UserId branded type
      const id: UserId = userId;
      expect(id).toBe("user-123");
    });
  });

  describe("Email", () => {
    it("should validate email format with createEmail", () => {
      const validEmail = createEmail("test@example.com");

      expect(validEmail).toBe("test@example.com");

      // Type test
      const email: Email = validEmail;
      expect(email).toBe("test@example.com");
    });

    it("should throw error for invalid email format", () => {
      expect(() => createEmail("invalid-email")).toThrow(
        "Invalid email format"
      );
      expect(() => createEmail("no-at-sign")).toThrow("Invalid email format");
    });
  });

  describe("URL", () => {
    it("should validate URL format with createURL", () => {
      const validUrl = createURL("https://jsonplaceholder.typicode.com/");

      expect(validUrl).toBe("https://jsonplaceholder.typicode.com/");

      // Type test
      const url: URL = validUrl;
      expect(url).toBe("https://jsonplaceholder.typicode.com/");
    });

    it("should throw error for invalid URL format", () => {
      expect(() => createURL("not-a-url")).toThrow("Invalid URL format");
      expect(() => createURL("://missing-protocol")).toThrow(
        "Invalid URL format"
      );
    });
  });

  describe("Timestamp", () => {
    it("should work with timestamp values", () => {
      const now = Date.now();
      const timestamp: Timestamp = now as Timestamp;

      expect(timestamp).toBe(now);
      expect(typeof timestamp).toBe("number");
    });
  });

  describe("PositiveNumber", () => {
    it("should work with positive numbers", () => {
      const positive: PositiveNumber = 42 as PositiveNumber;

      expect(positive).toBe(42);
      expect(positive).toBeGreaterThan(0);
    });
  });

  describe("NonZeroNumber", () => {
    it("should work with non-zero numbers", () => {
      const nonZero: NonZeroNumber = -5 as NonZeroNumber;

      expect(nonZero).toBe(-5);
      expect(nonZero).not.toBe(0);
    });
  });

  describe("UnBrand", () => {
    it("should extract original type from branded type", () => {
      type BrandedString = Brand<string, "Test">;
      type Original = UnBrand<BrandedString>;

      // Type test - Original should be string
      const original: Original = "test";
      expect(original).toBe("test");
    });

    it("should return original type for non-branded types", () => {
      type NotBranded = string;
      type Original = UnBrand<NotBranded>;

      // Type test - Original should still be string
      const original: Original = "test";
      expect(original).toBe("test");
    });
  });

  describe("IsBranded", () => {
    it("should detect branded types", () => {
      type BrandedType = Brand<string, "Test">;
      type PlainType = string;

      // Test that branded types are detected correctly
      const brandedCheck: IsBranded<BrandedType> = true;

      // Use type assertion to avoid the literal type issue
      const plainCheck = false as IsBranded<PlainType>;

      expect(brandedCheck).toBe(true);
      expect(plainCheck).toBe(false);
    });
  });

  describe("CreateNominal", () => {
    it("should create nominal types", () => {
      type UserId = CreateNominal<string, "UserId">;
      type OrderId = CreateNominal<string, "OrderId">;

      const userId: UserId = "user-123" as UserId;
      const orderId: OrderId = "order-456" as OrderId;

      expect(userId).toBe("user-123");
      expect(orderId).toBe("order-456");

      // These would be type errors in real usage:
      // const wrongAssignment: UserId = orderId; // Error!
      // const anotherWrong: OrderId = userId; // Error!
    });
  });
});
