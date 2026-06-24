import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetAreaHideDataComposerType = object;

export class SetAreaHideDataComposer implements IOutgoingPacket<SetAreaHideDataComposerType> {
    public constructor(private params: SetAreaHideDataComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
