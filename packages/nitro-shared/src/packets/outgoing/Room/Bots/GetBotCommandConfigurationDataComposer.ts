import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetBotCommandConfigurationDataComposerType = object;

export class GetBotCommandConfigurationDataComposer implements IOutgoingPacket<GetBotCommandConfigurationDataComposerType> {
    public constructor(private params: GetBotCommandConfigurationDataComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
