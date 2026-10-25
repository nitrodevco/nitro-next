/**
 * The frame's element list - `FramePreset.createListView` (`innerBorder` false) or
 * `InnerBorderFramePreset.createListView` (`innerBorder` true) over the presets between the
 * header and the footer. It adds no box of its own: its children are the elements, each a
 * `WiredFrameListItem` (every `WiredSection`, `WiredSplitter` and `WiredAlignCenter` is one when
 * it stands here), and they place themselves by their index:
 *
 * - `FramePreset`: every element is followed by a `sectionSpacing` spacer - the list goes on to
 *   the footer, and only the footer, the last preset, has none;
 * - `InnerBorderFramePreset`: the first element hides its splitter (`SectionPreset` /
 *   `AbstractSectionPreset.splitterVisible = false`) and has no spacer after it; every later one
 *   is followed by a spacer, the last included.
 *
 * A spacer after an element takes the element's `blendingBackgroundColor` (`blendSpacer`).
 */
import { ReactNode, useState } from 'react';

import { WiredFrameListRegistry } from './WiredFrameListRegistry';
import { WiredFrameListReactContext } from './wiredKitContexts';

export interface WiredFrameListProps {
    /** `WiredStyle.useInnerBorder`. */
    innerBorder: boolean;
    /** `WiredStyle.sectionSpacing`. */
    spacing: number;
    children?: ReactNode;
}

export const WiredFrameList = ({ innerBorder, spacing, children }: WiredFrameListProps) => {
    const [ registry ] = useState(() => new WiredFrameListRegistry());

    return (
        <WiredFrameListReactContext.Provider value={{ registry, innerBorder, spacing }}>
            {children}
        </WiredFrameListReactContext.Provider>
    );
};
