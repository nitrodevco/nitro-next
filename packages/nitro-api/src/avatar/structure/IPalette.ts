import type { IAdvancedMap } from '../../utils';
import type { IPartColor } from './IPartColor';

export interface IPalette {
    getColor(id: number): IPartColor;
    id: number;
    colors: IAdvancedMap<string, IPartColor>;
}
