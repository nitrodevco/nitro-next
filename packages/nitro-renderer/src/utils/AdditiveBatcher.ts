/**
 * Pixi's default batcher, made able to draw additive sprites in the same batch as normal ones.
 *
 * Pixi breaks a batch wherever the blend mode changes, and a room is full of `add` layers - lamp
 * glows, light beams, the shine on a fountain - sorted by depth between the normal sprites around
 * them, so a busy room drew ~400 batches a frame with a pipeline switch for each, nearly all of
 * them blend switches.
 *
 * With premultiplied alpha the normal blend is `src + dst * (1 - src.a)`; with the source's alpha
 * written as 0 that is `src + dst` - the additive blend's colour. So a sprite flagged
 * `batchAdditive` (`ExtendedSprite`) draws with the normal blend mode, and this batcher marks its
 * vertices so the shader zeroes its output alpha. Only the destination's alpha differs from `add`
 * (left as it was rather than raised), which is why the room uses it only over its own opaque
 * background (`RoomSpriteCanvas`).
 *
 * The mark is a bit beside the round-pixels flag Pixi packs with each vertex's texture id; a sprite
 * without it draws exactly as before, so Pixi's own `DefaultBatcher` is patched rather than
 * replaced: `BatcherPipe.buildStart` creates one per instruction set by the class itself, never
 * through the batcher extensions, and the application's first frame has made some already.
 */
import {
    BatchableSprite,
    colorBit,
    colorBitGl,
    compileHighShaderGlProgram,
    compileHighShaderGpuProgram,
    DefaultBatcher,
    generateTextureBatchBit,
    generateTextureBatchBitGl,
    getBatchSamplersUniformGroup,
    HighShaderBit,
    roundPixelsBit,
    roundPixelsBitGl,
    Shader,
} from 'pixi.js';

/** Packed beside round pixels (bit 0) in the low half of the vertex's texture id word. */
const ADDITIVE_BIT = 2;

const additiveBit: HighShaderBit = {
    name: 'additive-bit',
    vertex: {
        header: /* wgsl */`
            @out @interpolate(flat) vAdditive: u32;
        `,
        main: /* wgsl */`
            vAdditive = aTextureIdAndRound.x & ${ADDITIVE_BIT}u;
        `,
    },
    fragment: {
        header: /* wgsl */`
            @in @interpolate(flat) vAdditive: u32;
        `,
        end: /* wgsl */`
            if (vAdditive != 0u) { finalColor.a = 0.0; }
        `,
    },
};

// No `flat`: Pixi's GL programs may compile as GLSL ES 1.0, which reserves it. The mark is the same
// on all four vertices of a quad, so the interpolated value is exactly it.
const additiveBitGl: HighShaderBit = {
    name: 'additive-bit',
    vertex: {
        header: /* glsl */`
            out float vAdditive;
        `,
        main: /* glsl */`
            vAdditive = (mod(aTextureIdAndRound.x, ${ADDITIVE_BIT * 2}.) >= ${ADDITIVE_BIT}.) ? 1. : 0.;
        `,
    },
    fragment: {
        header: /* glsl */`
            in float vAdditive;
        `,
        end: /* glsl */`
            if (vAdditive > 0.5) finalColor.a = 0.0;
        `,
    },
};

/** Pixi's `DefaultShader` with the additive bit. */
class AdditiveBatchShader extends Shader {
    public readonly maxTextures: number;

    constructor(maxTextures: number) {
        super({
            glProgram: compileHighShaderGlProgram({ name: 'batch-additive', bits: [ colorBitGl, generateTextureBatchBitGl(maxTextures), roundPixelsBitGl, additiveBitGl ] }),
            gpuProgram: compileHighShaderGpuProgram({ name: 'batch-additive', bits: [ colorBit, generateTextureBatchBit(maxTextures), roundPixelsBit, additiveBit ] }),
            resources: { batchSamplers: getBatchSamplersUniformGroup(maxTextures) },
        });

        this.maxTextures = maxTextures;
    }
}

const shaders = new Map<number, AdditiveBatchShader>();

const getShader = (maxTextures: number): AdditiveBatchShader => {
    let shader = shaders.get(maxTextures);

    if (!shader) {
        shader = new AdditiveBatchShader(maxTextures);
        shaders.set(maxTextures, shader);
    }

    return shader;
};

/** What the batcher reads off a sprite. */
interface AdditiveRenderable {
    batchAdditive?: boolean;
}

type QuadElement = Parameters<DefaultBatcher['packQuadAttributes']>[0];

let installed = false;

/**
 * Patches `DefaultBatcher` once per page: every batch build starts on the additive shader (a
 * batcher made before, or given Pixi's shader again by `_updateMaxTextures`, is moved to it then),
 * and a flagged sprite's vertices carry the mark.
 */
export const installAdditiveBatcher = (): void => {
    if (installed) return;

    installed = true;

    const prototype = DefaultBatcher.prototype as unknown as {
        begin: (this: DefaultBatcher) => void;
        packQuadAttributes: (this: DefaultBatcher, element: QuadElement, float32View: Float32Array, uint32View: Uint32Array, index: number, textureId: number) => void;
    };
    const begin = prototype.begin;
    const packQuadAttributes = prototype.packQuadAttributes;

    prototype.begin = function (this: DefaultBatcher) {
        const shader = this.shader as Shader & { maxTextures?: number };

        if (shader && !(shader instanceof AdditiveBatchShader)) this.shader = getShader(shader.maxTextures ?? 16);

        begin.call(this);
    };

    prototype.packQuadAttributes = function (this: DefaultBatcher, element: QuadElement, float32View: Float32Array, uint32View: Uint32Array, index: number, textureId: number) {
        packQuadAttributes.call(this, element, float32View, uint32View, index, textureId);

        if (!((element as Partial<BatchableSprite>).renderable as AdditiveRenderable | undefined)?.batchAdditive) return;

        const textureIdAndFlags = (textureId << 16) | ((element.roundPixels | ADDITIVE_BIT) & 0xFFFF);

        uint32View[index + 5] = textureIdAndFlags;
        uint32View[index + 11] = textureIdAndFlags;
        uint32View[index + 17] = textureIdAndFlags;
        uint32View[index + 23] = textureIdAndFlags;
    };
};

// At load, before any application renders.
installAdditiveBatcher();
