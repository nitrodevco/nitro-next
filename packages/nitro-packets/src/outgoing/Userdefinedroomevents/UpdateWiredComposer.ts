// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/**
 * What every wired save carries. Flash has no base class for it - the six
 * `Update{Trigger,Action,Condition,Addon,Selector,Variable}MessageComposer` constructors repeat
 * the same pushes - but `UserDefinedRoomEventsCtrl.update` builds all six from the same values:
 *
 *   id, resolveIntParams(), resolveVariableIds(), resolveStringParam(), getStuffIds(), getStuffIds2(),
 *   [definition specifics], resolveFurniSources(), resolveUserSources()
 */
export type UpdateWiredComposerType = {
    /** The wired furni being saved. */
    id: number;
    intParams: number[];
    /** Wired variable ids are strings on the wire, as they are in `Triggerable`. */
    variableIds: string[];
    stringParam: string;
    /** The furni picked for the first selection. */
    stuffIds: number[];
    /** The furni picked for the second selection (`InputSourcesConf.FURNI_SOURCE_FURNI_PICKS_2`). */
    stuffIds2: number[];
    /** The chosen source per furni selection, in the order of `InputSourcesConf.allowedFurniSources`. */
    furniSourceTypes: number[];
    /** The same per user selection. */
    userSourceTypes: number[];
};

/**
 * The wire the six `Update*Composer`s share, in the order every Flash constructor pushes it:
 *
 *   id, intParams[], stringParam, stuffIds[], <definition specifics>, furniSourceTypes[],
 *   userSourceTypes[], variableIds[], stuffIds2[]
 *
 * Every list is a count followed by its items; pushing the arrays themselves would encode
 * nothing, because the encoder writes numbers, strings and booleans and passes over the rest.
 * The definition specifics are bare values, not a list: the action's delay, the condition's
 * quantifier code, the selector's two flags. A subclass supplies them through
 * `definitionSpecifics`. No header names this class; it is listed in `scripts/drift/known.py`.
 */
export class UpdateWiredComposer<T extends UpdateWiredComposerType = UpdateWiredComposerType> implements IOutgoingPacket<T> {
    public constructor(protected params: T) { }

    /** What the definition adds between `stuffIds` and the source types - nothing for a trigger, addon or variable. */
    protected definitionSpecifics(): (number | boolean)[] {
        return [];
    }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.id,
            this.params.intParams.length,
            ...this.params.intParams,
            this.params.stringParam,
            this.params.stuffIds.length,
            ...this.params.stuffIds,
            ...this.definitionSpecifics(),
            this.params.furniSourceTypes.length,
            ...this.params.furniSourceTypes,
            this.params.userSourceTypes.length,
            ...this.params.userSourceTypes,
            this.params.variableIds.length,
            ...this.params.variableIds,
            this.params.stuffIds2.length,
            ...this.params.stuffIds2,
        ];
    }
}
