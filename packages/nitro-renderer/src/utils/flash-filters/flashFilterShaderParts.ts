/**
 * What every `FlashFilter` pass shares: the vertex stage Pixi's filters use, and the pixel
 * addressing the passes read with. The passes are GLSL ES 3.0 (`texelFetch`): a fragment opens
 * with `#version 300 es`, which is how Pixi knows to compile it so, and goes on
 * `precision highp float;` (the vertex stage's `uInputSize` is highp, and a uniform both stages
 * declare must agree). They fetch exact texels (`texelFetch`, `textureLoad`) rather than
 * sampling, so nothing is blended between neighbours, and treat everything outside the input
 * frame as transparent, as Flash does past a bitmap's edge.
 */

/** GLSL vertex stage (Pixi's default filter vertex). */
export const FLASH_FILTER_GL_VERTEX = `in vec2 aPosition;
out vec2 vTextureCoord;

uniform vec4 uInputSize;
uniform vec4 uOutputFrame;
uniform vec4 uOutputTexture;

void main(void)
{
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0 * uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;
    gl_Position = vec4(position, 0.0, 1.0);
    vTextureCoord = aPosition * (uOutputFrame.zw * uInputSize.zw);
}
`;

/** GLSL helpers: the pixel a fragment is, and whether a pixel is inside the input frame. */
export const FLASH_FILTER_GL_PIXELS = `
uniform highp vec4 uInputSize;
uniform highp vec4 uInputClamp;

ivec2 pixelOf(vec2 uv) { return ivec2(floor(uv * uInputSize.xy)); }

// uInputClamp is the frame inset by half a texel (for linear sampling): floored, it is the first and last pixel
bool insideFrame(ivec2 q)
{
    ivec2 lo = ivec2(floor(uInputClamp.xy * uInputSize.xy));
    ivec2 hi = ivec2(floor(uInputClamp.zw * uInputSize.xy));
    return all(greaterThanEqual(q, lo)) && all(lessThanEqual(q, hi));
}
`;

/** WGSL: the global filter uniforms, the input texture, the vertex stage and the same helpers. */
export const FLASH_FILTER_WGSL_COMMON = `
struct GlobalFilterUniforms {
  uInputSize: vec4<f32>,
  uInputPixel: vec4<f32>,
  uInputClamp: vec4<f32>,
  uOutputFrame: vec4<f32>,
  uGlobalFrame: vec4<f32>,
  uOutputTexture: vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler: sampler;

struct VSOutput {
  @builtin(position) position: vec4<f32>,
  @location(0) uv: vec2<f32>,
};

@vertex
fn mainVertex(@location(0) aPosition: vec2<f32>) -> VSOutput {
  var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;
  position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
  position.y = position.y * (2.0 * gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;
  return VSOutput(vec4(position, 0.0, 1.0), aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw));
}

fn pixelOf(uv: vec2<f32>) -> vec2<i32> { return vec2<i32>(floor(uv * gfu.uInputSize.xy)); }

fn insideFrame(q: vec2<i32>) -> bool {
  let lo = vec2<i32>(floor(gfu.uInputClamp.xy * gfu.uInputSize.xy));
  let hi = vec2<i32>(floor(gfu.uInputClamp.zw * gfu.uInputSize.xy));
  return all(q >= lo) && all(q <= hi);
}
`;
