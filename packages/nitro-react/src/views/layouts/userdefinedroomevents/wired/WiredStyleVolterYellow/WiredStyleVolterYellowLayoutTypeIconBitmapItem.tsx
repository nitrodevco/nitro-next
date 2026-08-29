import { BoxLayout, ThemeImage } from '#base/theme';

/** Row template `type_icon_bitmap` of WiredStyleVolterYellowLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterYellowLayoutTypeIconBitmapItemProps {
    layout?: BoxLayout;
    srcTypeIconBitmap?: string;
    tintTypeIconBitmap?: string;
}

export const WiredStyleVolterYellowLayoutTypeIconBitmapItem = ({ layout, srcTypeIconBitmap, tintTypeIconBitmap }: WiredStyleVolterYellowLayoutTypeIconBitmapItemProps) => {
    return (
        <ThemeImage
            name="type_icon_bitmap"
            src={srcTypeIconBitmap}
            tint={tintTypeIconBitmap ?? '#000000'}
            layout={{ width: 9, height: 11, flexShrink: 0, minHeight: 11, maxHeight: 11, ...layout }}
        />
    );
};
