import { BoxLayout, ThemeImage } from '#base/theme';

/** Row template `type_icon_bitmap` of WiredStyleVolterGreenLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterGreenLayoutTypeIconBitmapItemProps {
    layout?: BoxLayout;
    srcTypeIconBitmap?: string;
    tintTypeIconBitmap?: string;
}

export const WiredStyleVolterGreenLayoutTypeIconBitmapItem = ({ layout, srcTypeIconBitmap, tintTypeIconBitmap }: WiredStyleVolterGreenLayoutTypeIconBitmapItemProps) => {
    return (
        <ThemeImage
            name="type_icon_bitmap"
            src={srcTypeIconBitmap}
            tint={tintTypeIconBitmap ?? '#000000'}
            layout={{ width: 9, height: 11, flexShrink: 0, minHeight: 11, maxHeight: 11, ...layout }}
        />
    );
};
