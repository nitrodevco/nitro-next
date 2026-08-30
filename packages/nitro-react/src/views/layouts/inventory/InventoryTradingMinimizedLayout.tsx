import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1316_inventory_trading_minimized_xml` (layout "inventory_trading_minimized", 478x68) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface InventoryTradingMinimizedLayoutProps {
    captionHelpText?: string;
    layout?: BoxLayout;
    onButtonCancel?: () => void;
    onButtonContinue?: () => void;
}

export const InventoryTradingMinimizedLayout = ({ captionHelpText, layout, onButtonCancel, onButtonContinue }: InventoryTradingMinimizedLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 478, height: 68, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <Border
                    variant="102"
                    tintColor="#27556a"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                <Button
                    variant="3"
                    name="button_continue"
                    onPointerTap={onButtonContinue}
                    layout={{ position: 'absolute', left: 7, width: 70, bottom: 4, height: 28 }}
                >
                    {t('inventory.trading.minimized.continue_trade')}
                </Button>
                <Button
                    variant="3"
                    name="button_cancel"
                    onPointerTap={onButtonCancel}
                    layout={{ position: 'absolute', right: 10, width: 56, bottom: 4, height: 28 }}
                >
                    {t('generic.cancel')}
                </Button>
                <ThemeText
                    text={captionHelpText ?? t('inventory.trading.minimized.trade_in_progress')}
                    textStyle="text-style-u-headline-big"
                    textOptions={{ wordWrap: true, wordWrapWidth: 421 }}
                    name="help_text"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 42, width: 421, top: 8, height: 24 }}
                />
                <ThemeImage
                    src={layoutImage('icons_panic.png')}
                    layout={{ position: 'absolute', left: 11, width: 30, top: 6, height: 30 }}
                />
            </Region>
        </Region>
    );
};
