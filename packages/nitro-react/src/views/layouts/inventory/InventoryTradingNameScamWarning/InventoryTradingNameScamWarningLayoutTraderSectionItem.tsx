import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ThemeText, WidgetSlot } from '#base/theme';

/** Row template `trader_section` of InventoryTradingNameScamWarningLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingNameScamWarningLayoutTraderSectionItemProps {
    captionTraderLabel?: string;
    captionTraderNameText?: string;
    layout?: BoxLayout;
    onOpenProfileButton?: () => void;
    traderAvatar?: ReactNode;
    visibleOpenProfileButton?: boolean;
    visibleTraderAvatar?: boolean;
    visibleTraderLabel?: boolean;
    visibleTraderNameText?: boolean;
}

export const InventoryTradingNameScamWarningLayoutTraderSectionItem = ({ captionTraderLabel, captionTraderNameText, layout, onOpenProfileButton, traderAvatar, visibleOpenProfileButton, visibleTraderAvatar, visibleTraderLabel, visibleTraderNameText }: InventoryTradingNameScamWarningLayoutTraderSectionItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="4"
            name="trader_section"
            tintColor="#f1f1f1"
            layout={{ width: 330, height: 58, flexShrink: 0, ...layout }}
        >
            {(visibleTraderAvatar ?? true) && (
                <WidgetSlot
                    widgetType="avatar_image"
                    name="trader_avatar"
                    options={{ 'avatar_image:only_head': 'true' }}
                    layout={{ position: 'absolute', left: -10, width: 90, top: -24, height: 130 }}
                >
                    {traderAvatar}
                </WidgetSlot>
            )}
            {(visibleTraderLabel ?? true) && (
                <ThemeText
                    text={captionTraderLabel ?? t('inventory.trading.namescam.trader')}
                    textOptions={{ fill: '#555555' }}
                    name="trader_label"
                    layout={{ position: 'absolute', left: 63, width: 72, top: 11, height: 17 }}
                />
            )}
            {(visibleTraderNameText ?? true) && (
                <ThemeText
                    text={captionTraderNameText ?? 'Habbo'}
                    name="trader_name_text"
                    layout={{ position: 'absolute', left: 63, width: 44, top: 29, height: 18 }}
                />
            )}
            {(visibleOpenProfileButton ?? true) && (
                <Button
                    variant="3"
                    name="open_profile_button"
                    onPointerTap={onOpenProfileButton}
                    textStyle="text-style-button-shiny-regular"
                    layout={{ position: 'absolute', right: 16, width: 90, top: 16, height: 26 }}
                >
                    {t('inventory.trading.namescam.open_profile')}
                </Button>
            )}
        </Border>
    );
};
