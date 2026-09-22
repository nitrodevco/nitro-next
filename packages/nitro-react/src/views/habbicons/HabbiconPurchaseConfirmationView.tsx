/**
 * `HabbiconPurchaseConfirmationView` - `habbicon_purchase_confirmation.xml` (353 wide, style 3,
 * `#418db0`, content margins 1,25,1,-2, centred each time it is shown). Its `content` item list
 * (10px between items, 8px down) reflects its height onto the frame, so the frame is 296 high with
 * both price rows and 39px less without them.
 *
 * - `top_body`: the `preview_panel` with the product image (the habbicon's preview, or the set's
 *   collection icon; a grey 40x40 square when there is none) and its label (the set's title for a
 *   habbicon, "Full set" for a set), the product's name, the description, the `receive_row`, and
 *   the price line with the big currency icon.
 * - `value_area`: for a set, the normal price of the habbicons the set purchase gives (every one
 *   the user neither owns, favours nor can claim) when that is more than the set costs, and the
 *   saving.
 * - cancel and buy.
 *
 * `initializeForHabbicon`: the receive row reads the set's progress after the purchase (owned +
 * 1, of the set's habbicons in the shop data), or just the set's name when the set is not known.
 * `initializeForSet`: it reads how many habbicons the purchase gives.
 *
 * Buy (`onConfirmClicked`) sends `BuyHabbicon` / `BuyHabbiconCollection` and disables the buttons
 * (`setPending`); an OK closes the window (the controller's `onPurchaseOk`), a failure enables
 * them again after `RETRY_ENABLE_DELAY_MS` (500). While pending, cancel and close do nothing -
 * Flash also draws the header's close button disabled, which the frame here cannot.
 * `receive_text`'s `overflow_replace` is left to the row's clipping.
 */
import { useEffect, useState } from 'react';

import { buyHabbicon, buyHabbiconCollection } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { formatHabbiconPrice, getHabbiconPriceCurrency, HABBICON_PRICE_CREDITS, HabbiconEntryModel, HabbiconPurchaseConfirmation, HabbiconSetModel, HabbiconState, useHabbiconsStore } from '#base/context/habbicons';
import { useTranslation } from '#base/context/system';
import { Border, Box, Button, ButtonThick, Frame, ReflectResize, Region, ThemeImage, ThemeText } from '#base/theme';
import { CatalogCurrencyIcon } from '#base/views/catalog/CatalogCurrencyIcon';

/** `RETRY_ENABLE_DELAY_MS`. */
const RETRY_ENABLE_DELAY_MS = 500;
/** `content`'s height in the layout, which the frame's 296 is built around. */
const CONTENT_HEIGHT = 250;
/** The grey `BitmapData(40, 40, false, 0x8f8f8f)` shown for a missing image. */
const MISSING_IMAGE_COLOR = '#8f8f8f';
/** `properties_itemlist`'s 197px texts wrap at the field width less the 2px gutters. */
const TEXT_WRAP = 193;

/** `isMissingForSetPurchase`. */
const isMissingForSetPurchase = (entry: HabbiconEntryModel): boolean => !entry.owned && !entry.favorite && !entry.claimable;

/** `getSetPrice` - and each habbicon's price in `getSetIndividualPrice`: credits when it has them, else its activity points. */
const singlePrice = (credits: number, activityPoints: number): number => ((credits > 0) ? credits : Math.max(0, activityPoints));

/** `formatInlinePrice`: credits with a `c`. */
const formatInlinePrice = (price: number, currency: number): string => ((currency === HABBICON_PRICE_CREDITS) ? `${price}c` : price.toString());

export interface HabbiconPurchaseConfirmationViewProps {
    confirmation: HabbiconPurchaseConfirmation;
    onClose: () => void;
}

