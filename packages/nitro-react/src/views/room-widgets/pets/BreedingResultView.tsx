import { RoomGeometryScaleType } from '@nitrodevco/nitro-api';

import { useFurnitureImageTexture } from '#base/hooks';
import { Box, TemplateBindings, TemplateWindow } from '#base/theme';

import { BREED_PREVIEW_BACKGROUND } from './breedingWindow';

/** One seed a breeding produced, or the empty place of one. */
export interface BreedingSeed {
    /** False for the owner who came away with nothing: the column stays empty. */
    present: boolean;
    /** The furni's class name, for its picture; empty when the furniture data has no entry for it. */
    className: string;
    name: string;
    rarityLevel: number;
    ownerName: string;
    hasMutation: boolean;
}

export interface BreedingResultViewProps {
    seeds: [ BreedingSeed, BreedingSeed ];
    /** When only one seed came out of it, who got it - the "sorry" wording names them. */
    luckyUser: string | undefined;
    onClose: () => void;
}

/** Each seed's `preview_image` / `preview_image2`. */
const IMAGE_WIDTH = 122;
const IMAGE_HEIGHT = 130;

/**
 * The seed's furniture at 64 scale, merged into its `preview_image` centred and cut at the box,
 * over the `breed_pets_preview_bg` the bitmap is given first - as `updatePreviewImage` did it,
 * never scaled.
 */
const SeedPicture = ({ className }: { className: string }) => {
    const { texture, width, height } = useFurnitureImageTexture(className.length ? className : undefined, 0, 2, RoomGeometryScaleType.ZoomedIn);

    return (
        <Box layout={{ position: 'absolute', left: 0, top: 0, width: IMAGE_WIDTH, height: IMAGE_HEIGHT, overflow: 'hidden' }}>
            {texture && !!className.length && (
                <pixiSprite
                    texture={texture}
                    layout={{ position: 'absolute', left: Math.trunc((IMAGE_WIDTH - width) / 2), top: Math.trunc((IMAGE_HEIGHT - height) / 2), width, height }}
                />
            )}
        </Box>
    );
};

/**
 * A seed's column: what `updateWindow` fills in it. A seed nobody got leaves its column empty -
 * its item list holds nothing, keeping its `width_min` place.
 */
const seedBindings = (seed: BreedingSeed, index: 1 | 2): TemplateBindings => {
    const list = `seed${index}_itemlist`;

    if (!seed.present) return { [list]: { items: [] } };

    return {
        [`${list}/${(index === 1) ? 'preview_image' : 'preview_image2'}`]: {
            asset: BREED_PREVIEW_BACKGROUND,
            children: <SeedPicture className={seed.className} />,
        },
        [`${list}/info_mutate${index}`]: { visible: seed.hasMutation },
    };
};

/**
 * What two bred plants produced - `BreedPetsResultView` on the
 * `habbo-room-ui-com/breed_pets_result_xml` layout: a seed per owner with its rarity, a note when
 * one of them mutated, and the "sorry" wording when only one owner was lucky.
 *
 * `updateWindow` registers each seed's name, owner and rarity level, and hides `info` whatever
 * happens; an owner of a seed sees `description` alone, anyone else `description_sorry`,
 * `info_sorry` and the `button_list` with `close_button`. `arrangeListItems` closes the item
 * lists up over what is hidden and ends in `resizeToFitContent` - the 274-wide `element_list`
 * makes the window 280 wide, not the layout's 275 (the frame has no `width_max`).
 *
 * Flash also let each seed be placed or picked up from here (the `preview_buttonlist` an owner
 * sees); the seeds are in the inventory either way, so that row stays hidden. With it goes the
 * only way an owner could close the window besides the header button, so the close row shows for
 * everyone. Flash drew the first seed's furniture into both previews (`updateWindow` asks for
 * `seed1`'s id twice); each preview here draws its own seed.
 */
export const BreedingResultView = ({ seeds, luckyUser, onClose }: BreedingResultViewProps) => {
    const sorry = !!luckyUser;

    return (
        <TemplateWindow
            id="habbo-room-ui-com/breed_pets_result_xml"
            frame={{ id: 'breeding-result', centered: true, rememberPosition: false, onClose }}
            parameters={{
                'breedpetsresult.widget.seed1.name': { name: seeds[0].name },
                'breedpetsresult.widget.seed2.name': { name: seeds[1].name },
                'breedpetsresult.widget.seed1.description': { name: seeds[0].ownerName },
                'breedpetsresult.widget.seed2.description': { name: seeds[1].ownerName },
                'breedpetsresult.widget.seed1.raritylevel': { level: String(seeds[0].rarityLevel) },
                'breedpetsresult.widget.seed2.raritylevel': { level: String(seeds[1].rarityLevel) },
                'breedpetsresult.widget.text.sorry': { user: luckyUser ?? '' },
            }}
            bindings={{
                // The layout's caption is cut short (`${breedpetsresult.widget.text `): the key it means.
                description: { visible: !sorry, caption: '${breedpetsresult.widget.text}' },
                description_sorry: { visible: sorry },
                info: { visible: false },
                info_sorry: { visible: sorry },
                ...seedBindings(seeds[0], 1),
                ...seedBindings(seeds[1], 2),
                preview_buttonlist: { visible: false },
                close_button: { onPointerTap: onClose },
            }}
            arrange={({ root }) => root()?.resizeToFitContent()}
        />
    );
};
