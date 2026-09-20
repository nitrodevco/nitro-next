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

export const AvatarEditorWardrobeSlot = ({ figure, gender = AvatarGenderType.Male, usable, onSet, onGet }: AvatarEditorWardrobeSlotProps) => {
    const hasFigure = !!figure;
    const canGet = usable && hasFigure;

    return (
        <Region layout={{ justifyContent: 'center', alignItems: 'center', gap: 15 }}>
            <Region layout={{ flexDirection: 'column', justifyContent: 'center', gap: 5 }}>
                <ThemeImage
                    onPointerTap={usable ? onSet : undefined}
                    src={LayoutImage('avatar-editor/icons_forward_small.png')}
                />
                <ThemeImage
                    onPointerTap={canGet ? onGet : undefined}
                    src={LayoutImage('avatar-editor/icons_back_small.png')}
                />
            </Region>
            <Border
                variant="3"
                tintColor="#666666"
                blend={0.3}
                layout={{ width: 24, height: 50, justifyContent: 'center', alignItems: 'flex-end', overflow: 'hidden' }}
                onPointerTap={canGet ? onGet : undefined}
            >
                {hasFigure && (
                    <AvatarImage
                        figure={figure}
                        gender={gender}
                        direction={4}
                        scale={0.5}
                    />
                )}
            </Border>
        </Region>
    );
};
