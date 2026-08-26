import { ReactNode, useContext, useMemo } from 'react';

import { VariantCascadeContext } from './VariantCascadeContext';
import { VariantCascadeMap } from './VariantCascadeMap';

export const VariantCascadeProvider = ({ map, children }: { map: VariantCascadeMap | undefined; children: ReactNode }) => {
    const inherited = useContext(VariantCascadeContext);

    // Merging into a new object on every render would otherwise re-render every consumer of
    // this context on every render of this provider, regardless of whether `inherited`/`map`
    // actually changed - both are referentially stable across renders in normal use (`map`
    // comes from the static, module-level `VARIANT_CASCADE_CONFIG`), so this memo is a real win.
    const value = useMemo(() => ({ ...inherited, ...map }), [ inherited, map ]);

    if (!children) return null;

    if (!map || Object.keys(map).length === 0) return <>{children}</>;

    return <VariantCascadeContext.Provider value={value}>{children}</VariantCascadeContext.Provider>;
};
