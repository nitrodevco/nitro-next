import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetGuildEditorDataComposerType = object;

export class GetGuildEditorDataComposer implements IOutgoingPacket<GetGuildEditorDataComposerType> {
    public constructor(private params: GetGuildEditorDataComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
