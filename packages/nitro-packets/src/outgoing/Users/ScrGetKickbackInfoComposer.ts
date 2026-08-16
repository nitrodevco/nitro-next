import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ScrGetKickbackInfoComposerType = object;

export class ScrGetKickbackInfoComposer implements IOutgoingPacket<ScrGetKickbackInfoComposerType> {
    public constructor(private params: ScrGetKickbackInfoComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
