import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetMySanctionStatusComposerType = object;

export class GetMySanctionStatusComposer implements IOutgoingPacket<GetMySanctionStatusComposerType> {
    public constructor(private params: GetMySanctionStatusComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
