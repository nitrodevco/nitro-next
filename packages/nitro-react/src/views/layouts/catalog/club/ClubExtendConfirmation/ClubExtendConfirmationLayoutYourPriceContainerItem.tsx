import { BoxLayout, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Row template `your_price_container` of ClubExtendConfirmationLayout - pass real rows through its `items…` slot. */
export interface ClubExtendConfirmationLayoutYourPriceContainerItemProps {
    captionPlus?: string;
    captionYourPriceLabel?: string;
    captionYourPricePriceLeft?: string;
    captionYourPricePriceRight?: string;
    layout?: BoxLayout;
    srcYourPriceIconLeft?: string;
    tintYourPriceIconLeft?: string;
    visiblePlus?: boolean;
    visibleYourPriceIconLeft?: boolean;
    visibleYourPriceIconRight?: boolean;
    visibleYourPriceLabel?: boolean;
    visibleYourPricePriceLeft?: boolean;
    visibleYourPricePriceRight?: boolean;
}

export const ClubExtendConfirmationLayoutYourPriceContainerItem = ({ captionPlus, captionYourPriceLabel, captionYourPricePriceLeft, captionYourPricePriceRight, layout, srcYourPriceIconLeft, tintYourPriceIconLeft, visiblePlus, visibleYourPriceIconLeft, visibleYourPriceIconRight, visibleYourPriceLabel, visibleYourPricePriceLeft, visibleYourPricePriceRight }: ClubExtendConfirmationLayoutYourPriceContainerItemProps) => {
    return (
        <Region
            name="your_price_container"
            layout={{ width: 285, height: 31, flexShrink: 0, ...layout }}
        >
            {(visibleYourPriceLabel ?? true) && (
                <ThemeText
                    text={captionYourPriceLabel ?? ''}
                    textStyle="text-style-u-bold"
                    name="your_price_label"
                    layout={{ position: 'absolute', left: 0, width: 4, bottom: 12, height: 4 }}
                />
            )}
            {(visibleYourPricePriceLeft ?? true) && (
                <ThemeText
                    text={captionYourPricePriceLeft ?? ''}
                    textStyle="text-style-u-bold"
                    textOptions={{ align: 'right' }}
                    name="your_price_price_left"
                    layout={{ position: 'absolute', left: 150, width: 30, bottom: 12, height: 4 }}
                />
            )}
            {(visibleYourPriceIconLeft ?? true) && (
                <ThemeImage
                    name="your_price_icon_left"
                    src={srcYourPriceIconLeft}
                    tint={tintYourPriceIconLeft}
                    layout={{ position: 'absolute', left: 180, width: 30, top: 0, height: 25 }}
                />
            )}
            {(visiblePlus ?? true) && (
                <ThemeText
                    text={captionPlus ?? ' '}
                    textStyle="text-style-u-bold"
                    textOptions={{ align: 'right' }}
                    name="plus"
                    layout={{ position: 'absolute', left: 212, width: 10, top: 0, height: 4 }}
                />
            )}
            {(visibleYourPricePriceRight ?? true) && (
                <ThemeText
                    text={captionYourPricePriceRight ?? ''}
                    textStyle="text-style-u-bold"
                    textOptions={{ align: 'right' }}
                    name="your_price_price_right"
                    layout={{ position: 'absolute', left: 220, width: 30, bottom: 12, height: 4 }}
                />
            )}
            {(visibleYourPriceIconRight ?? true) && (
                <Icon
                    variant="0"
                    name="your_price_icon_right"
                    layout={{ position: 'absolute', left: 255, width: 30, top: 0, height: 25 }}
                />
            )}
        </Region>
    );
};
