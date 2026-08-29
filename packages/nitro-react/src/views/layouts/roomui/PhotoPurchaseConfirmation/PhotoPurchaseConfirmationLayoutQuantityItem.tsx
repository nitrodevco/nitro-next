import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `quantity` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutQuantityItemProps {
    captionQuantity?: string;
    layout?: BoxLayout;
    visibleQuantity?: boolean;
}

export const PhotoPurchaseConfirmationLayoutQuantityItem = ({ captionQuantity, layout, visibleQuantity }: PhotoPurchaseConfirmationLayoutQuantityItemProps) => {
    return (
        (visibleQuantity ?? false) && (
            <Region
                name="quantity"
                layout={{ width: 41, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
            >
                <ThemeText
                    text={captionQuantity ?? 'X 123'}
                    textStyle="text-style-u-bold"
                />
            </Region>
        )
    );
};
