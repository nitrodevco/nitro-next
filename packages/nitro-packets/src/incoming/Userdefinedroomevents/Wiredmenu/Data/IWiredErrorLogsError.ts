export interface IWiredErrorLogsError {
    errorId: number;
    errorName: string;
    category: string;
    throwCount: number;
    msSinceLastOccurrence: number;
}
