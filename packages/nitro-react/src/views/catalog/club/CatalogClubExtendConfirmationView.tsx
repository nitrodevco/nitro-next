/**
 * The discounted club extension - Flash's `ClubExtendConfirmationDialog`, drawn from
 * `club_extend_confirmation.xml` (450x235, style 3 frame in `0x007a98`, margins 0/33/0/3). The
 * `itemlist_vertical` at 140,25 is as tall as its rows and reflects that on to the frame: the
 * `u_headline_big` title (10 below it), the normal price, the saving, the 3px `0x007a98` total
 * line, 8 of space, your price, the expiry line (5 below it), 10 of space and the action row.
 *
 * `showConfirmation`: the texts are `catalog.club.extend.[basic.]<name>` (`basic.` for the HC
 * offer, which also turns `club_level_icon` into style 17 and moves it 15 right); the prices are
 * `ClubOfferExtendData`'s getters - `discountActivityPointAmount` multiplies by the months twice,
 * as Flash does; the expiry is `expiration_days_left` (`day`, `duration` = 31 per month) for more
 * than one day, `expires_today` otherwise. The left icons of the normal price and the saving are
 * `icon_credit_0` at its own size, the right ones the big icon of `originalActivityPointType`, and
 * your price's credit icon spins through `icon_credit_0..6` - every 2 seconds two runs of 75 ms
 * frames (`startAnimation`). "Maybe later" turns `0x91c1ff` under the pointer. The grey
 * `background_container` reaches down to the total line (`itemlist.y + line.y + line.height`), and
 * `club_teaser` is `${image.library.catalogue.url}catalogue/vip_extend_tsr.png` at its own size,
 * its bottom at the frame's height in content coordinates (`y = height - 144` for a 144 high
 * bitmap that then keeps its bottom, `on_resize_align_bottom`), which is the content's bottom
 * plus the frame's 33 + 3 margins, and cut at the content's edge - the URL names `catalogue/`
 * twice, as Flash's does.
 */
import { IClubOfferExtendData } from '@nitrodevco/nitro-packets';
import { Container as PixiContainer } from 'pixi.js';
import { useEffect, useState } from 'react';

import { confirmClubExtend } from '#base/commands';
import { useCatalogClubActions, useCatalogStore, useCatalogStoreApi } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigValue, useTranslation } from '#base/context/system';
import { ButtonThick, Frame, Icon, LayoutImage, ReflectResize, Region, ThemeImage, ThemeText, useLayoutSize } from '#base/theme';

import { CatalogCurrencyIcon } from '../CatalogCurrencyIcon';

/** The layout's list height, which the frame's 235 was laid out for. */
const CONTENT_HEIGHT = 175;
/** `itemlist_vertical.y`. */
const LIST_TOP = 25;
/** `CREDIT_IMAGE_COUNT`. */
const CREDIT_IMAGE_COUNT = 7;
/** `ANIMATION_TRIGGER_INTERVAL` and the frame timer's 75 ms. */
const ANIMATION_TRIGGER_INTERVAL = 2000;
const ANIMATION_FRAME_INTERVAL = 75;
/** `LINK_COLOR_DEFAULT` / `LINK_COLOR_HOVER`. */
const LINK_COLOR_DEFAULT = '#000000';
const LINK_COLOR_HOVER = '#91c1ff';

const CREDIT_ICON = LayoutImage('catalog/icon_credit_0.png');
const CREDIT_ICONS = Array.from({ length: CREDIT_IMAGE_COUNT }, (_, index) => LayoutImage(`catalog/icon_credit_${index}.png`));

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

interface PriceRowProps {
    name: string;
    height: number;
    bold: boolean;
    label: string;
    priceLeft: number;
    priceRight: number;
    activityPointType: number;
    /** The left icon: `icon_credit_0` at its size, or your price's animated frame. */
    creditIcon: string;
}

