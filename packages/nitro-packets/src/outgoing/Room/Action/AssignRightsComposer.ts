import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type AssignRightsComposerType = {
    userId: number;
};

export class AssignRightsComposer implements IOutgoingPacket<AssignRightsComposerType> {
    public constructor(private params: AssignRightsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.userId
        ];
    }
}
