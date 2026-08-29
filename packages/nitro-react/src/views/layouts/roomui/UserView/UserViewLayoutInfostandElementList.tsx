import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { UserViewLayoutBadgesRankRegionItem } from './UserViewLayoutBadgesRankRegionItem';
import { UserViewLayoutBadgesRankSpacerItem } from './UserViewLayoutBadgesRankSpacerItem';
import { UserViewLayoutGenericSpacerItem } from './UserViewLayoutGenericSpacerItem';
import { UserViewLayoutHanditemSpacerItem } from './UserViewLayoutHanditemSpacerItem';
import { UserViewLayoutHanditemTxtItem } from './UserViewLayoutHanditemTxtItem';
import { UserViewLayoutImageAndBadgesContainerItem } from './UserViewLayoutImageAndBadgesContainerItem';
import { UserViewLayoutImagesSpacerItem } from './UserViewLayoutImagesSpacerItem';
import { UserViewLayoutMottoContainerItem } from './UserViewLayoutMottoContainerItem';
import { UserViewLayoutMottoSpacerItem } from './UserViewLayoutMottoSpacerItem';
import { UserViewLayoutProfileLinkItem } from './UserViewLayoutProfileLinkItem';
import { UserViewLayoutRelationshipStatusContainerItem } from './UserViewLayoutRelationshipStatusContainerItem';
import { UserViewLayoutScoreSpacerItem } from './UserViewLayoutScoreSpacerItem';
import { UserViewLayoutScoreTextItem } from './UserViewLayoutScoreTextItem';
import { UserViewLayoutScoreValueItem } from './UserViewLayoutScoreValueItem';

/** Named region `infostand_element_list` of UserViewLayout - configured through the parent's `infostandElementList` prop. */
export interface UserViewLayoutInfostandElementListProps {
    itemsInfostandElementList?: ReactNode;
    layout?: BoxLayout;
}

export const UserViewLayoutInfostandElementList = ({ itemsInfostandElementList, layout }: UserViewLayoutInfostandElementListProps) => {
    return (
        <Region
            name="infostand_element_list"
            layout={{ position: 'absolute', left: 10, width: 170, top: 10, height: 277, flexDirection: 'column', gap: 3, ...layout }}
        >
            {itemsInfostandElementList ?? (
                <>
                    <UserViewLayoutProfileLinkItem />
                    <UserViewLayoutImagesSpacerItem />
                    <UserViewLayoutImageAndBadgesContainerItem />
                    <UserViewLayoutMottoSpacerItem />
                    <UserViewLayoutMottoContainerItem />
                    <UserViewLayoutBadgesRankSpacerItem />
                    <UserViewLayoutBadgesRankRegionItem />
                    <UserViewLayoutScoreSpacerItem />
                    <UserViewLayoutScoreTextItem />
                    <UserViewLayoutScoreValueItem />
                    <UserViewLayoutHanditemSpacerItem />
                    <UserViewLayoutHanditemTxtItem />
                    <UserViewLayoutGenericSpacerItem />
                    <UserViewLayoutRelationshipStatusContainerItem />
                </>
            )}
        </Region>
    );
};
