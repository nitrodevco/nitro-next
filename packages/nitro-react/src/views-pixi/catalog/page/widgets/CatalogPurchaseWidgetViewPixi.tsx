import { useCatalogActions, useCatalogSelectors, useTranslation } from '#base/context';
import { Border, Box, Button, ButtonThick, getPixiTextStyle } from '#base/theme-pixi';

/** Pixi port of views/catalog/page/widgets/CatalogPurchaseWidgetView.tsx. */
export const CatalogPurchaseWidgetViewPixi = () => {
    const { activeOffer, purchaseOptions } = useCatalogSelectors();
    const { setActivePurchase } = useCatalogActions();
    const t = useTranslation();

    const purchase = () => {
        setActivePurchase({ ...purchaseOptions, offer: activeOffer });
    };

    return (
        <Box layout={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', gap: 8 }}>
            {!activeOffer && (
                <Border variant="6" blend={0.5} layout={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', height: 30 }}>
                    <pixiText layout={{}} text={t('catalog.purchase.select.info')} style={getPixiTextStyle('text-style-headline-small', { fill: '#666666' })} />
                </Border>
            )}
            {activeOffer && (
                <>
                    <Button variant="3" disabled={purchaseOptions.quantity > 1 || !activeOffer.giftable} layout={{ width: '100%' }}>
                        {t('catalog.purchase_confirmation.gift')}
                    </Button>
                    <ButtonThick variant="3" tintColor="#00aa00" textColor="#ffffff" onPress={purchase} layout={{ width: '100%' }}>
                        {t('catalog.purchase_confirmation.buy')}
                    </ButtonThick>
                </>
            )}
        </Box>
    );
};
