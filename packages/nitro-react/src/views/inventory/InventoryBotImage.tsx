/**
 * A bot's picture in an inventory bitmap - `BotsView.getItemImage`'s cropped head or whole figure,
 * copied into the bitmap's centre (`BotGridItem.setImage`, `updatePreview`).
 */
import { AvatarGenderType } from '@nitrodevco/nitro-api';

import { InventoryBot } from '#base/context/inventory';
import { useAvatarImageTexture } from '#base/theme';

/** `BotData.gender` is `'m'` or `'f'`, in whichever case the hotel sends. */
const getBotGender = (bot: InventoryBot): AvatarGenderType => ((bot.gender.toLowerCase() === 'f') ? AvatarGenderType.Female : AvatarGenderType.Male);

export interface InventoryBotImageProps {
    bot: InventoryBot;
    headOnly: boolean;
    direction: number;
    width: number;
    height: number;
}

/** `getItemImage`'s cropped head or body, copied into the bitmap's centre (`setImage`, `updatePreview`). */
export const InventoryBotImage = ({ bot, headOnly, direction, width, height }: InventoryBotImageProps) => {
    const avatar = useAvatarImageTexture(bot.figure, getBotGender(bot), { headOnly, cropped: true, direction });

    if (!avatar.texture) return null;

    return (
        <pixiSprite
            texture={avatar.texture}
            eventMode="none"
            x={Math.trunc((width / 2) - (avatar.width / 2))}
            y={Math.trunc((height / 2) - (avatar.height / 2))}
            layout={false}
        />
    );
};
