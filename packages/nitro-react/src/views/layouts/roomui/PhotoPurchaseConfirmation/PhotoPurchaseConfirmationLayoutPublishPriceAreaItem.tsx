import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { PhotoPurchaseConfirmationLayoutPublishCostInfoItem } from './PhotoPurchaseConfirmationLayoutPublishCostInfoItem';
import { PhotoPurchaseConfirmationLayoutPublishDucketCostTextItem } from './PhotoPurchaseConfirmationLayoutPublishDucketCostTextItem';
import { PhotoPurchaseConfirmationLayoutPublishDucketIconItem } from './PhotoPurchaseConfirmationLayoutPublishDucketIconItem';

/** Row template `publish_price_area` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutPublishPriceAreaItemProps {
    itemsPublishPriceArea?: ReactNode;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutPublishPriceAreaItem = ({ itemsPublishPriceArea, layout }: PhotoPurchaseConfirmationLayoutPublishPriceAreaItemProps) => {
    return (
        <Region
            name="publish_price_area"
            layout={{ flexShrink: 0, flexDirection: 'row', ...layout }}
        >
            {itemsPublishPriceArea ?? (
                <>
                    <PhotoPurchaseConfirmationLayoutPublishCostInfoItem />
                    <PhotoPurchaseConfirmationLayoutPublishDucketCostTextItem />
                    <PhotoPurchaseConfirmationLayoutPublishDucketIconItem />
                </>
            )}
        </Region>
    );
};
