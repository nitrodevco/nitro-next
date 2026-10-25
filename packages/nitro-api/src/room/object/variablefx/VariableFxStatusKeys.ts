/** Splits a status key (`configId|variableId`) the way the Flash client's `VariableFxStatusUpdateData` does. */
export const ParseVariableFxStatusKey = (statusKey: string): { configId: number; variableId: string } => {
    const separator = statusKey.indexOf('|');

    return {
        configId: parseInt(statusKey.split('|')[0]) || 0,
        variableId: separator < 0 ? '' : statusKey.substring(separator + 1),
    };
};

/** Splits a removal key (`configId|variableId|u-or-f|entityId`) the way the Flash client's `VariableFxStatusRemoveData` does. */
export const ParseVariableFxStatusRemoveKey = (fullKey: string): { configId: number; variableId: string; isUserEntity: boolean; entityId: number } => {
    const first = fullKey.indexOf('|');
    const last = fullKey.lastIndexOf('|');
    const secondLast = fullKey.lastIndexOf('|', last - 1);

    return {
        configId: parseInt(fullKey.substring(0, first)) || 0,
        variableId: fullKey.substring(first + 1, secondLast),
        isUserEntity: fullKey.substring(secondLast + 1, last) === 'u',
        entityId: parseInt(fullKey.substring(last + 1)) || 0,
    };
};
