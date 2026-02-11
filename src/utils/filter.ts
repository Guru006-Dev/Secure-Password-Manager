import type { VaultEntry } from '../types';

/**
 * Filters vault entries based on search query and category.
 * @param entries List of vault entries to filter
 * @param search Search string (matches website or username)
 * @param category Category to filter by ('all' or specific category)
 * @returns Filtered list of entries
 */
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
