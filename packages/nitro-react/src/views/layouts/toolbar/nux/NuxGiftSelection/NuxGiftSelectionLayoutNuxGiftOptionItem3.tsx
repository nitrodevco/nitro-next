import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';

/** Row template `nux_gift_option` of NuxGiftSelectionLayout - pass real rows through its `items…` slot. */
export interface NuxGiftSelectionLayoutNuxGiftOptionItem3Props {
    captionOptionHeading?: string;
    layout?: BoxLayout;
    onOptionButton?: () => void;
    optionBitmapBg?: ReactNode;
    srcOptionBitmap?: string;
    visibleOptionBitmap?: boolean;
    visibleOptionBitmapBg?: boolean;
    visibleOptionButton?: boolean;
    visibleOptionHeading?: boolean;
    visibleOptionThumbnail?: boolean;
}

export const NuxGiftSelectionLayoutNuxGiftOptionItem3 = ({ captionOptionHeading, layout, onOptionButton, optionBitmapBg, srcOptionBitmap, visibleOptionBitmap, visibleOptionBitmapBg, visibleOptionButton, visibleOptionHeading, visibleOptionThumbnail }: NuxGiftSelectionLayoutNuxGiftOptionItem3Props) => {
    const t = useTranslation();

    return (
        <Region
            name="nux_gift_option"
            layout={{ width: 118, height: 435, flexShrink: 0, ...layout }}
        >
            {(visibleOptionThumbnail ?? true) && (
                <Region
                    name="option_thumbnail"
                    layout={{ position: 'absolute', left: 0, width: 108, top: 0, height: 108 }}
                >
                    {(visibleOptionBitmapBg ?? true) && (
                        <Region
                            name="option_bitmap_bg"
                            backgroundColor="#bfbfb8"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                        >
                            {optionBitmapBg}
                        </Region>
                    )}
                    {(visibleOptionBitmap ?? true) && (
                        <ThemeImage
                            name="option_bitmap"
                            src={srcOptionBitmap}
                            layout={{ position: 'absolute', left: 0, width: 108, top: 0, height: 108 }}
                        />
                    )}
                </Region>
            )}
            {(visibleOptionHeading ?? true) && (
                <ThemeText
                    text={captionOptionHeading ?? 'Lorem Ipsum is simply dummy'}
                    textStyle="text-style-u-bold"
                    textOptions={{ wordWrap: true, wordWrapWidth: 108 }}
                    name="option_heading"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, width: 108, top: 112, height: 24, maxHeight: 32 }}
                />
            )}
            {(visibleOptionButton ?? true) && (
                <Button
                    variant="3"
                    name="option_button"
                    onPointerTap={onOptionButton}
                    layout={{ position: 'absolute', left: 0, width: 110, top: 140, height: 30, minWidth: 110, maxWidth: 110 }}
                >
                    {t('nux.gift.selection.button.get')}
                </Button>
            )}
        </Region>
    );
};
