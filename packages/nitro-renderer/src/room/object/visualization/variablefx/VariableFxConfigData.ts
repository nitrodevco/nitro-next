import { IVariableFxPrebake } from './VariableFxPrebakeCache';

/** A Variable FX config as the visualization sees it: the server ids resolved to names plus the raw ids and extras. */
export class VariableFxConfigData {
    public extra: Map<string, string>;
    /** Renderer-specific prebaked layers shared by every visualizer using this config; see `VariableFxPrebakeCache`. */
    public prebake: IVariableFxPrebake | undefined = undefined;

    constructor(
        public category: string,
        public style: string,
        public renderer: string,
        public width: string,
        public color: string,
        public defaultMinValue: number,
        public defaultMaxValue: number,
        extra?: Map<string, string>,
        public categoryId: number = -1,
        public styleId: number = -1,
        public rendererId: number = -1,
    ) {
        this.extra = extra ?? new Map();
    }

    public cloneForRenderer(category: string, renderer: string, rendererId: number, color: string, extra?: Map<string, string>): VariableFxConfigData {
        return new VariableFxConfigData(category, renderer, renderer, this.width, color, 0, 1, extra ?? this.extra, this.categoryId, this.styleId, rendererId);
    }
}
