import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetUIFlagsComposerType = object;

export class SetUIFlagsComposer implements IOutgoingPacket<SetUIFlagsComposerType> {
    public constructor(private params: SetUIFlagsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
