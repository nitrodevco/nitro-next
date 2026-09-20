// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IWiredLogEntry } from './IWiredLogEntry';

/** Flash `WiredLogPage`: one page of the room's wired log, with the filters it was made with. */
export interface IWiredLogPage {
    totalEntries: number;
    /** 1-based. */
    currentPage: number;
    /** The page size the server used. */
    amount: number;
    elements: IWiredLogEntry[];
    /** -1 when the page is not filtered by level - Flash's default, and what `WiredGetRoomLogsComposer` sends for "all". */
    logLevelFilter: number;
    /** -1 when the page is not filtered by source. */
    logSourceFilter: number;
    /** Absent when the page is not filtered by text. */
    query?: string;
}
