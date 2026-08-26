import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `861_mystery_box_toolbar_extension_xml` (layout "mystery_box_toolbar_extension", 192x137) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MysteryBoxToolbarExtensionLayoutProps {
    layout?: BoxLayout;
    onFaqLink?: () => void;
}

export const MysteryBoxToolbarExtensionLayout = ({ layout, onFaqLink }: MysteryBoxToolbarExtensionLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 192, height: 137, ...layout }}>
            <Border
                variant="6"
                params={16}
                tintColor="#676767"
                layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 137 }}
            >
                <Border
                    variant="3"
                    params={16}
                    tintColor="#201e19"
                    blend={0.8}
                    layout={{ position: 'absolute', left: 3, width: 186, top: 3, height: 130 }}
                >
                    <Region
                        params={16}
                        backgroundColor="#676767"
                        layout={{ position: 'absolute', left: 0, width: 186, top: 0, height: 20 }}
                    />
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 1, width: 150, top: 3, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('mysterybox.tracker.title')}
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 150 }}
                        />
                    </Region>
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 6, width: 174, top: 27, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('mysterybox.tracker.description')}
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 174 }}
                        />
                    </Region>
                    <Region
                        params={147664}
                        layout={{ position: 'absolute', left: 49, width: 89, top: 72, height: 39 }}
                    >
                        <Region
                            name="box_region"
                            params={17}
                            layout={{ position: 'absolute', left: 0, width: 39, top: 0, height: 39 }}
                        >
                            <ThemeImage
                                params={16}
                                src={layoutImage('mysterybox_tracker_border.png')}
                                layout={{ position: 'absolute', left: 0, width: 39, top: 0, height: 39 }}
                            />
                            <ThemeImage
                                name="box_colour"
                                params={16}
                                src={layoutImage('mysterybox_box_base.png')}
                                tint="#ff0000"
                                layout={{ position: 'absolute', left: 0, width: 39, top: 0, height: 39 }}
                            />
                            <ThemeImage
                                name="box_overlay"
                                params={16}
                                src={layoutImage('mysterybox_box_overlay.png')}
                                layout={{ position: 'absolute', left: 0, width: 39, top: 0, height: 39 }}
                            />
                        </Region>
                        <Region
                            name="key_region"
                            params={17}
                            layout={{ position: 'absolute', left: 50, width: 39, top: 0, height: 39 }}
                        >
                            <ThemeImage
                                params={16}
                                src={layoutImage('mysterybox_tracker_border.png')}
                                layout={{ position: 'absolute', left: 0, width: 39, top: 0, height: 39 }}
                            />
                            <ThemeImage
                                name="key_colour"
                                params={16}
                                src={layoutImage('mysterybox_key_base.png')}
                                tint="#ff0000"
                                layout={{ position: 'absolute', left: 0, width: 39, top: 0, height: 39 }}
                            />
                            <ThemeImage
                                name="key_overlay"
                                params={16}
                                src={layoutImage('mysterybox_key_overlay.png')}
                                layout={{ position: 'absolute', left: 0, width: 39, top: 0, height: 39 }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="faq_link"
                        params={193}
                        layout={{ position: 'absolute', left: 24, width: 138, top: 112, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        onPointerTap={onFaqLink}
                        cursor="pointer"
                    >
                        <ThemeText
                            text={t('mysterybox.tracker.link')}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#00beff' }}
                        />
                    </Region>
                </Border>
                <Region
                    name="minimize_region"
                    params={17}
                    layout={{ position: 'absolute', left: 168, width: 20, top: 2, height: 20 }}
                >
                    <ThemeImage
                        params={16}
                        src={layoutImage('common_minimize_unetched.png')}
                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 19 }}
                    />
                </Region>
                <Region
                    name="maximize_region"
                    params={17}
                    visible={false}
                    layout={{ position: 'absolute', left: 168, width: 20, top: 2, height: 20 }}
                >
                    <ThemeImage
                        params={16}
                        src={layoutImage('common_maximize_unetched.png')}
                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 19 }}
                    />
                </Region>
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 124, width: 19, top: 2, height: 20 }}
                >
                    <ThemeImage
                        name="small_box"
                        params={16}
                        src={layoutImage('mysterybox_box_small.png')}
                        tint="#ff0000"
                        layout={{ position: 'absolute', left: 124, width: 19, top: 2, height: 20 }}
                    />
                </Region>
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 144, width: 20, top: 3, height: 19 }}
                >
                    <ThemeImage
                        name="small_key"
                        params={16}
                        src={layoutImage('mysterybox_key_small.png')}
                        tint="#ff0000"
                        layout={{ position: 'absolute', left: 144, width: 20, top: 3, height: 19 }}
                    />
                </Region>
            </Border>
        </Region>
    );
};
