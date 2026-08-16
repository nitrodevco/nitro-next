import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type AmbassadorAlertComposerType = {
    userId: number;
};

export class AmbassadorAlertComposer implements IOutgoingPacket<AmbassadorAlertComposerType> {
    public constructor(private params: AmbassadorAlertComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.userId
        ];
    }
}
