// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { UpdateWiredComposer, UpdateWiredComposerType } from './UpdateWiredComposer';

export type UpdateSelectorComposerType = UpdateWiredComposerType & {
    /** `SelectorDefinition.isFilter`: narrow the incoming selection instead of replacing it. */
    isFilter: boolean;
    /** `SelectorDefinition.isInvert`: select everything the selector does not match. */
    isInvert: boolean;
};

/** Flash `UpdateSelectorMessageComposer`: the two flags go out as bare booleans after `stuffIds`. */
export class UpdateSelectorComposer extends UpdateWiredComposer<UpdateSelectorComposerType> {
    protected override definitionSpecifics(): (number | boolean)[] {
        return [
            this.params.isFilter,
            this.params.isInvert,
        ];
    }
}
