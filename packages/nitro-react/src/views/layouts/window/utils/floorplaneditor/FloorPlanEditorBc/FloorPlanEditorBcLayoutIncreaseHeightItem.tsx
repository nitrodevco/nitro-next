import { BoxLayout, ContainerButton, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `increase_height` of FloorPlanEditorBcLayout - pass real rows through its `items…` slot. */
export interface FloorPlanEditorBcLayoutIncreaseHeightItemProps {
    layout?: BoxLayout;
    onIncreaseHeight?: () => void;
}

export const FloorPlanEditorBcLayoutIncreaseHeightItem = ({ layout, onIncreaseHeight }: FloorPlanEditorBcLayoutIncreaseHeightItemProps) => {
    return (
        <ContainerButton
            variant="3"
            name="increase_height"
            onPointerTap={onIncreaseHeight}
            layout={{ width: 51, height: 42, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                src={layoutImage('floor_plan_editor_raise_tile.png')}
                layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 40, alignSelf: 'center', height: 40 }}
            />
        </ContainerButton>
    );
};
