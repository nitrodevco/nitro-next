import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetClothingChangeDataComposerType = object;

export class SetClothingChangeDataComposer implements IOutgoingPacket<SetClothingChangeDataComposerType> {
    public constructor(private params: SetClothingChangeDataComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
