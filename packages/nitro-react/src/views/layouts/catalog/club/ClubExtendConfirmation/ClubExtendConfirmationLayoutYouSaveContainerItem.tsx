import { BoxLayout, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Row template `you_save_container` of ClubExtendConfirmationLayout - pass real rows through its `items…` slot. */
export interface ClubExtendConfirmationLayoutYouSaveContainerItemProps {
    captionPlus?: string;
    captionYouSaveLabel?: string;
    captionYouSavePriceLeft?: string;
    captionYouSavePriceRight?: string;
    layout?: BoxLayout;
    srcYouSaveIconLeft?: string;
    tintYouSaveIconLeft?: string;
    visiblePlus?: boolean;
    visibleYouSaveIconLeft?: boolean;
    visibleYouSaveIconRight?: boolean;
    visibleYouSaveLabel?: boolean;
    visibleYouSavePriceLeft?: boolean;
    visibleYouSavePriceRight?: boolean;
}

export const ClubExtendConfirmationLayoutYouSaveContainerItem = ({ captionPlus, captionYouSaveLabel, captionYouSavePriceLeft, captionYouSavePriceRight, layout, srcYouSaveIconLeft, tintYouSaveIconLeft, visiblePlus, visibleYouSaveIconLeft, visibleYouSaveIconRight, visibleYouSaveLabel, visibleYouSavePriceLeft, visibleYouSavePriceRight }: ClubExtendConfirmationLayoutYouSaveContainerItemProps) => {
    return (
        <Region
            name="you_save_container"
            layout={{ width: 285, height: 30, flexShrink: 0, ...layout }}
        >
            {(visibleYouSaveLabel ?? true) && (
                <ThemeText
                    text={captionYouSaveLabel ?? ''}
                    textStyle="text-style-u-regular"
                    name="you_save_label"
                    layout={{ position: 'absolute', left: 0, width: 4, bottom: 11, height: 4 }}
                />
            )}
            {(visibleYouSavePriceLeft ?? true) && (
                <ThemeText
                    text={captionYouSavePriceLeft ?? ''}
                    textStyle="text-style-u-regular"
                    textOptions={{ align: 'right' }}
                    name="you_save_price_left"
                    layout={{ position: 'absolute', left: 150, width: 30, bottom: 11, height: 4 }}
                />
            )}
            {(visibleYouSaveIconLeft ?? true) && (
                <ThemeImage
                    name="you_save_icon_left"
                    src={srcYouSaveIconLeft}
                    tint={tintYouSaveIconLeft}
                    layout={{ position: 'absolute', left: 180, width: 30, top: 0, height: 25 }}
                />
            )}
            {(visiblePlus ?? true) && (
                <ThemeText
                    text={captionPlus ?? ' '}
                    textStyle="text-style-u-regular"
                    textOptions={{ align: 'right' }}
                    name="plus"
                    layout={{ position: 'absolute', left: 212, width: 10, top: 0, height: 4 }}
                />
            )}
            {(visibleYouSavePriceRight ?? true) && (
                <ThemeText
                    text={captionYouSavePriceRight ?? ''}
                    textStyle="text-style-u-regular"
                    textOptions={{ align: 'right' }}
                    name="you_save_price_right"
                    layout={{ position: 'absolute', left: 220, width: 30, bottom: 11, height: 4 }}
                />
            )}
            {(visibleYouSaveIconRight ?? true) && (
                <Icon
                    variant="0"
                    name="you_save_icon_right"
                    layout={{ position: 'absolute', left: 255, width: 30, top: 0, height: 25 }}
                />
            )}
        </Region>
    );
};
