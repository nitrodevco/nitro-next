import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { RoomtoolsLayoutRoominfoNameItem } from './RoomtoolsLayoutRoominfoNameItem';
import { RoomtoolsLayoutRoominfoTextItem } from './RoomtoolsLayoutRoominfoTextItem';

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
            layout={{ position: 'absolute', right: 0, width: 161, top: 2, bottom: 1, ...layout }}
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
                <Region
                    name="list"
                    layout={{ position: 'absolute', left: 9, width: 114, top: 5, bottom: 7, flexDirection: 'row', gap: 2 }}
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
                layout={{ position: 'absolute', right: 0, width: 29, top: 0, bottom: 0 }}
            >
                <Border
                    variant="3"
                    tintColor="#201e19"
                    blend={0.8}
                    layout={{ position: 'absolute', left: 3, right: 3, top: 3, bottom: 4 }}
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
