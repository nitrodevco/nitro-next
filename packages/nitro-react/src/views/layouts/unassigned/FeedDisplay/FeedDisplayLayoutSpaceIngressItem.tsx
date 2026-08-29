import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `space_ingress` of FeedDisplayLayout - pass real rows through its `items…` slot. */
export interface FeedDisplayLayoutSpaceIngressItemProps {
    layout?: BoxLayout;
    onSpaceIngress?: () => void;
    spaceIngress?: ReactNode;
}

export const FeedDisplayLayoutSpaceIngressItem = ({ layout, onSpaceIngress, spaceIngress }: FeedDisplayLayoutSpaceIngressItemProps) => {
    return (
        <Region
            name="space_ingress"
            onPointerTap={onSpaceIngress}
            cursor="pointer"
            layout={{ width: 194, height: 20, flexShrink: 0, minHeight: 20, maxHeight: 20, ...layout }}
        >
            {spaceIngress}
        </Region>
    );
};
