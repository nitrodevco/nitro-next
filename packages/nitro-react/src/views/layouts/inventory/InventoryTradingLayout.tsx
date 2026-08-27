import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ContainerButton, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1388_inventory_trading_xml` (layout "inventory_trading", 478x371) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface InventoryTradingLayoutProps {
    captionContentText1A?: string;
    captionContentText1B?: string;
    captionContentText2A?: string;
    captionContentText2B?: string;
    captionHelpText?: string;
    captionInfoText0?: string;
    captionInfoText1?: string;
    captionInfoTextHighlighted?: string;
    captionOtherSilver?: string;
    captionSilverFeeInfoText?: string;
    captionYourSilver?: string;
    itemsRequirementContainer?: ReactNode;
    itemsTextList0?: ReactNode;
    itemsTextList1?: ReactNode;
    layout?: BoxLayout;
    onButtonAccept?: () => void;
    onButtonCancel?: () => void;
    onSilverMinusButton?: () => void;
    onSilverPlusButton?: () => void;
    srcArrowLeft?: string;
    srcArrowRight?: string;
    srcLock0?: string;
    srcLock1?: string;
}

export const InventoryTradingLayout = ({ captionContentText1A, captionContentText1B, captionContentText2A, captionContentText2B, captionHelpText, captionInfoText0, captionInfoText1, captionInfoTextHighlighted, captionOtherSilver, captionSilverFeeInfoText, captionYourSilver, itemsRequirementContainer, itemsTextList0, itemsTextList1, layout, onButtonAccept, onButtonCancel, onSilverMinusButton, onSilverPlusButton, srcArrowLeft, srcArrowRight, srcLock0, srcLock1 }: InventoryTradingLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 478, height: 371, ...layout }}>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 478, top: 0, height: 371 }}
            >
                <Border
                    variant="102"
                    name="trade_container"
                    params={17}
                    tintColor="#27556a"
                    layout={{ position: 'absolute', left: 0, width: 478, top: 0, height: 233 }}
                >
                    <Region
                        name="help_text"
                        tags={[ 'HELP_TEXT' ]}
                        params={16400}
                        layout={{ position: 'absolute', left: 8, width: 461, top: 7, height: 4, maxWidth: 461, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionHelpText ?? ''}
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
                            layout={{ position: 'absolute', left: 0, right: 0, top: 2, minWidth: 10, maxWidth: 200, flexDirection: 'row' }}
                        >
                            {itemsTextList0 ?? (
                                <>
                                    <InventoryTradingLayoutBoldTextItem />
                                    <InventoryTradingLayoutPlainTextItem />
                                </>
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
                            layout={{ position: 'absolute', left: 80, width: 4, top: 162, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={captionContentText1A ?? ''} />
                        </Region>
                        <Region
                            name="content_text_1_b"
                            params={16}
                            layout={{ position: 'absolute', left: 80, width: 4, top: 180, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={captionContentText1B ?? ''} />
                        </Region>
                        <ThemeImage
                            name="lock_0"
                            tags={[ 'OWN_USER_LOCK' ]}
                            params={16}
                            src={srcLock0 ?? layoutImage('inventory_trading_trading_unlocked_icon.png')}
                            layout={{ position: 'absolute', left: 45, width: 32, top: 164, height: 34 }}
                        />
                    </Region>
                    <Region
                        name="offers_1"
                        params={16}
                        layout={{ position: 'absolute', left: 263, width: 200, top: 29, height: 200 }}
                    >
                        <Region
                            name="text_list_1"
                            params={934033}
                            layout={{ position: 'absolute', left: 0, right: 0, top: 2, minWidth: 10, maxWidth: 200, flexDirection: 'row' }}
                        >
                            {itemsTextList1 ?? (
                                <>
                                    <InventoryTradingLayoutBoldTextItem2 />
                                    <InventoryTradingLayoutPlainTextItem2 />
                                </>
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
                            layout={{ position: 'absolute', left: 80, width: 4, top: 162, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={captionContentText2A ?? ''} />
                        </Region>
                        <Region
                            name="content_text_2_b"
                            params={16}
                            layout={{ position: 'absolute', left: 80, width: 4, top: 180, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={captionContentText2B ?? ''} />
                        </Region>
                        <ThemeImage
                            name="lock_1"
                            tags={[ 'OTHER_USER_LOCK' ]}
                            params={16}
                            src={srcLock1 ?? layoutImage('inventory_trading_trading_locked_icon.png')}
                            layout={{ position: 'absolute', left: 45, width: 32, top: 164, height: 34 }}
                        />
                    </Region>
                    <Region
                        visible={false}
                        layout={{ position: 'absolute', left: 212, width: 53, top: 95, height: 42 }}
                    >
                        <ThemeImage
                            params={16}
                            src={layoutImage('inventory_trading_trading_split_icon.png')}
                            layout={{ position: 'absolute', left: 212, width: 53, top: 95, height: 42 }}
                        />
                    </Region>
                    <WidgetSlot
                        widgetType="separator"
                        params={16}
                        options={{ 'separator:vertical': 'true' }}
                        layout={{ position: 'absolute', left: 224, width: 30, top: 40, height: 160 }}
                    />
                </Border>
                <Border
                    variant="3"
                    name="silver_container"
                    params={16}
                    tintColor="#a0ccd8"
                    layout={{ position: 'absolute', left: 0, width: 478, top: 240, height: 59 }}
                >
                    <ContainerButton
                        variant="4"
                        name="silver_minus_button"
                        params={17}
                        onPointerTap={onSilverMinusButton}
                        layout={{ position: 'absolute', left: 11, width: 22, top: 30, height: 22 }}
                    />
                    <ContainerButton
                        variant="3"
                        name="silver_plus_button"
                        params={17}
                        onPointerTap={onSilverPlusButton}
                        layout={{ position: 'absolute', left: 39, width: 22, top: 30, height: 22 }}
                    />
                    <ThemeImage
                        name="arrow_right"
                        params={16}
                        src={srcArrowRight ?? layoutImage('inventory_trading_trading_silver_arrow_right.png')}
                        layout={{ position: 'absolute', left: 30, width: 156, top: 27, height: 28 }}
                    />
                    <ThemeImage
                        name="arrow_left"
                        params={16}
                        src={srcArrowLeft ?? layoutImage('inventory_trading_trading_silver_arrow_left.png')}
                        layout={{ position: 'absolute', left: 292, width: 156, top: 27, height: 28 }}
                    />
                    <Region
                        name="silver_fee_info_text"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 478, top: 5, height: 16, minWidth: 478, maxWidth: 478, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionSilverFeeInfoText ?? t('inventory.trading.note_silver_fee')}
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="requirement_container"
                        params={409744}
                        layout={{ position: 'absolute', left: 212, right: 205, top: 29, minHeight: 25, maxHeight: 25, flexDirection: 'row', gap: 5 }}
                    >
                        {itemsRequirementContainer ?? (
                            <InventoryTradingLayoutSilverProgressHtmlItem />
                        )}
                        <ThemeImage
                            params={16}
                            src={layoutImage('pursearea_mid_silver_icon.png')}
                            layout={{ width: 24, height: 24, flexShrink: 0 }}
                        />
                    </Region>
                    <Region
                        name="your_silver"
                        params={16}
                        layout={{ position: 'absolute', left: 97, width: 40, top: 29, height: 24, minWidth: 40, maxWidth: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionYourSilver ?? '0'}
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="other_silver"
                        params={16}
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
                    params={16}
                    tintColor="#fc9228"
                    layout={{ position: 'absolute', left: 5, width: 466, top: 306, height: 28 }}
                >
                    <Region
                        name="info_text_highlighted"
                        params={16}
                        layout={{ position: 'absolute', left: 5, width: 4, top: 5, height: 4, maxWidth: 453, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionInfoTextHighlighted ?? ''} />
                    </Region>
                </Border>
                <Region
                    name="button_container"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 478, top: 341, height: 32 }}
                >
                    <Button
                        variant="3"
                        name="button_accept"
                        params={131089}
                        onPointerTap={onButtonAccept}
                        layout={{ position: 'absolute', left: 5, width: 157, top: 0, height: 28 }}
                    >
                        {t('inventory.trading.accept')}
                    </Button>
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
            tags={[ 'OWN_USER_NAME' ]}
            params={16}
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
            params={16}
            layout={{ width: 167, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionPlainText ?? t('inventory.trading.areoffering')} />
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
            tags={[ 'OTHER_USER_NAME' ]}
            params={16}
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
            params={16}
            layout={{ width: 157, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionPlainText ?? t('inventory.trading.isoffering')} />
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
            params={1}
            layout={{ width: 32, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionSilverProgressHtml ?? '<font color="#AC232A">0</font>/10'} />
        </Region>
    );
};
