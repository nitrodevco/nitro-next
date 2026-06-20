import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type OpenComposerType = {
    id: number;
};

export class OpenComposer implements IOutgoingPacket<OpenComposerType> {
    public constructor(private params: OpenComposerType) { }

    public compose(): (number | string)[] {
        return [
            this.params.id,
        ];
    }
}
