import { AvatarActionStateType, AvatarActionStateTypeUtilities, AvatarGenderType, CatalogPricingModelEnum, FurnitureSpecialType, FurnitureTypeEnum, IObjectData, IProduct, IPurchasableOffer, RoomId, RoomObjectCategoryEnum, RoomObjectVariableEnum, Vector3d } from '@nitrodevco/nitro-api';
import { GetAvatarRenderManager, GetRoomContentLoader, GetTicker } from '@nitrodevco/nitro-renderer';
import { TemplateBinding, TemplateItem } from '@nitrodevco/nitro-theme';
import { Container as PixiContainer } from 'pixi.js';
import { RefObject, useEffect, useRef, useState } from 'react';

import { productImageWidgetPreview, requestSelectedItemToMover } from '#base/commands';
import { AvatarImage, RoomPreviewer, RoomPreviewerHandle } from '#base/components';
import { CatalogWidgetEventEnum, CatalogWidgetSpinnerEvent, getCatalogPageImage, getCatalogPageText, SelectProductEvent, useCatalogStoreApi } from '#base/context/catalog';
import { COLLECTIBLE_PREVIEW_EASTER_EGG_INITIAL, COLLECTIBLE_PRODUCT_TYPE_CHAT_STYLE, CollectiblePreview, CollectiblePreviewEasterEgg, CollectibleProductInfo } from '#base/context/collectibles';
import { useHabbiconsStore } from '#base/context/habbicons';
import { getRoomPatterns } from '#base/context/room';
import { useConfigData, useConfigValue, useTranslation } from '#base/context/system';
import { useUserStore } from '#base/context/user';
import { ROOM_PREVIEWER_OBJECT_ID, useCatalogWidgetEvent } from '#base/hooks';
import { Box, Region, ThemeImage, useLayoutSize, useTemplateLibrary } from '#base/theme';
import { getOfferProduct, PRODUCT_IMAGES } from '#base/utils';
import { CollectiblesPreviewSlots, CollectiblesProductPreview } from '#base/views/shared/CollectiblesProductPreview';

import { CatalogWidgetProps } from '../CatalogPageRegistry';
import { CATALOG_LIBRARY } from '../catalogTemplates';
import { fitWidgetView, useCatalogWidgetView } from '../catalogWidgetView';
import { bundleProductItem } from './catalogGridItem';
import { priceBoxItem } from './catalogPrice';
import { productExtraItem } from './catalogProductExtra';
import { useProductQuantityWidgets } from './useProductQuantityWidgets';

/** `ProductViewCatalogWidget`'s preview modes. */
const PREVIEW_MODE_NONE = 0;
const PREVIEW_MODE_AVATAR = 1;
const PREVIEW_MODE_FLOOR_FURNITURE = 2;
const PREVIEW_MODE_WALL_ITEM = 3;

/** Its avatar actions, cycled by `toggle_preview_magic`. */
const PREVIEW_ACTION_STAND = 0;
const PREVIEW_ACTION_WALK = 1;
const PREVIEW_ACTION_DANCE = 2;
const PREVIEW_ACTION_SIT = 3;
const PREVIEW_ACTION_LAY = 4;
const PREVIEW_ACTION_WAVE = 5;
const PREVIEW_ACTION_COUNT = 6;

const PREVIEW_AVATAR_DEFAULT_BODY_DIRECTION = 2;
const PREVIEW_AVATAR_DEFAULT_HEAD_DIRECTION = 3;

/** `PREVIEW_ZOOM_NORMAL` / `PREVIEW_ZOOM_IN`, and the zoom animation's constants. */
const PREVIEW_ZOOM_NORMAL = 1;
const PREVIEW_ZOOM_IN = 2;
const PREVIEW_ZOOM_IN_CAMERA_OFFSET_Y = 41;
const PREVIEW_ZOOM_MOVE_SPEED_DENOMINATOR = 9;
const PREVIEW_ZOOM_SPEED_SLOW = 0.12;
const PREVIEW_ZOOM_SPEED_MIN = 0.06;

