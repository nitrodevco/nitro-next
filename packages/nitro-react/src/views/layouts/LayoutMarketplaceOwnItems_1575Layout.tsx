import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Dropmenu, Region, ScrollArea, TextInput, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `1575_layout_marketplace_own_items_xml` (layout "ctlg_marketplace", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutMarketplaceOwnItems_1575LayoutProps {
    layout?: BoxLayout;
    onMarkAsSeenButton?: () => void;
    onOfferCategoryDropmenu?: () => void;
    onPickButton?: () => void;
    onRecallAllButton?: () => void;
    onSearchButton?: () => void;
}

export const LayoutMarketplaceOwnItems_1575Layout = ({ layout, onMarkAsSeenButton, onOfferCategoryDropmenu, onPickButton, onRecallAllButton, onSearchButton }: LayoutMarketplaceOwnItems_1575LayoutProps) => {
    const t = useTranslation();
    const [ searchInputValue, setSearchInputValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_marketplace_own_items"
                params={2064}
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460 }}
            >
                <Region
                    name="marketPlaceOwnItemsWidget"
                    tags={[ 'EMBEDDED' ]}
                    params={2064}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460 }}
                >
                    <Region
                        name="redeem_info"
                        params={16}
                        layout={{ position: 'absolute', left: 10, width: 340, top: 0, height: 57, minWidth: 340, maxWidth: 340, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('catalog.marketplace.own_info')}
                            textStyle="text-style-u-italic"
                            textOptions={{ wordWrap: true, wordWrapWidth: 340 }}
                        />
                    </Region>
                    <Region
                        name="search_container"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 347, top: 39, height: 26, flexDirection: 'row', gap: 10 }}
                    >
                        <Region
                            name="search_label"
                            params={16}
                            visible={false}
                            layout={{ width: 70, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={t('generic.search')} />
                        </Region>
                        <Dropmenu
                            variant="3"
                            name="offer_category_dropmenu"
                            params={17}
                            onPointerTap={onOfferCategoryDropmenu}
                            layout={{ width: 90, height: 25, flexShrink: 0 }}
                        >
                            OPEN
                        </Dropmenu>
                        <Border
                            variant="105"
                            name="search_input_border"
                            params={16}
                            layout={{ width: 160, height: 26, flexShrink: 0 }}
                        >
                            <TextInput
                                value={searchInputValue}
                                onChange={setSearchInputValue}
                                maxLength={40}
                                layout={{ position: 'absolute', left: 6, width: 151, top: 3, height: 19, minWidth: 151, maxWidth: 151 }}
                            />
                            <Region
                                name="search_placeholder"
                                params={16}
                                layout={{ position: 'absolute', left: 6, width: 82, top: 3, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('catalog.search')}
                                    textOptions={{ fill: '#666666' }}
                                />
                            </Region>
                            <Region
                                name="cancel_search_btn"
                                params={17}
                                visible={false}
                                layout={{ position: 'absolute', left: 137, width: 19, top: 3, height: 19 }}
                            >
                                <ThemeImage
                                    params={16}
                                    src={layoutImage('icons_close.png')}
                                    layout={{ position: 'absolute', left: 5, width: 11, top: 4, height: 12 }}
                                />
                            </Region>
                        </Border>
                        <Button
                            variant="3"
                            name="search_button"
                            params={393233}
                            onPointerTap={onSearchButton}
                            textStyle="text-style-button-shiny-regular"
                            layout={{ width: 69, height: 25, flexShrink: 0, minWidth: 69, maxWidth: 69, minHeight: 25, maxHeight: 25 }}
                        >
                            {t('generic.search')}
                        </Button>
                    </Region>
                    <Region
                        name="status_text"
                        params={1040}
                        layout={{ position: 'absolute', left: 0, width: 62, top: 440, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('lorem.title')}
                            textStyle="text-style-u-small"
                        />
                    </Region>
                    <Button
                        variant="3"
                        name="recall_all_button"
                        params={394257}
                        tintColor="#e33934"
                        onPointerTap={onRecallAllButton}
                        textStyle="text-style-il-regular-white"
                        layout={{ position: 'absolute', left: 275, width: 64, top: 434, height: 24 }}
                    >
                        {t('shop.marketplace.recall.all.button')}
                    </Button>
                    <Region
                        visible={false}
                        layout={{ position: 'absolute', left: 249, width: 90, top: 434, height: 24 }}
                    >
                        <Button
                            variant="3"
                            name="mark_as_seen_button"
                            params={394257}
                            onPointerTap={onMarkAsSeenButton}
                            textStyle="text-style-button-shiny-regular"
                            layout={{ width: '100%', height: '100%' }}
                        >
                            {t('shop.marketplace.mark.as.seen.button')}
                        </Button>
                    </Region>
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 0, width: 360, top: 72, height: 352 }}
                    >
                        <Region
                            name="item_list"
                            tags={[ 'own_items_grid' ]}
                            params={2064}
                            layout={{ flexDirection: 'column', gap: 1, width: '100%' }}
                        >
                            <Border
                                variant="100"
                                name="ongoing_item"
                                params={17}
                                tintColor="#f6f6f3"
                                layout={{ width: 340, height: 58, flexShrink: 0 }}
                            >
                                <Region
                                    name="image_container"
                                    params={16}
                                    layout={{ position: 'absolute', left: 9, width: 40, top: 9, height: 40 }}
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
                                    <ThemeImage
                                        name="item_image"
                                        tags={[ 'BITMAP' ]}
                                        params={16}
                                        src={undefined}
                                        layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40, minWidth: 40, maxWidth: 40 }}
                                    />
                                    <WidgetSlot
                                        widgetType="limited_item_overlay_grid"
                                        name="unique_item_overlay_widget"
                                        params={16}
                                        visible={false}
                                        layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                                    />
                                    <WidgetSlot
                                        widgetType="rarity_item_overlay_grid"
                                        name="rarity_item_overlay_widget"
                                        params={16}
                                        visible={false}
                                        layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                                    />
                                </Region>
                                <Region
                                    name="item_name"
                                    params={16}
                                    layout={{ position: 'absolute', left: 58, width: 74, top: 5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('lorem.title')}
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                                <Region
                                    name="item_desc"
                                    params={16}
                                    layout={{ position: 'absolute', left: 58, width: 65, top: 17, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('lorem.title')}
                                        textStyle="text-style-u-small"
                                    />
                                </Region>
                                <Region
                                    name="item_price"
                                    params={16}
                                    layout={{ position: 'absolute', left: 58, width: 62, top: 29, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('lorem.title')}
                                        textStyle="text-style-u-small"
                                    />
                                </Region>
                                <Region
                                    name="item_time"
                                    params={16}
                                    layout={{ position: 'absolute', left: 58, width: 62, top: 41, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('lorem.title')}
                                        textStyle="text-style-u-small"
                                    />
                                </Region>
                                <Button
                                    variant="3"
                                    name="pick_button"
                                    params={393233}
                                    onPointerTap={onPickButton}
                                    textStyle="text-style-button-shiny-regular"
                                    layout={{ position: 'absolute', left: 145, width: 189, top: 31, height: 22 }}
                                >
                                    {t('catalog.marketplace.offer.pick')}
                                </Button>
                            </Border>
                            <Border
                                variant="100"
                                name="sold_item"
                                params={17}
                                tintColor="#e2f5d8"
                                layout={{ width: 340, height: 58, flexShrink: 0 }}
                            >
                                <Region
                                    name="image_container"
                                    params={16}
                                    layout={{ position: 'absolute', left: 9, width: 40, top: 9, height: 40 }}
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
                                    <ThemeImage
                                        name="item_image"
                                        tags={[ 'BITMAP' ]}
                                        params={16}
                                        src={undefined}
                                        layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40, minWidth: 40, maxWidth: 40 }}
                                    />
                                    <WidgetSlot
                                        widgetType="limited_item_overlay_grid"
                                        name="unique_item_overlay_widget"
                                        params={16}
                                        visible={false}
                                        layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                                    />
                                    <WidgetSlot
                                        widgetType="rarity_item_overlay_grid"
                                        name="rarity_item_overlay_widget"
                                        params={16}
                                        visible={false}
                                        layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                                    />
                                </Region>
                                <Region
                                    name="item_name"
                                    params={16}
                                    layout={{ position: 'absolute', left: 58, width: 74, top: 5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('lorem.title')}
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                                <Region
                                    name="item_desc"
                                    params={16}
                                    layout={{ position: 'absolute', left: 58, width: 65, top: 17, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('lorem.title')}
                                        textStyle="text-style-u-small"
                                    />
                                </Region>
                                <Region
                                    name="item_price"
                                    params={16}
                                    layout={{ position: 'absolute', left: 58, width: 62, top: 29, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('lorem.title')}
                                        textStyle="text-style-u-small"
                                    />
                                </Region>
                                <Region
                                    name="item_sold"
                                    params={16}
                                    layout={{ position: 'absolute', left: 58, width: 62, top: 41, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('lorem.title')}
                                        textStyle="text-style-u-small"
                                    />
                                </Region>
                            </Border>
                            <Border
                                variant="100"
                                name="expired_item"
                                params={17}
                                tintColor="#f5d5d3"
                                layout={{ width: 340, height: 58, flexShrink: 0 }}
                            >
                                <Region
                                    name="image_container"
                                    params={16}
                                    layout={{ position: 'absolute', left: 9, width: 40, top: 9, height: 40 }}
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
                                    <ThemeImage
                                        name="item_image"
                                        tags={[ 'BITMAP' ]}
                                        params={16}
                                        src={undefined}
                                        layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40, minWidth: 40, maxWidth: 40 }}
                                    />
                                    <WidgetSlot
                                        widgetType="limited_item_overlay_grid"
                                        name="unique_item_overlay_widget"
                                        params={16}
                                        visible={false}
                                        layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                                    />
                                    <WidgetSlot
                                        widgetType="rarity_item_overlay_grid"
                                        name="rarity_item_overlay_widget"
                                        params={16}
                                        visible={false}
                                        layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                                    />
                                </Region>
                                <Region
                                    name="item_name"
                                    params={16}
                                    layout={{ position: 'absolute', left: 58, width: 74, top: 5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('lorem.title')}
                                        textStyle="text-style-u-bold"
                                    />
                                </Region>
                                <Region
                                    name="item_desc"
                                    params={16}
                                    layout={{ position: 'absolute', left: 58, width: 65, top: 17, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('lorem.title')}
                                        textStyle="text-style-u-small"
                                    />
                                </Region>
                                <Region
                                    name="item_expired"
                                    params={16}
                                    layout={{ position: 'absolute', left: 58, width: 62, top: 41, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('lorem.title')}
                                        textStyle="text-style-u-small"
                                    />
                                </Region>
                            </Border>
                        </Region>
                    </ScrollArea>
                </Region>
            </Region>
        </Region>
    );
};
