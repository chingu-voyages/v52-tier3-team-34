import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js'],
    roots: ['<rootDir>/tests'],
    testMatch: [
        '**/__tests__/**/*.+(ts|js)',
        '**/?(*.)+(spec|test).+(ts|js)'
    ],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
    // Coverage configuration
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{js,ts}',
        '!src/**/*.d.ts',
        '!src/**/*.test.{js,ts}'
    ],
    coverageDirectory: 'coverage',
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    }
};

export default config;