/** `RoomPreviewer.PREVIEW_OBJECT_LOCATION`, `PREVIEW_WALL_ITEM_LOCATION` and the widget's sit and lay offsets. */
const PREVIEW_OBJECT_LOCATION = new Vector3d(2, 2, 0);
const PREVIEW_WALL_ITEM_LOCATION = new Vector3d(0.5, 2.3, 1.8);
const PREVIEW_SIT_OFFSETS = new Vector3d(2, 2, 0.55);
const PREVIEW_LAY_OFFSETS = new Vector3d(1, 1, 0.8);

const normalizeAvatarDirection = (direction: number) => {
    const value = direction % 8;

    return (value < 0) ? (value + 8) : value;
};

const isDiagonalAvatarDirection = (direction: number) => ((normalizeAvatarDirection(direction) % 2) !== 0);

const isValidLayingDirection = (direction: number) => {
    const value = normalizeAvatarDirection(direction);

    return (value === 0) || (value === 2);
};

/** `isPreviewAvatarActionSkippedForDirection`. */
const isPreviewAvatarActionSkippedForDirection = (action: number, direction: number) => (((action === PREVIEW_ACTION_SIT) && isDiagonalAvatarDirection(direction)) || ((action === PREVIEW_ACTION_LAY) && !isValidLayingDirection(direction)));

/** `getPreviewAvatarLocation`. */
const getPreviewAvatarLocation = (action: number) => {
    switch (action) {
        case PREVIEW_ACTION_SIT: return PREVIEW_SIT_OFFSETS;
        case PREVIEW_ACTION_LAY: return PREVIEW_LAY_OFFSETS;
        default: return PREVIEW_OBJECT_LOCATION;
    }
};

/** `ProductDisplayWrapper.isSupported`: the product types the `product_image_widget` draws - of those, only a chat style reaches it (a bot has its own case). */
const productDisplayWrapper = (product: IProduct): CollectibleProductInfo | null => ((product.productType === FurnitureTypeEnum.ChatStyle)
    ? { productTypeId: COLLECTIBLE_PRODUCT_TYPE_CHAT_STYLE, itemTypeId: product.extraParam, petFigureString: '', figureSetIds: [], extraData: '', amount: 0 }
    : null);

/** `product_image_widget`'s window: its `product_preview` fills the 360x200 widget. */
const PRODUCT_IMAGE_SLOTS: CollectiblesPreviewSlots = { productPreview: { left: 0, top: 0, width: 360, height: 200 } };

const isBundle = (offer: IPurchasableOffer) => (Number(offer.pricingModel) === Number(CatalogPricingModelEnum.Bundle));

/** `getHabbiconPreviewBitmap`: the habbicon's preview, or Flash's grey 40x40 square until the habbicon assets are in. */
const HabbiconPreview = ({ habbiconId }: { habbiconId: number }) => {
    const preview = useHabbiconsStore(state => state.previews[habbiconId]);

    return (
        <Box layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
            {preview
                ? (
                        <ThemeImage
                            texture={preview}
                            bitmap={{ stretchedX: false, stretchedY: false }}
                            layout={{ width: preview.width, height: preview.height }}
                        />
                    )
                : (
                        <Region
                            backgroundColor="#8f8f8f"
                            layout={{ width: 40, height: 40 }}
                        />
                    )}
        </Box>
    );
};

/** What the `ctlg_teaserimg_1` bitmap shows once an offer is selected (`setPreviewImage`). */
type PreviewImage
    = | { kind: 'none' }
        | { kind: 'url'; url: string }
        | { kind: 'deal' }
        | { kind: 'bot'; figure: string }
        | { kind: 'habbicon'; habbiconId: number };

