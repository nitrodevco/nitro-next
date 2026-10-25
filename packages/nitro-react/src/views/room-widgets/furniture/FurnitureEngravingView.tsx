import { AvatarGenderType } from '@nitrodevco/nitro-api';
import { Texture } from 'pixi.js';

import { ThemeImage, useAvatarImageTexture } from '#base/theme';

import { FurnitureTemplatePanel } from './FurnitureTemplatePanel';

/**
 * The engraved friend furni, by the `furniture_friendfurni_engraving` value their own logic writes -
 * `FriendFurniEngravingWidget.open` builds `LoveLockEngravingView` (0), `WildWestEngravingView` (3) or
 * `HabboweenEngravingView` (4), each only naming its layout (`assetName`); 1 and 2 build nothing.
 */
const ENGRAVING_TEMPLATES: Record<number, string> = {
    0: 'habbo-room-ui-com/lovelock_engraving_xml',
    3: 'habbo-room-ui-com/wildwest_engraving_xml',
    4: 'habbo-room-ui-com/habboween_engraving_xml',
};

export interface FurnitureEngravingViewProps {
    /** 0 lovelock, 3 wild west, 4 habboween. */
    engravingType: number;
    leftName: string;
    rightName: string;
    leftFigure: string;
    rightFigure: string;
    date: string;
    onClose: () => void;
}

/**
 * `setElementImage`: the avatar centred in its bitmap, at its own size.
 */
const avatarImage = (texture: Texture | null | undefined) => texture && (
    <ThemeImage
        texture={texture}
        bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
        layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
    />
);

/**
 * Two friends engraved on a lock - `FriendFurniEngravingView.createWindow`, which builds the type's
 * layout and centres it: the stuff data's two names in `name_left` / `name_right` and its date in
 * `date`, and the pair's large cropped images in `avatar_left` / `avatar_right`, each centred in its
 * bitmap (`setElementImage`). Only the right one is turned to direction 4, so the left keeps the
 * avatar's default 2 and the two face each other. The close button is drawn by the plaque art: the
 * layout only puts the invisible `header_button_close` region over it (`windowProc`).
 */
export const FurnitureEngravingView = ({ engravingType, leftName, rightName, leftFigure, rightFigure, date, onClose }: FurnitureEngravingViewProps) => {
    const left = useAvatarImageTexture(leftFigure, AvatarGenderType.Male, { direction: 2 });
    const right = useAvatarImageTexture(rightFigure, AvatarGenderType.Male, { direction: 4 });

    return (
        <FurnitureTemplatePanel
            id={ENGRAVING_TEMPLATES[engravingType] ?? ENGRAVING_TEMPLATES[0]}
            position="center"
            bindings={{
                name_left: { caption: leftName },
                name_right: { caption: rightName },
                date: { caption: date },
                avatar_left: { children: avatarImage(left.texture) },
                avatar_right: { children: avatarImage(right.texture) },
                header_button_close: { onPointerTap: onClose },
            }}
        />
    );
};
