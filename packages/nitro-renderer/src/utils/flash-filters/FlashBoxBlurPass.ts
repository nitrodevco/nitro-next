import { Filter, GlProgram, GpuProgram, UniformGroup } from 'pixi.js';

import { FLASH_FILTER_GL_PIXELS, FLASH_FILTER_GL_VERTEX, FLASH_FILTER_WGSL_COMMON } from './flashFilterShaderParts';

/** The widest box a pass blurs over: Flash's blur stops at 255. */
const MAX_SIZE = 256;

const FRAGMENT = `#version 300 es
precision highp float;
precision highp int;
in vec2 vTextureCoord;
out vec4 finalColor;
uniform sampler2D uTexture;
uniform vec2 uAxis;
uniform float uSize;
${FLASH_FILTER_GL_PIXELS}
void main(void)
{
    ivec2 p = pixelOf(vTextureCoord);
    int size = int(uSize);
    int half_ = size / 2;
    ivec2 axis = ivec2(uAxis);
    vec4 sum = vec4(0.0);
    for (int k = 0; k < ${MAX_SIZE}; k++)
    {
        if (k >= size) break;
        ivec2 q = p + axis * (k - half_);
        if (insideFrame(q)) sum += texelFetch(uTexture, q, 0);
    }
    finalColor = sum / float(size);
}
`;

const WGSL = `${FLASH_FILTER_WGSL_COMMON}
struct BlurUniforms {
  uAxis: vec2<f32>,
  uSize: f32,
};
@group(1) @binding(0) var<uniform> blurUniforms: BlurUniforms;

@fragment
fn mainFragment(@location(0) uv: vec2<f32>) -> @location(0) vec4<f32> {
  let p = pixelOf(uv);
  let size = i32(blurUniforms.uSize);
  let half_ = size / 2;
  let axis = vec2<i32>(blurUniforms.uAxis);
  var sum = vec4<f32>(0.0);
  for (var k = 0; k < size; k++) {
    let q = p + axis * (k - half_);
    if (insideFrame(q)) { sum += textureLoad(uTexture, q, 0); }
  }
  return sum / f32(size);
}
`;

/**
 * One box blur along one axis, as Flash's `BlurFilter` makes it: each pixel the average of
 * `size` pixels, from floor(size / 2) before it to the rest after, pixels past the edge counting
 * as transparent. Blurs whatever channels it is given (premultiplied colour, or a mask's alpha).
 */
export class FlashBoxBlurPass extends Filter {
    private readonly blurUniforms: { uAxis: Float32Array; uSize: number };

    constructor(horizontal: boolean) {
        const blurUniforms = new UniformGroup({
            uAxis: { value: new Float32Array(horizontal ? [ 1, 0 ] : [ 0, 1 ]), type: 'vec2<f32>' },
            uSize: { value: 1, type: 'f32' },
        });

        super({
            glProgram: GlProgram.from({ vertex: FLASH_FILTER_GL_VERTEX, fragment: FRAGMENT, name: 'flash-box-blur' }),
            gpuProgram: GpuProgram.from({ vertex: { source: WGSL, entryPoint: 'mainVertex' }, fragment: { source: WGSL, entryPoint: 'mainFragment' } }),
            resources: { blurUniforms },
        });

        this.blurUniforms = blurUniforms.uniforms;
    }

    /** The box's width in pixels, rounded as Flash rounds it (1 or less: no blur). */
    public set size(value: number) {
        this.blurUniforms.uSize = Math.max(1, Math.min(MAX_SIZE, Math.round(value)));
    }

    public get size(): number {
        return this.blurUniforms.uSize;
    }
}
