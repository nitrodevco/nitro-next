import { ScrollOrientation } from './ScrollOrientation';

/**
 * What `useScrollController` takes: its axis, the arrow step and the lift's minimum length, and the
 * callbacks for reaching either end (within `reachThreshold` pixels).
 */
export interface ScrollControllerOptions {
    orientation: ScrollOrientation;
    step?: number;
    minThumbSize?: number;
    reachThreshold?: number;
    onReachStart?: () => void;
    onReachEnd?: () => void;
}
