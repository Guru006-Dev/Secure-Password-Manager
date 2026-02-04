export interface VaultEntry {
    id: number;
    website: string;
    username: string;
    ciphertext: string; // "password" is now ciphertext per strict security rules
    category: 'Social' | 'Work' | 'Shopping' | 'Finance' | 'Other';
    isFavorite: boolean;
    createdAt: Date;
    icon?: string; // Optional URL for favicon
}

export interface UserProfile {
    name: string;
    email: string;
    avatar?: string;
}
