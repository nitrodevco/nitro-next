/**
 * `wired_setup.uibuilder.presets.BitmapViewPreset` - a bitmap the element draws itself (a
 * preview, a furni image) in a box of a set size (`setBitmapSize`), centred in it
 * (`pivot_point = center`). Static width: `width`.
 *
 * Flash hands out the bitmap window to be written into; here the image comes in as a `texture`
 * or a `src`. `interactive` is the inverse of the constructor's argument, which clears the
 * window's mouse flag: leave it off for a picture, turn it on with `onPress` for one that is
 * clicked.
 */
import { Texture } from 'pixi.js';

import { Box, ThemeImage } from '#base/theme';

import { useWiredDisabled, wiredDisabledAlpha } from './useWiredDisabled';

export interface WiredBitmapViewProps {
    width: number;
    height: number;
    texture?: Texture;
    src?: string;
    onPress?: () => void;
}

export const WiredBitmapView = ({ width, height, texture, src, onPress }: WiredBitmapViewProps) => {
    const disabled = useWiredDisabled();

    return (
        <Box
            eventMode={disabled ? 'none' : undefined}
            cursor={onPress ? 'pointer' : undefined}
            onPointerTap={onPress}
            layout={{ width, height, flexShrink: 0 }}
        >
            {(texture || src) && (
                // `bitmap_wrapper_view`: unstretched at the centre pivot, `int((box - bitmap) / 2)`,
                // clipped to the window. Its `fit_size_to_contents` is undone by `resizeToWidth`.
                <ThemeImage
                    texture={texture}
                    src={src}
                    alpha={wiredDisabledAlpha(disabled)}
                    bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                    layout={{ width, height }}
                />
            )}
        </Box>
    );
};
