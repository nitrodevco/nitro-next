import { BoxLayout, ContainerButton, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `add_tile` of FloorPlanEditorBcLayout - pass real rows through its `items…` slot. */
export interface FloorPlanEditorBcLayoutAddTileItemProps {
    layout?: BoxLayout;
    onAddTile?: () => void;
}

export const FloorPlanEditorBcLayoutAddTileItem = ({ layout, onAddTile }: FloorPlanEditorBcLayoutAddTileItemProps) => {
    return (
        <ContainerButton
            variant="3"
            name="add_tile"
            onPointerTap={onAddTile}
            layout={{ width: 51, height: 42, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                src={layoutImage('floor_plan_editor_add_tile.png')}
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 40, alignSelf: 'center', marginTop: -1, marginBottom: 1, height: 40 }}
            />
        </ContainerButton>
    );
};
