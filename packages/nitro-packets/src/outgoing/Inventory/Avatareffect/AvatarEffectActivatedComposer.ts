// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type AvatarEffectActivatedComposerType = {
    /** The effect's type id - the same number the avatar wears. */
    effectType: number;
};

export class AvatarEffectActivatedComposer implements IOutgoingPacket<AvatarEffectActivatedComposerType> {
    public constructor(private params: AvatarEffectActivatedComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.effectType,
        ];
    }
}
