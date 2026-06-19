import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SpinWheelOfFortuneComposerType = object;

export class SpinWheelOfFortuneComposer implements IOutgoingPacket<SpinWheelOfFortuneComposerType> {
    public constructor(private params: SpinWheelOfFortuneComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
