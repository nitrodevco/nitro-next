/** One leaderboard column (Flash `variableleaderboard/_-53.as`): type, header name and width option. */
export interface IVariableLeaderboardColumn {
    /** 0 username, 1 value, 2 last update, 3 creation time, 4 level, 5 text connection. */
    type: number;
    label: string;
    /** 0 small (70 px), 1 medium (90), 2 large (120), 3 XL (170). */
    width: number;
}

/** A variable a viewer can pick on a leaderboard (Flash `variableleaderboard/_-a7.as`). */
export interface IVariableLeaderboardChoice {
    variableId: string;
    displayName: string;
}

/** A published leaderboard (Flash `VariableLeaderboardDescriptorData`). */
export interface IVariableLeaderboardDescriptor {
    overlayInstanceId: number;
    queryRevision: number;
    title: string;
    description: string;
    tileX: number;
    tileY: number;
    offsetX: number;
    altitude: number;
    /** 0 highest value, 1 lowest value, 2 oldest creation, 3 latest creation, 4 oldest update, 5 latest update. */
    sortMode: number;
    columns: IVariableLeaderboardColumn[];
    choices: IVariableLeaderboardChoice[];
    defaultVariableId: string;
    /** 0..2: 10, 15 or 20 rows a page. */
    pageSizeOption: number;
}

/** One leaderboard entry (Flash `variableleaderboard/_-02R.as`). */
export interface IVariableLeaderboardRow {
    rank: number;
    userId: number;
    username: string;
    figure: string;
    rawValue: string;
    creationTime: number;
    lastUpdateTime: number;
    level: string | null;
    textConnection: string | null;
}

/** A stacked variable as the Leaderboard editor sees it (`wiredcontext/params/VariableLeaderboardChoice.as`). */
export interface IVariableLeaderboardContextChoice {
    variableId: string;
    technicalName: string;
    persistent: boolean;
    hasValue: boolean;
    applicableLevelUpCount: number;
}

/** Wired context section 8 (`wiredcontext/params/VariableLeaderboardContext.as`). */
export interface IVariableLeaderboardContext {
    /** 0 while the add-on is unpublished (`published` is `overlayInstanceId > 0`). */
    overlayInstanceId: number;
    physicalTileX: number;
    physicalTileY: number;
    totalCandidateCount: number;
    choices: IVariableLeaderboardContextChoice[];
}

/** Rows per page by page size option (`VariableLeaderboardDescriptorData`). */
export const VARIABLE_LEADERBOARD_PAGE_SIZES = [ 10, 15, 20 ];

/** Rows per chunk the server sends (`VariableLeaderboardPagingState`). */
export const VARIABLE_LEADERBOARD_CHUNK_SIZE = 50;
