// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IWiredUserVariablesElement } from './IWiredUserVariablesElement';

/** Flash `WiredUserVariablesPage`: one page of the holders of a permanent user variable, with the filters it was made with. */
export interface IWiredUserVariablesPage {
    variableId: string;
    totalEntries: number;
    /** 1-based. */
    currentPage: number;
    /** The page size the server used. */
    amount: number;
    elements: IWiredUserVariablesElement[];
    /** The user type the page is narrowed to, -1 for all. Read before the sort type, sent after it. */
    userTypeFilter: number;
    /** Flash spells the getter `sortTypFilter`. */
    sortTypeFilter: number;
}
