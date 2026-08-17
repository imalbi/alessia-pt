import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-field)] text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-[color:var(--accent)] text-[color:var(--paper)] hover:bg-[color:var(--accent-deep)] active:translate-y-px',
        outline:
          'border border-[color:var(--ink-30)] bg-transparent text-[color:var(--ink)] hover:bg-[color:var(--paper-2)]',
        ghost: 'bg-transparent text-[color:var(--ink)] hover:bg-[color:var(--paper-2)]',
        link: 'text-[color:var(--accent)] underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-5 py-2 min-h-[44px]',
        sm: 'h-9 px-3 min-h-[36px]',
        lg: 'h-12 px-7 text-base min-h-[44px]',
        icon: 'h-11 w-11 min-h-[44px] min-w-[44px]',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
