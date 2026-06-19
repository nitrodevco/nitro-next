import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetPromoArticlesComposerType = object;

export class GetPromoArticlesComposer implements IOutgoingPacket<GetPromoArticlesComposerType> {
    public constructor(private params: GetPromoArticlesComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
