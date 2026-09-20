import { EventMode, FederatedPointerEvent } from 'pixi.js';

/**
 * Every pointer callback in this package is typed to receive Pixi's own event object - a
 * plain zero-arg callback (`() => void`) remains assignable wherever this type is expected
 * (TypeScript allows a function to ignore trailing parameters), so nothing that only cares
 * "did this happen" has to change; a caller that DOES need the event - to `.stopPropagation()`
 * before it reaches a drag handler further up, say - can just read it.
 */
export type PointerHandler = (event: FederatedPointerEvent) => void;

export interface PointerHandlerProps {
    stopsPropagation?: boolean;
    onPointerOver?: PointerHandler;
    onPointerOut?: PointerHandler;
    onPointerDown?: PointerHandler;
    onPointerUp?: PointerHandler;
    onPointerUpOutside?: PointerHandler;
    onPointerTap?: PointerHandler;
}

/**
 * True once at least one real pointer handler is present. Shared by `useInteractionState`
 * (skip creating hover/press-tracking handlers and forcing `eventMode` when a component has
 * neither an internal need nor a caller-supplied handler for any of the six events) and by
 * components that need to know "is this actually interactive" before deciding other props
 * (e.g. a `cursor` value).
 */
export const hasAnyPointerHandler = (handlers: PointerHandlerProps): boolean => !!(
    handlers.onPointerOver || handlers.onPointerOut || handlers.onPointerDown
    || handlers.onPointerUp || handlers.onPointerUpOutside || handlers.onPointerTap
);

/**
 * Merges two handlers for the same event so both fire - the one place this package combines a
 * component's own internal need (Frame's activate-on-click, CloseButton's
 * stop-drag-propagation, a hook's hover/press state tracking, ...) with whatever the caller
 * additionally supplied for that same event, instead of the caller's handler silently
 * replacing the internal one or vice versa.
 */
export const compose = (a: PointerHandler | undefined, b: PointerHandler | undefined): PointerHandler | undefined => {
    if (!a) return b;
    if (!b) return a;

    return (event) => {
        a(event);
        b(event);
    };
};

/**
 * Detection-only shape for `resolveEventMode`'s incoming handlers - deliberately looser than
 * `PointerHandlerProps` (any single-argument function, plus `null`) because `<Box>`/
 * `<ThemeImage>` feed it straight from Pixi's own generated JSX prop types for
 * `pixiContainer`/`pixiSprite` (a union that also covers e.g. `FederatedWheelEvent` handlers,
 * and allows explicit `null`). This is only ever used to test "is a real handler present", so
 * the exact parameter type of each handler doesn't matter - only `PointerHandlerProps` (the
 * hook/component-facing API) needs the precise `PointerHandler` signature.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- see docblock above: only truthiness is checked, never called, so the parameter type is deliberately erased.
type PointerHandlerLike = ((event: any) => void) | null | undefined;

interface PointerHandlerDetection {
    onPointerOver?: PointerHandlerLike;
    onPointerOut?: PointerHandlerLike;
    onPointerDown?: PointerHandlerLike;
    onPointerUp?: PointerHandlerLike;
    onPointerUpOutside?: PointerHandlerLike;
    onPointerTap?: PointerHandlerLike;
}

const hasPointerHandler = (handlers: PointerHandlerDetection): boolean => !!(
    handlers.onPointerOver || handlers.onPointerOut || handlers.onPointerDown
    || handlers.onPointerUp || handlers.onPointerUpOutside || handlers.onPointerTap
);

/**
 * Pixi's own default `eventMode` ('passive') already lets a container's *children* stay
 * interactive while the container itself isn't a hit target - exactly what every purely
 * structural `<Box>` (the overwhelming majority) wants, so nothing needs to hardcode it. A
 * `<Box>` only needs to become a hit target itself once it's actually given one of its own
 * pointer handlers - detected here rather than requiring every call site to also pass
 * `eventMode="static"` alongside them, the way most of this package used to. An explicit
 * `eventMode` always wins over this (a caller can still force `'none'` even with handlers
 * attached - see AccordionTrigger.tsx's `alwaysOpen` case - or opt into `'dynamic'`).
 */
export const resolveEventMode = (explicit: EventMode | undefined, handlers: PointerHandlerDetection): EventMode | undefined =>
    explicit ?? (hasPointerHandler(handlers) ? 'static' : undefined);

/**
 * True once the element is given the one handler that means "clicking here does something":
 * `onPointerTap`, a press and release on the same element. Nothing else in the six counts.
 * Hovering (`onPointerOver`/`onPointerOut`) makes a tooltip host or a row that highlights into
 * a hit target without making it actionable; `onPointerUpOutside` only ever completes a press
 * begun elsewhere; and a press alone is how this package drives the things you hold rather
 * than click - a window brought to the front and dragged by its chrome, a scrollbar thumb, a
 * scaler, a scroll arrow repeating while held - none of which the Flash client pointed at
 * either. A component that holds to act and still wants the hand says so with its own
 * `cursor`, the way the scrollbar bars ask for `grab`.
 */
export const hasClickHandler = (handlers: PointerHandlerDetection): boolean => !!handlers.onPointerTap;

/** A hit target in either renderer: the modes Pixi tests against, and the ones DOM maps to `pointer-events: auto`. */
const isHitTarget = (eventMode: EventMode | undefined): boolean => eventMode === 'static' || eventMode === 'dynamic';

/**
 * The cursor an element shows when its caller hasn't named one of its own. The pointer is the
 * client's one signal that clicking here does something, so it follows the handlers actually
 * attached, never the `eventMode`: an element is routinely `static` only to catch hovers (a
 * tooltip host, a row that highlights under the pointer) or a wheel, and pointing at those
 * promises a click that does nothing.
 *
 * A hit target that isn't actionable still names its cursor rather than leaving it unset: Pixi
 * reads the hit target's own cursor, so saying `default` is what keeps a non-actionable target
 * from looking clickable.
 */
export const cursorForHandlers = (eventMode: EventMode | undefined, handlers: PointerHandlerDetection): string | undefined => {
    if (hasClickHandler(handlers)) return 'pointer';

    return isHitTarget(eventMode) ? 'default' : undefined;
};
