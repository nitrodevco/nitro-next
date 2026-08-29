import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `space_ok` of FeedDisplayLayout - pass real rows through its `items…` slot. */
export interface FeedDisplayLayoutSpaceOkItemProps {
    layout?: BoxLayout;
    spaceOk?: ReactNode;
}

export const FeedDisplayLayoutSpaceOkItem = ({ layout, spaceOk }: FeedDisplayLayoutSpaceOkItemProps) => {
    return (
        <Region
            name="space_ok"
            layout={{ width: 200, height: 30, flexShrink: 0, ...layout }}
        >
            {spaceOk}
        </Region>
    );
};
