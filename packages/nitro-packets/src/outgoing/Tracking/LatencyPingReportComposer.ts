import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type LatencyPingReportComposerType = {
    averageLatency: number;
    validPingAverage: number;
    numPings: number;
};

export class LatencyPingReportComposer implements IOutgoingPacket<LatencyPingReportComposerType> {
    public constructor(private params: LatencyPingReportComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.averageLatency,
            this.params.validPingAverage,
            this.params.numPings,
        ];
    }
}
