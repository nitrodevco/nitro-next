import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `pick_box_price_title` of GiftWrappingLayout - pass real rows through its `items…` slot. */
export interface GiftWrappingLayoutPickBoxPriceTitleItemProps {
    captionPickBoxPriceTitle?: string;
    layout?: BoxLayout;
}

export const GiftWrappingLayoutPickBoxPriceTitleItem = ({ captionPickBoxPriceTitle, layout }: GiftWrappingLayoutPickBoxPriceTitleItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionPickBoxPriceTitle ?? t('catalog.gift_wrapping.price')}
            textStyle="text-style-u-regular"
            name="pick_box_price_title"
            layout={{ width: 155, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
