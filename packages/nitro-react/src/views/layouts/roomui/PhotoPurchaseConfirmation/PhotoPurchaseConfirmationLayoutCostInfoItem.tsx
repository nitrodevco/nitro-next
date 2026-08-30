import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `cost_info` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutCostInfoItemProps {
    captionCostInfo?: string;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutCostInfoItem = ({ captionCostInfo, layout }: PhotoPurchaseConfirmationLayoutCostInfoItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionCostInfo ?? t('catalog.purchase.confirmation.dialog.cost')}
            textStyle="text-style-u-regular"
            name="cost_info"
            layout={{ width: 268, height: 19, flexShrink: 0, ...layout }}
        />
    );
};
