/**
 * `addons/variablefx/model/VariableFxOption` - one colour, width or renderer the Variable FX
 * editor offers: its server id, its localization key and the name the runtime tables use for it
 * (`VariableFxServerTables`), which defaults to the key.
 */
export interface VariableFxOption {
    id: number;
    key: string;
    runtimeValue: string;
}

/** `new VariableFxOption(id, key, runtimeValue = null)`. */
export const createVariableFxOption = (id: number, key: string, runtimeValue?: string | null): VariableFxOption => ({
    id,
    key,
    runtimeValue: runtimeValue ?? key,
});
