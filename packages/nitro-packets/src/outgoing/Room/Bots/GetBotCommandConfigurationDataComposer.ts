// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetBotCommandConfigurationDataComposerType = {
    botId: number;
    skillType: number;
};

export class GetBotCommandConfigurationDataComposer implements IOutgoingPacket<GetBotCommandConfigurationDataComposerType> {
    public constructor(private params: GetBotCommandConfigurationDataComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.botId,
            this.params.skillType,
        ];
    }
}
