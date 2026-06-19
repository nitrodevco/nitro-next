import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetCreditsInfoComposerType = object;

export class GetCreditsInfoComposer implements IOutgoingPacket<GetCreditsInfoComposerType> {
    public constructor(private params: GetCreditsInfoComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
