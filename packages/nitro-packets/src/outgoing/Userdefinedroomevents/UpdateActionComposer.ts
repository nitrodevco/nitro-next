// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { UpdateWiredComposer, UpdateWiredComposerType } from './UpdateWiredComposer';

export type UpdateActionComposerType = UpdateWiredComposerType & {
    /** `ActionDefinition.delayInPulses`: the delay slider's value, in half-second pulses. */
    delayInPulses: number;
};

/** Flash `UpdateActionMessageComposer`: the delay goes out as one bare int after `stuffIds`. */
export class UpdateActionComposer extends UpdateWiredComposer<UpdateActionComposerType> {
    protected override definitionSpecifics(): (number | boolean)[] {
        return [
            this.params.delayInPulses,
        ];
    }
}
