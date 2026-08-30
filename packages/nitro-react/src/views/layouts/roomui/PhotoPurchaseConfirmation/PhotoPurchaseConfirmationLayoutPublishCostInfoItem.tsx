import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `publish_cost_info` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutPublishCostInfoItemProps {
    captionPublishCostInfo?: string;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutPublishCostInfoItem = ({ captionPublishCostInfo, layout }: PhotoPurchaseConfirmationLayoutPublishCostInfoItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionPublishCostInfo ?? t('catalog.purchase.confirmation.dialog.cost')}
            textStyle="text-style-u-regular"
            name="publish_cost_info"
            layout={{ width: 268, height: 19, flexShrink: 0, ...layout }}
        />
    );
};
