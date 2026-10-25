import { BufferImageSource, defaultFilterVert, Filter, GlProgram, GpuProgram, Texture } from 'pixi.js';

/**
 * The two post-passes Flash `AvatarImage.getImage` ran over a finished avatar bitmap when the
 * effect carried `<avatar>` data:
 * - `GrayscaleMap`: `convertToGrayscale` (equal 0.33 weights) then `paletteMap` with the
 *   effect's red lookup - every grey level becomes a colour on the background->foreground
 *   gradient, the bitmap's own alpha is kept (the lookup carries no alpha of its own).
 * - `GreenToAlpha`: `copyChannel(GREEN -> ALPHA)` for ink 37 - the pixel's green level becomes
 *   its opacity.
 *
 * Pixi textures are premultiplied, so the shader un-premultiplies before sampling the lookup
 * and premultiplies the result again.
 */
export enum PaletteMapFilterMode {
    GrayscaleMap = 1,
    GreenToAlpha = 2,
}

const FRAGMENT = `
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform sampler2D uLut;
uniform float uMode;

void main()
{
    vec4 color = texture(uTexture, vTextureCoord);

    if (color.a > 0.0) color.rgb /= color.a;

    if (uMode < 1.5) {
        float gray = clamp((color.r * 0.33) + (color.g * 0.33) + (color.b * 0.33), 0.0, 1.0);
        vec4 mapped = texture(uLut, vec2((floor(gray * 255.0) + 0.5) / 256.0, 0.5));

        finalColor = vec4(mapped.rgb * color.a, color.a);
    } else {
        float alpha = color.g;

        finalColor = vec4(color.rgb * alpha, alpha);
    }
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

struct PaletteMapUniforms {
    uMode: f32,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> paletteMapUniforms: PaletteMapUniforms;
@group(1) @binding(1) var uLut: texture_2d<f32>;
@group(1) @binding(2) var uLutSampler: sampler;

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
    var color = textureSample(uTexture, uSampler, uv);

    if (color.a > 0.0) {
        color = vec4<f32>(color.rgb / color.a, color.a);
    }

    if (paletteMapUniforms.uMode < 1.5) {
        let gray = clamp((color.r * 0.33) + (color.g * 0.33) + (color.b * 0.33), 0.0, 1.0);
        let mapped = textureSample(uLut, uLutSampler, vec2<f32>((floor(gray * 255.0) + 0.5) / 256.0, 0.5));

        return vec4<f32>(mapped.rgb * color.a, color.a);
    }

    let alpha = color.g;

    return vec4<f32>(color.rgb * alpha, alpha);
}
`;

export class PaletteMapFilter extends Filter {
    private _lut: Texture;

    /**
     * @param colors the 256-entry lookup as 0xAARRGGBB numbers (`IAvatarDataContainer.reds`);
     * only the colour channels are used - alpha comes from the filtered image. Ignored for
     * `GreenToAlpha`, which needs no lookup.
     */
    constructor(mode: PaletteMapFilterMode, colors: number[] | undefined = undefined) {
        const lut = PaletteMapFilter.createLookup(colors);

        super({
            glProgram: GlProgram.from({
                vertex: defaultFilterVert,
                fragment: FRAGMENT,
                name: 'palette-map-filter',
            }),
            gpuProgram: GpuProgram.from({
                vertex: { source: WGSL, entryPoint: 'mainVertex' },
                fragment: { source: WGSL, entryPoint: 'mainFragment' },
            }),
            resources: {
                paletteMapUniforms: { uMode: { value: mode, type: 'f32' } },
                uLut: lut.source,
                uLutSampler: lut.source.style,
            },
        });

        this._lut = lut;
    }

    public override destroy(): void {
        super.destroy();

        this._lut.destroy(true);
    }

    private static createLookup(colors: number[] | undefined): Texture {
        const data = new Uint8Array(256 * 4);

        for (let i = 0; i < 256; i++) {
            const color = colors?.[i] ?? ((i << 16) | (i << 8) | i);
            const index = i * 4;

            data[index] = (color >> 16) & 0xFF;
            data[index + 1] = (color >> 8) & 0xFF;
            data[index + 2] = color & 0xFF;
            data[index + 3] = 0xFF;
        }

        return new Texture({
            source: new BufferImageSource({
                resource: data,
                width: 256,
                height: 1,
                format: 'rgba8unorm',
                scaleMode: 'nearest',
            }),
        });
    }
}
