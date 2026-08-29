import { BoxLayout, ThemeImage } from '#base/theme';

/** Row template `image` of JukeboxViewLayout - pass real rows through its `items…` slot. */
export interface JukeboxViewLayoutImageItemProps {
    layout?: BoxLayout;
    srcImage?: string;
    tintImage?: string;
}

export const JukeboxViewLayoutImageItem = ({ layout, srcImage, tintImage }: JukeboxViewLayoutImageItemProps) => {
    return (
        <ThemeImage
            name="image"
            src={srcImage}
            tint={tintImage}
            layout={{ width: 140, height: 120, flexShrink: 0, ...layout }}
        />
    );
};
