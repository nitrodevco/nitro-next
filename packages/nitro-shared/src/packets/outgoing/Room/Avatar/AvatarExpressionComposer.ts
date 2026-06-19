import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type AvatarExpressionComposerType = object;

export class AvatarExpressionComposer implements IOutgoingPacket<AvatarExpressionComposerType> {
    public constructor(private params: AvatarExpressionComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
