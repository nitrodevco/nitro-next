import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type LatencyPingRequestComposerType = {
    requestId: number;
};

export class LatencyPingRequestComposer implements IOutgoingPacket<LatencyPingRequestComposerType> {
    public constructor(private params: LatencyPingRequestComposerType) { }

    public compose(): (number | string)[] {
        return [
            this.params.requestId,
        ];
    }
}
