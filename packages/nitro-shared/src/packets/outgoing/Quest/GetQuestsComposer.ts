import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetQuestsComposerType = object;

export class GetQuestsComposer implements IOutgoingPacket<GetQuestsComposerType> {
    public constructor(private params: GetQuestsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
