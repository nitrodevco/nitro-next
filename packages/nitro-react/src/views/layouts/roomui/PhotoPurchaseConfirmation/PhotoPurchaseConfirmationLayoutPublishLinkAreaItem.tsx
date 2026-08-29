import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { PhotoPurchaseConfirmationLayoutPublishLinkItem } from './PhotoPurchaseConfirmationLayoutPublishLinkItem';

/** Row template `publish_link_area` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutPublishLinkAreaItemProps {
    itemsPublishLinkArea?: ReactNode;
    layout?: BoxLayout;
    visiblePublishLinkArea?: boolean;
}

export const PhotoPurchaseConfirmationLayoutPublishLinkAreaItem = ({ itemsPublishLinkArea, layout, visiblePublishLinkArea }: PhotoPurchaseConfirmationLayoutPublishLinkAreaItemProps) => {
    return (
        (visiblePublishLinkArea ?? false) && (
            <Region
                name="publish_link_area"
                layout={{ flexShrink: 0, flexDirection: 'row', ...layout }}
            >
                {itemsPublishLinkArea ?? (
                    <PhotoPurchaseConfirmationLayoutPublishLinkItem />
                )}
            </Region>
        )
    );
};
