/** One Variable FX status as delivered by `VariableFxStatusMessage` (the server's `VariableFxStatusUpdateData`). */
export interface IVariableFxStatusUpdateData {
    /** `configId|variableId` as sent by the server. */
    statusKey: string;
    configId: number;
    variableId: string;
    /** True when the status should be applied without transition animations. */
    isInitialize: boolean;
    /** True when `entityId` is a room user (avatar, pet, bot); false when it is a furniture item. */
    isUserEntity: boolean;
    entityId: number;
    value: number;
    overrideMinValue: number | undefined;
    overrideMaxValue: number | undefined;
    extra: Map<string, string>;
}
