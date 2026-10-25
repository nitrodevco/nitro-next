// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
/** Flash `WiredLogEntry`: one line of the room's wired log. */
export interface IWiredLogEntry {
    /** A long. */
    id: number;
    /** A byte; shown as `wiredmenu.logs_overview.log_level.<n>`. */
    logLevel: number;
    /** A byte; shown as `wiredmenu.logs_overview.log_source.<n>`. */
    logSource: number;
    logMessage: string;
    /** A long. */
    timestamp: number;
    timestampStr: string;
}
