import type { SpritesheetData } from 'pixi.js';

import type { ISpritesheetFrame } from './ISpritesheetFrame';
import type { ISpritesheetMeta } from './ISpritesheetMeta';

export interface ISpritesheetData extends SpritesheetData {
    meta: ISpritesheetMeta;
    frames: { [index: string]: ISpritesheetFrame };
}
