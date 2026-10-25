import { IRoomObject, MouseEventType, NitroLogger, RoomBackgroundColorEvent, RoomEngineObjectEvent, RoomObjectBadgeAssetEvent, RoomObjectCategoryEnum, RoomObjectDataRequestEvent, RoomObjectDimmerStateUpdateEvent, RoomObjectEvent, RoomObjectFloorHoleEvent, RoomObjectFurnitureActionEvent, RoomObjectHSLColorEnableEvent, RoomObjectMouseEvent, RoomObjectMoveEvent, RoomObjectRoomAdEvent, RoomObjectStateChangedEvent, RoomObjectUserType, RoomObjectVariableEnum, RoomObjectWidgetRequestEvent, RoomSpriteMouseEvent, RoomWidgetUpdateRoomObjectEvent } from '@nitrodevco/nitro-api';
import { RoomDimmerPresetsMessageType } from '@nitrodevco/nitro-packets';
import { RoomObjectUpdateMessage } from '@nitrodevco/nitro-renderer';
import { useEffect, useRef } from 'react';

import { useModerationActions } from '#base/context/moderation';
import { useRoom, useRoomIsPlayingGame, useRoomMouseActions, useRoomUsersActions, useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { useConfigValue } from '#base/context/system';
import { useOwnIsAnyRoomController, useOwnUserId } from '#base/context/user';
import { useRoomAdHandler, useRoomBadgeAssetHandler, useRoomEventDispatcher, useRoomEventHandler, useRoomFurnitureActionHandler, useRoomObjectInteraction, useRoomObjectSelect, useRoomWidgetRequestHandler } from '#base/hooks';
import { handleRoomObjectSoundEvent, isRoomObjectSoundEvent } from '#base/sound';
import { useLatest } from '#base/theme';

import { DisposeRoomBackgroundColor, SetRoomBackgroundColor } from './roomBackgroundColor';
import { DisposeRoomViewColor, SetRoomViewColor } from './roomViewColor';
import { isTouchPlacementDrop } from './touchPlacementDrop';

/**
 * The room's event side, rendering nothing: what the room objects raise is handled the way
 * `RoomObjectEventHandler.handleRoomObjectEvent` and `processRoomCanvasMouseEvent` did, and the
 * engine's object events become widget updates as in `RoomDesktop.roomObjectEventHandler`. It also
 * follows the dimmer and background toner colours, which go with the room on dispose.
 */
export const RoomEventHandler = () => {
    const room = useRoom();
    const isAnyRoomController = useOwnIsAnyRoomController();
    const isPlayingGame = useRoomIsPlayingGame();
    const { getMouseEventId, setMouseEventId } = useRoomMouseActions();
    const { handleRoomObjectMouseEvent } = useRoomEventHandler();
    const { changeItemState } = useRoomObjectInteraction();
    const { selectAvatar } = useRoomObjectSelect();
    const { handleRoomWidgetRequestEvent } = useRoomWidgetRequestHandler();
    const { handleBadgeAssetEvent } = useRoomBadgeAssetHandler(room);
    const { handleFurnitureActionEvent } = useRoomFurnitureActionHandler();
    const { handleRoomAdEvent } = useRoomAdHandler();
    const dimmerRequest = useRoomWidget<RoomDimmerPresetsMessageType>(RoomObjectWidgetRequestEvent.DIMMER);
    const { mergeRoomWidgetData } = useRoomWidgetActions();
    const { getUserDataByIndex } = useRoomUsersActions();
    const { userSelected } = useModerationActions();
    const ownUserId = useOwnUserId();
    /** `DimmerFurniWidget`'s dimmer in charge: the last one switched on. */
    const activeDimmerIdRef = useRef<number>(-1);
    const urlPrefix = useConfigValue<string>('url.prefix') ?? '';

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

        // The sound blocks' samples and the cuckoo clock (a furniture action event too), for the sound manager.
        if (isRoomObjectSoundEvent(event)) {
            handleRoomObjectSoundEvent(event);

            return;
        }

        if (event instanceof RoomObjectFurnitureActionEvent) {
            handleFurnitureActionEvent(event);

            return;
        }

        if (event instanceof RoomObjectRoomAdEvent) {
            handleRoomAdEvent(event);

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

                // `DimmerFurniWidget.onDimmerState`: the room follows the dimmer last switched on,
                // so another dimmer going off does not undo it. Effect 2 colours the background
                // planes only; any other effect the whole room view.
                if (dimmer.state > 0) activeDimmerIdRef.current = dimmer.objectId;

                if (activeDimmerIdRef.current === dimmer.objectId) room.updateRoomObjectRoomColor(dimmer.color, dimmer.brightness, dimmer.effectId === 2);

                // `DimmerFurniWidget.onDimmerState`: the dialog showing this dimmer follows it on and off.
                if (dimmerRequest?.data && (dimmerRequest.objectId === dimmer.objectId)) mergeRoomWidgetData<RoomDimmerPresetsMessageType>(RoomObjectWidgetRequestEvent.DIMMER, { isOn: dimmer.state > 0 });
                return;
            }
            // `handleObjectFloorHoleEvent`: a floor hole furni opening or closing the floor under it.
            case RoomObjectFloorHoleEvent.ADD_HOLE: {
                room.addFloorHole(event.objectId);
                return;
            }
            case RoomObjectFloorHoleEvent.REMOVE_HOLE: {
                room.removeFloorHole(event.objectId);
                return;
            }
            case RoomObjectHSLColorEnableEvent.ROOM_BACKGROUND_COLOR: {
                // A background toner saying what the room should sit on. Like the dimmer, it is
                // applied here rather than in the widget, so the room is coloured for everyone
                // in it and not only for whoever has the dialog open.
                const hsl = event as RoomObjectHSLColorEnableEvent;

                // `RoomUI`'s `ROHSLCEE_ROOM_BACKGROUND_COLOR`: a toner switched off fades to nothing.
                if (hsl.enable) SetRoomBackgroundColor(room.canvas, hsl.hue, hsl.saturation, hsl.lightness);
                else SetRoomBackgroundColor(room.canvas, 0, 0, 0);
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

        // A finger dropping an object: its ghost's own hit is passed over, so the floor under it takes the click.
        if ((event.type === MouseEventType.MOUSE_CLICK) && isTouchPlacementDrop(object.id, room.getRoomObjectCategoryForType(object.type))) return;

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

                if (!disabled || isAnyRoomController) updateEvent = new RoomWidgetUpdateRoomObjectEvent(
                    RoomWidgetUpdateRoomObjectEvent.OBJECT_SELECTED,
                    event.objectId,
                    event.category,
                    event.roomId,
                );

                // `RoomDesktop`'s REOE_SELECTED (1318 AS3 :1153-1159): a user clicked is the moderation tool's selected user.
                if (event.category === RoomObjectCategoryEnum.Unit) {
                    const userData = getUserDataByIndex(event.objectId);

                    if (userData && (userData.userType === RoomObjectUserType.User)) userSelected(userData.webID, userData.name);
                }
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

    /*
     * `RoomUI`'s `REE_ROOM_COLOR`: a background-only colour is the planes' own (`RoomLogic`), so the
     * view's colorizer goes back to white; any other colour tints the whole view.
     */
    useRoomEventDispatcher<RoomBackgroundColorEvent>(RoomBackgroundColorEvent.ROOM_COLOR, (event) => {
        if (event.bgOnly) SetRoomViewColor(0xFFFFFF, 0xFF);
        else SetRoomViewColor(event.color, event.brightness);
    });

    // `disposeDesktop` on `REE_DISPOSED`: the colorizer, the toner backdrop and the dimmer followed do not outlive their room.
    useEffect(() => {
        if (!room) return;

        return () => {
            DisposeRoomViewColor();
            DisposeRoomBackgroundColor();
            activeDimmerIdRef.current = -1;
        };
    }, [ room ]);

    // The engine is handed one stable handler per room that calls the latest render's, rather than
    // a new handler (and a clear in between) on every render.
    const handleRoomObjectEventRef = useLatest(handleRoomObjectEvent);
    const handleRoomCanvasMouseEventRef = useLatest(handleRoomCanvasMouseEvent);

    useEffect(() => {
        if (!room) return;

        const onRoomObjectEvent: typeof handleRoomObjectEvent = event => handleRoomObjectEventRef.current(event);
        const onRoomCanvasMouseEvent: typeof handleRoomCanvasMouseEvent = (event, object) => handleRoomCanvasMouseEventRef.current(event, object);

        room.eventHandler.setRoomObjectEventHandler(onRoomObjectEvent);
        room.eventHandler.setRoomCanvasMouseHandler(onRoomCanvasMouseEvent);

        return () => {
            room.eventHandler.setRoomObjectEventHandler(undefined);
            room.eventHandler.setRoomCanvasMouseHandler(undefined);
        };
    }, [ room ]);

    return null;
};
