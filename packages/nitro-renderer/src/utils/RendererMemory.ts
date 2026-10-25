import { Renderer, TextureSource } from 'pixi.js';

import { GetRenderer } from './GetRenderer';

/** A texel's bytes in the formats the client uses other than the 4-byte ones (`rgba8unorm`, `bgra8unorm`). */
const TEXEL_BYTES: Readonly<Record<string, number>> = {
    r8unorm: 1,
    rg8unorm: 2,
    r16float: 2,
    rg16float: 4,
    rgba16float: 8,
    r32float: 4,
    rg32float: 8,
    rgba32float: 16,
};

/**
 * What the renderer holds on the GPU in textures: every texture source it uploaded and has not
 * dropped yet (`managedTextures`), how many of them are render textures (no resource: drawn into
 * on the GPU), and their size estimated from their pixels and format, a mip chain adding a third.
 */
export type RendererTextureMemory = { textures: number; renderTextures: number; bytes: number };

export const GetRendererTextureMemory = (renderer: Renderer | undefined = GetRenderer()): RendererTextureMemory | null => {
    const managed = (renderer?.texture as { managedTextures?: Readonly<(TextureSource | null)[]> } | undefined)?.managedTextures;

    if (!managed) return null;

    let textures = 0;
    let renderTextures = 0;
    let bytes = 0;

    // A source dropped from the GPU stays in the list as `null` (`GCManagedHash.remove`).
    for (const source of managed) {
        if (!source) continue;

        textures++;

        if (!source.resource) renderTextures++;

        const texels = source.pixelWidth * source.pixelHeight * (TEXEL_BYTES[source.format] ?? 4);

        bytes += (source.mipLevelCount > 1) ? Math.round(texels * 4 / 3) : texels;
    }

    return { textures, renderTextures, bytes };
};
