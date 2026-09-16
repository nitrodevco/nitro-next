import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/**
 * The shape every wired update shares - actions, conditions, selectors, triggers and addons all
 * send the same fields and differ only in their header.
 */
export type UpdateWiredComposerType = {
    id: number;
    intParams: number[];
    stringParam: string;
    stuffIds: number[];
    /** Whatever the specific definition adds, already flattened to numbers. */
    definitionSpecifics: number[];
    variableIds: number[];
    /** The same for the wired type itself. */
    typeSpecifics: number[];
};

export class UpdateWiredComposer implements IOutgoingPacket<UpdateWiredComposerType> {
    public constructor(private params: UpdateWiredComposerType) { }

    public compose(): (number | string | boolean)[] {
        /*
         * Every list on this wire is a count followed by its items. Pushing the arrays
         * themselves would encode nothing at all: the encoder writes numbers, strings and
         * booleans, and silently passes over anything else.
         */
        return [
            this.params.id,
            this.params.intParams.length,
            ...this.params.intParams,
            this.params.stringParam,
            this.params.stuffIds.length,
            ...this.params.stuffIds,
            this.params.definitionSpecifics.length,
            ...this.params.definitionSpecifics,
            this.params.variableIds.length,
            ...this.params.variableIds,
            this.params.typeSpecifics.length,
            ...this.params.typeSpecifics,
        ];
    }
}
