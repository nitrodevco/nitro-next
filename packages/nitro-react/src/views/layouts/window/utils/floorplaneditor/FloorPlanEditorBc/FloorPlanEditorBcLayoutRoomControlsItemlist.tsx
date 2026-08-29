import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Dropmenu, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { FloorPlanEditorBcLayoutEnterdirectionContainerItem } from './FloorPlanEditorBcLayoutEnterdirectionContainerItem';

/** Named region `room_controls_itemlist` of FloorPlanEditorBcLayout - configured through the parent's `roomControlsItemlist` prop. */
export interface FloorPlanEditorBcLayoutRoomControlsItemlistProps {
    itemsRoomControlsItemlist?: ReactNode;
    layout?: BoxLayout;
    onFloorThicknessDrop?: () => void;
    onWallThicknessDrop?: () => void;
}

export const FloorPlanEditorBcLayoutRoomControlsItemlist = ({ itemsRoomControlsItemlist, layout, onFloorThicknessDrop, onWallThicknessDrop }: FloorPlanEditorBcLayoutRoomControlsItemlistProps) => {
    const t = useTranslation();

    return (
        <Region
            name="room_controls_itemlist"
            layout={{ position: 'absolute', left: 3, width: 271, top: 3, height: 98, flexDirection: 'row', ...layout }}
        >
            {itemsRoomControlsItemlist ?? (
                <FloorPlanEditorBcLayoutEnterdirectionContainerItem />
            )}
            <ThemeImage
                src={layoutImage('landing_view_reception_horizontal.png')}
                layout={{ width: 3, height: 97, flexShrink: 0 }}
            />
            <Region layout={{ width: 128, height: 99, flexShrink: 0 }}>
                <Region layout={{ position: 'absolute', left: 14, width: 110, top: 4, height: 17, maxWidth: 110, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    {t('floor.plan.editor.room.options')}
                </Region>
                <Dropmenu
                    variant="3"
                    name="wall_thickness_drop"
                    onPointerTap={onWallThicknessDrop}
                    layout={{ position: 'absolute', left: 14, width: 114, top: 30, height: 25 }}
                />
                <Dropmenu
                    variant="3"
                    name="floor_thickness_drop"
                    onPointerTap={onFloorThicknessDrop}
                    layout={{ position: 'absolute', left: 14, width: 114, top: 61, height: 25 }}
                />
            </Region>
        </Region>
    );
};
