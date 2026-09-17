import { AvatarGenderType, ISimpleRoomObjectData } from '@nitrodevco/nitro-api';
import { ChangeMottoComposer, GetHabboGroupDetailsComposer } from '@nitrodevco/nitro-packets';
import { useEffect, useState } from 'react';

import { openProfile, RELATIONSHIP_BOBBA, RELATIONSHIP_HEART, RELATIONSHIP_SMILE, requestUserDetails } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useRoomStore } from '#base/context/room';
import { useConfigValue, useTranslation } from '#base/context/system';
import { useRoomUserData } from '#base/hooks';
import { Border, Box, CloseButton, LayoutImage, NitroIcon, Region, TextInput, ThemeImage, ThemeText, useAvatarImageTexture } from '#base/theme';

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

const PANEL_WIDTH = 190;

/**
 * The infostand for a user - `InfoStandUserView`, on the `user_view` layout: their name (a link
 * to their profile), their look and badges with the group badge, their motto (editable when it is
 * your own), what they carry, their achievement score and badge rank, and who they have a
 * relationship with. Selecting them asks for the badges and relationships, which fill in a moment
 * later.
 */
export const InfostandUserView = ({ objectData, onClose }: InfostandUserViewProps) => {
    const info = useRoomUserData(objectData.objectId);
    const badgesRank = useRoomStore(x => x.usersByRoomObjectId[objectData.objectId]?.badgesRank ?? 0);
    const [ editingObjectId, setEditingObjectId ] = useState<number | undefined>(undefined);
    const [ motto, setMotto ] = useState('');
    const mottoMaxLength = useConfigValue<number>('motto.max.length') ?? 38;
    const mottoChangeEnabled = useConfigValue<boolean>('infostand.motto.change.enabled') ?? true;
    const badgesRankEnabled = useConfigValue<boolean>('badge.leaderboard.enabled') ?? false;
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

    const badge = (slot: number) => {
        const selected = badgeInSlot(slot);

        return (
            <InfostandBadgeView
                code={selected?.badgeCode}
                ownerCount={selected?.ownerCount}
            />
        );
    };

    const divider = (
        <Region
            backgroundColor="#383838"
            layout={{ width: '100%', height: 1 }}
        />
    );

    return (
        <Box layout={{ flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
            <Border
                variant="1"
                layout={{ flexDirection: 'column', minWidth: PANEL_WIDTH, maxWidth: PANEL_WIDTH, gap: 5, padding: 10 }}
            >
                <Box layout={{ flexDirection: 'row', alignItems: 'center', width: '100%', gap: 8 }}>
                    <Region
                        tooltip={t('infostand.profile.link.tooltip')}
                        cursor="pointer"
                        onPointerTap={() => openProfile(send, info.webId)}
                        layout={{ flexDirection: 'row', flex: 1, alignItems: 'center', gap: 5 }}
                    >
                        <NitroIcon
                            icon="icon-profile-house"
                            layout={{}}
                        />
                        <ThemeText
                            text={info.name}
                            textStyle="text-style-button-bold"
                        />
                    </Region>
                    <CloseButton
                        variant="1"
                        onPointerTap={onClose}
                        layout={{ flexShrink: 0 }}
                    />
                </Box>
                {!!info.realName.length && (
                    <ThemeText
                        text={t('infostand.text.realname', '', { realname: info.realName })}
                        textStyle="text-style-regular"
                        textOptions={{ fill: '#ffffff' }}
                    />
                )}
                {divider}
                <Box layout={{ flexDirection: 'row', width: '100%', gap: 4 }}>
                    <Region
                        tooltip={t('infostand.profile.link.tooltip')}
                        cursor="pointer"
                        onPointerTap={() => openProfile(send, info.webId)}
                        layout={{ width: 67, height: 130 }}
                    >
                        <Border
                            variant="0"
                            tintColor="#666666"
                            layout={{ width: 67, height: 130, justifyContent: 'center', alignItems: 'center' }}
                        >
                            {showsCrocodile && (
                                <ThemeImage
                                    src={LayoutImage('sticker_croco.png')}
                                    layout={{}}
                                />
                            )}
                            {!showsCrocodile && avatarTexture && (
                                <pixiSprite
                                    texture={avatarTexture}
                                    layout={{ width: avatarWidth, height: avatarHeight }}
                                />
                            )}
                        </Border>
                    </Region>
                    <Box layout={{ flexDirection: 'column', gap: 1 }}>
                        <Box layout={{ flexDirection: 'row', gap: 1 }}>
                            {badge(0)}
                            <InfostandBadgeView
                                code={info.groupBadge}
                                group
                                // `RoomWidgetGetBadgeDetailsMessage`: the group's own details.
                                onPress={info.groupId ? () => send(new GetHabboGroupDetailsComposer({ groupId: info.groupId, openDetails: true })) : undefined}
                            />
                        </Box>
                        <Box layout={{ flexDirection: 'row', gap: 1 }}>
                            {badge(1)}
                            {badge(2)}
                        </Box>
                        <Box layout={{ flexDirection: 'row', gap: 1 }}>
                            {badge(3)}
                            {badge(4)}
                        </Box>
                    </Box>
                </Box>
                {divider}
                <Border
                    variant="0"
                    tintColor="#666666"
                    layout={{ flexDirection: 'row', alignItems: 'center', gap: 4, width: '100%', minHeight: 23, paddingLeft: 6, paddingRight: 6, paddingTop: 2, paddingBottom: 2 }}
                >
                    {info.isOwnUser && mottoChangeEnabled && !isEditingMotto && (
                        <Box
                            cursor="pointer"
                            onPointerTap={startEditingMotto}
                            layout={{ flexShrink: 0 }}
                        >
                            <NitroIcon
                                icon="pencil-icon"
                                layout={{}}
                            />
                        </Box>
                    )}
                    {!isEditingMotto && (
                        <Box
                            cursor={info.isOwnUser ? 'pointer' : undefined}
                            onPointerTap={startEditingMotto}
                            layout={{ flex: 1 }}
                        >
                            <ThemeText
                                text={(info.isOwnUser && !info.motto.length) ? t('infostand.motto.change') : info.motto}
                                textStyle="text-style-regular"
                                textOptions={{ fill: (info.isOwnUser && !info.motto.length) ? '#aaaaaa' : '#ffffff', wordWrap: true, wordWrapWidth: PANEL_WIDTH - 40 }}
                            />
                        </Box>
                    )}
                    {isEditingMotto && (
                        <TextInput
                            value={motto}
                            onChange={setMotto}
                            onEnter={submitMotto}
                            onFocusChange={focused => !focused && submitMotto()}
                            focused
                            maxLength={mottoMaxLength}
                            fontSize={9}
                            textColor="#ffffff"
                            backgroundColor="#666666"
                            layout={{ flex: 1, height: 20 }}
                        />
                    )}
                </Border>
                {carriesItem && (
                    <ThemeText
                        text={t('infostand.text.handitem', '', { item: t(`handitem${info.carryItem}`, `handitem${info.carryItem}`) })}
                        textStyle="text-style-regular"
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: PANEL_WIDTH - 20 }}
                    />
                )}
                {divider}
                <ThemeText
                    text={`${t('infostand.text.achievement_score')} ${info.achievementScore}`}
                    textStyle="text-style-frame-title"
                />
                {badgesRankEnabled && (badgesRank > 0) && (
                    <ThemeText
                        text={`${t('infostand.text.badges_rank')} ${badgesRank}`}
                        textStyle="text-style-regular"
                        textOptions={{ fill: '#ffffff' }}
                    />
                )}
                {RELATIONSHIP_ROWS.map(({ type, name }) => {
                    const relationship = info.relationships.find(entry => entry.relationshipStatusType === type);

                    if (!relationship || (relationship.friendCount <= 0)) return null;

                    return (
                        <Box
                            key={type}
                            layout={{ flexDirection: 'row', alignItems: 'center', gap: 4, width: '100%' }}
                        >
                            <ThemeImage
                                src={LayoutImage(`relationship_status_${name}.png`)}
                                layout={{ width: 17, height: 14, flexShrink: 0 }}
                            />
                            <Region
                                cursor="pointer"
                                onPointerTap={() => openProfile(send, relationship.randomFriendId)}
                                layout={{ flexDirection: 'row', alignItems: 'center', flexShrink: 0 }}
                            >
                                <ThemeText
                                    text={relationship.randomFriendName}
                                    textStyle="text-style-u-bold"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                            {(relationship.friendCount > 1) && (
                                <ThemeText
                                    text={t(`infostand.relstatus.${name}.others`, '', { amount: String(relationship.friendCount - 1) })}
                                    textStyle="text-style-regular"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            )}
                        </Box>
                    );
                })}
            </Border>
        </Box>
    );
};
