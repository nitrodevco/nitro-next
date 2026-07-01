import type { IActionDefinition } from './IActionDefinition';

export interface IActiveActionData {
    readonly id: string;
    readonly actionType: string | undefined;
    actionParameter: string;
    definition: IActionDefinition | undefined;
    readonly startFrame: number;
    overridingAction: string | undefined;
}
