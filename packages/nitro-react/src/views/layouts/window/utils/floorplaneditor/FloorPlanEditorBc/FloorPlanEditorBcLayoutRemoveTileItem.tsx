import { BoxLayout, ContainerButton, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `remove_tile` of FloorPlanEditorBcLayout - pass real rows through its `items…` slot. */
export interface FloorPlanEditorBcLayoutRemoveTileItemProps {
    layout?: BoxLayout;
    onRemoveTile?: () => void;
}

export const FloorPlanEditorBcLayoutRemoveTileItem = ({ layout, onRemoveTile }: FloorPlanEditorBcLayoutRemoveTileItemProps) => {
    return (
        <ContainerButton
            variant="3"
            name="remove_tile"
            onPointerTap={onRemoveTile}
            layout={{ width: 51, height: 42, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                src={layoutImage('floor_plan_editor_remove_tile.png')}
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 40, bottom: 1, height: 40 }}
            />
        </ContainerButton>
    );
};
