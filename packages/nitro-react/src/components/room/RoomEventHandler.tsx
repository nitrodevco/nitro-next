import { ColorConverter, IRoomObject, MouseEventType, NitroLogger, RoomEngineObjectEvent, RoomObjectBadgeAssetEvent, RoomObjectCategoryEnum, RoomObjectDataRequestEvent, RoomObjectDimmerStateUpdateEvent, RoomObjectEvent, RoomObjectFurnitureActionEvent, RoomObjectHSLColorEnableEvent, RoomObjectMouseEvent, RoomObjectMoveEvent, RoomObjectStateChangedEvent, RoomObjectVariableEnum, RoomObjectWidgetRequestEvent, RoomSpriteMouseEvent, RoomWidgetUpdateRoomObjectEvent } from '@nitrodevco/nitro-api';
import { RoomObjectUpdateMessage } from '@nitrodevco/nitro-renderer';
import { useEffect } from 'react';

import { useWebSocketContext } from '#base/context/communication';
import { useRoom, useRoomIsPlayingGame, useRoomMouseActions } from '#base/context/room';
import { useConfigValue } from '#base/context/system';
import { useOwnIsModerator, useOwnUserId } from '#base/context/user';
import { useRoomBadgeAssetHandler, useRoomEventDispatcher, useRoomEventHandler, useRoomFurnitureActionHandler, useRoomObjectInteraction, useRoomObjectSelect, useRoomWidgetRequestHandler } from '#base/hooks';

import { SetRoomBackgroundColor } from './roomBackgroundColor';

