import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ContainerButton, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1388_inventory_trading_xml` (layout "inventory_trading", 478x371) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface InventoryTradingLayoutProps {
    buttonContainer?: InventoryTradingLayoutButtonContainerProps;
    captionHelpText?: string;
    captionInfoTextHighlighted?: string;
    captionOtherSilver?: string;
    captionSilverFeeInfoText?: string;
    captionYourSilver?: string;
    layout?: BoxLayout;
    offers0?: InventoryTradingLayoutOffers0Props;
    offers1?: InventoryTradingLayoutOffers1Props;
    onSilverMinusButton?: () => void;
    onSilverPlusButton?: () => void;
    requirementContainer?: InventoryTradingLayoutRequirementContainerProps;
    srcArrowLeft?: string;
    srcArrowRight?: string;
}

export const InventoryTradingLayout = ({ buttonContainer, captionHelpText, captionInfoTextHighlighted, captionOtherSilver, captionSilverFeeInfoText, captionYourSilver, layout, offers0, offers1, onSilverMinusButton, onSilverPlusButton, requirementContainer, srcArrowLeft, srcArrowRight }: InventoryTradingLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 478, height: 371, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 478, top: 0, height: 371 }}>
                <Border
                    variant="102"
                    name="trade_container"
                    tintColor="#27556a"
                    layout={{ position: 'absolute', left: 0, width: 478, top: 0, height: 233 }}
                >
                    <Region
                        name="help_text"
                        layout={{ position: 'absolute', left: 8, width: 461, top: 7, height: 4, maxWidth: 461, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionHelpText ?? ''}
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                    <InventoryTradingLayoutOffers0 {...offers0} />
                    <InventoryTradingLayoutOffers1 {...offers1} />
                    <ThemeImage
                        src={layoutImage('inventory_trading_trading_split_icon.png')}
                        layout={{ position: 'absolute', left: 212, width: 53, top: 95, height: 42 }}
                        visible={false}
                    />
                    <WidgetSlot
                        widgetType="separator"
                        options={{ 'separator:vertical': 'true' }}
                        layout={{ position: 'absolute', left: 224, width: 30, top: 40, height: 160 }}
                    />
                </Border>
                <Border
                    variant="3"
                    name="silver_container"
                    tintColor="#a0ccd8"
                    layout={{ position: 'absolute', left: 0, width: 478, top: 240, height: 59 }}
                >
                    <ContainerButton
                        variant="4"
                        name="silver_minus_button"
                        onPointerTap={onSilverMinusButton}
                        layout={{ position: 'absolute', left: 11, width: 22, top: 30, height: 22 }}
                    />
                    <ContainerButton
                        variant="3"
                        name="silver_plus_button"
                        onPointerTap={onSilverPlusButton}
                        layout={{ position: 'absolute', left: 39, width: 22, top: 30, height: 22 }}
                    />
                    <ThemeImage
                        name="arrow_right"
                        src={srcArrowRight ?? layoutImage('inventory_trading_trading_silver_arrow_right.png')}
                        layout={{ position: 'absolute', left: 30, width: 156, top: 27, height: 28 }}
                    />
                    <ThemeImage
                        name="arrow_left"
                        src={srcArrowLeft ?? layoutImage('inventory_trading_trading_silver_arrow_left.png')}
                        layout={{ position: 'absolute', left: 292, width: 156, top: 27, height: 28 }}
                    />
                    <Region
                        name="silver_fee_info_text"
                        layout={{ position: 'absolute', left: 0, width: 478, top: 5, height: 16, minWidth: 478, maxWidth: 478, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionSilverFeeInfoText ?? t('inventory.trading.note_silver_fee')}
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                    <InventoryTradingLayoutRequirementContainer {...requirementContainer} />
                    <Region
                        name="your_silver"
                        layout={{ position: 'absolute', left: 97, width: 40, top: 29, height: 24, minWidth: 40, maxWidth: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionYourSilver ?? '0'}
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="other_silver"
                        layout={{ position: 'absolute', left: 342, width: 40, top: 29, height: 24, minWidth: 40, maxWidth: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionOtherSilver ?? '0'}
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </Border>
                <Border
                    variant="2"
                    name="info_border_highlighted"
                    tintColor="#fc9228"
                    layout={{ position: 'absolute', left: 5, width: 466, top: 306, height: 28 }}
                >
                    <Region
                        name="info_text_highlighted"
                        layout={{ position: 'absolute', left: 5, width: 4, top: 5, height: 4, maxWidth: 453, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionInfoTextHighlighted ?? ''} />
                    </Region>
                </Border>
                <InventoryTradingLayoutButtonContainer {...buttonContainer} />
            </Region>
        </Region>
    );
};

/** Row template `bold_text` of InventoryTradingLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingLayoutBoldTextItemProps {
    captionBoldText?: string;
    layout?: BoxLayout;
}

export const InventoryTradingLayoutBoldTextItem = ({ captionBoldText, layout }: InventoryTradingLayoutBoldTextItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="bold_text"
            layout={{ width: 127, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionBoldText ?? t('inventory.trading.you')} />
        </Region>
    );
};

/** Row template `plain_text` of InventoryTradingLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingLayoutPlainTextItemProps {
    captionPlainText?: string;
    layout?: BoxLayout;
}

export const InventoryTradingLayoutPlainTextItem = ({ captionPlainText, layout }: InventoryTradingLayoutPlainTextItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="plain_text"
            layout={{ width: 167, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionPlainText ?? t('inventory.trading.areoffering')} />
        </Region>
    );
};

/** Named region `text_list_0` of InventoryTradingLayout - configured through the parent's `textList0` prop. */
export interface InventoryTradingLayoutTextList0Props {
    itemsTextList0?: ReactNode;
    layout?: BoxLayout;
}

export const InventoryTradingLayoutTextList0 = ({ itemsTextList0, layout }: InventoryTradingLayoutTextList0Props) => {
    return (
        <Region
            name="text_list_0"
            layout={{ position: 'absolute', left: 0, right: 0, top: 2, minWidth: 10, maxWidth: 200, flexDirection: 'row', ...layout }}
        >
            {itemsTextList0 ?? (
                <>
                    <InventoryTradingLayoutBoldTextItem />
                    <InventoryTradingLayoutPlainTextItem />
                </>
            )}
        </Region>
    );
};

/** Named region `item_grid_0` of InventoryTradingLayout - configured through the parent's `itemGrid0` prop. */
export interface InventoryTradingLayoutItemGrid0Props {
    layout?: BoxLayout;
}

export const InventoryTradingLayoutItemGrid0 = ({ layout }: InventoryTradingLayoutItemGrid0Props) => {
    return (
        <Region
            name="item_grid_0"
            layout={{ position: 'absolute', left: 4, width: 132, top: 4, height: 132, flexDirection: 'row', flexWrap: 'wrap', gap: 4, ...layout }}
        >
            <Border
                variant="102"
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
            <Border
                variant="102"
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
            <Border
                variant="102"
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
            <Border
                variant="102"
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
            <Border
                variant="102"
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
            <Border
                variant="102"
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
            <Border
                variant="102"
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
            <Border
                variant="102"
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
            <Border
                variant="102"
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
        </Region>
    );
};

/** Named region `item_grid_border_0` of InventoryTradingLayout - configured through the parent's `itemGridBorder0` prop. */
export interface InventoryTradingLayoutItemGridBorder0Props {
    itemGrid0?: InventoryTradingLayoutItemGrid0Props;
    layout?: BoxLayout;
}

export const InventoryTradingLayoutItemGridBorder0 = ({ itemGrid0, layout }: InventoryTradingLayoutItemGridBorder0Props) => {
    return (
        <Region
            name="item_grid_border_0"
            layout={{ position: 'absolute', left: 32, width: 136, top: 22, height: 136, ...layout }}
        >
            <InventoryTradingLayoutItemGrid0 {...itemGrid0} />
        </Region>
    );
};

/** Named region `offers_0` of InventoryTradingLayout - configured through the parent's `offers0` prop. */
export interface InventoryTradingLayoutOffers0Props {
    captionContentText1A?: string;
    captionContentText1B?: string;
    captionInfoText0?: string;
    itemGridBorder0?: InventoryTradingLayoutItemGridBorder0Props;
    layout?: BoxLayout;
    srcLock0?: string;
    textList0?: InventoryTradingLayoutTextList0Props;
}

export const InventoryTradingLayoutOffers0 = ({ captionContentText1A, captionContentText1B, captionInfoText0, itemGridBorder0, layout, srcLock0, textList0 }: InventoryTradingLayoutOffers0Props) => {
    const t = useTranslation();

    return (
        <Region
            name="offers_0"
            layout={{ position: 'absolute', left: 17, width: 200, top: 29, height: 200, ...layout }}
        >
            <InventoryTradingLayoutTextList0 {...textList0} />
            <InventoryTradingLayoutItemGridBorder0 {...itemGridBorder0} />
            <Region
                name="info_text_0"
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
                layout={{ position: 'absolute', left: 80, width: 4, top: 162, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionContentText1A ?? ''} />
            </Region>
            <Region
                name="content_text_1_b"
                layout={{ position: 'absolute', left: 80, width: 4, top: 180, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionContentText1B ?? ''} />
            </Region>
            <ThemeImage
                name="lock_0"
                src={srcLock0 ?? layoutImage('inventory_trading_trading_unlocked_icon.png')}
                layout={{ position: 'absolute', left: 45, width: 32, top: 164, height: 34 }}
            />
        </Region>
    );
};

/** Row template `bold_text` of InventoryTradingLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingLayoutBoldTextItem2Props {
    captionBoldText?: string;
    layout?: BoxLayout;
}

export const InventoryTradingLayoutBoldTextItem2 = ({ captionBoldText, layout }: InventoryTradingLayoutBoldTextItem2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="bold_text"
            layout={{ width: 138, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionBoldText ?? t('inventory.trading.other')} />
        </Region>
    );
};

/** Row template `plain_text` of InventoryTradingLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingLayoutPlainTextItem2Props {
    captionPlainText?: string;
    layout?: BoxLayout;
}

export const InventoryTradingLayoutPlainTextItem2 = ({ captionPlainText, layout }: InventoryTradingLayoutPlainTextItem2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="plain_text"
            layout={{ width: 157, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionPlainText ?? t('inventory.trading.isoffering')} />
        </Region>
    );
};

/** Named region `text_list_1` of InventoryTradingLayout - configured through the parent's `textList1` prop. */
export interface InventoryTradingLayoutTextList1Props {
    itemsTextList1?: ReactNode;
    layout?: BoxLayout;
}

export const InventoryTradingLayoutTextList1 = ({ itemsTextList1, layout }: InventoryTradingLayoutTextList1Props) => {
    return (
        <Region
            name="text_list_1"
            layout={{ position: 'absolute', left: 0, right: 0, top: 2, minWidth: 10, maxWidth: 200, flexDirection: 'row', ...layout }}
        >
            {itemsTextList1 ?? (
                <>
                    <InventoryTradingLayoutBoldTextItem2 />
                    <InventoryTradingLayoutPlainTextItem2 />
                </>
            )}
        </Region>
    );
};

/** Named region `item_grid_1` of InventoryTradingLayout - configured through the parent's `itemGrid1` prop. */
export interface InventoryTradingLayoutItemGrid1Props {
    layout?: BoxLayout;
}

export const InventoryTradingLayoutItemGrid1 = ({ layout }: InventoryTradingLayoutItemGrid1Props) => {
    return (
        <Region
            name="item_grid_1"
            layout={{ position: 'absolute', left: 4, width: 132, top: 4, height: 132, flexDirection: 'row', flexWrap: 'wrap', gap: 4, ...layout }}
        >
            <Border
                variant="102"
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
            <Border
                variant="102"
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
            <Border
                variant="102"
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
            <Border
                variant="102"
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
            <Border
                variant="102"
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
            <Border
                variant="102"
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
            <Border
                variant="102"
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
            <Border
                variant="102"
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
            <Border
                variant="102"
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
        </Region>
    );
};

/** Named region `item_grid_border_1` of InventoryTradingLayout - configured through the parent's `itemGridBorder1` prop. */
export interface InventoryTradingLayoutItemGridBorder1Props {
    itemGrid1?: InventoryTradingLayoutItemGrid1Props;
    layout?: BoxLayout;
}

export const InventoryTradingLayoutItemGridBorder1 = ({ itemGrid1, layout }: InventoryTradingLayoutItemGridBorder1Props) => {
    return (
        <Region
            name="item_grid_border_1"
            layout={{ position: 'absolute', left: 32, width: 180, top: 22, height: 136, ...layout }}
        >
            <InventoryTradingLayoutItemGrid1 {...itemGrid1} />
        </Region>
    );
};

/** Named region `offers_1` of InventoryTradingLayout - configured through the parent's `offers1` prop. */
export interface InventoryTradingLayoutOffers1Props {
    captionContentText2A?: string;
    captionContentText2B?: string;
    captionInfoText1?: string;
    itemGridBorder1?: InventoryTradingLayoutItemGridBorder1Props;
    layout?: BoxLayout;
    srcLock1?: string;
    textList1?: InventoryTradingLayoutTextList1Props;
}

export const InventoryTradingLayoutOffers1 = ({ captionContentText2A, captionContentText2B, captionInfoText1, itemGridBorder1, layout, srcLock1, textList1 }: InventoryTradingLayoutOffers1Props) => {
    const t = useTranslation();

    return (
        <Region
            name="offers_1"
            layout={{ position: 'absolute', left: 263, width: 200, top: 29, height: 200, ...layout }}
        >
            <InventoryTradingLayoutTextList1 {...textList1} />
            <InventoryTradingLayoutItemGridBorder1 {...itemGridBorder1} />
            <Region
                name="info_text_1"
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
                layout={{ position: 'absolute', left: 80, width: 4, top: 162, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionContentText2A ?? ''} />
            </Region>
            <Region
                name="content_text_2_b"
                layout={{ position: 'absolute', left: 80, width: 4, top: 180, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionContentText2B ?? ''} />
            </Region>
            <ThemeImage
                name="lock_1"
                src={srcLock1 ?? layoutImage('inventory_trading_trading_locked_icon.png')}
                layout={{ position: 'absolute', left: 45, width: 32, top: 164, height: 34 }}
            />
        </Region>
    );
};

/** Row template `silver_progress_html` of InventoryTradingLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingLayoutSilverProgressHtmlItemProps {
    captionSilverProgressHtml?: string;
    layout?: BoxLayout;
}

export const InventoryTradingLayoutSilverProgressHtmlItem = ({ captionSilverProgressHtml, layout }: InventoryTradingLayoutSilverProgressHtmlItemProps) => {
    return (
        <Region
            name="silver_progress_html"
            layout={{ width: 32, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionSilverProgressHtml ?? '<font color="#AC232A">0</font>/10'} />
        </Region>
    );
};

/** Named region `requirement_container` of InventoryTradingLayout - configured through the parent's `requirementContainer` prop. */
export interface InventoryTradingLayoutRequirementContainerProps {
    itemsRequirementContainer?: ReactNode;
    layout?: BoxLayout;
}

export const InventoryTradingLayoutRequirementContainer = ({ itemsRequirementContainer, layout }: InventoryTradingLayoutRequirementContainerProps) => {
    return (
        <Region
            name="requirement_container"
            layout={{ position: 'absolute', left: 212, right: 205, top: 29, minHeight: 25, maxHeight: 25, flexDirection: 'row', gap: 5, ...layout }}
        >
            {itemsRequirementContainer ?? (
                <InventoryTradingLayoutSilverProgressHtmlItem />
            )}
            <ThemeImage
                src={layoutImage('pursearea_mid_silver_icon.png')}
                layout={{ width: 24, height: 24, flexShrink: 0 }}
            />
        </Region>
    );
};

/** Named region `button_container` of InventoryTradingLayout - configured through the parent's `buttonContainer` prop. */
export interface InventoryTradingLayoutButtonContainerProps {
    layout?: BoxLayout;
    onButtonAccept?: () => void;
    onButtonCancel?: () => void;
}

export const InventoryTradingLayoutButtonContainer = ({ layout, onButtonAccept, onButtonCancel }: InventoryTradingLayoutButtonContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="button_container"
            layout={{ position: 'absolute', left: 0, width: 478, top: 341, height: 32, ...layout }}
        >
            <Button
                variant="3"
                name="button_accept"
                onPointerTap={onButtonAccept}
                layout={{ position: 'absolute', left: 5, width: 157, top: 0, height: 28 }}
            >
                {t('inventory.trading.accept')}
            </Button>
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
