import { describe, expect, test, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useGifs } from './useGifs';

import * as gifActions from '../actions/get-gifs-by-query.actions';

describe('useGifs', () => {
    test('Should return values and methods', () => {
        const { result } = renderHook(() => useGifs());
        expect(result.current.previusGifts.length).toBe(0);
        expect(result.current.previusTerms.length).toBe(0);
        expect(result.current.previusGifts).toStrictEqual([]);

        expect(result.current.handleSearch).toBeDefined();
        expect(result.current.handleTermClicked).toBeDefined();
    });

    test('Should return a list of gifs', async () => {
        //handleSearch
        const { result } = renderHook(() => useGifs());

        await act(async () => {
            await result.current.handleSearch('Goku');
        });
        //console.log(result.current.previusGifts);
        expect(result.current.previusGifts.length).toBe(10);
    });

    test('Should return a list of gifs when a handleTermClicked is called', async () => {
        const { result } = renderHook(() => useGifs());

        await act(async () => {
            await result.current.handleTermClicked('Goku');
        });

        expect(result.current.previusGifts.length).toBe(10);

    })

    test('Should return a list of gifs from cache', async () => {
        const { result } = renderHook(() => useGifs());

        await act(async () => {
            await result.current.handleTermClicked('Goku');
        });

        expect(result.current.previusGifts.length).toBe(10);

        vi.spyOn(gifActions, 'getGifsByQuery').mockRejectedValue(new Error('This is my custom error'));

        await act(async () => {
            await result.current.handleTermClicked('Goku');
        });

        expect(result.current.previusGifts.length).toBe(10);
    });

    test('Should return no more than 8 previous terms', async () => {
        const { result } = renderHook(() => useGifs());

        vi.spyOn(gifActions, 'getGifsByQuery').mockResolvedValue([]);

        await act(async () => {
            await result.current.handleSearch('Goku1');
        });
        await act(async () => {
            await result.current.handleSearch('Goku2');
        });
        await act(async () => {
            await result.current.handleSearch('Goku3');
        });
        await act(async () => {
            await result.current.handleSearch('Goku4');
        });
        await act(async () => {
            await result.current.handleSearch('Goku5');
        });
        await act(async () => {
            await result.current.handleSearch('Goku6');
        });
        await act(async () => {
            await result.current.handleSearch('Goku7');
        });
        await act(async () => {
            await result.current.handleSearch('Goku8');
        });
        await act(async () => {
            await result.current.handleSearch('Goku9');
        });

        expect(result.current.previusTerms.length).toBe(8);
        expect(result.current.previusTerms).toStrictEqual([
            'goku9', 'goku8',
            'goku7', 'goku6',
            'goku5', 'goku4',
            'goku3', 'goku2'
        ]);

        console.log(result.current.previusTerms);
    });
});