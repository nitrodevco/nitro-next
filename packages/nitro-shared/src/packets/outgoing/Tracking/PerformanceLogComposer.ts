import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PerformanceLogComposerType = {
    elapsedTime: number;
    userAgent: string;
    flashVersion: string;
    oS: string;
    browser: string;
    isDebugger: boolean;
    memoryUsage: number;
    unknownField: number;
    garbageCollections: number;
    averageFrameRate: number;
    slowUpdates: number;
};

export class PerformanceLogComposer implements IOutgoingPacket<PerformanceLogComposerType> {
    public constructor(private params: PerformanceLogComposerType) { }

    public compose(): (number | string)[] {
        return [
            this.params.elapsedTime,
            this.params.userAgent,
            this.params.flashVersion,
            this.params.oS,
            this.params.browser,
            this.params.isDebugger,
            this.params.memoryUsage,
            this.params.unknownField,
            this.params.garbageCollections,
            this.params.averageFrameRate,
            this.params.slowUpdates,
        ];
    }
}
