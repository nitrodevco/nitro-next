import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { PriceDisplayLayoutAmount0Item } from './PriceDisplayLayoutAmount0Item';
import { PriceDisplayLayoutAmount1Item } from './PriceDisplayLayoutAmount1Item';
import { PriceDisplayLayoutSpacingItem } from './PriceDisplayLayoutSpacingItem';
import { PriceDisplayLayoutSpacingItem2 } from './PriceDisplayLayoutSpacingItem2';
import { PriceDisplayLayoutUnit0Item } from './PriceDisplayLayoutUnit0Item';
import { PriceDisplayLayoutUnit1Item } from './PriceDisplayLayoutUnit1Item';

/** Generated from `1584_price_display_xml` (layout "price_display", 60x21) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PriceDisplayLayoutProps {
    itemsPriceBox?: ReactNode;
    layout?: BoxLayout;
}

export const PriceDisplayLayout = ({ itemsPriceBox, layout }: PriceDisplayLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 60, height: 21, ...layout }}>
            <Region
                name="price_box"
                layout={{ position: 'absolute', left: 0, top: 0, flexDirection: 'row', gap: 1 }}
            >
                {itemsPriceBox ?? (
                    <>
                        <PriceDisplayLayoutSpacingItem />
                        <PriceDisplayLayoutAmount0Item />
                        <PriceDisplayLayoutUnit0Item />
                        <PriceDisplayLayoutAmount1Item />
                        <PriceDisplayLayoutUnit1Item />
                        <PriceDisplayLayoutSpacingItem2 />
                    </>
                )}
            </Region>
        </Region>
    );
};
