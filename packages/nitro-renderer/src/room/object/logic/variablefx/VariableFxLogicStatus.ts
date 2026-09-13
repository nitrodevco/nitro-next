export class VariableFxLogicStatus {
    public extra: Map<string, string>;
    public createdAt: number;
    public updatedAt: number;
    public updateId: number = 0;
    /** Ticker time until which a `showMode` 1 status stays visible after a triggering change. */
    public visibleUntil: number = 0;

    constructor(
        public configId: number,
        public variableId: string,
        public value: number,
        public overrideMinValue: number | undefined,
        public overrideMaxValue: number | undefined,
        extra: Map<string, string> | undefined,
        public isInitialize: boolean,
        createdAt: number,
    ) {
        this.extra = extra ?? new Map();
        this.createdAt = createdAt;
        this.updatedAt = createdAt;
    }

    public dispose(): void {
        this.extra = new Map();
    }
}
