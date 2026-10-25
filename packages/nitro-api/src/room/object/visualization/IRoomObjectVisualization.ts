import { ImageLike, Rectangle, Texture } from 'pixi.js';

import { IRoomGeometry } from '../../IRoomGeometry';
import { IRoomObject } from '../IRoomObject';
import { IObjectVisualizationData } from './IRoomObjectVisualizationData';

export interface IRoomObjectVisualization {
    initialize(data: IObjectVisualizationData): boolean;
    dispose(): void;
    update(geometry: IRoomGeometry, time: number, update: boolean, skipUpdate: boolean): void;
    getBoundingRectangle(): Rectangle;
    getImage(): Promise<ImageLike | undefined>;
    /** The object's current sprites rendered into one texture (caller owns it), or undefined if it has nothing to draw. */
    getRenderTexture(): Texture | undefined;
    instanceId: number;
    object: IRoomObject;
    updateSpriteCounter: number;
}
