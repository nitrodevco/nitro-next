import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type Game2SetUserMoveTargetComposerType = object;

export class Game2SetUserMoveTargetComposer implements IOutgoingPacket<Game2SetUserMoveTargetComposerType> {
    public constructor(private params: Game2SetUserMoveTargetComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
