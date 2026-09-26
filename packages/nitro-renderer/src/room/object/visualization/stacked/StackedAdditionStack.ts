import { IRoomObjectSprite } from '@nitrodevco/nitro-api';
import { Texture } from 'pixi.js';

import { GetTickerTime, TextureUtils } from '#renderer/utils';

import { createTransparentBitmap, disposeBitmap, getBitmapContext, VariableFxBitmap } from '../variablefx/rendering/VariableFxBitmap';
import { IStackedAddition } from './IStackedAddition';
import { StackedAdditionEntry } from './StackedAdditionEntry';

class StackedAdditionBounds {
    public minX: number = 0;
    public minY: number = 0;
    public maxX: number = 0;
    public maxY: number = 0;

    private _initialized: boolean = false;

    public get width(): number {
        return this.maxX - this.minX;
    }

    public get height(): number {
        return this.maxY - this.minY;
    }

    public add(x: number, y: number, width: number, height: number): void {
        if (!this._initialized) {
            this.minX = x;
            this.minY = y;
            this.maxX = x + width;
            this.maxY = y + height;
            this._initialized = true;

            return;
        }

        this.minX = Math.min(this.minX, x);
        this.minY = Math.min(this.minY, y);
        this.maxX = Math.max(this.maxX, x + width);
        this.maxY = Math.max(this.maxY, y + height);
    }
}

const BLEND_OPERATIONS: Record<string, GlobalCompositeOperation> = {
    normal: 'source-over',
    multiply: 'multiply',
    add: 'lighter',
};

/**
 * Stacks additions bottom-up above an object (4px apart), slides them when one appears or
 * disappears, and composes every visible one into a single bitmap that becomes the texture of
 * the one room sprite the host reserves for the stack.
 */
export class StackedAdditionStack {
    private static STACK_SPACING: number = 4;

    private _entries: StackedAdditionEntry[] = [];
    private _bitmap: VariableFxBitmap | undefined = undefined;
    private _texture: Texture | undefined = undefined;
    private _disposed: boolean = false;
    private _hasAnimatingEntries: boolean = false;
    private _layoutDirty: boolean = false;
    private _lastHadVisibleEntries: boolean = false;
    private _requiresAnimationTick: boolean = false;
    private _sortDirty: boolean = false;

