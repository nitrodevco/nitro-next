/**
 * `wired_setup.uibuilder.presets.SpacerPreset` - `height` pixels of nothing across the width.
 * `backgroundColor` is what `WiredUIPreset.blendSpacer` paints into it: the main layout fills
 * the gap above a block with that block's background (`backgroundEnabled` / `backgroundColor`).
 */
import { Region } from '#base/theme';

import { useWiredFillLayout } from './useWiredFillLayout';

export interface WiredSpacerProps {
    height: number;
    /** `SpacerPreset.backgroundColor` with `backgroundEnabled` - a CSS colour; absent for a transparent spacer. */
    backgroundColor?: string;
}

export const WiredSpacer = ({ height, backgroundColor }: WiredSpacerProps) => {
    const fillLayout = useWiredFillLayout();

    return (
        <Region
            backgroundColor={backgroundColor}
            layout={{ height, flexShrink: 0, ...fillLayout }}
        />
    );
};
