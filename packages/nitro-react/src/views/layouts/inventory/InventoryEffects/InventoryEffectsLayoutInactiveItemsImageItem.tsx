import { BoxLayout, ThemeImage } from '#base/theme';

/** Row template `inactive_items_image` of InventoryEffectsLayout - pass real rows through its `items…` slot. */
export interface InventoryEffectsLayoutInactiveItemsImageItemProps {
    layout?: BoxLayout;
    srcInactiveItemsImage?: string;
    tintInactiveItemsImage?: string;
}

export const InventoryEffectsLayoutInactiveItemsImageItem = ({ layout, srcInactiveItemsImage, tintInactiveItemsImage }: InventoryEffectsLayoutInactiveItemsImageItemProps) => {
    return (
        <ThemeImage
            name="inactive_items_image"
            src={srcInactiveItemsImage}
            tint={tintInactiveItemsImage}
            layout={{ width: 172, height: 157, flexShrink: 0, ...layout }}
        />
    );
};
