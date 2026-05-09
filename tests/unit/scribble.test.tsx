import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Scribble } from '@/components/primitives/scribble';

describe('Scribble', () => {
  it('renders an svg with a path for kind="underline"', () => {
    const { container } = render(<Scribble kind="underline" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    const path = container.querySelector('path');
    expect(path).toBeInTheDocument();
    expect(path?.getAttribute('d')).toBeTruthy();
  });

  it('renders two paths for kind="underline-double"', () => {
    const { container } = render(<Scribble kind="underline-double" />);
    expect(container.querySelectorAll('path')).toHaveLength(2);
  });

  it('applies custom color via prop', () => {
    const { container } = render(<Scribble kind="underline" color="#ff0000" />);
    const path = container.querySelector('path');
    expect(path?.getAttribute('stroke')).toBe('#ff0000');
  });
});
