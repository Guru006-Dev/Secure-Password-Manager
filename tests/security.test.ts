import { describe, it, expect, vi, afterEach } from 'vitest';

// Simulating US 3 (Auto-Lock Logic) and US 2 (Clipboard Security)

describe('Security Mechanisms', () => {

    // US 2: Clipboard Clearing
    describe('Clipboard Security', () => {
        it('clears clipboard after 30 seconds', () => {
            vi.useFakeTimers();
            const writeTextMock = vi.fn();

            // Mock navigator.clipboard
            Object.assign(navigator, {
                clipboard: {
                    writeText: writeTextMock,
                },
            });

            // Simulate copy action (logic extracted from VaultItem/useClipboard)
            const copySecurely = (text: string) => {
                navigator.clipboard.writeText(text);
                setTimeout(() => {
                    navigator.clipboard.writeText('');
                }, 30 * 1000);
            };

            copySecurely('MySecretPassword');
            expect(writeTextMock).toHaveBeenCalledWith('MySecretPassword');

            // Fast-forward 30 seconds
            vi.advanceTimersByTime(30000);

            expect(writeTextMock).toHaveBeenLastCalledWith('');
            vi.useRealTimers();
        });
    });

    // US 3: Auto-Lock Logic
    describe('Auto-Lock Calculation', () => {
        it('determines if vault should be locked based on inactivity', () => {
            const checkAutoLock = (lastActivity: number, timeoutMinutes: number): boolean => {
                const now = Date.now();
                const timeoutMs = timeoutMinutes * 60 * 1000;
                return (now - lastActivity) > timeoutMs;
            };

            const now = Date.now();
            // 5 minutes ago
            const fiveMinsAgo = now - (5 * 60 * 1000);

            // Should lock if timeout is 3 mins
            expect(checkAutoLock(fiveMinsAgo - 1000, 3)).toBe(true);

            // Should NOT lock if timeout is 10 mins
            expect(checkAutoLock(fiveMinsAgo, 10)).toBe(false);
        });
    });
});
