import { FurnitureSpecialType, FurnitureTypeEnum, IPurchasableOffer, RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { useEffect, useRef, useState } from 'react';

import { requestOfficialSongId, requestSongInfoWithoutSamples } from '#base/commands';
import { CatalogWidgetBundleDisplayExtraInfoEvent, CatalogWidgetEventEnum, CatalogWidgetSpinnerEvent, getCatalogPageImage, useCatalogStore } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useRoomStore } from '#base/context/room';
import { useConfigValue, useTranslation } from '#base/context/system';
import { useCatalogWidgetEvent } from '#base/hooks';
import { Border, Button, LayoutImage, Region, ThemeImage, ThemeText, useTextureFromUrl } from '#base/theme';
import { getOfferProduct } from '#base/utils';

import { useFurnitureImageTexture } from '../../useFurnitureImageTexture';
import { CatalogWidgetProps } from '../CatalogPageRegistry';
import { CatalogProductPriceView } from './CatalogProductPriceView';

/** `ExtraInfoItemData.TYPE_RESET_MESSAGE`: the row `setBundleInfoWidgetToOffer` resets the bundle info with. */
const EXTRA_INFO_TYPE_RESET_MESSAGE = 5;
/** `onPreviewProduct`'s still image: `getFurnitureImage` / `getWallItemImage` at direction 90, scale 64. */
const PREVIEW_DIRECTION = 90;

/**
 * The song disk page's product view, Flash's `SongDiskProductViewCatalogWidget` - a
 * `ProductViewCatalogWidget` drawn from `layout_soundmachine`'s `EMBEDDED` container (360x240):
 * the `ctlg_teaserimg_1` bitmap filling it, the product's name (`ctlg_product_name`, bold, wrapped
 * at 175) and description (`ctlg_description`, small) at 10,16 and 10,34, the song's length
 * (`ctlg_song_length`) at 10,53, and the `playPreviewContainer` (a half-blended grey style 2 border
 * with the `play_preview` text and the `listen` button) at 7,195.
 *
 * The product view half, for a layout with no room canvas: the offer's name and description in
 * black, its furniture drawn still at direction 90 and scale 64 and centred in the bitmap
 * (`getFurnitureImage` for a floor item, `getWallItemImage` for a wall item - a wallpaper, floor
 * or landscape only updates the catalogue's hidden room previewer, and leaves the bitmap empty),
 * the price box 6px in from the bitmap's bottom right corner (`showPriceOnProduct(..., -6, false,
 * 6)`, credits as the seasonal currency when the page takes it as credits) and an offer's badge in
 * the `badgeDisplayWidget` 6px from the right and 44px from the bottom (`showExtraOnProduct`). The
 * spinner and the bundle info follow the product view's rule: shown and reset for an offer bought
 * in bulk once the total price widget is there (and the price box then left off), hidden
 * otherwise. Until the first product the bitmap shows the page's second image, which
 * `LocalizationCatalogWidget` copies into it centred.
 *
 * The song disk half (`onSelectProduct`): a product whose extra parameter is set names the song -
 * a song id, or (when it does not read as one, `parseInt` giving 0) an official song's code, whose
 * id `GetOfficialSongIdMessageComposer` asks for (`CatalogMediaSlice`). Such a product shows the
 * `playPreviewContainer`, which then stays; any other one forgets the song. `updateView` shows the
 * song's length (`catalog.song.length`, `%min%` and two-digit `%sec%`) and enables `listen` once
 * the song's info is known - the sound manager's song cache, here `roomStore.songInfoById`,
 * asked for with `requestSongInfoWithoutSamples` when it is not - and clears the length and
 * disables the button otherwise. The layout's `00:00` shows until the first product.
 *
 * Not in the port: the trax player. `listen` starts `HabboMusicController.playSong(songId, 3, 15,
 * 40, 0.5, 2)` after cutting the fade-out of whatever plays at priorities 0 and 3, and closing the
 * page stops priority 3; the port has no music controller, so the button enables and disables as
 * in Flash and plays nothing. Nor are the product view's chat style extra (`IPurchasableOffer`
 * carries no `extraChatStyleCode`) or ninja effect badge (`catalogue_effects_ninja` is not shipped)
 * drawn, nor its stuff data override, which no widget of this page sends. The song info request is
 * not made for a song id below 1, which names no song.
 */
