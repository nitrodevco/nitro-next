/**
 * The room camera's opening - `CameraWidget.startTakingPhoto`: the toolbar's camera icon shows the
 * viewfinder, or hides it when it is up. A room that is zoomed or flipped cannot be photographed
 * (`camera.zoom.missing`), and the viewfinder hides itself when the room is zoomed (`onRoomZoomed`).
 */
import { getRoom } from '#base/context/room';
import { systemStore } from '#base/context/system';

/** `getRoomCanvasScale() < 1 || getRoomCanvasIsFlipped()`. */
export const isRoomUnfit = () => {
    const canvas = getRoom()?.canvas;

    return !!canvas && ((canvas.scale < 1) || canvas.isFlipped);
};

export const startTakingPhoto = () => {
    const { getLocalizationValue, showAlert, toggleWindow } = systemStore.getState();

    if (isRoomUnfit()) {
        showAlert(getLocalizationValue('camera.zoom.missing.header'), getLocalizationValue('camera.zoom.missing.body'));

        return;
    }

    toggleWindow('camera');
};
