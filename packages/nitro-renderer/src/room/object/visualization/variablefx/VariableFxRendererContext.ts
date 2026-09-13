import { IVariableFxAssetProvider } from './IVariableFxAssetProvider';
import { VariableFxConfigData } from './VariableFxConfigData';
import { VariableFxRendererRegistry } from './VariableFxRendererRegistry';
import { VariableFxStatusData } from './VariableFxStatusData';

export class VariableFxRendererContext {
    constructor(
        public assetProvider: IVariableFxAssetProvider | undefined,
        public config: VariableFxConfigData,
        public status: VariableFxStatusData,
        public minValue: number,
        public maxValue: number,
        /** `(value - min) / (max - min)` clamped to 0..1. */
        public progress: number,
        public registry: VariableFxRendererRegistry | undefined = undefined,
    ) {}
}
