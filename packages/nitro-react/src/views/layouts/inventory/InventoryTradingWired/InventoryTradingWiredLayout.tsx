import { useTranslation } from '#base/context';
import { Border, BoxLayout, Bubble, Button, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { InventoryTradingWiredLayoutBubbleContents, InventoryTradingWiredLayoutBubbleContentsProps } from './InventoryTradingWiredLayoutBubbleContents';
import { InventoryTradingWiredLayoutOffers0, InventoryTradingWiredLayoutOffers0Props } from './InventoryTradingWiredLayoutOffers0';
import { InventoryTradingWiredLayoutOffers1, InventoryTradingWiredLayoutOffers1Props } from './InventoryTradingWiredLayoutOffers1';

/** Generated from `1337_inventory_trading_wired_xml` (layout "inventory_trading_wired", 478x274) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface InventoryTradingWiredLayoutProps {
    bubbleContents?: InventoryTradingWiredLayoutBubbleContentsProps;
    captionInfoText?: string;
    captionSecondsLeftText?: string;
    layout?: BoxLayout;
    offers0?: InventoryTradingWiredLayoutOffers0Props;
    offers1?: InventoryTradingWiredLayoutOffers1Props;
    onButtonAccept?: () => void;
    onButtonCancel?: () => void;
    onRequirementsButton?: () => void;
    srcLock0?: string;
    srcPaymentLayoutImage?: string;
    srcTradeTypeSplitter?: string;
    visibleOffers1PaymentPlaceholder?: boolean;
    visibleTradeRequirementsBubble?: boolean;
}

export const InventoryTradingWiredLayout = ({ bubbleContents, captionInfoText, captionSecondsLeftText, layout, offers0, offers1, onButtonAccept, onButtonCancel, onRequirementsButton, srcLock0, srcPaymentLayoutImage, srcTradeTypeSplitter, visibleOffers1PaymentPlaceholder, visibleTradeRequirementsBubble }: InventoryTradingWiredLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 478, height: 274, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <Border
                    variant="102"
                    name="trade_container"
                    tintColor="#27556a"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 233 }}
                >
                    <Region
                        name="info_text"
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
                        src={srcLock0 ?? layoutImage('inventory_trading_trading_unlocked_icon.png')}
                        layout={{ position: 'absolute', left: 223, width: 32, top: 192, height: 34 }}
                    />
                    <InventoryTradingWiredLayoutOffers1 {...offers1} />
                    {(visibleOffers1PaymentPlaceholder ?? false) && (
                        <Region
                            name="offers_1_payment_placeholder"
                            layout={{ position: 'absolute', left: 263, width: 200, top: 29, height: 200, justifyContent: 'center' }}
                        >
                            <ThemeImage
                                name="payment_layout_image"
                                src={srcPaymentLayoutImage ?? layoutImage('wired_chests_images_generic_payments.png')}
                                layout={{ position: 'absolute', marginLeft: 5, marginRight: -5, width: 170, alignSelf: 'center', marginTop: -4.5, marginBottom: 4.5, height: 173 }}
                            />
                        </Region>
                    )}
                    <ThemeImage
                        name="trade_type_splitter"
                        src={srcTradeTypeSplitter ?? layoutImage('inventory_trading_trading_split_icon.png')}
                        layout={{ position: 'absolute', left: 212, width: 53, top: 95, height: 42 }}
                    />
                    {/* `widget` is hidden and has no name to show it by */}
                    <Region
                        name="requirements_button"
                        onPointerTap={onRequirementsButton}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 453, width: 18, top: 6, height: 18 }}
                    >
                        <ThemeImage
                            src={layoutImage('icons_info_grey.png')}
                            layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 18 }}
                        />
                    </Region>
                    {(visibleTradeRequirementsBubble ?? true) && (
                        <Bubble
                            variant="7"
                            name="trade_requirements_bubble"
                            pointer="left"
                            layout={{ position: 'absolute', left: 475, width: 430, top: 9, height: 281 }}
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
                    )}
                </Border>
                <Region
                    name="button_container"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 240, height: 32 }}
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
            </Region>
        </Region>
    );
};
