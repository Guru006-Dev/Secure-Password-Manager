import '@testing-library/jest-dom';
import { webcrypto } from 'node:crypto';

// Always polyfill for consistent testing behavior
Object.defineProperty(globalThis, 'crypto', {
    value: webcrypto,
    writable: true,
    configurable: true // Allow re-configuration
});
