import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/**
 * Not Habbo's: the `bugreport` extension - this client's capture for a report, as UTF-8 JSON,
 * then an image of the room view (empty when none was asked for or none could be read), each as
 * one byte array.
 */
export type TurboBugReportCaptureComposerType = {
    reportId: number;
    capture: Uint8Array;
    screenshot: Uint8Array;
};

const byteArray = (bytes: Uint8Array): ArrayBuffer => bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;

export class TurboBugReportCaptureComposer implements IOutgoingPacket<TurboBugReportCaptureComposerType> {
    public constructor(private params: TurboBugReportCaptureComposerType) { }

    public compose(): (number | string | boolean | ArrayBuffer)[] {
        const { reportId, capture, screenshot } = this.params;

        return [
            reportId,
            capture.byteLength,
            byteArray(capture),
            screenshot.byteLength,
            byteArray(screenshot),
        ];
    }
}
