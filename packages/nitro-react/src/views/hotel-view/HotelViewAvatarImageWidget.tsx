/**
 * `AvatarImageWidget` in a widget slot: `habbo-friend-bar-com/avatar_image_xml`, one window
 * manager `avatar_image` widget showing the user's own figure (`refreshAvatarInfo`). The figure is
 * the session's, which `UserObjectEvent`, the user's own `UserChangeMessageEvent` (id -1) and the
 * avatar editor's `AVATAR_FIGURE_UPDATED` all update - here the user store's, which those same
 * events write.
 *
 * The widget keeps its defaults: the whole figure (`only_head` false, not `cropped`), facing
 * `southeast` and at the large scale. Its window takes the image's size (`AvatarImageWidget.refresh`),
 * which is the size the slot is given. Until the figure has been drawn the window is empty, where
 * Flash would show the greyed `placeholder_avatar` while the avatar renderer loads.
 */
import { useOwnUserFigure, useOwnUserGender } from '#base/context/user';
import { TemplateWindow, TemplateWindows, useAvatarImageTexture } from '#base/theme';

import { hotelViewTemplateId } from './hotelViewTemplate';

/** `AvatarImageWidget.DIRECTION_DEFAULT`: `southeast`. */
const DIRECTION = 2;

export const HotelViewAvatarImageWidget = () => {
    const figure = useOwnUserFigure();
    const gender = useOwnUserGender();
    const image = useAvatarImageTexture(figure || undefined, gender, { direction: DIRECTION });

    /** `AvatarImageWidget.refresh`: the widget's window as large as the image. */
    const arrange = ({ root }: TemplateWindows) => {
        if (image.texture) root()?.setRectangle(0, 0, image.width, image.height);
    };

    return (
        <TemplateWindow
            id={hotelViewTemplateId('avatar_image')}
            bindings={{
                '': {
                    children: image.texture && (
                        <pixiSprite
                            texture={image.texture}
                            eventMode="none"
                            layout={{ position: 'absolute', left: 0, top: 0, width: image.width, height: image.height }}
                        />
                    ),
                },
            }}
            arrange={arrange}
        />
    );
};
