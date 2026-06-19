import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type WiredSetPreferencesComposerType = object;

export class WiredSetPreferencesComposer implements IOutgoingPacket<WiredSetPreferencesComposerType> {
    public constructor(private params: WiredSetPreferencesComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
