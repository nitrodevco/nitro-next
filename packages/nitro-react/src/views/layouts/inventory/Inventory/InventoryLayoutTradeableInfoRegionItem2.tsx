import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `tradeable_info_region` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutTradeableInfoRegionItem2Props {
    captionTradeableNumber?: string;
    layout?: BoxLayout;
    onTradeableInfoRegion?: () => void;
    srcTradeableIcon?: string;
    visibleTradeableIcon?: boolean;
    visibleTradeableInfoRegion?: boolean;
    visibleTradeableNumber?: boolean;
}

export const InventoryLayoutTradeableInfoRegionItem2 = ({ captionTradeableNumber, layout, onTradeableInfoRegion, srcTradeableIcon, visibleTradeableIcon, visibleTradeableInfoRegion, visibleTradeableNumber }: InventoryLayoutTradeableInfoRegionItem2Props) => {
    const t = useTranslation();

    return (
        (visibleTradeableInfoRegion ?? false) && (
            <Region
                name="tradeable_info_region"
                tooltip={t('inventory.furni.preview.tradeable_amount')}
                onPointerTap={onTradeableInfoRegion}
                cursor="pointer"
                layout={{ width: 52, height: 16, flexShrink: 0, ...layout }}
            >
                {(visibleTradeableNumber ?? true) && (
                    <ThemeText
                        text={captionTradeableNumber ?? ''}
                        name="tradeable_number"
                        layout={{ position: 'absolute', left: 33, width: 4, top: 1, height: 4 }}
                    />
                )}
                {(visibleTradeableIcon ?? true) && (
                    <ThemeImage
                        name="tradeable_icon"
                        src={srcTradeableIcon ?? layoutImage('inventory_furni_no_trade_icon.png')}
                        layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 16 }}
                    />
                )}
            </Region>
        )
    );
};
