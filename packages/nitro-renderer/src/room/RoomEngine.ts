import type { IRoom, IRoomEngine, IRoomObject } from '@nitrodevco/nitro-api';
import { RoomObjectCategoryEnum, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import type { RoomObjectEvent } from '@nitrodevco/nitro-shared';
import type { Ticker } from 'pixi.js';

import { GetRoomContentLoader } from './GetRoomContentLoader';
import { GetRoomManager } from './GetRoomManager';
import { GetRoomObjectLogicFactory } from './GetRoomObjectLogicFactory';
import { Room } from './Room';
import { RoomEnterEffect } from './utils';

export class RoomEngine implements IRoomEngine {
    public static ROOM_OBJECT_ID: number = -1;
    public static ROOM_OBJECT_TYPE: string = 'room';
    public static CURSOR_OBJECT_ID: number = -2;
    public static CURSOR_OBJECT_TYPE: string = 'tile_cursor';
    public static ARROW_OBJECT_ID: number = -3;
    public static ARROW_OBJECT_TYPE: string = 'selection_arrow';
    public static OVERLAY: string = 'overlay';
    public static OBJECT_ICON_SPRITE: string = 'object_icon_sprite';

    private _rooms: Map<number, IRoom> = new Map();

    private _isPlayingGame: boolean = false;

    public async init(): Promise<void> {
        GetRoomObjectLogicFactory().registerEventFunction(event =>
            this.processRoomObjectEvent(event as RoomObjectEvent),
        );

        /* EventStore.getState().subscribe<RoomSessionEvent>(RoomSessionEvent.STARTED, event =>
            this.onRoomSessionEvent(event),
        );
        EventStore.getState().subscribe<RoomSessionEvent>(RoomSessionEvent.ENDED, event =>
            this.onRoomSessionEvent(event),
        ); */

        await GetRoomContentLoader().init();
        //await GetRoomManager().init(this);

        //GetRoomContentLoader().setIconListener(this);

        GetRoomManager().addUpdateCategory(RoomObjectCategoryEnum.Floor);
        GetRoomManager().addUpdateCategory(RoomObjectCategoryEnum.Wall);
        GetRoomManager().addUpdateCategory(RoomObjectCategoryEnum.Unit);
        GetRoomManager().addUpdateCategory(RoomObjectCategoryEnum.Cursor);
        GetRoomManager().addUpdateCategory(RoomObjectCategoryEnum.Room);
    }

    public update(ticker: Ticker): void {
        const time = ticker.lastTime;
        const update = false;

        RoomEnterEffect.turnVisualizationOn();

        //this.processPendingFurniture();

        GetRoomManager().processPendingContentTypes(time);

        for (const room of this._rooms.values()) room.update(time, update);

        //this.updateRoomCameras(time);

        //if (this._mouseCursorUpdate) this.setPointer();

        RoomEnterEffect.turnVisualizationOff();
    }

    public async createRoom(roomId: number): Promise<IRoom> {
        const instance = GetRoomManager().createRoomInstance(this.getRoomId(roomId));

        if (!instance) throw new Error('invalid_instance');

        const room = new Room(roomId, instance);

        await room.prepareRoom();

        this._rooms.set(roomId, room);

        return room;
    }

    public getRoomObjectCategoryForType(type: string): RoomObjectCategoryEnum {
        return GetRoomContentLoader().getCategoryForType(type);
    }

    private processRoomObjectEvent(event: RoomObjectEvent): void {
        const roomIdString = this.getRoomObjectRoomId(event.object);

        if (!roomIdString) return;

        const roomId = this.getRoomIdFromString(this.getRoomObjectRoomId(event.object) ?? '');

        //GetRoomObjectEventHandler().handleRoomObjectEvent(event, roomId);
    }

    private getRoomIdFromString(roomId: string): number {
        if (!roomId || !roomId.length) return -1;

        const split = roomId.split('_');

        if (split.length <= 0) return -1;

        return parseInt(split[0]) || 0;
    }

    private getRoomObjectRoomId(object: IRoomObject): string | undefined {
        return object.model.getValue<string>(RoomObjectVariableEnum.ObjectRoomId) ?? undefined;
    }

    public getRoomId(id: number): string {
        return id.toString();
    }

    public get isPlayingGame() {
        return this._isPlayingGame;
    }
}
