import { IPetBreedingResultData } from '@nitrodevco/nitro-packets';

import { useRoomPetsActions, useRoomStore } from '#base/context/room';
import { useSystemStore } from '#base/context/system';
import { BreedingResultView, BreedingSeed } from '#base/views/room-widgets/pets/BreedingResultView';

/** `PetBreedingResultData.stuffId` when that owner got no seed. */
const NO_SEED = -1;

/**
 * What a plant breeding produced - `BreedPetsResultView`: a seed per owner, named from the
 * furniture data by class id. When one owner came away with nothing the wording says who was
 * the lucky one.
 */
export const RoomBreedingResultWidget = () => {
    const result = useRoomStore(x => x.breedingResult);
    const floorItems = useSystemStore(x => x.floorItems);
    const { setBreedingResult } = useRoomPetsActions();

    if (!result) return null;

    const asSeed = (data: IPetBreedingResultData): BreedingSeed => {
        const furniture = floorItems[data.classId];

        return {
            present: data.stuffId !== NO_SEED,
            className: furniture?.className ?? '',
            name: furniture?.localizedName ?? data.productCode,
            rarityLevel: data.rarityLevel,
            ownerName: data.userName,
            hasMutation: data.hasMutation,
        };
    };

    const missing = [ result.result, result.otherResult ].find(x => x.stuffId === NO_SEED);
    const lucky = missing ? [ result.result, result.otherResult ].find(x => x.stuffId !== NO_SEED) : undefined;

    return (
        <BreedingResultView
            seeds={[ asSeed(result.result), asSeed(result.otherResult) ]}
            luckyUser={lucky?.userName}
            onClose={() => setBreedingResult(undefined)}
        />
    );
};
