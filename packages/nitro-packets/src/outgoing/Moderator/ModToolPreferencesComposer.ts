import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ModToolPreferencesComposerType = object;

export class ModToolPreferencesComposer implements IOutgoingPacket<ModToolPreferencesComposerType> {
    public constructor(private params: ModToolPreferencesComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
