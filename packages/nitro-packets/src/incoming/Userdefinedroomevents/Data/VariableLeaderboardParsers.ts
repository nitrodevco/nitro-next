import { IMessageDataWrapper, ReadLong } from '@nitrodevco/nitro-api';

import { IVariableLeaderboardChoice, IVariableLeaderboardColumn, IVariableLeaderboardContext, IVariableLeaderboardContextChoice, IVariableLeaderboardDescriptor, IVariableLeaderboardRow } from './IVariableLeaderboard';

/**
 * Flash `VariableLeaderboardDescriptorData.fromMessage`: int overlay, int revision, string title,
 * string description, 4 x int location, int sort, int c (1..4) x (int type, string label, int width),
 * int k (0..10) x (string id, string name), string default id, int page size option. Null when a count
 * is out of range, as Flash drops the message then.
 */
export const VariableLeaderboardDescriptorParser = (wrapper: IMessageDataWrapper): IVariableLeaderboardDescriptor | null => {
    const overlayInstanceId = wrapper.readInt();
    const queryRevision = wrapper.readInt();
    const title = wrapper.readString();
    const description = wrapper.readString();
    const tileX = wrapper.readInt();
    const tileY = wrapper.readInt();
    const offsetX = wrapper.readInt();
    const altitude = wrapper.readInt();
    const sortMode = wrapper.readInt();
    const columnCount = wrapper.readInt();

    if ((columnCount < 1) || (columnCount > 4)) return null;

    const columns: IVariableLeaderboardColumn[] = [];

    for (let i = 0; i < columnCount; i++) columns.push({ type: wrapper.readInt(), label: wrapper.readString(), width: wrapper.readInt() });

    const choiceCount = wrapper.readInt();

    if ((choiceCount < 0) || (choiceCount > 10)) return null;

    const choices: IVariableLeaderboardChoice[] = [];

    for (let i = 0; i < choiceCount; i++) choices.push({ variableId: wrapper.readString(), displayName: wrapper.readString() });

    const defaultVariableId = wrapper.readString();
    const pageSizeOption = wrapper.readInt();

    return { overlayInstanceId, queryRevision, title, description, tileX, tileY, offsetX, altitude, sortMode, columns, choices, defaultVariableId, pageSizeOption };
};

/** Flash `variableleaderboard/_-02R.fromMessage`: the optional level and text follow their flags. */
export const VariableLeaderboardRowParser = (wrapper: IMessageDataWrapper): IVariableLeaderboardRow => {
    const rank = wrapper.readInt();
    const userId = wrapper.readInt();
    const username = wrapper.readString();
    const figure = wrapper.readString();
    const rawValue = wrapper.readString();
    const creationTime = ReadLong(wrapper);
    const lastUpdateTime = ReadLong(wrapper);
    const level = wrapper.readBoolean() ? wrapper.readString() : null;
    const textConnection = wrapper.readBoolean() ? wrapper.readString() : null;

    return { rank, userId, username, figure, rawValue, creationTime, lastUpdateTime, level, textConnection };
};

/** Wired context section 8 (`wiredcontext/params/VariableLeaderboardContext.as` + `VariableLeaderboardChoice.as`). */
export const VariableLeaderboardContextParser = (wrapper: IMessageDataWrapper): IVariableLeaderboardContext => {
    const overlayInstanceId = wrapper.readInt();
    const physicalTileX = wrapper.readInt();
    const physicalTileY = wrapper.readInt();
    const totalCandidateCount = wrapper.readInt();
    const count = wrapper.readInt();
    const choices: IVariableLeaderboardContextChoice[] = [];

    for (let i = 0; i < count; i++) choices.push({ variableId: wrapper.readString(), technicalName: wrapper.readString(), persistent: wrapper.readBoolean(), hasValue: wrapper.readBoolean(), applicableLevelUpCount: wrapper.readInt() });

    return { overlayInstanceId, physicalTileX, physicalTileY, totalCandidateCount, choices };
};
