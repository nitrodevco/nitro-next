import { IVariableFxStatusModelEntry, NitroLogger } from '@nitrodevco/nitro-api';

import { GetTickerTime } from '#renderer/utils';

import { IStackedAddition } from '../stacked/IStackedAddition';
import { StackedAdditionSprite } from '../stacked/StackedAdditionSprite';
import { IVariableFxAssetProvider } from './IVariableFxAssetProvider';
import { VariableFxConfigData } from './VariableFxConfigData';
import { VariableFxRendererRegistry } from './VariableFxRendererRegistry';
import { VariableFxStatusData } from './VariableFxStatusData';
import { VariableFxVisualizationConfigManager } from './VariableFxVisualizationConfigManager';
import { VariableFxVisualizer } from './VariableFxVisualizer';

/**
 * One Variable FX status inside an object's stack: creates the visualizer for its config,
 * fades in when shown (150ms) and out when hidden or removed (350ms), and hands the current
 * frame to the stack entry's sprite.
 */
export class VariableFxStackAddition implements IStackedAddition {
    private static FADE_IN_DURATION_MS: number = 150;
    private static FADE_OUT_DURATION_MS: number = 350;
    private static DEFAULT_RELATIVE_DEPTH: number = -0.2;
    private static ID_COUNTER: number = 10000;

    private _id: number;
    private _configId: number;
    private _variableId: string;
    private _createdAt: number = 0;
    private _manager: VariableFxVisualizationConfigManager | undefined;
    private _assetProvider: IVariableFxAssetProvider | undefined;
    private _rendererRegistry: VariableFxRendererRegistry | undefined;
    private _visualizer: VariableFxVisualizer | undefined = undefined;
    private _visualizerEntryUpdateId: number = -1;
    private _visualizerConfigUpdateId: number = -1;
    private _isPartOfStack: boolean = false;
    private _shown: boolean = false;
    private _invisible: boolean = false;
    private _finished: boolean = false;
    private _alpha: number = 0;
    private _fadeStartTime: number = 0;
    private _fadeStartAlpha: number = 0;
    private _fadeTargetAlpha: number = 0;
    private _fadeDuration: number = 0;
    private _spriteSynced: boolean = false;
    private _pendingEntry: IVariableFxStatusModelEntry | undefined = undefined;
    private _failedConfigUpdateId: number = -1;

    constructor(configId: number, variableId: string, manager: VariableFxVisualizationConfigManager | undefined, assetProvider: IVariableFxAssetProvider | undefined, rendererRegistry: VariableFxRendererRegistry | undefined) {
        this._id = VariableFxStackAddition.ID_COUNTER++;
        this._configId = configId;
        this._variableId = variableId;
        this._manager = manager;
        this._assetProvider = assetProvider;
        this._rendererRegistry = rendererRegistry;
    }

    public get id(): number {
        return this._id;
    }

    public get configId(): number {
        return this._configId;
    }

    public get variableId(): string {
        return this._variableId;
    }

    public get createdAt(): number {
        return this._createdAt;
    }

    public get isFinished(): boolean {
        return this._finished;
    }

    public get requiresAnimationTick(): boolean {
        return !this._spriteSynced || this._alpha !== this._fadeTargetAlpha || !!this._pendingEntry || (!!this._visualizer && this._visualizer.requiresAnimationTick);
    }

    public get disposed(): boolean {
        return !this._manager;
    }

    public get isPartOfStack(): boolean {
        return this._isPartOfStack;
    }

    public set isPartOfStack(flag: boolean) {
        if (this._isPartOfStack === flag) return;

        this._isPartOfStack = flag;
        this._spriteSynced = false;
    }

    public get contributesToStackLayout(): boolean {
        return this._shown && !this._invisible;
    }

    public get invisible(): boolean {
        return this._invisible;
    }

    /** Applies a published status entry; returns whether anything visible changed. */
    public show(entry: IVariableFxStatusModelEntry, time: number): boolean {
        if (!this._manager) return false;

        const config = this._manager.getConfig(this._configId);

        if (!config) return this.hide(time);

        this._createdAt = entry.createdAt;

        let changed = this.syncVisualizer(config, entry, time);

        if (this._finished) changed = true;

        this._finished = false;

        if (entry.invisible) return this.startInvisibleFade(time) || changed;

        if (this._invisible || !this._shown) changed = true;

        this._invisible = false;
        this._shown = true;

        return this.startFade(255, VariableFxStackAddition.FADE_IN_DURATION_MS, time) || changed;
    }

    public hide(time: number): boolean {
        let changed = this._invisible;

        this._invisible = false;
        this._pendingEntry = undefined;

        if (!this._shown && this._fadeTargetAlpha === 0) {
            if (this._alpha === 0) {
                changed ||= !this._finished;

                this.finishHidden();
            }

            return changed;
        }

        changed = true;

        this._shown = false;
        changed = this.startFade(0, VariableFxStackAddition.FADE_OUT_DURATION_MS, time) || changed;

        if (this._alpha === 0) {
            changed ||= !this._finished;

            this.finishHidden();
        }

        return changed;
    }

