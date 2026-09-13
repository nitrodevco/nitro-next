import { IVariableFxStatusModelData, IVariableFxStatusModelEntry } from '@nitrodevco/nitro-api';

export class VariableFxStatusModelEntry implements IVariableFxStatusModelEntry {
    constructor(
        public configId: number,
        public variableId: string,
        public createdAt: number,
        public updateId: number,
        public value: number,
        public overrideMinValue: number | undefined,
        public overrideMaxValue: number | undefined,
        public extra: Map<string, string>,
        public isInitialize: boolean,
        public invisible: boolean = false,
    ) {}

    public clone(): VariableFxStatusModelEntry {
        return new VariableFxStatusModelEntry(this.configId, this.variableId, this.createdAt, this.updateId, this.value, this.overrideMinValue, this.overrideMaxValue, new Map(this.extra), this.isInitialize, this.invisible);
    }

    public dispose(): void {
        this.extra = new Map();
    }
}

export class VariableFxStatusModelData implements IVariableFxStatusModelData {
    constructor(
        public updateId: number,
        public statusesByConfig: Map<number, Map<string, IVariableFxStatusModelEntry>>,
    ) {}

    public clone(): VariableFxStatusModelData {
        const statusesByConfig = new Map<number, Map<string, IVariableFxStatusModelEntry>>();

        for (const [ configId, statuses ] of this.statusesByConfig) {
            const clonedStatuses = new Map<string, IVariableFxStatusModelEntry>();

            for (const [ variableId, entry ] of statuses) clonedStatuses.set(variableId, entry.clone());

            statusesByConfig.set(configId, clonedStatuses);
        }

        return new VariableFxStatusModelData(this.updateId, statusesByConfig);
    }

    public dispose(): void {
        for (const statuses of this.statusesByConfig.values()) {
            for (const entry of statuses.values()) entry.dispose();

            statuses.clear();
        }

        this.statusesByConfig.clear();
    }
}
