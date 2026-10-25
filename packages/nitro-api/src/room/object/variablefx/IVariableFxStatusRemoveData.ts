/** One Variable FX status removal as delivered by `VariableFxStatusRemovedMessage` (the server's `VariableFxStatusRemoveData`). */
export interface IVariableFxStatusRemoveData {
    /** `configId|variableId|u-or-f|entityId` as sent by the server. */
    fullKey: string;
    configId: number;
    variableId: string;
    isUserEntity: boolean;
    entityId: number;
}
