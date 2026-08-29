import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { ViprequiredLayoutBodytextItem } from './ViprequiredLayoutBodytextItem';
import { ViprequiredLayoutTitleItem } from './ViprequiredLayoutTitleItem';

/** Row template `list_top` of ViprequiredLayout - pass real rows through its `items…` slot. */
export interface ViprequiredLayoutListTopItemProps {
    itemsListTop?: ReactNode;
    layout?: BoxLayout;
}

export const ViprequiredLayoutListTopItem = ({ itemsListTop, layout }: ViprequiredLayoutListTopItemProps) => {
    return (
        <Region
            name="list_top"
            layout={{ flexShrink: 0, flexDirection: 'column', ...layout }}
        >
            {itemsListTop ?? (
                <>
                    <ViprequiredLayoutTitleItem />
                    <ViprequiredLayoutBodytextItem />
                </>
            )}
        </Region>
    );
};
