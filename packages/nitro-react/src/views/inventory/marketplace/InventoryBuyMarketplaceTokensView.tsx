import { buyMarketplaceTokens, releaseMarketplaceOfferItems } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useInventoryMarketplaceActions } from '#base/context/inventory';
import { useTranslation } from '#base/context/system';
import { Button, Frame, ThemeText } from '#base/theme';

interface InventoryBuyMarketplaceTokensViewProps {
    price: number;
    count: number;
}

/**
 * `buy_marketplace_tokens` - Flash's `MarketplaceView.showBuyTokens` (283x175, style 3 frame in
 * `0x418db0`, margins 6/30/6/6): `inventory.marketplace.buy_tokens.info` with the batch's price,
 * its size and how many of those are free (`count - 1`), the green style 6 buy button (its price in
 * `buy_tokens.buy`) and cancel. Buying sends `BuyMarketplaceTokensMessageComposer` and keeps the
 * offer waiting (a not-enough-credits answer gives it up); cancel and the close button release it.
 */
export const InventoryBuyMarketplaceTokensView = ({ price, count }: InventoryBuyMarketplaceTokensViewProps) => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const { setMarketplaceView } = useInventoryMarketplaceActions();

    const cancel = () => {
        releaseMarketplaceOfferItems();
        setMarketplaceView(undefined);
    };

    const buy = () => {
        buyMarketplaceTokens(send);
        setMarketplaceView(undefined);
    };

    return (
        <Frame
            id="inventory-buy-marketplace-tokens"
            variant="3"
            centered
            rememberPosition={false}
            caption={t('inventory.marketplace.buy_tokens.title')}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            resizeDirection="none"
            margins={[ 6, 30, 6, 6 ]}
            onClose={cancel}
            layout={{ position: 'absolute', width: 283, height: 175 }}
        >
            <ThemeText
                text={t('inventory.marketplace.buy_tokens.info', '', { price: String(price), count: String(count), free: String(count - 1) })}
                textStyle="u_regular"
                textOptions={{ wordWrap: true, wordWrapWidth: 251 }}
                verticalAlign="top"
                layout={{ position: 'absolute', left: 6, width: 255, top: 6 }}
            />
            <Button
                variant="6"
                name="buy_tokens_button"
                tintColor="#00aa00"
                onPointerTap={buy}
                layout={{ position: 'absolute', left: 9, width: 157, top: 107, height: 28 }}
            >
                {t('inventory.marketplace.buy_tokens.buy', '', { price: String(price) })}
            </Button>
            <Button
                variant="3"
                name="cancel_buy_tokens_button"
                onPointerTap={cancel}
                layout={{ position: 'absolute', left: 205, width: 56, top: 106, height: 28 }}
            >
                {t('inventory.marketplace.buy_tokens.cancel')}
            </Button>
        </Frame>
    );
};
