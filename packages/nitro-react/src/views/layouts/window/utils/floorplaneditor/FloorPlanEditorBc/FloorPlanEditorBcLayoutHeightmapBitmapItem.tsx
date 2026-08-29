import { BoxLayout, ThemeImage } from '#base/theme';

/** Row template `heightmap_bitmap` of FloorPlanEditorBcLayout - pass real rows through its `items…` slot. */
export interface FloorPlanEditorBcLayoutHeightmapBitmapItemProps {
    layout?: BoxLayout;
    srcHeightmapBitmap?: string;
    tintHeightmapBitmap?: string;
}

export const FloorPlanEditorBcLayoutHeightmapBitmapItem = ({ layout, srcHeightmapBitmap, tintHeightmapBitmap }: FloorPlanEditorBcLayoutHeightmapBitmapItemProps) => {
    return (
        <ThemeImage
            name="heightmap_bitmap"
            src={srcHeightmapBitmap}
            tint={tintHeightmapBitmap}
            layout={{ width: 331, height: 304, flexShrink: 0, ...layout }}
        />
    );
};
