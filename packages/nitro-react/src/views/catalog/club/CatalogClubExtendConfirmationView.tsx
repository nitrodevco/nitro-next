/**
 * The discounted club extension - Flash's `ClubExtendConfirmationDialog`, the
 * `club_extend_confirmation` window.
 *
 * `showConfirmation`: the texts are `catalog.club.extend.[basic.]<name>` (`basic.` for the HC
 * offer, which also turns `club_level_icon` into style 17 and moves it 15 right); the prices are
 * `ClubOfferExtendData`'s getters - `discountActivityPointAmount` multiplies by the months twice,
 * as Flash does; the expiry is `expiration_days_left` (`day`, `duration` = 31 per month) for more
 * than one day, `expires_today` otherwise. The left icons of the normal price and the saving are
 * `icon_credit_0`, sized to it (`setElementBitmapData`), the right ones the big icon of
 * `originalActivityPointType`, and your price's credit icon spins through `icon_credit_0..6`
 * (`startAnimation`). "Maybe later" turns `LINK_COLOR_HOVER` under the pointer and closes the
 * dialog. `background_container` reaches down to the total line
 * (`itemlist.y + line.y + line.height`), and `club_teaser` is
 * `${image.library.catalogue.url}catalogue/vip_extend_tsr.png`, 133x144 at `(1, height - 144)` -
 * the URL names `catalogue/` twice, as Flash's does.
 */
import { IClubOfferExtendData } from '@nitrodevco/nitro-packets';
import { useEffect, useState } from 'react';

import { confirmClubExtend } from '#base/commands';
import { useCatalogClubActions, useCatalogStore, useCatalogStoreApi } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigData, useTranslation } from '#base/context/system';
import { TemplateWindow, TemplateWindows } from '#base/theme';
import { getCurrencyIconStyle } from '#base/utils';

import { catalogTemplateId } from '../page/catalogTemplates';

/** `CREDIT_IMAGE_COUNT`. */
const CREDIT_IMAGE_COUNT = 7;
/** `ANIMATION_TRIGGER_INTERVAL` and the frame timer's 75 ms. */
const ANIMATION_TRIGGER_INTERVAL = 2000;
const ANIMATION_FRAME_INTERVAL = 75;
/** `LINK_COLOR_DEFAULT` / `LINK_COLOR_HOVER`. */
const LINK_COLOR_DEFAULT = 0x000000;
const LINK_COLOR_HOVER = 0x91c1ff;
/** The `icon_credit_N` bitmaps' size, which `setElementBitmapData` gives the element. */
const CREDIT_ICON_SIZE = 22;
/** The teaser's rect as `showConfirmation` sets it. */
const TEASER_X = 1;
const TEASER_WIDTH = 133;
const TEASER_HEIGHT = 144;

const creditIcon = (frame: number) => `habbo-catalog-com-icon_credit_${frame}`;

/**
 * `startAnimation`: frame 0, and every 2 seconds `startAnimationFrame` twice in a row - a 75 ms
 * timer that shows frames 1 to 6, whose completion (on the sixth tick) puts frame 0 back, so the
 * sixth frame is replaced within the same tick and never shows.
 */
const useCreditAnimationFrame = () => {
    const [ frame, setFrame ] = useState(0);

    useEffect(() => {
        const timeouts: ReturnType<typeof setTimeout>[] = [];
        const frames = CREDIT_IMAGE_COUNT - 1;

        const interval = setInterval(() => {
            for (let run = 0; run < 2; run++) {
                const start = run * frames * ANIMATION_FRAME_INTERVAL;

                for (let step = 1; step < frames; step++) timeouts.push(setTimeout(() => setFrame(step), start + (step * ANIMATION_FRAME_INTERVAL)));

                timeouts.push(setTimeout(() => setFrame(0), start + (frames * ANIMATION_FRAME_INTERVAL)));
            }
        }, ANIMATION_TRIGGER_INTERVAL);

        return () => {
            clearInterval(interval);

            for (const timeout of timeouts) clearTimeout(timeout);
        };
    }, []);

    return frame;
};

