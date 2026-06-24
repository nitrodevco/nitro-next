import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type AvatarEffectActivatedComposerType = object;

export class AvatarEffectActivatedComposer implements IOutgoingPacket<AvatarEffectActivatedComposerType> {
    public constructor(private params: AvatarEffectActivatedComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
