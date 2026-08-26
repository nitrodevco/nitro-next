import { useTranslation } from '#base/context';
import { Border, BoxLayout, Bubble, Frame, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `1175_transaction_details_xml` (layout "transaction_details", 400x394) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TransactionDetailsLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
}

export const TransactionDetailsLayout = ({ layout, onClose }: TransactionDetailsLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            params={32769}
            caption={t('wiredchests.log_details.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 400, height: 394, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="key_value_pairs"
                    params={8388752}
                    layout={{ position: 'absolute', left: 10, width: 380, top: 13, height: 336, flexDirection: 'column', gap: 2 }}
                >
                    <Region
                        name="transaction_type_pair"
                        params={16}
                        layout={{ width: 111, height: 20, flexShrink: 0, flexDirection: 'row', gap: 2 }}
                    >
                        <Region
                            params={16}
                            layout={{ width: 101, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={t('wiredchests.log_details.type')} />
                        </Region>
                        <Region
                            params={16}
                            layout={{ width: 8, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text="-" />
                        </Region>
                    </Region>
                    <Region
                        name="timestamp_pair"
                        params={16}
                        layout={{ width: 77, height: 20, flexShrink: 0, flexDirection: 'row', gap: 2 }}
                    >
                        <Region
                            params={16}
                            layout={{ width: 67, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={t('wiredchests.log_details.timestamp')} />
                        </Region>
                        <Region
                            params={16}
                            layout={{ width: 8, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text="-" />
                        </Region>
                    </Region>
                    <Region
                        name="room_id_pair"
                        params={16}
                        layout={{ width: 61, height: 20, flexShrink: 0, flexDirection: 'row', gap: 2 }}
                    >
                        <Region
                            params={16}
                            layout={{ width: 51, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={t('wiredchests.log_details.room_id')} />
                        </Region>
                        <Region
                            params={16}
                            layout={{ width: 8, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text="-" />
                        </Region>
                    </Region>
                    <Region
                        name="chest_ids_pair"
                        params={16}
                        layout={{ width: 78, height: 20, flexShrink: 0, flexDirection: 'row', gap: 2 }}
                    >
                        <Region
                            params={16}
                            layout={{ width: 68, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={t('wiredchests.log_details.chest_ids')} />
                        </Region>
                        <Region
                            params={16}
                            layout={{ width: 8, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text="-" />
                        </Region>
                    </Region>
                    <Region
                        name="username_pair"
                        params={16}
                        layout={{ width: 74, height: 20, flexShrink: 0, flexDirection: 'row', gap: 2 }}
                    >
                        <Region
                            params={16}
                            layout={{ width: 64, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={t('wiredchests.log_details.username')} />
                        </Region>
                        <Region
                            params={16}
                            layout={{ width: 8, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text="-" />
                        </Region>
                    </Region>
                    <WidgetSlot
                        widgetType="separator"
                        params={144}
                        layout={{ width: 380, height: 5, flexShrink: 0 }}
                    />
                    <Region
                        name="furni_transactions_pair"
                        params={16}
                        layout={{ width: 89, height: 20, flexShrink: 0, flexDirection: 'row', gap: 2 }}
                    >
                        <Region
                            params={16}
                            layout={{ width: 79, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={t('wiredchests.log_details.transactions')} />
                        </Region>
                        <Region
                            params={16}
                            layout={{ width: 8, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text="-" />
                        </Region>
                    </Region>
                    <Region
                        name="furni_details"
                        params={16}
                        layout={{ width: 380, height: 161, flexShrink: 0 }}
                    >
                        <Region
                            params={786640}
                            layout={{ position: 'absolute', left: 18, width: 345, top: 0, height: 161, flexDirection: 'row', gap: 15 }}
                        >
                            <Region
                                name="withdrawals_container"
                                params={16}
                                layout={{ width: 165, height: 161, flexShrink: 0 }}
                            >
                                <Region
                                    params={144}
                                    layout={{ position: 'absolute', left: 0, width: 165, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('wiredchests.log_details.transactions.withdrawn')}
                                        textOptions={{ align: 'center' }}
                                    />
                                </Region>
                                <Border
                                    variant="4"
                                    params={16}
                                    tintColor="#e2e2e2"
                                    layout={{ position: 'absolute', left: 0, width: 165, top: 20, height: 141 }}
                                >
                                    <ScrollArea
                                        orientation="vertical"
                                        layout={{ position: 'absolute', left: 5, width: 155, top: 5, height: 131 }}
                                    >
                                        <Region
                                            name="item_grid"
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
                                                        layout={{ position: 'absolute', left: 7, width: 25, top: 11, height: 18 }}
                                                    >
                                                        <ThemeImage
                                                            name="coins_icon"
                                                            params={16}
                                                            src={layoutImage('inventory_furni_icon_credits.png')}
                                                            layout={{ position: 'absolute', left: 7, width: 25, top: 11, height: 18 }}
                                                        />
                                                    </Region>
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
                                                    <Region
                                                        name="incomplete_text"
                                                        params={3088}
                                                        visible={false}
                                                        layout={{ position: 'absolute', left: 3, width: 34, top: 9, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                                    >
                                                        <ThemeText
                                                            text=" 5"
                                                            textOptions={{ fill: '#666666', align: 'center' }}
                                                        />
                                                    </Region>
                                                </Border>
                                                <Region
                                                    visible={false}
                                                    layout={{ position: 'absolute', left: 0, width: 42, top: 0, height: 42 }}
                                                >
                                                    <ThemeImage
                                                        name="outline_focus"
                                                        params={16}
                                                        src={layoutImage('inventory_thumb_selected_outline.png')}
                                                        layout={{ position: 'absolute', left: 0, width: 42, top: 0, height: 42 }}
                                                    />
                                                </Region>
                                            </Region>
                                        </Region>
                                    </ScrollArea>
                                    <Region
                                        name="empty_text"
                                        params={144}
                                        layout={{ position: 'absolute', left: 0, width: 165, top: 61, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <ThemeText
                                            text={t('wiredchests.log_details.transactions.none_placeholder')}
                                            textOptions={{ align: 'center' }}
                                        />
                                    </Region>
                                </Border>
                            </Region>
                            <Region
                                name="deposits_container"
                                params={16}
                                layout={{ width: 165, height: 161, flexShrink: 0 }}
                            >
                                <Region
                                    params={144}
                                    layout={{ position: 'absolute', left: 0, width: 165, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('wiredchests.log_details.transactions.deposit')}
                                        textOptions={{ align: 'center' }}
                                    />
                                </Region>
                                <Border
                                    variant="4"
                                    params={16}
                                    tintColor="#e2e2e2"
                                    layout={{ position: 'absolute', left: 0, width: 165, top: 20, height: 141 }}
                                >
                                    <ScrollArea
                                        orientation="vertical"
                                        layout={{ position: 'absolute', left: 5, width: 155, top: 5, height: 132 }}
                                    >
                                        <Region
                                            name="item_grid"
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
                                                        layout={{ position: 'absolute', left: 7, width: 25, top: 11, height: 18 }}
                                                    >
                                                        <ThemeImage
                                                            name="coins_icon"
                                                            params={16}
                                                            src={layoutImage('inventory_furni_icon_credits.png')}
                                                            layout={{ position: 'absolute', left: 7, width: 25, top: 11, height: 18 }}
                                                        />
                                                    </Region>
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
                                                    <Region
                                                        name="incomplete_text"
                                                        params={3088}
                                                        visible={false}
                                                        layout={{ position: 'absolute', left: 3, width: 34, top: 9, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                                    >
                                                        <ThemeText
                                                            text=" 5"
                                                            textOptions={{ fill: '#666666', align: 'center' }}
                                                        />
                                                    </Region>
                                                </Border>
                                                <Region
                                                    visible={false}
                                                    layout={{ position: 'absolute', left: 0, width: 42, top: 0, height: 42 }}
                                                >
                                                    <ThemeImage
                                                        name="outline_focus"
                                                        params={16}
                                                        src={layoutImage('inventory_thumb_selected_outline.png')}
                                                        layout={{ position: 'absolute', left: 0, width: 42, top: 0, height: 42 }}
                                                    />
                                                </Region>
                                            </Region>
                                        </Region>
                                    </ScrollArea>
                                    <Region
                                        name="empty_text"
                                        params={144}
                                        visible={false}
                                        layout={{ position: 'absolute', left: 0, width: 165, top: 61, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <ThemeText
                                            text={t('wiredchests.log_details.transactions.none_placeholder')}
                                            textOptions={{ align: 'center' }}
                                        />
                                    </Region>
                                </Border>
                            </Region>
                        </Region>
                    </Region>
                    <Region
                        name="spacing"
                        params={144}
                        layout={{ width: 380, height: 5, flexShrink: 0 }}
                    />
                    <WidgetSlot
                        widgetType="separator"
                        params={144}
                        layout={{ width: 380, height: 5, flexShrink: 0 }}
                    />
                    <Region
                        name="extra_container"
                        params={144}
                        layout={{ width: 380, height: 20, flexShrink: 0 }}
                    >
                        <Region
                            name="extra_pair"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 20, flexDirection: 'row', gap: 2 }}
                        >
                            <Region
                                params={16}
                                layout={{ width: 37, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={t('wiredchests.log_details.extra')} />
                            </Region>
                            <Region
                                params={16}
                                layout={{ width: 8, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text="-" />
                            </Region>
                        </Region>
                        <Region
                            name="extra_info_button"
                            params={81}
                            layout={{ position: 'absolute', left: 357, width: 20, top: 0, height: 20 }}
                        >
                            <ThemeImage
                                params={16}
                                src={layoutImage('icons_info_grey.png')}
                                layout={{ position: 'absolute', left: 1, width: 18, top: 1, height: 18 }}
                            />
                        </Region>
                        <Region
                            visible={false}
                            layout={{ position: 'absolute', left: 379, width: 325, top: -79, height: 179 }}
                        >
                            <Bubble
                                variant="7"
                                name="extra_info_bubble"
                                params={1}
                                pointer="left"
                                layout={{ width: '100%', height: '100%' }}
                            >
                                <Region
                                    name="extra_info_bubble_texts"
                                    params={8388752}
                                    layout={{ position: 'absolute', left: 8, width: 293, top: 8, height: 147, flexDirection: 'column', gap: 1 }}
                                >
                                    <Region
                                        name="title"
                                        params={16}
                                        layout={{ width: 123, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('wiredchests.log_details.extra.title')}
                                            textStyle="text-style-u-bold"
                                        />
                                    </Region>
                                    <Region
                                        name="spacer"
                                        params={16}
                                        layout={{ width: 30, height: 7, flexShrink: 0 }}
                                    />
                                    <Region
                                        name="desc1"
                                        params={129}
                                        layout={{ width: 293, height: 30, flexShrink: 0, minWidth: 293, maxWidth: 293, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('wiredchests.log_details.extra.desc.1')}
                                            textOptions={{ wordWrap: true, wordWrapWidth: 293 }}
                                        />
                                    </Region>
                                    <Region
                                        name="desc2"
                                        params={129}
                                        layout={{ width: 293, height: 57, flexShrink: 0, minWidth: 293, maxWidth: 293, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('wiredchests.log_details.extra.desc.2')}
                                            textOptions={{ wordWrap: true, wordWrapWidth: 293 }}
                                        />
                                    </Region>
                                    <Region
                                        name="desc3"
                                        params={129}
                                        layout={{ width: 293, height: 30, flexShrink: 0, minWidth: 293, maxWidth: 293, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('wiredchests.log_details.extra.desc.3')}
                                            textOptions={{ wordWrap: true, wordWrapWidth: 293 }}
                                        />
                                    </Region>
                                </Region>
                            </Bubble>
                        </Region>
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
