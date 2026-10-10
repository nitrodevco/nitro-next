import { FurnitureSpecialType, FurnitureTypeEnum, IPurchasableOffer, RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { TemplateItem } from '@nitrodevco/nitro-theme';
import { useEffect, useState } from 'react';

import { playSongDiskPreview, requestOfficialSongId, requestSongInfoWithoutSamples, stopSongDiskPreview } from '#base/commands';
import { CatalogWidgetEventEnum, useCatalogStore } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useRoomStore } from '#base/context/room';
import { useConfigData, useConfigValue, useTranslation } from '#base/context/system';
import { useCatalogWidgetEvent, useFurnitureImageTexture } from '#base/hooks';
import { ThemeImage, useTemplateLibrary } from '#base/theme';
import { getOfferProduct } from '#base/utils';

import { CatalogWidgetProps } from '../CatalogPageRegistry';
import { CATALOG_LIBRARY } from '../catalogTemplates';
import { useCatalogWidgetView } from '../catalogWidgetView';
import { priceBoxItem } from './catalogPrice';
import { productExtraItem } from './catalogProductExtra';
import { useProductQuantityWidgets } from './useProductQuantityWidgets';

/** `onPreviewProduct`'s still image: `getFurnitureImage` / `getWallItemImage` at direction 90, scale 64. */
const PREVIEW_DIRECTION = 90;

/**
 * The song disk page's product view, Flash's `SongDiskProductViewCatalogWidget` - a
 * `ProductViewCatalogWidget` bound to `layout_soundmachine`'s `EMBEDDED` container: its
 * `ctlg_teaserimg_1` bitmap, `ctlg_product_name`, `ctlg_description`, `ctlg_song_length` and the
 * `playPreviewContainer` with the `listen` button.
 *
 * The product view half, for a layout with no room canvas: `init` blanks the name and description
 * and colours them black; a product shows its name and description, its furniture drawn still at
 * direction 90 and scale 64 and centred in the bitmap (`getFurnitureImage` for a floor item,
 * `getWallItemImage` for a wall item - a wallpaper, floor or landscape only updates the
 * catalogue's hidden room previewer, and leaves the bitmap empty), the `priceDisplayWidget` box
 * added 6px in from the bitmap's bottom right corner (`showPriceOnProduct(..., ctlg_teaserimg_1,
 * -6, false, 6)`, credits as the seasonal currency when the page takes it as credits) and the
 * offer's extra (`showExtraOnProduct`, `productExtraItem`). The spinner and the bundle info follow
 * the product view's rule: shown and reset for an offer bought in bulk once the total price widget
 * is there (and the price box then left off), hidden otherwise. Until the first product the bitmap
 * shows the page's second image, which `LocalizationCatalogWidget` puts in it.
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
 * `listen` (`onClickPlay`) plays the song through the sound manager's music controller -
 * `playSong(songId, 3, 15, 40, 0.5, 2)` after cutting the fade-out of whatever plays at priorities 0
 * and 3 (`playSongDiskPreview`) - and the page closing or going away stops priority 3
 * (`closed` / `dispose`, `stopSongDiskPreview`).
 *
 * Not in the port: the product view's stuff data override, which no widget of this page sends.
 * The song info request is not made for a song id below 1, which names no song.
 */
export const CatalogSongDiskProductViewWidgetView = ({ page }: CatalogWidgetProps) => {
    const [ offer, setOffer ] = useState<IPurchasableOffer | undefined>(undefined);
    const [ songId, setSongId ] = useState(-1);
    const [ officialSongId, setOfficialSongId ] = useState('');
    const [ playPreviewVisible, setPlayPreviewVisible ] = useState(false);
    const [ showPrice, setShowPrice ] = useState(true);
    const applyQuantityWidgets = useProductQuantityWidgets(page);
    const templates = useTemplateLibrary(CATALOG_LIBRARY);
    const config = useConfigData();
    const badgeUrl = useConfigValue<string>('badge.asset.url') ?? '';
    const officialSongIds = useCatalogStore(x => x.officialSongIds);
    const songInfoById = useRoomStore(x => x.songInfoById);
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const product = offer ? getOfferProduct(offer) : undefined;

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
        setShowPrice(!applyQuantityWidgets(selected));

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

    // `getSongLength`: a song the cache does not know is asked for.
    useEffect(() => {
        if ((currentSongId < 1) || song) return;

        requestSongInfoWithoutSamples(send, currentSongId);
    }, [ currentSongId ]);

    // `closed` / `dispose`: the preview stops with the page.
    useEffect(() => () => stopSongDiskPreview(), []);

    const lengthCaption = !offer
        ? '00:00'
        : ((songLength >= 0) ? t('catalog.song.length', '', { min: String(Math.trunc(songLength / 60)), sec: String(songLength % 60).padStart(2, '0') }) : '');

    const added: TemplateItem[] = [];

    if (templates && offer && showPrice) {
        const box = priceBoxItem(templates, offer, { config, seasonal: page.acceptSeasonCurrencyAsCredits, combo: page.acceptSeasonCurrencyAsCredits, builder: page.isBuilderPage, placement: { reference: 'ctlg_teaserimg_1', dx: -6, top: false, dy: 6 } });

        if (box) added.push(box);
    }

    const extra = (templates && offer) ? productExtraItem(templates, offer, badgeUrl) : undefined;

    if (extra) added.push(extra);

    // `init()` fails for a page with no offers: the container stays as the layout has it.
    useCatalogWidgetView(page.offers.length
        ? {
                bindings: {
                    '': { added },
                    // `setPreviewImage`: the bitmap cleared and the still image centred in it; the page's image until the first product.
                    ctlg_teaserimg_1: offer
                        ? {
                                asset: '',
                                children: (isStillImage && texture) && (
                                    <ThemeImage
                                        texture={texture}
                                        bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                                    />
                                ),
                            }
                        : {},
                    ctlg_product_name: { caption: offer ? (product?.productData?.name ?? t(offer.localizationId)) : '', color: 0x000000 },
                    ctlg_description: { caption: offer ? (product?.productData?.description ?? '') : '', color: 0x000000 },
                    ctlg_song_length: { caption: lengthCaption },
                    playPreviewContainer: { visible: playPreviewVisible },
                    listen: { disabled: songLength < 0, onPointerTap: () => playSongDiskPreview(currentSongId) },
                },
            }
        : undefined);

    return null;
};