export const CatalogSongDiskProductViewWidgetView = ({ page }: CatalogWidgetProps) => {
    const [ offer, setOffer ] = useState<IPurchasableOffer | undefined>(undefined);
    const [ songId, setSongId ] = useState(-1);
    const [ officialSongId, setOfficialSongId ] = useState('');
    const [ playPreviewVisible, setPlayPreviewVisible ] = useState(false);
    const [ showPrice, setShowPrice ] = useState(true);
    const totalPriceWidgetInitialized = useRef(false);
    const multiplePurchaseEnabled = (useConfigValue<boolean>('catalog.multiple.purchase.enabled') === true) && !page.isBuilderPage;
    const catalogImageUrl = useConfigValue<string>('asset.urls.catalog') ?? '';
    const badgeUrl = useConfigValue<string>('badge.asset.url') ?? '';
    const officialSongIds = useCatalogStore(x => x.officialSongIds);
    const songInfoById = useRoomStore(x => x.songInfoById);
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const product = offer ? getOfferProduct(offer) : undefined;
    const pageImage = getCatalogPageImage(page, 'ctlg_teaserimg_1');
    const badgeTexture = useTextureFromUrl(offer?.badgeCode ? badgeUrl.replace('%badgename%', offer.badgeCode) : undefined);

    // `onOfficialSongIdMessageEvent`: the answer for the code asked for is the song.
    const currentSongId = ((songId === 0) && (officialSongIds[officialSongId] !== undefined)) ? officialSongIds[officialSongId] : songId;
    const song = songInfoById[currentSongId];
    const songLength = song ? Math.trunc(song.length / 1000) : -1;

    const isStillImage = !!product && ((product.productType === FurnitureTypeEnum.Floor) || ((product.productType === FurnitureTypeEnum.Wall) && (product.furnitureData?.specialType !== FurnitureSpecialType.WallPaper) && (product.furnitureData?.specialType !== FurnitureSpecialType.Floor) && (product.furnitureData?.specialType !== FurnitureSpecialType.Landscape)));

    const { texture } = useFurnitureImageTexture(
        isStillImage ? product.furnitureData?.className : undefined,
        product?.furnitureData?.colorIndex,
        PREVIEW_DIRECTION,
        RoomGeometryScaleType.ZoomedIn,
        product ? parseInt(product.extraParam) : undefined,
    );

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.SELECT_PRODUCT, (event) => {
        const selected = event.offer;
        const selectedProduct = getOfferProduct(selected);

        setOffer(selected);

        // `ProductViewCatalogWidget.onPreviewProduct`: the quantity widgets.
        if (multiplePurchaseEnabled && selected.bundlePurchaseAllowed && totalPriceWidgetInitialized.current) {
            page.events.dispatchEvent({ type: CatalogWidgetSpinnerEvent.RESET, value: 1 });
            page.events.dispatchEvent({ type: CatalogWidgetSpinnerEvent.SHOW, value: 1 });
            page.events.dispatchEvent({ type: CatalogWidgetSpinnerEvent.SET_MIN, value: 1 });
            page.events.dispatchEvent({
                type: CatalogWidgetBundleDisplayExtraInfoEvent.RESET,
                id: -1,
                data: {
                    type: EXTRA_INFO_TYPE_RESET_MESSAGE,
                    text: '',
                    quantity: 0,
                    priceCredits: selected.priceInCredits,
                    priceActivityPoints: selected.priceInActivityPoints,
                    activityPointType: selected.activityPointType,
                    priceSilver: selected.priceInSilver,
                    badgeCode: selected.badgeCode ?? '',
                    achievementCode: '',
                    discountPriceCredits: 0,
                    discountPriceActivityPoints: 0,
                },
            });
            setShowPrice(false);
        } else {
            page.events.dispatchEvent({ type: CatalogWidgetSpinnerEvent.HIDE, value: 1 });
            page.events.dispatchEvent({ type: CatalogWidgetBundleDisplayExtraInfoEvent.HIDE, id: -1 });
            setShowPrice(true);
        }

        // `SongDiskProductViewCatalogWidget.onSelectProduct`.
        const extraParam = selectedProduct?.extraParam ?? '';

        if (!extraParam.length) {
            setSongId(-1);

            return;
        }

        const parsed = parseInt(extraParam);
        const nextSongId = isNaN(parsed) ? 0 : parsed;

        setSongId(nextSongId);

        if (nextSongId === 0) {
            setOfficialSongId(extraParam);
            requestOfficialSongId(send, extraParam);
        }

        setPlayPreviewVisible(true);
    });

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.TOTAL_PRICE_WIDGET_INITIALIZED, () => {
        totalPriceWidgetInitialized.current = true;
    });

    // `getSongLength`: a song the cache does not know is asked for.
    useEffect(() => {
        if ((currentSongId < 1) || song) return;

        requestSongInfoWithoutSamples(send, currentSongId);
    }, [ currentSongId ]);

    // `init()` fails for a page with no offers: the widget draws nothing.
    if (!page.offers.length) return null;

    const lengthCaption = !offer
        ? '00:00'
        : ((songLength >= 0) ? t('catalog.song.length', '', { min: String(Math.trunc(songLength / 60)), sec: String(songLength % 60).padStart(2, '0') }) : '');

    return (
        <Region layout={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}>
            <ThemeImage
                name="ctlg_teaserimg_1"
                texture={(offer && isStillImage) ? texture : undefined}
                src={(!offer && pageImage) ? catalogImageUrl.replace('%name%', pageImage) : undefined}
                bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
            />
            <ThemeText
                name="ctlg_product_name"
                text={offer ? (product?.productData?.name ?? t(offer.localizationId)) : ''}
                textStyle="u_bold"
                textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 171 }}
                markup
                verticalAlign="top"
                layout={{ position: 'absolute', left: 10, width: 175, top: 16 }}
            />
            <ThemeText
                name="ctlg_description"
                text={offer ? (product?.productData?.description ?? '') : ''}
                textStyle="u_small"
                textOptions={{ fill: '#000000' }}
                markup
                verticalAlign="top"
                layout={{ position: 'absolute', left: 10, top: 34 }}
            />
            <ThemeText
                name="ctlg_song_length"
                text={lengthCaption}
                textStyle="u_small"
                markup
                verticalAlign="top"
                layout={{ position: 'absolute', left: 10, top: 53 }}
            />
            {playPreviewVisible && (
                <Region
                    name="playPreviewContainer"
                    layout={{ position: 'absolute', left: 7, width: 175, top: 195, height: 36 }}
                >
                    <Border
                        variant="2"
                        tintColor="#cccccc"
                        blend={0.5}
                        layout={{ position: 'absolute', left: 0, width: 175, top: 0, height: 36 }}
                    />
                    <Button
                        variant="3"
                        name="listen"
                        disabled={songLength < 0}
                        layout={{ position: 'absolute', left: 102, width: 66, top: 8, height: 22, minWidth: 66, maxWidth: 66 }}
                    >
                        {t('play_preview_button')}
                    </Button>
                    <ThemeText
                        name="play_preview_text"
                        text={t('play_preview')}
                        textStyle="u_small"
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 9, top: 11 }}
                    />
                </Region>
            )}
            {offer && showPrice && !page.isBuilderPage && (
                <CatalogProductPriceView
                    offer={offer}
                    seasonal={page.acceptSeasonCurrencyAsCredits}
                    combo={page.acceptSeasonCurrencyAsCredits}
                    layout={{ right: 6, bottom: 6 }}
                />
            )}
            {offer?.badgeCode && (
                <Region
                    name="HCU_dynamic_badge"
                    layout={{ position: 'absolute', right: 6, width: 42, bottom: 44, height: 42 }}
                >
                    <ThemeImage
                        name="asset_image"
                        src={LayoutImage('catalog/catalogue_badge_background.png')}
                        bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center', fitSizeToContents: true }}
                        layout={{ position: 'absolute', left: 0, top: 0 }}
                    />
                    <Region
                        name="badge_image"
                        layout={{ position: 'absolute', left: 0, width: 42, top: 0, height: 42, justifyContent: 'center', alignItems: 'center' }}
                    >
                        {badgeTexture && (
                            <pixiSprite
                                texture={badgeTexture}
                                layout={{ width: badgeTexture.width, height: badgeTexture.height }}
                            />
                        )}
                    </Region>
                </Region>
            )}
        </Region>
    );
};
