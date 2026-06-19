import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ModAlertComposerType = object;

export class ModAlertComposer implements IOutgoingPacket<ModAlertComposerType> {
    public constructor(private params: ModAlertComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
