/**
 * Represents a single password entry in the vault.
 */
export interface VaultEntry {
    /** Unique identifier for the entry */
    id: number;
    /** The website or service name (e.g., "Google", "Netflix") */
    website: string;
    /** The username or email associated with the account */
    username: string;
    /** The encrypted password (ciphertext) - "password" is now ciphertext per strict security rules */
    ciphertext: string;
    /** Category for organization */
    category: 'Social' | 'Work' | 'Shopping' | 'Finance' | 'Other';
    /** Whether the entry is marked as favorite */
    isFavorite: boolean;
    /** Date when the entry was created */
    createdAt: Date;
    /** Optional URL for favicon */
    icon?: string;
}

/**
 * Represents the user's profile settings.
 */
export interface UserProfile {
    displayName: string;
    avatarUrl: string;
    bannerColor: string;
}
