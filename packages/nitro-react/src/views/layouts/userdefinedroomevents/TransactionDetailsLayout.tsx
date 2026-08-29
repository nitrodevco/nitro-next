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
            <TransactionDetailsLayoutKeyValuePairs {...keyValuePairs} />
        </Frame>
    );
};

/** Row template `transaction_type_pair` of TransactionDetailsLayout - pass real rows through its `items…` slot. */
export interface TransactionDetailsLayoutTransactionTypePairItemProps {
    layout?: BoxLayout;
}

export const TransactionDetailsLayoutTransactionTypePairItem = ({ layout }: TransactionDetailsLayoutTransactionTypePairItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="transaction_type_pair"
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
}

export const TransactionDetailsLayoutTimestampPairItem = ({ layout }: TransactionDetailsLayoutTimestampPairItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="timestamp_pair"
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
}

export const TransactionDetailsLayoutRoomIdPairItem = ({ layout }: TransactionDetailsLayoutRoomIdPairItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="room_id_pair"
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
}

export const TransactionDetailsLayoutChestIdsPairItem = ({ layout }: TransactionDetailsLayoutChestIdsPairItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="chest_ids_pair"
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
}

export const TransactionDetailsLayoutUsernamePairItem = ({ layout }: TransactionDetailsLayoutUsernamePairItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="username_pair"
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
}

export const TransactionDetailsLayoutFurniTransactionsPairItem = ({ layout }: TransactionDetailsLayoutFurniTransactionsPairItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="furni_transactions_pair"
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

/** Row template `furni_template` of TransactionDetailsLayout - pass real rows through its `items…` slot. */
export interface TransactionDetailsLayoutFurniTemplateItemProps {
    captionFurniQuantity?: string;
    captionIncompleteText?: string;
    layout?: BoxLayout;
    onFurniTemplate?: () => void;
    srcCoinsIcon?: string;
    srcOutlineFocus?: string;
    srcUniqueItemBackgroundBitmap?: string;
    visibleCoinsIcon?: boolean;
    visibleIncompleteText?: boolean;
    visibleNumberContainer?: boolean;
    visibleOutlineFocus?: boolean;
    visibleRarityItemOverlayContainer?: boolean;
    visibleUniqueItemBackgroundBitmap?: boolean;
    visibleUniqueItemOverlayContainer?: boolean;
}

export const TransactionDetailsLayoutFurniTemplateItem = ({ captionFurniQuantity, captionIncompleteText, layout, onFurniTemplate, srcCoinsIcon, srcOutlineFocus, srcUniqueItemBackgroundBitmap, visibleCoinsIcon, visibleIncompleteText, visibleNumberContainer, visibleOutlineFocus, visibleRarityItemOverlayContainer, visibleUniqueItemBackgroundBitmap, visibleUniqueItemOverlayContainer }: TransactionDetailsLayoutFurniTemplateItemProps) => {
    return (
        <Region
            name="furni_template"
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
                {(visibleCoinsIcon ?? false) && (
                    <ThemeImage
                        name="coins_icon"
                        src={srcCoinsIcon ?? layoutImage('inventory_furni_icon_credits.png')}
                        layout={{ position: 'absolute', left: 7, width: 25, top: 11, height: 18 }}
                    />
                )}
                {(visibleUniqueItemBackgroundBitmap ?? false) && (
                    <ThemeImage
                        name="unique_item_background_bitmap"
                        src={srcUniqueItemBackgroundBitmap ?? layoutImage('unique_item_label_1.png')}
                        layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                    />
                )}
                <WidgetSlot
                    widgetType="product_icon"
                    name="furni_icon"
                    layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40 }}
                />
                {(visibleNumberContainer ?? false) && (
                    <Region
                        name="number_container"
                        backgroundColor="#2f6982"
                        layout={{ position: 'absolute', left: 27, right: 0, top: 2, height: 16 }}
                    >
                        <Region
                            name="number_container_inner_border"
                            backgroundColor="#ffffff"
                            layout={{ position: 'absolute', left: 1, width: 11, top: 1, height: 14 }}
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
                    </Region>
                )}
                {(visibleUniqueItemOverlayContainer ?? false) && (
                    <WidgetSlot
                        widgetType="limited_item_overlay_grid"
                        name="unique_item_overlay_container"
                        layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                    />
                )}
                {(visibleRarityItemOverlayContainer ?? false) && (
                    <WidgetSlot
                        widgetType="rarity_item_overlay_grid"
                        name="rarity_item_overlay_container"
                        layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                    />
                )}
                {(visibleIncompleteText ?? false) && (
                    <Region
                        name="incomplete_text"
                        layout={{ position: 'absolute', left: 3, width: 34, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionIncompleteText ?? ' 5'}
                            textOptions={{ fill: '#666666', align: 'center' }}
                        />
                    </Region>
                )}
            </Border>
            {(visibleOutlineFocus ?? false) && (
                <ThemeImage
                    name="outline_focus"
                    src={srcOutlineFocus ?? layoutImage('inventory_thumb_selected_outline.png')}
                    layout={{ position: 'absolute', left: 0, width: 42, top: 0, height: 42 }}
                />
            )}
        </Region>
    );
};

