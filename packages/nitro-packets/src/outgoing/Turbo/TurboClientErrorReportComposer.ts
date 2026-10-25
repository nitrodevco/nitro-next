import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/**
 * Not Habbo's: the `clienterrors` extension of Turbo's client errors plugin - one error this client
 * caught, as UTF-8 JSON in one byte array. Sent only once the server accepted the extension.
 */
export type TurboClientErrorReportComposerType = {
    report: Uint8Array;
};

export class TurboClientErrorReportComposer implements IOutgoingPacket<TurboClientErrorReportComposerType> {
    public constructor(private params: TurboClientErrorReportComposerType) { }

    public compose(): (number | string | boolean | ArrayBuffer)[] {
        const { report } = this.params;

        return [
            report.byteLength,
            report.buffer.slice(report.byteOffset, report.byteOffset + report.byteLength) as ArrayBuffer,
        ];
    }
}
