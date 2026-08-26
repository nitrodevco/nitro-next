import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `2534_unique_item_overlay_supply_xml` (layout "unique_item_overlay_catalog", 200x40) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UniqueItemOverlaySupplyLayoutProps {
    layout?: BoxLayout;
}

export const UniqueItemOverlaySupplyLayout = ({ layout }: UniqueItemOverlaySupplyLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 200, height: 40, ...layout }}>
            <Region
                name="limitedItemWidget"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 40 }}
            >
                <ThemeImage
                    name="plaque"
                    params={16}
                    src={layoutImage('unique_item_large_background_wide.png')}
                    layout={{ position: 'absolute', left: 0, width: 170, top: 0, height: 29 }}
                />
                <Region
                    name="items_left"
                    params={16}
                    layout={{ position: 'absolute', left: 40, width: 44, top: 2, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('unique.items.left')}
                        textStyle="text-style-regular"
                    />
                </Region>
                <Region
                    name="items_left_count"
                    params={16}
                    layout={{ position: 'absolute', left: 108, width: 35, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                >
                    <ThemeText
                        text="1234"
                        textStyle="text-style-regular"
                        textOptions={{ align: 'right' }}
                    />
                </Region>
                <Region
                    name="items_total"
                    params={16}
                    layout={{ position: 'absolute', left: 40, width: 58, top: 15, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('unique.items.number.sold')}
                        textStyle="text-style-regular"
                    />
                </Region>
                <Region
                    name="items_total_count"
                    params={16}
                    layout={{ position: 'absolute', left: 120, width: 23, top: 15, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                >
                    <ThemeText
                        text="9999"
                        textStyle="text-style-regular"
                        textOptions={{ align: 'right' }}
                    />
                </Region>
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 40, top: 1, height: 36 }}
                >
                    <ThemeImage
                        name="unique_item_sold_out_bitmap"
                        params={16}
                        src={layoutImage('unique_item_sold_out_label.png')}
                        layout={{ position: 'absolute', left: 0, width: 40, top: 1, height: 36 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
