import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetBadgeInfoComposerType = {
    badgeCode: string;
};

/** `GetBadgeInfoMessageComposer`: the hotel-wide figures for one badge - the badge display asks for its badge's. */
export class GetBadgeInfoComposer implements IOutgoingPacket<GetBadgeInfoComposerType> {
    public constructor(private params: GetBadgeInfoComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.badgeCode,
        ];
    }
}
