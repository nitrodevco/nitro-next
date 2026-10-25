import { IRoomObjectModel, RoomObjectVariableEnum, WiredFurnitureHighlightData, WiredFurnitureTransparencyData } from '@nitrodevco/nitro-api';

/** `EASING_DURATION`: a transparency or highlight change eases over half a second. */
const EASING_DURATION = 500;
/** `PULSE_PERIOD`: a pulsing highlight's cycle. */
const PULSE_PERIOD = 1000;

/**
 * Port of Flash `room/object/logic/furniture/WiredFurnitureEffectState` (WIN63-202610201032): the WIRED
 * Set Visibility and Set Highlight state of one room object, shared by `FurnitureLogic`, `AvatarLogic`
 * and `PetLogic`. It eases between values and publishes what the visualizations read to the object's
 * model (`furniture_wired_transparency`, `..._click_through`, `..._highlight_type` / `_strength` / `_color`),
 * each only when it changed.
 */
export class WiredFurnitureEffectState {
    private _hasTransparency: boolean = false;
    private _currentTransparency: number = 0;
    private _startTransparency: number = 0;
    private _targetTransparency: number = 0;
    private _transparencyChangeTime: number = 0;
    private _transparencyEasingMode: number = 0;
    private _transparencyTransitionActive: boolean = false;
    private _allowClickThrough: boolean = false;

    private _hasHighlight: boolean = false;
    private _highlightType: number = 0;
    private _currentHighlightStrength: number = 0;
    private _startHighlightStrength: number = 0;
    private _targetHighlightStrength: number = 0;
    private _highlightChangeTime: number = 0;
    private _highlightEasingMode: number = 0;
    private _highlightTransitionActive: boolean = false;
    private _highlightColor: number = 0xFFFFFF;
    private _highlightAnimationMode: number = 0;
    private _highlightAnimationStartTime: number = 0;

    private _publishedTransparency: number = NaN;
    private _publishedClickThrough: number = -1;
    private _publishedHighlightType: number = -1;
    private _publishedHighlightStrength: number = NaN;
    private _publishedHighlightColor: number = -1;

    /** `ease`: 2 ease in, 3 ease out, 4 ease in-out, anything else linear. */
    private static ease(progress: number, mode: number): number {
        switch (mode) {
            case 2:
                return progress * progress;
            case 3:
                return 1 - (1 - progress) * (1 - progress);
            case 4:
                return progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
            default:
                return progress;
        }
    }

    private static clampPercentage(value: number): number {
        return Math.max(0, Math.min(value, 100));
    }

    public setTransparency(transparency: number, allowClickThrough: boolean, easingMode: number, initialize: boolean, time: number, model: IRoomObjectModel): void {
        if (this._hasTransparency && this._transparencyTransitionActive) this.updateTransparency(time, model);

        this._hasTransparency = true;
        this._targetTransparency = WiredFurnitureEffectState.clampPercentage(transparency);
        this._allowClickThrough = allowClickThrough;
        this._transparencyEasingMode = easingMode;

        model.setValue(RoomObjectVariableEnum.FurnitureWiredTransparencyData, new WiredFurnitureTransparencyData(this._targetTransparency, this._allowClickThrough, this._transparencyEasingMode));

        if (initialize || (easingMode === 0) || (this._currentTransparency === this._targetTransparency)) {
            this._currentTransparency = this._targetTransparency;
            this._transparencyTransitionActive = false;
        } else {
            this._startTransparency = this._currentTransparency;
            this._transparencyChangeTime = time;
            this._transparencyTransitionActive = true;
        }

        this.publishTransparency(model);
        this.publishClickThrough(model);
    }

    public setHighlight(highlightType: number, strength: number, color: number, animationMode: number, easingMode: number, initialize: boolean, time: number, model: IRoomObjectModel): void {
        if (this._hasHighlight) {
            if (this._highlightTransitionActive) this.updateHighlightStrength(time, model);
            else this._currentHighlightStrength = this.calculateHighlightStrength(time);
        }

        if (!this._hasHighlight || !initialize) this._highlightAnimationStartTime = time;

        this._hasHighlight = true;
        this._highlightType = highlightType;
        this._targetHighlightStrength = WiredFurnitureEffectState.clampPercentage(strength);
        this._highlightColor = color & 0xFFFFFF;
        this._highlightAnimationMode = Math.max(0, Math.min(animationMode, 1));
        this._highlightEasingMode = (this._highlightAnimationMode === 0) ? Math.max(0, Math.min(easingMode, 4)) : 0;

        model.setValue(RoomObjectVariableEnum.FurnitureWiredHighlightData, new WiredFurnitureHighlightData(this._highlightType, this._targetHighlightStrength, this._highlightColor, this._highlightAnimationMode, this._highlightEasingMode));

        if (this._highlightAnimationMode !== 0) {
            this._currentHighlightStrength = this.calculateHighlightStrength(time);
            this._highlightTransitionActive = false;
        } else if (initialize || (this._highlightEasingMode === 0) || (this._currentHighlightStrength === this._targetHighlightStrength)) {
            this._currentHighlightStrength = this._targetHighlightStrength;
            this._highlightTransitionActive = false;
        } else {
            this._startHighlightStrength = this._currentHighlightStrength;
            this._highlightChangeTime = time;
            this._highlightTransitionActive = true;
        }

        this.publishHighlightType(model);
        this.publishHighlightColor(model);
        this.publishHighlightStrength(this.calculateHighlightStrength(time), model);
    }

