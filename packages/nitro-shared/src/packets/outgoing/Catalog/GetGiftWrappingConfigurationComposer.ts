import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetGiftWrappingConfigurationComposerType = object;

export class GetGiftWrappingConfigurationComposer implements IOutgoingPacket<GetGiftWrappingConfigurationComposerType> {
    public constructor(private params: GetGiftWrappingConfigurationComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
