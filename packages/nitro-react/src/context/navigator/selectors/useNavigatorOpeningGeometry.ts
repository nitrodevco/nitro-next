import { useState } from 'react';

import { navigatorStore } from '../store/NavigatorStore';
import { NavigatorWindowGeometry } from '../store/NavigatorWindowSlice';

/**
 * Where the navigator window was when it was last up - `NavigatorView`'s `_lastWindowX`,
 * `_lastWindowY` and `_lastWindowHeight`, which outlive the window being hidden - read once, as
 * the window opens. It is not subscribed to: the window writes it on every step of a drag, and
 * the window itself only needs it to open where it was.
 */
export const useNavigatorOpeningGeometry = (): NavigatorWindowGeometry | undefined => {
    const [ geometry ] = useState(() => navigatorStore.getState().windowGeometry);

    return geometry;
};
