import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `product_name` of HabbiconPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface HabbiconPurchaseConfirmationLayoutProductNameItemProps {
    captionProductName?: string;
    layout?: BoxLayout;
}

export const HabbiconPurchaseConfirmationLayoutProductNameItem = ({ captionProductName, layout }: HabbiconPurchaseConfirmationLayoutProductNameItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionProductName ?? t('habbicons.hud.title')}
            textStyle="text-style-u-bold"
            textOptions={{ wordWrap: true, wordWrapWidth: 197 }}
            name="product_name"
            verticalAlign="top"
            layout={{ width: 197, height: 19, flexShrink: 0, ...layout }}
        />
    );
};