/** A `*_container` row: label, credits, credit icon, `+`, activity points and their icon. */
const PriceRow = ({ name, height, bold, label, priceLeft, priceRight, activityPointType, creditIcon }: PriceRowProps) => {
    const textStyle = bold ? 'u_bold' : 'u_regular';
    const format = { thickness: -15, sharpness: 80 };
    // `auto_size` bottom-anchored texts (`on_resize_align_bottom`): their bottom stays at the layout's 19.
    const bottom = height - 19;

    return (
        <Region
            name={`${name}_container`}
            layout={{ width: 285, height, flexShrink: 0 }}
        >
            <ThemeText
                name={`${name}_label`}
                text={label}
                textStyle={textStyle}
                textOptions={{ fontSize: 14 }}
                flashFormat={format}
                verticalAlign="top"
                layout={{ position: 'absolute', left: 0, bottom }}
            />
            <ThemeText
                name={`${name}_price_left`}
                text={String(priceLeft)}
                textStyle={textStyle}
                textOptions={{ fontSize: 14, align: 'right' }}
                flashFormat={format}
                verticalAlign="top"
                layout={{ position: 'absolute', right: 285 - 180, bottom }}
            />
            <ThemeImage
                name={`${name}_icon_left`}
                src={creditIcon}
                layout={{ position: 'absolute', left: 180, top: 0 }}
            />
            <ThemeText
                name="plus"
                text="+"
                textStyle={textStyle}
                textOptions={{ fontSize: 14, align: 'right' }}
                flashFormat={format}
                verticalAlign="top"
                layout={{ position: 'absolute', right: 285 - 222, top: 0 }}
            />
            <ThemeText
                name={`${name}_price_right`}
                text={String(priceRight)}
                textStyle={textStyle}
                textOptions={{ fontSize: 14, align: 'right' }}
                flashFormat={format}
                verticalAlign="top"
                layout={{ position: 'absolute', right: 285 - 250, bottom }}
            />
            <Region
                name={`${name}_icon_right`}
                layout={{ position: 'absolute', left: 255, width: 30, top: 0, height: 25 }}
            >
                <CatalogCurrencyIcon
                    type={activityPointType}
                    big
                />
            </Region>
        </Region>
    );
};

