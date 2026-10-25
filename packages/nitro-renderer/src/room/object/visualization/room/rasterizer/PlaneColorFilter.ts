/**
 * BitmapData.colorTransform for RoomSpriteCanvas.getColoredBitmapData and
 * PlaneVisualizationLayer: Flash quantizes multipliers to 8.8 fixed point and truncates channels.
 * AIR's vector path handles blocks of 16 pixels with an approximate reciprocal (4095 / 1048576),
 * then uses exact division by 256 for each row's tail. Measured against native BitmapData over
 * all 256 channel inputs; ordinary GPU tint and exact division both differ from that path.
 */
import { defaultFilterVert, Filter, GlProgram, GpuProgram } from 'pixi.js';

const fragment = `
precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;
uniform sampler2D uTexture;
uniform vec3 uMultiplier;
uniform float uVectorWidth;
uniform vec4 uInputSize;
void main() {
    vec4 color = texture(uTexture, vTextureCoord);
    vec3 rgb = color.a > 0.0 ? floor(color.rgb / color.a * 255.0 + 0.5) : vec3(0.0);
    float reciprocal = vTextureCoord.x * uInputSize.x < uVectorWidth ? 4095.0 / 1048576.0 : 1.0 / 256.0;
    rgb = floor(rgb * uMultiplier * reciprocal) / 255.0;
    finalColor = vec4(rgb * color.a, color.a);
}`;

const source = `
struct GlobalFilterUniforms {
    uInputSize: vec4<f32>,
    uInputPixel: vec4<f32>,
    uInputClamp: vec4<f32>,
    uOutputFrame: vec4<f32>,
    uGlobalFrame: vec4<f32>,
    uOutputTexture: vec4<f32>,
};
struct ColorUniforms { uMultiplier: vec3<f32>, uVectorWidth: f32 };
@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> colorUniforms: ColorUniforms;
struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv: vec2<f32>,
};
@vertex
fn mainVertex(@location(0) aPosition: vec2<f32>) -> VSOutput {
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;
    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0 * gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;
    return VSOutput(vec4<f32>(position, 0.0, 1.0), aPosition * gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}
@fragment
fn mainFragment(@location(0) uv: vec2<f32>) -> @location(0) vec4<f32> {
    let color = textureSample(uTexture, uSampler, uv);
    var rgb = vec3<f32>(0.0);
    if (color.a > 0.0) { rgb = floor(color.rgb / color.a * 255.0 + 0.5); }
    let reciprocal = select(1.0 / 256.0, 4095.0 / 1048576.0, uv.x * gfu.uInputSize.x < colorUniforms.uVectorWidth);
    rgb = floor(rgb * colorUniforms.uMultiplier * reciprocal) / 255.0;
    return vec4<f32>(rgb * color.a, color.a);
}`;

export class PlaneColorFilter extends Filter {
    constructor(color: number, width: number) {
        super({
            glProgram: GlProgram.from({ vertex: defaultFilterVert, fragment, name: 'plane-color-transform' }),
            gpuProgram: GpuProgram.from({
                vertex: { source, entryPoint: 'mainVertex' },
                fragment: { source, entryPoint: 'mainFragment' },
            }),
            resources: {
                colorUniforms: {
                    uMultiplier: {
                        value: [ 16, 8, 0 ].map(shift => Math.trunc(((color >> shift) & 255) * 256 / 255)),
                        type: 'vec3<f32>',
                    },
                    uVectorWidth: { value: Math.floor(width / 16) * 16, type: 'f32' },
                },
            },
        });
    }
}
