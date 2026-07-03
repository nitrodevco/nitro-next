import type { IActionDefinition, IAssetAvatarAnimation, IFigureSetData } from '@nitrodevco/nitro-api';

import { AnimationAction } from './animation';

export class AvatarAnimationData implements IFigureSetData {
    private _actions: Map<string, AnimationAction> = new Map();

    public parse(data: IAssetAvatarAnimation[]): boolean {
        if (data && (data.length > 0)) for (const animation of data) this._actions.set(animation.id, new AnimationAction(animation));

        return true;
    }

    public getAction(action: IActionDefinition): AnimationAction | undefined {
        return this._actions.get(action.id);
    }

    public getFrameCount(action: IActionDefinition): number {
        return this._actions.get(action.id)?.frameCount ?? 0;
    }
}
