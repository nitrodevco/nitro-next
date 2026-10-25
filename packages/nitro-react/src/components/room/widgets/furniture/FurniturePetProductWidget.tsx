import { FurnitureSpecialType, IRoomUserData, RoomObjectCategoryEnum, RoomObjectUserType, RoomObjectWidgetRequestEvent, RoomWidgetUpdateRoomObjectEvent } from '@nitrodevco/nitro-api';
import { CustomizePetWithFurniComposer } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import type { InventoryPetProductRequest } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useRoomStore, useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { useSystemStore } from '#base/context/system';
import { useOwnUserId } from '#base/context/user';
import { usePetImageTexture, useRoomEventDispatcher, useRoomFurnitureData, useRoomObjectSelect } from '#base/hooks';
import { LayoutImage, ThemeImage } from '#base/theme';
import { getFurnitureData } from '#base/utils';
import { FurnitureUseProductView } from '#base/views/room-widgets/furniture/FurnitureUseProductView';
import { petProductPreview } from '#base/views/room-widgets/furniture/petProductPreview';
import { UseProductMenuRow, UseProductMenuView } from '#base/views/room-widgets/furniture/UseProductMenuView';

import { RoomObjectMenuBubble } from '../object-menu/RoomObjectMenuBubble';

/** `AvatarInfoWidgetHandler`: rebreeding is offered from this level up; below it the plant is fertilised instead. */
const REBREED_LEVEL = 7;

/** `use_product_preview_bg`: the preview's backdrop, the pet centred over it (`updatePreviewImage`). */
const PREVIEW_WIDTH = 122;
const PREVIEW_HEIGHT = 130;

interface ProductMode {
    /** `UseProductView.updateButtons`: the bubble's row. */
    row: UseProductMenuRow;
    /** `UseProductConfirmationView.setWindowContent` / `createWindow`. */
    frame: string;
    controller: string;
}

const frame = (name: string) => `habbo-room-ui-com/${name}_xml`;

/** Each pet product by the furni category it carries. */
const PRODUCT_MODES: Partial<Record<FurnitureSpecialType, ProductMode>> = {
    [FurnitureSpecialType.PetShampoo]: { row: 'use_product_shampoo', frame: frame('use_product_widget_frame'), controller: frame('use_product_controller_shampoo') },
    [FurnitureSpecialType.PetCustomPart]: { row: 'use_product_custom_part', frame: frame('use_product_widget_frame'), controller: frame('use_product_controller_custom_part') },
    [FurnitureSpecialType.PetCustomPartShampoo]: { row: 'use_product_custom_part_shampoo', frame: frame('use_product_widget_frame'), controller: frame('use_product_controller_custom_part_shampoo') },
    [FurnitureSpecialType.PetSaddle]: { row: 'use_product_saddle', frame: frame('use_product_widget_frame'), controller: frame('use_product_controller_saddle') },
    [FurnitureSpecialType.MonsterplantRevival]: { row: 'revive_monsterplant', frame: frame('use_product_widget_frame_monsterplant'), controller: frame('use_product_controller_revive_monsterplant') },
    [FurnitureSpecialType.MonsterplantRebreed]: { row: 'rebreed_monsterplant', frame: frame('use_product_widget_frame_monsterplant_rebreed'), controller: frame('use_product_controller_rebreed_monsterplant') },
    [FurnitureSpecialType.MonsterplantFertilize]: { row: 'fertilize_monsterplant', frame: frame('use_product_widget_frame_monsterplant_fertilize'), controller: frame('use_product_controller_fertilize_monsterplant') },
};

/** A pet's own type is the first number of its figure, which is what a product is cut for. */
const petTypeId = (user: IRoomUserData): number => parseInt((user.figure ?? '').split(' ')[0], 10);

/**
 * Using a product on a pet - shampoo, a custom part, a saddle, a monsterplant's revival, rebreed or
 * fertiliser. `AvatarInfoWidgetHandler` puts a `UseProductView` bubble over every pet the product
 * would work on (`showUseProductMenuForItems`): the product's owner's pets of the type it is cut
 * for, and for the plant products only a dead plant to revive, a grown one that cannot breed to
 * rebreed, and a growing one to fertilise. A saddled pet's bubble offers to replace its saddle.
 * Deselecting takes the bubbles down.
 *
 * Picking one opens `UseProductConfirmationView` for that pet (`showUseProductConfirmation`), its
 * frame and controller the product's own: the pet as the product would leave it over
 * `use_product_preview_bg` (`petProductPreview`), the pet's and product's names in the texts, and
 * a click on the picture selecting the pet in the room. Confirming sends the product to the pet.
 *
 * The inventory's `use_btn` asks for the same menu for an item it holds
 * (`handleUseProductMenuRequestInventoryItem`, `showInventoryUseProductSelection`): the product is
 * then the type's floor furniture data, its owner the user, and what is sent is the item's `ref`.
 */
