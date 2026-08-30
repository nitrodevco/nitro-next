import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `wall_height_text` of FloorPlanEditorBcLayout - pass real rows through its `items…` slot. */
export interface FloorPlanEditorBcLayoutWallHeightTextItemProps {
    captionWallHeightText?: string;
    layout?: BoxLayout;
}

export const FloorPlanEditorBcLayoutWallHeightTextItem = ({ captionWallHeightText, layout }: FloorPlanEditorBcLayoutWallHeightTextItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionWallHeightText ?? t('floor.editor.wall.height')}
            name="wall_height_text"
            layout={{ width: 105, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
