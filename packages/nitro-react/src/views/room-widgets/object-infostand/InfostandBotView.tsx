import { AvatarGenderType, ISimpleRoomObjectData } from '@nitrodevco/nitro-api';

import { useTranslation } from '#base/context/system';
import { Border, Box, Button, CloseButton, LayoutImage, Region, ThemeImage, ThemeText, useAvatarImageTexture } from '#base/theme';

import { InfostandBadgeView } from './InfostandBadgeView';

export interface InfostandBotViewProps {
    objectData: ISimpleRoomObjectData;
    /** A rentable bot gets `rentable_bot_view`, any other bot `bot_view`. */
    rentable: boolean;
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

/** Every row of `infostand_element_list` is this wide; its `spacing` is 3. */
const LIST_WIDTH = 170;

/** `bot_view`'s `motto_text`: `textHeight + 5` high within `MIN_MOTTO_HEIGHT` / `MAX_MOTTO_HEIGHT`, text `margin_top` 6 down. */
const MIN_MOTTO_HEIGHT = 23;
const MAX_MOTTO_HEIGHT = 50;
const MOTTO_MARGIN_TOP = 6;

/** `InfoStandRentableBotView.BUTTONS_MAX_WIDTH` / `BUTTON_HEIGHT` / `BUTTON_MARGIN`. */
const BUTTONS_MAX_WIDTH = 250;
const BUTTON_HEIGHT = 25;
const BUTTON_MARGIN = 5;

/** The `container` spacers between the list's groups - `0xffff333333`, a full-alpha `#333333`. */
const Spacer = () => (
    <Region
        backgroundColor="#333333"
        layout={{ width: LIST_WIDTH, height: 1, flexShrink: 0 }}
    />
);

/** `name_text`: Volter Bold, white, sized to the name. */
const NameText = ({ name }: { name: string }) => (
    <ThemeText
        text={name}
        textOptions={{ fill: '#ffffff', fontFamily: 'VolterBold' }}
        name="name_text"
        verticalAlign="top"
    />
);

/** `handitem_txt` / `handitem_text`: `textHeight + 5` high - the bitmap and one pixel. */
const HandItemText = ({ text }: { text: string }) => (
    <ThemeText
        text={text}
        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: LIST_WIDTH - 4 }}
        verticalAlign="top"
        layout={{ marginBottom: 1 }}
    />
);

/**
 * The bot panel. An ordinary bot is `InfoStandBotView` on `bot_view` - its name, its look with
 * the bot badge, its motto and what it is holding. A rentable bot is `InfoStandRentableBotView`
 * on `rentable_bot_view` - the look on the bot info backdrop, what it holds, its description and
 * owner, and the move / rotate / pick up buttons under the panel.
 *
 * The rows are `infostand_element_list` (an `itemlist_vertical` at 10,10 with `spacing` 3) and
 * the border is that list's height plus 20 (`updateWindow`), so the list is a column here. The
 * avatar is a cropped `avatar_image`; `useAvatarImageTexture` has no cropped render, so the
 * uncropped image is centred where the cropped one would be. `rentable_bot_view`'s `home_icon`
 * is a blank bitmap nothing fills, so it is not drawn.
 */
