import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetNftCreditsComposerType = object;

export class GetNftCreditsComposer implements IOutgoingPacket<GetNftCreditsComposerType> {
    public constructor(private params: GetNftCreditsComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
