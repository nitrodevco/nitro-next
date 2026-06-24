import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RemoveRightsComposerType = object;

export class RemoveRightsComposer implements IOutgoingPacket<RemoveRightsComposerType> {
    public constructor(private params: RemoveRightsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
