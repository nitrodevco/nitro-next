/**
 * A head drawn into a template's `avatar_image` widget (`AvatarImageWidget` with `only_head`,
 * optionally `cropped`), at the widget's `avatar_image:direction` - southeast unless the layout
 * names another. The help window's reported users, the group members' rows and the extended
 * profile's relationships use it.
 */
import { AvatarGenderType } from '@nitrodevco/nitro-api';

import { useAvatarImageTexture } from '#base/theme';

/** `AvatarImageWidget`'s default direction, `southeast`. */
const DEFAULT_DIRECTION = 2;

export interface AvatarImageWidgetHeadProps {
    figure: string;
    cropped: boolean;
    /** The widget's direction: 2 is `southeast`, 4 `southwest`. */
    direction?: number;
}

export const AvatarImageWidgetHead = ({ figure, cropped, direction = DEFAULT_DIRECTION }: AvatarImageWidgetHeadProps) => {
    const head = useAvatarImageTexture(figure, AvatarGenderType.Male, { headOnly: true, cropped, direction });

    if (!head.texture) return null;

    return (
        <pixiSprite
            texture={head.texture}
            eventMode="none"
            layout={{ position: 'absolute', left: 0, top: 0, width: head.width, height: head.height }}
        />
    );
};
