import { BoxLayout, ThemeImage } from '#base/theme';

/** Row template `type_icon_bitmap` of WiredStyleVolterLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterLayoutTypeIconBitmapItemProps {
    layout?: BoxLayout;
    srcTypeIconBitmap?: string;
    tintTypeIconBitmap?: string;
}

export const WiredStyleVolterLayoutTypeIconBitmapItem = ({ layout, srcTypeIconBitmap, tintTypeIconBitmap }: WiredStyleVolterLayoutTypeIconBitmapItemProps) => {
    return (
        <ThemeImage
            name="type_icon_bitmap"
            src={srcTypeIconBitmap}
            tint={tintTypeIconBitmap}
            layout={{ width: 9, height: 11, flexShrink: 0, minHeight: 11, maxHeight: 11, ...layout }}
        />
    );
};
