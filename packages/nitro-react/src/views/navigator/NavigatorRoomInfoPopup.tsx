/**
 * The room info bubble the navigator's blue info button opens - `RoomInfoPopup.as` over the
 * `habbo-new-navigator/room_info_popup_bubble_xml` window template, with a `property_xml` per room
 * property in `properties` (`addProperty`) and `tag_xml`'s `tag_region` per tag in `tag_list`
 * (`getNewTagItem`).
 *
 * `populate()` decides what shows:
 * - the owner link when the room shows its owner (`showOwner`), the group link, the group's badge
 *   over the thumbnail and its mode icons when it has a group (`groupBadgeCode != ""`); the row
 *   holding both links only when one of them shows. The mode icons come from the cached group
 *   details (`getCachedGroupDetails`): owner or admin, the group type, and the decorate icon when
 *   members may decorate;
 * - the event box while a room ad runs (`roomAdExpiresInMin > 0`), with its time left as
 *   `FriendlyTime.getFriendlyTime`;
 * - the properties: trading (`RoomTradingLevelEnum.getLocalizationKey`), the ranking only with
 *   `room.ranking.enabled`, and the user limit;
 * - the thumbnail: `newnavigator_default_room`, or with the `NAVIGATOR_ROOM_THUMBNAIL_CAMERA` perk
 *   the room's official picture (`image.library.url`, or `navigator.thumbnail.url_base` +
 *   `<flatId>.png` under `new.navigator.official.room.thumbnails.in.amazon`) or its camera
 *   thumbnail (`navigator.thumbnail.url_base` + `<flatId>.png`);
 * - the settings entry only in the user's own room (`ownerName == sessionData.userName`).
 *
 * The favourite toggle adds and removes, the home toggle only ever sets, and both keep the answer
 * locally until the server's says otherwise (`roomIsFavorite` / `roomIsHome` over
 * `legacyNavigator`) - the favourite for as long as the bubble shows this room, the home until
 * `NavigatorSettingsMessage` names a home room (`refreshHomeState`). Every other link closes the
 * bubble (`destroy()`): the owner's profile, the group's info, a tag search, the room settings.
 *
 * `NavigatorView.update` closes it once it has been up for 4 s, on the first second-tick the mouse
 * is not over it; there is no outside-click close.
 *
 * - the report entry (`report_container` / `report_region`) under `room.report.enabled` and not in
 *   the user's own room: `reportRegionProcedure` reports the room (`habboHelp.reportRoom`) and
 *   closes the popup.
 *
 * Not ported: the `browse.openroominfo` event log `showAt` tracks.
 */
import { RoomTradeModeEnum } from '@nitrodevco/nitro-api';
import { AddFavouriteRoomComposer, DeleteFavouriteRoomComposer, IRoomInfo, UpdateHomeRoomComposer } from '@nitrodevco/nitro-packets';
import { GetRenderer } from '@nitrodevco/nitro-renderer';
import { Container as PixiContainer } from 'pixi.js';
import { RefObject, useEffect, useRef, useState } from 'react';

import { openGroupInfo, openProfile, searchRoomTag } from '#base/commands';
import { reportRoom } from '#base/commands/helpCommands';
import { useWebSocketContext } from '#base/context/communication';
import { useGroupStore } from '#base/context/groups';
import { useNavigatorStore } from '#base/context/navigator';
import { useConfigValue, useHomeRoomId, useTranslation, useWindowActions } from '#base/context/system';
import { PerkCodes, useOwnPerkAllowed, useUserStore } from '#base/context/user';
import { Box, findTemplateChild, FloatingPopup, TemplateBindings, TemplateItem, TemplateWindow, useLayoutSize, useTemplate } from '#base/theme';
import { GetFriendlyTime } from '#base/utils';

/**
 * `room_info_popup_bubble`'s layout height: `showAt` centres the bubble on `y` by half its height once
 * `populate()` has fitted it to what it shows - this until the bubble has been laid out.
 */
const POPUP_HEIGHT = 350;

/** `NavigatorView.showRoomInfoBubbleAt` sets the close countdown to 4000; `update` runs every 1000 ms. */
const POPUP_CLOSE_DELAY_MS = 4000;
const POPUP_UPDATE_INTERVAL_MS = 1000;

/** `RoomTradingLevelEnum.getLocalizationKey` - an unknown level has no text. Held to the Flash switch by `drift/constants.py`. */
const TRADING_LEVEL_KEYS: Record<number, string> = {
    [RoomTradeModeEnum.Disabled]: 'trading.mode.not.allowed',
    [RoomTradeModeEnum.RoomOwnerAndRights]: 'trading.mode.controller',
    [RoomTradeModeEnum.Everyone]: 'trading.mode.free',
};

export interface NavigatorRoomInfoPopupProps {
    room: IRoomInfo;
    /** `showAt(true, x, y)`: the pointer's side of the bubble, and the height it is centred on - screen coordinates. */
    x: number;
    y: number;
    /** Changes with every `showRoomInfoBubbleAt`, which restarts the close countdown. */
    serial: number;
    onClose: () => void;
}

