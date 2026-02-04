import { VaultEntry } from "../types";

export const MOCK_VAULT: VaultEntry[] = [
    {
        id: 1,
        website: "Google",
        username: "guru@dev.com",
        ciphertext: "U2FsdGVkX19...",
        category: "Work",
        isFavorite: true,
        createdAt: new Date('2024-01-15')
    },
    {
        id: 2,
        website: "Netflix",
        username: "chill_guru",
        ciphertext: "U2FsdGVkX19...",
        category: "Social",
        isFavorite: true,
        createdAt: new Date('2024-02-01')
    },
    {
        id: 3,
        website: "GitHub",
        username: "Guru006",
        ciphertext: "U2FsdGVkX19...",
        category: "Work",
        isFavorite: false,
        createdAt: new Date('2024-01-10')
    },
    {
        id: 4,
        website: "Amazon",
        username: "shopper@guru",
        ciphertext: "U2FsdGVkX19...",
        category: "Shopping",
        isFavorite: false,
        createdAt: new Date('2024-01-20')
    },
    {
        id: 5,
        website: "Twitter",
        username: "@guru_dev",
        ciphertext: "U2FsdGVkX19...",
        category: "Social",
        isFavorite: false,
        createdAt: new Date('2024-02-02')
    }
];
