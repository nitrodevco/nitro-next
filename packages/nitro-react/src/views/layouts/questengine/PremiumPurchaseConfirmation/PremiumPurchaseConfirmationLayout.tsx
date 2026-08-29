import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Frame, Region } from '#base/theme';

import { PremiumPurchaseConfirmationLayoutCancelButtonItem } from './PremiumPurchaseConfirmationLayoutCancelButtonItem';
import { PremiumPurchaseConfirmationLayoutConfirmButtonItem } from './PremiumPurchaseConfirmationLayoutConfirmButtonItem';
import { PremiumPurchaseConfirmationLayoutContent, PremiumPurchaseConfirmationLayoutContentProps } from './PremiumPurchaseConfirmationLayoutContent';

/** Generated from `105_premium_purchase_confirmation_xml` (layout "reward_track_premium_purchase_confirmation", 390x352) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PremiumPurchaseConfirmationLayoutProps {
    content?: PremiumPurchaseConfirmationLayoutContentProps;
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const PremiumPurchaseConfirmationLayout = ({ content, itemsButtons, layout, onClose }: PremiumPurchaseConfirmationLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('reward_track.premium.confirm.title')}
            tintColor="#7b3fa1"
            onClose={onClose}
            layout={{ width: 390, height: 352, ...layout }}
        >
            <PremiumPurchaseConfirmationLayoutContent {...content} />
            <Region
                name="buttons"
                layout={{ position: 'absolute', left: 12, right: 12, bottom: 36, minHeight: 27, flexDirection: 'row', gap: 146 }}
            >
                {itemsButtons ?? (
                    <>
                        <PremiumPurchaseConfirmationLayoutCancelButtonItem />
                        <PremiumPurchaseConfirmationLayoutConfirmButtonItem />
                    </>
                )}
            </Region>
        </Frame>
    );
};
