import { IBadgePartData } from '@nitrodevco/nitro-packets';

import { BADGE_IMAGE_HEIGHT, BADGE_IMAGE_WIDTH, BadgeLayerOptions, badgePartImageUrls, badgePartOffset } from '#base/context/groups';
import { useConfigValue } from '#base/context/system';
import { Region, useTextureFromUrl } from '#base/theme';

export interface GroupBadgePartImageProps {
    /** The part this layer draws, or nothing for an empty layer. */
    part: IBadgePartData | undefined;
    /** The layer's grid cell, which is what places the part inside the 39x39 badge. */
    options: BadgeLayerOptions;
    /** The badge colour the part is tinted with, `undefined` for the palette's own. */
    color: number | undefined;
}

/**
 * One badge layer - `BadgeEditorPartItem.getComposite`: the part's bitmap tinted with the layer's
 * colour, with its mask copied over the result untinted. A `ColorTransform` whose three multipliers
 * are the colour's own channels is exactly a Pixi tint, so the composite is two sprites rather than
 * a bitmap the client rebuilds on every change.
 */
export const GroupBadgePartImage = ({ part, options, color }: GroupBadgePartImageProps) => {
    const badgePartUrl = useConfigValue<string>('image.library.badgepart.url') ?? '';
    const urls = part ? badgePartImageUrls(badgePartUrl, part.fileName, part.maskFileName) : undefined;
    const texture = useTextureFromUrl(urls?.image);
    const maskTexture = useTextureFromUrl(urls?.mask);

    if (!texture) return null;

    const { x, y } = badgePartOffset(options, texture.width, texture.height);

    return (
        <Region layout={{ position: 'absolute', left: 0, top: 0, width: BADGE_IMAGE_WIDTH, height: BADGE_IMAGE_HEIGHT, overflow: 'hidden' }}>
            <pixiSprite
                texture={texture}
                tint={color ?? 0xffffff}
                layout={{ position: 'absolute', left: x, top: y, width: texture.width, height: texture.height }}
            />
            {maskTexture && (
                <pixiSprite
                    texture={maskTexture}
                    layout={{ position: 'absolute', left: x, top: y, width: maskTexture.width, height: maskTexture.height }}
                />
            )}
        </Region>
    );
};
