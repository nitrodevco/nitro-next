import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetPetInventoryComposerType = object;

export class GetPetInventoryComposer implements IOutgoingPacket<GetPetInventoryComposerType> {
    public constructor(private params: GetPetInventoryComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
