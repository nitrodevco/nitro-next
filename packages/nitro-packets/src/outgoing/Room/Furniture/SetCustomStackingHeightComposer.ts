import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetCustomStackingHeightComposerType = object;

export class SetCustomStackingHeightComposer implements IOutgoingPacket<SetCustomStackingHeightComposerType> {
    public constructor(private params: SetCustomStackingHeightComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
