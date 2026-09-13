/** One Variable FX config as delivered by `VariableFxConfigsMessage` (the server's `VariableFxConfigUpdateData`). */
export interface IVariableFxConfigUpdateData {
    configId: number;
    /** True when the config targets room users (avatars, pets, bots); false for furniture. */
    isUserFx: boolean;
    /** 0 = always visible, 1 = visible for `showDuration` ms after a value change matching `showTriggerMask`. */
    showMode: number;
    /** Bitmask of change kinds that open the visibility window: 2 = value went up, 4 = went down, 8 = unchanged. */
    showTriggerMask: number;
    showOnMouseHover: boolean;
    showDuration: number;
    categoryId: number;
    styleId: number;
    colorId: number;
    widthId: number;
    rendererId: number;
    defaultMinValue: number;
    defaultMaxValue: number;
    extra: Map<string, string>;
}
