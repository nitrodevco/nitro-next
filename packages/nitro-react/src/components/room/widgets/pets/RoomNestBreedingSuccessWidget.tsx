import { RoomObjectUserType } from '@nitrodevco/nitro-api';

import { useRoomObjectIdByWebId, useRoomPetsActions, useRoomStore } from '#base/context/room';
import { NestBreedingSuccessView } from '#base/views/room-widgets/pets/NestBreedingSuccessView';

/**
 * A nest finished - `NestBreedingSuccessView`: the baby is looked up among the room's pets by
 * its id, as `findPetRoomObjectIdByWebId` did, so its picture and name come from the room.
 */
export const RoomNestBreedingSuccessWidget = () => {
    const success = useRoomStore(x => x.nestBreedingSuccess);
    const objectId = useRoomObjectIdByWebId(success?.petId ?? -1, RoomObjectUserType.Pet);
    const pet = useRoomStore(x => ((objectId !== undefined) ? x.usersByRoomObjectId[objectId] : undefined));
    const { setNestBreedingSuccess } = useRoomPetsActions();

    if (!success) return null;

    return (
        <NestBreedingSuccessView
            petName={pet?.name ?? ''}
            figure={pet?.figure ?? ''}
            posture={pet?.petPosture ?? ''}
            rarityCategory={success.rarityCategory}
            onOk={() => setNestBreedingSuccess(undefined)}
        />
    );
};
