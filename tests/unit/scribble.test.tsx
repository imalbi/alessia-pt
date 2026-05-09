import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Scribble } from '@/components/primitives/scribble';

describe('Scribble', () => {
  it('renders an svg path for kind="underline"', () => {
    const { container } = render(<Scribble kind="underline" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    const path = container.querySelector('path');
    expect(path).toBeInTheDocument();
    expect(path?.getAttribute('d')).toBeTruthy();
  });

  it('renders nothing for an unknown kind', () => {
    // @ts-expect-error - testing runtime fallback
    const { container } = render(<Scribble kind="nonexistent" />);
    expect(container.querySelector('svg')).toBeNull();
  });

  it('applies custom color via prop', () => {
    const { container } = render(<Scribble kind="circle" color="#ff0000" />);
    const stroked = container.querySelector('path, ellipse, line');
    expect(stroked?.getAttribute('stroke')).toBe('#ff0000');
  });
});
