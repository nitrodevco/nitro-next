// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetCustomFilterComposerType = object;

export class GetCustomFilterComposer implements IOutgoingPacket<GetCustomFilterComposerType> {
    public constructor(private params: GetCustomFilterComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
