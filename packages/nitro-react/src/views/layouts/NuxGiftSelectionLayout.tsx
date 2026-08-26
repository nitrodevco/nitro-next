import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1227_nux_gift_selection_xml` (layout "nux_gift_selection", 487x287) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NuxGiftSelectionLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onOptionButton?: () => void;
    onOptionButton2?: () => void;
    onOptionButton3?: () => void;
}

export const NuxGiftSelectionLayout = ({ layout, onClose, onOptionButton, onOptionButton2, onOptionButton3 }: NuxGiftSelectionLayoutProps) => {
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
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    params={2176}
                    backgroundColor="#3d6373"
                    layout={{ position: 'absolute', left: -5, width: 485, top: 8, height: 60 }}
                >
                    <Region
                        params={2176}
                        backgroundColor="#0f4052"
                        layout={{ position: 'absolute', left: 2, width: 481, top: 2, height: 56 }}
                    >
                        <Region
                            name="nux_gift_selection_choose_one"
                            params={273}
                            layout={{ position: 'absolute', left: 75, width: 330, top: 13, height: 28, maxHeight: 84, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('nux.gift.selection.choose.one')}
                                textStyle="text-style-u-headline-big"
                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 330 }}
                            />
                        </Region>
                    </Region>
                    <ThemeImage
                        name="club_icon"
                        tags={[ 'ICON' ]}
                        src="${image.library.url}nux/nux_present.png"
                        layout={{ position: 'absolute', left: 16, width: 38, top: 10, height: 41 }}
                    />
                </Region>
                <Region
                    name="nux_gift_selection_list"
                    params={131280}
                    layout={{ position: 'absolute', left: 50, width: 374, top: 78, height: 443, flexDirection: 'row', gap: 10 }}
                >
                    <Region
                        name="nux_gift_option"
                        params={917712}
                        layout={{ width: 118, height: 435, flexShrink: 0 }}
                    >
                        <Region
                            name="option_thumbnail"
                            layout={{ position: 'absolute', left: 0, width: 108, top: 0, height: 108 }}
                        >
                            <Region
                                name="option_bitmap_bg"
                                params={2176}
                                backgroundColor="#bfbfb8"
                                layout={{ position: 'absolute', left: 0, width: 108, top: 0, height: 108 }}
                            />
                            <ThemeImage
                                name="option_bitmap"
                                tags={[ 'ICON' ]}
                                src={undefined}
                                layout={{ position: 'absolute', left: 0, width: 108, top: 0, height: 108 }}
                            />
                        </Region>
                        <Region
                            name="option_heading"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 108, top: 112, height: 24, maxHeight: 32, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="Lorem Ipsum is simply dummy"
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
                    <Region
                        name="nux_gift_option"
                        params={917712}
                        layout={{ width: 118, height: 435, flexShrink: 0 }}
                    >
                        <Region
                            name="option_thumbnail"
                            layout={{ position: 'absolute', left: 0, width: 108, top: 0, height: 108 }}
                        >
                            <Region
                                name="option_bitmap_bg"
                                params={2176}
                                backgroundColor="#bfbfb8"
                                layout={{ position: 'absolute', left: 0, width: 108, top: 0, height: 108 }}
                            />
                            <ThemeImage
                                name="option_bitmap"
                                tags={[ 'ICON' ]}
                                src={undefined}
                                layout={{ position: 'absolute', left: 0, width: 108, top: 0, height: 108 }}
                            />
                        </Region>
                        <Region
                            name="option_heading"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 108, top: 112, height: 24, maxHeight: 32, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="Lorem Ipsum is simply dummy"
                                textStyle="text-style-u-bold"
                                textOptions={{ wordWrap: true, wordWrapWidth: 108 }}
                            />
                        </Region>
                        <Button
                            variant="3"
                            name="option_button"
                            params={131073}
                            onPointerTap={onOptionButton2}
                            layout={{ position: 'absolute', left: 0, width: 110, top: 140, height: 30, minWidth: 110, maxWidth: 110 }}
                        >
                            {t('nux.gift.selection.button.get')}
                        </Button>
                    </Region>
                    <Region
                        name="nux_gift_option"
                        params={917712}
                        layout={{ width: 118, height: 435, flexShrink: 0 }}
                    >
                        <Region
                            name="option_thumbnail"
                            layout={{ position: 'absolute', left: 0, width: 108, top: 0, height: 108 }}
                        >
                            <Region
                                name="option_bitmap_bg"
                                params={2176}
                                backgroundColor="#bfbfb8"
                                layout={{ position: 'absolute', left: 0, width: 108, top: 0, height: 108 }}
                            />
                            <ThemeImage
                                name="option_bitmap"
                                tags={[ 'ICON' ]}
                                src={undefined}
                                layout={{ position: 'absolute', left: 0, width: 108, top: 0, height: 108 }}
                            />
                        </Region>
                        <Region
                            name="option_heading"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 108, top: 112, height: 24, maxHeight: 32, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="Lorem Ipsum is simply dummy"
                                textStyle="text-style-u-bold"
                                textOptions={{ wordWrap: true, wordWrapWidth: 108 }}
                            />
                        </Region>
                        <Button
                            variant="3"
                            name="option_button"
                            params={131073}
                            onPointerTap={onOptionButton3}
                            layout={{ position: 'absolute', left: 0, width: 110, top: 140, height: 30, minWidth: 110, maxWidth: 110 }}
                        >
                            {t('nux.gift.selection.button.get')}
                        </Button>
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
