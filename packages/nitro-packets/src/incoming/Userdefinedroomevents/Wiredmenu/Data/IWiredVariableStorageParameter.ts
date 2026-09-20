// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
/** Flash `WiredVariableStorageParameter`: the stored value of one permanent variable. */
export interface IWiredVariableStorageParameter {
    /** Only in `IWiredUserPermanentVariablesList`; in a `IWiredUserVariablesPage` the page names the variable. */
    variableId?: string;
    value: number;
    /** A long. */
    creationTime: number;
    creationTimeStr: string;
    /** A long. */
    lastUpdateTime: number;
    lastUpdateTimeStr: string;
}
