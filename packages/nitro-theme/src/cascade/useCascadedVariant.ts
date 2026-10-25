import { useContext } from 'react';

import { VariantCascadeContext } from './VariantCascadeContext';

/** The variant an ancestor cascaded to this cascade key, if any. */
export const useCascadedVariant = (typeKey: string) => useContext(VariantCascadeContext)[typeKey];
