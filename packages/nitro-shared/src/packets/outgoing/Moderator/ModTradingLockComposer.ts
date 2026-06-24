import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ModTradingLockComposerType = object;

export class ModTradingLockComposer implements IOutgoingPacket<ModTradingLockComposerType> {
    public constructor(private params: ModTradingLockComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
