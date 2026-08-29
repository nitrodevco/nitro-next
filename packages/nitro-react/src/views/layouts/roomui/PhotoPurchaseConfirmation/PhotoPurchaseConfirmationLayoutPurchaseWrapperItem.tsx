import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button } from '#base/theme';

import { PhotoPurchaseConfirmationLayoutPropertiesItemlist, PhotoPurchaseConfirmationLayoutPropertiesItemlistProps } from './PhotoPurchaseConfirmationLayoutPropertiesItemlist';

/** Row template `purchase_wrapper` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutPurchaseWrapperItemProps {
    layout?: BoxLayout;
    onBuyButton?: () => void;
    propertiesItemlist?: PhotoPurchaseConfirmationLayoutPropertiesItemlistProps;
    visibleBuyButton?: boolean;
    visiblePropertiesItemlist?: boolean;
}

export const PhotoPurchaseConfirmationLayoutPurchaseWrapperItem = ({ layout, onBuyButton, propertiesItemlist, visibleBuyButton, visiblePropertiesItemlist }: PhotoPurchaseConfirmationLayoutPurchaseWrapperItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="2"
            name="purchase_wrapper"
            tintColor="#c7c6bf"
            layout={{ width: 316, height: 55, flexShrink: 0, minWidth: 316, maxWidth: 316, minHeight: 55, ...layout }}
        >
            {(visiblePropertiesItemlist ?? true) && (
                <PhotoPurchaseConfirmationLayoutPropertiesItemlist {...propertiesItemlist} />
            )}
            {(visibleBuyButton ?? true) && (
                <Button
                    variant="5"
                    name="buy_button"
                    tintColor="#00aa00"
                    onPointerTap={onBuyButton}
                    textStyle="text-style-button-shiny-regular"
                    layout={{ position: 'absolute', right: 7, width: 110, bottom: 8, height: 27, minWidth: 110, maxWidth: 110, minHeight: 27, maxHeight: 27 }}
                >
                    {t('catalog.purchase_confirmation.buy')}
                </Button>
            )}
        </Border>
    );
};
