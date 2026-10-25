import { IRoomRenderingCanvas, IVector3D } from '@nitrodevco/nitro-api';
import { Point, PointData } from 'pixi.js';

/**
 * `HabboFreeFlowChat.getScreenPointFromRoomLocation`: a remembered room location on screen, from
 * the canvas's middle at its scale - negated in a flipped room (`getRoomCanvasIsFlipped`) - plus the
 * location's screen point and the canvas's offset. With no location, the canvas's middle alone.
 */
export const chatScreenPoint = (canvas: Pick<IRoomRenderingCanvas, 'width' | 'height' | 'scale' | 'isFlipped' | 'geometry'>, offset: PointData, location: IVector3D | undefined): Point => {
    const scale = canvas.isFlipped ? -canvas.scale : canvas.scale;
    let x = (canvas.width * scale) / 2;
    let y = (canvas.height * scale) / 2;

    if (location) {
        const screenPoint = canvas.geometry.getScreenPoint(location);

        if (screenPoint) {
            x += (screenPoint.x * scale) + offset.x;
            y += (screenPoint.y * scale) + offset.y;
        }
    }

    return new Point(x, y);
};
