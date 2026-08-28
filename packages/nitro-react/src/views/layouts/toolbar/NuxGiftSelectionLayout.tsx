import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1227_nux_gift_selection_xml` (layout "nux_gift_selection", 487x287) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NuxGiftSelectionLayoutProps {
    captionNuxGiftSelectionChooseOne?: string;
    itemsNuxGiftSelectionList?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
    srcClubIcon?: string;
}

export const NuxGiftSelectionLayout = ({ captionNuxGiftSelectionChooseOne, itemsNuxGiftSelectionList, layout, onClose, srcClubIcon }: NuxGiftSelectionLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            params={34849}
            caption={t('nux.gift.selection.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 487, height: 287, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <Region
                    params={2176}
                    backgroundColor="#3d6373"
                    layout={{ position: 'absolute', left: -5, right: 7, top: 8, bottom: 219 }}
                >
                    <Region
                        params={2176}
                        backgroundColor="#0f4052"
                        layout={{ position: 'absolute', left: 2, right: 2, top: 2, bottom: 2 }}
                    >
                        <Region
                            name="nux_gift_selection_choose_one"
                            params={273}
                            layout={{ position: 'absolute', left: 75, width: 330, top: 13, height: 28, maxHeight: 84, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionNuxGiftSelectionChooseOne ?? t('nux.gift.selection.choose.one')}
                                textStyle="text-style-u-headline-big"
                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 330 }}
                            />
                        </Region>
                    </Region>
                    <ThemeImage
                        name="club_icon"
                        tags={[ 'ICON' ]}
                        src={srcClubIcon ?? '${image.library.url}nux/nux_present.png'}
                        layout={{ position: 'absolute', left: 16, width: 38, top: 10, height: 41 }}
                    />
                </Region>
                <Region
                    name="nux_gift_selection_list"
                    params={131280}
                    layout={{ position: 'absolute', marginLeft: -6.5, marginRight: 6.5, minWidth: 374, top: 78, minHeight: 443, flexDirection: 'row', gap: 10 }}
                >
                    {itemsNuxGiftSelectionList ?? (
                        <>
                            <NuxGiftSelectionLayoutNuxGiftOptionItem />
                            <NuxGiftSelectionLayoutNuxGiftOptionItem2 />
                            <NuxGiftSelectionLayoutNuxGiftOptionItem3 />
                        </>
                    )}
                </Region>
            </Region>
        </Frame>
    );
};

/** Row template `nux_gift_option` of NuxGiftSelectionLayout - pass real rows through its `items…` slot. */
export interface NuxGiftSelectionLayoutNuxGiftOptionItemProps {
    captionOptionHeading?: string;
    layout?: BoxLayout;
    onOptionButton?: () => void;
    srcOptionBitmap?: string;
}

export const NuxGiftSelectionLayoutNuxGiftOptionItem = ({ captionOptionHeading, layout, onOptionButton, srcOptionBitmap }: NuxGiftSelectionLayoutNuxGiftOptionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="nux_gift_option"
            params={917712}
            layout={{ width: 118, height: 435, flexShrink: 0, ...layout }}
        >
            <Region
                name="option_thumbnail"
                layout={{ position: 'absolute', left: 0, width: 108, top: 0, height: 108 }}
            >
                <Region
                    name="option_bitmap_bg"
                    params={2176}
                    backgroundColor="#bfbfb8"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                <ThemeImage
                    name="option_bitmap"
                    tags={[ 'ICON' ]}
                    src={srcOptionBitmap}
                    layout={{ position: 'absolute', left: 0, width: 108, top: 0, height: 108 }}
                />
            </Region>
            <Region
                name="option_heading"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 108, top: 112, height: 24, maxHeight: 32, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionOptionHeading ?? 'Lorem Ipsum is simply dummy'}
                    textStyle="text-style-u-bold"
                    textOptions={{ wordWrap: true, wordWrapWidth: 108 }}
                />
            </Region>
            <Button
                variant="3"
                name="option_button"
                params={131073}
                onPointerTap={onOptionButton}
                layout={{ position: 'absolute', left: 0, width: 110, top: 140, height: 30, minWidth: 110, maxWidth: 110 }}
            >
                {t('nux.gift.selection.button.get')}
            </Button>
        </Region>
    );
};

/** Row template `nux_gift_option` of NuxGiftSelectionLayout - pass real rows through its `items…` slot. */
export interface NuxGiftSelectionLayoutNuxGiftOptionItem2Props {
    captionOptionHeading?: string;
    layout?: BoxLayout;
    onOptionButton?: () => void;
    srcOptionBitmap?: string;
}

export const NuxGiftSelectionLayoutNuxGiftOptionItem2 = ({ captionOptionHeading, layout, onOptionButton, srcOptionBitmap }: NuxGiftSelectionLayoutNuxGiftOptionItem2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="nux_gift_option"
            params={917712}
            layout={{ width: 118, height: 435, flexShrink: 0, ...layout }}
        >
            <Region
                name="option_thumbnail"
                layout={{ position: 'absolute', left: 0, width: 108, top: 0, height: 108 }}
            >
                <Region
                    name="option_bitmap_bg"
                    params={2176}
                    backgroundColor="#bfbfb8"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                <ThemeImage
                    name="option_bitmap"
                    tags={[ 'ICON' ]}
                    src={srcOptionBitmap}
                    layout={{ position: 'absolute', left: 0, width: 108, top: 0, height: 108 }}
                />
            </Region>
            <Region
                name="option_heading"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 108, top: 112, height: 24, maxHeight: 32, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionOptionHeading ?? 'Lorem Ipsum is simply dummy'}
                    textStyle="text-style-u-bold"
                    textOptions={{ wordWrap: true, wordWrapWidth: 108 }}
                />
            </Region>
            <Button
                variant="3"
                name="option_button"
                params={131073}
                onPointerTap={onOptionButton}
                layout={{ position: 'absolute', left: 0, width: 110, top: 140, height: 30, minWidth: 110, maxWidth: 110 }}
            >
                {t('nux.gift.selection.button.get')}
            </Button>
        </Region>
    );
};

/** Row template `nux_gift_option` of NuxGiftSelectionLayout - pass real rows through its `items…` slot. */
export interface NuxGiftSelectionLayoutNuxGiftOptionItem3Props {
    captionOptionHeading?: string;
    layout?: BoxLayout;
    onOptionButton?: () => void;
    srcOptionBitmap?: string;
}

export const NuxGiftSelectionLayoutNuxGiftOptionItem3 = ({ captionOptionHeading, layout, onOptionButton, srcOptionBitmap }: NuxGiftSelectionLayoutNuxGiftOptionItem3Props) => {
    const t = useTranslation();

    return (
        <Region
            name="nux_gift_option"
            params={917712}
            layout={{ width: 118, height: 435, flexShrink: 0, ...layout }}
        >
            <Region
                name="option_thumbnail"
                layout={{ position: 'absolute', left: 0, width: 108, top: 0, height: 108 }}
            >
                <Region
                    name="option_bitmap_bg"
                    params={2176}
                    backgroundColor="#bfbfb8"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                <ThemeImage
                    name="option_bitmap"
                    tags={[ 'ICON' ]}
                    src={srcOptionBitmap}
                    layout={{ position: 'absolute', left: 0, width: 108, top: 0, height: 108 }}
                />
            </Region>
            <Region
                name="option_heading"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 108, top: 112, height: 24, maxHeight: 32, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionOptionHeading ?? 'Lorem Ipsum is simply dummy'}
                    textStyle="text-style-u-bold"
                    textOptions={{ wordWrap: true, wordWrapWidth: 108 }}
                />
            </Region>
            <Button
                variant="3"
                name="option_button"
                params={131073}
                onPointerTap={onOptionButton}
                layout={{ position: 'absolute', left: 0, width: 110, top: 140, height: 30, minWidth: 110, maxWidth: 110 }}
            >
                {t('nux.gift.selection.button.get')}
            </Button>
        </Region>
    );
};
