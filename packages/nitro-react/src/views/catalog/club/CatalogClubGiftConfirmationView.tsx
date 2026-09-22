/**
 * Picking a club gift - Flash's `ClubGiftConfirmationDialog`, drawn from `club_gift_confirmation.xml`
 * (280x142, style 3 frame in `0x418db0`, margins 6/25/6/7): the gift's icon in the `0xf1f1f1`
 * `image_border` (its product container's icon, `useClubGiftIcon`, with the multi counter for a
 * multi offer; the `bundleCounter` text has no caption and draws nothing), its product name in
 * `item_name`, and the select and cancel buttons, 8 above the
 * bottom. Select is `ClubGiftController.confirmSelection` (`SelectClubGiftComposer` with the
 * offer's product code, one gift fewer), the close and cancel `closeConfirmation`.
 */
import { IPurchasableOffer } from '@nitrodevco/nitro-api';

import { confirmClubGift } from '#base/commands';
import { useCatalogClubActions, useCatalogStore, useCatalogStoreApi } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation } from '#base/context/system';
import { Border, Button, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { getOfferProduct } from '#base/utils';

import { CatalogProductIconView } from '../CatalogProductIconView';
import { useClubGiftIcon } from './useClubGiftIcon';

const ClubGiftDialog = ({ offer }: { offer: IPurchasableOffer }) => {
    const { setClubGiftConfirmation } = useCatalogClubActions();
    const store = useCatalogStoreApi();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const { bundleIcon, product, multiCount } = useClubGiftIcon(offer);
    const close = () => setClubGiftConfirmation(undefined);

    return (
        <Frame
            id="club-gift-confirmation"
            variant="3"
            centered
            rememberPosition={false}
            caption={t('catalog.club_gift.confirm')}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            resizeDirection="none"
            margins={[ 6, 25, 6, 7 ]}
            onClose={close}
            layout={{ position: 'absolute', width: 280, height: 142 }}
        >
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <Border
                    variant="0"
                    name="image_border"
                    tintColor="#f1f1f1"
                    layout={{ position: 'absolute', left: 12, width: 48, top: 12, height: 48 }}
                >
                    {bundleIcon && (
                        <ThemeImage
                            name="image"
                            src={bundleIcon}
                            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                            layout={{ position: 'absolute', left: 1, width: 46, top: 1, height: 46 }}
                        />
                    )}
                    {product && (
                        <Region layout={{ position: 'absolute', left: 1, width: 46, top: 1, height: 46 }}>
                            <CatalogProductIconView
                                product={product}
                                width={46}
                                height={46}
                            />
                        </Region>
                    )}
                    {(multiCount !== undefined) && (
                        <Border
                            variant="2"
                            name="multiContainer"
                            tintColor="#ff3300"
                            layout={{ position: 'absolute', left: 10, minWidth: 17, top: 2, minHeight: 13 }}
                        >
                            <ThemeText
                                name="multiCounter"
                                text={`x${multiCount}`}
                                textStyle="u_regular"
                                textOptions={{ fill: '#cccc66' }}
                                verticalAlign="top"
                                layout={{ marginLeft: 3 }}
                            />
                        </Border>
                    )}
                </Border>
                <ThemeText
                    name="item_name"
                    text={getOfferProduct(offer)?.productData?.name ?? ''}
                    textStyle="u_regular"
                    clip
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 69, width: 184, top: 29, height: 17 }}
                />
                <Button
                    variant="3"
                    name="select_button"
                    onPointerTap={() => confirmClubGift(send, store)}
                    layout={{ position: 'absolute', left: 9, width: 120, bottom: 8, height: 25 }}
                >
                    {t('catalog.club_gift.select')}
                </Button>
                <Button
                    variant="3"
                    name="cancel_button"
                    onPointerTap={close}
                    layout={{ position: 'absolute', left: 137, width: 120, bottom: 8, height: 25 }}
                >
                    {t('cancel')}
                </Button>
            </Region>
        </Frame>
    );
};

export const CatalogClubGiftConfirmationView = () => {
    const offer = useCatalogStore(x => x.clubGiftConfirmation);

    if (!offer) return null;

    return (
        <ClubGiftDialog
            key={offer.offerId}
            offer={offer}
        />
    );
};
