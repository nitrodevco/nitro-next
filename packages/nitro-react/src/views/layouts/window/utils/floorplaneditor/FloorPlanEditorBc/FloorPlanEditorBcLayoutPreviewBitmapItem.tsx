import { BoxLayout, ThemeImage } from '#base/theme';

/** Row template `preview_bitmap` of FloorPlanEditorBcLayout - pass real rows through its `items…` slot. */
export interface FloorPlanEditorBcLayoutPreviewBitmapItemProps {
    layout?: BoxLayout;
    srcPreviewBitmap?: string;
    tintPreviewBitmap?: string;
}

export const FloorPlanEditorBcLayoutPreviewBitmapItem = ({ layout, srcPreviewBitmap, tintPreviewBitmap }: FloorPlanEditorBcLayoutPreviewBitmapItemProps) => {
    return (
        <ThemeImage
            name="preview_bitmap"
            src={srcPreviewBitmap}
            tint={tintPreviewBitmap}
            layout={{ width: 273, height: 300, flexShrink: 0, ...layout }}
        />
    );
};