/** Named region `item_grid` of TransactionDetailsLayout - configured through the parent's `itemGrid` prop. */
export interface TransactionDetailsLayoutItemGridProps {
    itemsItemGrid?: ReactNode;
    layout?: BoxLayout;
}

export const TransactionDetailsLayoutItemGrid = ({ itemsItemGrid, layout }: TransactionDetailsLayoutItemGridProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 5, right: 5, top: 5, bottom: 5, ...layout }}
        >
            <Region
                name="item_grid"
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
}

export const TransactionDetailsLayoutWithdrawalsContainer = ({ captionEmptyText, itemGrid, layout }: TransactionDetailsLayoutWithdrawalsContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="withdrawals_container"
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

/** Row template `furni_template` of TransactionDetailsLayout - pass real rows through its `items…` slot. */
export interface TransactionDetailsLayoutFurniTemplateItem2Props {
    captionFurniQuantity?: string;
    captionIncompleteText?: string;
    layout?: BoxLayout;
    onFurniTemplate?: () => void;
    srcCoinsIcon?: string;
    srcOutlineFocus?: string;
    srcUniqueItemBackgroundBitmap?: string;
    visibleCoinsIcon?: boolean;
    visibleIncompleteText?: boolean;
    visibleNumberContainer?: boolean;
    visibleOutlineFocus?: boolean;
    visibleRarityItemOverlayContainer?: boolean;
    visibleUniqueItemBackgroundBitmap?: boolean;
    visibleUniqueItemOverlayContainer?: boolean;
}

export const TransactionDetailsLayoutFurniTemplateItem2 = ({ captionFurniQuantity, captionIncompleteText, layout, onFurniTemplate, srcCoinsIcon, srcOutlineFocus, srcUniqueItemBackgroundBitmap, visibleCoinsIcon, visibleIncompleteText, visibleNumberContainer, visibleOutlineFocus, visibleRarityItemOverlayContainer, visibleUniqueItemBackgroundBitmap, visibleUniqueItemOverlayContainer }: TransactionDetailsLayoutFurniTemplateItem2Props) => {
    return (
        <Region
            name="furni_template"
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
                {(visibleCoinsIcon ?? false) && (
                    <ThemeImage
                        name="coins_icon"
                        src={srcCoinsIcon ?? layoutImage('inventory_furni_icon_credits.png')}
                        layout={{ position: 'absolute', left: 7, width: 25, top: 11, height: 18 }}
                    />
                )}
                {(visibleUniqueItemBackgroundBitmap ?? false) && (
                    <ThemeImage
                        name="unique_item_background_bitmap"
                        src={srcUniqueItemBackgroundBitmap ?? layoutImage('unique_item_label_1.png')}
                        layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                    />
                )}
                <WidgetSlot
                    widgetType="product_icon"
                    name="furni_icon"
                    layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40 }}
                />
                {(visibleNumberContainer ?? false) && (
                    <Region
                        name="number_container"
                        backgroundColor="#2f6982"
                        layout={{ position: 'absolute', left: 27, right: 0, top: 2, height: 16 }}
                    >
                        <Region
                            name="number_container_inner_border"
                            backgroundColor="#ffffff"
                            layout={{ position: 'absolute', left: 1, width: 11, top: 1, height: 14 }}
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
                    </Region>
                )}
                {(visibleUniqueItemOverlayContainer ?? false) && (
                    <WidgetSlot
                        widgetType="limited_item_overlay_grid"
                        name="unique_item_overlay_container"
                        layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                    />
                )}
                {(visibleRarityItemOverlayContainer ?? false) && (
                    <WidgetSlot
                        widgetType="rarity_item_overlay_grid"
                        name="rarity_item_overlay_container"
                        layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                    />
                )}
                {(visibleIncompleteText ?? false) && (
                    <Region
                        name="incomplete_text"
                        layout={{ position: 'absolute', left: 3, width: 34, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionIncompleteText ?? ' 5'}
                            textOptions={{ fill: '#666666', align: 'center' }}
                        />
                    </Region>
                )}
            </Border>
            {(visibleOutlineFocus ?? false) && (
                <ThemeImage
                    name="outline_focus"
                    src={srcOutlineFocus ?? layoutImage('inventory_thumb_selected_outline.png')}
                    layout={{ position: 'absolute', left: 0, width: 42, top: 0, height: 42 }}
                />
            )}
        </Region>
    );
};

/** Named region `item_grid` of TransactionDetailsLayout - configured through the parent's `itemGrid` prop. */
export interface TransactionDetailsLayoutItemGrid2Props {
    itemsItemGrid?: ReactNode;
    layout?: BoxLayout;
}

export const TransactionDetailsLayoutItemGrid2 = ({ itemsItemGrid, layout }: TransactionDetailsLayoutItemGrid2Props) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 5, right: 5, top: 5, bottom: 4, ...layout }}
        >
            <Region
                name="item_grid"
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
    visibleEmptyText?: boolean;
}

