import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `additional_text` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutAdditionalTextItemProps {
    captionAdditionalText?: string;
    layout?: BoxLayout;
    visibleAdditionalText?: boolean;
}

export const InventoryTradingWiredLayoutAdditionalTextItem = ({ captionAdditionalText, layout, visibleAdditionalText }: InventoryTradingWiredLayoutAdditionalTextItemProps) => {
    const t = useTranslation();

    return (
        (visibleAdditionalText ?? false) && (
            <Region
                name="additional_text"
                layout={{ width: 390, height: 32, flexShrink: 0, minWidth: 220, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
            >
                <ThemeText
                    text={captionAdditionalText ?? t('inventory.wired_trading.requirements.auto_mode_hint_trade')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 390 }}
                />
            </Region>
        )
    );
};
