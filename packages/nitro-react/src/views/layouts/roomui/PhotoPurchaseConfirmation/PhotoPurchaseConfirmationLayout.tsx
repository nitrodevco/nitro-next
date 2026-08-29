import { useTranslation } from '#base/context';
import { BoxLayout, Frame } from '#base/theme';

import { PhotoPurchaseConfirmationLayoutContentlist, PhotoPurchaseConfirmationLayoutContentlistProps } from './PhotoPurchaseConfirmationLayoutContentlist';

/** Generated from `1060_photo_purchase_confirmation_xml` (layout "photo_purchase_confirmation", 340x686) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PhotoPurchaseConfirmationLayoutProps {
    contentlist?: PhotoPurchaseConfirmationLayoutContentlistProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const PhotoPurchaseConfirmationLayout = ({ contentlist, layout, onClose }: PhotoPurchaseConfirmationLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('camera.confirm_phase.title')}
            tintColor="#555555"
            onClose={onClose}
            layout={{ width: 340, height: 686, minWidth: 340, minHeight: 686, ...layout }}
        >
            <PhotoPurchaseConfirmationLayoutContentlist {...contentlist} />
        </Frame>
    );
};