/** `setPreviewImage`: what `ctlg_teaserimg_1` shows - the page's picture until an offer is selected. */
const teaserBinding = (image: PreviewImage | undefined, pageImageUrl: string): TemplateBinding => {
    switch (image?.kind) {
        case undefined: return { asset: pageImageUrl };
        case 'url': return { asset: image.url };
        case 'deal': return { asset: 'habbo-catalog-com-ctlg_dyndeal_background' };
        case 'bot': return {
            asset: '',
            children: (
                <Box layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                    <AvatarImage
                        figure={image.figure}
                        gender={AvatarGenderType.Male}
                        direction={4}
                    />
                </Box>
            ),
        };
        case 'habbicon': return { asset: '', children: <HabbiconPreview habbiconId={image.habbiconId} /> };
        default: return { asset: '' };
    }
};

interface RoomCanvasProps {
    previewerRef: RefObject<RoomPreviewerHandle | null>;
    zoomProgress: number;
    /** The previewer's room exists: a selection made before it is shown again. */
    onReady: () => void;
}

/**
 * `room_canvas`: the room previewer's display object, filling the canvas, under the zoom transform
 * (`applyRoomCanvasZoom`). Kept mounted while the canvas is hidden; its room is made a render after
 * it mounts, and a selection made before that is shown again once it is there.
 */
const RoomCanvas = ({ previewerRef, zoomProgress, onReady }: RoomCanvasProps) => {
    const [ node, setNode ] = useState<PixiContainer | null>(null);
    const { width, height } = useLayoutSize(node);
    const zoomScale = 1 + progressScale(zoomProgress);

    return (
        <Box
            ref={setNode}
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, overflow: 'hidden' }}
        >
            <pixiContainer
                scale={zoomScale}
                x={-((width * zoomScale) - width) / 2}
                y={(-((height * zoomScale) - height) / 2) - (PREVIEW_ZOOM_IN_CAMERA_OFFSET_Y * zoomProgress)}
            >
                {/* A layout root of its own under the zoom transform. */}
                <Box layout={{ width, height }}>
                    <RoomPreviewer
                        ref={previewerRef}
                        roomId={RoomId.TEMP_ROOM_CATALOG}
                        showFloor={true}
                        showWalls={true}
                        onReady={onReady}
                        layout={{ position: 'absolute', top: 0, left: 0, width, height }}
                    />
                </Box>
            </pixiContainer>
        </Box>
    );
};

/** The avatar preview's pose - `§_-ZO§`, `§_-t1p§`, `§_-s1W§` and `§_-1q§`. */
interface AvatarPose {
    direction: number;
    headDirection: number;
    action: number;
    zoom: number;
}

const DEFAULT_POSE: AvatarPose = { direction: PREVIEW_AVATAR_DEFAULT_BODY_DIRECTION, headDirection: PREVIEW_AVATAR_DEFAULT_HEAD_DIRECTION, action: PREVIEW_ACTION_STAND, zoom: PREVIEW_ZOOM_NORMAL };

