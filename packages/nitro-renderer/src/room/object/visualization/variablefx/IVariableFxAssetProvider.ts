import { VariableFxBitmap } from './rendering/VariableFxBitmap';

export interface VariableFxIconMetadataEntry {
    offsetX: number;
    offsetY: number;
}

export interface VariableFxRendererMapping {
    rendererId: number;
    renderer: string;
    rendererClass: string;
}

/** Hands the renderers their source bitmaps (`variablefx_*`) and the two metadata tables the Flash client kept as XML assets. */
export interface IVariableFxAssetProvider {
    readonly isReady: boolean;
    getBitmap(name: string): VariableFxBitmap | undefined;
    getIconMetadata(): Map<string, VariableFxIconMetadataEntry>;
    getRendererMappings(): VariableFxRendererMapping[];
}
