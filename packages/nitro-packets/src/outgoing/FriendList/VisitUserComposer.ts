import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type VisitUserComposerType = {
    playerName: string;
};

export class VisitUserComposer implements IOutgoingPacket<VisitUserComposerType> {
    public constructor(private params: VisitUserComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.playerName,
        ];
    }
}
