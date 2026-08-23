import { AvatarExpressionEnum, IOutgoingPacket } from '@nitrodevco/nitro-api';

export type AvatarExpressionComposerType = {
    expressionType: AvatarExpressionEnum;
};

export class AvatarExpressionComposer implements IOutgoingPacket<AvatarExpressionComposerType> {
    public constructor(private params: AvatarExpressionComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.expressionType,
        ];
    }
}
