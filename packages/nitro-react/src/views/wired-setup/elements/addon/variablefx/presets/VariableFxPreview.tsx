/**
 * `addons/variablefx/presets/VariableFxPreviewPreset` - the live preview of a Variable FX addon: a
 * 280 x 96 bitmap (`BitmapViewPreset.setBitmapSize`, content centred) showing the effect drawn by
 * the room's own renderer, animated, at twice its size when that fits.
 *
 * The visualizer runs in the `VariableFxPreviewController` the preview block owns (the block's
 * randomize button and zoom label use it too). This hands it every state; the controller rebuilds
 * only when `refreshKey` changed - the runtime config, which is what Flash calls `refresh(state)`
 * for (`init`, and the visualization and value range presets' changes) - and stops on unmount.
 * The picture is a Pixi texture, so the DOM render target, which cannot show one, leaves the box
 * empty.
 */
import { useEffect, useSyncExternalStore } from 'react';

import { Box, ThemeImage } from '#base/theme';
import { VARIABLE_FX_PREVIEW_HEIGHT, VARIABLE_FX_PREVIEW_WIDTH, VariableFxPreviewController, VariableFxState } from '#base/wired';

import { useWiredDisabled, wiredDisabledAlpha } from '../../../../kit/useWiredDisabled';

export interface VariableFxPreviewProps {
    controller: VariableFxPreviewController;
    state: VariableFxState;
    /** Changes whenever the preview must be rebuilt from `state`. */
    refreshKey: string;
}

export const VariableFxPreview = ({ controller, state, refreshKey }: VariableFxPreviewProps) => {
    const snapshot = useSyncExternalStore(controller.subscribe, controller.getSnapshot);
    const disabled = useWiredDisabled();

    useEffect(() => controller.refresh(state, refreshKey), [ controller, state, refreshKey ]);

    useEffect(() => () => controller.dispose(), [ controller ]);

    // A replaced texture is destroyed only once React has committed the one that replaces it.
    useEffect(() => controller.releaseRetired(), [ controller, snapshot ]);

    return (
        <Box layout={{ width: VARIABLE_FX_PREVIEW_WIDTH, height: VARIABLE_FX_PREVIEW_HEIGHT, flexShrink: 0, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
            {snapshot.texture && (
                <ThemeImage
                    texture={snapshot.texture}
                    scale={snapshot.zoom}
                    alpha={wiredDisabledAlpha(disabled)}
                />
            )}
        </Box>
    );
};
