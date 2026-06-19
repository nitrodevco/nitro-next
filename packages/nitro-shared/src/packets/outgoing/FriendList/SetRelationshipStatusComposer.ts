import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetRelationshipStatusComposerType = object;

export class SetRelationshipStatusComposer implements IOutgoingPacket<SetRelationshipStatusComposerType> {
    public constructor(private params: SetRelationshipStatusComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
