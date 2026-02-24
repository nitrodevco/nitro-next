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
import type { RoomContentLoadedEvent } from '@nitrodevco/nitro-events';

import { GetRoomContentLoader } from './GetRoomContentLoader';
import { GetRoomObjectLogicFactory } from './GetRoomObjectLogicFactory';
import { GetRoomObjectVisualizationFactory } from './GetRoomObjectVisualizationFactory';
import { RoomInstance } from './RoomInstance';
import { RoomObjectManager } from './RoomObjectManager';

export class RoomManager implements IRoomManager, IRoomInstanceContainer {
    private _rooms: Map<string, IRoomInstance> = new Map();
    private _updateCategories: number[] = [];

    private _listener: IRoomManagerListener;

    private _pendingContentTypes: string[] = [];
    private _skipContentProcessing: boolean = false;

    public init(listener: IRoomManagerListener): Promise<void> {
        this._listener = listener;

        const onRoomContentLoadedEvent = (event: RoomContentLoadedEvent) => {
            const contentType = event.contentType;

            if (this._pendingContentTypes.indexOf(contentType) >= 0) return;

            this._pendingContentTypes.push(contentType);
        };

        //EventStore.getState().subscribe(RoomContentLoadedEvent.RCLE_SUCCESS, onRoomContentLoadedEvent);
        //EventStore.getState().subscribe(RoomContentLoadedEvent.RCLE_FAILURE, onRoomContentLoadedEvent);
        //EventStore.getState().subscribe(RoomContentLoadedEvent.RCLE_CANCEL, onRoomContentLoadedEvent);

        return Promise.resolve();
    }

    public update(time: number, update: boolean = false): void {
        this.processPendingContentTypes(time);

        for (const room of this._rooms.values()) room?.update(time, update);
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

    public addUpdateCategory(category: number): void {
        const index = this._updateCategories.indexOf(category);

        if (index >= 0) return;

        this._updateCategories.push(category);

        for (const room of this._rooms.values()) room?.addUpdateCategory(category);
    }

    public removeUpdateCategory(category: number): void {
        const index = this._updateCategories.indexOf(category);

        if (index === -1) return;

        this._updateCategories.splice(index, 1);

        for (const room of this._rooms.values()) room?.removeUpdateCategory(category);
    }

    public async createRoomObjectAndInitalize(
        roomId: string,
        objectId: number,
        type: string,
        category: number,
    ): Promise<IRoomObject | undefined> {
        const instance = this.getRoomInstance(roomId);

        if (!instance) return undefined;

        let visualizationType = type;
        let logicType = type;
        let assetName = type;
        let asset: IGraphicAssetCollection | undefined = undefined;
        let isLoading = false;

        if (GetRoomContentLoader().isLoaderType(type)) {
            console.log('ok', type);
            asset = GetRoomContentLoader().getCollection(type);

            if (!asset) {
                isLoading = true;

                console.log('load it');

                try {
                    await GetRoomContentLoader().downloadAsset(type);

                    isLoading = false;
                } catch {
                    assetName = GetRoomContentLoader().getPlaceholderName(type);
                }
            }

            asset = GetRoomContentLoader().getCollection(assetName);

            if (asset) {
                visualizationType = asset.data.visualizationType;
                logicType = asset.data.logicType;
            }
        }

        if (asset) {
            const visualization = GetRoomObjectVisualizationFactory().getVisualization(visualizationType);
            const visualizationData = GetRoomObjectVisualizationFactory().getVisualizationData(
                assetName,
                visualizationType,
                asset.data,
            );

            if (visualization) {
                visualization.asset = asset;

                if (!visualizationData || !visualization.initialize(visualizationData)) return undefined;

                const object = instance.createRoomObject(objectId, 1, type, category) as IRoomObjectController;

                if (object) {
                    object.setVisualization(visualization);

                    const logic = GetRoomObjectLogicFactory().getLogic(logicType);

                    if (logic) {
                        object.setLogic(logic);
                        object.logic.initialize(asset.data);
                    }

                    if (!isLoading) object.isReady = true;

                    GetRoomContentLoader().setRoomObjectRoomId(object, roomId);

                    return object;
                }
            }
        }

        return undefined;
    }

    private reinitializeRoomObjectsByType(type: string): void {
        if (!type || !type.length) return;

        const asset = GetRoomContentLoader().getCollection(type);

        if (!asset) return;

        const visualizationType = asset.data.visualizationType;
        const logicType = asset.data.logicType;
        const visualizationData = GetRoomObjectVisualizationFactory().getVisualizationData(
            type,
            visualizationType,
            asset.data,
        );

        for (const room of this._rooms.values()) {
            if (!room) continue;

            for (const [category, manager] of room.managers.entries()) {
                if (!manager) continue;

                for (const object of manager.objects.getValues()) {
                    if (!object || object.type !== type) continue;

                    const visualization = GetRoomObjectVisualizationFactory().getVisualization(visualizationType);

                    if (visualization) {
                        visualization.asset = asset;

                        if (!visualizationData || !visualization.initialize(visualizationData)) {
                            manager.removeObject(object.id);
                        } else {
                            object.setVisualization(visualization);

                            const logic = GetRoomObjectLogicFactory().getLogic(logicType);

                            if (logic) {
                                object.setLogic(logic);
                                logic.initialize(asset.data);
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

    public processPendingContentTypes(time: number): void {
        if (this._skipContentProcessing) {
            this._skipContentProcessing = false;

            return;
        }

        while (this._pendingContentTypes.length) {
            const type = this._pendingContentTypes.shift();

            if (type) {
                const collection = GetRoomContentLoader().getCollection(type);

                if (!collection) {
                    if (this._listener) this._listener.initalizeTemporaryObjectsByType(type, false);

                    NitroLogger.log('Invalid Collection', type);

                    continue;
                }

                this.reinitializeRoomObjectsByType(type);

                if (this._listener) this._listener.initalizeTemporaryObjectsByType(type, true);
            }
        }
    }

    public createRoomObjectManager(category: number): IRoomObjectManager {
        return new RoomObjectManager();
    }

    public get rooms(): Map<string, IRoomInstance> {
        return this._rooms;
    }
}
