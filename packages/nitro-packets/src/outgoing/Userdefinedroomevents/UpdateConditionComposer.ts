// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { UpdateWiredComposer, UpdateWiredComposerType } from './UpdateWiredComposer';

export type UpdateConditionComposerType = UpdateWiredComposerType & {
    /** `ConditionDefinition.quantifierCode`: 0 when the condition has no quantifier (`QuantifierType.None`). */
    quantifierCode: number;
};

/**
 * Flash `UpdateConditionMessageComposer`: the quantifier code goes out as one bare int after
 * `stuffIds`. The quantifier type and the invert flag that `ConditionDefinition` reads are the
 * server's to tell, and are never sent back.
 */
export class UpdateConditionComposer extends UpdateWiredComposer<UpdateConditionComposerType> {
    protected override definitionSpecifics(): (number | boolean)[] {
        return [
            this.params.quantifierCode,
        ];
    }
}
