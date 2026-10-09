/**
 * The camera's viewfinder - Flash `CameraViewFinder` (`ui/widget/camera`) over
 * `habbo-room-ui-com/camera_interface_xml`, shown by the toolbar's camera icon.
 *
 * - While it is up, every 100 ms (`registerUpdateReceiver(this, 100)`) the room under the `image` rect is
 *   copied into it (`snapShotRoomCanvas` over `getViewPort`: the window's position plus the image's).
 * - Five slots (`NUMBER_OF_SLOTS`, kept for the session, as the class's statics are) hold the photos: the
 *   shutter (`button_release`, its picture `camera_camera_btn` / `_hi` over / `_down` pressed) plays the
 *   shutter sound, puts the picture in the active slot with a 350 ms white flash, shows `slot_container`
 *   and moves to the next empty slot - when none is left the window says the camera is full, once.
 *   A slot's button shows its photo in the viewfinder (preview mode: the crosshair gives way to the delete
 *   button and the editor button), an empty one makes it the active slot; the delete button empties the
 *   active slot. The shutter in preview mode goes back to the live view.
 * - The header's close hides it, its help opens `habbopages/camera`; it hides when the room is zoomed.
 *
 * - The shutter also collects the room's render data under the image for its slot (`collectPhotoData` ->
 *   `RoomEngine.getRenderRoomMessage`); `button_editor` hides the viewfinder and opens the photo lab on the
 *   slot's photo (`editPhoto`), which sends that data with its effects.
 * - Built with the room (`CameraWidget`'s constructor), it asks for the camera's prices
 *   (`sendInitCameraMessage`: `RequestCameraConfigurationMessageComposer` with the `CAMERA` perk).
 */
import { RequestCameraConfigurationComposer } from '@nitrodevco/nitro-packets';
import { GetRenderer, SpriteDataCollector } from '@nitrodevco/nitro-renderer';
import { Rectangle } from 'pixi.js';
import { useEffect, useState } from 'react';

import { CameraPhoto, editPhoto, isRoomUnfit, openClientLink } from '#base/commands';
import { GetRoomBackgroundColor } from '#base/components';
import { useWebSocketContext } from '#base/context/communication';
import { getRoom, useRoom } from '#base/context/room';
import { useConfigValue, useIsWindowVisible, useSystemStore, useWindowActions } from '#base/context/system';
import { PerkCodes, useOwnPerkAllowed, userStore } from '#base/context/user';
import { GetSoundManager, HabboSoundTypesEnum } from '#base/sound';
import { Region, TemplateBindings, TemplateWindow, TemplateWindows, useWindowActivation } from '#base/theme';

import { CanvasPicture } from './CanvasPicture';

const TEMPLATE = 'habbo-room-ui-com/camera_interface_xml';
const ASSET = (name: string) => `habbo-window-manager-com-${name}`;

const NUMBER_OF_SLOTS = 5;
/** `registerUpdateReceiver(this, 100)`. */
const UPDATE_INTERVAL_MS = 100;
/** `_-wG`. */
const FLASH_MS = 350;
/** The viewfinder is 320 x 320, a slot's picture drawn at (width - 2) / 320 in its 58 x 58. */
const IMAGE_SIZE = 320;
const SLOT_SIZE = 58;
/** `clearCurrentSlot`'s grey. */
const EMPTY_SLOT_COLOR = '#d2d2d2';
/** The window without `slot_container` (the layout's `custom_frame` height), and with it. */
const HEIGHT_WITHOUT_SLOTS = 462;
const WINDOW_WIDTH = 340;
const WINDOW_FULL_HEIGHT = 536;

interface Slot {
    image: HTMLCanvasElement;
    empty: boolean;
    /** `_renderRoomMessages[slot]`. */
    render?: CameraPhoto['render'];
}

const newCanvas = (color?: string) => {
    const canvas = document.createElement('canvas');

    canvas.width = IMAGE_SIZE;
    canvas.height = IMAGE_SIZE;

    if (color) {
        const context = canvas.getContext('2d');

        if (context) {
            context.fillStyle = color;
            context.fillRect(0, 0, IMAGE_SIZE, IMAGE_SIZE);
        }
    }

    return canvas;
};

const copyCanvas = (source: HTMLCanvasElement) => {
    const canvas = newCanvas();

    canvas.getContext('2d')?.drawImage(source, 0, 0);

    return canvas;
};

/** The pictures survive the window closing, as `CameraViewFinder`'s static slots do. */
let slots: Slot[] = Array.from({ length: NUMBER_OF_SLOTS }, () => ({ image: newCanvas(EMPTY_SLOT_COLOR), empty: true }));
let fullAlertShown = false;
/** The flash's start, read when the shutter goes. */
const now = () => performance.now();

/** The viewfinder's live picture, and its place on the screen once drawn. */
const liveCanvas = newCanvas('#000000');
let imageNode: { getGlobalPosition: () => { x: number; y: number } } | null = null;
const setImageNode = (node: unknown) => {
    imageNode = node as typeof imageNode;
};

