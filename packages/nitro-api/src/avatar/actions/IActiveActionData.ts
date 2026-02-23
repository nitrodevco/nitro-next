import type { IActionDefinition } from './IActionDefinition';

export interface IActiveActionData {
    id: string;
    actionType: string | undefined;
    actionParameter: string | undefined;
    startFrame: number;
    definition: IActionDefinition | undefined;
    overridingAction: string | undefined;
}
