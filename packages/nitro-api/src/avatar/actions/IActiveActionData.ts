import { AvatarActionStateType } from '../enum';
import { IActionDefinition } from './IActionDefinition';

export interface IActiveActionData {
    readonly id: string;
    readonly type: AvatarActionStateType;
    /** The action's parameter as the Flash client keeps it: a string - an effect or item id, a dance name (`sixseven`), or empty. */
    actionParameter: string;
    definition: IActionDefinition | undefined;
    readonly startFrame: number;
    overridingAction: string | undefined;
}
