import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ClientHelloComposerType = {
    production: string;
    platform: string;
    clientPlatform: number;
    deviceCategory: number;
};

export class ClientHelloComposer implements IOutgoingPacket<ClientHelloComposerType> {
    public constructor(private params: ClientHelloComposerType) { }

    public compose(): (number | string)[] {
        return [
            this.params.production,
            this.params.platform,
            this.params.clientPlatform,
            this.params.deviceCategory,
        ];
    }
}