export const CameraView = () => {
    const visible = useIsWindowVisible('camera');
    const { hideWindow, showAlert } = useWindowActions();
    const getLocalizationValue = useSystemStore(x => x.getLocalizationValue);
    const { zIndex, onPointerDown } = useWindowActivation('camera');
    // `_window.center()`: the window is its layout's 340 x 536 whether or not `slot_container` shows.
    const position = { x: Math.max(0, Math.floor((window.innerWidth - WINDOW_WIDTH) / 2)), y: Math.max(0, Math.floor((window.innerHeight - WINDOW_FULL_HEIGHT) / 2)) };
    const [ , redraw ] = useState(0);
    const [ active, setActive ] = useState(0);
    const [ preview, setPreview ] = useState(false);
    const [ slotsShown, setSlotsShown ] = useState(false);
    const [ shutter, setShutter ] = useState<'normal' | 'hi' | 'down'>('normal');
    const [ flashStart, setFlashStart ] = useState(0);
    const [ flashAlpha, setFlashAlpha ] = useState(0);
    const refresh = () => redraw(version => version + 1);
    const room = useRoom();
    const { send } = useWebSocketContext();
    const cameraAllowed = useOwnPerkAllowed(PerkCodes.Camera);
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';
    const groupBadgeUrl = useConfigValue<string>('group.badge.url') ?? '';

    // `CameraWidget`'s constructor, once per room: `sendInitCameraMessage`.
    useEffect(() => {
        if (room && cameraAllowed) send(new RequestCameraConfigurationComposer({}));
    }, [ room, cameraAllowed, send ]);

    // `update`, every 100 ms while shown and not in preview mode: the room under the image.
    useEffect(() => {
        if (!visible || preview) return;

        const capture = () => {
            const node = imageNode;
            const stage = getRoom()?.canvas?.master;

            if (!node || !stage) return;

            const { x, y } = node.getGlobalPosition();

            try {
                const { pixels, width, height } = GetRenderer().extract.pixels({ target: stage, frame: new Rectangle(Math.round(x), Math.round(y), IMAGE_SIZE, IMAGE_SIZE), resolution: 1 });
                const context = liveCanvas.getContext('2d');

                context?.putImageData(new ImageData(new Uint8ClampedArray(pixels), width, height), 0, 0);
            } catch {
                // The stage is not there (no room): the viewfinder stays as it was.
            }

            refresh();
        };

        capture();

        const timer = setInterval(capture, UPDATE_INTERVAL_MS);

        return () => clearInterval(timer);
    }, [ visible, preview ]);

    // `updateFlash`: the white fading out over 350 ms.
    useEffect(() => {
        if (!flashStart) return;

        const timer = setInterval(() => {
            const elapsed = performance.now() - flashStart;

            if (elapsed > FLASH_MS) {
                setFlashStart(0);
                setFlashAlpha(0);

                return;
            }

            setFlashAlpha((FLASH_MS - elapsed) / FLASH_MS);
        }, 16);

        return () => clearInterval(timer);
    }, [ flashStart ]);

    // `onRoomZoomed` / `onRoomDisposed`: a zoomed room hides it.
    useEffect(() => {
        if (!visible) return;

        const timer = setInterval(() => {
            if (isRoomUnfit()) hideWindow('camera');
        }, UPDATE_INTERVAL_MS);

        return () => clearInterval(timer);
    }, [ visible, hideWindow ]);

    // `toggleVisible`'s `setMode(false)`, as it comes up again.
    if (!visible && preview) setPreview(false);

    if (!visible) return null;

    const nextEmpty = () => slots.findIndex(slot => slot.empty);

    /** `addToCurrentSlot`. */
    const addToCurrentSlot = (image: HTMLCanvasElement, render: Slot['render']) => {
        slots = slots.map((slot, index) => ((index === active) ? { image, empty: false, render } : slot));

        const next = slots.findIndex(slot => slot.empty);

        if (next >= 0) {
            setActive(next);
        } else if (!fullAlertShown) {
            showAlert(getLocalizationValue('camera.full.header'), getLocalizationValue('camera.full.body'));
            fullAlertShown = true;
        }
    };

    /** `clearCurrentSlot`: the active slot empty again and the live view back. */
    const clearCurrentSlot = () => {
        slots = slots.map((slot, index) => ((index === active) ? { image: newCanvas(EMPTY_SLOT_COLOR), empty: true } : slot));
        setPreview(false);
    };

    const onShutter = () => {
        if (preview) {
            setPreview(false);

            return;
        }

        GetSoundManager().playSound(HabboSoundTypesEnum.CAMERA_SHUTTER);
        addToCurrentSlot(copyCanvas(liveCanvas), collectPhotoData());
        setFlashStart(now());
        setSlotsShown(true);
    };

    /** `collectPhotoData` -> `RoomEngine.getRenderRoomMessage`: the room under the image, as the thumbnail camera collects it. */
    const collectPhotoData = (): Slot['render'] => {
        const current = getRoom();
        const canvas = current?.canvas;

        if (!current || !canvas || !imageNode) return undefined;

        const { x, y } = imageNode.getGlobalPosition();
        const viewport = new Rectangle(Math.round(x), Math.round(y), IMAGE_SIZE, IMAGE_SIZE);
        const collector = new SpriteDataCollector(current, canvas, imageLibraryUrl, groupBadgeUrl);

        return {
            sprites: collector.getFurniData(viewport, -1),
            modifiers: collector.getRoomRenderingModifiers(),
            planes: collector.getRoomPlanes(viewport, GetRoomBackgroundColor()),
            roomId: current.roomId,
            topSecurityLevel: userStore.getState().securityLevel,
            time: Date.now(),
        };
    };

    /** `button_editor`: the viewfinder hides and the lab opens on the photo shown. */
    const onEditor = () => {
        const slot = slots[active];

        hideWindow('camera');
        editPhoto({ image: copyCanvas(slot.image), render: slot.render });
    };

    /** `cameraButton_<n>`. */
    const onSlot = (index: number) => {
        if (slots[index].empty) {
            setActive(index);
            setPreview(false);

            return;
        }

        setPreview(true);
        setActive(index);
    };

    /** `chooseSlotButton_<n>`. */
    const onSlotArrow = (index: number) => {
        setActive(index);
        setPreview(false);
    };

    const shown = preview ? slots[active].image : liveCanvas;
    const releaseAsset = (shutter === 'down') ? 'camera_camera_btn_down' : (shutter === 'hi') ? 'camera_cam_btn_hi' : 'camera_camera_btn';

    const bindings: TemplateBindings = {
        image: {
            children: (
                <CanvasPicture
                    canvas={shown}
                    size={IMAGE_SIZE}
                    onNode={setImageNode}
                />
            ),
        },
        flash: {
            visible: flashStart > 0,
            children: (
                <Region
                    backgroundColor="#ffffff"
                    alpha={flashAlpha}
                    layout={{ position: 'absolute', left: 0, top: 0, width: IMAGE_SIZE, height: IMAGE_SIZE }}
                />
            ),
        },
        // `WME_CLICK` on the header's buttons: `header_button_close` hides, `header_button_help` opens `habbopages/camera`.
        header_button_close: { onPointerTap: () => hideWindow('camera') },
        header_button_help: { onPointerTap: () => openClientLink(send, 'habbopages/camera') },
        slot_container: { visible: slotsShown },
        camera_crosshair: { visible: !preview },
        delete_photo_button: { visible: preview, onPointerTap: clearCurrentSlot },
        button_editor: { visible: preview, onPointerTap: onEditor },
        buyButtonBg: { visible: preview },
        photo_date: { visible: false },
        photo_roomname: { visible: false },
        release_bitmap: { asset: ASSET(releaseAsset) },
        button_release: {
            onPointerOver: () => setShutter('hi'),
            onPointerOut: () => setShutter('normal'),
            onPointerDown: () => setShutter('down'),
            onPointerUp: () => setShutter('hi'),
            onPointerTap: onShutter,
        },
    };

    for (let index = 0; index < NUMBER_OF_SLOTS; index++) {
        bindings[`cameraButton_${index}`] = { onPointerTap: () => onSlot(index) };
        bindings[`cameraSlot_${index}`] = {
            children: (
                <CanvasPicture
                    canvas={slots[index].image}
                    size={SLOT_SIZE - 2}
                    offset={1}
                />
            ),
        };
        bindings[`chooseSlotButton_${index}`] = { onPointerTap: () => onSlotArrow(index) };
        bindings[`slotImage_${index}`] = { asset: ASSET((index === active) ? 'camera_arrow_green' : 'camera_arrow_gray') };
    }

    /** `setActiveSlot`: the border over the slot's button and the delete button at its top right corner. */
    const arrange = ({ find }: TemplateWindows) => {
        const border = find('photo_border');
        const remove = find('delete_photo_button');

        if (!border) return;

        const button = find(`cameraButton_${active}`);
        const x = ((button?.x ?? 0) - 1) + (button?.parent?.x ?? 0);
        const y = ((button?.y ?? 0) - 3) + (button?.parent?.y ?? 0);

        border.setX(x);
        border.setY(y);

        if (remove) {
            remove.setY(y);
            remove.setX((x + border.width) - remove.width);
        }
    };

    const height = slotsShown ? undefined : HEIGHT_WITHOUT_SLOTS;

    return (
        <Region
            interactive
            zIndex={zIndex}
            onPointerDown={onPointerDown}
            layout={{ position: 'absolute', left: position.x, top: position.y, width: WINDOW_WIDTH, height: height ?? WINDOW_FULL_HEIGHT }}
        >
            <TemplateWindow
                id={TEMPLATE}
                height={height}
                bindings={bindings}
                arrange={arrange}
            />
        </Region>
    );
};
