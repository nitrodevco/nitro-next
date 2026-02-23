import type {
    IGraphicAssetCollection,
    IRoomInstance,
    IRoomInstanceContainer,
    IRoomManager,
    IRoomManagerListener,
    IRoomObject,
    IRoomObjectController,
    IRoomObjectManager,
} from '@nitrodevco/nitro-api';
import { NitroLogger } from '@nitrodevco/nitro-api';
import { RoomContentLoadedEvent } from '@nitrodevco/nitro-events';

import { GetRoomContentLoader } from './GetRoomContentLoader';
import { GetRoomObjectLogicFactory } from './GetRoomObjectLogicFactory';
import { GetRoomObjectVisualizationFactory } from './GetRoomObjectVisualizationFactory';
import { RoomObjectManager } from './RoomObjectManager';

export class RoomManager implements IRoomManager, IRoomInstanceContainer {
    private _rooms: Map<string, IRoomInstance> = new Map();
    private _updateCategories: number[] = [];

    private _listener: IRoomManagerListener;

    private _pendingContentTypes: string[] = [];
    private _skipContentProcessing: boolean = false;

    public async init(listener: IRoomManagerListener): Promise<void> {
        this._listener = listener;

        const onRoomContentLoadedEvent = (event: RoomContentLoadedEvent) => {
            const contentType = event.contentType;

            if (this._pendingContentTypes.indexOf(contentType) >= 0) return;

            this._pendingContentTypes.push(contentType);
        };

        EventStore.getState().subscribe(RoomContentLoadedEvent.RCLE_SUCCESS, onRoomContentLoadedEvent);
        EventStore.getState().subscribe(RoomContentLoadedEvent.RCLE_FAILURE, onRoomContentLoadedEvent);
        EventStore.getState().subscribe(RoomContentLoadedEvent.RCLE_CANCEL, onRoomContentLoadedEvent);
    }

    public getRoomInstance(roomId: string): IRoomInstance | undefined {
        return this._rooms.get(roomId);
    }

    public createRoomInstance(roomId: string): IRoomInstance | undefined {
        if (!this._rooms.get(roomId)) {
            const instance = new RoomInstance(roomId, this);

            this._rooms.set(instance.id, instance);

            if (this._updateCategories.length) {
                for (const category of this._updateCategories) {
                    instance.addUpdateCategory(category);
                }
            }

            return instance;
        }

        return undefined;
    }

    public removeRoomInstance(roomId: string): boolean {
        const existing = this._rooms.get(roomId);

        if (!existing) return false;

        this._rooms.delete(existing.id);

        existing.dispose();

        return true;
    }

    public createRoomObjectAndInitalize(
        roomId: string,
        objectId: number,
        type: string,
        category: number,
    ): IRoomObject | undefined {
        const instance = this.getRoomInstance(roomId);

        if (!instance) return null;

        let visualization = type;
        let logic = type;
        let assetName = type;
        let asset: IGraphicAssetCollection | undefined;
        let isLoading = false;

        if (GetRoomContentLoader().isLoaderType(type)) {
            asset = GetRoomContentLoader().getCollection(type);

            if (!asset) {
                isLoading = true;

                GetRoomContentLoader().downloadAssetSync(type);

                assetName = GetRoomContentLoader().getPlaceholderName(type);
                asset = GetRoomContentLoader().getCollection(assetName);
            }

            if (!asset) return undefined;

            visualization = asset.data.visualizationType ?? '';
            logic = asset.data.logicType ?? '';
        }

        if (!asset) return undefined;

        const visualizationInstance = GetRoomObjectVisualizationFactory().getVisualization(visualization);
        const visualizationData = GetRoomObjectVisualizationFactory().getVisualizationData(
            assetName,
            visualization,
            asset.data,
        );
        const logicInstance = GetRoomObjectLogicFactory().getLogic(logic);

        if (visualizationInstance) visualizationInstance.asset = asset;

        if (
            !visualizationInstance ||
            !visualizationData ||
            !visualizationInstance.initialize(visualizationData) ||
            !logicInstance
        )
            return undefined;

        const object = instance.createRoomObject(objectId, 1, type, category) as IRoomObjectController;

        if (object) {
            object.setVisualization(visualizationInstance);
            object.setLogic(logicInstance);
        }

        if (!object) return undefined;

        object.setVisualization(visualizationInstance);
        object.setLogic(logicInstance);

        object.logic?.initialize(asset.data);

        if (!isLoading) object.isReady = true;

        GetRoomContentLoader().setRoomObjectRoomId(object, roomId);

        return object;
    }

    private reinitializeRoomObjectsByType(type: string): void {
        if (!type || !GetRoomContentLoader()) return;

        const asset = GetRoomContentLoader().getCollection(type);

        if (!asset) return;

        const visualization = asset.data.visualizationType;
        const logic = asset.data.logicType;
        const visualizationData = GetRoomObjectVisualizationFactory().getVisualizationData(
            type,
            visualization,
            asset.data,
        );

        for (const room of this._rooms.values()) {
            if (!room) continue;

            for (const [category, manager] of room.managers.entries()) {
                if (!manager) continue;

                for (const object of manager.objects.getValues()) {
                    if (!object || object.type !== type) continue;

                    const visualizationInstance = GetRoomObjectVisualizationFactory().getVisualization(visualization);

                    if (visualizationInstance) {
                        visualizationInstance.asset = asset;

                        if (!visualizationData || !visualizationInstance.initialize(visualizationData)) {
                            manager.removeObject(object.id);
                        } else {
                            object.setVisualization(visualizationInstance);

                            const logicInstance = GetRoomObjectLogicFactory().getLogic(logic);

                            object.setLogic(logicInstance);

                            if (logicInstance) {
                                logicInstance.initialize(asset.data);
                            }

                            object.isReady = true;

                            if (this._listener) this._listener.objectInitialized(room.id, object.id, category);
                        }
                    } else {
                        manager.removeObject(object.id);
                    }
                }
            }
        }
    }

    public addUpdateCategory(category: number): void {
        const index = this._updateCategories.indexOf(category);

        if (index >= 0) return;

        this._updateCategories.push(category);

        if (!this._rooms.size) return;

        for (const room of this._rooms.values()) {
            if (!room) continue;

            room.addUpdateCategory(category);
        }
    }

    public removeUpdateCategory(category: number): void {
        const index = this._updateCategories.indexOf(category);

        if (index === -1) return;

        this._updateCategories.splice(index, 1);

        if (!this._rooms.size) return;

        for (const room of this._rooms.values()) {
            if (!room) continue;

            room.removeUpdateCategory(category);
        }
    }

    private processPendingContentTypes(time: number): void {
        if (this._skipContentProcessing) {
            this._skipContentProcessing = false;

            return;
        }

        while (this._pendingContentTypes.length) {
            const type = this._pendingContentTypes.shift();

            const collection = GetRoomContentLoader().getCollection(type);

            if (!collection) {
                if (this._listener) {
                    this._listener.initalizeTemporaryObjectsByType(type, false);
                }

                NitroLogger.log('Invalid Collection', type);

                continue;
            }

            this.reinitializeRoomObjectsByType(type);

            if (this._listener) this._listener.initalizeTemporaryObjectsByType(type, true);
        }
    }

    public update(time: number, update: boolean = false): void {
        this.processPendingContentTypes(time);

        if (!this._rooms.size) return;

        for (const room of this._rooms.values()) room && room.update(time, update);
    }

    public createRoomObjectManager(category: number): IRoomObjectManager {
        return new RoomObjectManager();
    }

    public get rooms(): Map<string, IRoomInstance> {
        return this._rooms;
    }
}