    public update(time: number, model: IRoomObjectModel): void {
        if (this._hasTransparency && this._transparencyTransitionActive) this.updateTransparency(time, model);

        if (this._hasHighlight) {
            if (this._highlightTransitionActive) this.updateHighlightStrength(time, model);
            else if ((this._targetHighlightStrength > 0) && (this._highlightAnimationMode !== 0)) this.publishHighlightStrength(this.calculateHighlightStrength(time), model);
        }
    }

    public dispose(): void {
        this._hasTransparency = false;
        this._transparencyTransitionActive = false;
        this._hasHighlight = false;
        this._highlightTransitionActive = false;
    }

    private updateTransparency(time: number, model: IRoomObjectModel): void {
        const elapsed = Math.max(0, time - this._transparencyChangeTime);
        const progress = Math.min(elapsed / EASING_DURATION, 1);
        const eased = WiredFurnitureEffectState.ease(progress, this._transparencyEasingMode);

        this._currentTransparency = this._startTransparency + (this._targetTransparency - this._startTransparency) * eased;

        if (progress >= 1) {
            this._currentTransparency = this._targetTransparency;
            this._transparencyTransitionActive = false;
        }

        this.publishTransparency(model);
    }

    private updateHighlightStrength(time: number, model: IRoomObjectModel): void {
        const elapsed = Math.max(0, time - this._highlightChangeTime);
        const progress = Math.min(elapsed / EASING_DURATION, 1);
        const eased = WiredFurnitureEffectState.ease(progress, this._highlightEasingMode);

        this._currentHighlightStrength = this._startHighlightStrength + (this._targetHighlightStrength - this._startHighlightStrength) * eased;

        if (progress >= 1) {
            this._currentHighlightStrength = this._targetHighlightStrength;
            this._highlightTransitionActive = false;
        }

        this.publishHighlightStrength(this._currentHighlightStrength, model);
    }

    /** A pulse runs `(1 - cos)/2` from 0 up to the strength and back once a second; a steady highlight keeps its strength. */
    private calculateHighlightStrength(time: number): number {
        if (this._highlightAnimationMode !== 1) return this._currentHighlightStrength;

        const elapsed = Math.max(0, time - this._highlightAnimationStartTime);
        const phase = (elapsed % PULSE_PERIOD) / PULSE_PERIOD;

        return Math.round(this._targetHighlightStrength * ((1 - Math.cos(phase * Math.PI * 2)) / 2));
    }

    private publishTransparency(model: IRoomObjectModel): void {
        if (this._publishedTransparency === this._currentTransparency) return;

        this._publishedTransparency = this._currentTransparency;
        model.setValue(RoomObjectVariableEnum.FurnitureWiredTransparency, this._currentTransparency);
    }

    private publishClickThrough(model: IRoomObjectModel): void {
        const clickThrough = this._allowClickThrough ? 1 : 0;

        if (this._publishedClickThrough === clickThrough) return;

        this._publishedClickThrough = clickThrough;
        model.setValue(RoomObjectVariableEnum.FurnitureWiredClickThrough, clickThrough);
    }

    private publishHighlightType(model: IRoomObjectModel): void {
        if (this._publishedHighlightType === this._highlightType) return;

        this._publishedHighlightType = this._highlightType;
        model.setValue(RoomObjectVariableEnum.FurnitureWiredHighlightType, this._highlightType);
    }

    private publishHighlightStrength(strength: number, model: IRoomObjectModel): void {
        if (this._publishedHighlightStrength === strength) return;

        this._publishedHighlightStrength = strength;
        model.setValue(RoomObjectVariableEnum.FurnitureWiredHighlightStrength, strength);
    }

    private publishHighlightColor(model: IRoomObjectModel): void {
        if (this._publishedHighlightColor === this._highlightColor) return;

        this._publishedHighlightColor = this._highlightColor;
        model.setValue(RoomObjectVariableEnum.FurnitureWiredHighlightColor, this._highlightColor);
    }
}
