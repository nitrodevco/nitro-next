/**
 * The size of an `AssetButtonPreset` - the style's `asset_button` once its bitmap is set.
 *
 * The template's `asset` bitmap is `fit_size_to_contents` with `reflect_resize_to_parent`
 * (params `0xC00010`): setting `assetUri` resizes the bitmap window to the loaded bitmap, and
 * `WindowController`'s `WE_RESIZED` handler grows (or shrinks) the button by the same amount
 * (`_parent.width += width - oldWidth`). So the button is the bitmap plus what the template puts
 * around the 15px slot - a 26x13 movement arrow makes a 36x23 illumina button. Until the bitmap
 * has loaded, the template's own size.
 *
 * `AssetButtonRowPreset` reads the button's height right after that to size the splitter it puts
 * after a button, which is why the row needs this too.
 */
import { LayoutImage, useTextureFromUrl } from '#base/theme';
import { resolveWiredAssetName, WiredStyle } from '#base/wired';

export const wiredAssetButtonSource = (style: WiredStyle, asset: string): string => LayoutImage(`wired/${resolveWiredAssetName(style, asset)}.png`);

export const useWiredAssetButtonSize = (style: WiredStyle, asset: string): { width: number; height: number } => {
    const template = style.templates.assetButton;
    const texture = useTextureFromUrl(wiredAssetButtonSource(style, asset));
    const extra = template.size - template.assetSize;

    if (!texture) return { width: template.size, height: template.size };

    return { width: texture.width + extra, height: texture.height + extra };
};
