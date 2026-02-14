export interface IAdvancedMap<T = any, U = any> {
    dispose(): void;
    reset(): void;
    unshift(key: T, value: U): boolean;
    add(key: T, value: U): boolean;
    remove(key: T): U | undefined;
    getWithIndex(index: number): U | undefined;
    getKey(index: number): T | undefined;
    getKeys(): T[];
    hasKey(key: T): boolean;
    getValue(key: T): U | undefined;
    getValues(): U[];
    hasValue(value: U): boolean;
    indexOf(value: U): number;
    concatenate(newValues: IAdvancedMap<T, U>): void;
    clone(): IAdvancedMap<T, U>;
    readonly length: number;
    readonly disposed: boolean;
}
