import { CatalogPricingTypeEnum } from '@nitrodevco/nitro-api';
import { PurchaseFromCatalogComposer, PurchaseOKMessage } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useCatalogActions, useCatalogSelectors, useTranslation, useWebSocketContext } from '#base/context';
import { useCatalogOfferActions, useMessageListener } from '#base/hooks';
import { Border, Box, Button, ButtonThick, Frame, NitroCurrencyIcon, ThemeText } from '#base/theme';

import { CatalogOfferImageView } from './CatalogOfferImageView';

type PurchaseState = 'busy' | 'none';

/** Pixi port of views/catalog/CatalogPurchaseConfirmationView.tsx. */
export const CatalogPurchaseConfirmationView = () => {
    const [ purchaseState, setPurchaseState ] = useState<PurchaseState>('none');
    const { activePurchase } = useCatalogSelectors();
    const { setActivePurchase } = useCatalogActions();
    const { getOfferProduct } = useCatalogOfferActions();
    const { send } = useWebSocketContext();
    const t = useTranslation();

    useMessageListener(PurchaseOKMessage, (data) => {
        if (!activePurchase?.offer || !data.offer || data.offer.id !== activePurchase.offer.offerId) return;

        setPurchaseState('none');
        setActivePurchase(undefined);
    });

    if (!activePurchase?.offer) return null;

    const { offer, quantity, extraData } = activePurchase;
    const product = getOfferProduct(offer);

    if (!product) return null;

    const purchase = () => {
        setPurchaseState('busy');

        send(new PurchaseFromCatalogComposer({
            pageId: offer.page?.pageId ?? -1,
            offerId: offer.offerId,
            extraParam: extraData,
            quantity,
        }));
    };

    const cancelPurchase = () => {
        setActivePurchase(undefined);
    };

    return (
        <Frame
            id="catalog-purchase-confirmation"
            variant="3"
            layout={{ position: 'absolute', top: 20, left: 480, width: 325, height: 240 }}
            caption={t('catalog.purchase_confirmation.title')}
            onClose={cancelPurchase}
        >
            <Box layout={{ flexDirection: 'column', alignItems: 'center', padding: 8, gap: 8, width: '100%', height: '100%' }}>
                <Box layout={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%' }}>
                    <Border
                        variant="0"
                        layout={{ width: 126, height: 152, justifyContent: 'center', alignItems: 'center' }}
                    >
                        <CatalogOfferImageView offer={offer} />
                    </Border>
                    <Box layout={{ flexDirection: 'column', flexGrow: 1, height: '100%', justifyContent: 'center', gap: 4 }}>
                        <ThemeText
                            text={product.productData?.name ?? t(offer.localizationId)}
                            textStyle="text-style-headline-small"
                            textOptions={{ fill: '#000000' }}
                        />
                        {quantity > 1 && (
                            <ThemeText
                                text={`X ${quantity}`}
                                textStyle="text-style-headline-small"
                                textOptions={{ fill: '#000000' }}
                            />
                        )}
                        <Box layout={{ flexDirection: 'row', alignItems: 'center', gap: 4, width: '100%' }}>
                            <ThemeText
                                text={t('catalog.purchase.confirmation.dialog.cost')}
                                textStyle="text-style-u-regular"
                                textOptions={{ fill: '#000000' }}
                            />
                            <Box layout={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                {(offer.pricingType === CatalogPricingTypeEnum.Credits || offer.pricingType === CatalogPricingTypeEnum.CreditsActivityPoints) && (
                                    <Box layout={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
                                        <ThemeText
                                            text={String(offer.priceInCredits)}
                                            textStyle="text-style-headline-small"
                                            textOptions={{ fill: '#000000' }}
                                        />
                                        <NitroCurrencyIcon
                                            type="-1"
                                            layout={{}}
                                        />
                                    </Box>
                                )}
                                {offer.pricingType === CatalogPricingTypeEnum.CreditsActivityPoints && (
                                    <Box layout={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
                                        <ThemeText
                                            text="+"
                                            textStyle="text-style-headline-small"
                                            textOptions={{ fill: '#000000' }}
                                        />
                                        <Box layout={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                            <ThemeText
                                                text={String(offer.priceInActivityPoints)}
                                                textStyle="text-style-headline-small"
                                                textOptions={{ fill: '#000000' }}
                                            />
                                            <NitroCurrencyIcon
                                                type={offer.activityPointType.toString()}
                                                layout={{}}
                                            />
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box layout={{ flexDirection: 'row', gap: 8, width: '100%', height: '100%' }}>
                    <Button
                        variant="3"
                        onPress={cancelPurchase}
                        layout={{ width: '100%' }}
                    >
                        {t('catalog.purchase_confirmation.cancel')}
                    </Button>
                    <ButtonThick
                        variant="3"
                        tintColor="#00aa00"
                        textColor="#ffffff"
                        onPress={purchase}
                        disabled={purchaseState === 'busy'}
                        layout={{ width: '100%' }}
                    >
                        {t('catalog.purchase_confirmation.buy')}
                    </ButtonThick>
                </Box>
            </Box>
        </Frame>
    );
};
