import { AvatarGenderType } from '@nitrodevco/nitro-api';

import { AvatareditorWardrobeBaseLayout } from '#base/views/layouts/avatareditor/avatar/wardrobe/AvatareditorWardrobeBase/AvatareditorWardrobeBaseLayout';
import { AvatareditorWardrobeBaseLayoutSlotsColumnTemplateItem } from '#base/views/layouts/avatareditor/avatar/wardrobe/AvatareditorWardrobeBase/AvatareditorWardrobeBaseLayoutSlotsColumnTemplateItem';
import { AvatareditorWardrobeBaseLayoutSlotTemplateItem } from '#base/views/layouts/avatareditor/avatar/wardrobe/AvatareditorWardrobeBase/AvatareditorWardrobeBaseLayoutSlotTemplateItem';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** One wardrobe slot (`WardrobeSlot`): empty, or a saved figure. */
export interface AvatarEditorWardrobeSlot {
    figure?: string;
    gender?: AvatarGenderType;
    /** Rendered figure for the slot, when available. */
    imageUrl?: string;
    /** `WardrobeSlot.updateView`: set/get buttons only show on slots the user may use (club level). */
    usable?: boolean;
}

export interface AvatarEditorWardrobeProps {
    slots: AvatarEditorWardrobeSlot[];
    onSave?: (slot: number) => void;
    onLoad?: (slot: number, outfit: AvatarEditorWardrobeSlot) => void;
}

/** `WardrobeView` lays the slots out in columns of seven. */
const SLOTS_PER_COLUMN = 7;

/**
 * The wardrobe side panel (`avatareditor_wardrobe_base`), driven like
 * com/sulake/habbo/avatar/wardrobe/WardrobeView.as: one `slots_column_template` per seven
 * slots, each slot a `slot_template` whose `set_button` saves the current look into it and
 * `get_button`/`get_figure` load it; an empty slot shows the empty-slot art.
 */
export const AvatarEditorWardrobe = ({ slots, onSave, onLoad }: AvatarEditorWardrobeProps) => {
    const columns: AvatarEditorWardrobeSlot[][] = [];

    slots.forEach((slot, index) => {
        (columns[Math.floor(index / SLOTS_PER_COLUMN)] ??= []).push(slot);
    });

    return (
        <AvatareditorWardrobeBaseLayout mainContainer={{
            slotsColumnsList: {
                itemsSlotsColumnsList: columns.map((column, columnIndex) => (
                    <AvatareditorWardrobeBaseLayoutSlotsColumnTemplateItem
                        key={columnIndex}
                        itemsSlotsColumnTemplate={column.map((slot, slotIndex) => {
                            const index = columnIndex * SLOTS_PER_COLUMN + slotIndex;
                            const usable = slot.usable ?? true;

                            return (
                                <AvatareditorWardrobeBaseLayoutSlotTemplateItem
                                    key={index}
                                    srcImage={slot.imageUrl ?? (slot.figure ? undefined : layoutImage('avatar_editor_wardrobe_empty_slot.png'))}
                                    visibleSetButton={usable}
                                    visibleGetButton={usable && !!slot.figure}
                                    onSetButton={() => onSave?.(index)}
                                    onGetButton={() => slot.figure && onLoad?.(index, slot)}
                                    onGetFigure={() => slot.figure && onLoad?.(index, slot)}
                                />
                            );
                        })}
                    />
                )),
            },
        }}
        />
    );
};
