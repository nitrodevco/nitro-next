import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GuideSessionInviteRequesterComposerType = object;

export class GuideSessionInviteRequesterComposer implements IOutgoingPacket<GuideSessionInviteRequesterComposerType> {
    public constructor(private params: GuideSessionInviteRequesterComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