    public update(sprite: StackedAdditionSprite, _scale: number): void {
        const time = GetTickerTime();

        this.updateFade(time);
        this.updateVisualizer(time);
        this.applyToSprite(sprite);
    }

    public animate(sprite: StackedAdditionSprite): boolean {
        const time = GetTickerTime();

        let changed = this.updateFade(time);

        if (this.updateVisualizer(time)) changed = true;

        if (!changed && this._spriteSynced) return false;

        this.applyToSprite(sprite);

        return true;
    }

    public dispose(): void {
        this.disposeVisualizer();

        this._manager = undefined;
        this._assetProvider = undefined;
        this._rendererRegistry = undefined;
        this._pendingEntry = undefined;
    }

    /** Creates or refreshes the visualizer; when the atlas is still loading the entry is kept and retried on the next tick. */
    private syncVisualizer(config: VariableFxConfigData, entry: IVariableFxStatusModelEntry, time: number): boolean {
        const configUpdateId = this._manager?.getConfigUpdateId(this._configId) ?? -1;
        const status = new VariableFxStatusData(entry.value, entry.overrideMinValue, entry.overrideMaxValue, new Map(entry.extra), entry.isInitialize || entry.invisible);

        if (!this._visualizer || this._visualizerConfigUpdateId !== configUpdateId) {
            this.disposeVisualizer();

            if (!this._assetProvider?.isReady) {
                this._pendingEntry = entry;

                return true;
            }

            if (this._failedConfigUpdateId === configUpdateId) return false;

            try {
                this._visualizer = new VariableFxVisualizer(config, status, time, this._assetProvider, this._rendererRegistry);
            } catch (err) {
                this._failedConfigUpdateId = configUpdateId;

                NitroLogger.warn(`VariableFx: could not create visualizer for config ${this._configId}`, err);

                return false;
            }

            this._visualizerConfigUpdateId = configUpdateId;
            this._visualizerEntryUpdateId = entry.updateId;
            this._pendingEntry = undefined;

            return true;
        }

        if (this._visualizerEntryUpdateId !== entry.updateId) {
            this._visualizer.updateData(status, time);

            this._visualizerEntryUpdateId = entry.updateId;

            return true;
        }

        return false;
    }

    private startFade(targetAlpha: number, duration: number, time: number): boolean {
        const changed = this.updateFade(time);

        if (this._fadeTargetAlpha === targetAlpha) return changed;

        this._fadeStartTime = time;
        this._fadeStartAlpha = this._alpha;
        this._fadeTargetAlpha = targetAlpha;
        this._fadeDuration = duration;

        return true;
    }

    private updateFade(time: number): boolean {
        if (this._alpha === this._fadeTargetAlpha) return false;

        const ratio = this._fadeDuration <= 0 ? 1 : Math.max(0, Math.min(1, (time - this._fadeStartTime) / this._fadeDuration));
        const alpha = Math.round(this._fadeStartAlpha + (this._fadeTargetAlpha - this._fadeStartAlpha) * ratio);

        if (alpha === this._alpha) return false;

        this._alpha = alpha;

        if (this._alpha === 0 && !this._shown && !this._invisible) this.finishHidden();

        return true;
    }

    private finishHidden(): void {
        this._finished = true;

        this.disposeVisualizer();
    }

    private updateVisualizer(time: number): boolean {
        if (!this._visualizer && this._pendingEntry && this._manager && this._assetProvider?.isReady) {
            const config = this._manager.getConfig(this._configId);
            const entry = this._pendingEntry;

            this._pendingEntry = undefined;

            if (config) this.syncVisualizer(config, entry, time);
        }

        if (!this._visualizer) return false;
        if (this._invisible && !this._shown && this._alpha <= 0) return false;
        if (this._visualizer.needsUpdate(time)) return this._visualizer.update(time);

        return false;
    }

    private applyToSprite(sprite: StackedAdditionSprite | undefined): void {
        if (!sprite) {
            this._spriteSynced = false;

            return;
        }

        const frame = this._visualizer?.frame;

        if (!this._visualizer || this._alpha <= 0 || !frame?.bitmap) {
            sprite.alpha = 0;
            sprite.visible = false;
            this._spriteSynced = true;

            return;
        }

        sprite.bitmap = frame.bitmap;
        sprite.offsetX = -Math.trunc(frame.bitmap.width / 2) + frame.offsetX;
        sprite.offsetY = this._isPartOfStack ? frame.offsetY : -frame.bitmap.height + frame.offsetY;
        sprite.relativeDepth = VariableFxStackAddition.DEFAULT_RELATIVE_DEPTH;
        sprite.alpha = this._alpha;
        sprite.visible = true;
        this._spriteSynced = true;
    }

    private disposeVisualizer(): void {
        if (this._visualizer) {
            this._visualizer.dispose();
            this._visualizer = undefined;
        }

        this._visualizerConfigUpdateId = -1;
        this._visualizerEntryUpdateId = -1;
        this._spriteSynced = false;
    }

    private startInvisibleFade(time: number): boolean {
        const changed = !this._invisible || this._shown;

        this._invisible = true;
        this._shown = false;

        return this.startFade(0, VariableFxStackAddition.FADE_OUT_DURATION_MS, time) || changed;
    }
}
