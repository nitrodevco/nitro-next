import { ReactNode, useContext } from 'react';

import { VariantCascadeContext } from './VariantCascadeContext';
import { VariantCascadeMap } from './VariantCascadeMap';

export const VariantCascadeProvider = ({ map, children }: { map: VariantCascadeMap | undefined; children: ReactNode }) => {
    const inherited = useContext(VariantCascadeContext);

    if (!children) return null;

    if (!map || Object.keys(map).length === 0) return <>{children}</>;

    return <VariantCascadeContext.Provider value={{ ...inherited, ...map }}>{children}</VariantCascadeContext.Provider>;
};
