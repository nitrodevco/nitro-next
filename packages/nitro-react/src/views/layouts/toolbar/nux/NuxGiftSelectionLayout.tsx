import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1227_nux_gift_selection_xml` (layout "nux_gift_selection", 487x287) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NuxGiftSelectionLayoutProps {
    captionNuxGiftSelectionChooseOne?: string;
    layout?: BoxLayout;
    nuxGiftSelectionList?: NuxGiftSelectionLayoutNuxGiftSelectionListProps;
    onClose?: () => void;
    srcClubIcon?: string;
}

export const NuxGiftSelectionLayout = ({ captionNuxGiftSelectionChooseOne, layout, nuxGiftSelectionList, onClose, srcClubIcon }: NuxGiftSelectionLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('nux.gift.selection.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 487, height: 287, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <Region
                    backgroundColor="#3d6373"
                    layout={{ position: 'absolute', left: -5, right: 7, top: 8, bottom: 219 }}
                >
                    <Region
                        backgroundColor="#0f4052"
                        layout={{ position: 'absolute', left: 2, right: 2, top: 2, bottom: 2 }}
                    >
                        <Region
                            name="nux_gift_selection_choose_one"
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
                        src={srcClubIcon ?? '${image.library.url}nux/nux_present.png'}
                        layout={{ position: 'absolute', left: 16, width: 38, top: 10, height: 41 }}
                    />
                </Region>
                <NuxGiftSelectionLayoutNuxGiftSelectionList {...nuxGiftSelectionList} />
            </Region>
        </Frame>
    );
};

/** Named region `option_bitmap_bg` of NuxGiftSelectionLayout - configured through the parent's `optionBitmapBg` prop. */
export interface NuxGiftSelectionLayoutOptionBitmapBgProps {
    layout?: BoxLayout;
}

export const NuxGiftSelectionLayoutOptionBitmapBg = ({ layout }: NuxGiftSelectionLayoutOptionBitmapBgProps) => {
    return (
        <Region
            name="option_bitmap_bg"
            backgroundColor="#bfbfb8"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        />
    );
};

/** Named region `option_thumbnail` of NuxGiftSelectionLayout - configured through the parent's `optionThumbnail` prop. */
export interface NuxGiftSelectionLayoutOptionThumbnailProps {
    layout?: BoxLayout;
    optionBitmapBg?: NuxGiftSelectionLayoutOptionBitmapBgProps;
    srcOptionBitmap?: string;
}

export const NuxGiftSelectionLayoutOptionThumbnail = ({ layout, optionBitmapBg, srcOptionBitmap }: NuxGiftSelectionLayoutOptionThumbnailProps) => {
    return (
        <Region
            name="option_thumbnail"
            layout={{ position: 'absolute', left: 0, width: 108, top: 0, height: 108, ...layout }}
        >
            <NuxGiftSelectionLayoutOptionBitmapBg {...optionBitmapBg} />
            <ThemeImage
                name="option_bitmap"
                src={srcOptionBitmap}
                layout={{ position: 'absolute', left: 0, width: 108, top: 0, height: 108 }}
            />
        </Region>
    );
};

/** Row template `nux_gift_option` of NuxGiftSelectionLayout - pass real rows through its `items…` slot. */
export interface NuxGiftSelectionLayoutNuxGiftOptionItemProps {
    captionOptionHeading?: string;
    layout?: BoxLayout;
    onOptionButton?: () => void;
    optionThumbnail?: NuxGiftSelectionLayoutOptionThumbnailProps;
}

export const NuxGiftSelectionLayoutNuxGiftOptionItem = ({ captionOptionHeading, layout, onOptionButton, optionThumbnail }: NuxGiftSelectionLayoutNuxGiftOptionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="nux_gift_option"
            layout={{ width: 118, height: 435, flexShrink: 0, ...layout }}
        >
            <NuxGiftSelectionLayoutOptionThumbnail {...optionThumbnail} />
            <Region
                name="option_heading"
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
                onPointerTap={onOptionButton}
                layout={{ position: 'absolute', left: 0, width: 110, top: 140, height: 30, minWidth: 110, maxWidth: 110 }}
            >
                {t('nux.gift.selection.button.get')}
            </Button>
        </Region>
    );
};

/** Named region `option_bitmap_bg` of NuxGiftSelectionLayout - configured through the parent's `optionBitmapBg` prop. */
export interface NuxGiftSelectionLayoutOptionBitmapBg2Props {
    layout?: BoxLayout;
}

export const NuxGiftSelectionLayoutOptionBitmapBg2 = ({ layout }: NuxGiftSelectionLayoutOptionBitmapBg2Props) => {
    return (
        <Region
            name="option_bitmap_bg"
            backgroundColor="#bfbfb8"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        />
    );
};

/** Named region `option_thumbnail` of NuxGiftSelectionLayout - configured through the parent's `optionThumbnail` prop. */
export interface NuxGiftSelectionLayoutOptionThumbnail2Props {
    layout?: BoxLayout;
    optionBitmapBg?: NuxGiftSelectionLayoutOptionBitmapBg2Props;
    srcOptionBitmap?: string;
}

export const NuxGiftSelectionLayoutOptionThumbnail2 = ({ layout, optionBitmapBg, srcOptionBitmap }: NuxGiftSelectionLayoutOptionThumbnail2Props) => {
    return (
        <Region
            name="option_thumbnail"
            layout={{ position: 'absolute', left: 0, width: 108, top: 0, height: 108, ...layout }}
        >
            <NuxGiftSelectionLayoutOptionBitmapBg2 {...optionBitmapBg} />
            <ThemeImage
                name="option_bitmap"
                src={srcOptionBitmap}
                layout={{ position: 'absolute', left: 0, width: 108, top: 0, height: 108 }}
            />
        </Region>
    );
};

/** Row template `nux_gift_option` of NuxGiftSelectionLayout - pass real rows through its `items…` slot. */
export interface NuxGiftSelectionLayoutNuxGiftOptionItem2Props {
    captionOptionHeading?: string;
    layout?: BoxLayout;
    onOptionButton?: () => void;
    optionThumbnail?: NuxGiftSelectionLayoutOptionThumbnail2Props;
}

export const NuxGiftSelectionLayoutNuxGiftOptionItem2 = ({ captionOptionHeading, layout, onOptionButton, optionThumbnail }: NuxGiftSelectionLayoutNuxGiftOptionItem2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="nux_gift_option"
            layout={{ width: 118, height: 435, flexShrink: 0, ...layout }}
        >
            <NuxGiftSelectionLayoutOptionThumbnail2 {...optionThumbnail} />
            <Region
                name="option_heading"
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
                onPointerTap={onOptionButton}
                layout={{ position: 'absolute', left: 0, width: 110, top: 140, height: 30, minWidth: 110, maxWidth: 110 }}
            >
                {t('nux.gift.selection.button.get')}
            </Button>
        </Region>
    );
};

/** Named region `option_bitmap_bg` of NuxGiftSelectionLayout - configured through the parent's `optionBitmapBg` prop. */
export interface NuxGiftSelectionLayoutOptionBitmapBg3Props {
    layout?: BoxLayout;
}

export const NuxGiftSelectionLayoutOptionBitmapBg3 = ({ layout }: NuxGiftSelectionLayoutOptionBitmapBg3Props) => {
    return (
        <Region
            name="option_bitmap_bg"
            backgroundColor="#bfbfb8"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        />
    );
};

/** Named region `option_thumbnail` of NuxGiftSelectionLayout - configured through the parent's `optionThumbnail` prop. */
export interface NuxGiftSelectionLayoutOptionThumbnail3Props {
    layout?: BoxLayout;
    optionBitmapBg?: NuxGiftSelectionLayoutOptionBitmapBg3Props;
    srcOptionBitmap?: string;
}

export const NuxGiftSelectionLayoutOptionThumbnail3 = ({ layout, optionBitmapBg, srcOptionBitmap }: NuxGiftSelectionLayoutOptionThumbnail3Props) => {
    return (
        <Region
            name="option_thumbnail"
            layout={{ position: 'absolute', left: 0, width: 108, top: 0, height: 108, ...layout }}
        >
            <NuxGiftSelectionLayoutOptionBitmapBg3 {...optionBitmapBg} />
            <ThemeImage
                name="option_bitmap"
                src={srcOptionBitmap}
                layout={{ position: 'absolute', left: 0, width: 108, top: 0, height: 108 }}
            />
        </Region>
    );
};

/** Row template `nux_gift_option` of NuxGiftSelectionLayout - pass real rows through its `items…` slot. */
export interface NuxGiftSelectionLayoutNuxGiftOptionItem3Props {
    captionOptionHeading?: string;
    layout?: BoxLayout;
    onOptionButton?: () => void;
    optionThumbnail?: NuxGiftSelectionLayoutOptionThumbnail3Props;
}

export const NuxGiftSelectionLayoutNuxGiftOptionItem3 = ({ captionOptionHeading, layout, onOptionButton, optionThumbnail }: NuxGiftSelectionLayoutNuxGiftOptionItem3Props) => {
    const t = useTranslation();

    return (
        <Region
            name="nux_gift_option"
            layout={{ width: 118, height: 435, flexShrink: 0, ...layout }}
        >
            <NuxGiftSelectionLayoutOptionThumbnail3 {...optionThumbnail} />
            <Region
                name="option_heading"
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
                onPointerTap={onOptionButton}
                layout={{ position: 'absolute', left: 0, width: 110, top: 140, height: 30, minWidth: 110, maxWidth: 110 }}
            >
                {t('nux.gift.selection.button.get')}
            </Button>
        </Region>
    );
};

/** Named region `nux_gift_selection_list` of NuxGiftSelectionLayout - configured through the parent's `nuxGiftSelectionList` prop. */
export interface NuxGiftSelectionLayoutNuxGiftSelectionListProps {
    itemsNuxGiftSelectionList?: ReactNode;
    layout?: BoxLayout;
}

export const NuxGiftSelectionLayoutNuxGiftSelectionList = ({ itemsNuxGiftSelectionList, layout }: NuxGiftSelectionLayoutNuxGiftSelectionListProps) => {
    return (
        <Region
            name="nux_gift_selection_list"
            layout={{ position: 'absolute', marginLeft: -6.5, marginRight: 6.5, minWidth: 374, top: 78, minHeight: 443, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsNuxGiftSelectionList ?? (
                <>
                    <NuxGiftSelectionLayoutNuxGiftOptionItem />
                    <NuxGiftSelectionLayoutNuxGiftOptionItem2 />
                    <NuxGiftSelectionLayoutNuxGiftOptionItem3 />
                </>
            )}
        </Region>
    );
};
