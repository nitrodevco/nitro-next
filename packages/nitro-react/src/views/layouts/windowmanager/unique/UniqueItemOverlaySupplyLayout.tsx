import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2534_unique_item_overlay_supply_xml` (layout "unique_item_overlay_catalog", 200x40) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UniqueItemOverlaySupplyLayoutProps {
    captionItemsLeft?: string;
    captionItemsLeftCount?: string;
    captionItemsTotal?: string;
    captionItemsTotalCount?: string;
    layout?: BoxLayout;
    srcPlaque?: string;
    srcUniqueItemSoldOutBitmap?: string;
    visibleUniqueItemSoldOutBitmap?: boolean;
}

export const UniqueItemOverlaySupplyLayout = ({ captionItemsLeft, captionItemsLeftCount, captionItemsTotal, captionItemsTotalCount, layout, srcPlaque, srcUniqueItemSoldOutBitmap, visibleUniqueItemSoldOutBitmap }: UniqueItemOverlaySupplyLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 200, height: 40, ...layout }}>
            <Region
                name="limitedItemWidget"
                layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 40 }}
            >
                <ThemeImage
                    name="plaque"
                    src={srcPlaque ?? layoutImage('unique_item_large_background_wide.png')}
                    layout={{ position: 'absolute', left: 0, width: 170, top: 0, height: 29 }}
                />
                <Region
                    name="items_left"
                    layout={{ position: 'absolute', left: 40, width: 44, top: 2, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionItemsLeft ?? t('unique.items.left')}
                        textStyle="text-style-regular"
                    />
                </Region>
                <Region
                    name="items_left_count"
                    layout={{ position: 'absolute', left: 108, width: 35, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                >
                    <ThemeText
                        text={captionItemsLeftCount ?? '1234'}
                        textStyle="text-style-regular"
                        textOptions={{ align: 'right' }}
                    />
                </Region>
                <Region
                    name="items_total"
                    layout={{ position: 'absolute', left: 40, width: 58, top: 15, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionItemsTotal ?? t('unique.items.number.sold')}
                        textStyle="text-style-regular"
                    />
                </Region>
                <Region
                    name="items_total_count"
                    layout={{ position: 'absolute', left: 120, width: 23, top: 15, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                >
                    <ThemeText
                        text={captionItemsTotalCount ?? '9999'}
                        textStyle="text-style-regular"
                        textOptions={{ align: 'right' }}
                    />
                </Region>
                {(visibleUniqueItemSoldOutBitmap ?? false) && (
                    <ThemeImage
                        name="unique_item_sold_out_bitmap"
                        src={srcUniqueItemSoldOutBitmap ?? layoutImage('unique_item_sold_out_label.png')}
                        layout={{ position: 'absolute', left: 0, width: 40, top: 1, height: 36 }}
                    />
                )}
            </Region>
        </Region>
    );
};
