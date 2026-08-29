import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `space_description` of FeedDisplayLayout - pass real rows through its `items…` slot. */
export interface FeedDisplayLayoutSpaceDescriptionItemProps {
    layout?: BoxLayout;
    onSpaceDescription?: () => void;
    spaceDescription?: ReactNode;
}

export const FeedDisplayLayoutSpaceDescriptionItem = ({ layout, onSpaceDescription, spaceDescription }: FeedDisplayLayoutSpaceDescriptionItemProps) => {
    return (
        <Region
            name="space_description"
            onPointerTap={onSpaceDescription}
            cursor="pointer"
            layout={{ width: 200, height: 20, flexShrink: 0, minHeight: 20, maxHeight: 20, ...layout }}
        >
            {spaceDescription}
        </Region>
    );
};
