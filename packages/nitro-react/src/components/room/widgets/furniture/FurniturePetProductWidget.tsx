import { FurnitureSpecialType, IRoomUserData, RoomObjectUserType, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { CustomizePetWithFurniComposer } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useOwnUserId, useRoomContext, useRoomWidget, useRoomWidgetActions, useWebSocketContext } from '#base/context';
import { useRoomFurnitureData } from '#base/hooks';
import { FurniturePetPickerView } from '#base/views/room-widgets/furniture/FurniturePetPickerView';
import { FurnitureUseProductView } from '#base/views/room-widgets/furniture/FurnitureUseProductView';

/** Rebreeding is only offered from this level up; below it the plant is fertilised instead. */
const REBREED_LEVEL = 7;

/** What each kind of pet product calls itself, by the special type the furni data carries. */
const PRODUCT_TEXTS: Partial<Record<FurnitureSpecialType, { captionKey: string; infoKey: string; confirmKey: string }>> = {
    [FurnitureSpecialType.PetShampoo]: {
        captionKey: 'useproduct.widget.title', infoKey: 'useproduct.widget.info.shampoo', confirmKey: 'useproduct.widget.use',
    },
    [FurnitureSpecialType.PetCustomPart]: {
        captionKey: 'useproduct.widget.title', infoKey: 'useproduct.widget.info.custompart', confirmKey: 'useproduct.widget.use',
    },
    [FurnitureSpecialType.PetCustomPartShampoo]: {
        captionKey: 'useproduct.widget.title', infoKey: 'useproduct.widget.info.custompartshampoo', confirmKey: 'useproduct.widget.use',
    },
    [FurnitureSpecialType.PetSaddle]: {
        captionKey: 'useproduct.widget.title', infoKey: 'useproduct.widget.info.saddle', confirmKey: 'useproduct.widget.use',
    },
    [FurnitureSpecialType.MonsterplantRevival]: {
        captionKey: 'useproduct.widget.title.monsterplant', infoKey: 'useproduct.widget.info.revive_monsterplant', confirmKey: 'useproduct.widget.revive',
    },
    [FurnitureSpecialType.MonsterplantRebreed]: {
        captionKey: 'useproduct.widget.title.monsterplant_rebreed', infoKey: 'useproduct.widget.info.rebreed_monsterplant', confirmKey: 'useproduct.widget.rebreed',
    },
    [FurnitureSpecialType.MonsterplantFertilize]: {
        captionKey: 'useproduct.widget.title.monsterplant_fertilize', infoKey: 'useproduct.widget.info.fertilize_monsterplant', confirmKey: 'useproduct.widget.fertilize',
    },
};

/** A pet's own type is the first number of its figure, which is what a product is cut for. */
const petTypeId = (user: IRoomUserData): number => parseInt((user.figure ?? '').split(' ')[0], 10);

/**
 * Using a product on a pet - shampoo, a saddle, a monsterplant's revival. Flash put a bubble
 * over every pet the product would work on; the same filtering happens here, and the ones that
 * survive it are offered as a list.
 *
 * A product only ever reaches a pet of the type it was made for, belonging to whoever owns the
 * product, and the three monsterplant products each have their own condition on top - reviving
 * a plant that is not dead, or rebreeding one too young, is not offered at all.
 */
export const FurniturePetProductWidget = () => {
    const request = useRoomWidget(RoomObjectWidgetRequestEvent.PET_PRODUCT_MENU);
    const furnitureData = useRoomFurnitureData(request?.objectId ?? -1, request?.category ?? 0);
    const users = useRoomContext(x => x.usersByRoomObjectId);
    const ownUserId = useOwnUserId();
    const { closeRoomWidget } = useRoomWidgetActions();
    const { send } = useWebSocketContext();
    const [ selectedPetId, setSelectedPetId ] = useState<number | undefined>(undefined);
    const [ lastObjectId, setLastObjectId ] = useState<number>(-1);

    const objectId = request?.objectId ?? -1;

    if (objectId !== lastObjectId) {
        setLastObjectId(objectId);
        setSelectedPetId(undefined);
    }

    const onClose = () => closeRoomWidget(RoomObjectWidgetRequestEvent.PET_PRODUCT_MENU);

    if (!request || !furnitureData?.furnitureData) return null;

    // Flash refuses outright unless the product is yours.
    if (furnitureData.ownerId !== ownUserId) return null;

    const specialType = furnitureData.furnitureData.specialType;
    const texts = PRODUCT_TEXTS[specialType];

    if (!texts) return null;

    const productPetType = parseInt((furnitureData.furnitureData.customParams ?? '').split(' ')[0], 10);

    const pets = Object.values(users).filter((user) => {
        if (user.userType !== RoomObjectUserType.Pet) return false;

        if (user.ownerId !== ownUserId) return false;

        if (petTypeId(user) !== productPetType) return false;

        switch (specialType) {
            case FurnitureSpecialType.MonsterplantRevival:
                return user.canRevive;
            case FurnitureSpecialType.MonsterplantRebreed:
                return ((user.petLevel >= REBREED_LEVEL) && !user.canRevive && !user.canBreed);
            case FurnitureSpecialType.MonsterplantFertilize:
                return ((user.petLevel < REBREED_LEVEL) && !user.canRevive);
            default:
                return true;
        }
    });

    if (!pets.length) return null;

    const selected = pets.find(pet => pet.webID === selectedPetId);

    if (!selected) {
        return (
            <FurniturePetPickerView
                pets={pets.map(pet => ({ petId: pet.webID, name: pet.name }))}
                onSelect={setSelectedPetId}
                onClose={onClose}
            />
        );
    }

    return (
        <FurnitureUseProductView
            captionKey={texts.captionKey}
            descriptionKey={texts.infoKey}
            confirmKey={texts.confirmKey}
            onConfirm={() => {
                send(new CustomizePetWithFurniComposer({ objectId: request.objectId, petId: selected.webID }));
                onClose();
            }}
            onCancel={onClose}
        />
    );
};
