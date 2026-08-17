import * as React from 'react';

import { cn } from '@/lib/utils';

/** Multi-line input. Shares `.field-control` with <Input> and the contact form. */
const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn('field-control min-h-[140px] resize-y', className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
