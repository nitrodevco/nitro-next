import { BoxLayout, ThemeImage } from '#base/theme';

/** Row template `image` of SongdiskViewLayout - pass real rows through its `items…` slot. */
export interface SongdiskViewLayoutImageItemProps {
    layout?: BoxLayout;
    srcImage?: string;
    tintImage?: string;
}

export const SongdiskViewLayoutImageItem = ({ layout, srcImage, tintImage }: SongdiskViewLayoutImageItemProps) => {
    return (
        <ThemeImage
            name="image"
            src={srcImage}
            tint={tintImage}
            layout={{ width: 140, height: 120, flexShrink: 0, ...layout }}
        />
    );
};
