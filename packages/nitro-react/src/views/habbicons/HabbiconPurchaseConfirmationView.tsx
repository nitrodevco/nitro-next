/**
 * `HabbiconPurchaseConfirmationView` - `habbicon_purchase_confirmation.xml`, centred each time it is
 * shown. Its `content` item list fits the frame to what it shows, so the window is shorter without
 * the `value_area` rows.
 *
 * `initializeForHabbicon` (`updateHabbiconUI`): the habbicon's name, its preview as `product_image`,
 * the set's title as `preview_label`, the `receive_row` reading the set's progress after the
 * purchase (owned + 1, of the set's habbicons in the shop data) - or just the set's name when the
 * set is not known - and its price; the value rows hidden.
 *
 * `initializeForSet` (`updateSetUI`): the set's title and collection icon, how many habbicons the
 * purchase gives (every one the user neither owns, favours nor can claim), the set's price, and the
 * `value_area`: the normal price of those habbicons when that is more than the set costs, and the
 * saving.
 *
 * Buy (`onConfirmClicked`) sends `BuyHabbicon` / `BuyHabbiconCollection` and disables the buttons'
 * sections (`setPending`); an OK closes the window (the controller's `onPurchaseOk`), a failure
 * enables them again after `RETRY_ENABLE_DELAY_MS` (500). While pending, cancel and close do nothing
 * - Flash also draws the header's close button disabled, which the frame here cannot.
 */
import { useEffect, useState } from 'react';

import { buyHabbicon, buyHabbiconCollection } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { formatHabbiconPrice, getHabbiconPriceCurrency, HABBICON_PRICE_CREDITS, HabbiconEntryModel, HabbiconPurchaseConfirmation, HabbiconState, useHabbiconsStore } from '#base/context/habbicons';
import { useConfigData, useTranslation } from '#base/context/system';
import { Region, TemplateBindings, TemplateWindow, ThemeImage, useTemplateFrame } from '#base/theme';
import { getCurrencyIconStyle } from '#base/utils';

import { HABBICON_PURCHASE_CONFIRMATION_TEMPLATE } from './habbiconTemplate';

/** `RETRY_ENABLE_DELAY_MS`. */
const RETRY_ENABLE_DELAY_MS = 500;
/** The grey `BitmapData(40, 40, false, 0x8f8f8f)` shown for a missing image. */
const MISSING_IMAGE_COLOR = '#8f8f8f';

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
    const config = useConfigData();
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

    const frame = useTemplateFrame({ id: 'habbicon-purchase-confirmation', centered: true, rememberPosition: false, onClose: close });

    /** `updatePrice`: the amount and the big currency icon. */
    const price = (credits: number, activityPoints: number, activityPointType: number): TemplateBindings => ({
        price_amount: { caption: formatHabbiconPrice(credits, activityPoints) },
        price_icon: { style: String(getCurrencyIconStyle(getHabbiconPriceCurrency(activityPoints, activityPointType), config, true)) },
    });

    let bindings: TemplateBindings;

    if (request.mode === 'habbicon') {
        // `updateHabbiconUI`.
        const item = request.item;
        const collection = collections.find(entry => entry.collectionId === item.collectionId);
        const total = collection?.habbicons.length ?? 0;
        let receiveText: string;

        // `getHabbiconProgressText`.
        if (!collection || (total <= 0)) {
            receiveText = t('habbicon_purchase.confirm.habbicon.set', 'Set: %set_name%', { set_name: item.collectionTitle });
        } else {
            const owned = collection.habbicons.filter(entry => (entry.state === HabbiconState.OWNED) || (entry.state === HabbiconState.FAVORITE)).length;

            receiveText = t('habbicon_purchase.confirm.habbicon.progress', 'Progress after buy: %progress% / %total%', { progress: String(Math.trunc(Math.min(total, owned + 1))), total: String(total) });
        }

        bindings = {
            product_name: { caption: item.name },
            description_text: { caption: '${habbicon_purchase.confirm.habbicon.desc}' },
            preview_label: { caption: item.collectionTitle },
            receive_row: { visible: true },
            receive_text: { caption: receiveText },
            normal_price_row: { visible: false },
            discount_row: { visible: false },
            price_label: { caption: '${catalog.purchase.confirmation.dialog.cost}' },
            ...price(item.priceCredits, item.priceActivityPoints, item.activityPointType),
        };
    } else {
        // `updateSetUI`.
        const set = request.set;
        const missing = set.habbicons.filter(isMissingForSetPurchase);
        const setPrice = singlePrice(set.priceCredits, set.priceActivityPoints);
        const individualPrice = missing.reduce((sum, entry) => sum + singlePrice(entry.priceCredits, entry.priceActivityPoints), 0);
        // `getSetCurrencyType`.
        const currency = (set.priceCredits > 0) ? HABBICON_PRICE_CREDITS : set.activityPointType;

        bindings = {
            product_name: { caption: set.title },
            description_text: { caption: t('habbicon_purchase.confirm.set.desc', 'Buy the %set_name% set?', { set_name: set.title }) },
            preview_label: { caption: '${habbicon_purchase.confirm.set.preview}' },
            receive_row: { visible: true },
            receive_text: {
                caption: (missing.length === 1)
                    ? t('habbicon_purchase.confirm.set.receive.one', 'You\'ll receive 1 Habbicon', { count: '1' })
                    : t('habbicon_purchase.confirm.set.receive', 'You\'ll receive %count% Habbicons', { count: String(missing.length) }),
            },
            price_label: { caption: '${habbicon_purchase.confirm.set_price}' },
            ...price(set.priceCredits, set.priceActivityPoints, set.activityPointType),
            normal_price_row: { visible: individualPrice > setPrice },
            normal_price_amount: { caption: formatInlinePrice(individualPrice, currency) },
            discount_row: { visible: (individualPrice - setPrice) > 0 },
            discount_amount: { caption: formatInlinePrice(Math.max(0, individualPrice - setPrice), currency) },
        };
    }

    // `showProductImage`: the habbicon's preview or the set's icon, else a grey square.
    const image = (request.mode === 'habbicon') ? preview : request.set.icon;

    return (
        <TemplateWindow
            id={HABBICON_PURCHASE_CONFIRMATION_TEMPLATE}
            frame={frame}
            bindings={{
                ...bindings,
                product_image: {
                    children: image
                        ? (
                                <ThemeImage
                                    texture={image}
                                    bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                                    layout={{ position: 'absolute', left: 0, top: 0, width: 40, height: 40 }}
                                />
                            )
                        : (
                                <Region
                                    backgroundColor={MISSING_IMAGE_COLOR}
                                    layout={{ position: 'absolute', left: 0, top: 0, width: 40, height: 40 }}
                                />
                            ),
                },
                // `setPending`.
                cancel_button: { disableSection: pending, onPointerTap: close },
                confirm_button: { disableSection: pending, onPointerTap: confirm },
            }}
        />
    );
};
