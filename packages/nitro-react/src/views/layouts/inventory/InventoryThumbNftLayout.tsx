import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1398_inventory_thumb_nft_xml` (layout "thumbnail", 42x42) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface InventoryThumbNftLayoutProps {
    captionNumber?: string;
    layout?: BoxLayout;
    nftIcon?: ReactNode;
    srcOutline?: string;
    srcUniqueItemBackgroundBitmap?: string;
    visibleNumberContainer?: boolean;
    visibleOutline?: boolean;
    visibleUniqueItemBackgroundBitmap?: boolean;
}

export const InventoryThumbNftLayout = ({ captionNumber, layout, nftIcon, srcOutline, srcUniqueItemBackgroundBitmap, visibleNumberContainer, visibleOutline, visibleUniqueItemBackgroundBitmap }: InventoryThumbNftLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 42, height: 42, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <Border
                    variant="5"
                    tintColor="#cacaca"
                    layout={{ position: 'absolute', left: 1, width: 40, top: 1, height: 40 }}
                >
                    {(visibleUniqueItemBackgroundBitmap ?? false) && (
                        <ThemeImage
                            name="unique_item_background_bitmap"
                            src={srcUniqueItemBackgroundBitmap ?? layoutImage('unique_item_label_1.png')}
                            layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                        />
                    )}
                    <WidgetSlot
                        widgetType="product_icon"
                        name="nft_icon"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    >
                        {nftIcon}
                    </WidgetSlot>
                    {(visibleNumberContainer ?? false) && (
                        <Region
                            name="number_container"
                            backgroundColor="#2f6982"
                            layout={{ position: 'absolute', left: 33, right: 1, top: 2, height: 15 }}
                        >
                            <ThemeText
                                text={captionNumber ?? ''}
                                textOptions={{ fill: '#2f6982' }}
                                name="number"
                                layout={{ position: 'absolute', left: 1, width: 4, top: 1, height: 4 }}
                            />
                        </Region>
                    )}
                </Border>
                {(visibleOutline ?? false) && (
                    <ThemeImage
                        name="outline"
                        src={srcOutline ?? layoutImage('inventory_thumb_selected_outline.png')}
                        layout={{ position: 'absolute', left: 0, width: 42, top: 0, height: 42 }}
                    />
                )}
            </Region>
        </Region>
    );
};
