// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetIgnoredUsersComposerType = object;

export class GetIgnoredUsersComposer implements IOutgoingPacket<GetIgnoredUsersComposerType> {
    public constructor(private params: GetIgnoredUsersComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [

        ];
    }
}
