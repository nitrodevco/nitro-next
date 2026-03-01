import type { Rectangle } from 'pixi.js';
import type { ImageLike } from 'pixi.js';

import type { IRoomGeometry } from '../../IRoomGeometry';
import type { IRoomObject } from '../IRoomObject';
import type { IObjectVisualizationData } from './IRoomObjectVisualizationData';

export interface IRoomObjectVisualization {
    initialize(data: IObjectVisualizationData): boolean;
    dispose(): void;
    update(geometry: IRoomGeometry, time: number, update: boolean, skipUpdate: boolean): void;
    getBoundingRectangle(): Rectangle;
    getImage(): Promise<ImageLike | undefined>;
    instanceId: number;
    object: IRoomObject;
    updateSpriteCounter: number;
}
