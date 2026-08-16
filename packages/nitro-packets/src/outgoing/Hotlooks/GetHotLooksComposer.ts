import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetHotLooksComposerType = object;

export class GetHotLooksComposer implements IOutgoingPacket<GetHotLooksComposerType> {
    public constructor(private params: GetHotLooksComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