export const HabbiconPurchaseConfirmationView = ({ confirmation, onClose }: HabbiconPurchaseConfirmationViewProps) => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const collections = useHabbiconsStore(x => x.shopCollections);
    const request = confirmation.request;
    const preview = useHabbiconsStore(x => ((request.mode === 'habbicon') ? x.previews[request.item.habbiconId] : undefined));
    const [ pending, setPending ] = useState(false);

    // `purchaseFailed`: the buttons come back after the delay, one timer per failure.
    useEffect(() => {
        if (!confirmation.failedSeq) return;

        const timeout = setTimeout(() => setPending(false), RETRY_ENABLE_DELAY_MS);

        return () => clearTimeout(timeout);
    }, [ confirmation.failedSeq ]);

    let productName: string;
    let description: string;
    let previewLabel: string;
    let receiveText: string;
    let priceLabel: string;
    let priceCredits: number;
    let priceActivityPoints: number;
    let activityPointType: number;
    const image = (request.mode === 'habbicon') ? preview : request.set.icon;
    let normalPrice: string | undefined = undefined;
    let discount: string | undefined = undefined;

    if (request.mode === 'habbicon') {
        const item = request.item;
        const collection = collections.find(entry => entry.collectionId === item.collectionId);
        const total = collection?.habbicons.length ?? 0;

        productName = item.name;
        description = t('habbicon_purchase.confirm.habbicon.desc');
        previewLabel = item.collectionTitle;
        priceLabel = t('catalog.purchase.confirmation.dialog.cost');

        // `getHabbiconProgressText`.
        if (!collection || (total <= 0)) {
            receiveText = t('habbicon_purchase.confirm.habbicon.set', 'Set: %set_name%', { set_name: item.collectionTitle });
        } else {
            const owned = collection.habbicons.filter(entry => (entry.state === HabbiconState.OWNED) || (entry.state === HabbiconState.FAVORITE)).length;

            receiveText = t('habbicon_purchase.confirm.habbicon.progress', 'Progress after buy: %progress% / %total%', { progress: String(Math.trunc(Math.min(total, owned + 1))), total: String(total) });
        }

        priceCredits = item.priceCredits;
        priceActivityPoints = item.priceActivityPoints;
        activityPointType = item.activityPointType;
    } else {
        const set: HabbiconSetModel = request.set;
        const missing = set.habbicons.filter(isMissingForSetPurchase);
        const setPrice = singlePrice(set.priceCredits, set.priceActivityPoints);
        const individualPrice = missing.reduce((sum, entry) => sum + singlePrice(entry.priceCredits, entry.priceActivityPoints), 0);
        const currency = (set.priceCredits > 0) ? HABBICON_PRICE_CREDITS : set.activityPointType;

        productName = set.title;
        description = t('habbicon_purchase.confirm.set.desc', 'Buy the %set_name% set?', { set_name: set.title });
        previewLabel = t('habbicon_purchase.confirm.set.preview');
        receiveText = (missing.length === 1)
            ? t('habbicon_purchase.confirm.set.receive.one', 'You\'ll receive 1 Habbicon', { count: '1' })
            : t('habbicon_purchase.confirm.set.receive', 'You\'ll receive %count% Habbicons', { count: String(missing.length) });
        priceLabel = t('habbicon_purchase.confirm.set_price');
        priceCredits = set.priceCredits;
        priceActivityPoints = set.priceActivityPoints;
        activityPointType = set.activityPointType;

        if (individualPrice > setPrice) normalPrice = formatInlinePrice(individualPrice, currency);
        if ((individualPrice - setPrice) > 0) discount = formatInlinePrice(Math.max(0, individualPrice - setPrice), currency);
    }

    /** `onWindowClose`: not while a purchase is on its way. */
    const close = () => {
        if (!pending) onClose();
    };

    /** `onConfirmClicked`. */
    const confirm = () => {
        if (pending) return;

        setPending(true);

        if (request.mode === 'set') buyHabbiconCollection(send, request.set.collectionId);
        else buyHabbicon(send, request.item.habbiconId);
    };

    return (
        <Frame
            variant="3"
            id="habbicon-purchase-confirmation"
            caption={t('habbicon_purchase.confirm.title')}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            resizeDirection="none"
            centered
            rememberPosition={false}
            onClose={close}
            margins={[ 1, 25, 1, -2 ]}
            layout={{ position: 'absolute', width: 353, height: 296 }}
        >
            <ReflectResize
                height={CONTENT_HEIGHT}
                layout={{ position: 'absolute', left: 0, top: 8, width: 351, flexDirection: 'column', gap: 10 }}
            >
                <Region layout={{ width: 349, height: 164, flexShrink: 0, overflow: 'hidden' }}>
                    <Border
                        variant="0"
                        tintColor="#f6f1df"
                        layout={{ position: 'absolute', left: 10, top: 12, width: 126, height: 152 }}
                    >
                        <Border
                            variant="0"
                            layout={{ position: 'absolute', left: 20, top: 19, width: 86, height: 86 }}
                        >
                            {image
                                ? (
                                        <ThemeImage
                                            texture={image}
                                            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                                            layout={{ position: 'absolute', left: 23, top: 23, width: 40, height: 40 }}
                                        />
                                    )
                                : (
                                        <Region
                                            backgroundColor={MISSING_IMAGE_COLOR}
                                            layout={{ position: 'absolute', left: 23, top: 23, width: 40, height: 40 }}
                                        />
                                    )}
                        </Border>
                        <ThemeText
                            text={previewLabel}
                            textStyle="u_bold"
                            textOptions={{ wordWrap: true, wordWrapWidth: 106, align: 'center' }}
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 8, top: 114, width: 110 }}
                        />
                    </Border>
                    <Box layout={{ position: 'absolute', left: 143, top: 15, width: 197, flexDirection: 'column', gap: 6 }}>
                        <ThemeText
                            text={productName}
                            textStyle="u_bold"
                            textOptions={{ fontSize: 14, wordWrap: true, wordWrapWidth: TEXT_WRAP }}
                            verticalAlign="top"
                            layout={{ width: 197, flexShrink: 0 }}
                        />
                        <ThemeText
                            text={description}
                            textStyle="u_regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: TEXT_WRAP }}
                            verticalAlign="top"
                            layout={{ width: 197, flexShrink: 0 }}
                        />
                        <Border
                            variant="0"
                            tintColor="#f0e8cf"
                            layout={{ width: 197, height: 28, flexShrink: 0, overflow: 'hidden' }}
                        >
                            <ThemeText
                                text={receiveText}
                                textStyle="u_bold"
                                verticalAlign="top"
                                layout={{ position: 'absolute', left: 8, top: 5 }}
                            />
                        </Border>
                    </Box>
                    <Box layout={{ position: 'absolute', left: 144, top: 134, height: 22, flexDirection: 'row', gap: 6 }}>
                        <ThemeText
                            text={priceLabel}
                            textStyle="u_regular"
                            verticalAlign="top"
                            layout={{ marginTop: 2, flexShrink: 0 }}
                        />
                        <Box layout={{ height: 22, flexShrink: 0, flexDirection: 'row', gap: 3 }}>
                            <ThemeText
                                text={formatHabbiconPrice(priceCredits, priceActivityPoints)}
                                textStyle="u_regular"
                                textOptions={{ fontSize: 14 }}
                                flashFormat={{ bold: true }}
                                verticalAlign="top"
                                layout={{ marginTop: 1, flexShrink: 0 }}
                            />
                            <CatalogCurrencyIcon
                                type={getHabbiconPriceCurrency(priceActivityPoints, activityPointType)}
                                big
                                layout={{ width: 22, height: 22, flexShrink: 0 }}
                            />
                        </Box>
                    </Box>
                </Region>
                <Box layout={{ width: 327, marginLeft: 12, flexShrink: 0, flexDirection: 'column', gap: 5 }}>
                    {normalPrice !== undefined && (
                        <Region layout={{ width: 327, height: 17, flexShrink: 0 }}>
                            <ThemeText
                                text={t('habbicon_purchase.confirm.normal_price')}
                                textStyle="u_regular"
                                verticalAlign="top"
                                layout={{ position: 'absolute', left: 0, top: 0 }}
                            />
                            <ThemeText
                                text={normalPrice}
                                textStyle="u_regular"
                                textOptions={{ align: 'right' }}
                                verticalAlign="top"
                                layout={{ position: 'absolute', left: 232, top: 0, width: 95 }}
                            />
                        </Region>
                    )}
                    {discount !== undefined && (
                        <Region layout={{ width: 327, height: 17, flexShrink: 0 }}>
                            <ThemeText
                                text={t('habbicon_purchase.confirm.discount')}
                                textStyle="u_bold"
                                textOptions={{ fill: '#5f4c16' }}
                                verticalAlign="top"
                                layout={{ position: 'absolute', left: 0, top: 0 }}
                            />
                            <ThemeText
                                text={discount}
                                textStyle="u_bold"
                                textOptions={{ fill: '#5f4c16', align: 'right' }}
                                verticalAlign="top"
                                layout={{ position: 'absolute', left: 232, top: 0, width: 95 }}
                            />
                        </Region>
                    )}
                </Box>
                <Box layout={{ marginLeft: 13, height: 27, flexShrink: 0, flexDirection: 'row', gap: 105 }}>
                    <Button
                        variant="3"
                        textStyle="button_shiny_regular"
                        disabled={pending}
                        onPointerTap={close}
                        layout={{ width: 110, height: 27, flexShrink: 0 }}
                    >
                        {t('catalog.purchase_confirmation.cancel')}
                    </Button>
                    <ButtonThick
                        variant="5"
                        tintColor="#00aa00"
                        textStyle="button_shiny_bold"
                        disabled={pending}
                        onPointerTap={confirm}
                        layout={{ width: 110, height: 27, flexShrink: 0 }}
                    >
                        {t('catalog.purchase_confirmation.buy')}
                    </ButtonThick>
                </Box>
            </ReflectResize>
        </Frame>
    );
};
