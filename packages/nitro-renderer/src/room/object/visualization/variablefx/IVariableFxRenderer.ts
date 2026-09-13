import { VariableFxFrame } from './VariableFxFrame';
import { VariableFxRendererContext } from './VariableFxRendererContext';

export interface IVariableFxRenderer {
    readonly frame: VariableFxFrame;
    /** True while the renderer animates on its own (e.g. the striped bar's moving stripes) and needs ticks regardless of data changes. */
    readonly isContinuous: boolean;
    updateData(context: VariableFxRendererContext, time: number): void;
    needsUpdate(time: number): boolean;
    /** Advances animations and redraws the frame if anything changed; returns whether the frame was redrawn. */
    update(time: number): boolean;
    dispose(): void;
}
