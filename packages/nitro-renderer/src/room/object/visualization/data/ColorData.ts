export class ColorData {
    public static DEFAULT_COLOR: number = 0xffffff;

    private _colors: number[] = [];

    constructor(layerCount: number) {
        for (let i = 0; i < layerCount; i++) this._colors.push(ColorData.DEFAULT_COLOR);
    }

    public dispose(): void {
        this._colors = [];
    }

    public getLayerColor(layerId: number): number {
        return this._colors[layerId] ?? ColorData.DEFAULT_COLOR;
    }

    public setColorLayer(layerId: number, color: number): void {
        const existing = this._colors[layerId];

        if (!existing) return;

        this._colors[layerId] = color;
    }
}
