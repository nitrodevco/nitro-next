import { useTranslation } from '#base/context';
import { Border, BoxLayout, Bubble, Button, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `1337_inventory_trading_wired_xml` (layout "inventory_trading_wired", 478x274) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface InventoryTradingWiredLayoutProps {
    layout?: BoxLayout;
    onButtonAccept?: () => void;
    onButtonCancel?: () => void;
}

export const InventoryTradingWiredLayout = ({ layout, onButtonAccept, onButtonCancel }: InventoryTradingWiredLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 478, height: 274, ...layout }}>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 478, top: 0, height: 274 }}
            >
                <Border
                    variant="102"
                    name="trade_container"
                    params={17}
                    tintColor="#27556a"
                    layout={{ position: 'absolute', left: 0, width: 478, top: 0, height: 233 }}
                >
                    <Region
                        name="info_text"
                        tags={[ 'HELP_TEXT' ]}
                        params={16400}
                        layout={{ position: 'absolute', left: 38, width: 401, top: 7, height: 17, maxWidth: 461, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text="Some info here"
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="offers_0"
                        params={16}
                        layout={{ position: 'absolute', left: 17, width: 200, top: 29, height: 200 }}
                    >
                        <Region
                            name="text_list_0"
                            params={934033}
                            layout={{ position: 'absolute', left: 52, width: 95, top: 2, height: 16, minWidth: 10, maxWidth: 200, flexDirection: 'row' }}
                        >
                            <Region
                                name="plain_text"
                                params={16}
                                layout={{ width: 95, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={t('inventory.wired_trading.offering')} />
                            </Region>
                        </Region>
                        <Region
                            name="item_grid_border_0"
                            tags={[ 'OWN_USER_BORDER' ]}
                            params={16}
                            layout={{ position: 'absolute', left: 32, width: 136, top: 22, height: 136 }}
                        >
                            <Region
                                name="item_grid_0"
                                tags={[ 'OWN_USER_GRID' ]}
                                params={17}
                                layout={{ position: 'absolute', left: 4, width: 132, top: 4, height: 132, flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}
                            >
                                <Border
                                    variant="102"
                                    tags={[ 'OWN_USER_ITEM' ]}
                                    params={16}
                                    tintColor="#cccccc"
                                    layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
                                />
                                <Border
                                    variant="102"
                                    tags={[ 'OWN_USER_ITEM' ]}
                                    params={16}
                                    tintColor="#cccccc"
                                    layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
                                />
                                <Border
                                    variant="102"
                                    tags={[ 'OWN_USER_ITEM' ]}
                                    params={16}
                                    tintColor="#cccccc"
                                    layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
                                />
                                <Border
                                    variant="102"
                                    tags={[ 'OWN_USER_ITEM' ]}
                                    params={16}
                                    tintColor="#cccccc"
                                    layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
                                />
                                <Border
                                    variant="102"
                                    tags={[ 'OWN_USER_ITEM' ]}
                                    params={16}
                                    tintColor="#cccccc"
                                    layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
                                />
                                <Border
                                    variant="102"
                                    tags={[ 'OWN_USER_ITEM' ]}
                                    params={16}
                                    tintColor="#cccccc"
                                    layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
                                />
                                <Border
                                    variant="102"
                                    tags={[ 'OWN_USER_ITEM' ]}
                                    params={16}
                                    tintColor="#cccccc"
                                    layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
                                />
                                <Border
                                    variant="102"
                                    tags={[ 'OWN_USER_ITEM' ]}
                                    params={16}
                                    tintColor="#cccccc"
                                    layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
                                />
                                <Border
                                    variant="102"
                                    tags={[ 'OWN_USER_ITEM' ]}
                                    params={16}
                                    tintColor="#cccccc"
                                    layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
                                />
                            </Region>
                        </Region>
                        <Region
                            name="info_text_0"
                            tags={[ 'OTHER_USER_MESSAGE' ]}
                            params={16}
                            visible={false}
                            layout={{ position: 'absolute', left: 34, width: 132, top: 23, height: 132, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('inventory.trading.warning.own_account_disabled')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 132 }}
                            />
                        </Region>
                        <Region
                            name="content_text_1_a"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 200, top: 162, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        />
                        <Region
                            name="content_text_1_b"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 200, top: 180, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        />
                    </Region>
                    <ThemeImage
                        name="lock_0"
                        tags={[ 'OWN_USER_LOCK' ]}
                        params={16}
                        src={layoutImage('inventory_trading_trading_unlocked_icon.png')}
                        layout={{ position: 'absolute', left: 223, width: 32, top: 192, height: 34 }}
                    />
                    <Region
                        name="offers_1"
                        params={16}
                        layout={{ position: 'absolute', left: 263, width: 200, top: 29, height: 200 }}
                    >
                        <Region
                            name="text_list_1"
                            params={934033}
                            layout={{ position: 'absolute', left: 54, width: 90, top: 2, height: 16, minWidth: 10, maxWidth: 200, flexDirection: 'row' }}
                        >
                            <Region
                                name="plain_text"
                                params={16}
                                layout={{ width: 90, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={t('inventory.wired_trading.receiving')} />
                            </Region>
                        </Region>
                        <Region
                            name="item_grid_border_1"
                            tags={[ 'OTHER_USER_BORDER' ]}
                            params={16}
                            layout={{ position: 'absolute', left: 32, width: 180, top: 22, height: 136 }}
                        >
                            <Region
                                name="item_grid_1"
                                tags={[ 'OTHER_USER_GRID' ]}
                                params={17}
                                layout={{ position: 'absolute', left: 4, width: 132, top: 4, height: 132, flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}
                            >
                                <Border
                                    variant="102"
                                    tags={[ 'OTHER_USER_ITEM' ]}
                                    params={16}
                                    tintColor="#cccccc"
                                    layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
                                />
                                <Border
                                    variant="102"
                                    tags={[ 'OTHER_USER_ITEM' ]}
                                    params={16}
                                    tintColor="#cccccc"
                                    layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
                                />
                                <Border
                                    variant="102"
                                    tags={[ 'OTHER_USER_ITEM' ]}
                                    params={16}
                                    tintColor="#cccccc"
                                    layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
                                />
                                <Border
                                    variant="102"
                                    tags={[ 'OTHER_USER_ITEM' ]}
                                    params={16}
                                    tintColor="#cccccc"
                                    layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
                                />
                                <Border
                                    variant="102"
                                    tags={[ 'OTHER_USER_ITEM' ]}
                                    params={16}
                                    tintColor="#cccccc"
                                    layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
                                />
                                <Border
                                    variant="102"
                                    tags={[ 'OTHER_USER_ITEM' ]}
                                    params={16}
                                    tintColor="#cccccc"
                                    layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
                                />
                                <Border
                                    variant="102"
                                    tags={[ 'OTHER_USER_ITEM' ]}
                                    params={16}
                                    tintColor="#cccccc"
                                    layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
                                />
                                <Border
                                    variant="102"
                                    tags={[ 'OTHER_USER_ITEM' ]}
                                    params={16}
                                    tintColor="#cccccc"
                                    layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
                                />
                                <Border
                                    variant="102"
                                    tags={[ 'OTHER_USER_ITEM' ]}
                                    params={16}
                                    tintColor="#cccccc"
                                    layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
                                />
                            </Region>
                        </Region>
                        <Region
                            name="info_text_1"
                            tags={[ 'OTHER_USER_MESSAGE' ]}
                            params={16}
                            visible={false}
                            layout={{ position: 'absolute', left: 34, width: 132, top: 23, height: 132, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('inventory.trading.warning.others_account_disabled')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 132 }}
                            />
                        </Region>
                        <Region
                            name="content_text_2_a"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 200, top: 162, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        />
                        <Region
                            name="content_text_2_b"
                            params={16400}
                            layout={{ position: 'absolute', left: 0, width: 200, top: 180, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        />
                    </Region>
                    <Region
                        name="offers_1_payment_placeholder"
                        params={16}
                        visible={false}
                        layout={{ position: 'absolute', left: 263, width: 200, top: 29, height: 200 }}
                    >
                        <ThemeImage
                            name="payment_layout_image"
                            params={3932176}
                            src={layoutImage('wired_chests_images_generic_payments.png')}
                            layout={{ position: 'absolute', left: 20, width: 170, top: 9, height: 173 }}
                        />
                    </Region>
                    <ThemeImage
                        name="trade_type_splitter"
                        params={16}
                        src={layoutImage('inventory_trading_trading_split_icon.png')}
                        layout={{ position: 'absolute', left: 212, width: 53, top: 95, height: 42 }}
                    />
                    <WidgetSlot
                        widgetType="separator"
                        params={16}
                        visible={false}
                        options={{ 'separator:vertical': 'true' }}
                        layout={{ position: 'absolute', left: 224, width: 30, top: 40, height: 160 }}
                    />
                    <Region
                        name="requirements_button"
                        params={17}
                        layout={{ position: 'absolute', left: 453, width: 18, top: 6, height: 18 }}
                    >
                        <ThemeImage
                            params={16}
                            src={layoutImage('icons_info_grey.png')}
                            layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 18 }}
                        />
                    </Region>
                    <Bubble
                        variant="7"
                        name="trade_requirements_bubble"
                        params={1}
                        pointer="left"
                        layout={{ position: 'absolute', left: 475, width: 430, top: 9, height: 281 }}
                    >
                        <Border
                            variant="2"
                            name="highlight_border"
                            params={2192}
                            tintColor="#4fbce3"
                            blend={0}
                            layout={{ position: 'absolute', left: 0, width: 415, top: 0, height: 266 }}
                        />
                        <Region
                            name="bubble_contents"
                            params={12582928}
                            layout={{ position: 'absolute', left: 13, width: 390, top: 7, height: 246, minWidth: 390, maxWidth: 390, flexDirection: 'column', gap: 6 }}
                        >
                            <Region
                                name="bubble_title"
                                params={144}
                                layout={{ width: 390, height: 17, flexShrink: 0, minWidth: 220, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <ThemeText
                                    text={t('inventory.wired_trading.requirements.trade')}
                                    textOptions={{ align: 'center' }}
                                />
                            </Region>
                            <Region
                                name="bubble_title_spacing"
                                params={16}
                                layout={{ width: 0, height: 1, flexShrink: 0 }}
                            />
                            <Region
                                name="offerings"
                                params={786640}
                                layout={{ width: 390, height: 180, flexShrink: 0, minHeight: 180, maxHeight: 180, flexDirection: 'row' }}
                            >
                                <Region
                                    name="you_give_container"
                                    params={16}
                                    layout={{ width: 180, height: 179, flexShrink: 0 }}
                                >
                                    <Region
                                        name="offering_requirements_template"
                                        params={2192}
                                        layout={{ position: 'absolute', left: 0, width: 180, top: 0, height: 179 }}
                                    >
                                        <Region
                                            name="offerings_title"
                                            params={144}
                                            layout={{ position: 'absolute', left: 0, width: 180, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                        >
                                            <ThemeText
                                                text={t('inventory.wired_trading.requirements.offering')}
                                                textOptions={{ align: 'center' }}
                                            />
                                        </Region>
                                        <Border
                                            variant="0"
                                            name="requirements_definition"
                                            params={2192}
                                            tintColor="#f7f7f7"
                                            layout={{ position: 'absolute', left: 0, width: 180, top: 24, height: 153 }}
                                        >
                                            <Region
                                                name="custom_text"
                                                params={3145872}
                                                visible={false}
                                                layout={{ position: 'absolute', left: 10, width: 160, top: 61, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                                            >
                                                <ThemeText
                                                    text="Entrance to the game and free candies"
                                                    textOptions={{ wordWrap: true, wordWrapWidth: 160, align: 'center' }}
                                                />
                                            </Region>
                                            <Region
                                                name="any_furni_text"
                                                params={3145872}
                                                visible={false}
                                                layout={{ position: 'absolute', left: 10, width: 160, top: 56, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                            >
                                                <ThemeText
                                                    text={t('inventory.wired_trading.requirements.donation.furni')}
                                                    textOptions={{ wordWrap: true, wordWrapWidth: 160 }}
                                                />
                                            </Region>
                                            <Region
                                                name="any_coins_text"
                                                params={3145872}
                                                visible={false}
                                                layout={{ position: 'absolute', left: 10, width: 160, top: 56, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                            >
                                                <ThemeText
                                                    text={t('inventory.wired_trading.requirements.donation.coins')}
                                                    textOptions={{ wordWrap: true, wordWrapWidth: 160 }}
                                                />
                                            </Region>
                                            <Region
                                                name="any_all_text"
                                                params={3145872}
                                                visible={false}
                                                layout={{ position: 'absolute', left: 10, width: 160, top: 56, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                            >
                                                <ThemeText
                                                    text={t('inventory.wired_trading.requirements.donation.all')}
                                                    textOptions={{ wordWrap: true, wordWrapWidth: 160 }}
                                                />
                                            </Region>
                                            <Region
                                                name="rules_list"
                                                params={3145872}
                                                layout={{ position: 'absolute', left: 1, width: 178, top: 56, height: 40, flexDirection: 'column' }}
                                            >
                                                <Region
                                                    name="rule_template"
                                                    params={144}
                                                    layout={{ width: 178, height: 40, flexShrink: 0 }}
                                                >
                                                    <Region
                                                        name="or_text"
                                                        params={16}
                                                        layout={{ position: 'absolute', left: 0, width: 32, top: 11, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                                    >
                                                        <ThemeText
                                                            text={t('inventory.wired_trading.requirements.or')}
                                                            textOptions={{ align: 'center' }}
                                                        />
                                                    </Region>
                                                    <Region
                                                        name="rule_nodes_rows"
                                                        params={144}
                                                        layout={{ position: 'absolute', left: 32, width: 146, top: 0, height: 40, flexDirection: 'column', gap: 3 }}
                                                    >
                                                        <Region
                                                            name="rule_node_columns_template"
                                                            params={16}
                                                            layout={{ width: 67, height: 40, flexShrink: 0, flexDirection: 'row', gap: 1 }}
                                                        >
                                                            <Region
                                                                name="rule_node_template"
                                                                params={16}
                                                                layout={{ width: 67, height: 40, flexShrink: 0, flexDirection: 'row', gap: 1 }}
                                                            >
                                                                <Region
                                                                    name="and_text"
                                                                    params={16}
                                                                    layout={{ width: 12, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                                                >
                                                                    <ThemeText text="&" />
                                                                </Region>
                                                                <Region
                                                                    name="amount_text"
                                                                    params={16}
                                                                    layout={{ width: 17, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                                                >
                                                                    <ThemeText text="2x" />
                                                                </Region>
                                                                <Region
                                                                    name="rule_icon"
                                                                    params={16}
                                                                    layout={{ width: 36, height: 36, flexShrink: 0, minWidth: 32, maxWidth: 36 }}
                                                                >
                                                                    <WidgetSlot
                                                                        widgetType="product_icon"
                                                                        name="furni_icon"
                                                                        params={16}
                                                                        layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40 }}
                                                                    />
                                                                    <ThemeImage
                                                                        name="coin_icon"
                                                                        params={16}
                                                                        src={layoutImage('pursearea_credits_icon2.png')}
                                                                        layout={{ position: 'absolute', left: 0, width: 32, top: 2, height: 36 }}
                                                                    />
                                                                </Region>
                                                            </Region>
                                                        </Region>
                                                    </Region>
                                                </Region>
                                            </Region>
                                        </Border>
                                    </Region>
                                </Region>
                                <WidgetSlot
                                    widgetType="separator"
                                    name="offering_containers_separator"
                                    params={16}
                                    options={{ 'separator:vertical': 'true' }}
                                    layout={{ width: 30, height: 153, flexShrink: 0, minHeight: 80 }}
                                />
                                <Region
                                    name="you_get_container"
                                    params={16}
                                    layout={{ width: 180, height: 180, flexShrink: 0 }}
                                />
                            </Region>
                            <Region
                                name="requirements_met_container"
                                params={144}
                                backgroundColor="#d9d9d9"
                                layout={{ width: 390, height: 30, flexShrink: 0, minWidth: 220 }}
                            >
                                <Region
                                    name="req_met_text"
                                    params={8388737}
                                    layout={{ position: 'absolute', left: 5, width: 342, top: 7, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('inventory.wired_trading.requirements.indicator.met')}
                                        textOptions={{ wordWrap: true, wordWrapWidth: 342 }}
                                    />
                                </Region>
                                <ThemeImage
                                    name="req_met_icon"
                                    params={80}
                                    src={layoutImage('common_cross_mark.png')}
                                    layout={{ position: 'absolute', left: 359, width: 30, top: 0, height: 30 }}
                                />
                            </Region>
                            <Region
                                name="additional_text"
                                params={129}
                                visible={false}
                                layout={{ width: 390, height: 32, flexShrink: 0, minWidth: 220, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('inventory.wired_trading.requirements.auto_mode_hint_trade')}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 390 }}
                                />
                            </Region>
                            <Region
                                name="disclaimer_text"
                                params={129}
                                visible={false}
                                layout={{ width: 390, height: 32, flexShrink: 0, minWidth: 220, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('inventory.wired_trading.requirements.receive_text_disclaimer')}
                                    textOptions={{ fill: '#bf272a', wordWrap: true, wordWrapWidth: 390 }}
                                />
                            </Region>
                        </Region>
                    </Bubble>
                </Border>
                <Region
                    name="button_container"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 478, top: 240, height: 32 }}
                >
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 5, width: 299, top: 0, height: 28, flexDirection: 'row', gap: 6 }}
                    >
                        <Button
                            variant="3"
                            name="button_accept"
                            params={131089}
                            onPointerTap={onButtonAccept}
                            layout={{ width: 157, height: 28, flexShrink: 0 }}
                        >
                            {t('inventory.trading.accept')}
                        </Button>
                        <Region
                            name="seconds_left_text"
                            params={16}
                            layout={{ width: 136, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('inventory.wired_trading.seconds_left')}
                                textOptions={{ fill: '#bf272a' }}
                            />
                        </Region>
                    </Region>
                    <Button
                        variant="3"
                        name="button_cancel"
                        params={393233}
                        onPointerTap={onButtonCancel}
                        layout={{ position: 'absolute', left: 415, width: 56, top: 0, height: 28 }}
                    >
                        {t('generic.cancel')}
                    </Button>
                </Region>
            </Region>
        </Region>
    );
};
