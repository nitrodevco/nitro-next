/**
 * The wardrobe side panel - Flash `WardrobeView` and its `WardrobeSlot`s on
 * `habbo-avatar-editor-com/avatareditor_wardrobe_base` (182x490).
 *
 * - `WardrobeView`: `slots_columns_list` is emptied of the layout's two columns and given a clone of
 *   `slots_column_template` per seven slots (`SLOTS_PER_COL`); `update` puts slot `n` into column
 *   `n / 7`, each a clone of `slot_template`.
 * - `WardrobeSlot.updateView`: a usable slot holding a look shows it in `image` - facing 4, cropped,
 *   at half size with `zoom.enabled` (the small `h` render, else `sh` at full) - centred;
 *   `set_button` shows while the slot is usable and `get_button` while it also holds a look.
 *   An empty or locked slot draws nothing in `image`: `updateView` asks the window manager for
 *   `avatar_editor_wardrobe_empty_slot`, which the library publishes under another name
 *   (`avatar_editor_wardrobe_wardrobe_empty_slot`), so it finds nothing and returns.
 * - `eventHandler`: every click asks `verifyClubLevel` first - without club it opens the club centre
 *   and goes no further, which is what a click on a locked slot's `get_figure` does. Then
 *   `set_button` saves the current look into the slot, `get_button` and `get_figure` load the
 *   slot's look into the editor.
 *
 * `WardrobeModel.isSlotEnabled` asks `hasClub` for the first five slots and `hasVip` for the rest,
 * and both are `clubLevel >= 1`: every slot is open at club level 1 and none below it.
 */
import { AvatarGenderType } from '@nitrodevco/nitro-api';

import { verifyClubLevel } from '#base/commands';
import { AvatarEditorWardrobeOutfit } from '#base/context/avatar-editor';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigBoolean } from '#base/context/system';
import { useOwnHasClub } from '#base/context/user';
import { TemplateItem, TemplateWindow, useAvatarImageTexture } from '#base/theme';

/** `WardrobeView.SLOTS_PER_COL`. */
const SLOTS_PER_COL = 7;

/** `slot_template`'s `image` (22x48): the look is centred in it. */
const IMAGE_WIDTH = 22;
const IMAGE_HEIGHT = 48;

/** `updateView`: the look faces 4. */
const SLOT_DIRECTION = 4;

export interface AvatarEditorWardrobeProps {
    slots: AvatarEditorWardrobeOutfit[];
    slotCount: number;
    onSave: (index: number) => void;
    onLoad: (index: number, outfit: NonNullable<AvatarEditorWardrobeOutfit>) => void;
}

/** A slot's look, cropped and centred in `image`. */
const WardrobeSlotImage = ({ figure, gender, zoom }: { figure: string; gender: AvatarGenderType; zoom: boolean }) => {
    const avatar = useAvatarImageTexture(figure, gender, { cropped: true, direction: SLOT_DIRECTION, scale: zoom ? 0.5 : 1 });

    if (!avatar.texture) return null;

    return (
        <pixiSprite
            texture={avatar.texture}
            eventMode="none"
            x={Math.trunc((IMAGE_WIDTH - avatar.width) / 2)}
            y={Math.trunc((IMAGE_HEIGHT - avatar.height) / 2)}
            layout={false}
        />
    );
};

export const AvatarEditorWardrobe = ({ slots, slotCount, onSave, onLoad }: AvatarEditorWardrobeProps) => {
    const zoom = useConfigBoolean('zoom.enabled');
    const { send } = useWebSocketContext();
    const count = Math.max(slotCount, slots.length);
    const usable = useOwnHasClub();

    const slotItem = (index: number): TemplateItem => {
        const outfit = slots[index] ?? null;
        const canGet = usable && !!outfit?.figure;
        const save = () => {
            if (verifyClubLevel(send)) onSave(index);
        };
        const load = () => {
            if (verifyClubLevel(send) && outfit?.figure) onLoad(index, outfit);
        };

        return {
            key: String(index),
            from: 'slot_template',
            bindings: {
                set_button: { visible: usable, onPointerTap: save },
                get_button: { visible: canGet, onPointerTap: load },
                get_figure: { onPointerTap: load },
                image: {
                    children: canGet && outfit && (
                        <WardrobeSlotImage
                            figure={outfit.figure}
                            gender={outfit.gender ?? AvatarGenderType.Male}
                            zoom={zoom}
                        />
                    ),
                },
            },
        };
    };

    const columns: TemplateItem[] = Array.from({ length: Math.ceil(count / SLOTS_PER_COL) }, (unused, column) => ({
        key: String(column),
        from: 'slots_column_template',
        bindings: {
            '': { items: Array.from({ length: Math.min(SLOTS_PER_COL, count - (column * SLOTS_PER_COL)) }, (unusedSlot, row) => slotItem((column * SLOTS_PER_COL) + row)) },
        },
    }));

    return (
        <TemplateWindow
            id="habbo-avatar-editor-com/avatareditor_wardrobe_base"
            bindings={{ slots_columns_list: { items: columns } }}
        />
    );
};
