import { BoxLayout, ThemeImage } from '#base/theme';

/** Row template `habbicon_template` of IlluminaChatBubbleLayout - pass real rows through its `items…` slot. */
export interface IlluminaChatBubbleLayoutHabbiconTemplateItemProps {
    layout?: BoxLayout;
    srcHabbiconBitmap?: string;
    tintHabbiconBitmap?: string;
    visibleHabbiconTemplate?: boolean;
}

export const IlluminaChatBubbleLayoutHabbiconTemplateItem = ({ layout, srcHabbiconBitmap, tintHabbiconBitmap, visibleHabbiconTemplate }: IlluminaChatBubbleLayoutHabbiconTemplateItemProps) => {
    return (
        (visibleHabbiconTemplate ?? false) && (
            <ThemeImage
                name="habbicon_template"
                src={srcHabbiconBitmap}
                tint={tintHabbiconBitmap}
                layout={{ width: 80, height: 80, flexShrink: 0, ...layout }}
            />
        )
    );
};
