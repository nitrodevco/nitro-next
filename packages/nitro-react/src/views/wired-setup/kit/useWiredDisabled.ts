/**
 * Whether a kit component is disabled: by its own `disabled` prop or by an ancestor
 * (`WiredDisabled`, a section, an unselected option's extras). Flash's `Util.disableSection`
 * walks the window tree, halves the blend of every leaf and disables it; here the state comes
 * down a context and every leaf applies `wiredDisabledAlpha` and stops taking input itself -
 * which is also what lets `WiredNoDisable` (`noDisable()`, the `DO_NOT_DISABLE` tag) exempt a
 * subtree, something a container-level alpha could not undo.
 */
import { useContext } from 'react';

import { WIRED_DISABLED_BLEND } from '#base/wired';

import { WiredDisabledReactContext } from './wiredKitContexts';

export const useWiredDisabled = (ownDisabled: boolean = false): boolean => {
    const inherited = useContext(WiredDisabledReactContext);

    return inherited || ownDisabled;
};

/** The opacity a leaf draws at: half its own blend while disabled (`halfBlend()` texts start from 0.5). */
export const wiredDisabledAlpha = (disabled: boolean, blend: number = 1): number =>
    (disabled ? (blend * WIRED_DISABLED_BLEND) : blend);
