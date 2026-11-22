import { defaultFilterVert, Filter, GlProgram, GpuProgram } from 'pixi.js';

/**
 * Flash `RoomObjectSpriteVisualization.extractDarknessToAlpha`, which `getImage` ran over an `add`
 * layer's bitmap when the image had no background colour. Additive art is drawn on black, and black
 * adds nothing to a room; over an image's transparent pixels it would be a black box. So every pixel
 * whose HSL lightness is at most 128 (of 255) keeps its hue and saturation, is lifted to lightness
 * 128, and loses alpha in proportion: `alpha * lightness / 128`. Brighter pixels are left as they are.
 *
 * Flash worked on straight 8-bit ARGB through `ColorConverter.rgbToHSL` / `hslToRGB`, which round
 * each component to a byte; the shader rounds where they did. Pixi textures are premultiplied, so
 * it un-premultiplies first and premultiplies the result again.
 *
 * Flash then drew the result with the sprite's `ColorTransform` - colour and alpha multipliers on
 * the converted pixels - so the multipliers are applied here, after the conversion
 * (`setColorTransform`), and the sprite itself is drawn untinted and opaque. The filter draws its
 * result additively, as Flash's `draw` did with the sprite's blend mode.
 */
const FRAGMENT = `
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec4 uMultiplier;

float hueToChannel(float t1, float t2, float hue)
{
    if (hue < 0.0) hue += 1.0;
    else if (hue > 1.0) hue -= 1.0;

    if ((hue * 6.0) < 1.0) return t1 + ((t2 - t1) * 6.0 * hue);
    if ((hue * 2.0) < 1.0) return t2;
    if ((hue * 3.0) < 2.0) return t1 + ((t2 - t1) * 6.0 * ((2.0 / 3.0) - hue));

    return t1;
}

void main()
{
    vec4 color = texture(uTexture, vTextureCoord);

    if (color.a <= 0.0) {
        finalColor = vec4(0.0);

        return;
    }

    vec3 rgb = floor(((color.rgb / color.a) * 255.0) + 0.5) / 255.0;
    float alpha = floor((color.a * 255.0) + 0.5);

    float high = max(rgb.r, max(rgb.g, rgb.b));
    float low = min(rgb.r, min(rgb.g, rgb.b));
    float delta = high - low;
    float lightness = 0.5 * (high + low);
    float lightnessByte = floor((lightness * 255.0) + 0.5);

    if (lightnessByte <= 128.0) {
        float hue = 0.0;
        float saturation = 0.0;

        if (delta > 0.0) {
            if (high == rgb.r) hue = (60.0 * (rgb.g - rgb.b) / delta) + ((rgb.g > rgb.b) ? 0.0 : 360.0);
            else if (high == rgb.g) hue = (60.0 * (rgb.b - rgb.r) / delta) + 120.0;
            else hue = (60.0 * (rgb.r - rgb.g) / delta) + 240.0;

            saturation = (lightness <= 0.5) ? ((delta / lightness) * 0.5) : ((delta / (1.0 - lightness)) * 0.5);
        }

        hue = floor(((hue / 360.0) * 255.0) + 0.5) / 255.0;
        saturation = floor((saturation * 255.0) + 0.5) / 255.0;

        float level = 128.0 / 255.0;

        if (saturation > 0.0) {
            float t2 = level + saturation - (level * saturation);
            float t1 = (2.0 * level) - t2;

            rgb = vec3(hueToChannel(t1, t2, hue + (1.0 / 3.0)), hueToChannel(t1, t2, hue), hueToChannel(t1, t2, hue - (1.0 / 3.0)));
        } else {
            rgb = vec3(level);
        }

        rgb = floor((rgb * 255.0) + 0.5) / 255.0;
        alpha = floor((alpha * lightnessByte) / 128.0);
    }

    float outAlpha = (alpha / 255.0) * uMultiplier.a;

    finalColor = vec4(rgb * uMultiplier.rgb * outAlpha, outAlpha);
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

struct DarknessToAlphaUniforms {
    uMultiplier: vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> darknessToAlphaUniforms: DarknessToAlphaUniforms;

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

fn hueToChannel(t1: f32, t2: f32, hueIn: f32) -> f32
{
    var hue = hueIn;

    if (hue < 0.0) {
        hue += 1.0;
    } else if (hue > 1.0) {
        hue -= 1.0;
    }

    if ((hue * 6.0) < 1.0) {
        return t1 + ((t2 - t1) * 6.0 * hue);
    }

    if ((hue * 2.0) < 1.0) {
        return t2;
    }

    if ((hue * 3.0) < 2.0) {
        return t1 + ((t2 - t1) * 6.0 * ((2.0 / 3.0) - hue));
    }

    return t1;
}

@vertex
fn mainVertex(@location(0) aPosition: vec2<f32>) -> VSOutput {
    return VSOutput(filterVertexPosition(aPosition), filterTextureCoord(aPosition));
}

@fragment
fn mainFragment(@location(0) uv: vec2<f32>) -> @location(0) vec4<f32> {
    let color = textureSample(uTexture, uSampler, uv);

    if (color.a <= 0.0) {
        return vec4<f32>(0.0);
    }

    var rgb = floor(((color.rgb / color.a) * 255.0) + 0.5) / 255.0;
    var alpha = floor((color.a * 255.0) + 0.5);

    let high = max(rgb.r, max(rgb.g, rgb.b));
    let low = min(rgb.r, min(rgb.g, rgb.b));
    let delta = high - low;
    let lightness = 0.5 * (high + low);
    let lightnessByte = floor((lightness * 255.0) + 0.5);

    if (lightnessByte <= 128.0) {
        var hue = 0.0;
        var saturation = 0.0;

        if (delta > 0.0) {
            if (high == rgb.r) {
                hue = (60.0 * (rgb.g - rgb.b) / delta) + select(360.0, 0.0, rgb.g > rgb.b);
            } else if (high == rgb.g) {
                hue = (60.0 * (rgb.b - rgb.r) / delta) + 120.0;
            } else {
                hue = (60.0 * (rgb.r - rgb.g) / delta) + 240.0;
            }

            saturation = select((delta / (1.0 - lightness)) * 0.5, (delta / lightness) * 0.5, lightness <= 0.5);
        }

        hue = floor(((hue / 360.0) * 255.0) + 0.5) / 255.0;
        saturation = floor((saturation * 255.0) + 0.5) / 255.0;

        let level = 128.0 / 255.0;

        if (saturation > 0.0) {
            let t2 = level + saturation - (level * saturation);
            let t1 = (2.0 * level) - t2;

            rgb = vec3<f32>(hueToChannel(t1, t2, hue + (1.0 / 3.0)), hueToChannel(t1, t2, hue), hueToChannel(t1, t2, hue - (1.0 / 3.0)));
        } else {
            rgb = vec3<f32>(level);
        }

        rgb = floor((rgb * 255.0) + 0.5) / 255.0;
        alpha = floor((alpha * lightnessByte) / 128.0);
    }

    let multiplier = darknessToAlphaUniforms.uMultiplier;
    let outAlpha = (alpha / 255.0) * multiplier.a;

    return vec4<f32>(rgb * multiplier.rgb * outAlpha, outAlpha);
}
`;

export class DarknessToAlphaFilter extends Filter {
    constructor() {
        super({
            glProgram: GlProgram.from({
                vertex: defaultFilterVert,
                fragment: FRAGMENT,
                name: 'darkness-to-alpha-filter',
            }),
            gpuProgram: GpuProgram.from({
                vertex: { source: WGSL, entryPoint: 'mainVertex' },
                fragment: { source: WGSL, entryPoint: 'mainFragment' },
            }),
            resources: {
                darknessToAlphaUniforms: { uMultiplier: { value: new Float32Array([ 1, 1, 1, 1 ]), type: 'vec4<f32>' } },
            },
            resolution: 'inherit',
            blendMode: 'add',
        });
    }

    /** The sprite's `ColorTransform`: `color` as 0xRRGGBB multipliers, `alpha` 0-1. */
    public setColorTransform(color: number, alpha: number): void {
        const multiplier = this.resources.darknessToAlphaUniforms.uniforms.uMultiplier as Float32Array;

        multiplier[0] = ((color >> 16) & 0xFF) / 255;
        multiplier[1] = ((color >> 8) & 0xFF) / 255;
        multiplier[2] = (color & 0xFF) / 255;
        multiplier[3] = Math.max(0, Math.min(1, alpha));
    }
}
