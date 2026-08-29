import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1214_roomtools_xml` (layout "roomtools", 192x32) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RoomtoolsLayoutProps {
    layout?: BoxLayout;
    onZoomRegion?: () => void;
    roominfoRegion?: RoomtoolsLayoutRoominfoRegionProps;
    srcIconZoomOff?: string;
    srcIconZoomOver?: string;
    visibleIconZoomOver?: boolean;
}

export const RoomtoolsLayout = ({ layout, onZoomRegion, roominfoRegion, srcIconZoomOff, srcIconZoomOver, visibleIconZoomOver }: RoomtoolsLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 192, height: 32, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 32 }}>
                <Region
                    name="zoom_region"
                    tooltip={t('toolbar.icon.tooltip.zoom')}
                    onPointerTap={onZoomRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 29, top: 2, height: 29 }}
                >
                    <Border
                        variant="6"
                        tintColor="#55534e"
                        layout={{ position: 'absolute', left: 0, width: 29, top: 0, height: 29 }}
                    >
                        <Border
                            variant="3"
                            tintColor="#201e19"
                            blend={0.8}
                            layout={{ position: 'absolute', left: 3, width: 23, top: 3, height: 22 }}
                        />
                        <ThemeImage
                            name="icon_zoom_off"
                            src={srcIconZoomOff ?? '${image.library.url}album3726/icon_zoom_off.png'}
                            layout={{ position: 'absolute', left: 1, width: 23, top: 0, height: 27 }}
                        />
                        {(visibleIconZoomOver ?? false) && (
                            <ThemeImage
                                name="icon_zoom_over"
                                src={srcIconZoomOver ?? '${image.library.url}album3726/icon_zoom_over.png'}
                                layout={{ position: 'absolute', left: 1, width: 23, top: 0, height: 27 }}
                            />
                        )}
                    </Border>
                </Region>
                <RoomtoolsLayoutRoominfoRegion {...roominfoRegion} />
            </Region>
        </Region>
    );
};

/** Row template `roominfo_text` of RoomtoolsLayout - pass real rows through its `items…` slot. */
export interface RoomtoolsLayoutRoominfoTextItemProps {
    captionRoominfoText?: string;
    layout?: BoxLayout;
}

export const RoomtoolsLayoutRoominfoTextItem = ({ captionRoominfoText, layout }: RoomtoolsLayoutRoominfoTextItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="roominfo_text"
            layout={{ width: 175, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionRoominfoText ?? t('navigator.roomsettings.roomname')}
                textStyle="text-style-il-regular-white"
                textOptions={{ fill: '#989898' }}
            />
        </Region>
    );
};

/** Row template `roominfo_name` of RoomtoolsLayout - pass real rows through its `items…` slot. */
export interface RoomtoolsLayoutRoominfoNameItemProps {
    captionRoominfoName?: string;
    layout?: BoxLayout;
}

export const RoomtoolsLayoutRoominfoNameItem = ({ captionRoominfoName, layout }: RoomtoolsLayoutRoominfoNameItemProps) => {
    return (
        <Region
            name="roominfo_name"
            layout={{ width: 12, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionRoominfoName ?? '...'}
                textStyle="text-style-il-regular-white"
            />
        </Region>
    );
};

/** Named region `roominfo_region` of RoomtoolsLayout - configured through the parent's `roominfoRegion` prop. */
export interface RoomtoolsLayoutRoominfoRegionProps {
    itemsList?: ReactNode;
    layout?: BoxLayout;
    onRoominfoRegion?: () => void;
    srcIconZoomOff?: string;
}

export const RoomtoolsLayoutRoominfoRegion = ({ itemsList, layout, onRoominfoRegion, srcIconZoomOff }: RoomtoolsLayoutRoominfoRegionProps) => {
    return (
        <Region
            name="roominfo_region"
            onPointerTap={onRoominfoRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 31, width: 161, top: 2, height: 29, ...layout }}
        >
            <Border
                variant="6"
                tintColor="#55534e"
                layout={{ position: 'absolute', left: 0, width: 161, top: 0, height: 29 }}
            >
                <Border
                    variant="3"
                    tintColor="#201e19"
                    blend={0.8}
                    layout={{ position: 'absolute', left: 3, width: 155, top: 3, height: 22 }}
                />
                <Region
                    name="list"
                    layout={{ position: 'absolute', left: 9, width: 114, top: 5, height: 17, flexDirection: 'row', gap: 2 }}
                >
                    {itemsList ?? (
                        <>
                            <RoomtoolsLayoutRoominfoTextItem />
                            <RoomtoolsLayoutRoominfoNameItem />
                        </>
                    )}
                </Region>
            </Border>
            <Border
                variant="6"
                tintColor="#55534e"
                layout={{ position: 'absolute', left: 132, width: 29, top: 0, height: 29 }}
            >
                <Border
                    variant="3"
                    tintColor="#201e19"
                    blend={0.8}
                    layout={{ position: 'absolute', left: 3, width: 23, top: 3, height: 22 }}
                />
                <ThemeImage
                    name="icon_zoom_off"
                    src={srcIconZoomOff ?? layoutImage('toolbar_room_icon_0.png')}
                    layout={{ position: 'absolute', left: 0, width: 29, top: 0, height: 29 }}
                />
            </Border>
        </Region>
    );
};
