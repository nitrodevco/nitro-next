import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ChangeMottoComposerType = {
    text: string
};

export class ChangeMottoComposer implements IOutgoingPacket<ChangeMottoComposerType> {
    public constructor(private params: ChangeMottoComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.text
        ];
    }
}
