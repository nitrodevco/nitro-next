import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CommandBotComposerType = object;

export class CommandBotComposer implements IOutgoingPacket<CommandBotComposerType> {
    public constructor(private params: CommandBotComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
