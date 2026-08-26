import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type LetUserInComposerType = {
    username: string;
    accepted: boolean;
};

export class LetUserInComposer implements IOutgoingPacket<LetUserInComposerType> {
    public constructor(private params: LetUserInComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.username,
            this.params.accepted,
        ];
    }
}
