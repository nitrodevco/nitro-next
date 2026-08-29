import { BoxLayout, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Row template `normal_price_container` of ClubExtendConfirmationLayout - pass real rows through its `items…` slot. */
export interface ClubExtendConfirmationLayoutNormalPriceContainerItemProps {
    captionNormalPriceLabel?: string;
    captionNormalPricePriceLeft?: string;
    captionNormalPricePriceRight?: string;
    captionPlus?: string;
    layout?: BoxLayout;
    srcNormalPriceIconLeft?: string;
    tintNormalPriceIconLeft?: string;
    visibleNormalPriceIconLeft?: boolean;
    visibleNormalPriceIconRight?: boolean;
    visibleNormalPriceLabel?: boolean;
    visibleNormalPricePriceLeft?: boolean;
    visibleNormalPricePriceRight?: boolean;
    visiblePlus?: boolean;
}

export const ClubExtendConfirmationLayoutNormalPriceContainerItem = ({ captionNormalPriceLabel, captionNormalPricePriceLeft, captionNormalPricePriceRight, captionPlus, layout, srcNormalPriceIconLeft, tintNormalPriceIconLeft, visibleNormalPriceIconLeft, visibleNormalPriceIconRight, visibleNormalPriceLabel, visibleNormalPricePriceLeft, visibleNormalPricePriceRight, visiblePlus }: ClubExtendConfirmationLayoutNormalPriceContainerItemProps) => {
    return (
        <Region
            name="normal_price_container"
            layout={{ width: 285, height: 30, flexShrink: 0, ...layout }}
        >
            {(visibleNormalPriceLabel ?? true) && (
                <Region
                    name="normal_price_label"
                    layout={{ position: 'absolute', left: 0, width: 4, bottom: 11, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionNormalPriceLabel ?? ''}
                        textStyle="text-style-u-regular"
                    />
                </Region>
            )}
            {(visibleNormalPricePriceLeft ?? true) && (
                <Region
                    name="normal_price_price_left"
                    layout={{ position: 'absolute', left: 150, width: 30, bottom: 11, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                >
                    <ThemeText
                        text={captionNormalPricePriceLeft ?? ''}
                        textStyle="text-style-u-regular"
                        textOptions={{ align: 'right' }}
                    />
                </Region>
            )}
            {(visibleNormalPriceIconLeft ?? true) && (
                <ThemeImage
                    name="normal_price_icon_left"
                    src={srcNormalPriceIconLeft}
                    tint={tintNormalPriceIconLeft}
                    layout={{ position: 'absolute', left: 180, width: 30, top: 0, height: 25 }}
                />
            )}
            {(visiblePlus ?? true) && (
                <Region
                    name="plus"
                    layout={{ position: 'absolute', left: 212, width: 10, top: 0, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                >
                    <ThemeText
                        text={captionPlus ?? ' '}
                        textStyle="text-style-u-regular"
                        textOptions={{ align: 'right' }}
                    />
                </Region>
            )}
            {(visibleNormalPricePriceRight ?? true) && (
                <Region
                    name="normal_price_price_right"
                    layout={{ position: 'absolute', left: 220, width: 30, bottom: 11, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                >
                    <ThemeText
                        text={captionNormalPricePriceRight ?? ''}
                        textStyle="text-style-u-regular"
                        textOptions={{ align: 'right' }}
                    />
                </Region>
            )}
            {(visibleNormalPriceIconRight ?? true) && (
                <Icon
                    variant="0"
                    name="normal_price_icon_right"
                    layout={{ position: 'absolute', left: 255, width: 30, top: 0, height: 25 }}
                />
            )}
        </Region>
    );
};
