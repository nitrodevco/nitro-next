import { AvatarGenderType, ISimpleRoomObjectData } from '@nitrodevco/nitro-api';
import { ChangeMottoComposer } from '@nitrodevco/nitro-packets';
import { useEffect, useRef, useState } from 'react';

import { openClientLink, openProfile, RELATIONSHIP_BOBBA, RELATIONSHIP_HEART, RELATIONSHIP_SMILE, requestUserDetails, showGroupBadgeInfo } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useRoomStore } from '#base/context/room';
import { useConfigValue, useTranslation } from '#base/context/system';
import { useRoomUserData } from '#base/hooks';
import { LayoutImage, TemplateBindings, TemplateWindow, TemplateWindows, ThemeImage, useAvatarImageTexture } from '#base/theme';
import { isHandItem } from '#base/utils';

import { InfostandBadgeView } from './InfostandBadgeView';

export interface InfostandUserViewProps {
    objectData: ISimpleRoomObjectData;
    onClose: () => void;
}

/** `RelationshipStatusEnum.displayableStatuses`, in the order the infostand lists them. */
const RELATIONSHIP_ROWS: { type: number; name: string }[] = [
    { type: RELATIONSHIP_HEART, name: 'heart' },
    { type: RELATIONSHIP_SMILE, name: 'smile' },
    { type: RELATIONSHIP_BOBBA, name: 'bobba' },
];

/** The motto that swaps the avatar for a crocodile - `InfoStandUserView.setMotto`. */
const CROCODILE_MOTTO = 'crikey';

/** `InfoStandUserView.LINK_COLOR_ACTIONS_DEFAULT` / `_HOVER`: the name link's colour, out and over. */
const NAME_COLOR = 0xffffff;
const NAME_HOVER_COLOR = 0x91c2ff;

/** `MOTTO_UNCHANGED_COLOR` / `MOTTO_EDITED_COLOR`: a motto as it stands, and one being edited or the change prompt. */
const MOTTO_COLOR = 0xffffff;
const MOTTO_EDITED_COLOR = 0xaaaaaa;

/** `MIN_MOTTO_HEIGHT` / `MAX_MOTTO_HEIGHT`: the motto field's height is `textHeight + 5` between these. */
const MIN_MOTTO_HEIGHT = 23;
const MAX_MOTTO_HEIGHT = 50;

/** `onMottoKeyboard`: Enter sends a motto at most once in this many milliseconds. */
const MOTTO_SEND_INTERVAL = 2000;

/** `createWindow`: the badge widgets `badge_0` to `badge_4`. */
const BADGE_SLOTS = [ 0, 1, 2, 3, 4 ];

/** `getLink(0, -1, getBadgeLeaderboardPageForCurrentUser())`: the badge leaderboard's first page. */
const BADGE_LEADERBOARD_LINK = 'badge_leaderboard/0/-1/0';

/** The cropped render's direction - `avatar_image:direction` `southwest`. */
const AVATAR_DIRECTION = 4;

/**
 * The infostand for a user - `InfoStandUserView`, drawn from its Flash template
 * (`habbo-room-ui-com/user_view`): their name (a link to their profile), their look and badges with
 * the group badge, their motto (editable when it is your own), their badge rank, achievement score
 * and what they carry, and who they have a relationship with. Selecting them asks for the badges and
 * relationships, which fill in a moment later.
 *
 * What the code sets on the layout's elements are the bindings: `setMotto`'s text, colour and pen,
 * the crocodile sticker over the avatar, the `badgesRank`, `achievementScore` and `carryItem` rows and
 * their spacers, `setRelationshipStatuses`' rows, and `createWindow`'s config gates. What it measures
 * and moves is `arrange`: the motto field `textHeight + 5` high within 23-50 and its container 3
 * higher, the hand item text `textHeight + 5`, and `updateWindow` - the border the element list's
 * height plus 20, the window the border's size. The element list follows its items itself
 * (`resize_on_item_update`).
 *
 * The badge widgets hold `InfostandBadgeView`, which draws the badge and names it on hover with its
 * owner count (`showBadgeInfo`'s details); a `badge_image` binding draws the badge only. `home_icon`
 * holds `icon_home` drawn at 0,0 unstretched - `createWindow` copies it into a bitmap of the window's
 * own 16x15, which a binding's `asset` would stretch to the window. `avatar_image` holds the cropped
 * render: `AvatarImageWidget.refresh` sizes the widget to it, and the widget is centred in its region
 * (`params` centre both ways), so a resize re-centres it as `WE_RESIZED` does.
 *
 * Not drawn, as in this revision: `setRealName` looks for a `realname_text` the layout does not have,
 * and `xp` an `xp_text`. The rarity glow (`playGlow`) and the badge details window's rarity tag are
 * not ported.
 */