/**
 * The product preview, `productViewWidget.xml` - Flash's `ProductViewCatalogWidget`, sized to its
 * container: the `ctlg_teaserimg_1` picture, the room previewer on `room_canvas_container`'s black
 * fill, the preview controls, the bundle grid, and over them the offer's name (`u_bold`) and
 * description (small italic), with the no-trade and no-recycle marks under them.
 *
 * Before an offer is selected the picture and the description are the page's
 * (`LocalizationCatalogWidget` fills `ctlg_teaserimg_1` and `ctlg_description`), in black.
 * `onPreviewProduct` (`SelectProductEvent`) then shows the offer:
 * - the name and description from the product data (`${<localizationId>}` without it); the
 *   `tradeable_icon` for a furni that cannot be traded and the `recyclable_icon` for one that
 *   cannot be traded or recycled, outside the builders club (`updateAvailabilityIndicators`);
 * - a bulk offer (`catalog.multiple.purchase.enabled`, once the total price widget has said it is
 *   there) resets and shows the spinner with the ruleset's flat price steps, maximum and minimum
 *   (`setSpinnerToBundleRuleset`) and resets the bundle info; any other offer hides both and gets
 *   the price box in the canvas's bottom right corner (`showPriceOnProduct`, not in the builders
 *   club), which a later `CWSE_VALUE_CHANGED` redraws for one item without the seasonal currency,
 *   as Flash's `onSpinnerEvent` does;
 * - an offer with a badge gets the `badgeDisplayWidget` (the badge on `catalogue_badge_background`)
 *   6px from the right and 44px from the bottom (`showExtraOnProduct`);
 * - an offer `PRODUCT_IMAGES` names shows that catalogue picture; a bundle the
 *   `ctlg_dyndeal_background` and its products in the `bundleGrid`; a bot its figure; and a floor
 *   item, wall item or effect the room preview - clothing (`FigurePurchasableSet`) and effects on
 *   the user's avatar, wallpapers, floors and landscapes on the planes of the room the user is in
 *   (a landscape through `window_double_default`), anything else placed in the room. The preview
 *   lifts a limited edition 15px (`addViewOffset`).
 *
 * The preview mode (`setPreviewMode`) drives the controls: the rotate buttons turn the avatar (two
 * steps into a diagonal while sitting, only 0 and 2 while laying), the floor item (enabled while
 * it has more than one allowed direction - checked every frame) or the wall item (mirrored);
 * `toggle_preview_magic` cycles the avatar through standing, walking, dancing, sitting, laying and
 * waving, and `toggle_preview_zoom` animates the avatar preview between 1x and 2x (41px up) the way
 * `onPreviewZoomAnimationFrame` eases it. An avatar preview starts zoomed in. A click on the preview
 * changes the object's state; dragging off it hands the offer to the catalogue's object mover.
 * The name and description are white over a visible room preview, black otherwise.
 *
 * `CWE_ROOM_CHANGED` and `CWE_SET_PREVIEWER_STUFFDATA` (a guild's colours, a badge) show the
 * offer again, the latter with that stuff data on the floor item.
 *
 * A single chat style offer shows its style in the `product_image_widget` (`ProductDisplayWrapper`
 * through `ProductImageWidget.previewImage`, easter egg included), and a habbicon its preview. The
 * extra over the preview is `productExtraItem`'s.
 *
 * Not exact: an effect on a page without a room canvas, which Flash draws as a still of the user's
 * avatar with the effect on the `pixelsBackground` colour, shows nothing there - the port's avatar
 * texture hook renders neither actions nor effect sprites. The bot
 * picture is the figure facing 4 without the head turned to 3 and the smile, which the avatar
 * image hook cannot render.
 */
