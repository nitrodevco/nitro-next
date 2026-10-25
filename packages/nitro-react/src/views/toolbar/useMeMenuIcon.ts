/**
 * The me menu icon's picture - `MeMenuNewIconLoader.setMeMenuToolbarIcon`: the own figure's head at
 * direction 3, its face focused (`HabboFaceFocuser.focusUserFace` - the 50x50 window of the head
 * image at the face's place) and a circle of radius 20 cut from its middle
 * (`HabboFaceFocuser.cutCircleFromBitmap`), set as the `icon_me_menu` bitmap
 * (`BottomBarLeft.setIconBitmap`). Drawn to a texture of its own and registered under a name of its
 * own, which is what the template's bitmap is bound to.
 *
 * There is one me menu icon, as `MeMenuNewIconLoader` keeps one bitmap (`§_-K2a§`): a new head
 * replaces the picture, and the old one is let go - once the toolbar shows the new one. Destroyed
 * while the toolbar still drew it, its source stayed in the UI stage's batch and the next rebuild
 * of that batch threw (`[BindGroup] the resource bound as 'textureSource2' was destroyed`), which
 * stopped the ticker: the black screen of changing outfits in the avatar editor.
 */
import { AvatarGenderType } from '@nitrodevco/nitro-api';
import { GetAssetManager, GetRenderer } from '@nitrodevco/nitro-renderer';
import { Container, Graphics, RenderTexture, Sprite, Texture } from 'pixi.js';
import { useEffect, useMemo } from 'react';

import { useAvatarImageTexture } from '#base/theme';
import { destroyOwnedTexture } from '#base/utils';

/** `focusUserFace(image, "full", 3, 1)`: direction 3's face window. */
const FACE_DIRECTION = 3;
const FACE_X = 21;
const FACE_Y = 30;
const FACE_SIZE = 50;
/** `cutCircleFromBitmap(bitmap, 20)`. */
const CIRCLE_RADIUS = 20;

let serial = 0;

interface MeMenuPicture {
    name: string;
    picture: RenderTexture;
}

/** The picture for a head, registered under a name of its own. */
const drawPicture = (head: Texture): MeMenuPicture => {
    const container = new Container();
    const face = new Sprite(head);
    const circle = new Graphics().circle(FACE_SIZE / 2, FACE_SIZE / 2, CIRCLE_RADIUS).fill(0xffffff);

    face.position.set(-FACE_X, -FACE_Y);
    face.mask = circle;
    container.addChild(face, circle);

    const picture = RenderTexture.create({ width: FACE_SIZE, height: FACE_SIZE });

    GetRenderer().render({ container, target: picture, clear: true });
    container.destroy({ children: true });

    const name = `toolbar_me_menu_icon_${++serial}`;

    GetAssetManager().setTexture(name, picture);

    return { name, picture };
};

/**
 * The picture for a render of the head. A placeholder head gets none: `setMeMenuToolbarIcon` draws
 * only an image that is not `isPlaceholder()`, and `avatarImageReady` draws again once the figure's
 * libraries have landed. It takes the render, not its texture: the finished head is drawn into the
 * same pooled texture its placeholder had, so the texture alone does not tell the two apart - and
 * the React compiler keys the memo below on what it reads.
 */
const pictureOf = (render: { texture: Texture | undefined; placeholder: boolean }): MeMenuPicture | undefined => ((render.texture && !render.placeholder) ? drawPicture(render.texture) : undefined);

/**
 * The registered name of the me menu picture, once the head is drawn. It is drawn once per render
 * of the head - the render's snapshot, not its texture, which the avatar renderer may draw a
 * finished figure into after its placeholder - and the one before it is let go after the toolbar
 * has been committed with the new name, so no sprite draws it any more.
 */
export const useMeMenuIcon = (figure: string | undefined, gender: AvatarGenderType): string | undefined => {
    const render = useAvatarImageTexture(figure, gender, { headOnly: true, direction: FACE_DIRECTION });
    const icon = useMemo(() => pictureOf(render), [ render ]);

    useEffect(() => () => {
        if (!icon) return;

        GetAssetManager().removeTexture(icon.name);
        destroyOwnedTexture(icon.picture);
    }, [ icon ]);

    return icon?.name;
};
