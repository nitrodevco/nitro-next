/**
 * The purchase confirmation of a mint token pack or a collectibles shop offer -
 * `PurchaseConfirmationDialog.showConfirmationDialog` on `purchase_confirmation.xml` for a
 * `MintTokenPurchaseOffer` (product type `MINT_TOKEN`) or an `NftStorePurchaseOffer` (`n`), drawn
 * the way `CatalogPurchaseConfirmationView` draws the layout for a catalogue offer, with what
 * differs for these two:
 *
 * - the frame is `#2a2a2a` rather than the catalogue's blue;
 * - the picture is the `nft_image` `product_image` widget over the product of a shop offer, and
 *   `getMintTokenProductIcon` (`minting_token_large`, centred in `product_image`) for a pack;
 * - the price (`showPriceInContainer`) is the pack's silver (unit 1000) or the offer's emeralds
 *   (unit 1001);
 * - buying sends `PurchaseMintTokenMessageComposer(offerId, wallet)` or
 *   `NftStorePurchaseMessageComposer(productCode, wallet)` (`purchaseMintTokens` /
 *   `purchaseNftOffer`) and disables both buttons until the answer takes the dialog down.
 *
 * The product name is the product data's name for the offer's product code (`getProductData`);
 * `disclaimer` is disposed as `disclaimer.credit_spending.enabled` is off, `quantity` and
 * `freeQuantity` are not shown for a single, undiscounted purchase, and the raffle is hidden.
 */
