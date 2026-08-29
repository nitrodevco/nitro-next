import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';

import { RoomtoolsLayoutRoominfoRegion, RoomtoolsLayoutRoominfoRegionProps } from './RoomtoolsLayoutRoominfoRegion';

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
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <Region
                    name="zoom_region"
                    tooltip={t('toolbar.icon.tooltip.zoom')}
                    onPointerTap={onZoomRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 29, top: 2, bottom: 1 }}
                >
                    <Border
                        variant="6"
                        tintColor="#55534e"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    >
                        <Border
                            variant="3"
                            tintColor="#201e19"
                            blend={0.8}
                            layout={{ position: 'absolute', left: 3, right: 3, top: 3, bottom: 4 }}
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
