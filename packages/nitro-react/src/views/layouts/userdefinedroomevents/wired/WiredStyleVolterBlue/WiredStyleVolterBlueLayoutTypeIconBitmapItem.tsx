import { BoxLayout, ThemeImage } from '#base/theme';

/** Row template `type_icon_bitmap` of WiredStyleVolterBlueLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterBlueLayoutTypeIconBitmapItemProps {
    layout?: BoxLayout;
    srcTypeIconBitmap?: string;
    tintTypeIconBitmap?: string;
}

export const WiredStyleVolterBlueLayoutTypeIconBitmapItem = ({ layout, srcTypeIconBitmap, tintTypeIconBitmap }: WiredStyleVolterBlueLayoutTypeIconBitmapItemProps) => {
    return (
        <ThemeImage
            name="type_icon_bitmap"
            src={srcTypeIconBitmap}
            tint={tintTypeIconBitmap ?? '#000000'}
            layout={{ width: 9, height: 11, flexShrink: 0, minHeight: 11, maxHeight: 11, ...layout }}
        />
    );
};
