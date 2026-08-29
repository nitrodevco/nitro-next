import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { ViprequiredLayoutBuyVipItem } from './ViprequiredLayoutBuyVipItem';
import { ViprequiredLayoutSpacerItem } from './ViprequiredLayoutSpacerItem';
import { ViprequiredLayoutVipBenefitsItem } from './ViprequiredLayoutVipBenefitsItem';

/** Row template `list_bottom` of ViprequiredLayout - pass real rows through its `items…` slot. */
export interface ViprequiredLayoutListBottomItemProps {
    itemsListBottom?: ReactNode;
    layout?: BoxLayout;
}

export const ViprequiredLayoutListBottomItem = ({ itemsListBottom, layout }: ViprequiredLayoutListBottomItemProps) => {
    return (
        <Region
            name="list_bottom"
            layout={{ flexShrink: 0, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsListBottom ?? (
                <>
                    <ViprequiredLayoutSpacerItem />
                    <ViprequiredLayoutBuyVipItem />
                    <ViprequiredLayoutVipBenefitsItem />
                </>
            )}
            <ThemeImage
                src={layoutImage('illumina_horizontal_separator.png')}
                layout={{ width: 291, height: 3, flexShrink: 0 }}
            />
        </Region>
    );
};
