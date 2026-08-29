import { BoxLayout, ContainerButton, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `decrease_height` of FloorPlanEditorBcLayout - pass real rows through its `items…` slot. */
export interface FloorPlanEditorBcLayoutDecreaseHeightItemProps {
    layout?: BoxLayout;
    onDecreaseHeight?: () => void;
}

export const FloorPlanEditorBcLayoutDecreaseHeightItem = ({ layout, onDecreaseHeight }: FloorPlanEditorBcLayoutDecreaseHeightItemProps) => {
    return (
        <ContainerButton
            variant="3"
            name="decrease_height"
            onPointerTap={onDecreaseHeight}
            layout={{ width: 51, height: 42, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                src={layoutImage('floor_plan_editor_sink_tile.png')}
                layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 40, alignSelf: 'center', marginTop: 3, marginBottom: -3, height: 40 }}
            />
        </ContainerButton>
    );
};
