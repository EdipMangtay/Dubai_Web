'use client';

import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-[#0B0F1A] group-[.toaster]:text-[#F5F1E8] group-[.toaster]:border-[rgba(201,166,107,0.25)] group-[.toaster]:shadow-[0_12px_40px_rgba(0,0,0,0.85)] group-[.toaster]:rounded-xl text-xs font-medium',
          description: 'group-[.toast]:text-[#F5F1E8]/50 text-[11px]',
          actionButton:
            'group-[.toast]:bg-[#C9A66B] group-[.toast]:text-[#05070F] text-xs font-semibold rounded-md',
          cancelButton:
            'group-[.toast]:bg-[#101524] group-[.toast]:text-[#F5F1E8] text-xs font-medium rounded-md',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
