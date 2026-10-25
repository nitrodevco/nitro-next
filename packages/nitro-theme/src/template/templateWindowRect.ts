import { createContext, useContext } from 'react';

import type { TemplateRect } from './templateLayout';

/** The laid-out rect of the window a binding's `children` are drawn in. */
export const TemplateWindowRectContext = createContext<TemplateRect | undefined>(undefined);

/**
 * The rect the layout gives the window a binding's `children` are drawn in, in the same pass as the
 * window: what the code reads off its window (`CatalogViewer.showCatalogPage`'s `container.height`),
 * without waiting for the drawn box to be laid out.
 */
export const useTemplateWindowRect = () => useContext(TemplateWindowRectContext);
