import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetIgnoredUsersComposerType = object;

export class GetIgnoredUsersComposer implements IOutgoingPacket<GetIgnoredUsersComposerType> {
    public constructor(private params: GetIgnoredUsersComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
