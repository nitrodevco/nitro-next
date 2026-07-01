type ClassValue = string | number | boolean | null | undefined | ClassValue[] | Record<string, boolean | null | undefined>;

export function cn(...inputs: ClassValue[]): string {
    const classes: string[] = [];
    for (const input of inputs) {
        if (!input) continue;
        if (typeof input === 'string') { classes.push(input); continue; }
        if (typeof input === 'number') { classes.push(String(input)); continue; }
        if (Array.isArray(input)) { const r = cn(...input); if (r) classes.push(r); continue; }
        if (typeof input === 'object') {
            for (const [k, v] of Object.entries(input)) { if (v) classes.push(k); }
        }
    }
    return classes.join(' ');
}

type VariantProps<V extends Record<string, Record<string, string>>> = {
    [K in keyof V]?: keyof V[K];
};

export function cva<V extends Record<string, Record<string, string>>>(
    base: string,
    config?: {
        variants?: V;
        defaultVariants?: VariantProps<V>;
        compoundVariants?: Array<VariantProps<V> & { class: string }>;
    }
) {
    return function (props?: VariantProps<V> & { className?: string }): string {
        const variants = config?.variants ?? {} as V;
        const defaults = config?.defaultVariants ?? {};
        const merged = { ...defaults, ...props };
        const parts = [base];
        for (const [key, variantMap] of Object.entries(variants)) {
            const val = (merged as Record<string, string>)[key];
            if (val != null && variantMap[val]) parts.push(variantMap[val]);
        }
        if (config?.compoundVariants) {
            for (const { class: cls, ...conditions } of config.compoundVariants) {
                const matches = Object.entries(conditions).every(
                    ([k, v]) => (merged as Record<string, unknown>)[k] === v
                );
                if (matches) parts.push(cls);
            }
        }
        if (props?.className) parts.push(props.className);
        return parts.filter(Boolean).join(' ');
    };
}

export type { VariantProps };