import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { SimpleAlert_2678LayoutCloseButtonItem } from './SimpleAlert_2678LayoutCloseButtonItem';
import { SimpleAlert_2678LayoutLinkItem } from './SimpleAlert_2678LayoutLinkItem';

/** Row template `list_bottom` of SimpleAlert_2678Layout - pass real rows through its `items…` slot. */
export interface SimpleAlert_2678LayoutListBottomItemProps {
    itemsListBottom?: ReactNode;
    layout?: BoxLayout;
}

export const SimpleAlert_2678LayoutListBottomItem = ({ itemsListBottom, layout }: SimpleAlert_2678LayoutListBottomItemProps) => {
    return (
        <Region
            name="list_bottom"
            layout={{ flexShrink: 0, flexDirection: 'column', gap: 5, ...layout }}
        >
            {itemsListBottom ?? (
                <>
                    <SimpleAlert_2678LayoutCloseButtonItem />
                    <SimpleAlert_2678LayoutLinkItem />
                </>
            )}
            <ThemeImage
                src={layoutImage('illumina_horizontal_separator.png')}
                layout={{ width: 1000, height: 13, flexShrink: 0 }}
            />
        </Region>
    );
};
