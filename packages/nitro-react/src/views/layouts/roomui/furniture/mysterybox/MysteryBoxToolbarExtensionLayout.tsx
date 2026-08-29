import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `861_mystery_box_toolbar_extension_xml` (layout "mystery_box_toolbar_extension", 192x137) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MysteryBoxToolbarExtensionLayoutProps {
    captionFaqLink?: string;
    layout?: BoxLayout;
    onBoxRegion?: () => void;
    onFaqLink?: () => void;
    onKeyRegion?: () => void;
    onMaximizeRegion?: () => void;
    onMinimizeRegion?: () => void;
    srcBoxColour?: string;
    srcBoxOverlay?: string;
    srcKeyColour?: string;
    srcKeyOverlay?: string;
    srcSmallBox?: string;
    srcSmallKey?: string;
    visibleMaximizeRegion?: boolean;
    visibleSmallBox?: boolean;
    visibleSmallKey?: boolean;
}

export const MysteryBoxToolbarExtensionLayout = ({ captionFaqLink, layout, onBoxRegion, onFaqLink, onKeyRegion, onMaximizeRegion, onMinimizeRegion, srcBoxColour, srcBoxOverlay, srcKeyColour, srcKeyOverlay, srcSmallBox, srcSmallKey, visibleMaximizeRegion, visibleSmallBox, visibleSmallKey }: MysteryBoxToolbarExtensionLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 192, height: 137, ...layout }}>
            <Border
                variant="6"
                tintColor="#676767"
                layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 137 }}
            >
                <Border
                    variant="3"
                    tintColor="#201e19"
                    blend={0.8}
                    layout={{ position: 'absolute', left: 3, width: 186, top: 3, height: 130, justifyContent: 'center' }}
                >
                    <Region
                        backgroundColor="#676767"
                        layout={{ position: 'absolute', left: 0, width: 186, top: 0, height: 20 }}
                    />
                    <Region layout={{ position: 'absolute', left: 1, width: 150, top: 3, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('mysterybox.tracker.title')}
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 150 }}
                        />
                    </Region>
                    <Region layout={{ position: 'absolute', left: 6, width: 174, top: 27, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('mysterybox.tracker.description')}
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 174 }}
                        />
                    </Region>
                    <Region layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 89, top: 72, height: 39 }}>
                        <Region
                            name="box_region"
                            onPointerTap={onBoxRegion}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 0, width: 39, top: 0, height: 39 }}
                        >
                            <ThemeImage
                                src={layoutImage('mysterybox_tracker_border.png')}
                                layout={{ position: 'absolute', left: 0, width: 39, top: 0, height: 39 }}
                            />
                            <ThemeImage
                                name="box_colour"
                                src={srcBoxColour ?? layoutImage('mysterybox_box_base.png')}
                                tint="#ff0000"
                                layout={{ position: 'absolute', left: 0, width: 39, top: 0, height: 39 }}
                            />
                            <ThemeImage
                                name="box_overlay"
                                src={srcBoxOverlay ?? layoutImage('mysterybox_box_overlay.png')}
                                layout={{ position: 'absolute', left: 0, width: 39, top: 0, height: 39 }}
                            />
                        </Region>
                        <Region
                            name="key_region"
                            onPointerTap={onKeyRegion}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 50, width: 39, top: 0, height: 39 }}
                        >
                            <ThemeImage
                                src={layoutImage('mysterybox_tracker_border.png')}
                                layout={{ position: 'absolute', left: 0, width: 39, top: 0, height: 39 }}
                            />
                            <ThemeImage
                                name="key_colour"
                                src={srcKeyColour ?? layoutImage('mysterybox_key_base.png')}
                                tint="#ff0000"
                                layout={{ position: 'absolute', left: 0, width: 39, top: 0, height: 39 }}
                            />
                            <ThemeImage
                                name="key_overlay"
                                src={srcKeyOverlay ?? layoutImage('mysterybox_key_overlay.png')}
                                layout={{ position: 'absolute', left: 0, width: 39, top: 0, height: 39 }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="faq_link"
                        layout={{ position: 'absolute', width: 138, top: 112, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        onPointerTap={onFaqLink}
                        cursor="pointer"
                    >
                        <ThemeText
                            text={captionFaqLink ?? t('mysterybox.tracker.link')}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#00beff' }}
                        />
                    </Region>
                </Border>
                <Region
                    name="minimize_region"
                    onPointerTap={onMinimizeRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 168, width: 20, top: 2, height: 20 }}
                >
                    <ThemeImage
                        src={layoutImage('common_minimize_unetched.png')}
                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 19 }}
                    />
                </Region>
                {(visibleMaximizeRegion ?? false) && (
                    <Region
                        name="maximize_region"
                        onPointerTap={onMaximizeRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 168, width: 20, top: 2, height: 20 }}
                    >
                        <ThemeImage
                            src={layoutImage('common_maximize_unetched.png')}
                            layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 19 }}
                        />
                    </Region>
                )}
                {(visibleSmallBox ?? false) && (
                    <ThemeImage
                        name="small_box"
                        src={srcSmallBox ?? layoutImage('mysterybox_box_small.png')}
                        tint="#ff0000"
                        layout={{ position: 'absolute', left: 124, width: 19, top: 2, height: 20 }}
                    />
                )}
                {(visibleSmallKey ?? false) && (
                    <ThemeImage
                        name="small_key"
                        src={srcSmallKey ?? layoutImage('mysterybox_key_small.png')}
                        tint="#ff0000"
                        layout={{ position: 'absolute', left: 144, width: 20, top: 3, height: 19 }}
                    />
                )}
            </Border>
        </Region>
    );
};
