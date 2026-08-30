import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `product_name` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutProductNameItemProps {
    captionProductName?: string;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutProductNameItem = ({ captionProductName, layout }: PhotoPurchaseConfirmationLayoutProductNameItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionProductName ?? t('camera.purchase.header')}
            textStyle="text-style-u-bold"
            textOptions={{ wordWrap: true, wordWrapWidth: 191 }}
            name="product_name"
            verticalAlign="top"
            layout={{ width: 191, flexShrink: 0, ...layout }}
        />
    );
};
