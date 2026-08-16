import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RemoveAllRightsComposerType = object;

export class RemoveAllRightsComposer implements IOutgoingPacket<RemoveAllRightsComposerType> {
    public constructor(private params: RemoveAllRightsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
