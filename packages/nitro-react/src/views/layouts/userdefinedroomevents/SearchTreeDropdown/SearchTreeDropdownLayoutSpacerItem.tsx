import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `spacer` of SearchTreeDropdownLayout - pass real rows through its `items…` slot. */
export interface SearchTreeDropdownLayoutSpacerItemProps {
    layout?: BoxLayout;
    splitter?: ReactNode;
    visibleSplitter?: boolean;
}

export const SearchTreeDropdownLayoutSpacerItem = ({ layout, splitter, visibleSplitter }: SearchTreeDropdownLayoutSpacerItemProps) => {
    return (
        <Region
            name="spacer"
            layout={{ width: 195, height: 2, flexShrink: 0, ...layout }}
        >
            {(visibleSplitter ?? true) && (
                <Region
                    name="splitter"
                    backgroundColor="#dddddd"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 1 }}
                >
                    {splitter}
                </Region>
            )}
        </Region>
    );
};
