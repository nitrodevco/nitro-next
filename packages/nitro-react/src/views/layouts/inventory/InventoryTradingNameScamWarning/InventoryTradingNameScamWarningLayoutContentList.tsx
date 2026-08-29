import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { InventoryTradingNameScamWarningLayoutButtonContainerItem } from './InventoryTradingNameScamWarningLayoutButtonContainerItem';
import { InventoryTradingNameScamWarningLayoutFriendMatchesSectionItem } from './InventoryTradingNameScamWarningLayoutFriendMatchesSectionItem';
import { InventoryTradingNameScamWarningLayoutRoomMatchesSectionItem } from './InventoryTradingNameScamWarningLayoutRoomMatchesSectionItem';
import { InventoryTradingNameScamWarningLayoutTraderSectionItem } from './InventoryTradingNameScamWarningLayoutTraderSectionItem';
import { InventoryTradingNameScamWarningLayoutWarningTextItem } from './InventoryTradingNameScamWarningLayoutWarningTextItem';

/** Named region `content_list` of InventoryTradingNameScamWarningLayout - configured through the parent's `contentList` prop. */
export interface InventoryTradingNameScamWarningLayoutContentListProps {
    itemsContentList?: ReactNode;
    layout?: BoxLayout;
}

export const InventoryTradingNameScamWarningLayoutContentList = ({ itemsContentList, layout }: InventoryTradingNameScamWarningLayoutContentListProps) => {
    return (
        <Region
            name="content_list"
            layout={{ position: 'absolute', left: 10, right: 16, top: 8, height: 280, flexDirection: 'column', gap: 8, ...layout }}
        >
            {itemsContentList ?? (
                <>
                    <InventoryTradingNameScamWarningLayoutWarningTextItem />
                    <InventoryTradingNameScamWarningLayoutTraderSectionItem />
                    <InventoryTradingNameScamWarningLayoutRoomMatchesSectionItem />
                    <InventoryTradingNameScamWarningLayoutFriendMatchesSectionItem />
                    <InventoryTradingNameScamWarningLayoutButtonContainerItem />
                </>
            )}
        </Region>
    );
};
