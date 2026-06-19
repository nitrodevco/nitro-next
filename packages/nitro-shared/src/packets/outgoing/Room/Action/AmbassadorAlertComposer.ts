import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type AmbassadorAlertComposerType = object;

export class AmbassadorAlertComposer implements IOutgoingPacket<AmbassadorAlertComposerType> {
    public constructor(private params: AmbassadorAlertComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
