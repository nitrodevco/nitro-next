import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type UpdateFloorPropertiesComposerType = object;

export class UpdateFloorPropertiesComposer implements IOutgoingPacket<UpdateFloorPropertiesComposerType> {
    public constructor(private params: UpdateFloorPropertiesComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
