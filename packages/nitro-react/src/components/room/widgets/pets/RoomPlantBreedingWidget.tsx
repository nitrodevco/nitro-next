import { BreedPetsComposer } from '@nitrodevco/nitro-packets';

import { useWebSocketContext } from '#base/context/communication';
import { useRoomPetsActions, useRoomStore } from '#base/context/room';
import { useTranslation, useWindowActions } from '#base/context/system';
import { BreedingPlant, PlantBreedingView } from '#base/views/room-widgets/pets/PlantBreedingView';

/** `BreedPetsMessageComposer`'s first argument. */
const BREED_ASK = 0;
const BREED_CANCEL = 1;
const BREED_ACCEPT = 2;

/**
 * Two monsterplants about to breed - `BreedMonsterPlantsConfirmationView`. Proposing sends the
 * request and, when the other plant is someone else's, tells you to wait for them; their side
 * sees the same dialog in accept mode. Either side's cancel calls it off for both.
 */
export const RoomPlantBreedingWidget = () => {
    const request = useRoomStore(x => x.plantBreeding);
    const plant1 = useRoomStore(x => (request ? x.usersByRoomObjectId[request.requestObjectId] : undefined));
    const plant2 = useRoomStore(x => (request ? x.usersByRoomObjectId[request.targetObjectId] : undefined));
    const { setPlantBreeding } = useRoomPetsActions();
    const { showAlert } = useWindowActions();
    const { send } = useWebSocketContext();
    const t = useTranslation();

    if (!request || !plant1 || !plant2) return null;

    const asPlant = (plant: typeof plant1): BreedingPlant => ({ name: plant.name, figure: plant.figure, posture: plant.petPosture, rarityLevel: plant.rarityLevel, ownerName: plant.ownerName });
    const sendState = (state: number) => send(new BreedPetsComposer({ state, petId: plant1.webID, otherPetId: plant2.webID }));

    return (
        <PlantBreedingView
            mode={request.mode}
            plant1={asPlant(plant1)}
            plant2={asPlant(plant2)}
            onBreed={() => {
                sendState(BREED_ASK);

                if (plant1.ownerId !== plant2.ownerId) showAlert(t('breedpets.confirmation.notification.title'), t('breedpets.confirmation.notification.text'));

                setPlantBreeding(undefined);
            }}
            onAccept={() => {
                sendState(BREED_ACCEPT);
                setPlantBreeding(undefined);
            }}
            onCancel={() => {
                sendState(BREED_CANCEL);
                setPlantBreeding(undefined);
            }}
        />
    );
};