export const TransactionDetailsLayoutDepositsContainer = ({ captionEmptyText, itemGrid, layout, visibleEmptyText }: TransactionDetailsLayoutDepositsContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="deposits_container"
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
                {(visibleEmptyText ?? false) && (
                    <Region
                        name="empty_text"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 61, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionEmptyText ?? t('wiredchests.log_details.transactions.none_placeholder')}
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                )}
            </Border>
        </Region>
    );
};

/** Row template `furni_details` of TransactionDetailsLayout - pass real rows through its `items…` slot. */
export interface TransactionDetailsLayoutFurniDetailsItemProps {
    depositsContainer?: TransactionDetailsLayoutDepositsContainerProps;
    layout?: BoxLayout;
    withdrawalsContainer?: TransactionDetailsLayoutWithdrawalsContainerProps;
}

export const TransactionDetailsLayoutFurniDetailsItem = ({ depositsContainer, layout, withdrawalsContainer }: TransactionDetailsLayoutFurniDetailsItemProps) => {
    return (
        <Region
            name="furni_details"
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
}

export const TransactionDetailsLayoutSpacingItem = ({ layout }: TransactionDetailsLayoutSpacingItemProps) => {
    return (
        <Region
            name="spacing"
            layout={{ width: 380, height: 5, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `title` of TransactionDetailsLayout - pass real rows through its `items…` slot. */
export interface TransactionDetailsLayoutTitleItemProps {
    captionTitle?: string;
    layout?: BoxLayout;
}

export const TransactionDetailsLayoutTitleItem = ({ captionTitle, layout }: TransactionDetailsLayoutTitleItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="title"
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
}

export const TransactionDetailsLayoutSpacerItem = ({ layout }: TransactionDetailsLayoutSpacerItemProps) => {
    return (
        <Region
            name="spacer"
            layout={{ width: 30, height: 7, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `desc1` of TransactionDetailsLayout - pass real rows through its `items…` slot. */
export interface TransactionDetailsLayoutDesc1ItemProps {
    captionDesc1?: string;
    layout?: BoxLayout;
}

export const TransactionDetailsLayoutDesc1Item = ({ captionDesc1, layout }: TransactionDetailsLayoutDesc1ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="desc1"
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
}

export const TransactionDetailsLayoutDesc2Item = ({ captionDesc2, layout }: TransactionDetailsLayoutDesc2ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="desc2"
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
}

export const TransactionDetailsLayoutDesc3Item = ({ captionDesc3, layout }: TransactionDetailsLayoutDesc3ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="desc3"
            layout={{ width: 293, height: 30, flexShrink: 0, minWidth: 293, maxWidth: 293, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionDesc3 ?? t('wiredchests.log_details.extra.desc.3')}
                textOptions={{ wordWrap: true, wordWrapWidth: 293 }}
            />
        </Region>
    );
};

/** Row template `extra_container` of TransactionDetailsLayout - pass real rows through its `items…` slot. */
export interface TransactionDetailsLayoutExtraContainerItemProps {
    itemsExtraInfoBubbleTexts?: ReactNode;
    layout?: BoxLayout;
    onExtraInfoButton?: () => void;
    visibleExtraInfoBubble?: boolean;
}

export const TransactionDetailsLayoutExtraContainerItem = ({ itemsExtraInfoBubbleTexts, layout, onExtraInfoButton, visibleExtraInfoBubble }: TransactionDetailsLayoutExtraContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="extra_container"
            layout={{ width: 380, height: 20, flexShrink: 0, ...layout }}
        >
            <Region
                name="extra_pair"
                layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 20, flexDirection: 'row', gap: 2 }}
            >
                <Region layout={{ width: 37, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText text={t('wiredchests.log_details.extra')} />
                </Region>
                <Region layout={{ width: 8, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText text="-" />
                </Region>
            </Region>
            <Region
                name="extra_info_button"
                onPointerTap={onExtraInfoButton}
                cursor="pointer"
                layout={{ position: 'absolute', right: 3, width: 20, top: 0, height: 20 }}
            >
                <ThemeImage
                    src={layoutImage('icons_info_grey.png')}
                    layout={{ position: 'absolute', left: 1, width: 18, top: 1, height: 18 }}
                />
            </Region>
            {(visibleExtraInfoBubble ?? false) && (
                <Bubble
                    variant="7"
                    name="extra_info_bubble"
                    pointer="left"
                    layout={{ position: 'absolute', left: 379, width: 325, top: -79, height: 179 }}
                >
                    <Region
                        name="extra_info_bubble_texts"
                        layout={{ position: 'absolute', left: 8, right: 24, top: 8, height: 147, flexDirection: 'column', gap: 1 }}
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
                </Bubble>
            )}
        </Region>
    );
};

/** Named region `key_value_pairs` of TransactionDetailsLayout - configured through the parent's `keyValuePairs` prop. */
export interface TransactionDetailsLayoutKeyValuePairsProps {
    itemsKeyValuePairs?: ReactNode;
    layout?: BoxLayout;
}

export const TransactionDetailsLayoutKeyValuePairs = ({ itemsKeyValuePairs, layout }: TransactionDetailsLayoutKeyValuePairsProps) => {
    return (
        <Region
            name="key_value_pairs"
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
