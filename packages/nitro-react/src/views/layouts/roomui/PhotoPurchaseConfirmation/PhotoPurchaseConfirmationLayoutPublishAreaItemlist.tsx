import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { PhotoPurchaseConfirmationLayoutPublishDetailedExplanationItem } from './PhotoPurchaseConfirmationLayoutPublishDetailedExplanationItem';
import { PhotoPurchaseConfirmationLayoutPublishExplanationItem } from './PhotoPurchaseConfirmationLayoutPublishExplanationItem';
import { PhotoPurchaseConfirmationLayoutPublishLinkAreaItem } from './PhotoPurchaseConfirmationLayoutPublishLinkAreaItem';
import { PhotoPurchaseConfirmationLayoutPublishPriceAreaItem } from './PhotoPurchaseConfirmationLayoutPublishPriceAreaItem';

/** Named region `publish_area_itemlist` of PhotoPurchaseConfirmationLayout - configured through the parent's `publishAreaItemlist` prop. */
export interface PhotoPurchaseConfirmationLayoutPublishAreaItemlistProps {
    itemsPublishAreaItemlist?: ReactNode;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutPublishAreaItemlist = ({ itemsPublishAreaItemlist, layout }: PhotoPurchaseConfirmationLayoutPublishAreaItemlistProps) => {
    return (
        <Region
            name="publish_area_itemlist"
            layout={{ position: 'absolute', left: 6, width: 309, top: 4, height: 75, flexDirection: 'column', ...layout }}
        >
            {itemsPublishAreaItemlist ?? (
                <>
                    <PhotoPurchaseConfirmationLayoutPublishExplanationItem />
                    <PhotoPurchaseConfirmationLayoutPublishDetailedExplanationItem />
                    <PhotoPurchaseConfirmationLayoutPublishPriceAreaItem />
                    <PhotoPurchaseConfirmationLayoutPublishLinkAreaItem />
                </>
            )}
        </Region>
    );
};
