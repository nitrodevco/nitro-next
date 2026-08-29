import { BoxLayout, ThemeImage } from '#base/theme';

/** Row template `active_items_image` of InventoryEffectsLayout - pass real rows through its `items…` slot. */
export interface InventoryEffectsLayoutActiveItemsImageItemProps {
    layout?: BoxLayout;
    srcActiveItemsImage?: string;
    tintActiveItemsImage?: string;
}

export const InventoryEffectsLayoutActiveItemsImageItem = ({ layout, srcActiveItemsImage, tintActiveItemsImage }: InventoryEffectsLayoutActiveItemsImageItemProps) => {
    return (
        <ThemeImage
            name="active_items_image"
            src={srcActiveItemsImage}
            tint={tintActiveItemsImage}
            layout={{ width: 128, height: 157, flexShrink: 0, ...layout }}
        />
    );
};
