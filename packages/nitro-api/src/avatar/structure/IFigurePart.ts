export interface IFigurePart {
    dispose(): void;
    readonly id: number;
    readonly type: string;
    readonly index: number;
    readonly colorLayerIndex: number;
    readonly paletteMap: number;
    readonly breed: number;
}
