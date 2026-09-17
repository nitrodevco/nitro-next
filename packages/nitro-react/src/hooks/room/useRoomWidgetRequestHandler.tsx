import { NitroLogger, RoomObjectVariableEnum, RoomObjectWidgetRequestEvent, RoomWidgetEnum } from '@nitrodevco/nitro-api';
import { GetCraftableProductsComposer, GetGuestRoomComposer, GetGuildFurniContextMenuInfoComposer, GetJukeboxPlayListComposer, GetNowPlayingComposer, GetResolutionAchievementsComposer, GetUserSongDisksComposer, GetYoutubeDisplayStatusComposer, RentableSpaceStatusComposer, UseFurnitureComposer } from '@nitrodevco/nitro-packets';

import { readFurnitureLink } from '#base/components/room/widgets/furniture/furnitureWidgetData';
import { useWebSocketContext } from '#base/context/communication';
import { useRoom, useRoomWidgetActions } from '#base/context/room';

/**
 * The bridge between a room object asking for its dialog and the UI opening it - the Flash
 * client's `RoomObjectEventHandler.handleRoomObjectWidgetRequestEvent`.
 *
 * About twenty-five furniture logics already dispatch these: `FurnitureLogic` sends
 * `OPEN_FURNI_CONTEXT_MENU` when the object is selected, `OPEN_WIDGET` from `useObject()` and
 * `CLOSE_WIDGET` when it tears down, and each specialised logic sends its own constant. Every
 * one of them lands here, is turned into room-store state, and is picked up by the widget that
 * declares that type.
 *
 * Two of them carry their name on the logic rather than in the event, exactly as Flash did:
 * `OPEN_WIDGET` reads `logic.widget` (a `RoomWidgetEnum` value) and the context menu reads
 * `logic.contextMenu` (a `ContextMenuEnum` value).
 */
export const useRoomWidgetRequestHandler = () => {
    const room = useRoom();
    const { openRoomWidget, closeRoomWidget, closeRoomWidgetsForObject, setFurnitureContextMenu } = useRoomWidgetActions();
    const { send } = useWebSocketContext();

    const handleRoomWidgetRequestEvent = (event: RoomObjectWidgetRequestEvent) => {
        if (!room) return;

        const category = room.getRoomObjectCategoryForType(event.objectType);
        const request = { type: event.type, objectId: event.objectId, category, objectType: event.objectType };

        switch (event.type) {
            // Tear-down doesn't say which widget it meant, so everything aimed at the object goes.
            case RoomObjectWidgetRequestEvent.CLOSE_WIDGET:
                closeRoomWidgetsForObject(event.objectId, category);
                return;
            case RoomObjectWidgetRequestEvent.OPEN_WIDGET: {
                const widget = room.getRoomObject(event.objectId, category)?.logic?.widget;

                if (!widget) return;

                openRoomWidget({ ...request, type: widget });

                // Neither of these keeps what it needs on the furni; the server has it.
                if (widget === RoomWidgetEnum.RENTABLESPACE) send(new RentableSpaceStatusComposer({ objectId: event.objectId }));

                if (widget === RoomWidgetEnum.CRAFTING) send(new GetCraftableProductsComposer({ objectId: event.objectId }));

                return;
            }
            case RoomObjectWidgetRequestEvent.OPEN_FURNI_CONTEXT_MENU: {
                const menu = room.getRoomObject(event.objectId, category)?.logic?.contextMenu;

                if (!menu) return;

                setFurnitureContextMenu({ menu, objectId: event.objectId, category });
                return;
            }
            case RoomObjectWidgetRequestEvent.CLOSE_FURNI_CONTEXT_MENU:
                setFurnitureContextMenu(undefined);
                return;
            // A dimmer asking to be taken down is a close, not an open.
            case RoomObjectWidgetRequestEvent.WIDGET_REMOVE_DIMMER:
                closeRoomWidget(RoomObjectWidgetRequestEvent.DIMMER);
                return;
            /*
             * A scoreboard leaves its display state, so it wants its board gone. Flash checked
             * the board on screen belonged to this furni before closing it, which closing by
             * object does here.
             */
            case RoomObjectWidgetRequestEvent.HIDE_HIGH_SCORE_DISPLAY:
                closeRoomWidgetsForObject(event.objectId, category);
                return;
            /*
             * The four below ask the server something instead of opening anything themselves,
             * which is how `RoomObjectEventHandler` treated them: the dialog, if there is one,
             * comes back with the answer.
             */
            case RoomObjectWidgetRequestEvent.ACHIEVEMENT_RESOLUTION_OPEN:
                // 0: whichever achievement the trophy is already set to.
                send(new GetResolutionAchievementsComposer({ objectId: event.objectId, selectedAchievementId: 0 }));
                return;
            case RoomObjectWidgetRequestEvent.GUILD_FURNI_CONTEXT_MENU: {
                const guildId = room.getRoomObject(event.objectId, category)
                    ?.model.getValue<number>(RoomObjectVariableEnum.FurnitureGuildCustomizedGuildId);

                send(new GetGuildFurniContextMenuInfoComposer({ objectId: event.objectId, guildId: guildId ?? 0 }));
                openRoomWidget(request);
                return;
            }
            /*
             * The jukebox editor needs three separate answers before it can show anything: what
             * is in the machine, what you own, and what is playing right now.
             */
            case RoomObjectWidgetRequestEvent.JUKEBOX_PLAYLIST_EDITOR:
                send(new GetJukeboxPlayListComposer({}));
                send(new GetUserSongDisksComposer({}));
                send(new GetNowPlayingComposer({}));
                openRoomWidget(request);
                return;
            // A video display is asked what it can play and what it is playing.
            case RoomObjectWidgetRequestEvent.YOUTUBE:
                send(new GetYoutubeDisplayStatusComposer({ objectId: event.objectId }));
                openRoomWidget(request);
                return;
            // A mystery box only starts a wait; the dialog appears when the server says it has.
            case RoomObjectWidgetRequestEvent.MYSTERYBOX_OPEN_DIALOG:
                send(new UseFurnitureComposer({ objectId: event.objectId, param: 0 }));
                openRoomWidget(request);
                return;
            case RoomObjectWidgetRequestEvent.ROOM_LINK: {
                const roomObject = room.getRoomObject(event.objectId, category);
                const roomId = parseInt(roomObject ? (readFurnitureLink(roomObject) ?? '') : '', 10);

                if (isNaN(roomId)) return;

                send(new GetGuestRoomComposer({ roomId, enterRoom: false, roomForward: false }));
                openRoomWidget(request);
                return;
            }
            /*
             * An internal link is not a dialog at all - it is wherever the furni points, which
             * Flash handed to the client's link bus. The port has no such bus, so the only link
             * it can follow itself is one naming a room, and anything else is logged rather
             * than silently swallowed.
             */
            case RoomObjectWidgetRequestEvent.INERNAL_LINK: {
                const roomObject = room.getRoomObject(event.objectId, category);
                const link = roomObject ? readFurnitureLink(roomObject) : undefined;

                if (!link) return;

                NitroLogger.events('RoomWidgetRequest', event.type, link);
                return;
            }
            default:
                // Opened by type, so a widget component that declares this type picks it up with
                // no change here. One that nothing renders sits in the store until the object
                // tears down, which is why the request is worth seeing while tracing.
                NitroLogger.events('RoomWidgetRequest', event.type, event.objectId);
                openRoomWidget(request);
        }
    };

    return { handleRoomWidgetRequestEvent };
};
