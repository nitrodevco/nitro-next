import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Bubble, Frame, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1175_transaction_details_xml` (layout "transaction_details", 400x394) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TransactionDetailsLayoutProps {
    keyValuePairs?: TransactionDetailsLayoutKeyValuePairsProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const TransactionDetailsLayout = ({ keyValuePairs, layout, onClose }: TransactionDetailsLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('wiredchests.log_details.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 400, height: 394, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <TransactionDetailsLayoutKeyValuePairs {...keyValuePairs} />
            </Region>
        </Frame>
    );
};

/** Row template `transaction_type_pair` of TransactionDetailsLayout - pass real rows through its `items…` slot. */
export interface TransactionDetailsLayoutTransactionTypePairItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const TransactionDetailsLayoutTransactionTypePairItem = ({ layout, tags }: TransactionDetailsLayoutTransactionTypePairItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="transaction_type_pair"
            tags={tags}
            layout={{ width: 111, height: 20, flexShrink: 0, flexDirection: 'row', gap: 2, ...layout }}
        >
            <Region layout={{ width: 101, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text={t('wiredchests.log_details.type')} />
            </Region>
            <Region layout={{ width: 8, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text="-" />
            </Region>
        </Region>
    );
};

/** Row template `timestamp_pair` of TransactionDetailsLayout - pass real rows through its `items…` slot. */
export interface TransactionDetailsLayoutTimestampPairItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const TransactionDetailsLayoutTimestampPairItem = ({ layout, tags }: TransactionDetailsLayoutTimestampPairItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="timestamp_pair"
            tags={tags}
            layout={{ width: 77, height: 20, flexShrink: 0, flexDirection: 'row', gap: 2, ...layout }}
        >
            <Region layout={{ width: 67, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text={t('wiredchests.log_details.timestamp')} />
            </Region>
            <Region layout={{ width: 8, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text="-" />
            </Region>
        </Region>
    );
};

/** Row template `room_id_pair` of TransactionDetailsLayout - pass real rows through its `items…` slot. */
export interface TransactionDetailsLayoutRoomIdPairItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const TransactionDetailsLayoutRoomIdPairItem = ({ layout, tags }: TransactionDetailsLayoutRoomIdPairItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="room_id_pair"
            tags={tags}
            layout={{ width: 61, height: 20, flexShrink: 0, flexDirection: 'row', gap: 2, ...layout }}
        >
            <Region layout={{ width: 51, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text={t('wiredchests.log_details.room_id')} />
            </Region>
            <Region layout={{ width: 8, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text="-" />
            </Region>
        </Region>
    );
};

/** Row template `chest_ids_pair` of TransactionDetailsLayout - pass real rows through its `items…` slot. */
export interface TransactionDetailsLayoutChestIdsPairItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const TransactionDetailsLayoutChestIdsPairItem = ({ layout, tags }: TransactionDetailsLayoutChestIdsPairItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="chest_ids_pair"
            tags={tags}
            layout={{ width: 78, height: 20, flexShrink: 0, flexDirection: 'row', gap: 2, ...layout }}
        >
            <Region layout={{ width: 68, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text={t('wiredchests.log_details.chest_ids')} />
            </Region>
            <Region layout={{ width: 8, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text="-" />
            </Region>
        </Region>
    );
};

/** Row template `username_pair` of TransactionDetailsLayout - pass real rows through its `items…` slot. */
export interface TransactionDetailsLayoutUsernamePairItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const TransactionDetailsLayoutUsernamePairItem = ({ layout, tags }: TransactionDetailsLayoutUsernamePairItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="username_pair"
            tags={tags}
            layout={{ width: 74, height: 20, flexShrink: 0, flexDirection: 'row', gap: 2, ...layout }}
        >
            <Region layout={{ width: 64, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text={t('wiredchests.log_details.username')} />
            </Region>
            <Region layout={{ width: 8, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text="-" />
            </Region>
        </Region>
    );
};

/** Row template `furni_transactions_pair` of TransactionDetailsLayout - pass real rows through its `items…` slot. */
export interface TransactionDetailsLayoutFurniTransactionsPairItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const TransactionDetailsLayoutFurniTransactionsPairItem = ({ layout, tags }: TransactionDetailsLayoutFurniTransactionsPairItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="furni_transactions_pair"
            tags={tags}
            layout={{ width: 89, height: 20, flexShrink: 0, flexDirection: 'row', gap: 2, ...layout }}
        >
            <Region layout={{ width: 79, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text={t('wiredchests.log_details.transactions')} />
            </Region>
            <Region layout={{ width: 8, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text="-" />
            </Region>
        </Region>
    );
};

/** Named region `number_container_inner_border` of TransactionDetailsLayout - configured through the parent's `numberContainerInnerBorder` prop. */
export interface TransactionDetailsLayoutNumberContainerInnerBorderProps {
    captionFurniQuantity?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const TransactionDetailsLayoutNumberContainerInnerBorder = ({ captionFurniQuantity, layout, tags }: TransactionDetailsLayoutNumberContainerInnerBorderProps) => {
    return (
        <Region
            name="number_container_inner_border"
            tags={tags}
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 1, width: 11, top: 1, height: 14, ...layout }}
        >
            <Region
                name="furni_quantity"
                layout={{ position: 'absolute', left: 1, top: 1, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionFurniQuantity ?? '0'}
                    textStyle="text-style-regular"
                    textOptions={{ fill: '#2f6982' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `number_container` of TransactionDetailsLayout - configured through the parent's `numberContainer` prop. */
export interface TransactionDetailsLayoutNumberContainerProps {
    layout?: BoxLayout;
    numberContainerInnerBorder?: TransactionDetailsLayoutNumberContainerInnerBorderProps;
    tags?: string[];
    visibleNumberContainer?: boolean;
}

export const TransactionDetailsLayoutNumberContainer = ({ layout, numberContainerInnerBorder, tags, visibleNumberContainer }: TransactionDetailsLayoutNumberContainerProps) => {
    return (
        <Region
            name="number_container"
            tags={tags}
            visible={visibleNumberContainer ?? false}
            backgroundColor="#2f6982"
            layout={{ position: 'absolute', left: 27, right: 0, top: 2, height: 16, ...layout }}
        >
            <TransactionDetailsLayoutNumberContainerInnerBorder {...numberContainerInnerBorder} />
        </Region>
    );
};

/** Row template `furni_template` of TransactionDetailsLayout - pass real rows through its `items…` slot. */
export interface TransactionDetailsLayoutFurniTemplateItemProps {
    captionIncompleteText?: string;
    layout?: BoxLayout;
    numberContainer?: TransactionDetailsLayoutNumberContainerProps;
    onFurniTemplate?: () => void;
    srcCoinsIcon?: string;
    srcOutlineFocus?: string;
    srcUniqueItemBackgroundBitmap?: string;
    tags?: string[];
}

export const TransactionDetailsLayoutFurniTemplateItem = ({ captionIncompleteText, layout, numberContainer, onFurniTemplate, srcCoinsIcon, srcOutlineFocus, srcUniqueItemBackgroundBitmap, tags }: TransactionDetailsLayoutFurniTemplateItemProps) => {
    return (
        <Region
            name="furni_template"
            tags={tags}
            onPointerTap={onFurniTemplate}
            cursor="pointer"
            layout={{ width: 42, height: 42, flexShrink: 0, ...layout }}
        >
            <Border
                variant="5"
                name="border"
                tintColor="#cbcbcb"
                layout={{ position: 'absolute', left: 1, width: 40, top: 1, height: 40 }}
            >
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 7, width: 25, top: 11, height: 18 }}
                >
                    <ThemeImage
                        name="coins_icon"
                        src={srcCoinsIcon ?? layoutImage('inventory_furni_icon_credits.png')}
                        layout={{ position: 'absolute', left: 7, width: 25, top: 11, height: 18 }}
                    />
                </Region>
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
                    name="furni_icon"
                    layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40 }}
                />
                <TransactionDetailsLayoutNumberContainer {...numberContainer} />
                <WidgetSlot
                    widgetType="limited_item_overlay_grid"
                    name="unique_item_overlay_container"
                    visible={false}
                    layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                />
                <WidgetSlot
                    widgetType="rarity_item_overlay_grid"
                    name="rarity_item_overlay_container"
                    visible={false}
                    layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                />
                <Region
                    name="incomplete_text"
                    visible={false}
                    layout={{ position: 'absolute', left: 3, width: 34, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionIncompleteText ?? ' 5'}
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
                    src={srcOutlineFocus ?? layoutImage('inventory_thumb_selected_outline.png')}
                    layout={{ position: 'absolute', left: 0, width: 42, top: 0, height: 42 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `item_grid` of TransactionDetailsLayout - configured through the parent's `itemGrid` prop. */
export interface TransactionDetailsLayoutItemGridProps {
    itemsItemGrid?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const TransactionDetailsLayoutItemGrid = ({ itemsItemGrid, layout, tags }: TransactionDetailsLayoutItemGridProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 5, right: 5, top: 5, bottom: 5, ...layout }}
        >
            <Region
                name="item_grid"
                tags={tags}
                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 3, width: '100%' }}
            >
                {itemsItemGrid ?? (
                    <TransactionDetailsLayoutFurniTemplateItem />
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `withdrawals_container` of TransactionDetailsLayout - configured through the parent's `withdrawalsContainer` prop. */
export interface TransactionDetailsLayoutWithdrawalsContainerProps {
    captionEmptyText?: string;
    itemGrid?: TransactionDetailsLayoutItemGridProps;
    layout?: BoxLayout;
    tags?: string[];
}

export const TransactionDetailsLayoutWithdrawalsContainer = ({ captionEmptyText, itemGrid, layout, tags }: TransactionDetailsLayoutWithdrawalsContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="withdrawals_container"
            tags={tags}
            layout={{ width: 165, height: 161, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <ThemeText
                    text={t('wiredchests.log_details.transactions.withdrawn')}
                    textOptions={{ align: 'center' }}
                />
            </Region>
            <Border
                variant="4"
                tintColor="#e2e2e2"
                layout={{ position: 'absolute', left: 0, width: 165, top: 20, height: 141 }}
            >
                <TransactionDetailsLayoutItemGrid {...itemGrid} />
                <Region
                    name="empty_text"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 61, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionEmptyText ?? t('wiredchests.log_details.transactions.none_placeholder')}
                        textOptions={{ align: 'center' }}
                    />
                </Region>
            </Border>
        </Region>
    );
};

/** Named region `number_container_inner_border` of TransactionDetailsLayout - configured through the parent's `numberContainerInnerBorder` prop. */
export interface TransactionDetailsLayoutNumberContainerInnerBorder2Props {
    captionFurniQuantity?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const TransactionDetailsLayoutNumberContainerInnerBorder2 = ({ captionFurniQuantity, layout, tags }: TransactionDetailsLayoutNumberContainerInnerBorder2Props) => {
    return (
        <Region
            name="number_container_inner_border"
            tags={tags}
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 1, width: 11, top: 1, height: 14, ...layout }}
        >
            <Region
                name="furni_quantity"
                layout={{ position: 'absolute', left: 1, top: 1, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionFurniQuantity ?? '0'}
                    textStyle="text-style-regular"
                    textOptions={{ fill: '#2f6982' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `number_container` of TransactionDetailsLayout - configured through the parent's `numberContainer` prop. */
export interface TransactionDetailsLayoutNumberContainer2Props {
    layout?: BoxLayout;
    numberContainerInnerBorder?: TransactionDetailsLayoutNumberContainerInnerBorder2Props;
    tags?: string[];
    visibleNumberContainer?: boolean;
}

export const TransactionDetailsLayoutNumberContainer2 = ({ layout, numberContainerInnerBorder, tags, visibleNumberContainer }: TransactionDetailsLayoutNumberContainer2Props) => {
    return (
        <Region
            name="number_container"
            tags={tags}
            visible={visibleNumberContainer ?? false}
            backgroundColor="#2f6982"
            layout={{ position: 'absolute', left: 27, right: 0, top: 2, height: 16, ...layout }}
        >
            <TransactionDetailsLayoutNumberContainerInnerBorder2 {...numberContainerInnerBorder} />
        </Region>
    );
};

/** Row template `furni_template` of TransactionDetailsLayout - pass real rows through its `items…` slot. */
export interface TransactionDetailsLayoutFurniTemplateItem2Props {
    captionIncompleteText?: string;
    layout?: BoxLayout;
    numberContainer?: TransactionDetailsLayoutNumberContainer2Props;
    onFurniTemplate?: () => void;
    srcCoinsIcon?: string;
    srcOutlineFocus?: string;
    srcUniqueItemBackgroundBitmap?: string;
    tags?: string[];
}

export const TransactionDetailsLayoutFurniTemplateItem2 = ({ captionIncompleteText, layout, numberContainer, onFurniTemplate, srcCoinsIcon, srcOutlineFocus, srcUniqueItemBackgroundBitmap, tags }: TransactionDetailsLayoutFurniTemplateItem2Props) => {
    return (
        <Region
            name="furni_template"
            tags={tags}
            onPointerTap={onFurniTemplate}
            cursor="pointer"
            layout={{ width: 42, height: 42, flexShrink: 0, ...layout }}
        >
            <Border
                variant="5"
                name="border"
                tintColor="#cbcbcb"
                layout={{ position: 'absolute', left: 1, width: 40, top: 1, height: 40 }}
            >
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 7, width: 25, top: 11, height: 18 }}
                >
                    <ThemeImage
                        name="coins_icon"
                        src={srcCoinsIcon ?? layoutImage('inventory_furni_icon_credits.png')}
                        layout={{ position: 'absolute', left: 7, width: 25, top: 11, height: 18 }}
                    />
                </Region>
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
                    name="furni_icon"
                    layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40 }}
                />
                <TransactionDetailsLayoutNumberContainer2 {...numberContainer} />
                <WidgetSlot
                    widgetType="limited_item_overlay_grid"
                    name="unique_item_overlay_container"
                    visible={false}
                    layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                />
                <WidgetSlot
                    widgetType="rarity_item_overlay_grid"
                    name="rarity_item_overlay_container"
                    visible={false}
                    layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                />
                <Region
                    name="incomplete_text"
                    visible={false}
                    layout={{ position: 'absolute', left: 3, width: 34, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionIncompleteText ?? ' 5'}
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
                    src={srcOutlineFocus ?? layoutImage('inventory_thumb_selected_outline.png')}
                    layout={{ position: 'absolute', left: 0, width: 42, top: 0, height: 42 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `item_grid` of TransactionDetailsLayout - configured through the parent's `itemGrid` prop. */
export interface TransactionDetailsLayoutItemGrid2Props {
    itemsItemGrid?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const TransactionDetailsLayoutItemGrid2 = ({ itemsItemGrid, layout, tags }: TransactionDetailsLayoutItemGrid2Props) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 5, right: 5, top: 5, bottom: 4, ...layout }}
        >
            <Region
                name="item_grid"
                tags={tags}
                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 3, width: '100%' }}
            >
                {itemsItemGrid ?? (
                    <TransactionDetailsLayoutFurniTemplateItem2 />
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `deposits_container` of TransactionDetailsLayout - configured through the parent's `depositsContainer` prop. */
export interface TransactionDetailsLayoutDepositsContainerProps {
    captionEmptyText?: string;
    itemGrid?: TransactionDetailsLayoutItemGrid2Props;
    layout?: BoxLayout;
    tags?: string[];
}

export const TransactionDetailsLayoutDepositsContainer = ({ captionEmptyText, itemGrid, layout, tags }: TransactionDetailsLayoutDepositsContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="deposits_container"
            tags={tags}
            layout={{ width: 165, height: 161, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <ThemeText
                    text={t('wiredchests.log_details.transactions.deposit')}
                    textOptions={{ align: 'center' }}
                />
            </Region>
            <Border
                variant="4"
                tintColor="#e2e2e2"
                layout={{ position: 'absolute', left: 0, width: 165, top: 20, height: 141 }}
            >
                <TransactionDetailsLayoutItemGrid2 {...itemGrid} />
                <Region
                    name="empty_text"
                    visible={false}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 61, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionEmptyText ?? t('wiredchests.log_details.transactions.none_placeholder')}
                        textOptions={{ align: 'center' }}
                    />
                </Region>
            </Border>
        </Region>
    );
};

/** Row template `furni_details` of TransactionDetailsLayout - pass real rows through its `items…` slot. */
export interface TransactionDetailsLayoutFurniDetailsItemProps {
    depositsContainer?: TransactionDetailsLayoutDepositsContainerProps;
    layout?: BoxLayout;
    tags?: string[];
    withdrawalsContainer?: TransactionDetailsLayoutWithdrawalsContainerProps;
}

export const TransactionDetailsLayoutFurniDetailsItem = ({ depositsContainer, layout, tags, withdrawalsContainer }: TransactionDetailsLayoutFurniDetailsItemProps) => {
    return (
        <Region
            name="furni_details"
            tags={tags}
            layout={{ width: 380, height: 161, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <Region layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 345, top: 0, height: 161, flexDirection: 'row', gap: 15 }}>
                <TransactionDetailsLayoutWithdrawalsContainer {...withdrawalsContainer} />
                <TransactionDetailsLayoutDepositsContainer {...depositsContainer} />
            </Region>
        </Region>
    );
};

/** Row template `spacing` of TransactionDetailsLayout - pass real rows through its `items…` slot. */
export interface TransactionDetailsLayoutSpacingItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const TransactionDetailsLayoutSpacingItem = ({ layout, tags }: TransactionDetailsLayoutSpacingItemProps) => {
    return (
        <Region
            name="spacing"
            tags={tags}
            layout={{ width: 380, height: 5, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `extra_pair` of TransactionDetailsLayout - configured through the parent's `extraPair` prop. */
export interface TransactionDetailsLayoutExtraPairProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const TransactionDetailsLayoutExtraPair = ({ layout, tags }: TransactionDetailsLayoutExtraPairProps) => {
    const t = useTranslation();

    return (
        <Region
            name="extra_pair"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 20, flexDirection: 'row', gap: 2, ...layout }}
        >
            <Region layout={{ width: 37, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text={t('wiredchests.log_details.extra')} />
            </Region>
            <Region layout={{ width: 8, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text="-" />
            </Region>
        </Region>
    );
};

/** Named region `extra_info_button` of TransactionDetailsLayout - configured through the parent's `extraInfoButton` prop. */
export interface TransactionDetailsLayoutExtraInfoButtonProps {
    layout?: BoxLayout;
    onExtraInfoButton?: () => void;
    tags?: string[];
}

export const TransactionDetailsLayoutExtraInfoButton = ({ layout, onExtraInfoButton, tags }: TransactionDetailsLayoutExtraInfoButtonProps) => {
    return (
        <Region
            name="extra_info_button"
            tags={tags}
            onPointerTap={onExtraInfoButton}
            cursor="pointer"
            layout={{ position: 'absolute', right: 3, width: 20, top: 0, height: 20, ...layout }}
        >
            <ThemeImage
                src={layoutImage('icons_info_grey.png')}
                layout={{ position: 'absolute', left: 1, width: 18, top: 1, height: 18 }}
            />
        </Region>
    );
};

/** Row template `title` of TransactionDetailsLayout - pass real rows through its `items…` slot. */
export interface TransactionDetailsLayoutTitleItemProps {
    captionTitle?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const TransactionDetailsLayoutTitleItem = ({ captionTitle, layout, tags }: TransactionDetailsLayoutTitleItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="title"
            tags={tags}
            layout={{ width: 123, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionTitle ?? t('wiredchests.log_details.extra.title')}
                textStyle="text-style-u-bold"
            />
        </Region>
    );
};

/** Row template `spacer` of TransactionDetailsLayout - pass real rows through its `items…` slot. */
export interface TransactionDetailsLayoutSpacerItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const TransactionDetailsLayoutSpacerItem = ({ layout, tags }: TransactionDetailsLayoutSpacerItemProps) => {
    return (
        <Region
            name="spacer"
            tags={tags}
            layout={{ width: 30, height: 7, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `desc1` of TransactionDetailsLayout - pass real rows through its `items…` slot. */
export interface TransactionDetailsLayoutDesc1ItemProps {
    captionDesc1?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const TransactionDetailsLayoutDesc1Item = ({ captionDesc1, layout, tags }: TransactionDetailsLayoutDesc1ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="desc1"
            tags={tags}
            layout={{ width: 293, height: 30, flexShrink: 0, minWidth: 293, maxWidth: 293, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionDesc1 ?? t('wiredchests.log_details.extra.desc.1')}
                textOptions={{ wordWrap: true, wordWrapWidth: 293 }}
            />
        </Region>
    );
};

/** Row template `desc2` of TransactionDetailsLayout - pass real rows through its `items…` slot. */
export interface TransactionDetailsLayoutDesc2ItemProps {
    captionDesc2?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const TransactionDetailsLayoutDesc2Item = ({ captionDesc2, layout, tags }: TransactionDetailsLayoutDesc2ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="desc2"
            tags={tags}
            layout={{ width: 293, height: 57, flexShrink: 0, minWidth: 293, maxWidth: 293, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionDesc2 ?? t('wiredchests.log_details.extra.desc.2')}
                textOptions={{ wordWrap: true, wordWrapWidth: 293 }}
            />
        </Region>
    );
};

/** Row template `desc3` of TransactionDetailsLayout - pass real rows through its `items…` slot. */
export interface TransactionDetailsLayoutDesc3ItemProps {
    captionDesc3?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const TransactionDetailsLayoutDesc3Item = ({ captionDesc3, layout, tags }: TransactionDetailsLayoutDesc3ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="desc3"
            tags={tags}
            layout={{ width: 293, height: 30, flexShrink: 0, minWidth: 293, maxWidth: 293, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionDesc3 ?? t('wiredchests.log_details.extra.desc.3')}
                textOptions={{ wordWrap: true, wordWrapWidth: 293 }}
            />
        </Region>
    );
};

/** Named region `extra_info_bubble_texts` of TransactionDetailsLayout - configured through the parent's `extraInfoBubbleTexts` prop. */
export interface TransactionDetailsLayoutExtraInfoBubbleTextsProps {
    itemsExtraInfoBubbleTexts?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const TransactionDetailsLayoutExtraInfoBubbleTexts = ({ itemsExtraInfoBubbleTexts, layout, tags }: TransactionDetailsLayoutExtraInfoBubbleTextsProps) => {
    return (
        <Region
            name="extra_info_bubble_texts"
            tags={tags}
            layout={{ position: 'absolute', left: 8, right: 24, top: 8, height: 147, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsExtraInfoBubbleTexts ?? (
                <>
                    <TransactionDetailsLayoutTitleItem />
                    <TransactionDetailsLayoutSpacerItem />
                    <TransactionDetailsLayoutDesc1Item />
                    <TransactionDetailsLayoutDesc2Item />
                    <TransactionDetailsLayoutDesc3Item />
                </>
            )}
        </Region>
    );
};

/** Row template `extra_container` of TransactionDetailsLayout - pass real rows through its `items…` slot. */
export interface TransactionDetailsLayoutExtraContainerItemProps {
    extraInfoBubbleTexts?: TransactionDetailsLayoutExtraInfoBubbleTextsProps;
    extraInfoButton?: TransactionDetailsLayoutExtraInfoButtonProps;
    extraPair?: TransactionDetailsLayoutExtraPairProps;
    layout?: BoxLayout;
    tags?: string[];
    visibleExtraInfoBubble?: boolean;
}

export const TransactionDetailsLayoutExtraContainerItem = ({ extraInfoBubbleTexts, extraInfoButton, extraPair, layout, tags, visibleExtraInfoBubble }: TransactionDetailsLayoutExtraContainerItemProps) => {
    return (
        <Region
            name="extra_container"
            tags={tags}
            layout={{ width: 380, height: 20, flexShrink: 0, ...layout }}
        >
            <TransactionDetailsLayoutExtraPair {...extraPair} />
            <TransactionDetailsLayoutExtraInfoButton {...extraInfoButton} />
            <Region
                visible={visibleExtraInfoBubble ?? false}
                layout={{ position: 'absolute', left: 379, width: 325, top: -79, height: 179 }}
            >
                <Bubble
                    variant="7"
                    name="extra_info_bubble"
                    pointer="left"
                    layout={{ width: '100%', height: '100%' }}
                >
                    <TransactionDetailsLayoutExtraInfoBubbleTexts {...extraInfoBubbleTexts} />
                </Bubble>
            </Region>
        </Region>
    );
};

/** Named region `key_value_pairs` of TransactionDetailsLayout - configured through the parent's `keyValuePairs` prop. */
export interface TransactionDetailsLayoutKeyValuePairsProps {
    itemsKeyValuePairs?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const TransactionDetailsLayoutKeyValuePairs = ({ itemsKeyValuePairs, layout, tags }: TransactionDetailsLayoutKeyValuePairsProps) => {
    return (
        <Region
            name="key_value_pairs"
            tags={tags}
            layout={{ position: 'absolute', left: 10, right: 10, top: 13, height: 336, flexDirection: 'column', gap: 2, ...layout }}
        >
            {itemsKeyValuePairs ?? (
                <>
                    <TransactionDetailsLayoutTransactionTypePairItem />
                    <TransactionDetailsLayoutTimestampPairItem />
                    <TransactionDetailsLayoutRoomIdPairItem />
                    <TransactionDetailsLayoutChestIdsPairItem />
                    <TransactionDetailsLayoutUsernamePairItem />
                    <TransactionDetailsLayoutFurniTransactionsPairItem />
                    <TransactionDetailsLayoutFurniDetailsItem />
                    <TransactionDetailsLayoutSpacingItem />
                    <TransactionDetailsLayoutExtraContainerItem />
                </>
            )}
            <WidgetSlot
                widgetType="separator"
                layout={{ width: 380, height: 5, flexShrink: 0 }}
            />
            <WidgetSlot
                widgetType="separator"
                layout={{ width: 380, height: 5, flexShrink: 0 }}
            />
        </Region>
    );
};
