import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { JukeboxViewLayoutCreatornameContainerItem } from './JukeboxViewLayoutCreatornameContainerItem';
import { JukeboxViewLayoutDescriptionSpacerItem } from './JukeboxViewLayoutDescriptionSpacerItem';
import { JukeboxViewLayoutExpirationTextItem } from './JukeboxViewLayoutExpirationTextItem';
import { JukeboxViewLayoutImageItem } from './JukeboxViewLayoutImageItem';
import { JukeboxViewLayoutImagesSpacerItem } from './JukeboxViewLayoutImagesSpacerItem';
import { JukeboxViewLayoutNameTextItem } from './JukeboxViewLayoutNameTextItem';
import { JukeboxViewLayoutNowPlayingTextItem } from './JukeboxViewLayoutNowPlayingTextItem';
import { JukeboxViewLayoutOwnerRegionItem } from './JukeboxViewLayoutOwnerRegionItem';
import { JukeboxViewLayoutOwnerSpacerItem } from './JukeboxViewLayoutOwnerSpacerItem';
import { JukeboxViewLayoutPurchaseButtonsItem } from './JukeboxViewLayoutPurchaseButtonsItem';
import { JukeboxViewLayoutTracknameContainerItem } from './JukeboxViewLayoutTracknameContainerItem';

/** Named region `infostand_element_list` of JukeboxViewLayout - configured through the parent's `infostandElementList` prop. */
export interface JukeboxViewLayoutInfostandElementListProps {
    itemsInfostandElementList?: ReactNode;
    layout?: BoxLayout;
}

export const JukeboxViewLayoutInfostandElementList = ({ itemsInfostandElementList, layout }: JukeboxViewLayoutInfostandElementListProps) => {
    return (
        <Region
            name="infostand_element_list"
            layout={{ position: 'absolute', left: 10, width: 170, top: 10, height: 290, flexDirection: 'column', gap: 5, ...layout }}
        >
            {itemsInfostandElementList ?? (
                <>
                    <JukeboxViewLayoutNameTextItem />
                    <JukeboxViewLayoutImagesSpacerItem />
                    <JukeboxViewLayoutImageItem />
                    <JukeboxViewLayoutOwnerSpacerItem />
                    <JukeboxViewLayoutOwnerRegionItem />
                    <JukeboxViewLayoutDescriptionSpacerItem />
                    <JukeboxViewLayoutNowPlayingTextItem />
                    <JukeboxViewLayoutTracknameContainerItem />
                    <JukeboxViewLayoutCreatornameContainerItem />
                    <JukeboxViewLayoutExpirationTextItem />
                    <JukeboxViewLayoutPurchaseButtonsItem />
                </>
            )}
        </Region>
    );
};
