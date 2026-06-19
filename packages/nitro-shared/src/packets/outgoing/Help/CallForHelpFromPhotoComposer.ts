import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CallForHelpFromPhotoComposerType = object;

export class CallForHelpFromPhotoComposer implements IOutgoingPacket<CallForHelpFromPhotoComposerType> {
    public constructor(private params: CallForHelpFromPhotoComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
