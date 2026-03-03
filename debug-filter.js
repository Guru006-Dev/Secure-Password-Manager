const mockEntries = [
    { id: '1', website: 'Google', username: 'guru', password: '123', category: 'Work', isFavorite: false, createdAt: 0 },
    { id: '2', website: 'Netflix', username: 'chill', password: '456', category: 'Entertainment', isFavorite: true, createdAt: 0 },
    { id: '3', website: 'GitHub', username: 'dev', password: '789', category: 'Work', isFavorite: false, createdAt: 0 },
];

function filterEntries(
    entries,
    search,
    category
) {
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

console.log('--- TEST RUN ---');
const result = filterEntries(mockEntries, '', 'all');
console.log('Result length:', result.length);
if (result.length !== 3) {
    console.error('FAILED: Expected 3, got', result.length);
} else {
    console.log('PASSED: Empty Search');
}

const catResult = filterEntries(mockEntries, '', 'Work');
console.log('Category "Work" length:', catResult.length);
if (catResult.length !== 2) {
    console.error('FAILED: Expected 2, got', catResult.length);
    console.log('Entries:', JSON.stringify(catResult, null, 2));
} else {
    console.log('PASSED: Category Search');
}
