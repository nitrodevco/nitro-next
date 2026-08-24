import { FurnitureSpecialType, FurnitureTypeEnum, RoomId, Vector3d } from '@nitrodevco/nitro-api';
import { GetAvatarRenderManager, GetRoomContentLoader } from '@nitrodevco/nitro-renderer';
import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { useEffect, useRef } from 'react';

import { useCatalogSelectors, useOwnUserLook, useTranslation } from '#base/context';
import { useCatalogOfferActions } from '#base/hooks';
import { Box, ColorLayer, Text } from '#base/theme-pixi';

import { useRoomPreviewerPixi } from '../../useRoomPreviewerPixi';

/** Pixi port of views/catalog/page/widgets/CatalogProductViewWidgetView.tsx. */
export const CatalogProductViewWidgetView = () => {
    const { activeOffer } = useCatalogSelectors();
    const { getOfferProduct } = useCatalogOfferActions();
    const previewRef = useRef<PixiContainer | null>(null);
    const { room, addFloorItemIntoRoom, addWallItemIntoRoom, addAvatarIntoRoom, changeObjectDirection, changeObjectState } = useRoomPreviewerPixi(RoomId.TEMP_ROOM_CATALOG, previewRef);
    const { ownFigure, ownGender } = useOwnUserLook();
    const t = useTranslation();
    const product = activeOffer ? getOfferProduct(activeOffer) : undefined;

    const onClick = (event: FederatedPointerEvent) => {
        if (!room) return;

        if (event.shiftKey) changeObjectDirection();
        else changeObjectState();
    };

    useEffect(() => {
        if (!room || !activeOffer || !product) return;

        switch (product.productType) {
            case FurnitureTypeEnum.Floor: {
                if (!product.furnitureData) return;

                if (product.furnitureData.specialType === FurnitureSpecialType.FigurePurchasableSet) {
                    const customParts = product.furnitureData.customParams.split(',').map(value => parseInt(value));
                    const figureSets: number[] = [];

                    for (const part of customParts) {
                        if (GetAvatarRenderManager().isValidFigureSetForGender(part, ownGender)) figureSets.push(part);
                    }

                    const figureString = GetAvatarRenderManager().getFigureStringWithFigureIds(ownFigure, ownGender, figureSets);

                    addAvatarIntoRoom(figureString, product.classId);
                } else {
                    addFloorItemIntoRoom(product.classId, new Vector3d(90));
                }
                return;
            }
            case FurnitureTypeEnum.Wall: {
                if (!product.furnitureData) return;

                switch (product.furnitureData.specialType) {
                    case FurnitureSpecialType.Floor:
                        room.updateRoomPlaneType(product.extraParam, undefined, undefined);
                        return;
                    case FurnitureSpecialType.WallPaper:
                        room.updateRoomPlaneType(undefined, product.extraParam, undefined);
                        return;
                    case FurnitureSpecialType.Landscape: {
                        room.updateRoomPlaneType(undefined, undefined, product.extraParam);

                        const typeId = GetRoomContentLoader().getFurnitureWallTypeIdForName('window_double_default');

                        if (typeId > -1) addWallItemIntoRoom(typeId, new Vector3d(90), '');
                        return;
                    }
                    default:
                        room.updateRoomPlaneType('default', 'default', 'default');
                        addWallItemIntoRoom(product.classId, new Vector3d(90), product.extraParam);
                        return;
                }
            }
            case FurnitureTypeEnum.Robot:
                addAvatarIntoRoom(product.extraParam, 0);
                return;
            case FurnitureTypeEnum.Effect:
                addAvatarIntoRoom(ownFigure, product.classId);
                return;
        }
    }, [ activeOffer ]);

    return (
        <Box layout={{ position: 'relative', width: '100%', height: '100%' }}>
            <ColorLayer color="#000000" />
            {activeOffer && (
                <Box
                    ref={previewRef}
                    eventMode="static"
                    cursor="pointer"
                    onPointerTap={onClick}
                    layout={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
                />
            )}
            {activeOffer && product && (
                <Box layout={{ position: 'absolute', top: 22, left: 5, width: 175, flexDirection: 'column', gap: 4 }}>
                    <Text
                        text={product.productData?.name ?? t(activeOffer.localizationId)}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Box>
            )}
        </Box>
    );
};
