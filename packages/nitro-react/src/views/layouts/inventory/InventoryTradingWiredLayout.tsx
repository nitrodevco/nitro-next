import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Bubble, Button, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1337_inventory_trading_wired_xml` (layout "inventory_trading_wired", 478x274) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface InventoryTradingWiredLayoutProps {
    bubbleContents?: InventoryTradingWiredLayoutBubbleContentsProps;
    buttonContainer?: InventoryTradingWiredLayoutButtonContainerProps;
    captionInfoText?: string;
    layout?: BoxLayout;
    offers0?: InventoryTradingWiredLayoutOffers0Props;
    offers1?: InventoryTradingWiredLayoutOffers1Props;
    offers1PaymentPlaceholder?: InventoryTradingWiredLayoutOffers1PaymentPlaceholderProps;
    requirementsButton?: InventoryTradingWiredLayoutRequirementsButtonProps;
    srcLock0?: string;
    srcTradeTypeSplitter?: string;
    visibleTradeRequirementsBubble?: boolean;
}

export const InventoryTradingWiredLayout = ({ bubbleContents, buttonContainer, captionInfoText, layout, offers0, offers1, offers1PaymentPlaceholder, requirementsButton, srcLock0, srcTradeTypeSplitter, visibleTradeRequirementsBubble }: InventoryTradingWiredLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 478, height: 274, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 478, top: 0, height: 274 }}>
                <Border
                    variant="102"
                    name="trade_container"
                    tintColor="#27556a"
                    layout={{ position: 'absolute', left: 0, width: 478, top: 0, height: 233 }}
                >
                    <Region
                        name="info_text"
                        tags={[ 'HELP_TEXT' ]}
                        layout={{ position: 'absolute', left: 38, width: 401, top: 7, height: 17, maxWidth: 461, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionInfoText ?? 'Some info here'}
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                    <InventoryTradingWiredLayoutOffers0 {...offers0} />
                    <ThemeImage
                        name="lock_0"
                        tags={[ 'OWN_USER_LOCK' ]}
                        src={srcLock0 ?? layoutImage('inventory_trading_trading_unlocked_icon.png')}
                        layout={{ position: 'absolute', left: 223, width: 32, top: 192, height: 34 }}
                    />
                    <InventoryTradingWiredLayoutOffers1 {...offers1} />
                    <InventoryTradingWiredLayoutOffers1PaymentPlaceholder {...offers1PaymentPlaceholder} />
                    <ThemeImage
                        name="trade_type_splitter"
                        src={srcTradeTypeSplitter ?? layoutImage('inventory_trading_trading_split_icon.png')}
                        layout={{ position: 'absolute', left: 212, width: 53, top: 95, height: 42 }}
                    />
                    <WidgetSlot
                        widgetType="separator"
                        visible={false}
                        options={{ 'separator:vertical': 'true' }}
                        layout={{ position: 'absolute', left: 224, width: 30, top: 40, height: 160 }}
                    />
                    <InventoryTradingWiredLayoutRequirementsButton {...requirementsButton} />
                    <Region
                        visible={visibleTradeRequirementsBubble ?? true}
                        layout={{ position: 'absolute', left: 475, width: 430, top: 9, height: 281 }}
                    >
                        <Bubble
                            variant="7"
                            name="trade_requirements_bubble"
                            pointer="left"
                            layout={{ width: '100%', height: '100%' }}
                        >
                            <Border
                                variant="2"
                                name="highlight_border"
                                tintColor="#4fbce3"
                                blend={0}
                                layout={{ position: 'absolute', left: 0, right: 15, top: 0, bottom: 15 }}
                            />
                            <InventoryTradingWiredLayoutBubbleContents {...bubbleContents} />
                        </Bubble>
                    </Region>
                </Border>
                <InventoryTradingWiredLayoutButtonContainer {...buttonContainer} />
            </Region>
        </Region>
    );
};

/** Row template `plain_text` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutPlainTextItemProps {
    captionPlainText?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryTradingWiredLayoutPlainTextItem = ({ captionPlainText, layout, tags }: InventoryTradingWiredLayoutPlainTextItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="plain_text"
            tags={tags}
            layout={{ width: 95, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionPlainText ?? t('inventory.wired_trading.offering')} />
        </Region>
    );
};

/** Named region `text_list_0` of InventoryTradingWiredLayout - configured through the parent's `textList0` prop. */
export interface InventoryTradingWiredLayoutTextList0Props {
    itemsTextList0?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryTradingWiredLayoutTextList0 = ({ itemsTextList0, layout, tags }: InventoryTradingWiredLayoutTextList0Props) => {
    return (
        <Region
            name="text_list_0"
            tags={tags}
            layout={{ position: 'absolute', left: 52, right: 53, top: 2, minWidth: 10, maxWidth: 200, flexDirection: 'row', ...layout }}
        >
            {itemsTextList0 ?? (
                <InventoryTradingWiredLayoutPlainTextItem />
            )}
        </Region>
    );
};

/** Named region `item_grid_0` of InventoryTradingWiredLayout - configured through the parent's `itemGrid0` prop. */
export interface InventoryTradingWiredLayoutItemGrid0Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryTradingWiredLayoutItemGrid0 = ({ layout, tags }: InventoryTradingWiredLayoutItemGrid0Props) => {
    return (
        <Region
            name="item_grid_0"
            tags={tags}
            layout={{ position: 'absolute', left: 4, width: 132, top: 4, height: 132, flexDirection: 'row', flexWrap: 'wrap', gap: 4, ...layout }}
        >
            <Border
                variant="102"
                tags={[ 'OWN_USER_ITEM' ]}
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
            <Border
                variant="102"
                tags={[ 'OWN_USER_ITEM' ]}
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
            <Border
                variant="102"
                tags={[ 'OWN_USER_ITEM' ]}
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
            <Border
                variant="102"
                tags={[ 'OWN_USER_ITEM' ]}
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
            <Border
                variant="102"
                tags={[ 'OWN_USER_ITEM' ]}
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
            <Border
                variant="102"
                tags={[ 'OWN_USER_ITEM' ]}
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
            <Border
                variant="102"
                tags={[ 'OWN_USER_ITEM' ]}
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
            <Border
                variant="102"
                tags={[ 'OWN_USER_ITEM' ]}
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
            <Border
                variant="102"
                tags={[ 'OWN_USER_ITEM' ]}
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
        </Region>
    );
};

/** Named region `item_grid_border_0` of InventoryTradingWiredLayout - configured through the parent's `itemGridBorder0` prop. */
export interface InventoryTradingWiredLayoutItemGridBorder0Props {
    itemGrid0?: InventoryTradingWiredLayoutItemGrid0Props;
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryTradingWiredLayoutItemGridBorder0 = ({ itemGrid0, layout, tags }: InventoryTradingWiredLayoutItemGridBorder0Props) => {
    return (
        <Region
            name="item_grid_border_0"
            tags={tags}
            layout={{ position: 'absolute', left: 32, width: 136, top: 22, height: 136, ...layout }}
        >
            <InventoryTradingWiredLayoutItemGrid0
                tags={[ 'OWN_USER_GRID' ]}
                {...itemGrid0}
            />
        </Region>
    );
};

/** Named region `offers_0` of InventoryTradingWiredLayout - configured through the parent's `offers0` prop. */
export interface InventoryTradingWiredLayoutOffers0Props {
    captionContentText1A?: string;
    captionContentText1B?: string;
    captionInfoText0?: string;
    itemGridBorder0?: InventoryTradingWiredLayoutItemGridBorder0Props;
    layout?: BoxLayout;
    tags?: string[];
    textList0?: InventoryTradingWiredLayoutTextList0Props;
}

export const InventoryTradingWiredLayoutOffers0 = ({ captionContentText1A, captionContentText1B, captionInfoText0, itemGridBorder0, layout, tags, textList0 }: InventoryTradingWiredLayoutOffers0Props) => {
    const t = useTranslation();

    return (
        <Region
            name="offers_0"
            tags={tags}
            layout={{ position: 'absolute', left: 17, width: 200, top: 29, height: 200, ...layout }}
        >
            <InventoryTradingWiredLayoutTextList0 {...textList0} />
            <InventoryTradingWiredLayoutItemGridBorder0
                tags={[ 'OWN_USER_BORDER' ]}
                {...itemGridBorder0}
            />
            <Region
                name="info_text_0"
                tags={[ 'OTHER_USER_MESSAGE' ]}
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
                layout={{ position: 'absolute', left: 0, width: 200, top: 162, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionContentText1A ?? ''}
                    textOptions={{ align: 'center' }}
                />
            </Region>
            <Region
                name="content_text_1_b"
                layout={{ position: 'absolute', left: 0, width: 200, top: 180, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionContentText1B ?? ''}
                    textOptions={{ align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `plain_text` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutPlainTextItem2Props {
    captionPlainText?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryTradingWiredLayoutPlainTextItem2 = ({ captionPlainText, layout, tags }: InventoryTradingWiredLayoutPlainTextItem2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="plain_text"
            tags={tags}
            layout={{ width: 90, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionPlainText ?? t('inventory.wired_trading.receiving')} />
        </Region>
    );
};

/** Named region `text_list_1` of InventoryTradingWiredLayout - configured through the parent's `textList1` prop. */
export interface InventoryTradingWiredLayoutTextList1Props {
    itemsTextList1?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryTradingWiredLayoutTextList1 = ({ itemsTextList1, layout, tags }: InventoryTradingWiredLayoutTextList1Props) => {
    return (
        <Region
            name="text_list_1"
            tags={tags}
            layout={{ position: 'absolute', left: 54, right: 56, top: 2, minWidth: 10, maxWidth: 200, flexDirection: 'row', ...layout }}
        >
            {itemsTextList1 ?? (
                <InventoryTradingWiredLayoutPlainTextItem2 />
            )}
        </Region>
    );
};

/** Named region `item_grid_1` of InventoryTradingWiredLayout - configured through the parent's `itemGrid1` prop. */
export interface InventoryTradingWiredLayoutItemGrid1Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryTradingWiredLayoutItemGrid1 = ({ layout, tags }: InventoryTradingWiredLayoutItemGrid1Props) => {
    return (
        <Region
            name="item_grid_1"
            tags={tags}
            layout={{ position: 'absolute', left: 4, width: 132, top: 4, height: 132, flexDirection: 'row', flexWrap: 'wrap', gap: 4, ...layout }}
        >
            <Border
                variant="102"
                tags={[ 'OTHER_USER_ITEM' ]}
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
            <Border
                variant="102"
                tags={[ 'OTHER_USER_ITEM' ]}
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
            <Border
                variant="102"
                tags={[ 'OTHER_USER_ITEM' ]}
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
            <Border
                variant="102"
                tags={[ 'OTHER_USER_ITEM' ]}
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
            <Border
                variant="102"
                tags={[ 'OTHER_USER_ITEM' ]}
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
            <Border
                variant="102"
                tags={[ 'OTHER_USER_ITEM' ]}
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
            <Border
                variant="102"
                tags={[ 'OTHER_USER_ITEM' ]}
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
            <Border
                variant="102"
                tags={[ 'OTHER_USER_ITEM' ]}
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
            <Border
                variant="102"
                tags={[ 'OTHER_USER_ITEM' ]}
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
        </Region>
    );
};

/** Named region `item_grid_border_1` of InventoryTradingWiredLayout - configured through the parent's `itemGridBorder1` prop. */
export interface InventoryTradingWiredLayoutItemGridBorder1Props {
    itemGrid1?: InventoryTradingWiredLayoutItemGrid1Props;
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryTradingWiredLayoutItemGridBorder1 = ({ itemGrid1, layout, tags }: InventoryTradingWiredLayoutItemGridBorder1Props) => {
    return (
        <Region
            name="item_grid_border_1"
            tags={tags}
            layout={{ position: 'absolute', left: 32, width: 180, top: 22, height: 136, ...layout }}
        >
            <InventoryTradingWiredLayoutItemGrid1
                tags={[ 'OTHER_USER_GRID' ]}
                {...itemGrid1}
            />
        </Region>
    );
};

/** Named region `offers_1` of InventoryTradingWiredLayout - configured through the parent's `offers1` prop. */
export interface InventoryTradingWiredLayoutOffers1Props {
    captionContentText2A?: string;
    captionContentText2B?: string;
    captionInfoText1?: string;
    itemGridBorder1?: InventoryTradingWiredLayoutItemGridBorder1Props;
    layout?: BoxLayout;
    tags?: string[];
    textList1?: InventoryTradingWiredLayoutTextList1Props;
}

export const InventoryTradingWiredLayoutOffers1 = ({ captionContentText2A, captionContentText2B, captionInfoText1, itemGridBorder1, layout, tags, textList1 }: InventoryTradingWiredLayoutOffers1Props) => {
    const t = useTranslation();

    return (
        <Region
            name="offers_1"
            tags={tags}
            layout={{ position: 'absolute', left: 263, width: 200, top: 29, height: 200, ...layout }}
        >
            <InventoryTradingWiredLayoutTextList1 {...textList1} />
            <InventoryTradingWiredLayoutItemGridBorder1
                tags={[ 'OTHER_USER_BORDER' ]}
                {...itemGridBorder1}
            />
            <Region
                name="info_text_1"
                tags={[ 'OTHER_USER_MESSAGE' ]}
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
                layout={{ position: 'absolute', left: 0, width: 200, top: 162, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionContentText2A ?? ''}
                    textOptions={{ align: 'center' }}
                />
            </Region>
            <Region
                name="content_text_2_b"
                layout={{ position: 'absolute', left: 0, width: 200, top: 180, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionContentText2B ?? ''}
                    textOptions={{ align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `offers_1_payment_placeholder` of InventoryTradingWiredLayout - configured through the parent's `offers1PaymentPlaceholder` prop. */
export interface InventoryTradingWiredLayoutOffers1PaymentPlaceholderProps {
    layout?: BoxLayout;
    srcPaymentLayoutImage?: string;
    tags?: string[];
    visibleOffers1PaymentPlaceholder?: boolean;
}

export const InventoryTradingWiredLayoutOffers1PaymentPlaceholder = ({ layout, srcPaymentLayoutImage, tags, visibleOffers1PaymentPlaceholder }: InventoryTradingWiredLayoutOffers1PaymentPlaceholderProps) => {
    return (
        <Region
            name="offers_1_payment_placeholder"
            tags={tags}
            visible={visibleOffers1PaymentPlaceholder ?? false}
            layout={{ position: 'absolute', left: 263, width: 200, top: 29, height: 200, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="payment_layout_image"
                src={srcPaymentLayoutImage ?? layoutImage('wired_chests_images_generic_payments.png')}
                layout={{ position: 'absolute', marginLeft: 5, marginRight: -5, width: 170, alignSelf: 'center', marginTop: -4.5, marginBottom: 4.5, height: 173 }}
            />
        </Region>
    );
};

/** Named region `requirements_button` of InventoryTradingWiredLayout - configured through the parent's `requirementsButton` prop. */
export interface InventoryTradingWiredLayoutRequirementsButtonProps {
    layout?: BoxLayout;
    onRequirementsButton?: () => void;
    tags?: string[];
}

export const InventoryTradingWiredLayoutRequirementsButton = ({ layout, onRequirementsButton, tags }: InventoryTradingWiredLayoutRequirementsButtonProps) => {
    return (
        <Region
            name="requirements_button"
            tags={tags}
            onPointerTap={onRequirementsButton}
            cursor="pointer"
            layout={{ position: 'absolute', left: 453, width: 18, top: 6, height: 18, ...layout }}
        >
            <ThemeImage
                src={layoutImage('icons_info_grey.png')}
                layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 18 }}
            />
        </Region>
    );
};

/** Row template `bubble_title` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutBubbleTitleItemProps {
    captionBubbleTitle?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryTradingWiredLayoutBubbleTitleItem = ({ captionBubbleTitle, layout, tags }: InventoryTradingWiredLayoutBubbleTitleItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="bubble_title"
            tags={tags}
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
    tags?: string[];
}

export const InventoryTradingWiredLayoutBubbleTitleSpacingItem = ({ layout, tags }: InventoryTradingWiredLayoutBubbleTitleSpacingItemProps) => {
    return (
        <Region
            name="bubble_title_spacing"
            tags={tags}
            layout={{ width: 0, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `and_text` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutAndTextItemProps {
    captionAndText?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryTradingWiredLayoutAndTextItem = ({ captionAndText, layout, tags }: InventoryTradingWiredLayoutAndTextItemProps) => {
    return (
        <Region
            name="and_text"
            tags={tags}
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
    tags?: string[];
}

export const InventoryTradingWiredLayoutAmountTextItem = ({ captionAmountText, layout, tags }: InventoryTradingWiredLayoutAmountTextItemProps) => {
    return (
        <Region
            name="amount_text"
            tags={tags}
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
    tags?: string[];
}

export const InventoryTradingWiredLayoutRuleIconItem = ({ layout, srcCoinIcon, tags }: InventoryTradingWiredLayoutRuleIconItemProps) => {
    return (
        <Region
            name="rule_icon"
            tags={tags}
            layout={{ width: 36, height: 36, flexShrink: 0, minWidth: 32, maxWidth: 36, ...layout }}
        >
            <WidgetSlot
                widgetType="product_icon"
                name="furni_icon"
                layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40 }}
            />
            <ThemeImage
                name="coin_icon"
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
    tags?: string[];
}

export const InventoryTradingWiredLayoutRuleNodeTemplateItem = ({ itemsRuleNodeTemplate, layout, tags }: InventoryTradingWiredLayoutRuleNodeTemplateItemProps) => {
    return (
        <Region
            name="rule_node_template"
            tags={tags}
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
    tags?: string[];
}

export const InventoryTradingWiredLayoutRuleNodeColumnsTemplateItem = ({ itemsRuleNodeColumnsTemplate, layout, tags }: InventoryTradingWiredLayoutRuleNodeColumnsTemplateItemProps) => {
    return (
        <Region
            name="rule_node_columns_template"
            tags={tags}
            layout={{ width: 67, height: 40, flexShrink: 0, flexDirection: 'row', gap: 1, ...layout }}
        >
            {itemsRuleNodeColumnsTemplate ?? (
                <InventoryTradingWiredLayoutRuleNodeTemplateItem />
            )}
        </Region>
    );
};

/** Named region `rule_nodes_rows` of InventoryTradingWiredLayout - configured through the parent's `ruleNodesRows` prop. */
export interface InventoryTradingWiredLayoutRuleNodesRowsProps {
    itemsRuleNodesRows?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryTradingWiredLayoutRuleNodesRows = ({ itemsRuleNodesRows, layout, tags }: InventoryTradingWiredLayoutRuleNodesRowsProps) => {
    return (
        <Region
            name="rule_nodes_rows"
            tags={tags}
            layout={{ position: 'absolute', left: 32, right: 0, top: 0, height: 40, flexDirection: 'column', gap: 3, ...layout }}
        >
            {itemsRuleNodesRows ?? (
                <InventoryTradingWiredLayoutRuleNodeColumnsTemplateItem />
            )}
        </Region>
    );
};

/** Row template `rule_template` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutRuleTemplateItemProps {
    captionOrText?: string;
    layout?: BoxLayout;
    ruleNodesRows?: InventoryTradingWiredLayoutRuleNodesRowsProps;
    tags?: string[];
}

export const InventoryTradingWiredLayoutRuleTemplateItem = ({ captionOrText, layout, ruleNodesRows, tags }: InventoryTradingWiredLayoutRuleTemplateItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rule_template"
            tags={tags}
            layout={{ width: 178, height: 40, flexShrink: 0, ...layout }}
        >
            <Region
                name="or_text"
                layout={{ position: 'absolute', left: 0, width: 32, top: 11, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionOrText ?? t('inventory.wired_trading.requirements.or')}
                    textOptions={{ align: 'center' }}
                />
            </Region>
            <InventoryTradingWiredLayoutRuleNodesRows {...ruleNodesRows} />
        </Region>
    );
};

/** Named region `rules_list` of InventoryTradingWiredLayout - configured through the parent's `rulesList` prop. */
export interface InventoryTradingWiredLayoutRulesListProps {
    itemsRulesList?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryTradingWiredLayoutRulesList = ({ itemsRulesList, layout, tags }: InventoryTradingWiredLayoutRulesListProps) => {
    return (
        <Region
            name="rules_list"
            tags={tags}
            layout={{ position: 'absolute', left: 1, right: 1, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 40, flexDirection: 'column', ...layout }}
        >
            {itemsRulesList ?? (
                <InventoryTradingWiredLayoutRuleTemplateItem />
            )}
        </Region>
    );
};

/** Named region `offering_requirements_template` of InventoryTradingWiredLayout - configured through the parent's `offeringRequirementsTemplate` prop. */
export interface InventoryTradingWiredLayoutOfferingRequirementsTemplateProps {
    captionAnyAllText?: string;
    captionAnyCoinsText?: string;
    captionAnyFurniText?: string;
    captionCustomText?: string;
    captionOfferingsTitle?: string;
    layout?: BoxLayout;
    rulesList?: InventoryTradingWiredLayoutRulesListProps;
    tags?: string[];
}

export const InventoryTradingWiredLayoutOfferingRequirementsTemplate = ({ captionAnyAllText, captionAnyCoinsText, captionAnyFurniText, captionCustomText, captionOfferingsTitle, layout, rulesList, tags }: InventoryTradingWiredLayoutOfferingRequirementsTemplateProps) => {
    const t = useTranslation();

    return (
        <Region
            name="offering_requirements_template"
            tags={tags}
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="offerings_title"
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
                tintColor="#f7f7f7"
                layout={{ position: 'absolute', left: 0, right: 0, top: 24, bottom: 2 }}
            >
                <Region
                    name="custom_text"
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
                    visible={false}
                    layout={{ position: 'absolute', left: 10, right: 10, alignSelf: 'center', marginTop: -12, marginBottom: 12, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionAnyAllText ?? t('inventory.wired_trading.requirements.donation.all')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 160 }}
                    />
                </Region>
                <InventoryTradingWiredLayoutRulesList {...rulesList} />
            </Border>
        </Region>
    );
};

/** Row template `you_give_container` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutYouGiveContainerItemProps {
    layout?: BoxLayout;
    offeringRequirementsTemplate?: InventoryTradingWiredLayoutOfferingRequirementsTemplateProps;
    tags?: string[];
}

export const InventoryTradingWiredLayoutYouGiveContainerItem = ({ layout, offeringRequirementsTemplate, tags }: InventoryTradingWiredLayoutYouGiveContainerItemProps) => {
    return (
        <Region
            name="you_give_container"
            tags={tags}
            layout={{ width: 180, height: 179, flexShrink: 0, ...layout }}
        >
            <InventoryTradingWiredLayoutOfferingRequirementsTemplate {...offeringRequirementsTemplate} />
        </Region>
    );
};

/** Row template `offering_containers_separator` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutOfferingContainersSeparatorItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryTradingWiredLayoutOfferingContainersSeparatorItem = ({ layout, tags }: InventoryTradingWiredLayoutOfferingContainersSeparatorItemProps) => {
    return (
        <WidgetSlot
            widgetType="separator"
            name="offering_containers_separator"
            tags={tags}
            options={{ 'separator:vertical': 'true' }}
            layout={{ width: 30, height: 153, flexShrink: 0, minHeight: 80, ...layout }}
        />
    );
};

/** Row template `you_get_container` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutYouGetContainerItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryTradingWiredLayoutYouGetContainerItem = ({ layout, tags }: InventoryTradingWiredLayoutYouGetContainerItemProps) => {
    return (
        <Region
            name="you_get_container"
            tags={tags}
            layout={{ width: 180, height: 180, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `offerings` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutOfferingsItemProps {
    itemsOfferings?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryTradingWiredLayoutOfferingsItem = ({ itemsOfferings, layout, tags }: InventoryTradingWiredLayoutOfferingsItemProps) => {
    return (
        <Region
            name="offerings"
            tags={tags}
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
    tags?: string[];
}

export const InventoryTradingWiredLayoutRequirementsMetContainerItem = ({ captionReqMetText, layout, srcReqMetIcon, tags }: InventoryTradingWiredLayoutRequirementsMetContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="requirements_met_container"
            tags={tags}
            backgroundColor="#d9d9d9"
            layout={{ width: 390, height: 30, flexShrink: 0, minWidth: 220, ...layout }}
        >
            <Region
                name="req_met_text"
                layout={{ position: 'absolute', left: 5, right: 43, top: 7, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionReqMetText ?? t('inventory.wired_trading.requirements.indicator.met')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 342 }}
                />
            </Region>
            <ThemeImage
                name="req_met_icon"
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
    tags?: string[];
}

export const InventoryTradingWiredLayoutAdditionalTextItem = ({ captionAdditionalText, layout, tags }: InventoryTradingWiredLayoutAdditionalTextItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="additional_text"
            tags={tags}
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
    tags?: string[];
}

export const InventoryTradingWiredLayoutDisclaimerTextItem = ({ captionDisclaimerText, layout, tags }: InventoryTradingWiredLayoutDisclaimerTextItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="disclaimer_text"
            tags={tags}
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

/** Named region `bubble_contents` of InventoryTradingWiredLayout - configured through the parent's `bubbleContents` prop. */
export interface InventoryTradingWiredLayoutBubbleContentsProps {
    itemsBubbleContents?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryTradingWiredLayoutBubbleContents = ({ itemsBubbleContents, layout, tags }: InventoryTradingWiredLayoutBubbleContentsProps) => {
    return (
        <Region
            name="bubble_contents"
            tags={tags}
            layout={{ position: 'absolute', left: 13, width: 390, top: 7, height: 246, minWidth: 390, maxWidth: 390, flexDirection: 'column', gap: 6, ...layout }}
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
    );
};

/** Named region `button_container` of InventoryTradingWiredLayout - configured through the parent's `buttonContainer` prop. */
export interface InventoryTradingWiredLayoutButtonContainerProps {
    captionSecondsLeftText?: string;
    layout?: BoxLayout;
    onButtonAccept?: () => void;
    onButtonCancel?: () => void;
    tags?: string[];
}

export const InventoryTradingWiredLayoutButtonContainer = ({ captionSecondsLeftText, layout, onButtonAccept, onButtonCancel, tags }: InventoryTradingWiredLayoutButtonContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="button_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 478, top: 240, height: 32, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 5, width: 299, top: 0, height: 28, flexDirection: 'row', gap: 6 }}>
                <Button
                    variant="3"
                    name="button_accept"
                    onPointerTap={onButtonAccept}
                    layout={{ width: 157, height: 28, flexShrink: 0 }}
                >
                    {t('inventory.trading.accept')}
                </Button>
                <Region
                    name="seconds_left_text"
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
                onPointerTap={onButtonCancel}
                layout={{ position: 'absolute', right: 7, width: 56, top: 0, height: 28 }}
            >
                {t('generic.cancel')}
            </Button>
        </Region>
    );
};
