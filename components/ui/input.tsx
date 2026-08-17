import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Text input. Styling lives in the `.field-control` class in globals.css so the
 * contact form and this primitive cannot drift apart.
 *
 * This file previously carried the stock shadcn classes (`border-input`,
 * `bg-background`, `ring-ring`), which name a token set this project does not
 * define, so it rendered unstyled. The contact form worked around it with
 * inline styles.
 */
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return <input type={type} className={cn('field-control', className)} ref={ref} {...props} />;
  },
);
Input.displayName = 'Input';

export { Input };
