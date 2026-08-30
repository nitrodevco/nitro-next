import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `wall_height_number` of FloorPlanEditorBcLayout - pass real rows through its `items…` slot. */
export interface FloorPlanEditorBcLayoutWallHeightNumberItemProps {
    captionWallHeightNumber?: string;
    layout?: BoxLayout;
}

export const FloorPlanEditorBcLayoutWallHeightNumberItem = ({ captionWallHeightNumber, layout }: FloorPlanEditorBcLayoutWallHeightNumberItemProps) => {
    return (
        <ThemeText
            text={captionWallHeightNumber ?? '1'}
            textStyle="text-style-u-bold"
            textOptions={{ fill: '#5f5f5f', align: 'center' }}
            name="wall_height_number"
            layout={{ width: 25, height: 17, flexShrink: 0, maxWidth: 25, ...layout }}
        />
    );
};
