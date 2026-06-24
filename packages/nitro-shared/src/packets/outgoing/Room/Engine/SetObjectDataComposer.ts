import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetObjectDataComposerType = object;

export class SetObjectDataComposer implements IOutgoingPacket<SetObjectDataComposerType> {
    public constructor(private params: SetObjectDataComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
