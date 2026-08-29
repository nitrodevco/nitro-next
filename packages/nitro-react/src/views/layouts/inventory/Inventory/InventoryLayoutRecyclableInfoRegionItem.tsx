import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `recyclable_info_region` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutRecyclableInfoRegionItemProps {
    captionRecyclableNumber?: string;
    layout?: BoxLayout;
    onRecyclableInfoRegion?: () => void;
    srcRecyclableIcon?: string;
    visibleRecyclableIcon?: boolean;
    visibleRecyclableNumber?: boolean;
}

export const InventoryLayoutRecyclableInfoRegionItem = ({ captionRecyclableNumber, layout, onRecyclableInfoRegion, srcRecyclableIcon, visibleRecyclableIcon, visibleRecyclableNumber }: InventoryLayoutRecyclableInfoRegionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="recyclable_info_region"
            tooltip={t('inventory.furni.preview.recyclable_amount')}
            onPointerTap={onRecyclableInfoRegion}
            cursor="pointer"
            layout={{ width: 52, height: 16, flexShrink: 0, ...layout }}
        >
            {(visibleRecyclableNumber ?? true) && (
                <Region
                    name="recyclable_number"
                    layout={{ position: 'absolute', left: 18, width: 4, top: 1, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionRecyclableNumber ?? ''}
                </Region>
            )}
            {(visibleRecyclableIcon ?? true) && (
                <ThemeImage
                    name="recyclable_icon"
                    src={srcRecyclableIcon ?? layoutImage('inventory_furni_no_recycle_icon.png')}
                    layout={{ position: 'absolute', left: 0, width: 28, top: 0, height: 16 }}
                />
            )}
        </Region>
    );
};