export const RoomEventHandler = () => {
    const room = useRoom();
    const isModerator = useOwnIsModerator();
    const isPlayingGame = useRoomIsPlayingGame();
    const { getMouseEventId, setMouseEventId } = useRoomMouseActions();
    const { handleRoomObjectMouseEvent } = useRoomEventHandler();
    const { changeItemState } = useRoomObjectInteraction();
    const { selectAvatar } = useRoomObjectSelect();
    const { handleRoomWidgetRequestEvent } = useRoomWidgetRequestHandler();
    const { handleBadgeAssetEvent } = useRoomBadgeAssetHandler();
    const { handleFurnitureActionEvent } = useRoomFurnitureActionHandler();
    const ownUserId = useOwnUserId();
    const urlPrefix = useConfigValue<string>('url.prefix') ?? '';
    const { send } = useWebSocketContext();

    const handleRoomObjectEvent = (event: RoomObjectEvent) => {
        if (!room) return;

        if (event instanceof RoomObjectMouseEvent) {
            handleRoomObjectMouseEvent(event);

            return;
        }

        if (event instanceof RoomObjectWidgetRequestEvent) {
            handleRoomWidgetRequestEvent(event);

            return;
        }

        if (event instanceof RoomObjectFurnitureActionEvent) {
            handleFurnitureActionEvent(event);

            return;
        }

        switch (event.type) {
            case RoomObjectStateChangedEvent.STATE_CHANGE: {
                changeItemState(event.objectId, room.getRoomObjectCategoryForType(event.objectType), (event as RoomObjectStateChangedEvent).state, false);
                return;
            }
            case RoomObjectStateChangedEvent.STATE_RANDOM: {
                changeItemState(event.objectId, room.getRoomObjectCategoryForType(event.objectType), (event as RoomObjectStateChangedEvent).state, true);
                return;
            }
            case RoomObjectMoveEvent.POSITION_CHANGED: {
                const roomObject = room.getRoomObject(event.objectId, room.getRoomObjectCategoryForType(event.objectType));

                if (!roomObject) return;

                room.getRoomObjectSelectionArrow()?.processUpdateMessage(new RoomObjectUpdateMessage(roomObject.getLocation(), undefined));
                return;
            }
            case RoomObjectMoveEvent.OBJECT_REMOVED: {
                selectAvatar(0, false);
                return;
            }
            case RoomObjectMoveEvent.SLIDE_ANIMATION: {
                room.updateRoomObjectMask(event.objectId);
                return;
            }
            case RoomObjectDimmerStateUpdateEvent.DIMMER_STATE: {
                // The dimmer telling the room what mood it is in. Applied here rather than in the
                // widget so the room is lit whether or not anyone has its dialog open.
                const dimmer = event as RoomObjectDimmerStateUpdateEvent;

                room.updateRoomObjectRoomColor(dimmer.color, dimmer.brightness, dimmer.effectId === 2);
                return;
            }
            case RoomObjectHSLColorEnableEvent.ROOM_BACKGROUND_COLOR: {
                // A background toner saying what the room should sit on. Like the dimmer, it is
                // applied here rather than in the widget, so the room is coloured for everyone
                // in it and not only for whoever has the dialog open.
                const hsl = event as RoomObjectHSLColorEnableEvent;

                SetRoomBackgroundColor(
                    hsl.enable
                        ? ColorConverter.hslToRGB(((hsl.hue & 0xFF) << 16) | ((hsl.saturation & 0xFF) << 8) | (hsl.lightness & 0xFF))
                        : undefined,
                );
                return;
            }
            /*
             * Two logics ask the client for something it alone knows, and keep asking on every
             * tick until the answer lands on their model - a rentable space cannot tell whether
             * you are its renter without your id, and a video display cannot build an asset url
             * without the prefix. `RoomObjectEventHandler.handleObjectDataRequestEvent` answered
             * both the same way.
             */
            case RoomObjectDataRequestEvent.RODRE_CURRENT_USER_ID: {
                room.getRoomObject(event.objectId, room.getRoomObjectCategoryForType(event.objectType))
                    ?.model.setValue(RoomObjectVariableEnum.SessionCurrentUserId, ownUserId);
                return;
            }
            case RoomObjectDataRequestEvent.RODRE_URL_PREFIX: {
                room.getRoomObject(event.objectId, room.getRoomObjectCategoryForType(event.objectType))
                    ?.model.setValue(RoomObjectVariableEnum.SessionUrlPrefix, urlPrefix);
                return;
            }
            // A badge a furni wears is fetched and registered on the furni's own assets.
            case RoomObjectBadgeAssetEvent.LOAD_BADGE: {
                handleBadgeAssetEvent(event as RoomObjectBadgeAssetEvent);
                return;
            }
            default: {
                NitroLogger.log(`Unhandled event: ${event.constructor.name} Object ID: ${event.objectId}`);
                return;
            }
        }
    };

    const handleRoomCanvasMouseEvent = (event: RoomSpriteMouseEvent, object: IRoomObject) => {
        if (!room || !object) return;

        let category = room.getRoomObjectCategoryForType(object.type);

        if (category !== RoomObjectCategoryEnum.Room && (!isPlayingGame || category !== RoomObjectCategoryEnum.Unit)) category = RoomObjectCategoryEnum.Minimum;

        const eventId = getMouseEventId(category, event.type);

        if (eventId === event.eventId) {
            if (
                event.type === MouseEventType.MOUSE_CLICK
                || event.type === MouseEventType.DOUBLE_CLICK
                || event.type === MouseEventType.MOUSE_DOWN
                || event.type === MouseEventType.MOUSE_UP
                || event.type === MouseEventType.MOUSE_MOVE
            )
                return;
        } else if (event.eventId) {
            setMouseEventId(category, event.type, event.eventId);
        }

        if (object.mouseHandler) object.mouseHandler.mouseEvent(event, room.getGeometry());
    };

    useRoomEventDispatcher<RoomEngineObjectEvent>([
        RoomEngineObjectEvent.SELECTED,
        RoomEngineObjectEvent.DESELECTED,
        RoomEngineObjectEvent.ADDED,
        RoomEngineObjectEvent.REMOVED,
        RoomEngineObjectEvent.PLACED,
        RoomEngineObjectEvent.MOUSE_ENTER,
        RoomEngineObjectEvent.MOUSE_LEAVE,
        RoomEngineObjectEvent.DOUBLE_CLICK,
    ], (event) => {
        if (!room) return;
        // if (RoomId.isRoomPreviewerId(event.roomId)) return;

        let updateEvent: RoomWidgetUpdateRoomObjectEvent | undefined = undefined;

        switch (event.type) {
            case RoomEngineObjectEvent.SELECTED: {
                const roomObject = room.getRoomObject(event.objectId, event.category);

                if (!roomObject) return;

                const disabled = (roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureSelectionDisabled) === 1);

                if (!disabled || isModerator) updateEvent = new RoomWidgetUpdateRoomObjectEvent(
                    RoomWidgetUpdateRoomObjectEvent.OBJECT_SELECTED,
                    event.objectId,
                    event.category,
                    event.roomId,
                );
                break;
            }
            case RoomEngineObjectEvent.DESELECTED:
                updateEvent = new RoomWidgetUpdateRoomObjectEvent(
                    RoomWidgetUpdateRoomObjectEvent.OBJECT_DESELECTED,
                    event.objectId,
                    event.category,
                    event.roomId,
                );
                break;
            case RoomEngineObjectEvent.ADDED: {
                let addedEventType: string = '';

                switch (event.category) {
                    case RoomObjectCategoryEnum.Floor:
                    case RoomObjectCategoryEnum.Wall:
                        addedEventType = RoomWidgetUpdateRoomObjectEvent.FURNI_ADDED;
                        break;
                    case RoomObjectCategoryEnum.Unit:
                        addedEventType = RoomWidgetUpdateRoomObjectEvent.USER_ADDED;
                        break;
                }

                if (addedEventType) updateEvent = new RoomWidgetUpdateRoomObjectEvent(
                    addedEventType,
                    event.objectId,
                    event.category,
                    event.roomId,
                );
                break;
            }
            case RoomEngineObjectEvent.REMOVED: {
                let removedEventType: string = '';

                switch (event.category) {
                    case RoomObjectCategoryEnum.Floor:
                    case RoomObjectCategoryEnum.Wall:
                        removedEventType = RoomWidgetUpdateRoomObjectEvent.FURNI_REMOVED;
                        break;
                    case RoomObjectCategoryEnum.Unit:
                        removedEventType = RoomWidgetUpdateRoomObjectEvent.USER_REMOVED;
                        break;
                }

                if (removedEventType) updateEvent = new RoomWidgetUpdateRoomObjectEvent(
                    removedEventType,
                    event.objectId,
                    event.category,
                    event.roomId,
                );
                break;
            }
            case RoomEngineObjectEvent.MOUSE_ENTER:
                updateEvent = new RoomWidgetUpdateRoomObjectEvent(
                    RoomWidgetUpdateRoomObjectEvent.OBJECT_ROLL_OVER,
                    event.objectId,
                    event.category,
                    event.roomId,
                );
                break;
            case RoomEngineObjectEvent.MOUSE_LEAVE:
                updateEvent = new RoomWidgetUpdateRoomObjectEvent(
                    RoomWidgetUpdateRoomObjectEvent.OBJECT_ROLL_OUT,
                    event.objectId,
                    event.category,
                    event.roomId,
                );
                break;
            case RoomEngineObjectEvent.DOUBLE_CLICK:
                updateEvent = new RoomWidgetUpdateRoomObjectEvent(
                    RoomWidgetUpdateRoomObjectEvent.OBJECT_DOUBLE_CLICKED,
                    event.objectId,
                    event.category,
                    event.roomId,
                );
                break;
        }

        if (updateEvent) room.dispatchEvent(updateEvent);
    });

    useEffect(() => {
        if (!room) return;

        room.eventHandler.setRoomObjectEventHandler(handleRoomObjectEvent);

        return () => room.eventHandler.setRoomObjectEventHandler(undefined);
    }, [ room, handleRoomObjectEvent ]);

    useEffect(() => {
        if (!room) return;

        room.eventHandler.setRoomCanvasMouseHandler(handleRoomCanvasMouseEvent);

        return () => room.eventHandler.setRoomCanvasMouseHandler(undefined);
    }, [ room, handleRoomCanvasMouseEvent ]);

    return null;
};
