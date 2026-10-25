/** The scroll a layout's scrollbar shares with the list it scrolls, by target - see `TemplateScroll`. */
import type { ScrollController } from '../hooks/useScrollController';
import type { TemplateElement } from './templateData';

export type TemplateScrollAxis = 'vertical' | 'horizontal';

type TargetControllers = Partial<Record<TemplateScrollAxis, ScrollController>>;

/** What a scrollbar draws from: its lift and whether there is anything to scroll. */
const sameController = (a: ScrollController | undefined, b: ScrollController | undefined) => a === b
    || (!!a && !!b && a.thumbSize === b.thumbSize && a.thumbOffset === b.thumbOffset && a.scrollable === b.scrollable && a.scrollOffset === b.scrollOffset
        && a.trackRef === b.trackRef && a.onTrackPointerDown === b.onTrackPointerDown && a.onThumbPointerDown === b.onThumbPointerDown
        && a.stepBackward === b.stepBackward && a.stepForward === b.stepForward);

/** Each scroll target's controllers, by element, for the scrollbars linked to it. */
export class TemplateScrollStore {
    private _controllers = new Map<TemplateElement, TargetControllers>();
    private _listeners = new Map<TemplateElement, Set<() => void>>();

    public readonly subscribe = (target: TemplateElement, listener: () => void) => {
        let listeners = this._listeners.get(target);

        if (!listeners) {
            listeners = new Set();
            this._listeners.set(target, listeners);
        }

        listeners.add(listener);

        return () => {
            listeners.delete(listener);
        };
    };

    public get(target: TemplateElement, axis: TemplateScrollAxis): ScrollController | undefined {
        return this._controllers.get(target)?.[axis];
    }

    /** A target's controllers as it last drew; its scrollbars are told only when what they draw changed. */
    public publish(target: TemplateElement, controllers: TargetControllers | undefined): void {
        const previous = this._controllers.get(target);

        if (sameController(previous?.vertical, controllers?.vertical) && sameController(previous?.horizontal, controllers?.horizontal)) return;

        if (controllers) this._controllers.set(target, controllers);
        else this._controllers.delete(target);

        for (const listener of this._listeners.get(target) ?? []) listener();
    }
}
