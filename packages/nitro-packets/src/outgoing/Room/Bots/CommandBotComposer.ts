// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CommandBotComposerType = {
    botId: number;
    skillType: number;
    command: string;
};

export class CommandBotComposer implements IOutgoingPacket<CommandBotComposerType> {
    public constructor(private params: CommandBotComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.botId,
            this.params.skillType,
            this.params.command,
        ];
    }
}
