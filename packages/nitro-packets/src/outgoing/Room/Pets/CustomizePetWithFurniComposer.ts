import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CustomizePetWithFurniComposerType = object;

export class CustomizePetWithFurniComposer implements IOutgoingPacket<CustomizePetWithFurniComposerType> {
    public constructor(private params: CustomizePetWithFurniComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
