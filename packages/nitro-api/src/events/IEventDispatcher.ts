import type { INitroEvent } from './INitroEvent';

export interface IEventDispatcher {
    dispose(): void;
    addEventListener<T extends INitroEvent>(type: string, cb: (event: T) => void): (() => void) | undefined;
    removeEventListener(type: string, cb: (event: INitroEvent) => void): void;
    removeAllListeners(): void;
    dispatchEvent(event: INitroEvent): boolean;
}
