import type { IAdvancedMap } from "@nitrodevco/nitro-api";

export class AdvancedMap<T, U> implements IAdvancedMap<T, U>
{
    private _length: number = 0;
    private _dictionary: Map<T, U> = new Map();
    private _array: U[] = [];
    private _keys: T[] = [];

    constructor(map?: Map<T, U>)
    {
        if (map) for (const [key, value] of map.entries()) this.add(key, value);
    }

    public dispose(): void
    {
        this.reset();
    }

    public reset(): void
    {
        for (const key of this._dictionary.keys()) this._dictionary.delete(key);

        this._length = 0;
        this._array = [];
        this._keys = [];
    }

    public unshift(key: T, value: U): boolean
    {
        if (this._dictionary.get(key) !== null) return false;

        this._dictionary.set(key, value);

        this._array.unshift(value);
        this._keys.unshift(key);

        this._length++;

        return true;
    }

    public add(key: T, value: U): boolean
    {
        if (this._dictionary.get(key) !== undefined) return false;

        this._dictionary.set(key, value);

        this._array[this._length] = value;
        this._keys[this._length] = key;

        this._length++;

        return true;
    }

    public remove(key: T): U | undefined
    {
        const value = this._dictionary.get(key);

        if(value !== undefined)
        {
            const index = this._array.indexOf(value);

            if (index >= 0)
            {
                this._array.splice(index, 1);
                this._keys.splice(index, 1);

                this._length--;
            }

            this._dictionary.delete(key);
        }

        return value;
    }

    public getWithIndex(index: number): U | undefined
    {
        if ((index < 0) || (index >= this._length)) return undefined;

        return this._array[index];
    }

    public getKey(index: number): T | undefined
    {
        if ((index < 0) || (index >= this._length)) return undefined;

        return this._keys[index];
    }

    public getKeys(): T[]
    {
        return this._keys.slice();
    }

    public hasKey(key: T): boolean
    {
        return (this._keys.indexOf(key) > -1);
    }

    public getValue(key: T): U | undefined
    {
        return this._dictionary.get(key);
    }

    public getValues(): U[]
    {
        return this._array.slice();
    }

    public hasValue(value: U): boolean
    {
        return (this._array.indexOf(value) > -1);
    }

    public indexOf(value: U): number
    {
        return this._array.indexOf(value);
    }

    public concatenate(newValues: IAdvancedMap<T, U>): void
    {
        for (const k of (newValues as AdvancedMap<T, U>)._keys) this.add(k, newValues.getValue(k) as U);
    }

    public clone(): IAdvancedMap<T, U>
    {
        const map = new AdvancedMap<T, U>();

        map.concatenate(this);

        return map;
    }

    public get length(): number
    {
        return this._length;
    }

    public get disposed(): boolean
    {
        return (!this._dictionary);
    }
}
