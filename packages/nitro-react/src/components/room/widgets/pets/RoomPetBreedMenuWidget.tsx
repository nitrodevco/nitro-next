import { RoomObjectCategoryEnum, RoomObjectUserType, RoomWidgetUpdateRoomObjectEvent } from '@nitrodevco/nitro-api';

import { useRoomPetsActions, useRoomStore } from '#base/context/room';
import { useRoomEventDispatcher } from '#base/hooks';
import { PetBreedMenuView } from '#base/views/room-widgets/pets/PetBreedMenuView';

import { RoomObjectMenuBubble } from '../object-menu/RoomObjectMenuBubble';

/**
 * The bubbles that offer to breed your monsterplant with each plant that could - one over each
 * partner, as `AvatarInfoWidget.showBreedPetMenuForItems` put them. Picking one opens the
 * confirmation for that pair; deselecting takes them all down.
 */
export const RoomPetBreedMenuWidget = () => {
    const breedMenu = useRoomStore(x => x.breedMenu);
    const users = useRoomStore(x => x.usersByRoomObjectId);
    const { setBreedMenu, setPlantBreeding } = useRoomPetsActions();

    useRoomEventDispatcher(RoomWidgetUpdateRoomObjectEvent.OBJECT_DESELECTED, () => setBreedMenu(undefined));

    if (!breedMenu) return null;

    return (
        <>
            {breedMenu.partnerObjectIds.map((objectId) => {
                const partner = users[objectId];

                if (!partner) return null;

                return (
                    <RoomObjectMenuBubble
                        key={objectId}
                        objectData={{ objectId, category: RoomObjectCategoryEnum.Unit }}
                        userType={RoomObjectUserType.Pet}
                    >
                        <PetBreedMenuView
                            name={partner.name}
                            onBreed={() => setPlantBreeding({ requestObjectId: breedMenu.petObjectId, targetObjectId: objectId, mode: 'ask' })}
                        />
                    </RoomObjectMenuBubble>
                );
            })}
        </>
    );
};
