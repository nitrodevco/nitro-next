import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetBadgePointLimitsComposerType = object;

export class GetBadgePointLimitsComposer implements IOutgoingPacket<GetBadgePointLimitsComposerType> {
    public constructor(private params: GetBadgePointLimitsComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
