import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type UpdateWiredComposerType = {
    id: number;
    intParams: number[];
    stringParam: string;
    stuffIds: number[];
    definitionSpecifics: object[];
    variableIds: number[];
    typeSpecifics: object[];
};

export class UpdateWiredComposer implements IOutgoingPacket<UpdateWiredComposerType> {
    public constructor(private params: UpdateWiredComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.id,
            this.params.intParams,
            this.params.stringParam,
            this.params.stuffIds,
            this.params.definitionSpecifics,
            this.params.variableIds,
            this.params.typeSpecifics,
        ];
    }
}
