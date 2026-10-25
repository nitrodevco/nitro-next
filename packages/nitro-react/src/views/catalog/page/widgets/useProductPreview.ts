import { CatalogPricingModelEnum, FurnitureSpecialType, FurnitureTypeEnum, IObjectData, IProduct, IPurchasableOffer, Vector3d } from '@nitrodevco/nitro-api';
import { GetAvatarRenderManager, GetRoomContentLoader } from '@nitrodevco/nitro-renderer';
import { RefObject, useRef, useState } from 'react';

import { productImageWidgetPreview } from '#base/commands';
import { RoomPreviewerHandle } from '#base/components';
import { CatalogPage, CatalogWidgetEventEnum, CatalogWidgetSpinnerEvent, SelectProductEvent } from '#base/context/catalog';
import { COLLECTIBLE_PREVIEW_EASTER_EGG_INITIAL, COLLECTIBLE_PRODUCT_TYPE_CHAT_STYLE, CollectiblePreview, CollectiblePreviewEasterEgg, CollectibleProductInfo } from '#base/context/collectibles';
import { getRoomPatterns } from '#base/context/room';
import { useConfigValue } from '#base/context/system';
import { useOwnUserFigure, useOwnUserGender } from '#base/context/user';
import { useCatalogWidgetEvent } from '#base/hooks';
import { getOfferProduct, PRODUCT_IMAGES } from '#base/utils';

import { ProductPreviewAvatarPose } from './useProductPreviewAvatarPose';
import { useProductQuantityWidgets } from './useProductQuantityWidgets';

/** `ProductViewCatalogWidget`'s preview modes. */
export const PREVIEW_MODE_NONE = 0;
export const PREVIEW_MODE_AVATAR = 1;
export const PREVIEW_MODE_FLOOR_FURNITURE = 2;
export const PREVIEW_MODE_WALL_ITEM = 3;

/** `ProductDisplayWrapper.isSupported`: the product types the `product_image_widget` draws - of those, only a chat style reaches it (a bot has its own case). */
const productDisplayWrapper = (product: IProduct): CollectibleProductInfo | null => ((product.productType === FurnitureTypeEnum.ChatStyle)
    ? { productTypeId: COLLECTIBLE_PRODUCT_TYPE_CHAT_STYLE, itemTypeId: product.extraParam, petFigureString: '', figureSetIds: [], extraData: '', amount: 0 }
    : null);

export const isBundle = (offer: IPurchasableOffer) => (Number(offer.pricingModel) === Number(CatalogPricingModelEnum.Bundle));

/** What the `ctlg_teaserimg_1` bitmap shows once an offer is selected (`setPreviewImage`). */
export type PreviewImage
    = | { kind: 'none' }
        | { kind: 'url'; url: string }
        | { kind: 'deal' }
        | { kind: 'bot'; figure: string }
        | { kind: 'habbicon'; habbiconId: number };

/**
 * `ProductViewCatalogWidget.onPreviewProduct` and `setPreviewMode`: the selected offer, what the
 * picture, the `product_image_widget` and the room previewer show for it, its price box and the
 * preview mode. A selection is shown again on `CWE_ROOM_CHANGED`, on `CWE_SET_PREVIEWER_STUFFDATA`
 * (with that stuff data on the floor item) and through `showLastSelection` once the previewer's
 * room is there.
 */
