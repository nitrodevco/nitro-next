import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { InventoryTradingWiredLayoutAdditionalTextItem } from './InventoryTradingWiredLayoutAdditionalTextItem';
import { InventoryTradingWiredLayoutBubbleTitleItem } from './InventoryTradingWiredLayoutBubbleTitleItem';
import { InventoryTradingWiredLayoutBubbleTitleSpacingItem } from './InventoryTradingWiredLayoutBubbleTitleSpacingItem';
import { InventoryTradingWiredLayoutDisclaimerTextItem } from './InventoryTradingWiredLayoutDisclaimerTextItem';
import { InventoryTradingWiredLayoutOfferingsItem } from './InventoryTradingWiredLayoutOfferingsItem';
import { InventoryTradingWiredLayoutRequirementsMetContainerItem } from './InventoryTradingWiredLayoutRequirementsMetContainerItem';

/** Named region `bubble_contents` of InventoryTradingWiredLayout - configured through the parent's `bubbleContents` prop. */
export interface InventoryTradingWiredLayoutBubbleContentsProps {
    itemsBubbleContents?: ReactNode;
    layout?: BoxLayout;
}

export const InventoryTradingWiredLayoutBubbleContents = ({ itemsBubbleContents, layout }: InventoryTradingWiredLayoutBubbleContentsProps) => {
    return (
        <Region
            name="bubble_contents"
            layout={{ position: 'absolute', left: 13, width: 390, top: 7, height: 246, minWidth: 390, maxWidth: 390, flexDirection: 'column', gap: 6, ...layout }}
        >
            {itemsBubbleContents ?? (
                <>
                    <InventoryTradingWiredLayoutBubbleTitleItem />
                    <InventoryTradingWiredLayoutBubbleTitleSpacingItem />
                    <InventoryTradingWiredLayoutOfferingsItem />
                    <InventoryTradingWiredLayoutRequirementsMetContainerItem />
                    <InventoryTradingWiredLayoutAdditionalTextItem />
                    <InventoryTradingWiredLayoutDisclaimerTextItem />
                </>
            )}
        </Region>
    );
};
