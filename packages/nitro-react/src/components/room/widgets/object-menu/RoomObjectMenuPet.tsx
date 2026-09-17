import { ISimpleRoomObjectData, RoomObjectCategoryEnum, RoomObjectOperationType } from '@nitrodevco/nitro-api';
import { ChatComposer, GetPetCommandsComposer, HarvestPetComposer, MountPetComposer, RemoveSaddleFromPetComposer, RespectPetComposer, TogglePetBreedingPermissionComposer, TogglePetRidingPermissionComposer } from '@nitrodevco/nitro-packets';
import { useEffect } from 'react';

import { useWebSocketContext } from '#base/context/communication';
import { useRoomPetCommands, useRoomPetInfo, useRoomStore } from '#base/context/room';
import { useTranslation } from '#base/context/system';
import { useOwnUserId, useUserActions, useUserStore } from '#base/context/user';
import { useRoomObjectModify } from '#base/hooks';
import { InfoBubblePetView, PetMenuAction } from '#base/views/room-widgets/object-menu/InfoBubblePetView';

/** `PetInfo.accessRights` - one means anyone in the room may ride it. */
const RIDING_PERMISSION_OPEN = 1;

/** The breed that is a horse, and the one that is a monsterplant. */
const HORSE_BREED = 8;
const MONSTERPLANT_BREED = 16;

/**
 * The menu behind a pet - `OwnPetMenuView` and `PetMenuView`. What it offers is decided by the
 * pet info, which is asked for as soon as the pet is selected, so a pet clicked for the first
 * time fills its menu in a moment later.
 */
export const RoomObjectMenuPet = ({ objectData, onClose }: { objectData: ISimpleRoomObjectData; onClose: () => void }) => {
    const { objectId } = objectData;
    const userData = useRoomStore(x => x.usersByRoomObjectId[objectId]);
    const petId = userData?.webID ?? 0;
    const info = useRoomPetInfo(petId);
    const commands = useRoomPetCommands(petId);
    const petRespectLeft = useUserStore(x => x.petRespectLeft);
    const { decreasePetRespects } = useUserActions();
    const { modifyRoomObject } = useRoomObjectModify();
    const ownUserId = useOwnUserId();
    const { send } = useWebSocketContext();
    const t = useTranslation();

    // The commands are only worth asking about for a pet we could actually train.
    useEffect(() => {
        if (!petId || !info || (info.ownerId !== ownUserId)) return;

        send(new GetPetCommandsComposer({ petId }));
    }, [ petId, info, ownUserId, send ]);

    if (!userData) return null;

    const isOwner = !!info && (info.ownerId === ownUserId);

    const act = (action: PetMenuAction) => {
        switch (action) {
            case 'respect':
                send(new RespectPetComposer({ petId }));
                // Only a failed respect comes back, so the count is spent here.
                decreasePetRespects();
                break;
            case 'pick_up':
                modifyRoomObject(objectId, RoomObjectCategoryEnum.Unit, RoomObjectOperationType.OBJECT_PICKUP_PET);
                break;
            case 'mount': send(new MountPetComposer({ petId, mount: true })); break;
            case 'dismount': send(new MountPetComposer({ petId, mount: false })); break;
            case 'saddle_off': send(new RemoveSaddleFromPetComposer({ petId })); break;
            case 'toggle_riding_permission': send(new TogglePetRidingPermissionComposer({ petId })); break;
            case 'toggle_breeding_permission': send(new TogglePetBreedingPermissionComposer({ petId })); break;
            case 'harvest': send(new HarvestPetComposer({ petId })); break;
            // Reviving costs a seed, so it is bought from the catalogue rather than sent from here.
            case 'revive': break;
            case 'train': break;
        }
    };

    return (
        <InfoBubblePetView
            name={info?.name.length ? info.name : userData.name}
            isOwner={isOwner}
            canRespect={petRespectLeft > 0}
            isMountable={info?.breedId === HORSE_BREED}
            isRiding={!!info?.isRiding}
            hasSaddle={!!info?.hasFreeSaddle}
            ridingPermissionOpen={info?.accessRights === RIDING_PERMISSION_OPEN}
            canBreed={!!info?.canBreed && (info.breedId === MONSTERPLANT_BREED)}
            hasBreedingPermission={!!info?.hasBreedingPermission}
            canHarvest={!!info?.canHarvest}
            canRevive={!!info?.canRevive}
            commands={commands.map(id => ({ id, label: t(`pet.command.${id}`, String(id)) }))}
            onAction={act}
            // A command is spoken at the pet, not sent as a packet of its own.
            onCommand={label => send(new ChatComposer({ text: `${info?.name ?? userData.name} ${label}`, styleId: 0 }))}
            onClose={onClose}
        />
    );
};
