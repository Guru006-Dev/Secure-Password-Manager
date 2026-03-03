import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { ToastProvider, useToast } from '../src/contexts/ToastContext';

// Checking US 9: Action Confirmation
describe('Toast Notification System', () => {
    it('provides a context for adding toasts', () => {
        const { result } = renderHook(() => useToast(), {
            wrapper: ToastProvider
        });

        expect(result.current.toasts).toEqual([]);
        expect(typeof result.current.showToast).toBe('function');
    });

    it('adds a toast message correctly', () => {
        const { result } = renderHook(() => useToast(), {
            wrapper: ToastProvider
        });

        act(() => {
            result.current.showToast('Test Message', 'success');
        });

        expect(result.current.toasts).toHaveLength(1);
        expect(result.current.toasts[0].message).toBe('Test Message');
        expect(result.current.toasts[0].type).toBe('success');
    });

    it('removes toast after timeout', async () => {
        vi.useFakeTimers();

        const { result } = renderHook(() => useToast(), {
            wrapper: ToastProvider
        });

        act(() => {
            result.current.showToast('Disappearing Act', 'error');
        });

        expect(result.current.toasts).toHaveLength(1);

        act(() => {
            vi.advanceTimersByTime(3100);
        });

        expect(result.current.toasts).toHaveLength(0);

        vi.useRealTimers();
    });
});
