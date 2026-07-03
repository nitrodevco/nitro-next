import { IFigureDataPalette } from '#api/asset/avatar';
import type { IPartColor } from './IPartColor';

export interface IPalette {
    append(data: IFigureDataPalette): void;
    getColor(id: number): IPartColor | undefined;
    readonly id: number;
    readonly colors: Map<number, IPartColor>;
}
