import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { PhotoPurchaseConfirmationLayoutInventoryLinkAreaItem } from './PhotoPurchaseConfirmationLayoutInventoryLinkAreaItem';
import { PhotoPurchaseConfirmationLayoutPriceAreaItem } from './PhotoPurchaseConfirmationLayoutPriceAreaItem';
import { PhotoPurchaseConfirmationLayoutProductNameItem } from './PhotoPurchaseConfirmationLayoutProductNameItem';
import { PhotoPurchaseConfirmationLayoutQuantityItem } from './PhotoPurchaseConfirmationLayoutQuantityItem';

/** Named region `properties_itemlist` of PhotoPurchaseConfirmationLayout - configured through the parent's `propertiesItemlist` prop. */
export interface PhotoPurchaseConfirmationLayoutPropertiesItemlistProps {
    itemsPropertiesItemlist?: ReactNode;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutPropertiesItemlist = ({ itemsPropertiesItemlist, layout }: PhotoPurchaseConfirmationLayoutPropertiesItemlistProps) => {
    return (
        <Region
            name="properties_itemlist"
            layout={{ position: 'absolute', left: 6, width: 309, top: 4, height: 43, flexDirection: 'column', gap: 2, ...layout }}
        >
            {itemsPropertiesItemlist ?? (
                <>
                    <PhotoPurchaseConfirmationLayoutProductNameItem />
                    <PhotoPurchaseConfirmationLayoutQuantityItem />
                    <PhotoPurchaseConfirmationLayoutPriceAreaItem />
                    <PhotoPurchaseConfirmationLayoutInventoryLinkAreaItem />
                </>
            )}
        </Region>
    );
};
