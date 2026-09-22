import { AvatarGenderType } from '@nitrodevco/nitro-api';

import { AvatarImage } from '#base/components';
import { Border, LayoutImage, Region, ThemeImage } from '#base/theme';

export interface AvatarEditorWardrobeSlotProps {
    figure?: string;
    gender?: AvatarGenderType;
    usable: boolean;
    onSet?: () => void;
    onGet?: () => void;
}

const CENTERED = { stretchedX: false, stretchedY: false, pivot: 'center' } as const;

/**
 * One wardrobe slot - the `slot_template` of the `avatareditor_wardrobe` layout (56x56), driven
 * as Flash's `WardrobeSlot.updateView`: the translucent style 3 border, the `set_button` arrow
 * while the slot is usable, the `get_button` arrow while it is usable and holds a look, the look
 * itself centred in the 22x48 `image` (`zoom.enabled` renders it at half size) and the
 * `get_figure` region over it. Flash draws `avatar_editor_wardrobe_empty_slot` into `image` for
 * an empty or locked slot; that bitmap is not among the port's assets, so such a slot shows the
 * border alone.
 */
export const AvatarEditorWardrobeSlot = ({ figure, gender = AvatarGenderType.Male, usable, onSet, onGet }: AvatarEditorWardrobeSlotProps) => {
    const hasFigure = !!figure;
    const canGet = usable && hasFigure;

    return (
        <Region
            name="slot_template"
            layout={{ width: 56, height: 56, flexShrink: 0 }}
        >
            <Border
                variant="3"
                tintColor="#666666"
                blend={0.3}
                layout={{ position: 'absolute', left: 29, width: 24, top: 3, height: 50 }}
            />
            {usable && (
                <Region
                    name="set_button"
                    onPointerTap={onSet}
                    layout={{ position: 'absolute', left: 3, width: 22, top: 3, height: 26 }}
                >
                    <ThemeImage
                        src={LayoutImage('avatar-editor/icons_forward_small.png')}
                        bitmap={CENTERED}
                        layout={{ position: 'absolute', left: 0, width: 22, top: 9, height: 15 }}
                    />
                </Region>
            )}
            {canGet && (
                <Region
                    name="get_button"
                    onPointerTap={onGet}
                    layout={{ position: 'absolute', left: 2, width: 22, top: 28, height: 26 }}
                >
                    <ThemeImage
                        src={LayoutImage('avatar-editor/icons_back_small.png')}
                        bitmap={CENTERED}
                        layout={{ position: 'absolute', left: 0, width: 22, top: 0, height: 15 }}
                    />
                </Region>
            )}
            <Region
                name="image"
                layout={{ position: 'absolute', left: 30, width: 22, top: 4, height: 48, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}
            >
                {canGet && (
                    <AvatarImage
                        figure={figure}
                        gender={gender}
                        direction={4}
                        scale={0.5}
                    />
                )}
            </Region>
            <Region
                name="get_figure"
                onPointerTap={canGet ? onGet : undefined}
                layout={{ position: 'absolute', left: 29, width: 24, top: 3, height: 50 }}
            />
        </Region>
    );
};
