import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';

/** Row template `habbicon_item_template` of HabbiconselectorMenuLayout - pass real rows through its `items…` slot. */
export interface HabbiconselectorMenuLayoutHabbiconItemTemplateItemProps {
    layout?: BoxLayout;
    onHabbiconItemTemplate?: () => void;
    srcHabbiconIcon?: string;
    tintHabbiconIcon?: string;
    visibleHabbiconIcon?: boolean;
    visibleHabbiconItemBg?: boolean;
}

export const HabbiconselectorMenuLayoutHabbiconItemTemplateItem = ({ layout, onHabbiconItemTemplate, srcHabbiconIcon, tintHabbiconIcon, visibleHabbiconIcon, visibleHabbiconItemBg }: HabbiconselectorMenuLayoutHabbiconItemTemplateItemProps) => {
    return (
        <Region
            name="habbicon_item_template"
            onPointerTap={onHabbiconItemTemplate}
            cursor="pointer"
            layout={{ width: 42, height: 42, flexShrink: 0, ...layout }}
        >
            {(visibleHabbiconItemBg ?? true) && (
                <Border
                    variant="2"
                    name="habbicon_item_bg"
                    tintColor="#1f1f1f"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
            )}
            {(visibleHabbiconIcon ?? true) && (
                <ThemeImage
                    name="habbicon_icon"
                    src={srcHabbiconIcon}
                    tint={tintHabbiconIcon}
                    layout={{ position: 'absolute', left: 1, width: 40, top: 1, height: 40 }}
                />
            )}
        </Region>
    );
};
