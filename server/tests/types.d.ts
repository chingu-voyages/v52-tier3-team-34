declare module '@jest/globals' {
    export const describe: (name: string, fn: () => void) => void;
    export const it: (name: string, fn: () => void | Promise<void>) => void;
    export const expect: jest.Expect;
    export const beforeAll: (fn: () => void | Promise<void>) => void;
    export const afterAll: (fn: () => void | Promise<void>) => void;
    export const beforeEach: (fn: () => void | Promise<void>) => void;
    export const afterEach: (fn: () => void | Promise<void>) => void;
    export const jest: typeof import('@jest/globals').jest;
}

declare namespace jest {
    interface Expect {
        <T = any>(actual: T): jest.Matchers<T>;
    }

    interface Matchers<R> {
        toBe(expected: any): R;
        toEqual(expected: any): R;
        toBeNull(): R;
        toBeDefined(): R;
        toBeUndefined(): R;
        toBeNaN(): R;
        toBeTruthy(): R;
        toBeFalsy(): R;
        toBeGreaterThan(n: number): R;
        toBeGreaterThanOrEqual(n: number): R;
        toBeLessThan(n: number): R;
        toBeLessThanOrEqual(n: number): R;
        toContain(item: any): R;
        toHaveProperty(keyPath: string | string[], value?: any): R;
        toThrow(error?: string | Constructable | RegExp | Error): R;
        toThrowError(error?: string | Constructable | RegExp | Error): R;
        toMatch(regexpOrString: RegExp | string): R;
        toMatchObject(object: {[key: string]: any}): R;
        toHaveLength(length: number): R;
        toBeInstanceOf(class_: any): R;
    }

    interface Constructable {
        new (...args: any[]): any;
    }
}
