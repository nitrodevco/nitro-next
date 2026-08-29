import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { PhotoPurchaseConfirmationLayoutCostInfoItem } from './PhotoPurchaseConfirmationLayoutCostInfoItem';
import { PhotoPurchaseConfirmationLayoutCreditIconItem } from './PhotoPurchaseConfirmationLayoutCreditIconItem';
import { PhotoPurchaseConfirmationLayoutDucketIconItem } from './PhotoPurchaseConfirmationLayoutDucketIconItem';
import { PhotoPurchaseConfirmationLayoutPurchaseCreditCostTextItem } from './PhotoPurchaseConfirmationLayoutPurchaseCreditCostTextItem';
import { PhotoPurchaseConfirmationLayoutPurchaseDucketCostTextItem } from './PhotoPurchaseConfirmationLayoutPurchaseDucketCostTextItem';

/** Row template `price_area` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutPriceAreaItemProps {
    itemsPriceArea?: ReactNode;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutPriceAreaItem = ({ itemsPriceArea, layout }: PhotoPurchaseConfirmationLayoutPriceAreaItemProps) => {
    return (
        <Region
            name="price_area"
            layout={{ flexShrink: 0, flexDirection: 'row', ...layout }}
        >
            {itemsPriceArea ?? (
                <>
                    <PhotoPurchaseConfirmationLayoutCostInfoItem />
                    <PhotoPurchaseConfirmationLayoutPurchaseCreditCostTextItem />
                    <PhotoPurchaseConfirmationLayoutCreditIconItem />
                    <PhotoPurchaseConfirmationLayoutPurchaseDucketCostTextItem />
                    <PhotoPurchaseConfirmationLayoutDucketIconItem />
                </>
            )}
        </Region>
    );
};
