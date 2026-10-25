import { TemplateBinding, TemplateWindow } from '#base/theme';

import { BREED_PREVIEW_BACKGROUND } from './breedingWindow';
import { PetPortraitView } from './PetPortraitView';

/** One of the two plants, as the room knows it. */
export interface BreedingPlant {
    name: string;
    figure: string;
    posture: string;
    rarityLevel: number;
    ownerName: string;
}

export interface PlantBreedingViewProps {
    /** `ask` proposes the breeding; `accept` answers the other owner's proposal. */
    mode: 'ask' | 'accept';
    plant1: BreedingPlant;
    plant2: BreedingPlant;
    onBreed: () => void;
    onAccept: () => void;
    onCancel: () => void;
}

/** Each plant's `preview_image` / `preview_image2`. */
const PREVIEW_WIDTH = 122;
const PREVIEW_HEIGHT = 130;

/**
 * `updatePreviewImage`: a fresh bitmap of the `preview_image`'s size, `breed_pets_preview_bg`
 * copied in at 0,0 (opaque and exactly 122x130, so it covers it) and the plant's 64-scale image
 * merged over it, centred - never scaled.
 */
const previewImage = (plant: BreedingPlant): TemplateBinding => ({
    asset: BREED_PREVIEW_BACKGROUND,
    children: (
        <PetPortraitView
            figure={plant.figure}
            posture={plant.posture}
            width={PREVIEW_WIDTH}
            height={PREVIEW_HEIGHT}
        />
    ),
});

/**
 * Two monsterplants about to breed - `BreedMonsterPlantsConfirmationView` on the
 * `habbo-room-ui-com/breed_pets_confirmation_xml` layout: both plants side by side with their
 * rarity and owner, the note that a plant breeds only once, and either "Breed" or "Accept" beside
 * "Cancel".
 *
 * `updateWindow` registers the title's, the plants' and the request's parameters, then hides
 * `description`, `request`, `save_button` and `accept_button` and shows `description` and
 * `save_button` when asking, `request` and `accept_button` when answering. `arrangeListItems`
 * closes the item lists up over what is hidden and ends in `resizeToFitContent` (the frame's
 * `width_min`/`width_max` of 274 bound its width). The header close and `cancel_button` cancel.
 */
export const PlantBreedingView = ({ mode, plant1, plant2, onBreed, onAccept, onCancel }: PlantBreedingViewProps) => {
    const ask = (mode === 'ask');

    return (
        <TemplateWindow
            id="habbo-room-ui-com/breed_pets_confirmation_xml"
            frame={{ id: 'plant-breeding', centered: true, rememberPosition: false, onClose: onCancel }}
            parameters={{
                'breedpets.widget.title': { name: plant1.name },
                'breedpets.widget.plant1.name': { name: plant1.name },
                'breedpets.widget.plant2.name': { name: plant2.name },
                'breedpets.widget.plant1.description': { name: plant1.ownerName },
                'breedpets.widget.plant2.description': { name: plant2.ownerName },
                'breedpets.widget.plant1.raritylevel': { level: String(plant1.rarityLevel) },
                'breedpets.widget.plant2.raritylevel': { level: String(plant2.rarityLevel) },
                'breedpets.widget.request': { name: plant2.ownerName },
            }}
            bindings={{
                description: { visible: ask },
                request: { visible: !ask },
                preview_image: previewImage(plant1),
                preview_image2: previewImage(plant2),
                cancel_button: { onPointerTap: onCancel },
                save_button: { visible: ask, onPointerTap: onBreed },
                accept_button: { visible: !ask, onPointerTap: onAccept },
            }}
            arrange={({ root }) => root()?.resizeToFitContent()}
        />
    );
};
