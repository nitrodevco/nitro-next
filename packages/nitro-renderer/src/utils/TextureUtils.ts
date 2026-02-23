import type { Container, ExtractImageOptions, ExtractOptions, GenerateTextureOptions } from 'pixi.js';
import { Matrix, RenderTexture, Sprite, Texture } from 'pixi.js';

import { GetRenderer } from './GetRenderer';

export class TextureUtils {
    public static generateTexture(options: GenerateTextureOptions | Container) {
        return this.getRenderer().textureGenerator.generateTexture(options);
    }

    public static generateTextureFromImage(image: HTMLImageElement): Texture {
        return Texture.from(image);
    }

    public static async generateImage(options: ExtractImageOptions | Container | Texture) {
        return this.getExtractor().image(options);
    }

    public static async generateImageUrl(options: ExtractImageOptions | Container | Texture) {
        return this.getExtractor().base64(options);
    }

    public static generateCanvas(options: ExtractOptions | Container | Texture) {
        return this.getExtractor().canvas(options);
    }

    public static clearRenderTexture(texture: Texture): Texture {
        return this.writeToTexture(new Sprite(Texture.EMPTY), texture);
    }

    public static createRenderTexture(width: number, height: number) {
        if (width < 0 || height < 0) return undefined;

        return RenderTexture.create({ width, height });
    }

    public static createAndFillRenderTexture(
        width: number,
        height: number,
        color: number = 16777215,
    ): Texture | undefined {
        if (width < 0 || height < 0) return undefined;

        const renderTexture = this.createRenderTexture(width, height);

        if (renderTexture) {
            return this.clearAndFillRenderTexture(renderTexture, color);
        }

        return renderTexture;
    }

    public static createAndWriteRenderTexture(
        width: number,
        height: number,
        container: Container,
        transform: Matrix | undefined = undefined,
    ): Texture | undefined {
        const renderTexture = this.createRenderTexture(width, height);

        if (renderTexture) {
            return this.writeToTexture(container, renderTexture, true, transform);
        }

        return renderTexture;
    }

    public static clearAndFillRenderTexture(texture: Texture, color: number = 16777215): Texture {
        if (!texture) return texture;

        const sprite = new Sprite(Texture.WHITE);

        sprite.tint = color;

        sprite.width = texture.width;
        sprite.height = texture.height;

        return this.writeToTexture(sprite, texture);
    }

    public static writeToTexture(
        container: Container,
        target: Texture,
        clear: boolean = true,
        transform: Matrix | undefined = undefined,
    ): Texture {
        if (container && target)
            this.getRenderer().render({
                container,
                target,
                clear,
                transform,
            });

        return target;
    }

    public static flipTextureHorizontal(texture: Texture) {
        if (!texture) return texture;

        const matrix = new Matrix();

        matrix.scale(-1, 1);
        matrix.translate(texture.width, 0);

        return this.createAndWriteRenderTexture(texture.width, texture.height, new Sprite(texture), matrix);
    }

    public static flipTextureVertical(texture: Texture) {
        if (!texture) return texture;

        const matrix = new Matrix();

        matrix.scale(1, -1);
        matrix.translate(0, texture.height);

        return this.createAndWriteRenderTexture(texture.width, texture.height, new Sprite(texture), matrix);
    }

    public static flipTextureHorizontalAndVertical(texture: Texture) {
        if (!texture) return texture;

        const matrix = new Matrix();

        matrix.scale(-1, -1);
        matrix.translate(texture.width, texture.height);

        return this.createAndWriteRenderTexture(texture.width, texture.height, new Sprite(texture), matrix);
    }

    public static getPixels(options: ExtractOptions | Container | Texture) {
        return this.getExtractor().pixels(options);
    }

    public static getRenderer() {
        return GetRenderer();
    }

    public static getExtractor() {
        return this.getRenderer().extract;
    }
}
