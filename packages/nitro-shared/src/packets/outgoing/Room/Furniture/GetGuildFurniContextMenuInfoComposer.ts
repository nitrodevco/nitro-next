import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetGuildFurniContextMenuInfoComposerType = object;

export class GetGuildFurniContextMenuInfoComposer implements IOutgoingPacket<GetGuildFurniContextMenuInfoComposerType> {
    public constructor(private params: GetGuildFurniContextMenuInfoComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
