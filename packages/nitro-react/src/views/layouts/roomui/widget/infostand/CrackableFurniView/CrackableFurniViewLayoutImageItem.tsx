import { BoxLayout, ThemeImage } from '#base/theme';

/** Row template `image` of CrackableFurniViewLayout - pass real rows through its `items…` slot. */
export interface CrackableFurniViewLayoutImageItemProps {
    layout?: BoxLayout;
    srcImage?: string;
    tintImage?: string;
}

export const CrackableFurniViewLayoutImageItem = ({ layout, srcImage, tintImage }: CrackableFurniViewLayoutImageItemProps) => {
    return (
        <ThemeImage
            name="image"
            src={srcImage}
            tint={tintImage}
            layout={{ width: 140, height: 120, flexShrink: 0, ...layout }}
        />
    );
};
