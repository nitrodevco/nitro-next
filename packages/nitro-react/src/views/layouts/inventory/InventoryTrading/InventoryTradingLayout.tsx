import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ContainerButton, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { InventoryTradingLayoutOffers0, InventoryTradingLayoutOffers0Props } from './InventoryTradingLayoutOffers0';
import { InventoryTradingLayoutOffers1, InventoryTradingLayoutOffers1Props } from './InventoryTradingLayoutOffers1';
import { InventoryTradingLayoutSilverProgressHtmlItem } from './InventoryTradingLayoutSilverProgressHtmlItem';

/** Generated from `1388_inventory_trading_xml` (layout "inventory_trading", 478x371) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface InventoryTradingLayoutProps {
    captionHelpText?: string;
    captionInfoTextHighlighted?: string;
    captionOtherSilver?: string;
    captionSilverFeeInfoText?: string;
    captionYourSilver?: string;
    itemsRequirementContainer?: ReactNode;
    layout?: BoxLayout;
    offers0?: InventoryTradingLayoutOffers0Props;
    offers1?: InventoryTradingLayoutOffers1Props;
    onButtonAccept?: () => void;
    onButtonCancel?: () => void;
    onSilverMinusButton?: () => void;
    onSilverPlusButton?: () => void;
    separatorWidget?: ReactNode;
    srcArrowLeft?: string;
    srcArrowRight?: string;
}

export const InventoryTradingLayout = ({ captionHelpText, captionInfoTextHighlighted, captionOtherSilver, captionSilverFeeInfoText, captionYourSilver, itemsRequirementContainer, layout, offers0, offers1, onButtonAccept, onButtonCancel, onSilverMinusButton, onSilverPlusButton, separatorWidget, srcArrowLeft, srcArrowRight }: InventoryTradingLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 478, height: 371, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <Border
                    variant="102"
                    name="trade_container"
                    tintColor="#27556a"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 233 }}
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
                    {/* `static_bitmap` is hidden and has no name to show it by */}
                    <WidgetSlot
                        widgetType="separator"
                        options={{ 'separator:vertical': 'true' }}
                        layout={{ position: 'absolute', left: 224, width: 30, top: 40, height: 160 }}
                    >
                        {separatorWidget}
                    </WidgetSlot>
                </Border>
                <Border
                    variant="3"
                    name="silver_container"
                    tintColor="#a0ccd8"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 240, height: 59 }}
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
                    <ThemeText
                        text={captionSilverFeeInfoText ?? t('inventory.trading.note_silver_fee')}
                        textOptions={{ align: 'center' }}
                        name="silver_fee_info_text"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 5, height: 16, minWidth: 478, maxWidth: 478 }}
                    />
                    <Region
                        name="requirement_container"
                        layout={{ position: 'absolute', left: 212, right: 205, top: 29, minHeight: 25, maxHeight: 25, flexDirection: 'row', gap: 5 }}
                    >
                        {itemsRequirementContainer ?? (
                            <InventoryTradingLayoutSilverProgressHtmlItem />
                        )}
                        <ThemeImage
                            src={layoutImage('pursearea_mid_silver_icon.png')}
                            layout={{ width: 24, height: 24, flexShrink: 0 }}
                        />
                    </Region>
                    <ThemeText
                        text={captionYourSilver ?? '0'}
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                        name="your_silver"
                        layout={{ position: 'absolute', left: 97, width: 40, top: 29, height: 24, minWidth: 40, maxWidth: 40 }}
                    />
                    <ThemeText
                        text={captionOtherSilver ?? '0'}
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                        name="other_silver"
                        layout={{ position: 'absolute', left: 342, width: 40, top: 29, height: 24, minWidth: 40, maxWidth: 40 }}
                    />
                </Border>
                <Border
                    variant="2"
                    name="info_border_highlighted"
                    tintColor="#fc9228"
                    layout={{ position: 'absolute', left: 5, width: 466, top: 306, height: 28 }}
                >
                    <ThemeText
                        text={captionInfoTextHighlighted ?? ''}
                        name="info_text_highlighted"
                        layout={{ position: 'absolute', left: 5, width: 4, top: 5, height: 4, maxWidth: 453 }}
                    />
                </Border>
                <Region
                    name="button_container"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 341, height: 32 }}
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
            </Region>
        </Region>
    );
};
