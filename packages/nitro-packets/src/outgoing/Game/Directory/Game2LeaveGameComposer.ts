import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type Game2LeaveGameComposerType = object;

export class Game2LeaveGameComposer implements IOutgoingPacket<Game2LeaveGameComposerType> {
    public constructor(private params: Game2LeaveGameComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
