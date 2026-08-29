import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Region, ThemeText } from '#base/theme';

/** Generated from `1415_buy_marketplace_tokens_xml` (layout "buy_marketplace_tokens", 283x175) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BuyMarketplaceTokensLayoutProps {
    layout?: BoxLayout;
    onBuyTokensButton?: () => void;
    onCancelBuyTokensButton?: () => void;
    onClose?: () => void;
}

export const BuyMarketplaceTokensLayout = ({ layout, onBuyTokensButton, onCancelBuyTokensButton, onClose }: BuyMarketplaceTokensLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('inventory.marketplace.buy_tokens.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 283, height: 175, minWidth: 283, minHeight: 175, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: -5 }}>
                <Region layout={{ position: 'absolute', left: 6, width: 255, top: 6, height: 69, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('inventory.marketplace.buy_tokens.info')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 255 }}
                    />
                </Region>
                <Button
                    variant="6"
                    name="buy_tokens_button"
                    tintColor="#00aa00"
                    onPointerTap={onBuyTokensButton}
                    layout={{ position: 'absolute', left: 9, width: 157, top: 107, height: 28 }}
                >
                    {t('inventory.marketplace.buy_tokens.buy')}
                </Button>
                <Button
                    variant="3"
                    name="cancel_buy_tokens_button"
                    onPointerTap={onCancelBuyTokensButton}
                    layout={{ position: 'absolute', right: 10, width: 56, top: 106, height: 28 }}
                >
                    {t('inventory.marketplace.buy_tokens.cancel')}
                </Button>
            </Region>
        </Frame>
    );
};
