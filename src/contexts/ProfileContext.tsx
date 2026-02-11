import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useLocation } from 'wouter';
import type { UserProfile } from '../types';

interface ProfileContextType {
    profile: UserProfile;
    updateProfile: (data: UserProfile) => void;
    logout: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
    const [, setLocation] = useLocation();
    const [profile, setProfile] = useState<UserProfile>({
        displayName: 'Vault Keeper',
        avatarUrl: '',
        bannerColor: '#10b981'
    });

    useEffect(() => {
        const saved = localStorage.getItem('userProfile');
        if (saved) {
            setProfile(JSON.parse(saved));
        }
    }, []);

    const updateProfile = (data: UserProfile) => {
        setProfile(data);
        localStorage.setItem('userProfile', JSON.stringify(data));
    };

    const logout = () => {
        setLocation('/');
    };

    return (
        <ProfileContext.Provider value={{ profile, updateProfile, logout }}>
            {children}
        </ProfileContext.Provider>
    );
}

export function useProfile() {
    const context = useContext(ProfileContext);
    if (context === undefined) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
}
