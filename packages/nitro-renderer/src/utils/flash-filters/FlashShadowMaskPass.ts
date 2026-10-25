import { Filter, GlProgram, GpuProgram, UniformGroup } from 'pixi.js';

import { FLASH_FILTER_GL_PIXELS, FLASH_FILTER_GL_VERTEX, FLASH_FILTER_WGSL_COMMON } from './flashFilterShaderParts';

const FRAGMENT = `#version 300 es
precision highp float;
precision highp int;
in vec2 vTextureCoord;
out vec4 finalColor;
uniform sampler2D uTexture;
uniform vec2 uOffset;
uniform float uInner;
${FLASH_FILTER_GL_PIXELS}
void main(void)
{
    ivec2 q = pixelOf(vTextureCoord) - ivec2(uOffset);
    float a = insideFrame(q) ? texelFetch(uTexture, q, 0).a : 0.0;
    finalColor = vec4(0.0, 0.0, 0.0, uInner > 0.5 ? 1.0 - a : a);
}
`;

const WGSL = `${FLASH_FILTER_WGSL_COMMON}
struct MaskUniforms {
  uOffset: vec2<f32>,
  uInner: f32,
};
@group(1) @binding(0) var<uniform> maskUniforms: MaskUniforms;

@fragment
fn mainFragment(@location(0) uv: vec2<f32>) -> @location(0) vec4<f32> {
  let q = pixelOf(uv) - vec2<i32>(maskUniforms.uOffset);
  var a = 0.0;
  if (insideFrame(q)) { a = textureLoad(uTexture, q, 0).a; }
  if (maskUniforms.uInner > 0.5) { a = 1.0 - a; }
  return vec4<f32>(0.0, 0.0, 0.0, a);
}
`;

/**
 * The first step of a glow or shadow: the object's alpha, moved by the shadow's offset in whole
 * pixels, and for an inner effect turned inside out (where the object is not). Only alpha is kept.
 */
export class FlashShadowMaskPass extends Filter {
    private readonly maskUniforms: { uOffset: Float32Array; uInner: number };

    constructor() {
        const maskUniforms = new UniformGroup({
            uOffset: { value: new Float32Array(2), type: 'vec2<f32>' },
            uInner: { value: 0, type: 'f32' },
        });

        super({
            glProgram: GlProgram.from({ vertex: FLASH_FILTER_GL_VERTEX, fragment: FRAGMENT, name: 'flash-shadow-mask' }),
            gpuProgram: GpuProgram.from({ vertex: { source: WGSL, entryPoint: 'mainVertex' }, fragment: { source: WGSL, entryPoint: 'mainFragment' } }),
            resources: { maskUniforms },
        });

        this.maskUniforms = maskUniforms.uniforms;
    }

    /** The offset in pixels (rounded, as Flash moves a shadow by whole pixels) and whether the effect is inner. */
    public configure(dx: number, dy: number, inner: boolean): void {
        this.maskUniforms.uOffset[0] = Math.round(dx);
        this.maskUniforms.uOffset[1] = Math.round(dy);
        this.maskUniforms.uInner = inner ? 1 : 0;
    }
}
