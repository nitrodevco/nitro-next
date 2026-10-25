/**
 * `selectors/FurniInArea` (FURNI_IN_AREA) - `InArea` for furni.
 */
import { createInAreaSelector } from './InArea';
import { SelectorCodes } from './selectorCodes';

export const furniInAreaSelector = createInAreaSelector(SelectorCodes.FURNI_IN_AREA);
