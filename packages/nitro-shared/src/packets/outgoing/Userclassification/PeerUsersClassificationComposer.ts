import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PeerUsersClassificationComposerType = object;

export class PeerUsersClassificationComposer implements IOutgoingPacket<PeerUsersClassificationComposerType> {
    public constructor(private params: PeerUsersClassificationComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