    public get isEmpty(): boolean {
        return this._entries.length === 0;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get isIdleInvisible(): boolean {
        return !this._lastHadVisibleEntries && !this._layoutDirty && !this._hasAnimatingEntries && !this.hasLayoutContributingAdditions();
    }

    public get isCachedIdle(): boolean {
        return !this._layoutDirty && !this._hasAnimatingEntries && !this._requiresAnimationTick;
    }

    /** The composed texture currently on the host sprite, if any. */
    public get texture(): Texture | undefined {
        return this._texture;
    }

    public add(addition: IStackedAddition, layer: number, createdAt: number = 0, configId: number = 0, variableId: string = ''): void {
        for (const entry of this._entries) {
            if (entry.addition !== addition) continue;

            const resolvedVariableId = variableId ?? '';

            if (entry.layer !== layer || entry.createdAt !== createdAt || entry.configId !== configId || entry.variableId !== resolvedVariableId) {
                entry.layer = layer;
                entry.createdAt = createdAt;
                entry.configId = configId;
                entry.variableId = resolvedVariableId;
                this._sortDirty = true;
                this._layoutDirty = true;
                this._requiresAnimationTick = true;
            }

            return;
        }

        this.remove(addition.id);

        addition.isPartOfStack = true;

        this._entries.push(new StackedAdditionEntry(addition, layer, createdAt, configId, variableId));
        this._layoutDirty = true;
        this._sortDirty = true;
        this._requiresAnimationTick = true;
    }

    public remove(id: number): void {
        for (let i = this._entries.length - 1; i >= 0; i--) {
            const entry = this._entries[i];

            if (entry.addition?.id !== id) continue;

            this._entries.splice(i, 1);

            entry.dispose();

            this._layoutDirty = true;
            this._requiresAnimationTick = true;
        }
    }

    public get(id: number): IStackedAddition | undefined {
        for (const entry of this._entries) {
            if (entry.addition?.id === id) return entry.addition;
        }

        return undefined;
    }

    public getAdditions(): IStackedAddition[] {
        const additions: IStackedAddition[] = [];

        for (const entry of this._entries) {
            if (entry.addition) additions.push(entry.addition);
        }

        return additions;
    }

    public update(sprite: IRoomObjectSprite, scale: number, stackBottomY: number): boolean {
        for (const entry of this._entries) {
            if (entry.addition && entry.sprite) entry.addition.update(entry.sprite, scale);
        }

        const changed = this.layoutAndCompose(sprite, GetTickerTime(), false, stackBottomY);

        this.refreshAnimationTickState();

        return changed;
    }

    public animate(sprite: IRoomObjectSprite, stackBottomY: number): boolean {
        if (this.isCachedIdle && (!this._lastHadVisibleEntries || (sprite.visible && this._texture !== undefined))) return false;

        let changed = false;

        for (const entry of this._entries) {
            if (entry.addition && entry.sprite && entry.addition.animate(entry.sprite)) changed = true;
        }

        if (this.removeFinishedAdditions()) changed = true;

        if (!changed && !this._layoutDirty && !this._hasAnimatingEntries) {
            if (!this._lastHadVisibleEntries || (sprite.visible && this._texture !== undefined)) {
                this.refreshAnimationTickState();

                return false;
            }
        }

        const composed = this.layoutAndCompose(sprite, GetTickerTime(), true, stackBottomY) || changed;

        this.refreshAnimationTickState();

        return composed;
    }

    public dispose(): void {
        for (const entry of this._entries) entry.dispose();

        this._entries.length = 0;

        this.disposeBitmap();

        this._disposed = true;
        this._requiresAnimationTick = false;
    }

    private layoutAndCompose(sprite: IRoomObjectSprite, time: number, animate: boolean, stackBottomY: number): boolean {
        const bounds = new StackedAdditionBounds();
        const visibleEntries: StackedAdditionEntry[] = [];

        let previousY = 0;
        let previous: StackedAdditionEntry | undefined = undefined;
        let changed = false;
        let animating = false;

        if (this._entries.length === 0) return this.hideSprite(sprite);

        this.sortEntriesIfNeeded();

        for (const entry of this._entries) {
            const entrySprite = entry.sprite;

            if (!entry.addition || !entrySprite || !entrySprite.visible || !entrySprite.bitmap || entrySprite.alpha <= 0) continue;

            if (entry.addition.contributesToStackLayout) {
                entry.contributesToLayout = true;

                const targetY = !previous?.sprite?.bitmap ? 0 : previousY - previous.sprite.bitmap.height - StackedAdditionStack.STACK_SPACING;

                if (entry.setTarget(targetY, time)) changed = true;
                if (animate && entry.y.update(time)) changed = true;
                if (entry.needsAnimationTick(time)) animating = true;

                previousY = targetY;
                previous = entry;
            } else if (entry.contributesToLayout) {
                entry.contributesToLayout = false;

                if (entry.freezePosition(time)) changed = true;
            }

            visibleEntries.push(entry);
        }

        if (visibleEntries.length === 0) return this.hideSprite(sprite);

        for (const entry of visibleEntries) {
            const entrySprite = entry.sprite!;
            const bitmap = entrySprite.bitmap!;

            bounds.add(entrySprite.offsetX, entrySprite.offsetY + Math.round(entry.y.value) - bitmap.height, bitmap.width, bitmap.height);
        }

        this.ensureBitmap(bounds.width, bounds.height);

        const bitmap = this._bitmap!;
        const context = getBitmapContext(bitmap);

        context.clearRect(0, 0, bitmap.width, bitmap.height);

        for (const entry of visibleEntries) this.drawEntry(context, entry, bounds);

        const last = visibleEntries[visibleEntries.length - 1];

        this.applyTexture(sprite);

        sprite.offsetX = bounds.minX;
        sprite.offsetY = stackBottomY + bounds.minY;
        sprite.relativeDepth = last.sprite!.relativeDepth;
        sprite.alpha = 255;
        sprite.visible = true;

        this._layoutDirty = false;
        this._hasAnimatingEntries = animating;
        this._lastHadVisibleEntries = true;

        return changed;
    }

    private hideSprite(sprite: IRoomObjectSprite): boolean {
        this._layoutDirty = false;
        this._hasAnimatingEntries = false;
        this._lastHadVisibleEntries = false;

        if (sprite.visible) {
            sprite.visible = false;

            return true;
        }

        return false;
    }

    private drawEntry(context: CanvasRenderingContext2D, entry: StackedAdditionEntry, bounds: StackedAdditionBounds): void {
        const entrySprite = entry.sprite!;
        const bitmap = entrySprite.bitmap!;
        const x = entrySprite.offsetX - bounds.minX;
        const y = entrySprite.offsetY + Math.round(entry.y.value) - bounds.minY - bitmap.height;

        context.save();
        context.globalAlpha = Math.max(0, Math.min(1, entrySprite.alpha / 255));
        context.globalCompositeOperation = BLEND_OPERATIONS[entrySprite.blendMode] ?? 'source-over';
        context.drawImage(bitmap, x, y);
        context.restore();
    }

    private removeFinishedAdditions(): boolean {
        let removed = false;

        for (let i = this._entries.length - 1; i >= 0; i--) {
            const entry = this._entries[i];

            if (!entry.addition?.isFinished) continue;

            this._entries.splice(i, 1);

            entry.dispose();

            removed = true;
            this._layoutDirty = true;
        }

        return removed;
    }

    private ensureBitmap(width: number, height: number): void {
        const targetWidth = Math.max(1, width);
        const targetHeight = Math.max(1, height);

        if (this._bitmap && this._bitmap.width === targetWidth && this._bitmap.height === targetHeight) return;

        this.disposeBitmap();

        this._bitmap = createTransparentBitmap(targetWidth, targetHeight);
    }

    /** Wraps the composed bitmap as a texture (a new one when the bitmap was reallocated) and flags it for re-upload. */
    private applyTexture(sprite: IRoomObjectSprite): void {
        const bitmap = this._bitmap!;

        if (!this._texture || this._texture.source.resource !== bitmap) {
            if (this._texture) TextureUtils.destroyTexture(this._texture);
            this._texture = Texture.from(bitmap, true);
            this._texture.label = 'variable_fx_stack';
        } else {
            this._texture.source.update();
        }

        if (sprite.texture !== this._texture) {
            sprite.texture = this._texture;
        } else {
            sprite.increaseUpdateCounter();
        }
    }

    private disposeBitmap(): void {
        if (this._texture) {
            TextureUtils.destroyTexture(this._texture);
            this._texture = undefined;
        }

        disposeBitmap(this._bitmap);

        this._bitmap = undefined;
    }

    private sortEntries(): void {
        this._entries.sort((a, b) => {
            if (a.layer !== b.layer) return a.layer < b.layer ? -1 : 1;
            if (a.createdAt !== b.createdAt) return a.createdAt < b.createdAt ? -1 : 1;
            if (a.configId !== b.configId) return a.configId < b.configId ? -1 : 1;

            const byVariable = a.variableId.localeCompare(b.variableId);

            if (byVariable !== 0) return byVariable;

            return (a.addition?.id ?? 0) - (b.addition?.id ?? 0);
        });
    }

    private sortEntriesIfNeeded(): void {
        if (!this._sortDirty) return;

        if (this._entries.length > 1) this.sortEntries();

        this._sortDirty = false;
    }

    private hasLayoutContributingAdditions(): boolean {
        for (const entry of this._entries) {
            if (entry.addition?.contributesToStackLayout) return true;
        }

        return false;
    }

    private refreshAnimationTickState(): void {
        this._requiresAnimationTick = false;

        for (const entry of this._entries) {
            if (entry.addition?.requiresAnimationTick) {
                this._requiresAnimationTick = true;

                return;
            }
        }
    }
}