export const InfostandBotView = ({ rentable, name, motto, figure, gender, ownerName, carryItem, canMove = false, canPickUp = false, onMove, onRotate, onPickUp, onClose }: InfostandBotViewProps) => {
    const t = useTranslation();
    const { texture: avatarTexture, width: avatarWidth, height: avatarHeight } = useAvatarImageTexture(figure, gender, { direction: 4 });

    const carriesItem = (carryItem > 0) && (carryItem < MAX_CARRY_ITEM);
    const handItemText = t('infostand.text.handitem', '', { item: t(`handitem${carryItem}`, `handitem${carryItem}`) });

    const avatar = avatarTexture && (
        <pixiSprite
            texture={avatarTexture}
            layout={{ width: avatarWidth, height: avatarHeight }}
        />
    );

    if (!rentable) {
        return (
            <Box layout={{ flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
                <Border
                    variant="1"
                    name="info_border"
                    layout={{ width: 190, flexShrink: 0, paddingLeft: 10, paddingTop: 10, paddingBottom: 10 }}
                >
                    <CloseButton
                        variant="1"
                        onPointerTap={onClose}
                        layout={{ position: 'absolute', left: 168, top: 6, width: 18, height: 16 }}
                    />
                    <Box layout={{ flexDirection: 'column', width: LIST_WIDTH, gap: 3 }}>
                        <NameText name={name} />
                        <Spacer />
                        <Box layout={{ width: 193, height: 132, marginLeft: -16, flexShrink: 0 }}>
                            <Border
                                variant="0"
                                name="grey_bg"
                                tintColor="#666666"
                                layout={{ position: 'absolute', left: 16, top: 0, width: 67, height: 130, justifyContent: 'center', alignItems: 'center' }}
                            >
                                {avatar}
                            </Border>
                            <InfostandBadgeView
                                code={BOT_BADGE}
                                layout={{ position: 'absolute', left: 88, top: 1 }}
                            />
                        </Box>
                        <Spacer />
                        <Border
                            variant="0"
                            name="motto_container"
                            tintColor="#666666"
                            layout={{ width: LIST_WIDTH, flexShrink: 0, paddingLeft: 5, paddingTop: 2, paddingBottom: 1 }}
                        >
                            <Box layout={{ width: 160, minHeight: MIN_MOTTO_HEIGHT, maxHeight: MAX_MOTTO_HEIGHT, overflow: 'hidden' }}>
                                <ThemeText
                                    text={motto}
                                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 156 }}
                                    name="motto_text"
                                    verticalAlign="top"
                                    // The bitmap is `textHeight + 4`: down by the margin, it
                                    // leaves `textHeight + 5` of the field's height.
                                    layout={{ marginTop: MOTTO_MARGIN_TOP, marginBottom: 1 - MOTTO_MARGIN_TOP }}
                                />
                            </Box>
                        </Border>
                        {carriesItem && (
                            <>
                                <Spacer />
                                <HandItemText text={handItemText} />
                            </>
                        )}
                    </Box>
                </Border>
            </Box>
        );
    }

    // `arrangeButtons`: the regions are laid right to left in reverse order, wrapping to a new row
    // at the right edge - a reversed row that wraps, fed the buttons back to front.
    const buttons = [
        canPickUp && { key: 'pick', caption: t('infostand.button.pickup'), onPress: onPickUp },
        canMove && { key: 'rotate', caption: t('infostand.button.rotate'), onPress: onRotate },
        canMove && { key: 'move', caption: t('infostand.button.move'), onPress: onMove },
    ].filter(button => !!button);

    return (
        <Box layout={{ flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
            <Border
                variant="1"
                name="info_border"
                layout={{ width: 190, flexShrink: 0, paddingLeft: 10, paddingTop: 10, paddingBottom: 10 }}
            >
                <CloseButton
                    variant="1"
                    onPointerTap={onClose}
                    layout={{ position: 'absolute', left: 168, top: 6, width: 18, height: 16 }}
                />
                <Box layout={{ flexDirection: 'column', width: LIST_WIDTH, gap: 3 }}>
                    <NameText name={name} />
                    <Spacer />
                    <Box layout={{ width: 193, height: 132, marginLeft: -16, flexShrink: 0 }}>
                        <Border
                            variant="0"
                            name="grey_bg"
                            tintColor="#666666"
                            layout={{ position: 'absolute', left: 16, top: 0, width: 67, height: 130 }}
                        />
                        <Region layout={{ position: 'absolute', left: 17, top: 2, width: 66, height: 127, justifyContent: 'center', alignItems: 'center' }}>
                            <ThemeImage
                                src={LayoutImage('room-ui/infostand_bot_info_bg.png')}
                                bitmap={{ pivot: 'center', stretchedX: false, stretchedY: false }}
                                layout={{ position: 'absolute', left: 0, top: 0, width: 66, height: 127 }}
                            />
                            {avatar}
                        </Region>
                        <InfostandBadgeView
                            code={BOT_BADGE}
                            layout={{ position: 'absolute', left: 116, top: 21 }}
                        />
                    </Box>
                    {carriesItem && (
                        <>
                            <Spacer />
                            <HandItemText text={handItemText} />
                        </>
                    )}
                    <ThemeText
                        text={motto}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: LIST_WIDTH - 4 }}
                        name="description_text"
                        clip
                        verticalAlign="top"
                        layout={{ width: LIST_WIDTH, height: 31, flexShrink: 0 }}
                    />
                    {!!ownerName.length && (
                        <ThemeText
                            text={t('infostand.text.botowner', '', { name: ownerName })}
                            textOptions={{ fill: '#ffffff' }}
                            name="owner_text"
                            verticalAlign="top"
                        />
                    )}
                </Box>
            </Border>
            {/* `button_list` is always `BUTTONS_MAX_WIDTH` wide and at least a row high, buttons or not. */}
            <Box layout={{ flexDirection: 'row-reverse', flexWrap: 'wrap', width: BUTTONS_MAX_WIDTH, minHeight: BUTTON_HEIGHT, columnGap: BUTTON_MARGIN, rowGap: BUTTON_MARGIN }}>
                {buttons.map(({ key, caption, onPress }) => (
                    <Button
                        key={key}
                        variant="1"
                        name={key}
                        onPointerTap={onPress}
                        layout={{ height: BUTTON_HEIGHT, flexShrink: 0 }}
                    >
                        {caption}
                    </Button>
                ))}
            </Box>
        </Box>
    );
};