/** What `showConfirmation` sizes and moves once the window is built. */
const arrange = (vip: boolean) => ({ find, root }: TemplateWindows) => {
    const window = root();

    if (!vip) {
        const icon = find('club_level_icon');

        icon?.setX(icon.x + 15);
    }

    for (const name of [ 'normal_price_icon_left', 'you_save_icon_left', 'your_price_icon_left' ]) {
        const icon = find(name);

        icon?.setRectangle(icon.x, icon.y, CREDIT_ICON_SIZE, CREDIT_ICON_SIZE);
    }

    if (window) find('club_teaser')?.setRectangle(TEASER_X, window.height - TEASER_HEIGHT, TEASER_WIDTH, TEASER_HEIGHT);

    const list = find('itemlist_vertical');
    const line = find('total_amount_line');

    if (list && line) find('background_container')?.setHeight(list.y + line.height + line.y);
};

/** The dialog for one offer - mounted with it, so the credit animation runs only while it shows. */
const ClubExtendDialog = ({ offer }: { offer: IClubOfferExtendData }) => {
    const config = useConfigData();
    const { setClubExtendOffer } = useCatalogClubActions();
    const store = useCatalogStoreApi();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const creditFrame = useCreditAnimationFrame();
    const [ laterHovered, setLaterHovered ] = useState(false);
    const key = `catalog.club.extend.${offer.vip ? '' : 'basic.'}`;
    const originalPrice = offer.originalPricePerMonth * offer.months;
    const originalActivityPointPrice = offer.originalActivityPointPricePerMonth * offer.months;
    const expiration = (offer.subscriptionDaysLeft > 1)
        ? t(`${key}expiration_days_left`, '', { day: String(offer.subscriptionDaysLeft), duration: String(31 * offer.months) })
        : t(`${key}expires_today`);
    const pointIcon = { style: String(getCurrencyIconStyle(offer.originalActivityPointType, config, true)) };
    const close = () => setClubExtendOffer(undefined);

    return (
        <TemplateWindow
            id={catalogTemplateId('club_extend_confirmation')}
            frame={{ id: 'club-extend-confirmation', centered: true, rememberPosition: false, onClose: close }}
            arrange={arrange(offer.vip)}
            bindings={{
                '': { caption: `\${${key}confirm.caption}` },
                club_level_icon: offer.vip ? {} : { style: '17' },
                normal_price_price_left: { caption: String(originalPrice) },
                normal_price_price_right: { caption: String(originalActivityPointPrice) },
                you_save_price_left: { caption: String(originalPrice - offer.priceCredits) },
                you_save_price_right: { caption: String((originalActivityPointPrice * offer.months) - offer.priceActivityPoints) },
                your_price_price_left: { caption: String(offer.priceCredits) },
                your_price_price_right: { caption: String(offer.priceActivityPoints) },
                extend_title: { caption: `\${${key}confirm.title}` },
                normal_price_label: { caption: `\${${key}normal.label}` },
                you_save_label: { caption: `\${${key}save.label}` },
                your_price_label: { caption: `\${${key}price.label}` },
                buy_now_button: { caption: `\${${key}buy.button}`, onPointerTap: () => confirmClubExtend(send, store) },
                maybe_later_link: { caption: `\${${key}later.link}`, color: laterHovered ? LINK_COLOR_HOVER : LINK_COLOR_DEFAULT },
                maybe_later_region: {
                    onPointerOver: () => setLaterHovered(true),
                    onPointerOut: () => setLaterHovered(false),
                    onPointerTap: close,
                },
                offer_expiration: { caption: expiration },
                normal_price_icon_left: { asset: creditIcon(0) },
                you_save_icon_left: { asset: creditIcon(0) },
                your_price_icon_left: { asset: creditIcon(creditFrame) },
                normal_price_icon_right: pointIcon,
                you_save_icon_right: pointIcon,
                your_price_icon_right: pointIcon,
                club_teaser: { asset: '${image.library.catalogue.url}catalogue/vip_extend_tsr.png' },
            }}
        />
    );
};

export const CatalogClubExtendConfirmationView = () => {
    const offer = useCatalogStore(x => x.clubExtendOffer);

    if (!offer) return null;

    return (
        <ClubExtendDialog
            key={offer.offerId}
            offer={offer}
        />
    );
};
