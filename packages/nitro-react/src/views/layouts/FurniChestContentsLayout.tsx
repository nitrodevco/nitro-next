import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ScrollArea, TextInput, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `1167_furni_chest_contents_xml` (layout "furni_chest_contents", 458x264) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FurniChestContentsLayoutProps {
    layout?: BoxLayout;
    onViewLogsByFurniBtn?: () => void;
    onWithdrawBtn?: () => void;
}

export const FurniChestContentsLayout = ({ layout, onViewLogsByFurniBtn, onWithdrawBtn }: FurniChestContentsLayoutProps) => {
    const t = useTranslation();
    const [ searchInputValue, setSearchInputValue ] = useState('');
    const [ withdrawInputValue, setWithdrawInputValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 458, height: 264, ...layout }}>
            <Region
                name="furni_chest"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 458, top: 0, height: 264 }}
            >
                <Border
                    variant="2"
                    name="items_grid_border"
                    params={2192}
                    tintColor="#e3e3e3"
                    layout={{ position: 'absolute', left: 9, width: 255, top: 11, height: 242 }}
                >
                    <Region
                        visible={false}
                        layout={{ position: 'absolute', left: 5, width: 245, top: 4, height: 24, minHeight: 24, maxHeight: 24 }}
                    >
                        <Border
                            variant="105"
                            name="search_border"
                            params={144}
                            layout={{ width: '100%', height: '100%' }}
                        >
                            <Region
                                name="search_placeholder"
                                params={16}
                                layout={{ position: 'absolute', left: 4, width: 82, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('catalog.search')}
                                    textOptions={{ fill: '#666666' }}
                                />
                            </Region>
                            <TextInput
                                value={searchInputValue}
                                onChange={setSearchInputValue}
                                textColor="#666666"
                                layout={{ position: 'absolute', left: 4, width: 216, top: 3, height: 18, minHeight: 18, maxHeight: 18 }}
                            />
                            <Region
                                name="clear_search_button"
                                params={81}
                                layout={{ position: 'absolute', left: 222, width: 20, top: 2, height: 20 }}
                            >
                                <ThemeImage
                                    params={16}
                                    src={layoutImage('icons_close.png')}
                                    layout={{ position: 'absolute', left: 4, width: 11, top: 4, height: 12 }}
                                />
                            </Region>
                        </Border>
                    </Region>
                    <Region
                        name="no_items_text"
                        params={3935440}
                        layout={{ position: 'absolute', left: 73, width: 108, top: 113, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={t('wiredchests.furni_chest.no_items')} />
                    </Region>
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 5, width: 245, top: 5, height: 232 }}
                    >
                        <Region
                            name="grid_items"
                            params={2192}
                            layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 3, width: '100%' }}
                        >
                            <Region
                                name="furni_template"
                                params={17}
                                layout={{ width: 42, height: 42, flexShrink: 0 }}
                            >
                                <Border
                                    variant="5"
                                    name="border"
                                    params={16}
                                    tintColor="#cbcbcb"
                                    layout={{ position: 'absolute', left: 1, width: 40, top: 1, height: 40 }}
                                >
                                    <Region
                                        visible={false}
                                        layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                                    >
                                        <ThemeImage
                                            name="unique_item_background_bitmap"
                                            params={16}
                                            src={layoutImage('unique_item_label_1.png')}
                                            layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                                        />
                                    </Region>
                                    <WidgetSlot
                                        widgetType="product_icon"
                                        name="furni_icon"
                                        params={16}
                                        layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40 }}
                                    />
                                    <Region
                                        name="number_container"
                                        params={278672}
                                        visible={false}
                                        backgroundColor="#2f6982"
                                        layout={{ position: 'absolute', left: 27, width: 13, top: 2, height: 16 }}
                                    >
                                        <Region
                                            name="number_container_inner_border"
                                            params={4194320}
                                            backgroundColor="#ffffff"
                                            layout={{ position: 'absolute', left: 1, width: 11, top: 1, height: 14 }}
                                        >
                                            <Region
                                                name="furni_quantity"
                                                params={4194320}
                                                layout={{ position: 'absolute', left: 1, width: 10, top: 1, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                            >
                                                <ThemeText
                                                    text="0"
                                                    textStyle="text-style-regular"
                                                    textOptions={{ fill: '#2f6982' }}
                                                />
                                            </Region>
                                        </Region>
                                    </Region>
                                    <WidgetSlot
                                        widgetType="limited_item_overlay_grid"
                                        name="unique_item_overlay_container"
                                        params={16}
                                        visible={false}
                                        layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                                    />
                                    <WidgetSlot
                                        widgetType="rarity_item_overlay_grid"
                                        name="rarity_item_overlay_container"
                                        params={16}
                                        visible={false}
                                        layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                                    />
                                </Border>
                                <ThemeImage
                                    name="outline_focus"
                                    params={16}
                                    src={layoutImage('inventory_thumb_selected_outline.png')}
                                    layout={{ position: 'absolute', left: 0, width: 42, top: 0, height: 42 }}
                                />
                            </Region>
                        </Region>
                    </ScrollArea>
                </Border>
                <Region
                    name="right_panel"
                    params={2128}
                    layout={{ position: 'absolute', left: 274, width: 175, top: 11, height: 242 }}
                >
                    <Border
                        variant="2"
                        params={2192}
                        tintColor="#d8d8d8"
                        layout={{ position: 'absolute', left: 0, width: 175, top: 0, height: 211 }}
                    >
                        <Region
                            name="furni_name"
                            tags={[ 'furni_name' ]}
                            params={786576}
                            layout={{ position: 'absolute', left: 5, width: 190, top: 5, height: 17, minWidth: 190, maxWidth: 190, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="furni_name"
                                textOptions={{ wordWrap: true, wordWrapWidth: 190 }}
                            />
                        </Region>
                        <Region
                            name="stretching_preview_image_container"
                            params={2192}
                            layout={{ position: 'absolute', left: 0, width: 175, top: 26, height: 185 }}
                        >
                            <WidgetSlot
                                widgetType="product_image"
                                name="preview_image"
                                params={2192}
                                layout={{ position: 'absolute', left: 2, width: 170, top: 9, height: 167 }}
                            />
                        </Region>
                        <Region
                            visible={false}
                            layout={{ position: 'absolute', left: 0, width: 175, top: 10, height: 201 }}
                        >
                            <ThemeImage
                                name="placeholder_preview_image"
                                params={2192}
                                src={layoutImage('wired_chests_images_classic_furni_chest_empty.png')}
                                layout={{ position: 'absolute', left: 0, width: 175, top: 10, height: 201 }}
                            />
                        </Region>
                    </Border>
                    <Region
                        name="options"
                        params={1168}
                        layout={{ position: 'absolute', left: 0, width: 175, top: 211, height: 62 }}
                    >
                        <Region
                            name="withdraw_cont"
                            params={409680}
                            layout={{ position: 'absolute', left: 62, width: 113, top: 9, height: 28, flexDirection: 'row', gap: 10 }}
                        >
                            <TextInput
                                value={withdrawInputValue}
                                onChange={setWithdrawInputValue}
                                layout={{ width: 30, height: 19, flexShrink: 0, minWidth: 30, maxWidth: 30 }}
                            />
                            <Button
                                variant="3"
                                name="withdraw_btn"
                                params={393233}
                                onPointerTap={onWithdrawBtn}
                                layout={{ width: 73, height: 22, flexShrink: 0, minWidth: 60 }}
                            >
                                {t('wiredchests.withdraw')}
                            </Button>
                        </Region>
                        <Region
                            visible={false}
                            layout={{ position: 'absolute', left: 102, width: 73, top: 37, height: 22, minWidth: 60 }}
                        >
                            <Button
                                variant="3"
                                name="view_logs_by_furni_btn"
                                params={393297}
                                onPointerTap={onViewLogsByFurniBtn}
                                layout={{ width: '100%', height: '100%' }}
                            >
                                {t('wiredchests.view_logs')}
                            </Button>
                        </Region>
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};