/**
 * `NavigatorView.update`: once the countdown has run out, the first tick the mouse is outside the
 * bubble closes it. The mouse is tracked from here; before it moves it is where it was when the
 * info button was pressed, which is outside the bubble.
 */
const useCloseWhenMouseLeaves = (bubble: RefObject<PixiContainer | null>, serial: number, onClose: () => void) => {
    const onCloseRef = useRef(onClose);

    useEffect(() => {
        onCloseRef.current = onClose;
    }, [ onClose ]);

    useEffect(() => {
        let remaining = POPUP_CLOSE_DELAY_MS;
        let pointer: { x: number; y: number } | undefined;

        const onPointerMove = (event: PointerEvent) => {
            const canvas = GetRenderer().canvas;

            if (!canvas) return;

            const rect = canvas.getBoundingClientRect();

            pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
        };

        const interval = window.setInterval(() => {
            remaining -= POPUP_UPDATE_INTERVAL_MS;

            if (remaining >= 0) return;

            const node = bubble.current;

            if (node && pointer && node.getBounds().containsPoint(pointer.x, pointer.y)) return;

            onCloseRef.current();
        }, POPUP_UPDATE_INTERVAL_MS);

        window.addEventListener('pointermove', onPointerMove);

        return () => {
            window.clearInterval(interval);
            window.removeEventListener('pointermove', onPointerMove);
        };
    }, [ bubble, serial ]);
};

