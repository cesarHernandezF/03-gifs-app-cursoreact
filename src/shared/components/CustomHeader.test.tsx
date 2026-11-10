import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CustomHeader } from './CustomHeader';

describe('GifsApp', () => {
    const title = "Test title";

    test('Should render the title correctly', () => {

        render(<CustomHeader title={title} />);
        screen.debug();
        expect(screen.getByText(title)).toBeDefined();
        expect(screen.getByText(title)).not.toBeNull();

    });

    test('Should render the description when provided', () => {
        const description = "Test descripcion";
        render(<CustomHeader title={title} description={description} />);
        screen.debug();
        expect(screen.getByText(description)).toBeDefined();
        expect(screen.getByRole('paragraph')).toBeDefined();
        expect(screen.getByRole('paragraph').innerHTML).toBe(description)
        expect(screen.getByText(description)).not.toBeNull();

    });

    test('Should not render description when not provided', () => {
        const { container } = render(<CustomHeader title={title} />);
        const p = container.querySelector('p');
        expect(p).toBeNull();
    });
});