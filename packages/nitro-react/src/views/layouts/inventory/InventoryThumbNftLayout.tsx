import { Border, BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1398_inventory_thumb_nft_xml` (layout "thumbnail", 42x42) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface InventoryThumbNftLayoutProps {
    layout?: BoxLayout;
    numberContainer?: InventoryThumbNftLayoutNumberContainerProps;
    srcOutline?: string;
    srcUniqueItemBackgroundBitmap?: string;
}

export const InventoryThumbNftLayout = ({ layout, numberContainer, srcOutline, srcUniqueItemBackgroundBitmap }: InventoryThumbNftLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 42, height: 42, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 42, top: 0, height: 42 }}>
                <Border
                    variant="5"
                    tags={[ 'BG_COLOR' ]}
                    tintColor="#cacaca"
                    layout={{ position: 'absolute', left: 1, width: 40, top: 1, height: 40 }}
                >
                    <Region
                        visible={false}
                        layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                    >
                        <ThemeImage
                            name="unique_item_background_bitmap"
                            src={srcUniqueItemBackgroundBitmap ?? layoutImage('unique_item_label_1.png')}
                            layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                        />
                    </Region>
                    <WidgetSlot
                        widgetType="product_icon"
                        name="nft_icon"
                        layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40 }}
                    />
                    <InventoryThumbNftLayoutNumberContainer
                        tags={[ 'COUNT' ]}
                        {...numberContainer}
                    />
                </Border>
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 42, top: 0, height: 42 }}
                >
                    <ThemeImage
                        name="outline"
                        src={srcOutline ?? layoutImage('inventory_thumb_selected_outline.png')}
                        layout={{ position: 'absolute', left: 0, width: 42, top: 0, height: 42 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};

/** Named region `number_container` of InventoryThumbNftLayout - configured through the parent's `numberContainer` prop. */
export interface InventoryThumbNftLayoutNumberContainerProps {
    captionNumber?: string;
    layout?: BoxLayout;
    tags?: string[];
    visibleNumberContainer?: boolean;
}

export const InventoryThumbNftLayoutNumberContainer = ({ captionNumber, layout, tags, visibleNumberContainer }: InventoryThumbNftLayoutNumberContainerProps) => {
    return (
        <Region
            name="number_container"
            tags={tags}
            visible={visibleNumberContainer ?? false}
            backgroundColor="#2f6982"
            layout={{ position: 'absolute', left: 33, right: 1, top: 2, height: 15, ...layout }}
        >
            <Region
                name="number"
                tags={[ 'NUMBER', 'COUNT' ]}
                layout={{ position: 'absolute', left: 1, width: 4, top: 1, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionNumber ?? ''}
                    textOptions={{ fill: '#2f6982' }}
                />
            </Region>
        </Region>
    );
};
