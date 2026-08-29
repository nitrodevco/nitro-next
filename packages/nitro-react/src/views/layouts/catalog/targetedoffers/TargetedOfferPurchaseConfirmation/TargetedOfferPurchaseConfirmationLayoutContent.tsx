import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeImage } from '#base/theme';

import { TargetedOfferPurchaseConfirmationLayoutButtonsItem } from './TargetedOfferPurchaseConfirmationLayoutButtonsItem';
import { TargetedOfferPurchaseConfirmationLayoutDisclaimerItem } from './TargetedOfferPurchaseConfirmationLayoutDisclaimerItem';
import { TargetedOfferPurchaseConfirmationLayoutPropertiesItemlistItem } from './TargetedOfferPurchaseConfirmationLayoutPropertiesItemlistItem';

/** Named region `content` of TargetedOfferPurchaseConfirmationLayout - configured through the parent's `content` prop. */
export interface TargetedOfferPurchaseConfirmationLayoutContentProps {
    itemsContent?: ReactNode;
    itemsPropertiesItemlist?: ReactNode;
    layout?: BoxLayout;
}

export const TargetedOfferPurchaseConfirmationLayoutContent = ({ itemsContent, itemsPropertiesItemlist, layout }: TargetedOfferPurchaseConfirmationLayoutContentProps) => {
    return (
        <Region
            name="content"
            layout={{ position: 'absolute', left: 0, right: -10, top: 8, bottom: 7, flexDirection: 'column', gap: 10, ...layout }}
        >
            {itemsContent ?? (
                <>
                    <TargetedOfferPurchaseConfirmationLayoutDisclaimerItem />
                    <TargetedOfferPurchaseConfirmationLayoutButtonsItem />
                </>
            )}
            <Region layout={{ minWidth: 404, minHeight: 171, flexShrink: 0, flexDirection: 'column', gap: 5 }}>
                <Region layout={{ width: 344, height: 171, flexShrink: 0 }}>
                    <Region
                        name="properties_itemlist"
                        layout={{ position: 'absolute', left: 102, width: 176, top: 24, height: 64, flexDirection: 'column', gap: 7 }}
                    >
                        {itemsPropertiesItemlist ?? (
                            <TargetedOfferPurchaseConfirmationLayoutPropertiesItemlistItem />
                        )}
                    </Region>
                    <ThemeImage
                        src="${image.library.url}targetedoffers/coins_diamonds_icon.png"
                        layout={{ position: 'absolute', left: 13, width: 68, top: 23, height: 40 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