/** The dialog for one offer - mounted with it, so the credit animation runs only while it shows. */
const ClubExtendDialog = ({ offer }: { offer: IClubOfferExtendData }) => {
    const catalogueUrl = useConfigValue<string>('image.library.catalogue.url') ?? '';
    const { setClubExtendOffer } = useCatalogClubActions();
    const store = useCatalogStoreApi();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const creditFrame = useCreditAnimationFrame();
    const [ laterHovered, setLaterHovered ] = useState(false);
    const [ headNode, setHeadNode ] = useState<PixiContainer | null>(null);
    const headSize = useLayoutSize(headNode);
    const key = `catalog.club.extend.${offer.vip ? '' : 'basic.'}`;
    const originalPrice = offer.originalPricePerMonth * offer.months;
    const originalActivityPointPrice = offer.originalActivityPointPricePerMonth * offer.months;
    const expiration = (offer.subscriptionDaysLeft > 1)
        ? t(`${key}expiration_days_left`, '', { day: String(offer.subscriptionDaysLeft), duration: String(31 * offer.months) })
        : t(`${key}expires_today`);
    const close = () => setClubExtendOffer(undefined);
    // `background_container.height = itemlist.y + total_amount_line.height + total_amount_line.y`:
    // the title and the two price rows above the line, measured.
    const backgroundHeight = LIST_TOP + headSize.height + 3;

    return (
        <Frame
            id="club-extend-confirmation"
            variant="3"
            centered
            rememberPosition={false}
            caption={t(`${key}confirm.caption`)}
            tintColor="#007a98"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            resizeDirection="none"
            margins={[ 0, 33, 0, 3 ]}
            onClose={close}
            layout={{ position: 'absolute', width: 450, height: 235 }}
        >
            <Region
                name="background_container"
                backgroundColor="#bcbdbc"
                layout={{ position: 'absolute', left: 1, width: 448, top: 0, height: backgroundHeight }}
            />
            <Icon
                variant={offer.vip ? 18 : 17}
                name="club_level_icon"
                layout={{ position: 'absolute', left: offer.vip ? 25 : 40, width: 85, top: 25, height: 40 }}
            />
            <ReflectResize
                height={CONTENT_HEIGHT}
                layout={{ position: 'absolute', left: 140, width: 285, top: LIST_TOP, flexDirection: 'column' }}
            >
                <Region
                    ref={setHeadNode}
                    layout={{ width: 285, flexDirection: 'column', flexShrink: 0 }}
                >
                    <ThemeText
                        name="extend_title"
                        text={t(`${key}confirm.title`)}
                        textStyle="u_headline_big"
                        textOptions={{ wordWrap: true, wordWrapWidth: 262 }}
                        flashFormat={{ thickness: -15, sharpness: 80 }}
                        verticalAlign="top"
                        layout={{ width: 266, marginBottom: 10, flexShrink: 0 }}
                    />
                    <PriceRow
                        name="normal_price"
                        height={30}
                        bold={false}
                        label={t(`${key}normal.label`)}
                        priceLeft={originalPrice}
                        priceRight={originalActivityPointPrice}
                        activityPointType={offer.originalActivityPointType}
                        creditIcon={CREDIT_ICON}
                    />
                    <PriceRow
                        name="you_save"
                        height={30}
                        bold={false}
                        label={t(`${key}save.label`)}
                        priceLeft={originalPrice - offer.priceCredits}
                        priceRight={(originalActivityPointPrice * offer.months) - offer.priceActivityPoints}
                        activityPointType={offer.originalActivityPointType}
                        creditIcon={CREDIT_ICON}
                    />
                </Region>
                <Region
                    name="total_amount_line"
                    backgroundColor="#007a98"
                    layout={{ width: 285, height: 3, flexShrink: 0 }}
                />
                <Region
                    name="spacer"
                    layout={{ width: 100, height: 8, flexShrink: 0 }}
                />
                <PriceRow
                    name="your_price"
                    height={31}
                    bold
                    label={t(`${key}price.label`)}
                    priceLeft={offer.priceCredits}
                    priceRight={offer.priceActivityPoints}
                    activityPointType={offer.originalActivityPointType}
                    creditIcon={CREDIT_ICONS[creditFrame]}
                />
                <ThemeText
                    name="offer_expiration"
                    text={expiration}
                    textStyle="u_bold"
                    textOptions={{ fill: '#666666', fontSize: 14, wordWrap: true, wordWrapWidth: 240 }}
                    flashFormat={{ thickness: -15, sharpness: 80 }}
                    verticalAlign="top"
                    layout={{ width: 244, marginBottom: 5, flexShrink: 0 }}
                />
                <Region layout={{ width: 100, height: 10, flexShrink: 0 }} />
                <Region
                    name="action_container"
                    layout={{ width: 285, height: 40, flexShrink: 0 }}
                >
                    <ButtonThick
                        variant="3"
                        name="buy_now_button"
                        onPointerTap={() => confirmClubExtend(send, store)}
                        layout={{ position: 'absolute', left: 135, width: 150, top: 0, height: 30 }}
                    >
                        {t(`${key}buy.button`)}
                    </ButtonThick>
                    <Region
                        name="maybe_later_region"
                        cursor="pointer"
                        onPointerOver={() => setLaterHovered(true)}
                        onPointerOut={() => setLaterHovered(false)}
                        onPointerTap={close}
                        layout={{ position: 'absolute', left: 0, top: 0, minWidth: 5, height: 32 }}
                    >
                        <ThemeText
                            name="maybe_later_link"
                            text={t(`${key}later.link`)}
                            textStyle="u_regular"
                            textOptions={{ fill: laterHovered ? LINK_COLOR_HOVER : LINK_COLOR_DEFAULT }}
                            flashFormat={{ underline: true, thickness: -15, sharpness: 80 }}
                            verticalAlign="top"
                            layout={{ marginTop: 5 }}
                        />
                    </Region>
                </Region>
            </ReflectResize>
            <Region layout={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
                <ThemeImage
                    name="club_teaser"
                    src={`${catalogueUrl}catalogue/vip_extend_tsr.png`}
                    layout={{ position: 'absolute', left: 1, bottom: -(33 + 3) }}
                />
            </Region>
        </Frame>
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
