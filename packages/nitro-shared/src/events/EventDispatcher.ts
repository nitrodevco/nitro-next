import { type IEventDispatcher, type INitroEvent, NitroLogger } from '@nitrodevco/nitro-api';

export class EventDispatcher implements IEventDispatcher {
    private _listeners: Map<string, ((event: INitroEvent) => void)[]> = new Map();

    public dispose(): void {
        this.removeAllListeners();
    }

    public addEventListener<T extends INitroEvent>(type: string, cb: (event: T) => void): (() => void) | undefined {
        if (!type || !type.length || !cb) return undefined;

        let listeners = this._listeners.get(type);

        if (!listeners) {
            listeners = [];

            this._listeners.set(type, listeners);
        }

        const index = listeners.push(cb) - 1;

        NitroLogger.events('Added Event Listener', type);

        return () => {
            listeners.splice(index, 1);

            if (!listeners.length) this._listeners.delete(type);
        };
    }

    public removeEventListener(type: string, cb: (event: INitroEvent) => void): void {
        if (!type || !cb) return;

        const existing = this._listeners.get(type);

        if (!existing || !existing.length) return;

        for (const [i, cb] of existing.entries()) {
            if (!cb || cb !== cb) continue;

            existing.splice(i, 1);

            if (!existing.length) this._listeners.delete(type);

            return;
        }
    }

    public dispatchEvent(event: INitroEvent): boolean {
        if (!event) return false;

        NitroLogger.events('Dispatched Event', event.type);

        this.processEvent(event);

        return true;
    }

    private processEvent(event: INitroEvent): void {
        const listeners = this._listeners.get(event.type);

        if (!listeners || !listeners.length) return;

        const callbacks: ((event: INitroEvent) => void)[] = [];

        for (const cb of listeners) callbacks.push(cb);

        while (callbacks.length) {
            try {
                callbacks.shift()?.(event);
            } catch (err) {
                NitroLogger.error(err.stack);

                return;
            }
        }
    }

    public removeAllListeners(): void {
        this._listeners.clear();
    }
}
