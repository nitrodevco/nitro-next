import { FurnitureSpecialType, FurnitureTypeEnum, IRoom, RoomId, Vector3d } from '@nitrodevco/nitro-api';
import { GetAvatarRenderManager, GetRoomContentLoader } from '@nitrodevco/nitro-renderer';
import { FederatedPointerEvent } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';

import { RoomPreviewer, RoomPreviewerHandle } from '#base/components';
import { useCatalogSelectors, useOwnUserLook, useTranslation } from '#base/context';
import { useCatalogOfferActions } from '#base/hooks';
import { Box, ColorLayer, ThemeText } from '#base/theme';

/** Pixi port of views/catalog/page/widgets/CatalogProductViewWidgetView.tsx. */
export const CatalogProductViewWidgetView = () => {
    const { activeOffer } = useCatalogSelectors();
    const { getOfferProduct } = useCatalogOfferActions();
    const previewerRef = useRef<RoomPreviewerHandle>(null);
    // The previewer mounts with the offer, and its room only exists a render later - this is
    // what re-runs the offer effect at that point.
    const [ room, setRoom ] = useState<IRoom | undefined>(undefined);
    const { ownFigure, ownGender } = useOwnUserLook();
    const t = useTranslation();
    const product = activeOffer ? getOfferProduct(activeOffer) : undefined;

    const onClick = (event: FederatedPointerEvent) => {
        if (!previewerRef?.current) return;

        if (event.shiftKey) previewerRef.current.changeObjectDirection();
        else previewerRef.current.changeObjectState();
    };

    useEffect(() => {
        if (!activeOffer || !product || !room || !previewerRef.current) return;

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

                    previewerRef.current.addAvatar(figureString, product.classId);
                } else {
                    previewerRef.current.addFloorItem(product.classId, new Vector3d(90));
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

                        if (typeId > -1) previewerRef.current.addWallItem(typeId, new Vector3d(90), '');
                        return;
                    }
                    default:
                        room.updateRoomPlaneType('default', 'default', 'default');
                        previewerRef.current.addWallItem(product.classId, new Vector3d(90), product.extraParam);
                        return;
                }
            }
            case FurnitureTypeEnum.Robot:
                previewerRef.current.addAvatar(product.extraParam, 0);
                return;
            case FurnitureTypeEnum.Effect:
                previewerRef.current.addAvatar(ownFigure, product.classId);
                return;
        }
    }, [ activeOffer, room ]);

    return (
        <Box layout={{ position: 'relative', width: '100%', height: '100%' }}>
            <ColorLayer color="#000000" />
            {activeOffer && (
                <RoomPreviewer
                    ref={previewerRef}
                    roomId={RoomId.TEMP_ROOM_CATALOG}
                    showFloor={true}
                    showWalls={true}
                    onPointerTap={onClick}
                    onReady={api => setRoom(api.room)}
                    layout={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
                />
            )}
            {activeOffer && product && (
                <Box layout={{ position: 'absolute', top: 22, left: 5, width: 175, flexDirection: 'column', gap: 4 }}>
                    <ThemeText
                        text={product.productData?.name ?? t(activeOffer.localizationId)}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Box>
            )}
        </Box>
    );
};
