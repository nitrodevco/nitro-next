import { PointData, Rectangle } from 'pixi.js';

import { RoomObjectCategoryEnum } from '../object';

export interface IRoomPreviewerData {
    objectType: number;
    objectCategory: RoomObjectCategoryEnum;
    objectData: string;
    previewRectangle: Rectangle | undefined;
    previewWidth: number;
    previewHeight: number;
    previewScale: number;
    previewOffset: PointData;
    autoStateChange: boolean;
    autoStateChangeTime: number;

}
