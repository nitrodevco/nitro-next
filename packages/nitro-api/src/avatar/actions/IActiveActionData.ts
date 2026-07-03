import type { IActionDefinition } from './IActionDefinition';

export interface IActiveActionData {
    readonly id: string;
    readonly actionType: string;
    actionParameter: number;
    definition: IActionDefinition | undefined;
    readonly startFrame: number;
    overridingAction: string | undefined;
}
