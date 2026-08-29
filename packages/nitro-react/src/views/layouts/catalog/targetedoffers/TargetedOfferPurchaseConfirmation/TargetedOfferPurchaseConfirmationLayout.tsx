import { useTranslation } from '#base/context';
import { BoxLayout, Frame } from '#base/theme';

import { TargetedOfferPurchaseConfirmationLayoutContent, TargetedOfferPurchaseConfirmationLayoutContentProps } from './TargetedOfferPurchaseConfirmationLayoutContent';

/** Generated from `1653_targeted_offer_purchase_confirmation_xml` (layout "targeted_offer_purchase_confirmation", 325x291) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TargetedOfferPurchaseConfirmationLayoutProps {
    content?: TargetedOfferPurchaseConfirmationLayoutContentProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const TargetedOfferPurchaseConfirmationLayout = ({ content, layout, onClose }: TargetedOfferPurchaseConfirmationLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('catalog.purchase_confirmation.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 325, height: 291, ...layout }}
        >
            <TargetedOfferPurchaseConfirmationLayoutContent {...content} />
        </Frame>
    );
};
