import { describe, expect, test } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
    test('Should inicialize with default value of 10', () => {
        const { result } = renderHook(() => useCounter());

        expect(result.current.counter).toBe(10);
    });

    test('Should inicialize with default value 20', () => {
        const initialValue = 20;
        const { result } = renderHook(() => useCounter(initialValue));

        expect(result.current.counter).toBe(initialValue);
    });

    test('Should increment counter when handleAdd is called', () => {
        const { result } = renderHook(() => useCounter());
        act(() => {
            result.current.handleAdd();
        });
        expect(result.current.counter).toBe(11);
    });

    test('Should resent initial value the counter when handleReset is called', () => {
        const { result } = renderHook(() => useCounter());
        act(() => {
            result.current.handleSubstract();
            result.current.handleSubstract();
            result.current.handleSubstract();
            result.current.handleSubstract();
            result.current.handleSubstract();
        });

        expect(result.current.counter).toBe(5);

        act(() => {
            result.current.handleReset();
        });

        expect(result.current.counter).toBe(10);
    });

    test('Should decrement counter when handleSubtract is called', () => {
        const { result } = renderHook(() => useCounter());
        act(() => {
            result.current.handleSubstract();
        });
        expect(result.current.counter).toBe(9);
    });
});