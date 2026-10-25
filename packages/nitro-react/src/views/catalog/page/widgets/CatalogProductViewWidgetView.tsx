import { AvatarGenderType, FurnitureTypeEnum, RoomId, RoomObjectCategoryEnum, RoomObjectVariableEnum, Vector3d } from '@nitrodevco/nitro-api';
import { GetTicker } from '@nitrodevco/nitro-renderer';
import { TemplateBinding, TemplateItem } from '@nitrodevco/nitro-theme';
import { Container as PixiContainer } from 'pixi.js';
import { RefObject, useEffect, useRef, useState } from 'react';

import { requestSelectedItemToMover } from '#base/commands';
import { AvatarImage, RoomPreviewer, RoomPreviewerHandle } from '#base/components';
import { getCatalogPageImage, getCatalogPageText, useCatalogStoreApi } from '#base/context/catalog';
import { useHabbiconPreview } from '#base/context/habbicons';
import { useBadgeImageUrl, useConfigData, useConfigValue, useTranslation } from '#base/context/system';
import { ROOM_PREVIEWER_OBJECT_ID } from '#base/hooks';
import { Box, Region, ThemeImage, useLayoutSize, useTemplateLibrary } from '#base/theme';
import { getOfferProduct } from '#base/utils';
import { CollectiblesPreviewSlots, CollectiblesProductPreview } from '#base/views/shared/CollectiblesProductPreview';

import { CatalogWidgetProps } from '../CatalogPageRegistry';
import { CATALOG_LIBRARY } from '../catalogTemplates';
import { fitWidgetView, useCatalogWidgetView } from '../catalogWidgetView';
import { bundleProductItem } from './catalogGridItem';
import { priceBoxItem } from './catalogPrice';
import { productExtraItem } from './catalogProductExtra';
import { isBundle, PREVIEW_MODE_AVATAR, PREVIEW_MODE_FLOOR_FURNITURE, PREVIEW_MODE_NONE, PREVIEW_MODE_WALL_ITEM, PreviewImage, useProductPreview } from './useProductPreview';
import { useProductPreviewAvatarPose } from './useProductPreviewAvatarPose';
import { PREVIEW_ZOOM_IN_CAMERA_OFFSET_Y, progressScale, useProductPreviewZoom } from './useProductPreviewZoom';

/** `RoomPreviewer.PREVIEW_WALL_ITEM_LOCATION`. */
const PREVIEW_WALL_ITEM_LOCATION = new Vector3d(0.5, 2.3, 1.8);

/** `product_image_widget`'s window: its `product_preview` fills the 360x200 widget. */
const PRODUCT_IMAGE_SLOTS: CollectiblesPreviewSlots = { productPreview: { left: 0, top: 0, width: 360, height: 200 } };

/** `getHabbiconPreviewBitmap`: the habbicon's preview, or Flash's grey 40x40 square until the habbicon assets are in. */
const HabbiconPreview = ({ habbiconId }: { habbiconId: number }) => {
    const preview = useHabbiconPreview(habbiconId);

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
    const [ canRotateFloor, setCanRotateFloor ] = useState(false);
    const pressed = useRef(false);
    const previewerRef = useRef<RoomPreviewerHandle>(null);
    const catalogImageUrl = useConfigValue<string>('asset.urls.catalog') ?? '';
    const store = useCatalogStoreApi();
    const templates = useTemplateLibrary(CATALOG_LIBRARY);
    const config = useConfigData();
    const badgeUrl = useBadgeImageUrl();
    const t = useTranslation();
    const roomCanvasEnabled = !tags.includes('NO_ROOM_CANVAS');
    const zoom = useProductPreviewZoom();
    const avatarPose = useProductPreviewAvatarPose(previewerRef, zoom);
    const { offer, canvasVisible, previewImage, productImagePreview, priceBox, previewMode, showLastSelection } = useProductPreview(page, roomCanvasEnabled, previewerRef, avatarPose);
    const product = offer ? getOfferProduct(offer) : undefined;

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

    /** `rotateCurrentPreview(delta)`: the left button is +1, the right -1. */
    const rotateCurrentPreview = (delta: number) => {
        const room = previewerRef.current?.room;

        if (!room) return;

        switch (previewMode) {
            case PREVIEW_MODE_AVATAR:
                avatarPose.rotatePreviewAvatar(delta);
                return;
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

        avatarPose.cyclePreviewAvatarAction();
    };

    /** `togglePreviewZoom`. */
    const togglePreviewZoom = () => {
        if (previewMode !== PREVIEW_MODE_AVATAR) return;

        avatarPose.togglePreviewZoom();
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
                    zoomProgress={zoom.zoomProgress}
                    onReady={showLastSelection}
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
