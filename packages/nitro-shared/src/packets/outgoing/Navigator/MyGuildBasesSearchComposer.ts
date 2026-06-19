import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type MyGuildBasesSearchComposerType = object;

export class MyGuildBasesSearchComposer implements IOutgoingPacket<MyGuildBasesSearchComposerType> {
    public constructor(private params: MyGuildBasesSearchComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
