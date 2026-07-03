import type { IFigureDataPalette, IPalette, IPartColor } from '@nitrodevco/nitro-api';

import { PartColor } from './PartColor';

export class Palette implements IPalette {
    private _id: number;
    private _colors: Map<number, IPartColor> = new Map();

    constructor(data: IFigureDataPalette) {
        this._id = data.id;

        this.append(data);
    }

    public append(data: IFigureDataPalette): void {
        if (data.colors) {
            for (const color of data.colors) {
                if (color.id === undefined) continue;

                const newColor = new PartColor(color);

                this._colors.set(color.id, newColor);
            }
        }
    }

    public getColor(id: number): IPartColor | undefined {
        return this._colors.get(id);
    }

    public get id(): number {
        return this._id;
    }

    public get colors(): Map<number, IPartColor> {
        return this._colors;
    }
}
