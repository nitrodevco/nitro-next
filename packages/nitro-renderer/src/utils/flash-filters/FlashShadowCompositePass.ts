import { Filter, GlProgram, GpuProgram, Texture, TextureSource, UniformGroup } from 'pixi.js';

import { FLASH_FILTER_GL_PIXELS, FLASH_FILTER_GL_VERTEX, FLASH_FILTER_WGSL_COMMON } from './flashFilterShaderParts';

// Flash's colour arithmetic, on unpremultiplied values, with the result premultiplied for Pixi.
const GL_COMPOSITE = `
vec4 composite(vec4 src, float m)
{
    float sa = src.a;
    vec3 s = sa > 0.0 ? src.rgb / sa : vec3(0.0);
    vec3 c = uColor.rgb;
    float strength = uParams.x;
    bool inner = uParams.y > 0.5, knockout = uParams.z > 0.5, hideObject = uParams.w > 0.5;
    float ga = min(1.0, m * strength) * uColor.a;
    if (inner) ga *= sa;
    bool showSource = !knockout && !hideObject;
    vec3 rgb;
    float aa;
    if (inner)
    {
        if (showSource) { aa = sa; float t = sa > 0.0 ? ga / sa : 0.0; rgb = s * (1.0 - t) + c * t; }
        else { aa = ga; rgb = c; }
    }
    else
    {
        float glowA = knockout ? ga * (1.0 - sa) : ga;
        if (showSource) { aa = sa + glowA * (1.0 - sa); rgb = aa > 0.0 ? (s * sa + c * glowA * (1.0 - sa)) / aa : vec3(0.0); }
        else { aa = glowA; rgb = c; }
    }
    return vec4(rgb * aa, aa);
}
`;

const FRAGMENT = `#version 300 es
precision highp float;
precision highp int;
in vec2 vTextureCoord;
out vec4 finalColor;
uniform sampler2D uTexture;
uniform sampler2D uSourceTexture;
uniform vec4 uColor;
uniform vec4 uParams;
${FLASH_FILTER_GL_PIXELS}
${GL_COMPOSITE}
void main(void)
{
    ivec2 p = pixelOf(vTextureCoord);
    finalColor = composite(texelFetch(uSourceTexture, p, 0), texelFetch(uTexture, p, 0).a);
}
`;

const WGSL = `${FLASH_FILTER_WGSL_COMMON}
struct CompositeUniforms {
  uColor: vec4<f32>,
  uParams: vec4<f32>,
};
@group(1) @binding(0) var<uniform> compositeUniforms: CompositeUniforms;
@group(1) @binding(1) var uSourceTexture: texture_2d<f32>;

@fragment
fn mainFragment(@location(0) uv: vec2<f32>) -> @location(0) vec4<f32> {
  let p = pixelOf(uv);
  let src = textureLoad(uSourceTexture, p, 0);
  let m = textureLoad(uTexture, p, 0).a;
  let sa = src.a;
  var s = vec3<f32>(0.0);
  if (sa > 0.0) { s = src.rgb / sa; }
  let c = compositeUniforms.uColor.rgb;
  let inner = compositeUniforms.uParams.y > 0.5;
  let knockout = compositeUniforms.uParams.z > 0.5;
  let hideObject = compositeUniforms.uParams.w > 0.5;
  var ga = min(1.0, m * compositeUniforms.uParams.x) * compositeUniforms.uColor.a;
  if (inner) { ga = ga * sa; }
  let showSource = !knockout && !hideObject;
  var rgb = c;
  var aa = 0.0;
  if (inner) {
    if (showSource) {
      aa = sa;
      var t = 0.0;
      if (sa > 0.0) { t = ga / sa; }
      rgb = s * (1.0 - t) + c * t;
    } else { aa = ga; }
  } else {
    var glowA = ga;
    if (knockout) { glowA = ga * (1.0 - sa); }
    if (showSource) {
      aa = sa + glowA * (1.0 - sa);
      rgb = vec3<f32>(0.0);
      if (aa > 0.0) { rgb = (s * sa + c * glowA * (1.0 - sa)) / aa; }
    } else { aa = glowA; }
  }
  return vec4<f32>(rgb * aa, aa);
}
`;

/**
 * The last step of a glow or shadow: the blurred mask, scaled by the strength and the colour's
 * alpha, laid behind the object (outer), over it inside its shape (inner), alone where the object
 * is not (knockout), or without the object (hideObject). Reads the blurred mask as its input and
 * the unfiltered object as `uSourceTexture`, which must be the same size.
 */
export class FlashShadowCompositePass extends Filter {
    private readonly compositeUniforms: { uColor: Float32Array; uParams: Float32Array };

    constructor() {
        const compositeUniforms = new UniformGroup({
            uColor: { value: new Float32Array(4), type: 'vec4<f32>' },
            uParams: { value: new Float32Array(4), type: 'vec4<f32>' },
        });

        super({
            glProgram: GlProgram.from({ vertex: FLASH_FILTER_GL_VERTEX, fragment: FRAGMENT, name: 'flash-shadow-composite' }),
            gpuProgram: GpuProgram.from({ vertex: { source: WGSL, entryPoint: 'mainVertex' }, fragment: { source: WGSL, entryPoint: 'mainFragment' } }),
            resources: { compositeUniforms, uSourceTexture: Texture.EMPTY.source },
        });

        this.compositeUniforms = compositeUniforms.uniforms;
    }

    public configure(color: number, alpha: number, strength: number, inner: boolean, knockout: boolean, hideObject: boolean): void {
        const uniforms = this.compositeUniforms;

        uniforms.uColor[0] = ((color >> 16) & 255) / 255;
        uniforms.uColor[1] = ((color >> 8) & 255) / 255;
        uniforms.uColor[2] = (color & 255) / 255;
        uniforms.uColor[3] = alpha;
        uniforms.uParams[0] = strength;
        uniforms.uParams[1] = inner ? 1 : 0;
        uniforms.uParams[2] = knockout ? 1 : 0;
        uniforms.uParams[3] = hideObject ? 1 : 0;
    }

    /** The unfiltered object, read alongside the blurred mask. */
    public set sourceTexture(source: TextureSource) {
        this.resources.uSourceTexture = source;
    }
}
