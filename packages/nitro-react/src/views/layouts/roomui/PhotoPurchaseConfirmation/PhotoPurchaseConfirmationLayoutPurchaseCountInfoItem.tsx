import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `purchase_count_info` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutPurchaseCountInfoItemProps {
    captionPurchaseCountInfo?: string;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutPurchaseCountInfoItem = ({ captionPurchaseCountInfo, layout }: PhotoPurchaseConfirmationLayoutPurchaseCountInfoItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionPurchaseCountInfo ?? t('camera.purchase.count.info')}
            textStyle="text-style-u-bold"
            name="purchase_count_info"
            layout={{ width: 188, height: 19, flexShrink: 0, ...layout }}
        />
    );
};
