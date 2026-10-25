import { disposeBitmap, VariableFxBitmap } from './rendering/VariableFxBitmap';

/** The bitmap a renderer produces, plus how it should be placed relative to the stack slot it occupies. */
export class VariableFxFrame {
    public bitmap: VariableFxBitmap | undefined = undefined;
    /** Bumped every time `bitmap` is redrawn so consumers can tell a new frame from the same one. */
    public updateId: number = 0;
    public width: number = 0;
    public height: number = 0;
    public offsetX: number = 0;
    public offsetY: number = 0;

    public disposeBitmap(): void {
        disposeBitmap(this.bitmap);

        this.bitmap = undefined;
        this.width = 0;
        this.height = 0;
    }
}
