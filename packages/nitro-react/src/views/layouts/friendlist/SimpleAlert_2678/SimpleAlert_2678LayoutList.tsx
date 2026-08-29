import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { SimpleAlert_2678LayoutListBottomItem } from './SimpleAlert_2678LayoutListBottomItem';
import { SimpleAlert_2678LayoutListTopItem } from './SimpleAlert_2678LayoutListTopItem';

/** Named region `list` of SimpleAlert_2678Layout - configured through the parent's `list` prop. */
export interface SimpleAlert_2678LayoutListProps {
    itemsList?: ReactNode;
    layout?: BoxLayout;
}

export const SimpleAlert_2678LayoutList = ({ itemsList, layout }: SimpleAlert_2678LayoutListProps) => {
    return (
        <Region
            name="list"
            layout={{ position: 'absolute', left: 10, top: 8, flexDirection: 'column', gap: 3, ...layout }}
        >
            {itemsList ?? (
                <>
                    <SimpleAlert_2678LayoutListTopItem />
                    <SimpleAlert_2678LayoutListBottomItem />
                </>
            )}
        </Region>
    );
};
