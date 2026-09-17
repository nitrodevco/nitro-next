import { AvatarGenderType, ISimpleRoomObjectData } from '@nitrodevco/nitro-api';

import { useTranslation } from '#base/context/system';
import { Border, Box, CloseButton, ThemeText, useAvatarImageTexture } from '#base/theme';

export interface InfostandBotViewProps {
    objectData: ISimpleRoomObjectData;
    name: string;
    /** A rentable bot's blurb; an ordinary bot has none. */
    motto: string;
    figure: string;
    gender: AvatarGenderType;
    /** Who put it here - only a rentable bot names an owner. */
    ownerName: string;
    /** What it is holding, if anything. */
    carryItem: number;
    onClose: () => void;
}

/** `rentable_bot_view` - the panel is 190 wide with a 170-wide column inside it. */
const PANEL_WIDTH = 190;

/**
 * The bot panel, on the `rentable_bot_view` layout: its name, what it says about itself, what it
 * is holding and who put it there.
 *
 * A bot has no profile, no motto to edit and nothing to respect, which is the whole reason it
 * cannot share the user panel.
 */
export const InfostandBotView = ({ name, motto, figure, gender, ownerName, carryItem, onClose }: InfostandBotViewProps) => {
    const t = useTranslation();
    const { texture: avatarTexture, width: avatarWidth, height: avatarHeight } = useAvatarImageTexture(figure, gender, { direction: 4 });

    return (
        <Box layout={{ flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
            <Border
                variant="1"
                name="info_border"
                layout={{ flexDirection: 'column', width: PANEL_WIDTH, gap: 4, padding: 10 }}
            >
                <Box layout={{ flexDirection: 'row', alignItems: 'center', width: '100%', gap: 8 }}>
                    <ThemeText
                        text={name}
                        textStyle="text-style-button-bold"
                        name="name_text"
                        layout={{ flex: 1 }}
                    />
                    <CloseButton
                        variant="1"
                        onPointerTap={onClose}
                        layout={{ flexShrink: 0 }}
                    />
                </Box>
                <Border
                    variant="0"
                    tintColor="#666666"
                    layout={{ width: 67, height: 130, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}
                >
                    {avatarTexture && (
                        <pixiSprite
                            texture={avatarTexture}
                            width={avatarWidth}
                            height={avatarHeight}
                            layout={{}}
                        />
                    )}
                </Border>
                {!!motto.length && (
                    <ThemeText
                        text={motto}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
                        name="description_text"
                        verticalAlign="top"
                        layout={{ width: 170 }}
                    />
                )}
                {carryItem > 0 && (
                    <ThemeText
                        text={t('infostand.text.handitem', 'Carrying: %item%', { item: t(`handitem${carryItem}`, String(carryItem)) })}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
                        name="handitem_text"
                        verticalAlign="top"
                        layout={{ width: 170 }}
                    />
                )}
                {!!ownerName.length && (
                    <ThemeText
                        text={t('infostand.text.botowner', 'Owner: %name%', { name: ownerName })}
                        textOptions={{ fill: '#a4a4a4' }}
                        name="owner_text"
                    />
                )}
            </Border>
        </Box>
    );
};
