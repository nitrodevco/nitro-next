import { useTranslation } from '#base/context';
import { BoxLayout, Region } from '#base/theme';

/** Row template `inventory_link` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutInventoryLinkItemProps {
    captionInventoryLink?: string;
    layout?: BoxLayout;
    onInventoryLink?: () => void;
}

export const PhotoPurchaseConfirmationLayoutInventoryLinkItem = ({ captionInventoryLink, layout, onInventoryLink }: PhotoPurchaseConfirmationLayoutInventoryLinkItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="inventory_link"
            layout={{ width: 120, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
            onPointerTap={onInventoryLink}
            cursor="pointer"
        >
            {captionInventoryLink ?? t('camera.open.inventory')}
        </Region>
    );
};
