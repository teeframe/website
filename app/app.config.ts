export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blueprint',
      neutral: 'slate',
    },
    button: {
      slots: {
        base: 'justify-center rounded border font-medium focus-visible:outline-2 focus-visible:outline-offset-4',
      },
      variants: {
        size: {
          xs: {
            base: 'min-h-8 px-2 py-1 text-xs gap-2',
            leadingIcon: 'size-3.5',
            trailingIcon: 'size-3.5',
          },
          sm: {
            base: 'min-h-9 px-3.5 py-2 text-xs gap-2',
            leadingIcon: 'size-3.5',
            trailingIcon: 'size-3.5',
          },
        },
      },
      compoundVariants: [
        {
          color: 'primary', variant: 'solid',
          class: 'border-accent bg-accent text-white hover:border-[#105992] hover:bg-[#105992] active:bg-[#105992] outline-accent focus-visible:outline-2',
        },
        {
          color: 'neutral', variant: 'outline',
          class: 'ring-0 border-line bg-white text-foreground hover:bg-white hover:border-accent/50 hover:text-accent outline-accent focus-visible:outline-2 focus-visible:ring-0',
        },
        {
          color: 'neutral', variant: 'ghost',
          class: 'border-transparent text-muted hover:bg-surface hover:text-accent outline-accent focus-visible:outline-2',
        },
      ],
    },
    card: {
      slots: {
        root: 'rounded-md shadow-none',
        body: 'p-5 sm:p-6',
        header: 'px-4 py-3 sm:px-4',
        footer: 'px-4 py-3 sm:px-4',
      },
      variants: {
        variant: {
          outline: {
            root: 'bg-white border border-line ring-0 divide-y divide-line',
          },
        },
      },
    },
    badge: {
      slots: {
        base: 'rounded-sm font-normal',
      },
      variants: {
        size: {
          xs: {
            base: 'px-1.5 py-1 text-[9px] leading-[1.5] font-mono tracking-[0.05em]',
          },
        },
      },
      compoundVariants: [
        {
          color: 'primary', variant: 'subtle',
          class: 'border border-accent/20 bg-accent/5 text-accent ring-0',
        },
      ],
    },
    toast: {
      slots: {
        root: 'rounded border border-line bg-white px-4 py-2.5 shadow-sm ring-0',
        title: 'text-xs leading-6 font-normal text-foreground',
      },
    },
  },
})