export const InfostandUserView = ({ objectData, onClose }: InfostandUserViewProps) => {
    const info = useRoomUserData(objectData.objectId);
    // `InfoStandUserView.badgesRank`: shown whenever the server sends a rank (>= 0) - Flash has no config gate for it.
    const badgesRank = useRoomStore(x => x.usersByRoomObjectId[objectData.objectId]?.badgesRank ?? -1);
    const [ editingObjectId, setEditingObjectId ] = useState<number | undefined>(undefined);
    const [ motto, setMotto ] = useState('');
    const [ nameHovered, setNameHovered ] = useState(false);
    const lastMottoSent = useRef(0);
    const mottoMaxLength = useConfigValue<number>('motto.max.length') ?? 38;
    const mottoChangeEnabled = useConfigValue<boolean>('infostand.motto.change.enabled') === true;
    // `InfoStandWidgetHandler.isActivityDisplayEnabled` shows `score_spacer`, `score_text` and `score_value`.
    const activityDisplayEnabled = useConfigValue<boolean>('activity.point.display.enabled') === true;
    // `InfoStandUserView.createWindow`: `relationship_status_container.visible = getBoolean("relationship.status.enabled")`.
    const relationshipsEnabled = useConfigValue<boolean>('relationship.status.enabled') === true;
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const avatar = useAvatarImageTexture(info?.figure || undefined, info?.gender ?? AvatarGenderType.Male, { cropped: true, direction: AVATAR_DIRECTION });

    const webId = info?.webId ?? -1;

    // `handleGetUserInfoMessage`: every selection asks again, so the badges are current.
    useEffect(() => {
        if (webId < 0) return;

        requestUserDetails(send, webId);
    }, [ webId, send ]);

    if (!info) return null;

    // Which object's motto is being edited: selecting someone else simply stops matching.
    const isEditingMotto = editingObjectId === objectData.objectId;
    const canEditMotto = info.isOwnUser && mottoChangeEnabled;
    const mottoPrompt = t('infostand.motto.change');

    const submitMotto = () => {
        if (motto.length > mottoMaxLength) return;

        send(new ChangeMottoComposer({ text: motto }));
        setEditingObjectId(undefined);
    };

    // `onMottoKeyboard`: Enter sends the motto unless one went less than 2 seconds ago, or it is the prompt.
    const enterMotto = () => {
        const now = Date.now();

        if (((now - lastMottoSent.current) <= MOTTO_SEND_INTERVAL) || (motto === mottoPrompt)) return;

        lastMottoSent.current = now;
        submitMotto();
    };

    // `onMottoClicked`: the prompt is cleared for typing.
    const startEditingMotto = () => {
        if (!canEditMotto || isEditingMotto) return;

        setMotto(info.motto);
        setEditingObjectId(objectData.objectId);
    };

    const badgeInSlot = (slot: number) => info.badges.find(badge => badge.badgeIndex === (slot + 1));
    const showsCrocodile = info.motto.toLowerCase().includes(CROCODILE_MOTTO);
    const carriesItem = isHandItem(info.carryItem);
    // `setMotto`: your own empty motto reads as the change prompt, in the edited colour.
    const showsMottoPrompt = info.isOwnUser && !info.motto.length;
    const showsBadgesRank = badgesRank >= 0;

    const bindings: TemplateBindings = {
        '#close': { onPointerTap: onClose },
        // `onButtonClicked`: `RWUAM_OPEN_HOME_PAGE`, the user's profile.
        home_icon: {
            onPointerTap: () => openProfile(send, info.webId),
            children: (
                <ThemeImage
                    src={LayoutImage('habbo-room-ui-com/icon_home.png')}
                    bitmap={{ stretchedX: false, stretchedY: false }}
                    eventMode="none"
                    layout={{ position: 'absolute', left: 0, top: 0, width: 16, height: 15 }}
                />
            ),
        },
        sticker_croco: { visible: showsCrocodile },
        // `onProfileLink`: a click opens the profile; over and out colour the name.
        profile_link: {
            onPointerTap: () => openProfile(send, info.webId),
            onPointerOver: () => setNameHovered(true),
            onPointerOut: () => setNameHovered(false),
        },
        name_text: { caption: info.name, color: nameHovered ? NAME_HOVER_COLOR : NAME_COLOR },
        avatar_image_profile_link: { onPointerTap: () => openProfile(send, info.webId) },
        avatar_image: {
            visible: !showsCrocodile,
            children: avatar.texture && (
                <pixiSprite
                    texture={avatar.texture}
                    eventMode="none"
                    layout={{ position: 'absolute', left: 0, top: 0, width: avatar.width, height: avatar.height }}
                />
            ),
        },
        badge_group: {
            children: (
                <InfostandBadgeView
                    code={info.groupBadge}
                    group
                    groupName={info.groupName}
                    // `selectGroupBadge`: `HabboGroupsManager.showGroupBadgeInfo`, the group's own window.
                    onPress={info.groupId ? () => showGroupBadgeInfo(send, info.groupId) : undefined}
                    layout={{ position: 'absolute', left: 0, top: 0 }}
                />
            ),
        },
        // `setMotto`: the pen and an enabled field for your own motto only.
        'changemotto.image': { visible: info.isOwnUser, onPointerTap: startEditingMotto },
        motto_text: {
            caption: isEditingMotto ? motto : (showsMottoPrompt ? mottoPrompt : info.motto),
            color: (isEditingMotto || showsMottoPrompt) ? MOTTO_EDITED_COLOR : MOTTO_COLOR,
            disabled: !canEditMotto,
            focused: isEditingMotto,
            onFocus: startEditingMotto,
            onChange: setMotto,
            // `word_wrap` without `multiline`: the field wraps, and Enter is a key, not a line break.
            onEnter: enterMotto,
            onBlur: () => {
                if (isEditingMotto) submitMotto();
            },
        },
        badges_rank_spacer: { visible: showsBadgesRank },
        // `onBadgesRankClicked`: the badge leaderboard.
        badges_rank_region: { visible: showsBadgesRank, onPointerTap: () => openClientLink(send, BADGE_LEADERBOARD_LINK) },
        badges_rank_text: { caption: t('infostand.text.badges_rank', '', { rank: `#${badgesRank}` }) },
        score_spacer: { visible: activityDisplayEnabled },
        score_text: { visible: activityDisplayEnabled },
        score_value: { visible: activityDisplayEnabled, caption: String(info.achievementScore) },
        handitem_spacer: { visible: carriesItem },
        handitem_txt: {
            visible: carriesItem,
            caption: carriesItem ? t('infostand.text.handitem', '', { item: t(`handitem${info.carryItem}`, `handitem${info.carryItem}`) }) : undefined,
        },
        relationship_status_container: { visible: relationshipsEnabled },
    };

    // `setBadge`: the slot's badge, cleared (`clearBadges`) when there is none.
    for (const slot of BADGE_SLOTS) {
        const selected = badgeInSlot(slot);

        bindings[`badge_${slot}`] = {
            children: (
                <InfostandBadgeView
                    code={selected?.badgeCode}
                    ownerCount={selected?.ownerCount}
                    rarityId={selected?.badgeRarityId}
                    layout={{ position: 'absolute', left: 0, top: 0 }}
                />
            ),
        };
    }

    // `setRelationshipStatuses`: a row for each status with friends, its random friend a link to their
    // profile, and how many others there are.
    for (const { type, name } of RELATIONSHIP_ROWS) {
        const relationship = info.relationships.find(entry => entry.relationshipStatusType === type);
        const shown = !!relationship && (relationship.friendCount > 0);

        bindings[`relationship_${name}`] = { visible: shown };

        if (!relationship) continue;

        bindings[`${name}_randomusername`] = { caption: relationship.randomFriendName, onPointerTap: () => openProfile(send, relationship.randomFriendId) };
        bindings[`${name}_others`] = {
            visible: relationship.friendCount > 1,
            caption: t(`infostand.relstatus.${name}.others`, '', { amount: String(relationship.friendCount - 1) }),
        };
    }

    const arrange = ({ find, root }: TemplateWindows) => {
        // `AvatarImageWidget.refresh`: the widget takes its bitmap's size, and its centring params re-centre it.
        const avatarImage = find('avatar_image');

        if (avatarImage && avatar.texture) avatarImage.setRectangle(avatarImage.x, avatarImage.y, avatar.width, avatar.height);

        // `setMotto` / `onMottoKeyboard`: the field `textHeight + 5` high within 23-50, its container 3 higher.
        const mottoText = find('motto_text');
        const mottoContainer = find('motto_container');

        if (mottoText && mottoContainer) {
            mottoText.setHeight(Math.max(Math.min(mottoText.textHeight + 5, MAX_MOTTO_HEIGHT), MIN_MOTTO_HEIGHT));
            mottoContainer.setHeight(mottoText.height + 3);
        }

        // `carryItem`: the text `textHeight + 5` high.
        const handItem = find('handitem_txt');

        if (handItem) handItem.setHeight(handItem.textHeight + 5);

        // `updateWindow`: the border the element list's height plus 20, the window the border's size.
        const list = find('infostand_element_list');
        const border = find('info_border');
        const view = root();

        if (!list || !border || !view) return;

        border.setHeight(list.height + 20);
        view.setWidth(border.width);
        view.setHeight(border.height);
    };

    return (
        <TemplateWindow
            id="habbo-room-ui-com/user_view"
            bindings={bindings}
            arrange={arrange}
        />
    );
};
