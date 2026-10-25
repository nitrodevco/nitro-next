import { Container, Matrix, Sprite, Texture } from 'pixi.js';

import { ExtendedSprite, SourceAlpha } from '#renderer/utils';

/** One part sprite of a drawn avatar frame: its texture and where it went, relative to the frame. */
interface HitAlphaLayer {
    texture: Texture;
    a: number;
    b: number;
    c: number;
    d: number;
    tx: number;
    ty: number;
    alpha: number;
}

/**
 * The alpha of an avatar frame, built on the CPU from the parts it was drawn from - what Habbo's JS
 * port does for its avatar render textures (`AvatarImageCache` ORs the part masks at their
 * offsets) instead of reading the composed texture back from the GPU, which stalls until the GPU
 * has finished and was done again for every new frame pointed at.
 *
 * `capture` records the parts' textures and transforms as the frame is drawn - cheap, and nothing
 * is composed unless a hit test asks for it (`compose`). A part's own alpha comes from the hit
 * test's frame cache, which reads the decoded sheet, so a composed frame touches no GPU memory.
 * The effect's image filter on the set is left out: it colours the figure but leaves its shape.
 */
export class AvatarHitAlpha {
    private _layers: HitAlphaLayer[] = [];
    private _count = 0;
    /** One matrix per tree depth, reused: capture runs for every frame drawn. */
    private readonly _matrices: Matrix[] = [];

    /** Records the sprites under `root` and their transforms relative to it. */
    public capture(root: Container): void {
        this._count = 0;
        this.walk(root, this.matrixAt(0).identity(), 1, 0);
    }

    /** A copy of what was captured, for a frame kept in the full image cache. */
    public clone(): AvatarHitAlpha {
        const copy = new AvatarHitAlpha();

        for (let i = 0; i < this._count; i++) copy._layers.push({ ...this._layers[i] });

        copy._count = this._count;

        return copy;
    }

    /**
     * The captured frame's alpha in a `width` x `height` buffer, every part drawn `scale` times its
     * size (the source's resolution, or the reduced image's scale) and the most opaque part winning.
     */
    public compose(width: number, height: number, scale: number): SourceAlpha | undefined {
        const alpha = new Uint8Array(width * height);

        for (let i = 0; i < this._count; i++) {
            const layer = this._layers[i];
            const part = ExtendedSprite.getFrameAlpha(layer.texture);

            if (!part) return undefined;

            this.drawLayer(alpha, width, height, scale, layer, part);
        }

        return { alpha, width, height };
    }

    private matrixAt(depth: number): Matrix {
        return (this._matrices[depth] ??= new Matrix());
    }

    private walk(node: Container, parent: Matrix, parentAlpha: number, depth: number): void {
        if (!node.visible) return;

        const isRoot = (depth === 0);
        let matrix = parent;

        // The root is drawn at the target's origin, wherever it sits.
        if (!isRoot) {
            node.updateLocalTransform();
            matrix = this.matrixAt(depth).copyFrom(parent).append(node.localTransform);
        }

        const alpha = parentAlpha * (isRoot ? 1 : node.alpha);

        if ((node instanceof Sprite) && node.texture && (node.texture !== Texture.EMPTY) && (alpha > 0)) {
            let layer = this._layers[this._count];

            if (!layer) {
                layer = { texture: node.texture, a: 1, b: 0, c: 0, d: 1, tx: 0, ty: 0, alpha: 1 };
                this._layers[this._count] = layer;
            }

            this._count++;

            // A sprite's quad starts at its anchor and the texture's trim.
            const offsetX = (node.texture.trim?.x ?? 0) - (node.anchor.x * node.texture.orig.width);
            const offsetY = (node.texture.trim?.y ?? 0) - (node.anchor.y * node.texture.orig.height);

            layer.texture = node.texture;
            layer.a = matrix.a;
            layer.b = matrix.b;
            layer.c = matrix.c;
            layer.d = matrix.d;
            layer.tx = matrix.tx + (matrix.a * offsetX) + (matrix.c * offsetY);
            layer.ty = matrix.ty + (matrix.b * offsetX) + (matrix.d * offsetY);
            layer.alpha = alpha;
        }

        for (const child of node.children) this.walk(child, matrix, alpha, depth + 1);
    }

    /** Samples the part at the centre of every target pixel its quad covers. */
    private drawLayer(target: Uint8Array, width: number, height: number, scale: number, layer: HitAlphaLayer, part: SourceAlpha): void {
        const a = layer.a * scale;
        const b = layer.b * scale;
        const c = layer.c * scale;
        const d = layer.d * scale;
        const tx = layer.tx * scale;
        const ty = layer.ty * scale;
        const determinant = (a * d) - (b * c);

        if (!determinant) return;

        // The part's alpha is at its source's resolution; the quad is in texture units.
        const partWidth = part.width;
        const partHeight = part.height;
        const unitsX = layer.texture.frame.width;
        const unitsY = layer.texture.frame.height;
        const toPartX = partWidth / unitsX;
        const toPartY = partHeight / unitsY;

        // The quad's corners on the target, for the rows and columns to visit.
        const xs = [ tx, tx + (a * unitsX), tx + (c * unitsY), tx + (a * unitsX) + (c * unitsY) ];
        const ys = [ ty, ty + (b * unitsX), ty + (d * unitsY), ty + (b * unitsX) + (d * unitsY) ];
        const left = Math.max(0, Math.floor(Math.min(...xs)));
        const right = Math.min(width, Math.ceil(Math.max(...xs)));
        const top = Math.max(0, Math.floor(Math.min(...ys)));
        const bottom = Math.min(height, Math.ceil(Math.max(...ys)));
        const layerAlpha = layer.alpha;

        for (let y = top; y < bottom; y++) {
            const cy = (y + 0.5) - ty;

            for (let x = left; x < right; x++) {
                const cx = (x + 0.5) - tx;
                // The target pixel's centre back in the part's texture units.
                const u = ((d * cx) - (c * cy)) / determinant;
                const v = ((a * cy) - (b * cx)) / determinant;

                if ((u < 0) || (v < 0) || (u >= unitsX) || (v >= unitsY)) continue;

                const value = part.alpha[((v * toPartY) | 0) * partWidth + ((u * toPartX) | 0)] * layerAlpha;
                const index = (y * width) + x;

                if (value > target[index]) target[index] = value;
            }
        }
    }
}
