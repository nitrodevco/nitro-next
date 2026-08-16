import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetOfficialRoomsComposerType = {
    adIndex: number;
};

export class GetOfficialRoomsComposer implements IOutgoingPacket<GetOfficialRoomsComposerType> {
    public constructor(private params: GetOfficialRoomsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.adIndex,
        ];
    }
}
