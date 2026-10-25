import { CancelPetBreedingComposer, ConfirmPetBreedingComposer } from '@nitrodevco/nitro-packets';

import { useWebSocketContext } from '#base/context/communication';
import { useRoomPetsActions, useRoomStore } from '#base/context/room';
import { useTranslation, useWindowActions } from '#base/context/system';
import { NestBreedingView } from '#base/views/room-widgets/pets/NestBreedingView';

/**
 * Two pets in a nest - `ConfirmPetBreedingView`. The server opens it (`ConfirmBreedingRequest`)
 * and closes it (`ConfirmBreedingResult`); this side only names the baby or calls it off.
 */
export const RoomNestBreedingWidget = () => {
    const request = useRoomStore(x => x.nestBreeding);
    const { setNestBreeding } = useRoomPetsActions();
    const { showSimpleAlert } = useWindowActions();
    const { send } = useWebSocketContext();
    const t = useTranslation();

    if (!request) return null;

    return (
        <NestBreedingView
            key={request.nestId}
            pet1={request.pet1}
            pet2={request.pet2}
            rarityCategories={request.rarityCategories}
            resultPetType={request.resultPetType}
            nameRejected={request.nameRejected}
            onBreed={(name) => {
                if (!name.length) {
                    // `ConfirmPetBreedingView`'s `save_button` with an empty name.
                    showSimpleAlert({
                        caption: t('breedpets.confirmation.alert.title'),
                        subtitle: t('breedpets.confirmation.alert.name.required.head'),
                        message: t('breedpets.confirmation.alert.name.required.desc'),
                    });

                    return;
                }

                send(new ConfirmPetBreedingComposer({ nestId: request.nestId, name, petId: request.pet1.webId, otherPetId: request.pet2.webId }));
            }}
            onCancel={() => {
                send(new CancelPetBreedingComposer({ nestId: request.nestId }));
                setNestBreeding(undefined);
            }}
        />
    );
};
