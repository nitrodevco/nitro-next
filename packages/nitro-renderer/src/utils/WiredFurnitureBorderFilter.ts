import { defaultFilterVert, Filter, GlProgram, GpuProgram } from 'pixi.js';

/**
 * The look of a furni picked in a wired dialog: `RoomObjectHighLighter._filterBW`, which is two
 * Flash filters run one after the other, done here in a single pass.
 *
 * 1. A `ColorMatrixFilter` that keeps a quarter of each colour channel and fills the rest with
 *    the blue-grey (154, 179.5, 179.5): `c * 0.25 + 0.75 * 154 (+ 25.5 for green and blue)`.
 * 2. The Pixel Bender shader `furnitureFilter.pbj` ("Wired Furniture Border filter"), which turns
 *    every pixel whose red is 116/255 and green 141/255 white. Those are exactly what step 1
 *    makes of a furni's black outline, so a picked furni gets a white border. Worked back through
 *    the matrix with 8-bit rounding, that is a source pixel with red 0-3 and green 0-1 - which is
 *    the test made here, on the source, where no float rounding can miss it.
 *
 * Flash ran both on straight alpha; Pixi textures are premultiplied, so the shader
 * un-premultiplies first and premultiplies the result again. The filter has no settings, so one
 * instance serves every picked furni.
 */
const FRAGMENT = `
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;

void main()
{
    vec4 color = texture(uTexture, vTextureCoord);

    if (color.a <= 0.0) {
        finalColor = color;

        return;
    }

    vec3 source = color.rgb / color.a;
    vec3 result = min((source * 0.25) + vec3(115.5, 141.0, 141.0) / 255.0, vec3(1.0));

    if ((source.r * 255.0 < 3.5) && (source.g * 255.0 < 1.5)) result = vec3(1.0);

    finalColor = vec4(result * color.a, color.a);
}
`;

const WGSL = `
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

fn filterVertexPosition(aPosition: vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0 * gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord(aPosition: vec2<f32>) -> vec2<f32>
{
    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

@vertex
fn mainVertex(@location(0) aPosition: vec2<f32>) -> VSOutput {
    return VSOutput(filterVertexPosition(aPosition), filterTextureCoord(aPosition));
}

@fragment
fn mainFragment(@location(0) uv: vec2<f32>) -> @location(0) vec4<f32> {
    let color = textureSample(uTexture, uSampler, uv);

    if (color.a <= 0.0) {
        return color;
    }

    let source = color.rgb / color.a;
    var result = min((source * 0.25) + vec3<f32>(115.5, 141.0, 141.0) / 255.0, vec3<f32>(1.0));

    if ((source.r * 255.0 < 3.5) && (source.g * 255.0 < 1.5)) {
        result = vec3<f32>(1.0);
    }

    return vec4<f32>(result * color.a, color.a);
}
`;

export class WiredFurnitureBorderFilter extends Filter {
    constructor() {
        super({
            glProgram: GlProgram.from({
                vertex: defaultFilterVert,
                fragment: FRAGMENT,
                name: 'wired-furniture-border-filter',
            }),
            gpuProgram: GpuProgram.from({
                vertex: { source: WGSL, entryPoint: 'mainVertex' },
                fragment: { source: WGSL, entryPoint: 'mainFragment' },
            }),
            resources: {},
            resolution: 'inherit',
        });
    }
}
