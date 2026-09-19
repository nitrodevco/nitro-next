import { RateFlatComposer, SetUIFlagsComposer } from '@nitrodevco/nitro-packets';
import { useEffect, useState } from 'react';

import { forwardToRoom, searchRoomTag } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useNavigatorActions, useNavigatorStore } from '#base/context/navigator';
import { useConfigValue, useTranslation, useWindowActions } from '#base/context/system';
import { UiFlagEnum, useRoomToolsCollapsed, useUserActions } from '#base/context/user';
import { useRoomZoom } from '#base/hooks';
import { LayoutImage } from '#base/theme';
import { RoomShareView } from '#base/views/room-widgets/room-tools/RoomShareView';
import { ROOM_TOOLS_INFO_MARGIN, roomToolsRight } from '#base/views/room-widgets/room-tools/roomToolsGeometry';
import { RoomToolsHistoryView } from '#base/views/room-widgets/room-tools/RoomToolsHistoryView';
import { RoomToolsInfoView } from '#base/views/room-widgets/room-tools/RoomToolsInfoView';
import { RoomToolsButton, RoomToolsView } from '#base/views/room-widgets/room-tools/RoomToolsView';

/** `RoomToolsCtrlBase`'s default for `room.enter.info.collapse.delay`. */
const DEFAULT_INFO_COLLAPSE_DELAY = 5000;

/** `RateFlatMessageComposer(1)` - the like button only ever adds one. */
const LIKE_POINTS = 1;

/**
 * The room tools: the column in the bottom-left corner, the card that names the room on the way
 * in, the visit-history list, and the share panel.
 *
 * Whether the column is open is an account preference rather than a client one - Flash kept it in
 * bit 2 of the session's `uiFlags` - so opening or closing it tells the server.
 */
