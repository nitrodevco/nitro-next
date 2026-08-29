import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `tradeable_info_region` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutTradeableInfoRegionItemProps {
    captionTradeableNumber?: string;
    layout?: BoxLayout;
    onTradeableInfoRegion?: () => void;
    srcTradeableIcon?: string;
    visibleTradeableIcon?: boolean;
    visibleTradeableNumber?: boolean;
}

export const InventoryLayoutTradeableInfoRegionItem = ({ captionTradeableNumber, layout, onTradeableInfoRegion, srcTradeableIcon, visibleTradeableIcon, visibleTradeableNumber }: InventoryLayoutTradeableInfoRegionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="tradeable_info_region"
            tooltip={t('inventory.furni.preview.tradeable_amount')}
            onPointerTap={onTradeableInfoRegion}
            cursor="pointer"
            layout={{ width: 52, height: 16, flexShrink: 0, ...layout }}
        >
            {(visibleTradeableNumber ?? true) && (
                <Region
                    name="tradeable_number"
                    layout={{ position: 'absolute', left: 33, width: 4, top: 1, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionTradeableNumber ?? ''}
                </Region>
            )}
            {(visibleTradeableIcon ?? true) && (
                <ThemeImage
                    name="tradeable_icon"
                    src={srcTradeableIcon ?? layoutImage('inventory_furni_no_trade_icon.png')}
                    layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 16 }}
                />
            )}
        </Region>
    );
};
