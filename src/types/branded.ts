// Branded types for type safety

// Base branded type
export type Brand<T, B> = T & { __brand: B };

// Opaque type (stronger than branded)
export type Opaque<T, B> = T & { readonly __opaque: B };

// Common branded types
export type UserId = Brand<string, 'UserId'>;
export type Email = Brand<string, 'Email'>;
export type URL = Brand<string, 'URL'>;
export type UUID = Brand<string, 'UUID'>;
export type Timestamp = Brand<number, 'Timestamp'>;
export type PositiveNumber = Brand<number, 'PositiveNumber'>;
export type NonZeroNumber = Brand<number, 'NonZeroNumber'>;

// Branded validation helpers
export const createUserId = (id: string): UserId => id as UserId;
export const createEmail = (email: string): Email => {
  if (!email.includes('@')) {
    throw new Error('Invalid email format');
  }
  return email as Email;
};
export const createURL = (url: string): URL => {
  try {
    new URL(url);
    return url as URL;
  } catch {
    throw new Error('Invalid URL format');
  }
};

// Extract brand from branded type
export type UnBrand<T> = T extends Brand<infer U, any> ? U : T;

// Check if type is branded
export type IsBranded<T> = T extends Brand<any, any> ? true : false;

// Nominal typing helpers
export interface Nominal<T extends string> {
  readonly __nominal: T;
}

// Create nominal type
export type CreateNominal<T, N extends string> = T & Nominal<N>;