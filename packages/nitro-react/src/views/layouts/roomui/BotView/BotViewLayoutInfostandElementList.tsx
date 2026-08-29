import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { BotViewLayoutHanditemSpacerItem } from './BotViewLayoutHanditemSpacerItem';
import { BotViewLayoutHanditemTxtItem } from './BotViewLayoutHanditemTxtItem';
import { BotViewLayoutImageAndBadgesContainerItem } from './BotViewLayoutImageAndBadgesContainerItem';
import { BotViewLayoutImagesSpacerItem } from './BotViewLayoutImagesSpacerItem';
import { BotViewLayoutMottoContainerItem } from './BotViewLayoutMottoContainerItem';
import { BotViewLayoutMottoSpacerItem } from './BotViewLayoutMottoSpacerItem';
import { BotViewLayoutNameTextItem } from './BotViewLayoutNameTextItem';

/** Named region `infostand_element_list` of BotViewLayout - configured through the parent's `infostandElementList` prop. */
export interface BotViewLayoutInfostandElementListProps {
    itemsInfostandElementList?: ReactNode;
    layout?: BoxLayout;
}

export const BotViewLayoutInfostandElementList = ({ itemsInfostandElementList, layout }: BotViewLayoutInfostandElementListProps) => {
    return (
        <Region
            name="infostand_element_list"
            layout={{ position: 'absolute', left: 10, width: 170, top: 10, height: 330, flexDirection: 'column', gap: 3, ...layout }}
        >
            {itemsInfostandElementList ?? (
                <>
                    <BotViewLayoutNameTextItem />
                    <BotViewLayoutImagesSpacerItem />
                    <BotViewLayoutImageAndBadgesContainerItem />
                    <BotViewLayoutMottoSpacerItem />
                    <BotViewLayoutMottoContainerItem />
                    <BotViewLayoutHanditemSpacerItem />
                    <BotViewLayoutHanditemTxtItem />
                </>
            )}
        </Region>
    );
};
