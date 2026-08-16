
import { FurnitureSpecialType, FurnitureTypeEnum, RoomId, Vector3d } from "@nitrodevco/nitro-api";
import { useEffect, useRef } from "react";

import { useCatalogSelectors } from "#base/context";
import { useCatalogOfferActions, useRoomPreviewer } from "#base/hooks";
import { BitmapText, ContainerButton } from "#base/theme";

const CATALOG_ROOM_PREVIEW_OPTIONS = { centerWallItems: true } as const;

export const CatalogProductViewWidgetView = () => {
    const { activeOffer } = useCatalogSelectors();
    const { getOfferProduct } = useCatalogOfferActions();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const {
        isReady,
        canRotate,
        addFurnitureIntoRoom,
        addWallItemIntoRoom,
        resetRoomPreview,
        rotatePreviewObject,
        changePreviewObjectState,
        setAddViewOffset
    } = useRoomPreviewer(RoomId.TEMP_ROOM_CATALOG, canvasRef, CATALOG_ROOM_PREVIEW_OPTIONS);
    const product = activeOffer ? getOfferProduct(activeOffer) : undefined;
    const productName = product?.productData?.name || product?.furnitureData.localizedName || '';

    useEffect(() => {
        if (!isReady) return;

        setAddViewOffset({ x: 0, y: product?.isUnique ? -15 : 0 });

        if (!product) {
            resetRoomPreview(false);
            return;
        }

        switch (product.productType) {
            case FurnitureTypeEnum.Floor: {
                if (!product.furnitureData) return;

                if (product.furnitureData.specialType === FurnitureSpecialType.FigurePurchasableSet) {
                    resetRoomPreview(false);
                } else {
                    addFurnitureIntoRoom(product.classId, new Vector3d(90));
                }

                break;
            }
            case FurnitureTypeEnum.Wall: {
                switch (product.furnitureData.specialType) {
                    case FurnitureSpecialType.WallPaper:
                    case FurnitureSpecialType.Floor:
                    case FurnitureSpecialType.Landscape:
                        resetRoomPreview(false);
                        break;
                    default:
                        addWallItemIntoRoom(product.classId, new Vector3d(90), product.extraParam);
                        break;
                }

                break;
            }
            default:
                resetRoomPreview(false);
                break;
        }
    }, [product, isReady]);

    return (
        <div className="relative flex overflow-hidden size-full bg-black">
            <canvas
                key="catalog-room-preview"
                ref={canvasRef}
                className="absolute"
                onClick={() => changePreviewObjectState()} />
            {activeOffer && (
                <>
                    <BitmapText
                        recipe="bold-12"
                        color="#ffffff"
                        className="catalog-product-preview-name">
                        {productName}
                    </BitmapText>
                    <div className="catalog-product-preview-rotation-controls">
                        <ContainerButton
                            variant="5"
                            type="button"
                            aria-label="Rotate preview left"
                            className="catalog-product-preview-rotate-button is-left"
                            disabled={!canRotate}
                            onClick={() => rotatePreviewObject(false)}>
                            <span className="habbo-icon icon-arrow-left" />
                        </ContainerButton>
                        <ContainerButton
                            variant="5"
                            type="button"
                            aria-label="Rotate preview right"
                            className="catalog-product-preview-rotate-button is-right"
                            disabled={!canRotate}
                            onClick={() => rotatePreviewObject(true)}>
                            <span className="habbo-icon icon-arrow-right" />
                        </ContainerButton>
                    </div>
                </>
            )}
        </div>
    );
};
