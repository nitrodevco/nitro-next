import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';

/** Row template `habbicon_item_template` of MessengerHabbiconPickerLayout - pass real rows through its `items…` slot. */
export interface MessengerHabbiconPickerLayoutHabbiconItemTemplateItemProps {
    layout?: BoxLayout;
    onHabbiconItemTemplate?: () => void;
    srcHabbiconIcon?: string;
    tintHabbiconIcon?: string;
    visibleHabbiconIcon?: boolean;
    visibleHabbiconItemBg?: boolean;
}

export const MessengerHabbiconPickerLayoutHabbiconItemTemplateItem = ({ layout, onHabbiconItemTemplate, srcHabbiconIcon, tintHabbiconIcon, visibleHabbiconIcon, visibleHabbiconItemBg }: MessengerHabbiconPickerLayoutHabbiconItemTemplateItemProps) => {
    return (
        <Region
            name="habbicon_item_template"
            onPointerTap={onHabbiconItemTemplate}
            cursor="pointer"
            layout={{ width: 44, height: 45, flexShrink: 0, ...layout }}
        >
            {(visibleHabbiconItemBg ?? true) && (
                <Border
                    variant="104"
                    name="habbicon_item_bg"
                    tintColor="#dddddd"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
            )}
            {(visibleHabbiconIcon ?? true) && (
                <ThemeImage
                    name="habbicon_icon"
                    src={srcHabbiconIcon}
                    tint={tintHabbiconIcon}
                    layout={{ position: 'absolute', left: 2, width: 40, top: 2, height: 40 }}
                />
            )}
        </Region>
    );
};
