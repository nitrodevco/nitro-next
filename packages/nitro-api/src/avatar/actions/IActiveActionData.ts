import { AvatarActionStateType } from '../enum';
import type { IActionDefinition } from './IActionDefinition';

export interface IActiveActionData {
    readonly id: string;
    readonly type: AvatarActionStateType;
    actionParameter: number;
    definition: IActionDefinition | undefined;
    readonly startFrame: number;
    overridingAction: string | undefined;
}
