/** One published status inside `IVariableFxStatusModelData`. */
export interface IVariableFxStatusModelEntry {
    configId: number;
    variableId: string;
    /** Logic-side timestamp of when the status first appeared; orders additions inside a stack. */
    createdAt: number;
    /** Bumped by the logic every time the status is updated; a visualizer re-reads its data when it changes. */
    updateId: number;
    value: number;
    overrideMinValue: number | undefined;
    overrideMaxValue: number | undefined;
    extra: Map<string, string>;
    isInitialize: boolean;
    /** True while the status is outside its visibility window (`showMode` 1 and not hovered). */
    invisible: boolean;
    clone(): IVariableFxStatusModelEntry;
    dispose(): void;
}

/**
 * What a room object's logic publishes under `RoomObjectVariableEnum.VariableFxStatuses`: every
 * Variable FX status the object currently holds, grouped by config id, with an update id the
 * visualization compares against to know whether anything changed.
 */
export interface IVariableFxStatusModelData {
    updateId: number;
    statusesByConfig: Map<number, Map<string, IVariableFxStatusModelEntry>>;
    clone(): IVariableFxStatusModelData;
    dispose(): void;
}
