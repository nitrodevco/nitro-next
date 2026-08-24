import { ScrollOrientation } from './ScrollOrientation';

export interface ScrollControllerOptions {
    orientation: ScrollOrientation;
    step?: number;
    minThumbSize?: number;
    reachThreshold?: number;
    onReachStart?: () => void;
    onReachEnd?: () => void;
}
