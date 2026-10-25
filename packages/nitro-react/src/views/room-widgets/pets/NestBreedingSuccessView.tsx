import { TemplateWindow } from '#base/theme';

import { PetPortraitView } from './PetPortraitView';

/**
 * A nest finished - `NestBreedingSuccessView` on the `habbo-room-ui-com/nestBreedingSuccess_xml`
 * layout, which `updateWindow` builds and centres: the new pet on the `icons_hilighter_yellow`
 * spotlight, its name in `pet.name`, its rarity class as
 * `${breedpets.nestbreeding.success.raritycategory.<n>}` in `pet.raritycategory`, and `button.ok`.
 * `pet_image` is filled as `updatePreviewImage` does it: the pet's 64-scale image centred in a
 * transparent bitmap of the window's size. `button.ok` and the header close both `close` it.
 */
export interface NestBreedingSuccessViewProps {
    petName: string;
    /** The baby's figure, once it has been placed in the room; empty draws no picture. */
    figure: string;
    posture: string;
    rarityCategory: number;
    onOk: () => void;
}

/** The layout's `pet_image` bitmap. */
const PET_IMAGE_SIZE = 40;

export const NestBreedingSuccessView = ({ petName, figure, posture, rarityCategory, onOk }: NestBreedingSuccessViewProps) => (
    <TemplateWindow
        id="habbo-room-ui-com/nestBreedingSuccess_xml"
        frame={{ id: 'nest-breeding-success', centered: true, draggable: false, rememberPosition: false, onClose: onOk }}
        bindings={{
            'pet.name': { caption: petName },
            'pet.raritycategory': { caption: `\${breedpets.nestbreeding.success.raritycategory.${rarityCategory}}` },
            'button.ok': { onPointerTap: onOk },
            pet_image: {
                children: !!figure.length && (
                    <PetPortraitView
                        figure={figure}
                        posture={posture}
                        width={PET_IMAGE_SIZE}
                        height={PET_IMAGE_SIZE}
                    />
                ),
            },
        }}
    />
);
