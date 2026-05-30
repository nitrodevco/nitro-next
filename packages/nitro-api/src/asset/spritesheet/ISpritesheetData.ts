import type { ISpritesheetFrame } from './ISpritesheetFrame';
import type { ISpritesheetMeta } from './ISpritesheetMeta';

export interface ISpritesheetData {
    meta?: ISpritesheetMeta;
    frames?: { [index: string]: ISpritesheetFrame };
}
