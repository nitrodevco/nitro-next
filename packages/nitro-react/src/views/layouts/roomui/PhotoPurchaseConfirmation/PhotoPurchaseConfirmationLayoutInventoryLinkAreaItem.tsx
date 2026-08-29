import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { PhotoPurchaseConfirmationLayoutInventoryLinkItem } from './PhotoPurchaseConfirmationLayoutInventoryLinkItem';
import { PhotoPurchaseConfirmationLayoutPurchaseCountInfoItem } from './PhotoPurchaseConfirmationLayoutPurchaseCountInfoItem';
import { PhotoPurchaseConfirmationLayoutPurchaseCountItem } from './PhotoPurchaseConfirmationLayoutPurchaseCountItem';

/** Row template `inventory_link_area` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutInventoryLinkAreaItemProps {
    itemsInventoryLinkArea?: ReactNode;
    layout?: BoxLayout;
    visibleInventoryLinkArea?: boolean;
}

export const PhotoPurchaseConfirmationLayoutInventoryLinkAreaItem = ({ itemsInventoryLinkArea, layout, visibleInventoryLinkArea }: PhotoPurchaseConfirmationLayoutInventoryLinkAreaItemProps) => {
    return (
        (visibleInventoryLinkArea ?? false) && (
            <Region
                name="inventory_link_area"
                layout={{ flexShrink: 0, flexDirection: 'row', ...layout }}
            >
                {itemsInventoryLinkArea ?? (
                    <>
                        <PhotoPurchaseConfirmationLayoutPurchaseCountInfoItem />
                        <PhotoPurchaseConfirmationLayoutPurchaseCountItem />
                        <PhotoPurchaseConfirmationLayoutInventoryLinkItem />
                    </>
                )}
            </Region>
        )
    );
};
