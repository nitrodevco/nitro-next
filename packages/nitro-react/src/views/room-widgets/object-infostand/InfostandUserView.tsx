import { AvatarGenderType, ISimpleRoomObjectData } from '@nitrodevco/nitro-api';
import { ChangeMottoComposer } from '@nitrodevco/nitro-packets';
import { useEffect, useState } from 'react';

import { openProfile, RELATIONSHIP_BOBBA, RELATIONSHIP_HEART, RELATIONSHIP_SMILE, requestUserDetails, showGroupBadgeInfo } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useRoomStore } from '#base/context/room';
import { useConfigValue, useTranslation } from '#base/context/system';
import { useRoomUserData } from '#base/hooks';
import { Border, Box, CloseButton, LayoutImage, Region, TextInput, ThemeImage, ThemeText, useAvatarImageTexture } from '#base/theme';

import { InfostandBadgeView } from './InfostandBadgeView';

export interface InfostandUserViewProps {
    objectData: ISimpleRoomObjectData;
    onClose: () => void;
}

/** A carried item id at or above this is not a hand item with a name. */
const MAX_CARRY_ITEM = 999999;

/** `RelationshipStatusEnum.displayableStatuses`, in the order the infostand lists them. */
const RELATIONSHIP_ROWS: { type: number; name: string }[] = [
    { type: RELATIONSHIP_HEART, name: 'heart' },
    { type: RELATIONSHIP_SMILE, name: 'smile' },
    { type: RELATIONSHIP_BOBBA, name: 'bobba' },
];

/** The motto that swaps the avatar for a crocodile - `InfoStandUserView.setMotto`. */
const CROCODILE_MOTTO = 'crikey';

/** `InfoStandUserView.LINK_COLOR_ACTIONS_DEFAULT` / `_HOVER`: the name link's colour, out and over. */
const NAME_COLOR = '#ffffff';
const NAME_HOVER_COLOR = '#91c2ff';

/** `MOTTO_UNCHANGED_COLOR` / `MOTTO_EDITED_COLOR`: a motto, and the change prompt standing in for none. */
const MOTTO_COLOR = '#ffffff';
const MOTTO_PROMPT_COLOR = '#aaaaaa';

/** `MIN_MOTTO_HEIGHT` / `MAX_MOTTO_HEIGHT`: the motto field's height is `textHeight + 5` between these. */
const MIN_MOTTO_HEIGHT = 23;
const MAX_MOTTO_HEIGHT = 50;

/** The `motto_text` input's `margin_top` var. */
const MOTTO_MARGIN_TOP = 6;

/** Every row of `infostand_element_list` is this wide; its `spacing` is 3. */
const LIST_WIDTH = 170;

/** The `container` spacers between the list's groups - `0xffff333333`, a full-alpha `#333333`. */
const Spacer = () => (
    <Region
        backgroundColor="#333333"
        layout={{ width: LIST_WIDTH, height: 1, flexShrink: 0 }}
    />
);

/** The badge slots of `image_and_badges_container`: `badge_<n>` at the layout's `x, y`. */
const BADGE_SLOTS: { slot: number; left: number; top: number }[] = [
    { slot: 0, left: 88, top: 1 },
    { slot: 1, left: 88, top: 44 },
    { slot: 2, left: 131, top: 44 },
    { slot: 3, left: 88, top: 87 },
    { slot: 4, left: 131, top: 87 },
];

/**
 * The infostand for a user - `InfoStandUserView`, on the `user_view` layout: their name (a link
 * to their profile), their look and badges with the group badge, their motto (editable when it is
 * your own), their badge rank, achievement score and what they carry, and who they have a
 * relationship with. Selecting them asks for the badges and relationships, which fill in a moment
 * later.
 *
 * The rows are `infostand_element_list` (an `itemlist_vertical` at 10,10 with `spacing` 3 that
 * resizes to its items) and the border is that list's height plus 20 (`updateWindow`), so the
 * list is a column here; everything else keeps the layout's absolute rects.
 *
 * `setRealName` looks for a `realname_text` the layout does not have, so Flash never shows the
 * real name, and neither does this. The avatar is `avatar_image` with `avatar_image:cropped`;
 * `useAvatarImageTexture` has no cropped render, so the uncropped image is centred where the
 * cropped one would be.
 */
