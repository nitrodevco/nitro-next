/**
 * `wired_setup.uibuilder.presets.StaticBitmapAssetWrapperPreset`
 * (`PresetManager.createBitmapWrapperPreset`) - one of the client's bitmap assets at its own
 * size (`static_bitmap_view`, `fit_size_to_contents`). Static width: the bitmap's.
 *
 * `asset` is the bitmap's `<component>/<name>` under `public/assets`, without the extension -
 * for a wired asset that is `wired/` + what `resolveWiredAssetName(style, name)` returns, which is
 * how the option rows call it for their icons.
 */
import { BoxLayout, LayoutImage, ThemeImage } from '#base/theme';

import { useWiredDisabled, wiredDisabledAlpha } from './useWiredDisabled';

export interface WiredStaticBitmapProps {
    /** `assetUri`. */
    asset: string;
    layout?: BoxLayout;
}

export const WiredStaticBitmap = ({ asset, layout }: WiredStaticBitmapProps) => {
    const disabled = useWiredDisabled();

    return (
        <ThemeImage
            src={LayoutImage(`${asset}.png`)}
            alpha={wiredDisabledAlpha(disabled)}
            layout={{ flexShrink: 0, ...layout }}
        />
    );
};
