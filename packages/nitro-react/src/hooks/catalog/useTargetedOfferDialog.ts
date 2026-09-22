/**
 * The view model of Flash's `TargetedOfferDialogView`, shared by both layouts it builds
 * (`targeted_offer_dialog.xml` and `targeted_offer_dialog_variation.xml`): what `buildWindow`,
 * `setTimeLeft`, `updatePriceText`, `updateButtonStates` and `onQuantityInputEvent` write into the
 * window, and what `onInput` does. A layout without an element simply does not draw its field,
 * as `findChildByName` found nothing there.
 *
 * - The frame's title and `txt_title` are the offer's title, `txt_description` its description,
 *   `txt_price_label` `targeted.offer.price.label`.
 * - `bmp_illustration`: `image.library.url` + `targeted.offer.override.preview_image.<id>`, else the
 *   offer's `imageUrl`, else `targetedoffers/offer_default.png`.
 * - `cnt_time_left` is hidden for an offer that never expires. Otherwise `targeted.offer.timeleft`
 *   is split around `%timeleft%` into `txt_time_left_label_1` (up to the character before it) and
 *   `_label_2` (after it), with the time between.
 * - The price texts are the quantity times the offer's prices; `activityPoints_icon` is
 *   `getIconStyleFor` of the offer's activity point type, or of 5 (diamonds) when it costs none -
 *   `renderPrice` from `getPriceMap`. (The AS3 `renderPrice` reads the map's `credit` entry without
 *   a null check, so an offer with no credit price throws there and the rest of `buildWindow`
 *   never runs; the port draws it.)
 * - `updateButtonStates`: `txt_status` keeps the layout's caption, `${targeted.offer.not.enough.credits}`,
 *   until the purse covers the quantity, then is emptied; `btn_get_credits` shows only while it
 *   does not; `cnt_quantity` only for an offer with more than one left; `btn_buy` is enabled when
 *   the purse covers it and the quantity is 1..`purchaseLimit`. The purse is `userStore`, so the
 *   `catalog_purse_update` re-run is every render.
 * - `quantity_input` (restricted to digits): a 0 that is not an empty field, more than 999 or more
 *   than the offer's limit puts the field back to the last accepted quantity; anything else is
 *   accepted. An empty field is `parseInt("")` - `NaN` - which Flash accepts too: the prices read
 *   `NaN` and buy is disabled until a number is typed. (Sulake's JavaScript build resets an empty
 *   field instead; the AS3 decides.)
 * - The header close minimizes the offer, `btn_get_credits` is `purchaseCredits`, `btn_buy` opens
 *   the confirmation with the quantity.
 */
import { useState } from 'react';

import { minimizeTargetedOffer, purchaseTargetedOfferCredits, showTargetedOfferConfirmation } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigValue, useTranslation } from '#base/context/system';
import { checkTargetedOfferPurseBalance, TargetedOffer, useTargetedOfferActions, useTargetedOfferStore } from '#base/context/targeted-offers';
import { useUserStore } from '#base/context/user';
import { getTargetedOfferTimeLeft } from '#base/utils';

import { useTargetedOfferLocalization } from './useTargetedOfferLocalization';
import { useTargetedOfferTimer } from './useTargetedOfferTimer';

/** `TargetedOfferDialogView.IMAGE_DEFAULT_URL`. */
const IMAGE_DEFAULT_URL = 'targetedoffers/offer_default.png';

/** `renderPrice`'s icon when the offer costs no activity points: diamonds. */
const DEFAULT_ACTIVITY_POINT_TYPE = 5;

/** `onQuantityInputEvent`'s ceiling, whatever the offer's limit. */
const QUANTITY_MAX = 999;

/** The three texts of `cnt_time_left`, `null` when it is hidden. */
export interface TargetedOfferDialogTimeLeft {
    label1: string;
    time: string;
    label2: string;
}

export interface TargetedOfferDialogModel {
    title: string;
    description: string;
    priceLabel: string;
    priceCredits: string;
    priceActivityPoints: string;
    activityPointType: number;
    illustrationUrl: string;
    timeLeft: TargetedOfferDialogTimeLeft | null;
    /** `txt_status`: empty once the purse covers the quantity. */
    statusText: string;
    quantityVisible: boolean;
    quantityCaption: string;
    getCreditsVisible: boolean;
    buyEnabled: boolean;
    onQuantityChange: (caption: string) => void;
    onClose: () => void;
    onGetCredits: () => void;
    onBuy: () => void;
}

export const useTargetedOfferDialog = (offer: TargetedOffer): TargetedOfferDialogModel => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const getLocalization = useTargetedOfferLocalization(offer);
    const credits = useUserStore(x => x.credits);
    const activityPoints = useUserStore(x => x.activityPoints);
    const quantity = useTargetedOfferStore(x => x.quantity);
    const { setQuantity } = useTargetedOfferActions();
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';
    const previewOverride = useConfigValue<string>(`targeted.offer.override.preview_image.${offer.id}`) ?? '';
    const secondsRemaining = useTargetedOfferTimer(offer);
    const [ quantityCaption, setQuantityCaption ] = useState(String(quantity));

    let timeLeft: TargetedOfferDialogTimeLeft | null = null;

    if (secondsRemaining !== null) {
        const template = getLocalization('targeted.offer.timeleft');
        const index = Math.max(template.indexOf('%timeleft%'), 0);

        timeLeft = {
            label1: template.slice(0, Math.max(0, index - 1)),
            time: getTargetedOfferTimeLeft(t, secondsRemaining),
            label2: template.slice(index + 10),
        };
    }

    const purseCovers = checkTargetedOfferPurseBalance(offer, credits, activityPoints, quantity);
    const quantityValid = (quantity >= 1) && (quantity <= offer.purchaseLimit);

    const image = previewOverride.length ? previewOverride : (offer.imageUrl.length ? offer.imageUrl : IMAGE_DEFAULT_URL);

    return {
        title: getLocalization(offer.title),
        description: getLocalization(offer.description),
        priceLabel: getLocalization('targeted.offer.price.label'),
        priceCredits: String(quantity * offer.priceInCredits),
        priceActivityPoints: String(quantity * offer.priceInActivityPoints),
        activityPointType: (offer.priceInActivityPoints > 0) ? offer.activityPointType : DEFAULT_ACTIVITY_POINT_TYPE,
        illustrationUrl: `${imageLibraryUrl}${image}`,
        timeLeft,
        statusText: purseCovers ? '' : t('targeted.offer.not.enough.credits'),
        quantityVisible: (offer.purchaseLimit > 1),
        quantityCaption,
        getCreditsVisible: !purseCovers,
        buyEnabled: (purseCovers && quantityValid),
        onQuantityChange: (caption) => {
            const value = parseInt(caption);

            if (((value === 0) && (caption !== '')) || (value > QUANTITY_MAX) || (value > offer.purchaseLimit)) {
                setQuantityCaption(String(quantity));

                return;
            }

            setQuantityCaption(caption);
            setQuantity(value);
        },
        onClose: () => minimizeTargetedOffer(send, offer),
        onGetCredits: () => purchaseTargetedOfferCredits(send, offer),
        onBuy: () => {
            if (!quantityValid) return;

            showTargetedOfferConfirmation(offer, quantity);
        },
    };
};
