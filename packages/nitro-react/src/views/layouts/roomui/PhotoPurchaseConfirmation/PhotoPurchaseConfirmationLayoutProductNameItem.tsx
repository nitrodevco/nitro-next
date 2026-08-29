import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `product_name` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutProductNameItemProps {
    captionProductName?: string;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutProductNameItem = ({ captionProductName, layout }: PhotoPurchaseConfirmationLayoutProductNameItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="product_name"
            layout={{ width: 191, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionProductName ?? t('camera.purchase.header')}
                textStyle="text-style-u-bold"
                textOptions={{ wordWrap: true, wordWrapWidth: 191 }}
            />
        </Region>
    );
};
