import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Bubble, Button, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1337_inventory_trading_wired_xml` (layout "inventory_trading_wired", 478x274) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface InventoryTradingWiredLayoutProps {
    captionContentText1A?: string;
    captionContentText1B?: string;
    captionContentText2A?: string;
    captionContentText2B?: string;
    captionInfoText?: string;
    captionInfoText0?: string;
    captionInfoText1?: string;
    captionSecondsLeftText?: string;
    itemsBubbleContents?: ReactNode;
    itemsTextList0?: ReactNode;
    itemsTextList1?: ReactNode;
    layout?: BoxLayout;
    onButtonAccept?: () => void;
    onButtonCancel?: () => void;
    onRequirementsButton?: () => void;
    srcLock0?: string;
    srcPaymentLayoutImage?: string;
    srcTradeTypeSplitter?: string;
    visibleOffers1PaymentPlaceholder?: boolean;
    visibleTradeRequirementsBubble?: boolean;
}

export const InventoryTradingWiredLayout = ({ captionContentText1A, captionContentText1B, captionContentText2A, captionContentText2B, captionInfoText, captionInfoText0, captionInfoText1, captionSecondsLeftText, itemsBubbleContents, itemsTextList0, itemsTextList1, layout, onButtonAccept, onButtonCancel, onRequirementsButton, srcLock0, srcPaymentLayoutImage, srcTradeTypeSplitter, visibleOffers1PaymentPlaceholder, visibleTradeRequirementsBubble }: InventoryTradingWiredLayoutProps) => {
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
                            text={captionInfoText ?? 'Some info here'}
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
                            layout={{ position: 'absolute', left: 52, right: 53, top: 2, minWidth: 10, maxWidth: 200, flexDirection: 'row' }}
                        >
                            {itemsTextList0 ?? (
                                <InventoryTradingWiredLayoutPlainTextItem />
                            )}
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
                                text={captionInfoText0 ?? t('inventory.trading.warning.own_account_disabled')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 132 }}
                            />
                        </Region>
                        <Region
                            name="content_text_1_a"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 200, top: 162, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={captionContentText1A ?? ''}
                                textOptions={{ align: 'center' }}
                            />
                        </Region>
                        <Region
                            name="content_text_1_b"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 200, top: 180, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={captionContentText1B ?? ''}
                                textOptions={{ align: 'center' }}
                            />
                        </Region>
                    </Region>
                    <ThemeImage
                        name="lock_0"
                        tags={[ 'OWN_USER_LOCK' ]}
                        params={16}
                        src={srcLock0 ?? layoutImage('inventory_trading_trading_unlocked_icon.png')}
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
                            layout={{ position: 'absolute', left: 54, right: 56, top: 2, minWidth: 10, maxWidth: 200, flexDirection: 'row' }}
                        >
                            {itemsTextList1 ?? (
                                <InventoryTradingWiredLayoutPlainTextItem2 />
                            )}
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
                                text={captionInfoText1 ?? t('inventory.trading.warning.others_account_disabled')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 132 }}
                            />
                        </Region>
                        <Region
                            name="content_text_2_a"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 200, top: 162, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={captionContentText2A ?? ''}
                                textOptions={{ align: 'center' }}
                            />
                        </Region>
                        <Region
                            name="content_text_2_b"
                            params={16400}
                            layout={{ position: 'absolute', left: 0, width: 200, top: 180, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={captionContentText2B ?? ''}
                                textOptions={{ align: 'center' }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="offers_1_payment_placeholder"
                        params={16}
                        visible={visibleOffers1PaymentPlaceholder ?? false}
                        layout={{ position: 'absolute', left: 263, width: 200, top: 29, height: 200, justifyContent: 'center' }}
                    >
                        <ThemeImage
                            name="payment_layout_image"
                            params={3932176}
                            src={srcPaymentLayoutImage ?? layoutImage('wired_chests_images_generic_payments.png')}
                            layout={{ position: 'absolute', marginLeft: 5, marginRight: -5, width: 170, alignSelf: 'center', marginTop: -4.5, marginBottom: 4.5, height: 173 }}
                        />
                    </Region>
                    <ThemeImage
                        name="trade_type_splitter"
                        params={16}
                        src={srcTradeTypeSplitter ?? layoutImage('inventory_trading_trading_split_icon.png')}
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
                        onPointerTap={onRequirementsButton}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 453, width: 18, top: 6, height: 18 }}
                    >
                        <ThemeImage
                            params={16}
                            src={layoutImage('icons_info_grey.png')}
                            layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 18 }}
                        />
                    </Region>
                    <Region
                        visible={visibleTradeRequirementsBubble ?? true}
                        layout={{ position: 'absolute', left: 475, width: 430, top: 9, height: 281 }}
                    >
                        <Bubble
                            variant="7"
                            name="trade_requirements_bubble"
                            params={1}
                            pointer="left"
                            layout={{ width: '100%', height: '100%' }}
                        >
                            <Border
                                variant="2"
                                name="highlight_border"
                                params={2192}
                                tintColor="#4fbce3"
                                blend={0}
                                layout={{ position: 'absolute', left: 0, right: 15, top: 0, bottom: 15 }}
                            />
                            <Region
                                name="bubble_contents"
                                params={12582928}
                                layout={{ position: 'absolute', left: 13, width: 390, top: 7, height: 246, minWidth: 390, maxWidth: 390, flexDirection: 'column', gap: 6 }}
                            >
                                {itemsBubbleContents ?? (
                                    <>
                                        <InventoryTradingWiredLayoutBubbleTitleItem />
                                        <InventoryTradingWiredLayoutBubbleTitleSpacingItem />
                                        <InventoryTradingWiredLayoutOfferingsItem />
                                        <InventoryTradingWiredLayoutRequirementsMetContainerItem />
                                        <InventoryTradingWiredLayoutAdditionalTextItem />
                                        <InventoryTradingWiredLayoutDisclaimerTextItem />
                                    </>
                                )}
                            </Region>
                        </Bubble>
                    </Region>
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
                                text={captionSecondsLeftText ?? t('inventory.wired_trading.seconds_left')}
                                textOptions={{ fill: '#bf272a' }}
                            />
                        </Region>
                    </Region>
                    <Button
                        variant="3"
                        name="button_cancel"
                        params={393233}
                        onPointerTap={onButtonCancel}
                        layout={{ position: 'absolute', right: 7, width: 56, top: 0, height: 28 }}
                    >
                        {t('generic.cancel')}
                    </Button>
                </Region>
            </Region>
        </Region>
    );
};

/** Row template `plain_text` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutPlainTextItemProps {
    captionPlainText?: string;
    layout?: BoxLayout;
}

export const InventoryTradingWiredLayoutPlainTextItem = ({ captionPlainText, layout }: InventoryTradingWiredLayoutPlainTextItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="plain_text"
            params={16}
            layout={{ width: 95, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionPlainText ?? t('inventory.wired_trading.offering')} />
        </Region>
    );
};

/** Row template `plain_text` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutPlainTextItem2Props {
    captionPlainText?: string;
    layout?: BoxLayout;
}

export const InventoryTradingWiredLayoutPlainTextItem2 = ({ captionPlainText, layout }: InventoryTradingWiredLayoutPlainTextItem2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="plain_text"
            params={16}
            layout={{ width: 90, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionPlainText ?? t('inventory.wired_trading.receiving')} />
        </Region>
    );
};

/** Row template `bubble_title` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutBubbleTitleItemProps {
    captionBubbleTitle?: string;
    layout?: BoxLayout;
}

export const InventoryTradingWiredLayoutBubbleTitleItem = ({ captionBubbleTitle, layout }: InventoryTradingWiredLayoutBubbleTitleItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="bubble_title"
            params={144}
            layout={{ width: 390, height: 17, flexShrink: 0, minWidth: 220, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionBubbleTitle ?? t('inventory.wired_trading.requirements.trade')}
                textOptions={{ align: 'center' }}
            />
        </Region>
    );
};

/** Row template `bubble_title_spacing` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutBubbleTitleSpacingItemProps {
    layout?: BoxLayout;
}

export const InventoryTradingWiredLayoutBubbleTitleSpacingItem = ({ layout }: InventoryTradingWiredLayoutBubbleTitleSpacingItemProps) => {
    return (
        <Region
            name="bubble_title_spacing"
            params={16}
            layout={{ width: 0, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `and_text` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutAndTextItemProps {
    captionAndText?: string;
    layout?: BoxLayout;
}

export const InventoryTradingWiredLayoutAndTextItem = ({ captionAndText, layout }: InventoryTradingWiredLayoutAndTextItemProps) => {
    return (
        <Region
            name="and_text"
            params={16}
            layout={{ width: 12, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionAndText ?? '&'} />
        </Region>
    );
};

/** Row template `amount_text` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutAmountTextItemProps {
    captionAmountText?: string;
    layout?: BoxLayout;
}

export const InventoryTradingWiredLayoutAmountTextItem = ({ captionAmountText, layout }: InventoryTradingWiredLayoutAmountTextItemProps) => {
    return (
        <Region
            name="amount_text"
            params={16}
            layout={{ width: 17, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionAmountText ?? '2x'} />
        </Region>
    );
};

/** Row template `rule_icon` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutRuleIconItemProps {
    layout?: BoxLayout;
    srcCoinIcon?: string;
}

export const InventoryTradingWiredLayoutRuleIconItem = ({ layout, srcCoinIcon }: InventoryTradingWiredLayoutRuleIconItemProps) => {
    return (
        <Region
            name="rule_icon"
            params={16}
            layout={{ width: 36, height: 36, flexShrink: 0, minWidth: 32, maxWidth: 36, ...layout }}
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
                src={srcCoinIcon ?? layoutImage('pursearea_credits_icon2.png')}
                layout={{ position: 'absolute', left: 0, width: 32, top: 2, height: 36 }}
            />
        </Region>
    );
};

/** Row template `rule_node_template` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutRuleNodeTemplateItemProps {
    itemsRuleNodeTemplate?: ReactNode;
    layout?: BoxLayout;
}

export const InventoryTradingWiredLayoutRuleNodeTemplateItem = ({ itemsRuleNodeTemplate, layout }: InventoryTradingWiredLayoutRuleNodeTemplateItemProps) => {
    return (
        <Region
            name="rule_node_template"
            params={16}
            layout={{ width: 67, height: 40, flexShrink: 0, flexDirection: 'row', gap: 1, ...layout }}
        >
            {itemsRuleNodeTemplate ?? (
                <>
                    <InventoryTradingWiredLayoutAndTextItem />
                    <InventoryTradingWiredLayoutAmountTextItem />
                    <InventoryTradingWiredLayoutRuleIconItem />
                </>
            )}
        </Region>
    );
};

/** Row template `rule_node_columns_template` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutRuleNodeColumnsTemplateItemProps {
    itemsRuleNodeColumnsTemplate?: ReactNode;
    layout?: BoxLayout;
}

export const InventoryTradingWiredLayoutRuleNodeColumnsTemplateItem = ({ itemsRuleNodeColumnsTemplate, layout }: InventoryTradingWiredLayoutRuleNodeColumnsTemplateItemProps) => {
    return (
        <Region
            name="rule_node_columns_template"
            params={16}
            layout={{ width: 67, height: 40, flexShrink: 0, flexDirection: 'row', gap: 1, ...layout }}
        >
            {itemsRuleNodeColumnsTemplate ?? (
                <InventoryTradingWiredLayoutRuleNodeTemplateItem />
            )}
        </Region>
    );
};

/** Row template `rule_template` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutRuleTemplateItemProps {
    captionOrText?: string;
    itemsRuleNodesRows?: ReactNode;
    layout?: BoxLayout;
}

export const InventoryTradingWiredLayoutRuleTemplateItem = ({ captionOrText, itemsRuleNodesRows, layout }: InventoryTradingWiredLayoutRuleTemplateItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rule_template"
            params={144}
            layout={{ width: 178, height: 40, flexShrink: 0, ...layout }}
        >
            <Region
                name="or_text"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 32, top: 11, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionOrText ?? t('inventory.wired_trading.requirements.or')}
                    textOptions={{ align: 'center' }}
                />
            </Region>
            <Region
                name="rule_nodes_rows"
                params={144}
                layout={{ position: 'absolute', left: 32, right: 0, top: 0, height: 40, flexDirection: 'column', gap: 3 }}
            >
                {itemsRuleNodesRows ?? (
                    <InventoryTradingWiredLayoutRuleNodeColumnsTemplateItem />
                )}
            </Region>
        </Region>
    );
};

/** Row template `you_give_container` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutYouGiveContainerItemProps {
    captionAnyAllText?: string;
    captionAnyCoinsText?: string;
    captionAnyFurniText?: string;
    captionCustomText?: string;
    captionOfferingsTitle?: string;
    itemsRulesList?: ReactNode;
    layout?: BoxLayout;
}

export const InventoryTradingWiredLayoutYouGiveContainerItem = ({ captionAnyAllText, captionAnyCoinsText, captionAnyFurniText, captionCustomText, captionOfferingsTitle, itemsRulesList, layout }: InventoryTradingWiredLayoutYouGiveContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="you_give_container"
            params={16}
            layout={{ width: 180, height: 179, flexShrink: 0, ...layout }}
        >
            <Region
                name="offering_requirements_template"
                params={2192}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Region
                    name="offerings_title"
                    params={144}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionOfferingsTitle ?? t('inventory.wired_trading.requirements.offering')}
                        textOptions={{ align: 'center' }}
                    />
                </Region>
                <Border
                    variant="0"
                    name="requirements_definition"
                    params={2192}
                    tintColor="#f7f7f7"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 24, bottom: 2 }}
                >
                    <Region
                        name="custom_text"
                        params={3145872}
                        visible={false}
                        layout={{ position: 'absolute', left: 10, right: 10, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionCustomText ?? 'Entrance to the game and free candies'}
                            textOptions={{ wordWrap: true, wordWrapWidth: 160, align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="any_furni_text"
                        params={3145872}
                        visible={false}
                        layout={{ position: 'absolute', left: 10, right: 10, alignSelf: 'center', marginTop: -12, marginBottom: 12, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionAnyFurniText ?? t('inventory.wired_trading.requirements.donation.furni')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 160 }}
                        />
                    </Region>
                    <Region
                        name="any_coins_text"
                        params={3145872}
                        visible={false}
                        layout={{ position: 'absolute', left: 10, right: 10, alignSelf: 'center', marginTop: -12, marginBottom: 12, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionAnyCoinsText ?? t('inventory.wired_trading.requirements.donation.coins')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 160 }}
                        />
                    </Region>
                    <Region
                        name="any_all_text"
                        params={3145872}
                        visible={false}
                        layout={{ position: 'absolute', left: 10, right: 10, alignSelf: 'center', marginTop: -12, marginBottom: 12, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionAnyAllText ?? t('inventory.wired_trading.requirements.donation.all')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 160 }}
                        />
                    </Region>
                    <Region
                        name="rules_list"
                        params={3145872}
                        layout={{ position: 'absolute', left: 1, right: 1, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 40, flexDirection: 'column' }}
                    >
                        {itemsRulesList ?? (
                            <InventoryTradingWiredLayoutRuleTemplateItem />
                        )}
                    </Region>
                </Border>
            </Region>
        </Region>
    );
};

/** Row template `offering_containers_separator` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutOfferingContainersSeparatorItemProps {
    layout?: BoxLayout;
}

export const InventoryTradingWiredLayoutOfferingContainersSeparatorItem = ({ layout }: InventoryTradingWiredLayoutOfferingContainersSeparatorItemProps) => {
    return (
        <WidgetSlot
            widgetType="separator"
            name="offering_containers_separator"
            params={16}
            options={{ 'separator:vertical': 'true' }}
            layout={{ width: 30, height: 153, flexShrink: 0, minHeight: 80, ...layout }}
        />
    );
};

/** Row template `you_get_container` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutYouGetContainerItemProps {
    layout?: BoxLayout;
}

export const InventoryTradingWiredLayoutYouGetContainerItem = ({ layout }: InventoryTradingWiredLayoutYouGetContainerItemProps) => {
    return (
        <Region
            name="you_get_container"
            params={16}
            layout={{ width: 180, height: 180, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `offerings` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutOfferingsItemProps {
    itemsOfferings?: ReactNode;
    layout?: BoxLayout;
}

export const InventoryTradingWiredLayoutOfferingsItem = ({ itemsOfferings, layout }: InventoryTradingWiredLayoutOfferingsItemProps) => {
    return (
        <Region
            name="offerings"
            params={786640}
            layout={{ width: 390, height: 180, flexShrink: 0, minHeight: 180, maxHeight: 180, flexDirection: 'row', ...layout }}
        >
            {itemsOfferings ?? (
                <>
                    <InventoryTradingWiredLayoutYouGiveContainerItem />
                    <InventoryTradingWiredLayoutOfferingContainersSeparatorItem />
                    <InventoryTradingWiredLayoutYouGetContainerItem />
                </>
            )}
        </Region>
    );
};

/** Row template `requirements_met_container` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutRequirementsMetContainerItemProps {
    captionReqMetText?: string;
    layout?: BoxLayout;
    srcReqMetIcon?: string;
}

export const InventoryTradingWiredLayoutRequirementsMetContainerItem = ({ captionReqMetText, layout, srcReqMetIcon }: InventoryTradingWiredLayoutRequirementsMetContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="requirements_met_container"
            params={144}
            backgroundColor="#d9d9d9"
            layout={{ width: 390, height: 30, flexShrink: 0, minWidth: 220, ...layout }}
        >
            <Region
                name="req_met_text"
                params={8388737}
                layout={{ position: 'absolute', left: 5, right: 43, top: 7, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionReqMetText ?? t('inventory.wired_trading.requirements.indicator.met')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 342 }}
                />
            </Region>
            <ThemeImage
                name="req_met_icon"
                params={80}
                src={srcReqMetIcon ?? layoutImage('common_cross_mark.png')}
                layout={{ position: 'absolute', right: 1, width: 30, top: 0, height: 30 }}
            />
        </Region>
    );
};

/** Row template `additional_text` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutAdditionalTextItemProps {
    captionAdditionalText?: string;
    layout?: BoxLayout;
}

export const InventoryTradingWiredLayoutAdditionalTextItem = ({ captionAdditionalText, layout }: InventoryTradingWiredLayoutAdditionalTextItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="additional_text"
            params={129}
            visible={false}
            layout={{ width: 390, height: 32, flexShrink: 0, minWidth: 220, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionAdditionalText ?? t('inventory.wired_trading.requirements.auto_mode_hint_trade')}
                textOptions={{ wordWrap: true, wordWrapWidth: 390 }}
            />
        </Region>
    );
};

/** Row template `disclaimer_text` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutDisclaimerTextItemProps {
    captionDisclaimerText?: string;
    layout?: BoxLayout;
}

export const InventoryTradingWiredLayoutDisclaimerTextItem = ({ captionDisclaimerText, layout }: InventoryTradingWiredLayoutDisclaimerTextItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="disclaimer_text"
            params={129}
            visible={false}
            layout={{ width: 390, height: 32, flexShrink: 0, minWidth: 220, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionDisclaimerText ?? t('inventory.wired_trading.requirements.receive_text_disclaimer')}
                textOptions={{ fill: '#bf272a', wordWrap: true, wordWrapWidth: 390 }}
            />
        </Region>
    );
};
