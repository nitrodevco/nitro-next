import { createContext } from 'react';

import { VariantCascadeMap } from './VariantCascadeMap';

/** The variants cascaded down to here from every themed ancestor, the nearest winning. */
export const VariantCascadeContext = createContext<VariantCascadeMap>({});
