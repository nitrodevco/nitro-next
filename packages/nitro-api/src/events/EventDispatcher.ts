import { NitroLogger } from '../utils';
import { IEventDispatcher } from './IEventDispatcher';
import { INitroEvent } from './INitroEvent';

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

        listeners.push(cb);

        NitroLogger.events('Added Event Listener', type);

        // By identity, not by the index it was added at: that index is stale once an earlier listener goes.
        return () => this.removeEventListener(type, cb);
    }

    public removeEventListener(type: string, cb: (event: INitroEvent) => void): void {
        if (!type || !cb) return;

        const existing = this._listeners.get(type);

        if (!existing) return;

        const index = existing.indexOf(cb);

        if (index < 0) return;

        existing.splice(index, 1);

        if (!existing.length) this._listeners.delete(type);
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

        // A copy, so a listener added or removed while dispatching does not change this round. Read by
        // index: draining it with `shift()` moved every remaining listener per call, for every event.
        const callbacks = listeners.slice();

        for (let i = 0; i < callbacks.length; i++) {
            try {
                callbacks[i]?.(event);
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
