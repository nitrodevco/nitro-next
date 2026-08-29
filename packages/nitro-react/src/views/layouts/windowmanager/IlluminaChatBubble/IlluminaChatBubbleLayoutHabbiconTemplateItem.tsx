import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Row template `habbicon_template` of IlluminaChatBubbleLayout - pass real rows through its `items…` slot. */
export interface IlluminaChatBubbleLayoutHabbiconTemplateItemProps {
    layout?: BoxLayout;
    srcHabbiconBitmap?: string;
    tintHabbiconBitmap?: string;
    visibleHabbiconBitmap?: boolean;
    visibleHabbiconTemplate?: boolean;
}

export const IlluminaChatBubbleLayoutHabbiconTemplateItem = ({ layout, srcHabbiconBitmap, tintHabbiconBitmap, visibleHabbiconBitmap, visibleHabbiconTemplate }: IlluminaChatBubbleLayoutHabbiconTemplateItemProps) => {
    return (
        (visibleHabbiconTemplate ?? false) && (
            <Region
                name="habbicon_template"
                layout={{ width: 80, height: 80, flexShrink: 0, ...layout }}
            >
                {(visibleHabbiconBitmap ?? true) && (
                    <ThemeImage
                        name="habbicon_bitmap"
                        src={srcHabbiconBitmap}
                        tint={tintHabbiconBitmap}
                        layout={{ position: 'absolute', left: 0, width: 80, top: 0, height: 80 }}
                    />
                )}
            </Region>
        )
    );
};
