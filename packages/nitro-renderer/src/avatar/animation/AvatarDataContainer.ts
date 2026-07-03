import type { IAssetAnimationAvatar, IAvatarDataContainer } from "@nitrodevco/nitro-api";
import type { Filter } from "pixi.js";
import { AdjustmentFilter } from "pixi-filters";

export class AvatarDataContainer implements IAvatarDataContainer {
    private _ink: number;
    private _bg: number;
    private _fg: number;
    private _rgb: number;
    private _r: number;
    private _g: number;
    private _b: number;
    private _alphaMultiplier: number;
    private _colorMap: Map<string, number[]>;
    private _paletteIsGrayscale: boolean;
    private _colorTransform: Filter | undefined;

    constructor(data: IAssetAnimationAvatar) {
        this._ink = data.ink ?? 0;

        let bg = data.background ?? '';
        let fg = data.foreground ?? '';

        bg = bg.replace('#', '');
        fg = fg.replace('#', '');

        this._bg = parseInt(bg, 16);
        this._fg = parseInt(fg, 16);
        this._rgb = parseInt(fg, 16);
        this._r = ((this._rgb >> 16) & 0xFF);
        this._g = ((this._rgb >> 8) & 0xFF);
        this._b = ((this._rgb >> 0) & 0xFF);
        this._alphaMultiplier = 1;
        this._paletteIsGrayscale = true;

        if (this._ink === 37) {
            this._alphaMultiplier = 0.5;
            this._paletteIsGrayscale = false;
        }

        this._colorTransform = new AdjustmentFilter({ red: (this._r / 255), green: (this._g / 255), blue: (this._b / 255), alpha: this._alphaMultiplier });
        this._colorMap = this.generatePaletteMapForGrayscale(this._bg, this._fg);
    }

    public get ink(): number {
        return this._ink;
    }

    public get reds(): number[] | undefined {
        return this._colorMap.get('reds');
    }

    public get greens(): number[] | undefined {
        return this._colorMap.get('greens');
    }

    public get blues(): number[] | undefined {
        return this._colorMap.get('blues');
    }

    public get alphas(): number[] | undefined {
        return this._colorMap.get('alphas');
    }

    public get paletteIsGrayscale(): boolean {
        return this._paletteIsGrayscale;
    }
    public get colorTransform(): Filter | undefined {
        return this._colorTransform;
    }

    private generatePaletteMapForGrayscale(background: number, foreground: number): Map<string, number[]> {
        const bg = this.extractARGB(background);
        const fg = this.extractARGB(foreground);
        const diff = {
            alpha: (fg.alpha - bg.alpha) / 0xFF,
            red: (fg.red - bg.red) / 0xFF,
            green: (fg.green - bg.green) / 0xFF,
            blue: (fg.blue - bg.blue) / 0xFF,
        };

        const alphas: number[] = [];
        const colors: number[] = [];
        const current = { ...bg };

        for (let i = 0; i < 256; i++) {
            if (current.red === bg.red && current.green === bg.green && current.blue === bg.blue) current.alpha = 0;

            current.alpha += diff.alpha;
            current.red += diff.red;
            current.green += diff.green;
            current.blue += diff.blue;

            alphas.push(current.alpha << 24);
            colors.push(this.buildARGB(current));
        }

        return new Map([
            ['alphas', alphas],
            ['reds', colors],
            ['greens', colors],
            ['blues', colors],
        ]);
    }

    private extractARGB(color: number) {
        return {
            alpha: (color >> 24) & 0xFF,
            red: (color >> 16) & 0xFF,
            green: (color >> 8) & 0xFF,
            blue: color & 0xFF,
        };
    }

    private buildARGB(color: { alpha: number; red: number; green: number; blue: number }): number {
        return (color.alpha << 24) | (color.red << 16) | (color.green << 8) | color.blue;
    }
}
