import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { ClubExtendConfirmationLayoutActionContainerItem } from './ClubExtendConfirmationLayoutActionContainerItem';
import { ClubExtendConfirmationLayoutExtendTitleItem } from './ClubExtendConfirmationLayoutExtendTitleItem';
import { ClubExtendConfirmationLayoutNormalPriceContainerItem } from './ClubExtendConfirmationLayoutNormalPriceContainerItem';
import { ClubExtendConfirmationLayoutOfferExpirationItem } from './ClubExtendConfirmationLayoutOfferExpirationItem';
import { ClubExtendConfirmationLayoutSpacerItem } from './ClubExtendConfirmationLayoutSpacerItem';
import { ClubExtendConfirmationLayoutTotalAmountLineItem } from './ClubExtendConfirmationLayoutTotalAmountLineItem';
import { ClubExtendConfirmationLayoutYourPriceContainerItem } from './ClubExtendConfirmationLayoutYourPriceContainerItem';
import { ClubExtendConfirmationLayoutYouSaveContainerItem } from './ClubExtendConfirmationLayoutYouSaveContainerItem';

/** Named region `itemlist_vertical` of ClubExtendConfirmationLayout - configured through the parent's `itemlistVertical` prop. */
export interface ClubExtendConfirmationLayoutItemlistVerticalProps {
    itemsItemlistVertical?: ReactNode;
    layout?: BoxLayout;
}

export const ClubExtendConfirmationLayoutItemlistVertical = ({ itemsItemlistVertical, layout }: ClubExtendConfirmationLayoutItemlistVerticalProps) => {
    return (
        <Region
            name="itemlist_vertical"
            layout={{ position: 'absolute', left: 140, width: 285, top: 25, height: 175, flexDirection: 'column', ...layout }}
        >
            {itemsItemlistVertical ?? (
                <>
                    <ClubExtendConfirmationLayoutExtendTitleItem />
                    <ClubExtendConfirmationLayoutNormalPriceContainerItem />
                    <ClubExtendConfirmationLayoutYouSaveContainerItem />
                    <ClubExtendConfirmationLayoutTotalAmountLineItem />
                    <ClubExtendConfirmationLayoutSpacerItem />
                    <ClubExtendConfirmationLayoutYourPriceContainerItem />
                    <ClubExtendConfirmationLayoutOfferExpirationItem />
                    <ClubExtendConfirmationLayoutActionContainerItem />
                </>
            )}
            <Region layout={{ width: 100, height: 10, flexShrink: 0 }} />
        </Region>
    );
};