export const useProductPreview = (page: CatalogPage, roomCanvasEnabled: boolean, previewerRef: RefObject<RoomPreviewerHandle | null>, avatarPose: ProductPreviewAvatarPose) => {
    const [ offer, setOffer ] = useState<IPurchasableOffer | undefined>(undefined);
    const [ canvasVisible, setCanvasVisible ] = useState(false);
    const [ previewImage, setPreviewImage ] = useState<PreviewImage | undefined>(undefined);
    // `§_-M1b§` / `§_-i5§`: the `product_image_widget`'s preview, and the widget's own easter egg memory.
    const [ productImagePreview, setProductImagePreview ] = useState<CollectiblePreview | undefined>(undefined);
    const productImageEasterEgg = useRef<CollectiblePreviewEasterEgg>(COLLECTIBLE_PREVIEW_EASTER_EGG_INITIAL);
    const [ priceBox, setPriceBox ] = useState<{ seasonal: boolean } | undefined>(undefined);
    const [ previewMode, setPreviewModeState ] = useState(PREVIEW_MODE_NONE);
    const lastSelection = useRef<SelectProductEvent | undefined>(undefined);
    const overrideStuffData = useRef<IObjectData | undefined>(undefined);
    const applyQuantityWidgets = useProductQuantityWidgets(page);
    const catalogImageUrl = useConfigValue<string>('asset.urls.catalog') ?? '';
    const ownFigure = useOwnUserFigure();
    const ownGender = useOwnUserGender();

    /**
     * `setPreviewMode`: no room preview on show means no mode; leaving the avatar resets its pose
     * and zoom at once, entering it zooms in at once.
     */
    const setPreviewMode = (mode: number, visible: boolean) => {
        const next = (!roomCanvasEnabled || !visible) ? PREVIEW_MODE_NONE : mode;

        if ((previewMode === PREVIEW_MODE_AVATAR) && (next !== PREVIEW_MODE_AVATAR)) avatarPose.leaveAvatarPreview();

        if ((previewMode !== PREVIEW_MODE_AVATAR) && (next === PREVIEW_MODE_AVATAR)) avatarPose.enterAvatarPreview();

        setPreviewModeState(next);
    };

    /** `onPreviewProduct`. */
    const onPreviewProduct = (event: SelectProductEvent) => {
        const selected = event.offer;
        const selectedProduct = getOfferProduct(selected);
        const previewer = previewerRef.current;

        lastSelection.current = event;

        setOffer(selected);

        // `setSpinnerToBundleRuleset` and `setBundleInfoWidgetToOffer`, or both hidden.
        const bulk = applyQuantityWidgets(selected);

        setPriceBox((bulk || page.isBuilderPage) ? undefined : { seasonal: page.acceptSeasonCurrencyAsCredits });

        setProductImagePreview(undefined);

        const productImage = PRODUCT_IMAGES[selected.localizationId];

        if (productImage) {
            setPreviewImage({ kind: 'url', url: catalogImageUrl.replace('%name%', productImage) });
            setCanvasVisible(false);
            setPreviewMode(PREVIEW_MODE_NONE, false);

            return;
        }

        if (isBundle(selected)) {
            setPreviewImage({ kind: 'deal' });
            setCanvasVisible(false);
            setPreviewMode(PREVIEW_MODE_NONE, false);

            return;
        }

        if (!selectedProduct) {
            setPreviewImage({ kind: 'none' });
            setPreviewMode(PREVIEW_MODE_NONE, canvasVisible);

            return;
        }

        const type = selectedProduct.productType;
        const visible = roomCanvasEnabled && ((type === FurnitureTypeEnum.Floor) || (type === FurnitureTypeEnum.Wall) || (type === FurnitureTypeEnum.Effect));

        setCanvasVisible(visible);
        previewer?.setViewOffset(0, selectedProduct.isUnique ? -15 : 0);

        let mode = PREVIEW_MODE_NONE;

        switch (type) {
            case FurnitureTypeEnum.Floor: {
                if (!previewer || !selectedProduct.furnitureData) break;

                if (selectedProduct.furnitureData.specialType === FurnitureSpecialType.FigurePurchasableSet) {
                    const figureSets: number[] = [];

                    for (const part of selectedProduct.furnitureData.customParams.split(',')) {
                        if (GetAvatarRenderManager().isValidFigureSetForGender(parseInt(part), ownGender)) figureSets.push(parseInt(part));
                    }

                    previewer.addAvatar(GetAvatarRenderManager().getFigureStringWithFigureIds(ownFigure, ownGender, figureSets));
                    mode = PREVIEW_MODE_AVATAR;
                } else {
                    previewer.addFloorItem(selectedProduct.classId, new Vector3d(90), overrideStuffData.current);
                    mode = PREVIEW_MODE_FLOOR_FURNITURE;
                }
                break;
            }
            case FurnitureTypeEnum.Wall: {
                if (!previewer?.room || !selectedProduct.furnitureData) break;

                const specialType = selectedProduct.furnitureData.specialType;

                if ((specialType === FurnitureSpecialType.WallPaper) || (specialType === FurnitureSpecialType.Floor) || (specialType === FurnitureSpecialType.Landscape)) {
                    const { wallType, floorType, landscapeType } = getRoomPatterns();

                    previewer.room.updateRoomPlaneVisibilities(true, true);
                    previewer.room.updateRoomPlaneType(
                        (specialType === FurnitureSpecialType.Floor) ? selectedProduct.extraParam : floorType,
                        (specialType === FurnitureSpecialType.WallPaper) ? selectedProduct.extraParam : wallType,
                        (specialType === FurnitureSpecialType.Landscape) ? selectedProduct.extraParam : landscapeType,
                    );

                    if (specialType === FurnitureSpecialType.Landscape) {
                        const typeId = GetRoomContentLoader().getFurnitureWallTypeIdForName('window_double_default');

                        if (typeId > -1) previewer.addWallItem(typeId, new Vector3d(90), '');
                    }
                } else {
                    // `canRotatePreviewWallItem`: the wall item is there once it is added.
                    mode = (previewer.addWallItem(selectedProduct.classId, new Vector3d(90), selectedProduct.extraParam) > -1) ? PREVIEW_MODE_WALL_ITEM : PREVIEW_MODE_NONE;
                }
                break;
            }
            case FurnitureTypeEnum.Effect:
                if (!previewer) break;

                previewer.addAvatar(ownFigure, selectedProduct.classId);
                mode = PREVIEW_MODE_AVATAR;
                break;
        }

        // The default case: a `ProductDisplayWrapper` product in the `product_image_widget`.
        const displayInfo = productDisplayWrapper(selectedProduct);

        if (displayInfo) {
            const { preview, easterEgg } = productImageWidgetPreview(displayInfo, productImageEasterEgg.current);

            productImageEasterEgg.current = easterEgg;
            setProductImagePreview(preview);
        }

        switch (type) {
            case FurnitureTypeEnum.Robot:
                setPreviewImage({ kind: 'bot', figure: selectedProduct.extraParam });
                break;
            case FurnitureTypeEnum.Habbicon:
                setPreviewImage({ kind: 'habbicon', habbiconId: parseInt(selectedProduct.extraParam) });
                break;
            default:
                setPreviewImage({ kind: 'none' });
        }
        setPreviewMode(mode, visible);

        if (mode === PREVIEW_MODE_AVATAR) avatarPose.applyAvatarPose(previewMode === PREVIEW_MODE_AVATAR);
    };

    /** The selection made last, shown again. */
    const showLastSelection = () => {
        if (lastSelection.current) onPreviewProduct(lastSelection.current);
    };

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.SELECT_PRODUCT, event => onPreviewProduct(event));

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.ROOM_CHANGED, () => {
        if (lastSelection.current) onPreviewProduct(lastSelection.current);
    });

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.SET_PREVIEWER_STUFFDATA, (event) => {
        overrideStuffData.current = event.stuffData;

        if (lastSelection.current) onPreviewProduct(lastSelection.current);
    });

    useCatalogWidgetEvent(page, CatalogWidgetSpinnerEvent.VALUE_CHANGED, () => {
        // `onSpinnerEvent`: a price box on show is drawn again with `showPriceInContainer`'s defaults.
        if (priceBox) setPriceBox({ seasonal: false });
    });

    return { offer, canvasVisible, previewImage, productImagePreview, priceBox, previewMode, showLastSelection };
};
