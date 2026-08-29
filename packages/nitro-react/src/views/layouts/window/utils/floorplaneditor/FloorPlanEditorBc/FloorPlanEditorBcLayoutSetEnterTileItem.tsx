import { BoxLayout, ContainerButton, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `set_enter_tile` of FloorPlanEditorBcLayout - pass real rows through its `items…` slot. */
export interface FloorPlanEditorBcLayoutSetEnterTileItemProps {
    layout?: BoxLayout;
    onSetEnterTile?: () => void;
}

export const FloorPlanEditorBcLayoutSetEnterTileItem = ({ layout, onSetEnterTile }: FloorPlanEditorBcLayoutSetEnterTileItemProps) => {
    return (
        <ContainerButton
            variant="3"
            name="set_enter_tile"
            onPointerTap={onSetEnterTile}
            layout={{ width: 51, height: 42, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                src={layoutImage('floor_plan_editor_enter_tile.png')}
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 40, alignSelf: 'center', height: 40 }}
            />
        </ContainerButton>
    );
};
