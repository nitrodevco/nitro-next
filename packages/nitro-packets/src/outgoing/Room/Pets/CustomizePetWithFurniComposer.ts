// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CustomizePetWithFurniComposerType = {
    /** The product being spent. */
    objectId: number;
    /** The pet it is being used on, by its web id rather than its place in the room. */
    petId: number;
};

export class CustomizePetWithFurniComposer implements IOutgoingPacket<CustomizePetWithFurniComposerType> {
    public constructor(private params: CustomizePetWithFurniComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.objectId,
            this.params.petId,
        ];
    }
}
