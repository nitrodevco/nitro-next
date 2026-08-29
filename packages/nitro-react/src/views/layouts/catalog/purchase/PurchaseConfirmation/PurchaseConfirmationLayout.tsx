import { useTranslation } from '#base/context';
import { BoxLayout, Frame } from '#base/theme';

import { PurchaseConfirmationLayoutContent, PurchaseConfirmationLayoutContentProps } from './PurchaseConfirmationLayoutContent';

/** Generated from `1692_purchase_confirmation_xml` (layout "purchase_confirmation", 325x339) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PurchaseConfirmationLayoutProps {
    content?: PurchaseConfirmationLayoutContentProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const PurchaseConfirmationLayout = ({ content, layout, onClose }: PurchaseConfirmationLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('catalog.purchase_confirmation.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 325, height: 339, minWidth: 275, minHeight: 150, ...layout }}
        >
            <PurchaseConfirmationLayoutContent {...content} />
        </Frame>
    );
};
