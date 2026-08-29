import { BoxLayout, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `small_coin` of GiftWrappingLayout - pass real rows through its `items…` slot. */
export interface GiftWrappingLayoutSmallCoinItemProps {
    layout?: BoxLayout;
    srcSmallCoin?: string;
}

export const GiftWrappingLayoutSmallCoinItem = ({ layout, srcSmallCoin }: GiftWrappingLayoutSmallCoinItemProps) => {
    return (
        <ThemeImage
            name="small_coin"
            src={srcSmallCoin ?? layoutImage('common_small_coin.png')}
            layout={{ width: 16, height: 16, flexShrink: 0, ...layout }}
        />
    );
};