export const RoomToolsWidget = () => {
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const currentRoomInfo = useNavigatorStore(x => x.enteredRoom?.info);
    const roomVisitHistory = useNavigatorStore(x => x.roomVisitHistory);
    const roomVisitIndex = useNavigatorStore(x => x.roomVisitIndex);
    const canRateCurrentRoom = useNavigatorStore(x => x.canRateCurrentRoom);
    const collapsed = useRoomToolsCollapsed();
    const { setUiFlag } = useUserActions();
    const { stepRoomVisitHistory, setRoomRating } = useNavigatorActions();
    const { toggleWindow } = useWindowActions();
    const { level, canZoomIn, canZoomOut, zoomIn, zoomOut } = useRoomZoom();

    const infoEnabled = useConfigValue<boolean>('room.enter.info.enabled') ?? true;
    const infoDelay = useConfigValue<number>('room.enter.info.collapse.delay') ?? DEFAULT_INFO_COLLAPSE_DELAY;
    const urlPrefix = useConfigValue<string>('url.prefix') ?? '';
    const thumbnailUrlBase = useConfigValue<string>('navigator.thumbnail.url_base') ?? '';
    const userHash = useConfigValue<string>('user.hash') ?? '';

    const [ historyOpen, setHistoryOpen ] = useState(false);
    const [ shareOpen, setShareOpen ] = useState(false);
    const [ info, setInfo ] = useState({ roomId: 0, visible: false });

    const roomId = currentRoomInfo?.roomId ?? 0;

    // A different room is a different card, and it starts out showing.
    if (roomId !== info.roomId) setInfo({ roomId, visible: infoEnabled && !!roomId });

    /*
     * The card announces the room on the way in and slides away again by itself, on Flash's
     * `collapseAfterDelay` timer.
     */
    useEffect(() => {
        if (!info.visible) return;

        const timer = setTimeout(() => setInfo(previous => ({ ...previous, visible: false })), infoDelay);

        return () => {
            clearTimeout(timer);
        };
    }, [ info.visible, info.roomId, infoDelay ]);

    const toggleCollapsed = () => {
        setHistoryOpen(false);
        send(new SetUIFlagsComposer({ flags: setUiFlag(UiFlagEnum.RoomToolsExpanded, collapsed) }));
    };

    const goTo = (direction: -1 | 1) => {
        const entry = stepRoomVisitHistory(direction);

        if (entry) forwardToRoom(send, entry.roomId);
    };

    const likeRoom = () => {
        send(new RateFlatComposer({ points: LIKE_POINTS }));
        // The server does not answer a like, so the button is retired here.
        setRoomRating(0, false);
    };

    const embedCode = t('navigator.embed.src', '', {
        roomType: 'private',
        roomId: String(roomId),
        embedCode: userHash,
    });
    const directLink = `${urlPrefix}/room/${roomId}`;

    const buttons: RoomToolsButton[] = [
        {
            key: 'button_settings',
            icon: LayoutImage('roomtools_gear.png'),
            labelKey: 'room.settings.button.text',
            tooltipKey: 'room.settings.button.tooltip',
            // `RoomToolsWidgetHandler.toggleRoomInfoWindow`.
            onPress: () => toggleWindow('room_info'),
        },
    ];

    if (canRateCurrentRoom) buttons.push({
        key: 'button_like',
        icon: LayoutImage('roomtools_like.png'),
        labelKey: 'room.like.button.text',
        tooltipKey: 'room.like.button.tooltip',
        onPress: likeRoom,
    });

    buttons.push({
        key: 'button_share',
        icon: LayoutImage('navigation_icon_weblink.png'),
        labelKey: 'navigator.embed.caption',
        onPress: () => {
            // Flash put the snippet on the clipboard as it opened the panel.
            if (!shareOpen) void navigator.clipboard?.writeText(embedCode).catch(() => undefined);

            setShareOpen(prev => !prev);
        },
    });

    // The history list drops the repeats, so a room visited twice appears once.
    const historyEntries = roomVisitHistory.filter((entry, index) =>
        roomVisitHistory.findIndex(other => other.roomId === entry.roomId) === index);

    return (
        <>
            <RoomToolsView
                buttons={buttons}
                zoomLevel={level}
                canZoomIn={canZoomIn}
                canZoomOut={canZoomOut}
                onZoomIn={zoomIn}
                onZoomOut={zoomOut}
                canGoBack={roomVisitIndex > 0}
                canGoForward={(roomVisitIndex >= 0) && (roomVisitIndex < roomVisitHistory.length - 1)}
                canOpenHistory={historyEntries.length > 1}
                onGoBack={() => goTo(-1)}
                onGoForward={() => goTo(1)}
                onToggleHistory={() => setHistoryOpen(prev => !prev)}
                collapsed={collapsed}
                onToggleCollapsed={toggleCollapsed}
                history={historyOpen && (
                    <RoomToolsHistoryView
                        entries={historyEntries}
                        onSelect={(selectedRoomId) => {
                            setHistoryOpen(false);
                            forwardToRoom(send, selectedRoomId);
                        }}
                    />
                )}
            />
            {info.visible && currentRoomInfo && (
                <RoomToolsInfoView
                    roomName={currentRoomInfo.name}
                    ownerLine={currentRoomInfo.showOwner
                        ? `${t('room.tool.room.owner.prefix', 'By')} ${currentRoomInfo.ownerName}`
                        : t('room.tool.public.room', 'Public room')}
                    tags={currentRoomInfo.tags}
                    left={roomToolsRight(collapsed) + ROOM_TOOLS_INFO_MARGIN}
                    onSelectTag={tag => searchRoomTag(send, tag)}
                    onPress={() => setInfo(previous => ({ ...previous, visible: false }))}
                />
            )}
            {shareOpen && (
                <RoomShareView
                    embedCode={embedCode}
                    directLink={directLink}
                    thumbnailUrl={thumbnailUrlBase.length ? `${thumbnailUrlBase}${roomId}.png` : ''}
                    onClose={() => setShareOpen(false)}
                />
            )}
        </>
    );
};
