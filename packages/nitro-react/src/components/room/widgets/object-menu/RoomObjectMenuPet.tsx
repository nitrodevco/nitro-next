import { ISimpleRoomObjectData, PetType, RoomObjectCategoryEnum, RoomObjectOperationType, RoomObjectUserType } from '@nitrodevco/nitro-api';
import { ChatComposer, GetPetCommandsComposer, HarvestPetComposer, MountPetComposer, RemoveSaddleFromPetComposer, RespectPetComposer, TogglePetBreedingPermissionComposer, TogglePetRidingPermissionComposer } from '@nitrodevco/nitro-packets';
import { useEffect } from 'react';

import { openClientLink } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useRoomPetCommands, useRoomPetInfo, useRoomPetsActions, useRoomStore } from '#base/context/room';
import { useConfigValue, useTranslation } from '#base/context/system';
import { useOwnUserId, useUserActions, useUserStore } from '#base/context/user';
import { useWiredShowInspectButton } from '#base/context/wired';
import { useRoomObjectModify } from '#base/hooks';
import { petTypeFromFigure } from '#base/utils';
import { InfoBubblePetView, PetMenuAction } from '#base/views/room-widgets/object-menu/InfoBubblePetView';

/** `PetInfo.accessRights` - one means anyone in the room may ride it. */
const RIDING_PERMISSION_OPEN = 1;

/** `OwnPetMenuView`: the pets a nest can breed, each behind its own `nest.breeding.<type>.enabled` flag. */
const NEST_BREEDING_TYPES: Record<number, string> = {
    [PetType.DOG]: 'dog',
    [PetType.CAT]: 'cat',
    [PetType.TERRIER]: 'terrier',
    [PetType.BEAR]: 'bear',
    [PetType.PIG]: 'pig',
};

/** `pet.command.46`: what a nest-bred pet is told to start breeding. */
const BREED_COMMAND = 46;

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
    const showWiredInspect = useWiredShowInspectButton();
    const users = useRoomStore(x => x.usersByRoomObjectId);
    const { decreasePetRespects } = useUserActions();
    const { setBreedMenu } = useRoomPetsActions();
    const { modifyRoomObject } = useRoomObjectModify();
    const ownUserId = useOwnUserId();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const petType = petTypeFromFigure(userData?.figure);
    const nestBreedingEnabled = useConfigValue<boolean>(`nest.breeding.${NEST_BREEDING_TYPES[petType] ?? 'none'}.enabled`) ?? false;

    // The commands are only worth asking about for a pet we could actually train.
    useEffect(() => {
        if (!petId || !info || (info.ownerId !== ownUserId)) return;

        send(new GetPetCommandsComposer({ petId }));
    }, [ petId, info, ownUserId, send ]);

    if (!userData) return null;

    const isOwner = !!info && (info.ownerId === ownUserId);
    // `AvatarInfoWidget.isMonsterPlant`: the pet's type, from its figure - not its breed.
    const isMonsterplant = petType === PetType.MONSTERPLANT;
    // A plant breeds with another plant in the room; a nest-bred pet is simply told to.
    const canStartBreeding = isMonsterplant ? !!info?.canBreed : ((petType in NEST_BREEDING_TYPES) && nestBreedingEnabled);

    /*
     * `AvatarInfoWidgetHandler.activateBreedMenuForPets`: every other plant of the same type
     * that may breed and whose owner allows it (or is you).
     */
    const openBreedMenu = () => {
        const partnerObjectIds = Object.values(users)
            .filter(other => (Number(other.userType) === Number(RoomObjectUserType.Pet)) && (other.objectId !== objectId))
            .filter(other => other.canBreed && (other.hasBreedingPermission || (other.ownerId === ownUserId)))
            .filter(other => petTypeFromFigure(other.figure) === petType)
            .map(other => other.objectId);

        setBreedMenu({ petObjectId: objectId, partnerObjectIds });
    };

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
            case 'breed':
                if (isMonsterplant) openBreedMenu();
                else send(new ChatComposer({ text: `${info?.name ?? userData.name} ${t(`pet.command.${BREED_COMMAND}`)}`, styleId: 0 }));
                break;
            // `RWUAM_WIRED_INSPECT_PET`: the wired menu's inspection of this pet, by its room index.
            case 'wired_inspect': openClientLink(send, `wiredmenu/open/inspection/1/${objectId}`); break;
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
            respectsLeft={petRespectLeft}
            // `OwnPetMenuView`: only a horse (`petType == 15`) is saddled and ridden.
            isMountable={petType === PetType.HORSE}
            isRiding={!!info?.isRiding}
            hasSaddle={!!info?.hasFreeSaddle}
            ridingPermissionOpen={info?.accessRights === RIDING_PERMISSION_OPEN}
            canBreed={!!info?.canBreed && isMonsterplant}
            hasBreedingPermission={!!info?.hasBreedingPermission}
            canHarvest={!!info?.canHarvest}
            canRevive={!!info?.canRevive}
            canStartBreeding={canStartBreeding}
            showWiredInspect={showWiredInspect}
            commands={commands.map(id => ({ id, label: t(`pet.command.${id}`, String(id)) }))}
            onAction={act}
            // A command is spoken at the pet, not sent as a packet of its own.
            onCommand={label => send(new ChatComposer({ text: `${info?.name ?? userData.name} ${label}`, styleId: 0 }))}
            onClose={onClose}
        />
    );
};
