import type { IAssetGesture, IAssetPosture } from '@nitrodevco/nitro-api';

import { AnimationSizeData } from './AnimationSizeData';

export class PetSizeData extends AnimationSizeData {
    public static DEFAULT: number = -1;

    private _posturesToAnimations: Map<string, number> = new Map();
    private _gesturesToAnimations: Map<string, number> = new Map();
    private _defaultPosture: string | undefined = undefined;

    public processPostures(postures: { defaultPosture?: string; postures: IAssetPosture[] }): boolean {
        if (!postures) return false;

        if (postures.defaultPosture && postures.defaultPosture.length) this._defaultPosture = postures.defaultPosture;

        if (!postures.postures) return false;

        for (const posture of postures.postures) {
            if (this._posturesToAnimations.get(posture.id)) continue;

            if (!this._defaultPosture) this._defaultPosture = posture.id;

            this._posturesToAnimations.set(posture.id, posture.animationId);
        }

        if (!this._defaultPosture || this._posturesToAnimations.get(this._defaultPosture) === undefined) return false;

        return true;
    }

    public processGestures(gestures: IAssetGesture[]): boolean {
        if (!gestures) return false;

        for (const gesture of gestures) {
            if (this._gesturesToAnimations.get(gesture.id)) continue;

            this._gesturesToAnimations.set(gesture.id, gesture.animationId);
        }

        return true;
    }

    public getAnimationForPosture(posture: string): number {
        if (!this._posturesToAnimations.get(posture)) posture = this._defaultPosture!;

        return this._posturesToAnimations.get(posture) ?? 0;
    }

    public getGestureDisabled(posture: string): boolean {
        if (posture === 'ded') return true;

        return false;
    }

    public getAnimationForGesture(gesture: string): number {
        if (!this._gesturesToAnimations.get(gesture)) return PetSizeData.DEFAULT;

        return this._gesturesToAnimations.get(gesture) ?? 0;
    }

    public getPostureForAnimation(index: number, useDefault: boolean): string | undefined {
        if (index >= 0 && index < this._posturesToAnimations.size) {
            const keys = this._posturesToAnimations.keys();

            for (; ;) {
                const key = keys.next();

                if (key.done) return undefined;

                if (index <= 0) return key.value;

                --index;
            }
        }

        return useDefault ? this._defaultPosture : undefined;
    }

    public getGestureForAnimation(index: number): string | undefined {
        if (index >= 0 && index < this._gesturesToAnimations.size) {
            const keys = this._gesturesToAnimations.keys();

            for (; ;) {
                const key = keys.next();

                if (key.done) return undefined;

                if (index <= 0) return key.value;

                --index;
            }
        }

        return undefined;
    }

    public getGestureForAnimationId(id: number): string | undefined {
        for (const gesture of this._gesturesToAnimations.keys()) {
            if (this._gesturesToAnimations.get(gesture) === id) return gesture;
        }

        return undefined;
    }

    public get totalPostures(): number {
        return this._posturesToAnimations.size;
    }

    public get totalGestures(): number {
        return this._gesturesToAnimations.size;
    }
}
