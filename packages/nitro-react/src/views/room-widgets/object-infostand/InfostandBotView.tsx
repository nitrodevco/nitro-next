import { AvatarGenderType, ISimpleRoomObjectData } from '@nitrodevco/nitro-api';

import { useTranslation } from '#base/context/system';
import { Border, Box, Button, CloseButton, ThemeText, useAvatarImageTexture } from '#base/theme';

import { InfostandBadgeView } from './InfostandBadgeView';

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
    /** `InfoStandRentableBotView.update`: move and rotate for anyone with rights, pick up for its owner. */
    canMove?: boolean;
    canPickUp?: boolean;
    onMove?: () => void;
    onRotate?: () => void;
    onPickUp?: () => void;
    onClose: () => void;
}

/** Every bot wears the one badge that says it is a bot. */
const BOT_BADGE = 'BOT';
const MAX_CARRY_ITEM = 999999;

/** `rentable_bot_view` - the panel is 190 wide with a 170-wide column inside it. */
const PANEL_WIDTH = 190;

/**
 * The bot panel, on the `rentable_bot_view` layout: its name, what it says about itself, what it
 * is holding and who put it there.
 *
 * A bot has no profile, no motto to edit and nothing to respect, which is the whole reason it
 * cannot share the user panel.
 */
export const InfostandBotView = ({ name, motto, figure, gender, ownerName, carryItem, canMove = false, canPickUp = false, onMove, onRotate, onPickUp, onClose }: InfostandBotViewProps) => {
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
                <Box layout={{ flexDirection: 'row', gap: 4 }}>
                    <Border
                        variant="0"
                        tintColor="#666666"
                        layout={{ width: 67, height: 130, justifyContent: 'center', alignItems: 'center' }}
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
                    <InfostandBadgeView code={BOT_BADGE} />
                </Box>
                {!!motto.length && (
                    <ThemeText
                        text={motto}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
                        name="description_text"
                        verticalAlign="top"
                        layout={{ width: 170 }}
                    />
                )}
                {(carryItem > 0) && (carryItem < MAX_CARRY_ITEM) && (
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
            {(canMove || canPickUp) && (
                <Box layout={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 8 }}>
                    {canMove && (
                        <Button
                            variant="1"
                            onPointerTap={onMove}
                            layout={{}}
                        >
                            {t('infostand.button.move')}
                        </Button>
                    )}
                    {canMove && (
                        <Button
                            variant="1"
                            onPointerTap={onRotate}
                            layout={{}}
                        >
                            {t('infostand.button.rotate')}
                        </Button>
                    )}
                    {canPickUp && (
                        <Button
                            variant="1"
                            onPointerTap={onPickUp}
                            layout={{}}
                        >
                            {t('infostand.button.pickup')}
                        </Button>
                    )}
                </Box>
            )}
        </Box>
    );
};
