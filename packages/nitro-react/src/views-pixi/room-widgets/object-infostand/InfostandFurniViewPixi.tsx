import type { IRoomFurnitureData } from '@nitrodevco/nitro-api';
import { FurniturePickupMode, RoomGeometryScaleType } from '@nitrodevco/nitro-api';

import { useTranslation } from '#base/context';
import { Border, Box, Button, CloseButton, getPixiTextStyle } from '#base/theme-pixi';

import { useFurnitureImageTexturePixi } from '../../catalog/useFurnitureImageTexturePixi';

export interface InfostandFurniViewPixiProps {
    furniData: IRoomFurnitureData;
    canMove: boolean;
    canRotate: boolean;
    canUse: boolean;
    pickupMode: FurniturePickupMode;
    hasButtons: boolean;
    canSeeFurniId: boolean;
    godMode: boolean;
    processAction: (action: string) => void;
    onClose: () => void;
}

/**
 * Pixi port of views/room-widgets/object-infostand/InfostandFurniView.tsx. `furniData.furnitureData`/
 * `.name`/`.id` mirror DOM's own field access here exactly, including DOM's pre-existing type
 * error on all three (there are two differently-shaped `IRoomFurnitureData` interfaces in
 * `nitro-api` - room/IRoomFurnitureData.ts vs session/IRoomFurnitureData.ts - and this prop's
 * declared type resolves to the one missing these fields, same as DOM's own file). Preserved
 * rather than "fixed" since it's a pre-existing nitro-api type-shape issue, not something this
 * view's port introduced.
 */
export const InfostandFurniViewPixi = ({ furniData, canMove, canRotate, canUse, pickupMode, hasButtons, canSeeFurniId, processAction, onClose }: InfostandFurniViewPixiProps) => {
    const t = useTranslation();
    const { texture, width, height } = useFurnitureImageTexturePixi(furniData.furnitureData?.className, furniData.furnitureData?.colorIndex, 2, RoomGeometryScaleType.ZoomedIn);

    if (!furniData?.furnitureData) return null;

    return (
        <Box layout={{ flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
            <Border variant="1" layout={{ flexDirection: 'column', minWidth: 190, maxWidth: 190, gap: 5, padding: 10 }}>
                <Box layout={{ flexDirection: 'row', alignItems: 'center', width: '100%', gap: 8 }}>
                    <Box layout={{ flexDirection: 'row', flex: 1, alignItems: 'center', gap: 5 }}>
                        <pixiText layout={{}} text={furniData.name} style={getPixiTextStyle('text-style-regular', { fontFamily: 'GoldfishBold', fontSize: 9, fill: '#000000' })} />
                    </Box>
                    <CloseButton variant="1" onClose={onClose} layout={{ flexShrink: 0 }} />
                </Box>
                <Box layout={{ width: '100%', height: 1 }} />
                <Box layout={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', paddingTop: 5, paddingBottom: 5 }}>
                    {texture && <pixiSprite texture={texture} width={width} height={height} layout={{}} />}
                </Box>
                <Box layout={{ width: '100%', height: 1 }} />
                <Box layout={{ flexDirection: 'row', width: '100%', gap: 4 }}>
                    <pixiText layout={{}} text={t('furni.owner', '', { name: furniData.ownerName })} style={getPixiTextStyle('text-style-regular', { fontFamily: 'GoldfishBold', fontSize: 9, fill: '#000000' })} />
                    {canSeeFurniId && <pixiText layout={{}} text={`ID: ${furniData.id}`} style={getPixiTextStyle('text-style-regular', { fontFamily: 'GoldfishBold', fontSize: 9, fill: '#000000' })} />}
                </Box>
                <Box layout={{ flexDirection: 'row', width: '100%', gap: 4 }}>
                    <Button onPress={() => processAction('buy')} layout={{}}>{t('infostand.button.buy')}</Button>
                </Box>
            </Border>
            {hasButtons && (
                <Box layout={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 8 }}>
                    {canMove && <Button variant="1" onPress={() => processAction('move')} layout={{}}>{t('infostand.button.move')}</Button>}
                    {canRotate && <Button variant="1" onPress={() => processAction('rotate')} layout={{}}>{t('infostand.button.rotate')}</Button>}
                    {pickupMode === FurniturePickupMode.Eject && <Button variant="1" onPress={() => processAction('eject')} layout={{}}>{t('infostand.button.eject')}</Button>}
                    {pickupMode === FurniturePickupMode.Full && <Button onPress={() => processAction('pickup')} layout={{}}>{t('infostand.button.pickup')}</Button>}
                    {canUse && <Button variant="1" onPress={() => processAction('use')} layout={{}}>{t('infostand.button.use')}</Button>}
                </Box>
            )}
        </Box>
    );
};
