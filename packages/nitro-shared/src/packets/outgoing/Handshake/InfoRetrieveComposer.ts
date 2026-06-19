import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type InfoRetrieveComposerType = object;

export class InfoRetrieveComposer implements IOutgoingPacket<InfoRetrieveComposerType> {
    public constructor(private params: InfoRetrieveComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