export const FurniturePetProductWidget = () => {
    const request = useRoomWidget<Partial<InventoryPetProductRequest>>(RoomObjectWidgetRequestEvent.PET_PRODUCT_MENU);
    const furnitureData = useRoomFurnitureData(request?.objectId ?? -1, request?.category ?? 0);
    const floorItems = useSystemStore(x => x.floorItems);
    const wallItems = useSystemStore(x => x.wallItems);
    const users = useRoomStore(x => x.usersByRoomObjectId);
    const ownUserId = useOwnUserId();
    const { closeRoomWidget } = useRoomWidgetActions();
    const { selectObject } = useRoomObjectSelect();
    const { send } = useWebSocketContext();
    const [ chosen, setChosen ] = useState<{ objectId: number; petObjectId: number } | undefined>(undefined);

    // `RoomEngineUseProductEvent.inventoryStripId`: the product stays in the inventory.
    const inventoryRequest = (request?.data?.inventoryStripId !== undefined) ? request.data : undefined;
    const product = inventoryRequest
        ? getFurnitureData({ floorItems, wallItems }, inventoryRequest.furnitureTypeId ?? -1, false)
        : furnitureData?.furnitureData;
    // The confirmation's `§_-p1D§`: the room object, or the inventory item.
    const objectId = inventoryRequest ? (inventoryRequest.inventoryStripId ?? -1) : (request?.objectId ?? -1);
    const onClose = () => closeRoomWidget(RoomObjectWidgetRequestEvent.PET_PRODUCT_MENU);
    const chosenPet = (chosen && (chosen.objectId === objectId)) ? users[chosen.petObjectId] : undefined;

    // `RWROUE_OBJECT_DESELECTED`: `removeUseProductViews` - the bubbles, not an open confirmation.
    useRoomEventDispatcher(RoomWidgetUpdateRoomObjectEvent.OBJECT_DESELECTED, () => {
        if (request && !chosenPet) onClose();
    });

    const preview = usePetImageTexture((chosenPet && product) ? petProductPreview(product.specialType, product.customParams ?? '', chosenPet) : undefined);

    if (!request || !product) return null;

    // Flash refuses a room product unless it is yours; an inventory item always is.
    if (!inventoryRequest && (furnitureData?.ownerId !== ownUserId)) return null;

    const mode = PRODUCT_MODES[product.specialType];

    if (!mode) return null;

    if (chosenPet) {
        const parameters = {
            'useproduct.widget.title': { name: chosenPet.name },
            'useproduct.widget.title.monsterplant': { name: chosenPet.name },
            'useproduct.widget.title.monsterplant_rebreed': { name: chosenPet.name },
            'useproduct.widget.title.monsterplant_fertilize': { name: chosenPet.name },
            'useproduct.widget.monsterplant.plant.name': { name: chosenPet.name },
            'useproduct.widget.monsterplant.plant.raritylevel': { level: String(chosenPet.rarityLevel) },
            'useproduct.widget.monsterplant.plant.description': { name: chosenPet.ownerName },
            'useproduct.widget.text.saddle': { productName: product.localizedName },
            'useproduct.widget.text.custompart': { productName: product.localizedName },
            'useproduct.widget.text.custompartshampoo': { productName: product.localizedName },
            'useproduct.widget.text.shampoo': { productName: product.localizedName },
            'useproduct.widget.text.revive_monsterplant': { productName: product.localizedName },
        };

        return (
            <FurnitureUseProductView
                frameTemplate={mode.frame}
                controllerTemplate={mode.controller}
                fitToContent
                parameters={parameters}
                bindings={{
                    // `updatePreviewImage`: `use_product_preview_bg`, and the pet centred over it.
                    preview_image: {
                        children: (
                            <>
                                <ThemeImage
                                    src={LayoutImage('habbo-room-ui-com/use_product_preview_bg.png')}
                                    bitmap={{ stretchedX: false, stretchedY: false }}
                                    eventMode="none"
                                    layout={{ position: 'absolute', left: 0, top: 0, width: PREVIEW_WIDTH, height: PREVIEW_HEIGHT }}
                                />
                                {preview && (
                                    <pixiSprite
                                        texture={preview}
                                        eventMode="none"
                                        layout={{
                                            position: 'absolute',
                                            left: Math.trunc((PREVIEW_WIDTH - preview.width) / 2),
                                            top: Math.trunc((PREVIEW_HEIGHT - preview.height) / 2),
                                            width: preview.width,
                                            height: preview.height,
                                        }}
                                    />
                                )}
                            </>
                        ),
                    },
                    // `selectItemFromRoom`: the pet the dialog is about.
                    preview_image_region: { onPointerTap: () => selectObject(chosenPet.objectId, RoomObjectCategoryEnum.Unit) },
                }}
                onConfirm={() => {
                    send(new CustomizePetWithFurniComposer({ objectId, petId: chosenPet.webID }));
                    onClose();
                }}
                onCancel={onClose}
            />
        );
    }

    const productPetType = parseInt((product.customParams ?? '').split(' ')[0], 10);

    const pets = Object.values(users).filter((user) => {
        if (Number(user.userType) !== Number(RoomObjectUserType.Pet)) return false;

        if (user.ownerId !== ownUserId) return false;

        if (petTypeId(user) !== productPetType) return false;

        switch (product.specialType) {
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

    return (
        <>
            {pets.map(pet => (
                <RoomObjectMenuBubble
                    key={pet.objectId}
                    objectData={{ objectId: pet.objectId, category: RoomObjectCategoryEnum.Unit }}
                    userType={RoomObjectUserType.Pet}
                >
                    <UseProductMenuView
                        name={pet.name}
                        // `UseProductItem.replace`: a saddle for a pet that already wears one.
                        row={((product.specialType === FurnitureSpecialType.PetSaddle) && pet.hasSaddle) ? 'replace_product_saddle' : mode.row}
                        onUse={() => setChosen({ objectId, petObjectId: pet.objectId })}
                    />
                </RoomObjectMenuBubble>
            ))}
        </>
    );
};
