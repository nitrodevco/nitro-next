import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type NewNavigatorInitComposerType = object;

export class NewNavigatorInitComposer implements IOutgoingPacket<NewNavigatorInitComposerType> {
    public constructor(private params: NewNavigatorInitComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
