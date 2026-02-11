import { describe, it, expect } from 'vitest';
import { filterEntries } from '../src/utils/filter';
import { VaultEntry } from '../src/types/index';

const mockEntries: VaultEntry[] = [
    { id: 1, website: 'Google', username: 'guru', ciphertext: '123', category: 'Work', isFavorite: false, createdAt: new Date() },
    { id: 2, website: 'Netflix', username: 'chill', ciphertext: '456', category: 'Entertainment', isFavorite: true, createdAt: new Date() },
    { id: 3, website: 'GitHub', username: 'dev', ciphertext: '789', category: 'Work', isFavorite: false, createdAt: new Date() },
];

describe('Vault Filtering Logic', () => {
    it('returns all entries when search is empty', () => {
        const result = filterEntries(mockEntries, '', 'all');
        expect(result).toHaveLength(3);
    });

    it('filters by website name (case-insensitive)', () => {
        const result = filterEntries(mockEntries, 'google', 'all');
        expect(result).toHaveLength(1);
        expect(result[0].website).toBe('Google');
    });

    it('filters by username', () => {
        const result = filterEntries(mockEntries, 'chill', 'all');
        expect(result).toHaveLength(1);
        expect(result[0].username).toBe('chill');
    });

    it('filters by category', () => {
        const result = filterEntries(mockEntries, '', 'Work');
        expect(result).toHaveLength(2);
        expect(result.map(e => e.website)).toContain('Google');
        expect(result.map(e => e.website)).toContain('GitHub');
    });

    it('combines search and category', () => {
        const result = filterEntries(mockEntries, 'git', 'Work');
        expect(result).toHaveLength(1);
        expect(result[0].website).toBe('GitHub');
    });

    it('returns empty array if no match found', () => {
        const result = filterEntries(mockEntries, 'xyz', 'all');
        expect(result).toHaveLength(0);
    });
});
