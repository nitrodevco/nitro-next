export class VariableFxStatusData {
    public extra: Map<string, string>;

    constructor(
        public value: number,
        public overrideMinValue: number | undefined = undefined,
        public overrideMaxValue: number | undefined = undefined,
        extra?: Map<string, string>,
        public isInitialize: boolean = false,
    ) {
        this.extra = extra ?? new Map();
    }

    public get effectiveOverrideMinValue(): number | undefined {
        return this.overrideMinValue !== undefined && Number.isFinite(this.overrideMinValue) ? this.overrideMinValue : undefined;
    }

    public get effectiveOverrideMaxValue(): number | undefined {
        return this.overrideMaxValue !== undefined && Number.isFinite(this.overrideMaxValue) ? this.overrideMaxValue : undefined;
    }
}
