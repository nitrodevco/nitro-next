import { BoxLayout, ThemeImage } from '#base/theme';

/** Row template `wired_icon` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutWiredIconItemProps {
    layout?: BoxLayout;
    srcWiredIcon?: string;
}

export const FurniViewLayoutWiredIconItem = ({ layout, srcWiredIcon }: FurniViewLayoutWiredIconItemProps) => {
    return (
        <ThemeImage
            name="wired_icon"
            src={srcWiredIcon ?? '${image.library.url}catalogue/icon_80.png'}
            layout={{ width: 15, height: 15, flexShrink: 0, ...layout }}
        />
    );
};