export const NavigatorRoomInfoPopup = ({ room, x, y, serial, onClose }: NavigatorRoomInfoPopupProps) => {
    const bubbleRef = useRef<PixiContainer | null>(null);
    // The node as state as well, for its laid-out size: a ref cannot be read while rendering.
    const [ bubbleNode, setBubbleNode ] = useState<PixiContainer | null>(null);
    const bubbleSize = useLayoutSize(bubbleNode);
    const propertyTemplate = useTemplate('habbo-new-navigator/property_xml');
    const tagTemplate = useTemplate('habbo-new-navigator/tag_xml');
    const favouriteRoomIds = useNavigatorStore(x => x.favouriteRoomIds);
    const thumbnailCameraAllowed = useOwnPerkAllowed(PerkCodes.NavigatorRoomThumbnailCamera);
    const homeRoomId = useHomeRoomId();
    const userName = useUserStore(x => x.name);
    const groupDetails = useGroupStore(x => ((room.groupId > 0) ? x.detailsById[room.groupId] : undefined));
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';
    const thumbnailUrlBase = useConfigValue<string>('navigator.thumbnail.url_base') ?? '';
    const groupBadgeUrl = useConfigValue<string>('badge.asset.group.url') ?? '';
    const rankingEnabled = useConfigValue<boolean>('room.ranking.enabled') === true;
    const roomReportEnabled = useConfigValue<boolean>('room.report.enabled') === true;
    const officialThumbnailsInAmazon = useConfigValue<boolean>('new.navigator.official.room.thumbnails.in.amazon') === true;
    const { showWindow } = useWindowActions();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    // `roomIsFavorite` / `roomIsHome` set by the toggles; `setData` of another room drops both.
    // The bubble stays mounted across rooms, as Flash reuses its window, so its laid-out height
    // carries over and it does not rebuild and flash on every row hovered.
    const [ favouriteOverride, setFavouriteOverride ] = useState<boolean>();
    // `refreshHomeState` drops the home answer when `NavigatorSettingsMessage` lands: kept only while the home room it was set over is still the one the store has.
    const [ homeOverride, setHomeOverride ] = useState<{ isHome: boolean; over: number }>();
    const [ overridesRoomId, setOverridesRoomId ] = useState(room.roomId);

    if (overridesRoomId !== room.roomId) {
        setOverridesRoomId(room.roomId);
        setFavouriteOverride(undefined);
        setHomeOverride(undefined);
    }

    useCloseWhenMouseLeaves(bubbleRef, serial, onClose);

    const isFavourite = favouriteOverride ?? favouriteRoomIds.includes(room.roomId);
    const isHome = ((homeOverride?.over === homeRoomId) ? homeOverride.isHome : undefined) ?? (homeRoomId === room.roomId);
    const hasGroup = room.groupBadge !== '';
    const isOwnRoom = room.ownerName === userName;
    const hasEvent = room.adExpiresIn > 0;

    let thumbnail = 'habbo-window-manager-com-newnavigator_default_room';

    if (thumbnailCameraAllowed) {
        thumbnail = (room.officialRoomPicRef.length && !officialThumbnailsInAmazon)
            ? `${imageLibraryUrl}${room.officialRoomPicRef}`
            : `${thumbnailUrlBase}${room.roomId}.png`;
    }

    let groupModeAdmin = '';

    if (groupDetails?.isOwner) groupModeAdmin = 'habbo-window-manager-com-newnavigator_icon_group_owner';
    else if (groupDetails?.isAdmin) groupModeAdmin = 'habbo-window-manager-com-newnavigator_icon_group_admin';

    const properties: { name: string; value: string }[] = [
        { name: '${navigator.roompopup.property.trading}', value: TRADING_LEVEL_KEYS[room.tradeType] ? t(TRADING_LEVEL_KEYS[room.tradeType]) : '' },
    ];

    if (rankingEnabled) properties.push({ name: '${navigator.roompopup.property.ranking}', value: String(room.ranking) });

    properties.push({ name: '${navigator.roompopup.property.max_users}', value: String(room.playersMax) });

    const tagRegion = tagTemplate && findTemplateChild(tagTemplate.elements, 'tag_region');

    const toggleFavourite = () => {
        send(isFavourite
            ? new DeleteFavouriteRoomComposer({ roomId: room.roomId })
            : new AddFavouriteRoomComposer({ roomId: room.roomId }));

        setFavouriteOverride(!isFavourite);
    };

    const makeHome = () => {
        if (isHome) return;

        send(new UpdateHomeRoomComposer({ roomId: room.roomId }));
        setHomeOverride({ isHome: true, over: homeRoomId });
    };

    const bindings: TemplateBindings = {
        room_name: { caption: room.name },
        room_desc: { caption: room.description },
        room_thumbnail: { asset: thumbnail },
        room_group_badge: hasGroup ? { visible: true, asset: groupBadgeUrl.replace('%badgedata%', room.groupBadge) } : { visible: false },

        room_group_owner_container: { visible: hasGroup || room.showOwner },
        room_owner_region: {
            visible: room.showOwner,
            onPointerTap: () => {
                openProfile(send, room.ownerId);
                onClose();
            },
        },
        owner_name: { caption: room.ownerName },
        room_group_region: {
            visible: hasGroup,
            onPointerTap: () => {
                openGroupInfo(send, room.groupId);
                onClose();
            },
        },
        group_name: { caption: room.groupName },

        properties: {
            items: propertyTemplate
                ? properties.map(property => ({
                        key: property.name,
                        from: propertyTemplate,
                        bindings: { property_name: { caption: property.name }, property_value: { caption: property.value } },
                    }))
                : [],
        },

        favorite_region: { onPointerTap: toggleFavourite },
        favorite_icon: { asset: `habbo-window-manager-com-newnavigator_icon_fav_${isFavourite ? 'yes' : 'no'}` },
        home_region: { onPointerTap: makeHome },
        home_icon: { asset: `habbo-window-manager-com-newnavigator_icon_home_${isHome ? 'yes' : 'no'}` },
        settings_container: { visible: isOwnRoom },
        settings_region: {
            onPointerTap: () => {
                // `RoomSettingsCtrl.startRoomSettingsEditFromNavigator(flatId, habboGroupId)`;
                // the parser's -1 for "no group" is Flash's 0.
                showWindow('room_settings', { roomId: room.roomId, groupId: Math.max(0, room.groupId) });
                onClose();
            },
        },
        report_container: { visible: roomReportEnabled && !isOwnRoom },
        report_region: {
            visible: roomReportEnabled && !isOwnRoom,
            onPointerTap: () => {
                reportRoom(room.roomId, room.name);
                onClose();
            },
        },

        tag_list: {
            items: tagRegion
                ? room.tags.map((tag, index): TemplateItem => ({
                        key: `${index}:${tag}`,
                        from: tagRegion,
                        bindings: {
                            tag_region: {
                                onPointerTap: () => {
                                    searchRoomTag(send, tag);
                                    onClose();
                                },
                            },
                            tag_text: { caption: `#${tag}` },
                        },
                    }))
                : [],
        },
        group_mode_admin: { asset: hasGroup ? groupModeAdmin : '' },
        group_mode_size: { asset: (hasGroup && groupDetails) ? `\${image.library.url}guilds/grouptype_icon_${groupDetails.type}.png` : '' },
        group_mode_furnish: { asset: (hasGroup && groupDetails?.membersCanDecorate) ? '${image.library.url}guilds/group_decorate_icon.png' : '' },

        event_info: { visible: hasEvent },
        event_name: { caption: `${t('navigator.eventsettings.name')}: ${room.adName}` },
        event_desc: { caption: `${t('navigator.eventsettings.desc')}: ${room.adDescription}\n${t('roomad.event.expiration_time')}${GetFriendlyTime(t, room.adExpiresIn * 60)}` },
    };

    return (
        <FloatingPopup
            x={x}
            y={Math.trunc(y - ((bubbleSize.height || POPUP_HEIGHT) / 2))}
            // Flash has no outside-click close: the countdown closes it, and the info button toggles it.
            onOutsideClick={() => undefined}
        >
            <Box
                ref={(node: PixiContainer | null) => {
                    bubbleRef.current = node;
                    setBubbleNode(node);
                }}
                // A laid-out box, so it reports the bubble's height as Yoga settles it.
                layout={{ flexDirection: 'column' }}
            >
                <TemplateWindow
                    id="habbo-new-navigator/room_info_popup_bubble_xml"
                    bindings={bindings}
                />
            </Box>
        </FloatingPopup>
    );
};