import { closeCollectiblesPurchase, confirmCollectiblesPurchase } from '#base/commands';
import { useCollectiblesStore } from '#base/context/collectibles';
import { useWebSocketContext } from '#base/context/communication';
import { useSystemStore, useTranslation } from '#base/context/system';
import { Border, Box, Button, ButtonThick, Frame, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';
import { CatalogCurrencyIcon } from '#base/views/catalog/CatalogCurrencyIcon';

import { CollectiblesPreviewSlots, CollectiblesProductPreview } from './CollectiblesProductPreview';

/** The content itemlist's rows: the 171px product block, then the buttons, `spacing` 10 apart. */
const PRODUCT_BLOCK_HEIGHT = 171;
const CONTENT_SPACING = 10;
const BUTTONS_HEIGHT = 27;
/** The frame's height once `content` has fitted itself - as `CatalogPurchaseConfirmationView` computes it. */
const FRAME_HEIGHT = 25 + 8 + (PRODUCT_BLOCK_HEIGHT + CONTENT_SPACING + BUTTONS_HEIGHT) + 7 + 5;

/** `_window.color` for a `MintTokenPurchaseOffer` or `NftStorePurchaseOffer`. */
const COLLECTIBLES_PURCHASE_COLOR = '#2a2a2a';
/** `HabboCatalogUtils.getPriceArray`'s units for silver and emeralds. */
const PRICE_UNIT_SILVER = 1000;
const PRICE_UNIT_EMERALD = 1001;
/** The effect previewer's temporary room for `nft_image`. */
const PURCHASE_PREVIEW_ROOM_ID = 1003;

/** `product_image.xml` in the 126 x 152 `nft_image` widget. */
const NFT_IMAGE_SLOTS: CollectiblesPreviewSlots = {
    productPreview: { left: 0, top: 0, width: 126, height: 152 },
    placeholder: { left: 0, top: 0, width: 126, height: 152, src: LayoutImage('shared/collectables_collection_default.png'), centered: true },
    unknown: { left: 0, top: 0, width: 126, height: 152, src: LayoutImage('shared/collectables_icon_curator_stamp_large.png'), stretched: false },
    badge: { left: 0, top: 0, width: 126, height: 152, zoom: 2 },
    pet: { left: 0, top: 0, width: 126, height: 152, zoom: 1, shrinkOnOverflow: false },
    avatar: { left: 18, top: 11, width: 90, height: 130 },
    effect: { left: 13, top: -4, width: 100, height: 260, roomId: PURCHASE_PREVIEW_ROOM_ID },
};

export const CollectiblesPurchaseConfirmationView = () => {
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const purchaseOffer = useCollectiblesStore(x => x.purchaseOffer);
    const purchasing = useCollectiblesStore(x => x.purchasing);
    const preview = useCollectiblesStore(x => x.purchasePreview);
    const productCode = purchaseOffer?.offer.productCode ?? '';
    const productName = useSystemStore(x => x.productData[productCode]?.name);

    if (!purchaseOffer) return null;

    const price = (purchaseOffer.kind === 'mint_token')
        ? { amount: purchaseOffer.offer.silverPrice, unit: PRICE_UNIT_SILVER }
        : { amount: purchaseOffer.offer.emeraldPrice, unit: PRICE_UNIT_EMERALD };
    // `getPriceArray`: a price of nothing is 0 credits.
    const shownPrice = (price.amount > 0) ? price : { amount: 0, unit: -1 };

    return (
        <Frame
            variant="3"
            centered
            rememberPosition={false}
            caption={t('catalog.purchase_confirmation.title')}
            tintColor={COLLECTIBLES_PURCHASE_COLOR}
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            resizeDirection="none"
            margins={[ 1, 25, 1, 5 ]}
            onClose={closeCollectiblesPurchase}
            layout={{ position: 'absolute', width: 325, height: FRAME_HEIGHT, minWidth: 275, minHeight: 150 }}
        >
            <Region
                name="content"
                layout={{ position: 'absolute', left: 0, width: 323, top: 8, height: PRODUCT_BLOCK_HEIGHT + CONTENT_SPACING + BUTTONS_HEIGHT }}
            >
                <Border
                    variant="0"
                    tintColor="#f1f1f1"
                    layout={{ position: 'absolute', left: 10, width: 126, top: 12, height: 152, overflow: 'hidden' }}
                >
                    {(purchaseOffer.kind === 'mint_token') && (
                        <ThemeImage
                            name="product_image"
                            src={LayoutImage('catalog/minting_token_large.png')}
                            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                            layout={{ position: 'absolute', left: 1, width: 126, top: 1, height: 152 }}
                        />
                    )}
                    {(purchaseOffer.kind === 'nft') && (
                        <Region
                            name="nft_image"
                            layout={{ position: 'absolute', left: 0, width: 126, top: 0, height: 152 }}
                        >
                            <CollectiblesProductPreview
                                preview={preview}
                                slots={NFT_IMAGE_SLOTS}
                            />
                        </Region>
                    )}
                </Border>
                <Region
                    name="properties_itemlist"
                    layout={{ position: 'absolute', left: 143, width: 176, top: 8, flexDirection: 'column', gap: 7 }}
                >
                    <ThemeText
                        name="product_name"
                        text={productName ?? ''}
                        textStyle="u_bold"
                        textOptions={{ fontSize: 14, wordWrap: true, wordWrapWidth: 173 }}
                        verticalAlign="top"
                        layout={{ width: 177, flexShrink: 0 }}
                    />
                    <Region layout={{ flexDirection: 'row', flexShrink: 0 }}>
                        <ThemeText
                            text={t('catalog.purchase.confirmation.dialog.cost')}
                            textStyle="u_regular"
                            textOptions={{ fontSize: 14 }}
                            verticalAlign="top"
                            layout={{ marginTop: 1, flexShrink: 0 }}
                        />
                        <Region
                            name="purchase_cost_box"
                            layout={{ flexDirection: 'row', alignItems: 'flex-start', gap: 1, flexShrink: 0 }}
                        >
                            <Box layout={{ width: 1, height: 1 }} />
                            <Box layout={{ flexDirection: 'row', alignItems: 'flex-start', gap: 1 }}>
                                <ThemeText
                                    name="amount_0"
                                    text={String(shownPrice.amount)}
                                    textStyle="u_bold"
                                    textOptions={{ fontSize: 14 }}
                                    verticalAlign="top"
                                    layout={{ marginTop: 1 }}
                                />
                                <CatalogCurrencyIcon
                                    type={shownPrice.unit}
                                    big
                                />
                            </Box>
                            <Box layout={{ width: 2, height: 1 }} />
                        </Region>
                    </Region>
                </Region>
                <Region
                    name="buttons"
                    layout={{ position: 'absolute', left: 13, top: PRODUCT_BLOCK_HEIGHT + CONTENT_SPACING, height: BUTTONS_HEIGHT, flexDirection: 'row', gap: 76 }}
                >
                    <Button
                        variant="3"
                        name="cancel_button"
                        disabled={purchasing}
                        onPointerTap={closeCollectiblesPurchase}
                        layout={{ width: 110, height: 27, flexShrink: 0 }}
                    >
                        {t('catalog.purchase_confirmation.cancel')}
                    </Button>
                    <ButtonThick
                        variant="5"
                        name="buy_button"
                        tintColor="#00aa00"
                        disabled={purchasing}
                        onPointerTap={() => confirmCollectiblesPurchase(send)}
                        layout={{ width: 110, height: 27, flexShrink: 0 }}
                    >
                        {t('catalog.purchase_confirmation.buy')}
                    </ButtonThick>
                </Region>
            </Region>
        </Frame>
    );
};
