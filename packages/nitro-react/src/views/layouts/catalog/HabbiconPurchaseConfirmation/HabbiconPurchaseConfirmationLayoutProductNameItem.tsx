import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `product_name` of HabbiconPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface HabbiconPurchaseConfirmationLayoutProductNameItemProps {
    captionProductName?: string;
    layout?: BoxLayout;
}

export const HabbiconPurchaseConfirmationLayoutProductNameItem = ({ captionProductName, layout }: HabbiconPurchaseConfirmationLayoutProductNameItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="product_name"
            layout={{ width: 197, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionProductName ?? t('habbicons.hud.title')}
                textStyle="text-style-u-bold"
                textOptions={{ wordWrap: true, wordWrapWidth: 197 }}
            />
        </Region>
    );
};
