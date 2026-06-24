import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetRelationshipStatusInfoComposerType = object;

export class GetRelationshipStatusInfoComposer implements IOutgoingPacket<GetRelationshipStatusInfoComposerType> {
    public constructor(private params: GetRelationshipStatusInfoComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
