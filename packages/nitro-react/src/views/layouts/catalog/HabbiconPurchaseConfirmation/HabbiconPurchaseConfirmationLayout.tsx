import { useTranslation } from '#base/context';
import { BoxLayout, Frame } from '#base/theme';

import { HabbiconPurchaseConfirmationLayoutContent, HabbiconPurchaseConfirmationLayoutContentProps } from './HabbiconPurchaseConfirmationLayoutContent';

/** Generated from `1605_habbicon_purchase_confirmation_xml` (layout "habbicon_purchase_confirmation", 353x296) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HabbiconPurchaseConfirmationLayoutProps {
    content?: HabbiconPurchaseConfirmationLayoutContentProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const HabbiconPurchaseConfirmationLayout = ({ content, layout, onClose }: HabbiconPurchaseConfirmationLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('habbicon_purchase.confirm.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 353, height: 296, ...layout }}
        >
            <HabbiconPurchaseConfirmationLayoutContent {...content} />
        </Frame>
    );
};
