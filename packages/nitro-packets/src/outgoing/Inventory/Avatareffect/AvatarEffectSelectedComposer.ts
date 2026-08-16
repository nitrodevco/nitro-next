import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type AvatarEffectSelectedComposerType = object;

export class AvatarEffectSelectedComposer implements IOutgoingPacket<AvatarEffectSelectedComposerType> {
    public constructor(private params: AvatarEffectSelectedComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