export const InfostandUserView = ({ objectData, onClose }: InfostandUserViewProps) => {
    const info = useRoomUserData(objectData.objectId);
    // `InfoStandUserView.badgesRank`: shown whenever the server sends a rank (>= 0) - Flash has no config gate for it.
    const badgesRank = useRoomStore(x => x.usersByRoomObjectId[objectData.objectId]?.badgesRank ?? -1);
    const [ editingObjectId, setEditingObjectId ] = useState<number | undefined>(undefined);
    const [ motto, setMotto ] = useState('');
    const [ nameHovered, setNameHovered ] = useState(false);
    const mottoMaxLength = useConfigValue<number>('motto.max.length') ?? 38;
    const mottoChangeEnabled = useConfigValue<boolean>('infostand.motto.change.enabled') ?? true;
    // `InfoStandWidgetHandler.isActivityDisplayEnabled` shows `score_spacer`, `score_text` and `score_value`.
    const activityDisplayEnabled = useConfigValue<boolean>('activity.point.display.enabled') === true;
    // `InfoStandUserView.createWindow`: `relationship_status_container.visible = getBoolean("relationship.status.enabled")`.
    const relationshipsEnabled = useConfigValue<boolean>('relationship.status.enabled') === true;
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const { texture: avatarTexture, width: avatarWidth, height: avatarHeight } = useAvatarImageTexture(info?.figure, info?.gender ?? AvatarGenderType.Male, { direction: 4 });

    const webId = info?.webId ?? -1;

    // `handleGetUserInfoMessage`: every selection asks again, so the badges are current.
    useEffect(() => {
        if (webId < 0) return;

        requestUserDetails(send, webId);
    }, [ webId, send ]);

    if (!info) return null;

    // Which object's motto is being edited: selecting someone else simply stops matching.
    const isEditingMotto = editingObjectId === objectData.objectId;

    const submitMotto = () => {
        if (motto.length > mottoMaxLength) return;

        send(new ChangeMottoComposer({ text: motto }));
        setEditingObjectId(undefined);
    };

    const startEditingMotto = () => {
        if (!info.isOwnUser || !mottoChangeEnabled) return;

        setMotto(info.motto);
        setEditingObjectId(objectData.objectId);
    };

    const badgeInSlot = (slot: number) => info.badges.find(badge => badge.badgeIndex === (slot + 1));
    const showsCrocodile = info.motto.toLowerCase().includes(CROCODILE_MOTTO);
    const carriesItem = (info.carryItem > 0) && (info.carryItem < MAX_CARRY_ITEM);
    // `setMotto`: your own empty motto reads as the change prompt, in the edited colour.
    const showsMottoPrompt = info.isOwnUser && !info.motto.length;

    return (
        <Box layout={{ flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
            <Border
                variant="1"
                layout={{ width: 190, flexShrink: 0, paddingLeft: 10, paddingTop: 10, paddingBottom: 10 }}
            >
                <ThemeImage
                    name="home_icon"
                    src={LayoutImage('room-ui/icon_home.png')}
                    cursor="pointer"
                    onPointerTap={() => openProfile(send, info.webId)}
                    // `InfoStandUserView`: `icon_home` copied at 0,0 into a bitmap of the window's own 16x15, all of it clickable.
                    bitmap={{ stretchedX: false, stretchedY: false }}
                    layout={{ position: 'absolute', left: 8, top: 11, width: 16, height: 15 }}
                />
                <CloseButton
                    variant="1"
                    onPointerTap={onClose}
                    layout={{ position: 'absolute', left: 168, top: 6, width: 18, height: 16 }}
                />
                {showsCrocodile && (
                    <ThemeImage
                        name="sticker_croco"
                        src={LayoutImage('room-ui/sticker_croco.png')}
                        bitmap={{ stretchedX: false, stretchedY: false }}
                        layout={{ position: 'absolute', left: 2, top: 64, width: 92, height: 63 }}
                    />
                )}
                <Box layout={{ flexDirection: 'column', width: LIST_WIDTH, gap: 3 }}>
                    <Region
                        tooltip={t('infostand.profile.link.tooltip')}
                        tooltipDelay={100}
                        cursor="pointer"
                        onPointerTap={() => openProfile(send, info.webId)}
                        onPointerOver={() => setNameHovered(true)}
                        onPointerOut={() => setNameHovered(false)}
                        layout={{ width: 135, height: 12, marginLeft: 18, flexShrink: 0 }}
                    >
                        <ThemeText
                            text={info.name}
                            textOptions={{ fill: nameHovered ? NAME_HOVER_COLOR : NAME_COLOR, fontFamily: 'VolterBold' }}
                            flashFormat={{ antiAliasType: 'advanced' }}
                            verticalAlign="top"
                        />
                    </Region>
                    <Spacer />
                    <Box layout={{ width: 193, height: 132, marginLeft: -16, flexShrink: 0 }}>
                        <Border
                            variant="0"
                            tintColor="#666666"
                            layout={{ position: 'absolute', left: 16, top: 0, width: 67, height: 130 }}
                        />
                        <Region
                            tooltip={t('infostand.profile.link.tooltip')}
                            tooltipDelay={100}
                            cursor="pointer"
                            onPointerTap={() => openProfile(send, info.webId)}
                            layout={{ position: 'absolute', left: 17, top: 2, width: 66, height: 127, justifyContent: 'center', alignItems: 'center' }}
                        >
                            {!showsCrocodile && avatarTexture && (
                                <pixiSprite
                                    texture={avatarTexture}
                                    layout={{ width: avatarWidth, height: avatarHeight }}
                                />
                            )}
                        </Region>
                        {BADGE_SLOTS.map(({ slot, left, top }) => {
                            const selected = badgeInSlot(slot);

                            return (
                                <InfostandBadgeView
                                    key={slot}
                                    code={selected?.badgeCode}
                                    ownerCount={selected?.ownerCount}
                                    layout={{ position: 'absolute', left, top }}
                                />
                            );
                        })}
                        <InfostandBadgeView
                            code={info.groupBadge}
                            group
                            // `HabboGroupsManager.showGroupBadgeInfo`: the group's own window.
                            onPress={info.groupId ? () => showGroupBadgeInfo(send, info.groupId) : undefined}
                            layout={{ position: 'absolute', left: 131, top: 1 }}
                        />
                    </Box>
                    <Spacer />
                    <Border
                        variant="0"
                        tintColor="#666666"
                        layout={{ width: LIST_WIDTH, flexShrink: 0, paddingLeft: 20, paddingTop: 2, paddingBottom: 1 }}
                    >
                        {/* `changemotto.image` (`common_small_pen`), shown for your own motto only. */}
                        {info.isOwnUser && (
                            <ThemeImage
                                name="changemotto.image"
                                src={LayoutImage('shared/common_small_pen.png')}
                                cursor={mottoChangeEnabled ? 'pointer' : undefined}
                                onPointerTap={startEditingMotto}
                                bitmap={{}}
                                layout={{ position: 'absolute', left: 3, width: 17, height: 18, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5 }}
                            />
                        )}
                        {!isEditingMotto && (
                            // `motto_text`: 140 wide, `textHeight + 5` high within 23-50, the text
                            // `margin_top` below its top and cut at its bottom.
                            <Box
                                cursor={(info.isOwnUser && mottoChangeEnabled) ? 'pointer' : undefined}
                                onPointerTap={startEditingMotto}
                                layout={{ width: 140, minHeight: MIN_MOTTO_HEIGHT, maxHeight: MAX_MOTTO_HEIGHT, overflow: 'hidden' }}
                            >
                                <ThemeText
                                    text={showsMottoPrompt ? t('infostand.motto.change') : info.motto}
                                    textOptions={{ fill: showsMottoPrompt ? MOTTO_PROMPT_COLOR : MOTTO_COLOR, wordWrap: true, wordWrapWidth: 136 }}
                                    flashFormat={{ antiAliasType: 'advanced' }}
                                    verticalAlign="top"
                                    // The bitmap is `textHeight + 4` with its gutter: down by the
                                    // margin, it leaves `textHeight + 5` of the field's height.
                                    layout={{ marginTop: MOTTO_MARGIN_TOP, marginBottom: 1 - MOTTO_MARGIN_TOP }}
                                />
                            </Box>
                        )}
                        {isEditingMotto && (
                            <Box layout={{ width: 140, height: MIN_MOTTO_HEIGHT, paddingTop: MOTTO_MARGIN_TOP }}>
                                <TextInput
                                    value={motto}
                                    onChange={setMotto}
                                    onEnter={submitMotto}
                                    onFocusChange={focused => !focused && submitMotto()}
                                    focused
                                    maxLength={mottoMaxLength}
                                    textStyle="regular"
                                    textColor={MOTTO_PROMPT_COLOR}
                                    flashPlacement
                                    alwaysShowSelection
                                    backgroundColor={null}
                                    focusedBackgroundColor={null}
                                    layout={{ width: 140, height: MIN_MOTTO_HEIGHT - MOTTO_MARGIN_TOP }}
                                />
                            </Box>
                        )}
                    </Border>
                    {(badgesRank >= 0) && (
                        <>
                            <Spacer />
                            <Box layout={{ width: LIST_WIDTH, height: 15, flexShrink: 0, overflow: 'hidden' }}>
                                <ThemeText
                                    text={t('infostand.text.badges_rank', '', { rank: `#${badgesRank}` })}
                                    textOptions={{ fill: '#ffffff', fontFamily: 'VolterBold', wordWrap: true, wordWrapWidth: LIST_WIDTH - 4 }}
                                    flashFormat={{ antiAliasType: 'advanced' }}
                                    verticalAlign="top"
                                />
                            </Box>
                        </>
                    )}
                    {activityDisplayEnabled && (
                        <>
                            <Spacer />
                            <ThemeText
                                text={t('infostand.text.achievement_score')}
                                textOptions={{ fill: '#ffffff', fontFamily: 'VolterBold', wordWrap: true, wordWrapWidth: LIST_WIDTH - 4 }}
                                flashFormat={{ antiAliasType: 'advanced' }}
                                clip
                                verticalAlign="top"
                                layout={{ width: LIST_WIDTH, height: 15, flexShrink: 0 }}
                            />
                            <ThemeText
                                text={String(info.achievementScore)}
                                textOptions={{ fill: '#ffffff', fontFamily: 'VolterBold', wordWrap: true, wordWrapWidth: LIST_WIDTH - 4 }}
                                flashFormat={{ antiAliasType: 'advanced' }}
                                clip
                                verticalAlign="top"
                                layout={{ width: LIST_WIDTH, height: 15, flexShrink: 0 }}
                            />
                        </>
                    )}
                    {carriesItem && (
                        <>
                            <Spacer />
                            {/* `handitem_txt`: `textHeight + 5` high - the bitmap and one pixel. */}
                            <ThemeText
                                text={t('infostand.text.handitem', '', { item: t(`handitem${info.carryItem}`, `handitem${info.carryItem}`) })}
                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: LIST_WIDTH - 4 }}
                                flashFormat={{ antiAliasType: 'advanced' }}
                                verticalAlign="top"
                                layout={{ marginBottom: 1 }}
                            />
                        </>
                    )}
                    <Spacer />
                    {relationshipsEnabled && (
                        <Box layout={{ flexDirection: 'column', width: LIST_WIDTH, height: 55, gap: 3, flexShrink: 0 }}>
                            {RELATIONSHIP_ROWS.map(({ type, name }) => {
                                const relationship = info.relationships.find(entry => entry.relationshipStatusType === type);

                                if (!relationship || (relationship.friendCount <= 0)) return null;

                                return (
                                    <Box
                                        key={type}
                                        layout={{ flexDirection: 'row', width: 172, height: 16, flexShrink: 0, overflow: 'hidden' }}
                                    >
                                        <ThemeImage
                                            src={LayoutImage(`shared/relationship_status_${name}.png`)}
                                            bitmap={{ stretchedX: false, stretchedY: false }}
                                            layout={{ width: 17, height: 14, flexShrink: 0 }}
                                        />
                                        <Region
                                            cursor="pointer"
                                            onPointerTap={() => openProfile(send, relationship.randomFriendId)}
                                            layout={{ height: 13, flexShrink: 0 }}
                                        >
                                            <ThemeText
                                                text={relationship.randomFriendName}
                                                textStyle="bold"
                                                textOptions={{ fill: '#ffffff' }}
                                                flashFormat={{ underline: true, antiAliasType: 'advanced' }}
                                                verticalAlign="top"
                                            />
                                        </Region>
                                        {(relationship.friendCount > 1) && (
                                            <ThemeText
                                                text={t(`infostand.relstatus.${name}.others`, '', { amount: String(relationship.friendCount - 1) })}
                                                textStyle="regular"
                                                textOptions={{ fill: '#ffffff' }}
                                                verticalAlign="top"
                                                layout={{ height: 13, flexShrink: 0 }}
                                            />
                                        )}
                                    </Box>
                                );
                            })}
                        </Box>
                    )}
                </Box>
            </Border>
        </Box>
    );
};
