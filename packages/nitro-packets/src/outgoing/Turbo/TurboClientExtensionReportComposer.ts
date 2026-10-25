import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/** One line of the report: the extension (plugin key) it is about, what happened, to what, and why. */
export interface TurboClientExtensionReport {
    owner: string;
    /** `module.refused`, `module.failed`, `patch.unmatched`, `patch.conflict` or `patch.applied`. */
    kind: string;
    /** The module's URL, or the template's id. */
    subject: string;
    /** For a refused module, why (`host`, `hash`, `load`, ...); for a patch, the element or the op count. */
    reason: string;
    message: string;
}

/**
 * Not Habbo's: part of Turbo's `client.modules` extension - what this client found running the
 * plugins' client halves, for the server's extension inspector (Turbo's `docs/extensions.md`,
 * roadmap step 5). Never answered.
 */
export class TurboClientExtensionReportComposer implements IOutgoingPacket<(string | number)[]> {
    public constructor(private reports: TurboClientExtensionReport[]) { }

    public compose(): (string | number)[] {
        return [ this.reports.length, ...this.reports.flatMap(report => [ report.owner, report.kind, report.subject, report.reason, report.message ]) ];
    }
}
