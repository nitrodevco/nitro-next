import { Filter, FilterSystem, GlProgram, GpuProgram, RenderSurface, Texture, TexturePool } from 'pixi.js';

import { FlashBoxBlurPass } from './FlashBoxBlurPass';
import { FLASH_FILTER_GL_VERTEX, FLASH_FILTER_WGSL_COMMON } from './flashFilterShaderParts';
import { FlashShadowCompositePass } from './FlashShadowCompositePass';
import { FlashShadowMaskPass } from './FlashShadowMaskPass';

/** What the filter does: blur the object, or put a glow or shadow of its shape behind, inside or instead of it. */
export interface FlashFilterOptions {
    blurX: number;
    blurY: number;
    /** Box passes (Flash's quality: 1 low, 2 medium, 3 high). */
    quality: number;
    /** A glow or shadow, rather than a plain blur. */
    shadow?: {
        dx: number;
        dy: number;
        color: number;
        alpha: number;
        strength: number;
        inner: boolean;
        knockout: boolean;
        hideObject: boolean;
    };
}

// never drawn with: apply() runs the passes instead
const PASSTHROUGH_FRAGMENT = `in vec2 vTextureCoord; out vec4 finalColor; uniform sampler2D uTexture;
void main(void) { finalColor = texture(uTexture, vTextureCoord); }`;
const PASSTHROUGH_WGSL = `${FLASH_FILTER_WGSL_COMMON}
@fragment fn mainFragment(@location(0) uv: vec2<f32>) -> @location(0) vec4<f32> { return textureSample(uTexture, uSampler, uv); }`;

/**
 * Flash's `BlurFilter` and `GlowFilter` on the GPU, computed as Flash computes them: box blurs
 * repeated `quality` times, and for a glow the object's alpha blurred, scaled by the strength and
 * coloured, composited behind, inside or instead of the object. `pixi-filters`' `GlowFilter`
 * samples a fixed distance with its own falloff instead, so a Flash glow's blur, strength and
 * quality could only be approximated through it - and a knockout not at all.
 *
 * The passes keep no per-object state, so one instance can serve every object that shares a look.
 */
export class FlashFilter extends Filter {
    private readonly options: FlashFilterOptions;
    private readonly horizontal = new FlashBoxBlurPass(true);
    private readonly vertical = new FlashBoxBlurPass(false);
    private readonly mask = new FlashShadowMaskPass();
    private readonly composite = new FlashShadowCompositePass();

    constructor(options: FlashFilterOptions) {
        const quality = Math.max(1, Math.round(options.quality));
        const reach = Math.ceil(Math.max(options.blurX, options.blurY) / 2) * quality;
        const offset = options.shadow ? Math.ceil(Math.hypot(options.shadow.dx, options.shadow.dy)) : 0;

        super({
            glProgram: GlProgram.from({ vertex: FLASH_FILTER_GL_VERTEX, fragment: PASSTHROUGH_FRAGMENT, name: 'flash-filter' }),
            gpuProgram: GpuProgram.from({
                vertex: { source: PASSTHROUGH_WGSL, entryPoint: 'mainVertex' },
                fragment: { source: PASSTHROUGH_WGSL, entryPoint: 'mainFragment' },
            }),
            resources: {},
            padding: reach + offset + 1,
        });

        this.options = { ...options, quality };
        this.horizontal.size = options.blurX;
        this.vertical.size = options.blurY;

        const shadow = options.shadow;

        if (shadow) {
            this.mask.configure(shadow.dx, shadow.dy, shadow.inner);
            this.composite.configure(shadow.color, shadow.alpha, shadow.strength, shadow.inner, shadow.knockout, shadow.hideObject);
        }
    }

    public override apply(filterManager: FilterSystem, input: Texture, output: RenderSurface, clearMode: boolean): void {
        if (!this.options.shadow) {
            this.blur(filterManager, input, output, clearMode);

            return;
        }

        const mask = TexturePool.getSameSizeTexture(input);
        const blurred = TexturePool.getSameSizeTexture(input);

        filterManager.applyFilter(this.mask, input, mask, true);
        this.blur(filterManager, mask, blurred, true);
        this.composite.sourceTexture = input.source;
        filterManager.applyFilter(this.composite, blurred, output, clearMode);
        TexturePool.returnTexture(mask);
        TexturePool.returnTexture(blurred);
    }

    /** `quality` rounds of a horizontal and a vertical box blur, from `input` into `output`. */
    private blur(filterManager: FilterSystem, input: Texture, output: RenderSurface, clearMode: boolean): void {
        const passes: FlashBoxBlurPass[] = [];

        for (let round = 0; round < this.options.quality; round++) {
            if (this.horizontal.size > 1) passes.push(this.horizontal);
            if (this.vertical.size > 1) passes.push(this.vertical);
        }

        if (!passes.length) {
            // size 1 on both axes: a copy
            filterManager.applyFilter(this.horizontal, input, output, clearMode);

            return;
        }

        let from = input;
        const temps = [ TexturePool.getSameSizeTexture(input), TexturePool.getSameSizeTexture(input) ];

        passes.forEach((pass, index) => {
            if (index === passes.length - 1) {
                filterManager.applyFilter(pass, from, output, clearMode);

                return;
            }

            const to = temps[index % 2];

            filterManager.applyFilter(pass, from, to, true);
            from = to;
        });

        temps.forEach(texture => TexturePool.returnTexture(texture));
    }
}

/** Flash `new GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout)`, with its defaults. */
export const createFlashGlowFilter = (color: number = 0xFF0000, alpha: number = 1, blurX: number = 6, blurY: number = 6, strength: number = 2, quality: number = 1, inner: boolean = false, knockout: boolean = false): FlashFilter => new FlashFilter({
    blurX,
    blurY,
    quality,
    shadow: { dx: 0, dy: 0, color: color >>> 0, alpha, strength, inner, knockout, hideObject: false },
});
