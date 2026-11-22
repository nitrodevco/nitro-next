/**
 * The furni infostand in the preview host's design window, drawn by the game's own `InfostandFurniView`
 * with a sample furni of the hotel's furni data - its name, description, owner and the room owner's
 * buttons, or a visitor's none, by the state - as `InfostandFurni` gives it for a selected furni. A
 * button sends nothing. Not a Flash feature.
 */
import { useSystemStore } from '#base/context/system';
import { Box } from '#base/theme';
import { InfostandFurniDetails, InfostandFurniView } from '#base/views/room-widgets/object-infostand/InfostandFurniView';

import { designState, INFOSTAND_FURNI_WINDOW } from './designStates';

const none = () => undefined;

export const DesignInfostandView = ({ state }: { state: string }) => {
    const furni = useSystemStore(x => Object.values(x.floorItems)[0]);
    const owner = designState(INFOSTAND_FURNI_WINDOW, state)?.tab === 'owner';
    const details: InfostandFurniDetails = {
        variant: 'furni', objectId: 1, kind: 'floor', typeId: furni?.id ?? 0, name: furni?.localizedName ?? 'Chair', description: furni?.description ?? 'A comfy chair',
        className: furni?.className ?? '', colorIndex: 0, isNft: false, ownerKind: 'user', ownerId: 1, ownerName: 'Bonnie', expiration: -1, group: undefined,
        uniqueSerial: undefined, chest: undefined, customVariables: undefined, staffDetails: undefined, crackable: undefined, jukebox: undefined, songDisk: undefined,
        canPlaceMore: false, canBuy: true, canRent: false, canExtend: false, canBuyout: false,
    };

    // The infostand's corner: bottom right, over the room's toolbar.
    return (
        <Box layout={{ position: 'absolute', right: 3, bottom: 52, flexDirection: 'column', alignItems: 'flex-end' }}>
            <InfostandFurniView
                details={details}
                canMove={owner}
                canRotate={owner}
                canUse={owner}
                canWiredInspect={false}
                pickupMode={owner ? 2 : 0}
                canSaveBranding={false}
                canRecolor={false}
                onRecolor={none}
                canLabelSettings={false}
                onLabelSettings={none}
                buttonsVisible={owner}
                onMove={none}
                onRotate={none}
                onPickup={none}
                onUse={none}
                onWiredInspect={none}
                onPlaceMore={none}
                onBuy={none}
                onRent={none}
                onExtend={none}
                onBuyout={none}
                onOpenOwner={none}
                onOpenGroup={none}
                onSaveBranding={none}
                onSetCustomVariables={none}
                onClose={none}
            />
        </Box>
    );
};