export const CatalogProductViewWidgetView = ({ page, tags }: CatalogWidgetProps) => {
    const [ offer, setOffer ] = useState<IPurchasableOffer | undefined>(undefined);
    const [ canvasVisible, setCanvasVisible ] = useState(false);
    const [ previewImage, setPreviewImage ] = useState<PreviewImage | undefined>(undefined);
    // `§_-M1b§` / `§_-i5§`: the `product_image_widget`'s preview, and the widget's own easter egg memory.
    const [ productImagePreview, setProductImagePreview ] = useState<CollectiblePreview | undefined>(undefined);
    const productImageEasterEgg = useRef<CollectiblePreviewEasterEgg>(COLLECTIBLE_PREVIEW_EASTER_EGG_INITIAL);
    const [ priceBox, setPriceBox ] = useState<{ seasonal: boolean } | undefined>(undefined);
    const [ previewMode, setPreviewModeState ] = useState(PREVIEW_MODE_NONE);
    const [ canRotateFloor, setCanRotateFloor ] = useState(false);
    const [ pose, setPose ] = useState<AvatarPose>(DEFAULT_POSE);
    const [ zoomProgress, setZoomProgress ] = useState(0);
    const [ zoomTarget, setZoomTarget ] = useState(0);
    const lastSelection = useRef<SelectProductEvent | undefined>(undefined);
    const overrideStuffData = useRef<IObjectData | undefined>(undefined);
    const pressed = useRef(false);
    const previewerRef = useRef<RoomPreviewerHandle>(null);
    const applyQuantityWidgets = useProductQuantityWidgets(page);
    const catalogImageUrl = useConfigValue<string>('asset.urls.catalog') ?? '';
    const store = useCatalogStoreApi();
    const ownFigure = useUserStore(x => x.figure);
    const ownGender = useUserStore(x => x.sex);
    const templates = useTemplateLibrary(CATALOG_LIBRARY);
    const config = useConfigData();
    const badgeUrl = useConfigValue<string>('badge.asset.url') ?? '';
    const t = useTranslation();
    const roomCanvasEnabled = !tags.includes('NO_ROOM_CANVAS');
    const product = offer ? getOfferProduct(offer) : undefined;

    /** `applyPreviewAvatarDirection`. */
    const applyPreviewAvatarDirection = (next: AvatarPose) => {
        const room = previewerRef.current?.room;

        if (!room) return;

        const location = getPreviewAvatarLocation(next.action);

        room.updateRoomObjectUser(ROOM_PREVIEWER_OBJECT_ID, location, location, false, 0, new Vector3d(next.direction * 45), next.headDirection * 45);
    };

    /** `applyPreviewAvatarAction`. */
    const applyPreviewAvatarAction = (next: AvatarPose) => {
        const room = previewerRef.current?.room;

        if (!room) return;

        room.updateRoomObjectUserAction(ROOM_PREVIEWER_OBJECT_ID, RoomObjectVariableEnum.FigureDance, 0);
        room.updateRoomObjectUserAction(ROOM_PREVIEWER_OBJECT_ID, RoomObjectVariableEnum.FigureExpression, 0);

        switch (next.action) {
            case PREVIEW_ACTION_WALK:
                room.updateRoomObjectUserPosture(ROOM_PREVIEWER_OBJECT_ID, 'mv');
                break;
            case PREVIEW_ACTION_DANCE:
                room.updateRoomObjectUserPosture(ROOM_PREVIEWER_OBJECT_ID, 'std');
                room.updateRoomObjectUserAction(ROOM_PREVIEWER_OBJECT_ID, RoomObjectVariableEnum.FigureDance, 1);
                break;
            case PREVIEW_ACTION_SIT:
                room.updateRoomObjectUserPosture(ROOM_PREVIEWER_OBJECT_ID, 'sit');
                break;
            case PREVIEW_ACTION_LAY:
                room.updateRoomObjectUserPosture(ROOM_PREVIEWER_OBJECT_ID, 'lay');
                break;
            case PREVIEW_ACTION_WAVE:
                room.updateRoomObjectUserPosture(ROOM_PREVIEWER_OBJECT_ID, 'std');
                room.updateRoomObjectUserAction(ROOM_PREVIEWER_OBJECT_ID, RoomObjectVariableEnum.FigureExpression, AvatarActionStateTypeUtilities.getExpressionId(AvatarActionStateType.Wave));
                break;
            default:
                room.updateRoomObjectUserPosture(ROOM_PREVIEWER_OBJECT_ID, 'std');
        }

        applyPreviewAvatarDirection(next);
    };

    /**
     * `setPreviewMode`: no room preview on show means no mode; leaving the avatar resets its pose
     * and zoom at once, entering it zooms in at once.
     */
    const setPreviewMode = (mode: number, visible: boolean) => {
        const next = (!roomCanvasEnabled || !visible) ? PREVIEW_MODE_NONE : mode;

        if ((previewMode === PREVIEW_MODE_AVATAR) && (next !== PREVIEW_MODE_AVATAR)) {
            setPose(DEFAULT_POSE);
            setZoomTarget(0);
            setZoomProgress(0);
        }

        if ((previewMode !== PREVIEW_MODE_AVATAR) && (next === PREVIEW_MODE_AVATAR)) {
            setPose({ ...DEFAULT_POSE, zoom: PREVIEW_ZOOM_IN });
            setZoomTarget(1);
            setZoomProgress(1);
        }

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

        if (mode === PREVIEW_MODE_AVATAR) {
            // `addAvatarIntoRoom` then `applyPreviewAvatarDirection` / `applyPreviewAvatarAction` - with the pose the mode leaves.
            const nextPose = (previewMode === PREVIEW_MODE_AVATAR) ? pose : { ...DEFAULT_POSE, zoom: PREVIEW_ZOOM_IN };

            applyPreviewAvatarDirection(nextPose);
            applyPreviewAvatarAction(nextPose);
        }
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

    // `onFloorFurnitureRotationAvailabilityFrame`: whether the floor item can turn, checked every frame.
    useEffect(() => {
        if (previewMode !== PREVIEW_MODE_FLOOR_FURNITURE) return;

        const check = () => {
            const directions = previewerRef.current?.room?.getRoomObject(ROOM_PREVIEWER_OBJECT_ID, RoomObjectCategoryEnum.Floor)?.model.getValue<number[]>(RoomObjectVariableEnum.FurnitureAllowedDirections);

            setCanRotateFloor(!!directions && (directions.length > 1));
        };

        GetTicker().add(check);

        return () => {
            GetTicker().remove(check);
        };
    }, [ previewMode ]);

    // `onPreviewZoomAnimationFrame`: ease the zoom towards its target, fast in the middle.
    useEffect(() => {
        if (zoomProgress === zoomTarget) return;

        let progress = zoomProgress;
        let peak = Math.abs(zoomTarget - zoomProgress);
        let lastStep = 0;
        let accelerating = true;

        const step = () => {
            const remaining = zoomTarget - progress;
            const distance = Math.abs(remaining);

            if (distance <= PREVIEW_ZOOM_SPEED_SLOW) {
                progress = zoomTarget;
                setZoomProgress(progress);

                return;
            }

            if (distance > peak) peak = distance;

            const wave = Math.sin((Math.PI * distance) / peak);
            let speed = PREVIEW_ZOOM_SPEED_MIN + (((peak / PREVIEW_ZOOM_MOVE_SPEED_DENOMINATOR) - PREVIEW_ZOOM_SPEED_MIN) * wave);

            if (accelerating) {
                if (speed < lastStep) speed = Math.min(lastStep, distance);
                else accelerating = false;
            }

            lastStep = speed;
            progress += (remaining > 0) ? speed : -speed;
            setZoomProgress(progress);
        };

        GetTicker().add(step);

        return () => {
            GetTicker().remove(step);
        };
    }, [ zoomTarget ]);

    /** `rotateCurrentPreview(delta)`: the left button is +1, the right -1. */
    const rotateCurrentPreview = (delta: number) => {
        const room = previewerRef.current?.room;

        if (!room) return;

        switch (previewMode) {
            case PREVIEW_MODE_AVATAR: {
                let step = delta;

                if ((pose.action === PREVIEW_ACTION_SIT) && isDiagonalAvatarDirection(pose.direction + step)) step *= 2;
                else if ((pose.action === PREVIEW_ACTION_LAY) && !isValidLayingDirection(pose.direction + step)) step = (pose.direction === 0) ? 2 : -pose.direction;

                const direction = normalizeAvatarDirection(pose.direction + step);
                const next = { ...pose, direction, headDirection: direction };

                setPose(next);
                applyPreviewAvatarDirection(next);
                return;
            }
            case PREVIEW_MODE_FLOOR_FURNITURE: {
                // `rotatePreviewFurniture(delta > 0)` through `getValidPreviewFurnitureDirection`.
                const roomObject = room.getRoomObject(ROOM_PREVIEWER_OBJECT_ID, RoomObjectCategoryEnum.Floor);
                const directions = roomObject?.model.getValue<number[]>(RoomObjectVariableEnum.FurnitureAllowedDirections);

                if (!roomObject || !directions?.length) return;

                const current = roomObject.getDirection().x;
                let index = directions.indexOf(current);

                if (index < 0) {
                    index = 0;

                    while ((index < directions.length) && (current > directions[index])) index++;

                    index %= directions.length;
                }

                index = (delta > 0) ? ((index + 1) % directions.length) : ((index - 1 + directions.length) % directions.length);

                if (directions[index] !== current) roomObject.setDirection(new Vector3d(directions[index]));
                return;
            }
            case PREVIEW_MODE_WALL_ITEM: {
                // `rotatePreviewWallItem`: mirror between 90 and 180, and move along the other wall.
                const roomObject = room.getRoomObject(ROOM_PREVIEWER_OBJECT_ID, RoomObjectCategoryEnum.Wall);

                if (!roomObject) return;

                const mirrored = ((((roomObject.getDirection().x % 360) + 360) % 360) === 180);
                const direction = mirrored ? 90 : 180;

                roomObject.setDirection(new Vector3d(direction));

                const sizeZ = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeZ);
                const centerZ = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureCenterZ);
                const z = (!isNaN(sizeZ) && !isNaN(centerZ)) ? (((3.6 - sizeZ) / 2) + centerZ) : roomObject.getLocation().z;
                const nowMirrored = (direction === 180);

                room.updateRoomObjectWallLocation(ROOM_PREVIEWER_OBJECT_ID, new Vector3d(nowMirrored ? PREVIEW_WALL_ITEM_LOCATION.y : PREVIEW_WALL_ITEM_LOCATION.x, nowMirrored ? PREVIEW_WALL_ITEM_LOCATION.x : PREVIEW_WALL_ITEM_LOCATION.y, z));
                return;
            }
        }
    };

    /** `cyclePreviewAvatarAction`. */
    const cyclePreviewAvatarAction = () => {
        if (previewMode !== PREVIEW_MODE_AVATAR) return;

        let action = pose.action;

        do {
            action = (action + 1) % PREVIEW_ACTION_COUNT;
        } while (isPreviewAvatarActionSkippedForDirection(action, pose.direction));

        const next = { ...pose, action };

        setPose(next);
        applyPreviewAvatarAction(next);
    };

    /** `togglePreviewZoom`. */
    const togglePreviewZoom = () => {
        if (previewMode !== PREVIEW_MODE_AVATAR) return;

        const zoom = (pose.zoom === PREVIEW_ZOOM_NORMAL) ? PREVIEW_ZOOM_IN : PREVIEW_ZOOM_NORMAL;

        setPose({ ...pose, zoom });
        setZoomTarget((zoom === PREVIEW_ZOOM_IN) ? 1 : 0);
    };

    /** `roomCanvasContainerProcedure`'s `WME_OUT` while pressed: the offer goes to the object mover. */
    const onCanvasPointerOut = () => {
        // The product view is the receiver, and its `onDragAndDropDone` does nothing.
        if (pressed.current && offer) requestSelectedItemToMover(store, { onDragAndDropDone: () => undefined }, offer);

        pressed.current = false;
    };

    // `updatePreviewControls`.
    const controlsVisible = (previewMode !== PREVIEW_MODE_NONE);
    const rotateEnabled = controlsVisible && ((previewMode !== PREVIEW_MODE_FLOOR_FURNITURE) || canRotateFloor);
    const avatarControls = (previewMode === PREVIEW_MODE_AVATAR);
    const textColor = (roomCanvasEnabled && canvasVisible) ? 0xffffff : 0x000000;
    const furnitureData = product?.furnitureData;
    const availabilityShown = !page.isBuilderPage && !!product && !!furnitureData && ((product.productType === FurnitureTypeEnum.Floor) || (product.productType === FurnitureTypeEnum.Wall));
    const pageImage = getCatalogPageImage(page, 'ctlg_teaserimg_1');
    const bundleProducts = (offer && isBundle(offer)) ? offer.products.filter(item => (item.productType !== FurnitureTypeEnum.Badge)) : [];
    const added: TemplateItem[] = [];

    if (templates && offer && priceBox) {
        const box = priceBoxItem(templates, offer, { config, seasonal: priceBox.seasonal, combo: priceBox.seasonal, builder: page.isBuilderPage, placement: { dx: -6, top: false, dy: 6 } });

        if (box) added.push(box);
    }

    const extra = (templates && offer) ? productExtraItem(templates, offer, badgeUrl) : undefined;

    if (extra) added.push(extra);

    useCatalogWidgetView(templates && {
        template: 'productViewWidget',
        bindings: {
            main_container: { added },
            ctlg_teaserimg_1: teaserBinding(previewImage, pageImage ? catalogImageUrl.replace('%name%', pageImage) : ''),
            product_image_widget: { visible: !!productImagePreview, children: productImagePreview && (
                <CollectiblesProductPreview
                    preview={productImagePreview}
                    slots={PRODUCT_IMAGE_SLOTS}
                />
            ) },
            room_canvas_container: {
                visible: canvasVisible,
                keepMounted: true,
                onPointerTap: () => previewerRef.current?.changeObjectState(),
                onPointerDown: () => {
                    pressed.current = true;
                },
                onPointerUp: () => {
                    pressed.current = false;
                },
                onPointerOver: () => {
                    pressed.current = false;
                },
                onPointerOut: onCanvasPointerOut,
            },
            room_canvas: { children: (
                <RoomCanvas
                    previewerRef={previewerRef}
                    zoomProgress={zoomProgress}
                    onReady={() => {
                        if (lastSelection.current) onPreviewProduct(lastSelection.current);
                    }}
                />
            ) },
            rotate_avatar_left: { visible: controlsVisible, disabled: !rotateEnabled, onPointerTap: () => rotateCurrentPreview(1) },
            rotate_avatar_right: { visible: controlsVisible, disabled: !rotateEnabled, onPointerTap: () => rotateCurrentPreview(-1) },
            toggle_preview_zoom: { visible: avatarControls, disabled: !avatarControls, onPointerTap: togglePreviewZoom },
            toggle_preview_magic: { visible: avatarControls, disabled: !avatarControls, onPointerTap: cyclePreviewAvatarAction },
            bundleGrid: { visible: bundleProducts.length > 0, items: templates ? bundleProducts.map((item, index) => bundleProductItem(item, String(index), templates)) : [] },
            ctlg_product_name: { caption: offer ? (product?.productData?.name ?? t(offer.localizationId)) : '', color: textColor },
            ctlg_description: { caption: offer ? (product?.productData?.description ?? t(offer.localizationId)) : (getCatalogPageText(page, 'ctlg_description') ?? ''), color: textColor },
            tradeable_icon: { visible: availabilityShown && !furnitureData.tradeable },
            recyclable_icon: { visible: availabilityShown && (!furnitureData.recyclable || !furnitureData.tradeable) },
        },
        arrange: tags.includes('FIXED') ? undefined : fitWidgetView,
    });

    return null;
};

/** `applyRoomCanvasZoom`'s scale above 1: `(PREVIEW_ZOOM_IN - PREVIEW_ZOOM_NORMAL) * progress`. */
const progressScale = (progress: number) => ((PREVIEW_ZOOM_IN - PREVIEW_ZOOM_NORMAL) * progress);
