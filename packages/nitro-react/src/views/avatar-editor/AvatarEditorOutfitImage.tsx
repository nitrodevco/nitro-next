import { AvatarGenderType } from '@nitrodevco/nitro-api';

import { useAvatarImageTexture } from '#base/theme';

/** `Outfit` (35x60): `OutfitView.update` puts the look at the bottom, centred. */
const OUTFIT_WIDTH = 35;
const OUTFIT_HEIGHT = 60;
/** `Outfit.update`: the look faces 4. */
const OUTFIT_DIRECTION = 4;

/** An NFT outfit's look in its `Outfit`'s `bitmap`. */
/** `OutfitView`'s `bitmap`: an NFT outfit's or a hot look's avatar. */
export const AvatarEditorOutfitImage = ({ figure, gender, zoom }: { figure: string; gender: AvatarGenderType; zoom: boolean }) => {
    const avatar = useAvatarImageTexture(figure, gender, { direction: OUTFIT_DIRECTION, scale: zoom ? 0.5 : 1 });

    if (!avatar.texture) return null;

    return (
        <pixiSprite
            texture={avatar.texture}
            eventMode="none"
            x={Math.trunc((OUTFIT_WIDTH - avatar.width) / 2)}
            y={OUTFIT_HEIGHT - avatar.height}
            layout={false}
        />
    );
};
