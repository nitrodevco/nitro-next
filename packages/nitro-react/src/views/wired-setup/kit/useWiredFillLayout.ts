/**
 * How a kit component takes the width it is given - Flash's `resizeToWidth` /
 * `hasStaticWidth` / `staticWidth` contract, expressed as flex layout.
 *
 * A preset without a static width fills: across a column it stretches, along a row
 * (`SimpleListViewPreset` and friends) the fillers share what the static ones leave, in equal
 * parts. A preset with a static width keeps it in both. The enclosing list says which of the
 * two it is through `WiredFlow`; the kit's own containers all do.
 */
import { useContext } from 'react';

import { BoxLayout } from '#base/theme';

import { WiredFlowDirection, WiredFlowReactContext } from './wiredKitContexts';

/** A pixel width, or `'content'` for a preset as wide as what it holds (`TextPreset` in stretch mode, a button in `MODE_STRETCH`). */
export type WiredStaticWidth = number | 'content';

export const wiredFillLayout = (flow: WiredFlowDirection, staticWidth?: WiredStaticWidth): BoxLayout => {
    if (staticWidth === 'content') return (flow === 'row') ? { flexShrink: 0 } : { flexShrink: 0, alignSelf: 'flex-start' };

    if (staticWidth !== undefined) return { width: staticWidth, flexShrink: 0 };

    return (flow === 'row') ? { flexGrow: 1, flexShrink: 1, flexBasis: 0, minWidth: 0 } : { alignSelf: 'stretch' };
};

/** The flow direction of the enclosing kit container. */
export const useWiredFlow = (): WiredFlowDirection => useContext(WiredFlowReactContext);

/** The layout a component with this static width (or none) takes inside the enclosing kit container. */
export const useWiredFillLayout = (staticWidth?: WiredStaticWidth): BoxLayout => wiredFillLayout(useWiredFlow(), staticWidth);
