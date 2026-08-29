import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `861_mystery_box_toolbar_extension_xml` (layout "mystery_box_toolbar_extension", 192x137) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MysteryBoxToolbarExtensionLayoutProps {
    boxRegion?: MysteryBoxToolbarExtensionLayoutBoxRegionProps;
    captionFaqLink?: string;
    keyRegion?: MysteryBoxToolbarExtensionLayoutKeyRegionProps;
    layout?: BoxLayout;
    maximizeRegion?: MysteryBoxToolbarExtensionLayoutMaximizeRegionProps;
    minimizeRegion?: MysteryBoxToolbarExtensionLayoutMinimizeRegionProps;
    onFaqLink?: () => void;
    srcSmallBox?: string;
    srcSmallKey?: string;
}

export const MysteryBoxToolbarExtensionLayout = ({ boxRegion, captionFaqLink, keyRegion, layout, maximizeRegion, minimizeRegion, onFaqLink, srcSmallBox, srcSmallKey }: MysteryBoxToolbarExtensionLayoutProps) => {
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
                        <MysteryBoxToolbarExtensionLayoutBoxRegion {...boxRegion} />
                        <MysteryBoxToolbarExtensionLayoutKeyRegion {...keyRegion} />
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
                <MysteryBoxToolbarExtensionLayoutMinimizeRegion {...minimizeRegion} />
                <MysteryBoxToolbarExtensionLayoutMaximizeRegion {...maximizeRegion} />
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 124, width: 19, top: 2, height: 20 }}
                >
                    <ThemeImage
                        name="small_box"
                        src={srcSmallBox ?? layoutImage('mysterybox_box_small.png')}
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
                        src={srcSmallKey ?? layoutImage('mysterybox_key_small.png')}
                        tint="#ff0000"
                        layout={{ position: 'absolute', left: 144, width: 20, top: 3, height: 19 }}
                    />
                </Region>
            </Border>
        </Region>
    );
};

/** Named region `box_region` of MysteryBoxToolbarExtensionLayout - configured through the parent's `boxRegion` prop. */
export interface MysteryBoxToolbarExtensionLayoutBoxRegionProps {
    layout?: BoxLayout;
    onBoxRegion?: () => void;
    srcBoxColour?: string;
    srcBoxOverlay?: string;
    tags?: string[];
}

export const MysteryBoxToolbarExtensionLayoutBoxRegion = ({ layout, onBoxRegion, srcBoxColour, srcBoxOverlay, tags }: MysteryBoxToolbarExtensionLayoutBoxRegionProps) => {
    return (
        <Region
            name="box_region"
            tags={tags}
            onPointerTap={onBoxRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 39, top: 0, height: 39, ...layout }}
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
    );
};

/** Named region `key_region` of MysteryBoxToolbarExtensionLayout - configured through the parent's `keyRegion` prop. */
export interface MysteryBoxToolbarExtensionLayoutKeyRegionProps {
    layout?: BoxLayout;
    onKeyRegion?: () => void;
    srcKeyColour?: string;
    srcKeyOverlay?: string;
    tags?: string[];
}

export const MysteryBoxToolbarExtensionLayoutKeyRegion = ({ layout, onKeyRegion, srcKeyColour, srcKeyOverlay, tags }: MysteryBoxToolbarExtensionLayoutKeyRegionProps) => {
    return (
        <Region
            name="key_region"
            tags={tags}
            onPointerTap={onKeyRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 50, width: 39, top: 0, height: 39, ...layout }}
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
    );
};

/** Named region `minimize_region` of MysteryBoxToolbarExtensionLayout - configured through the parent's `minimizeRegion` prop. */
export interface MysteryBoxToolbarExtensionLayoutMinimizeRegionProps {
    layout?: BoxLayout;
    onMinimizeRegion?: () => void;
    tags?: string[];
}

export const MysteryBoxToolbarExtensionLayoutMinimizeRegion = ({ layout, onMinimizeRegion, tags }: MysteryBoxToolbarExtensionLayoutMinimizeRegionProps) => {
    return (
        <Region
            name="minimize_region"
            tags={tags}
            onPointerTap={onMinimizeRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 168, width: 20, top: 2, height: 20, ...layout }}
        >
            <ThemeImage
                src={layoutImage('common_minimize_unetched.png')}
                layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 19 }}
            />
        </Region>
    );
};

/** Named region `maximize_region` of MysteryBoxToolbarExtensionLayout - configured through the parent's `maximizeRegion` prop. */
export interface MysteryBoxToolbarExtensionLayoutMaximizeRegionProps {
    layout?: BoxLayout;
    onMaximizeRegion?: () => void;
    tags?: string[];
    visibleMaximizeRegion?: boolean;
}

export const MysteryBoxToolbarExtensionLayoutMaximizeRegion = ({ layout, onMaximizeRegion, tags, visibleMaximizeRegion }: MysteryBoxToolbarExtensionLayoutMaximizeRegionProps) => {
    return (
        <Region
            name="maximize_region"
            tags={tags}
            visible={visibleMaximizeRegion ?? false}
            onPointerTap={onMaximizeRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 168, width: 20, top: 2, height: 20, ...layout }}
        >
            <ThemeImage
                src={layoutImage('common_maximize_unetched.png')}
                layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 19 }}
            />
        </Region>
    );
};
