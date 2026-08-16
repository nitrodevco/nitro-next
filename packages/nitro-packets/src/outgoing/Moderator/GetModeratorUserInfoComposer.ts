import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetModeratorUserInfoComposerType = object;

export class GetModeratorUserInfoComposer implements IOutgoingPacket<GetModeratorUserInfoComposerType> {
    public constructor(private params: GetModeratorUserInfoComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
