import type {
    IEventDispatcher,
    INitroEvent,
    IRoomGeometry,
    IRoomObjectController,
    IRoomObjectEventHandler,
    IRoomObjectUpdateMessage,
    IRoomSpriteMouseEvent,
} from '@nitrodevco/nitro-api';

export class RoomObjectLogicBase implements IRoomObjectEventHandler {
    private _eventDispatcher: IEventDispatcher;
    private _events: (() => void)[] = [];
    private _object: IRoomObjectController;
    private _time: number = 0;

    public initialize(data: unknown): void {
        return;
    }

    public dispose(): void {
        this._object = null!;
    }

    public tearDown(): void {
        for (const disposable of this._events) disposable();

        this._events = [];

        return;
    }

    public getEventTypes(): string[] {
        return [];
    }

    public update(time: number): void {
        this._time = time;

        return;
    }

    public processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        if (!message) return;

        if (message.location) this._object.setLocation(message.location);
        if (message.direction) this._object.setDirection(message.direction);
    }

    public mouseEvent(event: IRoomSpriteMouseEvent, geometry: IRoomGeometry): void {
        return;
    }

    public useObject(): void {
        return;
    }

    public setObject(object: IRoomObjectController): void {
        if (this._object === object) return;

        if (this._object) {
            this._object.setLogic(null!);
        }

        if (!object) {
            this.dispose();

            this._object = null!;

            return;
        }

        this._object = object;
        this._object.setLogic(this);
    }

    protected addEventListener<T extends INitroEvent>(type: string, cb: (event: T) => void) {
        const disposable = this.eventDispatcher?.addEventListener(type, cb);

        if (disposable) this._events.push(disposable);
    }

    protected dispatchEvent(event: INitroEvent): void {
        if (!event) return;

        this.eventDispatcher.dispatchEvent(event);
    }

    public get object(): IRoomObjectController {
        return this._object;
    }

    public get eventDispatcher(): IEventDispatcher {
        return this._eventDispatcher;
    }

    public set eventDispatcher(events: IEventDispatcher) {
        this._eventDispatcher = events;
    }

    public get widget(): string | undefined {
        return undefined;
    }

    public get contextMenu(): string | undefined {
        return undefined;
    }

    public get time(): number {
        return this._time;
    }

    protected mergeTypes(set: string[], set2: string[]): string[] {
        const types = set.concat();

        for (const type of set2) {
            if (!type || types.indexOf(type) >= 0) continue;

            types.push(type);
        }

        return types;
    }
}
