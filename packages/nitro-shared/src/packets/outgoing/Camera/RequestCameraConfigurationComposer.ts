import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RequestCameraConfigurationComposerType = object;

export class RequestCameraConfigurationComposer implements IOutgoingPacket<RequestCameraConfigurationComposerType> {
    public constructor(private params: RequestCameraConfigurationComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
