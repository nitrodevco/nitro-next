// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type AvatarEffectSelectedComposerType = {
    /** The effect's type id - the same number the avatar wears. */
    effectType: number;
};

export class AvatarEffectSelectedComposer implements IOutgoingPacket<AvatarEffectSelectedComposerType> {
    public constructor(private params: AvatarEffectSelectedComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.effectType,
        ];
    }
}
