import { describe, it, expect } from 'vitest';
import { generatePassword, calculateStrength } from '../src/utils/generator';

describe('Password Generator', () => {
    it('generates a password of specified length', () => {
        const password = generatePassword(16, { uppercase: true, numbers: true, symbols: true });
        expect(password).toHaveLength(16);
    });

    it('includes uppercase letters when requested', () => {
        const password = generatePassword(100, { uppercase: true, numbers: false, symbols: false });
        expect(password).toMatch(/[A-Z]/);
    });

    it('includes numbers when requested', () => {
        const password = generatePassword(100, { uppercase: false, numbers: true, symbols: false });
        expect(password).toMatch(/[0-9]/);
    });

    it('includes symbols when requested', () => {
        const password = generatePassword(100, { uppercase: false, numbers: false, symbols: true });
        expect(password).toMatch(/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/);
    });

    it('calculates strength correctly', () => {
        expect(calculateStrength('weak')).toBe('Weak');
        expect(calculateStrength('Medium123')).toBe('Medium');
        expect(calculateStrength('StrongP@ssw0rd!')).toBe('Strong');
    });
});
