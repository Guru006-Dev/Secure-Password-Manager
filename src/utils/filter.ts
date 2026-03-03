import type { VaultEntry } from '../types';

export function filterEntries(
    entries: VaultEntry[],
    search: string,
    category: string
): VaultEntry[] {
    const lowerSearch = search.toLowerCase();

    return entries.filter(entry => {
        const matchesSearch =
            entry.website.toLowerCase().includes(lowerSearch) ||
            entry.username.toLowerCase().includes(lowerSearch);

        const matchesCategory =
            category === 'all' ||
            entry.category === category;

        return matchesSearch && matchesCategory;
    });
}
