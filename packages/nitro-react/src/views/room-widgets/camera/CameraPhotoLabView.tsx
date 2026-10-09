/**
 * The photo lab - Flash `CameraPhotoLab` over `habbo-room-ui-com/camera_editor_xml`, opened by the
 * viewfinder's `button_editor` on the photo it shows (`editPhoto`), centred.
 *
 * - Two type buttons (`camera_typebutton_xml`, `buildTypeButtons`): colour filters and composite effects,
 *   at y 50 and centred over `item_grid`; the chosen one shows its `active_border` and fills the grid.
 * - The grid holds a `camera_filterbutton_xml` per effect `camera.available.effects` names: its thumbnail
 *   is the photo with the effect at full strength, or, below the effect's camera achievement level
 *   (`ACH_CameraPhotoCount` in "explore", else "archive"), the lock and "Requires Camera Achievement Level N"
 *   as its tooltip. A click turns the effect on and selects it (frames: one at a time); its red X turns it off.
 * - The selected effect's strength is on the slider (`CameraFxStrengthSlider`: the button over a 288 wide
 *   track, 50% to start; "<name> <n>%" over it), applied when the button is let go or the track clicked.
 * - The photo shows every effect that is on, in the effects' order, colour filters and composites first,
 *   then the frame; `zoom_button` doubles the middle of it. `save_button` saves it as
 *   `Habbo_<yyyy-MM-dd_HH-mm-ss>.png`.
 * - Preview (`purchase_button`) sends the photo's render data with its effects and zoom
 *   (`RenderRoomMessageComposer`) and opens the "Buy or publish" dialog with the lab hidden behind it.
 *   Cancel goes back to the viewfinder; the header's close just closes; its help opens `habbopages/camera`.
 */
import { RenderRoomComposer } from '@nitrodevco/nitro-packets';
import { useEffect, useMemo, useRef, useState } from 'react';

import { closePhotoLab, openPhotoPurchase, returnToViewfinder, useCameraStore } from '#base/commands';
import { achievementsStore, useAchievementsStore } from '#base/context/achievements';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigValue, useSystemStore } from '#base/context/system';
import { TemplateBindings, TemplateItem, TemplateWindow, TemplateWindows, useTemplate, useTemplateFrame } from '#base/theme';
import { buildRenderRoomMessageData } from '#base/utils';

import { CameraEffectDefinition, cloneCanvas, drawEffect, getAvailableEffects, loadEffectImage, zoomCanvas } from './cameraEffects';
import { CanvasPicture } from './CanvasPicture';

const TEMPLATE = 'habbo-room-ui-com/camera_editor_xml';
const FILTER_BUTTON = 'habbo-room-ui-com/camera_filterbutton_xml';
const TYPE_BUTTON = 'habbo-room-ui-com/camera_typebutton_xml';
const ASSET = (name: string) => `habbo-window-manager-com-${name}`;

const IMAGE_SIZE = 320;
/** `camera_filterbutton_xml`'s `content`. */
const THUMB_SIZE = 56;
/** `slider_movement_area` (312) less `slider_button` (24): `CameraFxStrengthSlider.getScale`. */
const SLIDER_SCALE = 288;
/** `buildTypeButtons`: 6 apart, at y 50, centred over the grid - in the frame's content (margins 3, 36). */
const TYPE_BUTTON_WIDTH = 95;
const TYPE_BUTTON_GAP = 6;
const TYPE_BUTTON_Y = 50 - 36;
const ITEM_GRID = { x: 16, width: 220 };

interface EffectState {
    isOn: boolean;
    /** `CameraEffect.value`: 0..`SLIDER_SCALE`, `0.5 * levelRequired` to start. */
    value: number;
}

const strengthOf = (state: EffectState | undefined) => (state?.value ?? (SLIDER_SCALE / 2)) / SLIDER_SCALE;

/** `HabboQuestEngine.getAchievementLevel(category, "ACH_CameraPhotoCount")`. */
const getCameraAchievementLevel = () => {
    const categories = achievementsStore.getState().categories;

    for (const code of [ 'explore', 'archive' ]) {
        const achievement = categories?.find(category => category.code === code)?.achievements.find(entry => entry.badgeId.indexOf('ACH_CameraPhotoCount') === 0);
        const level = achievement ? (achievement.finalLevel ? achievement.level : Math.max(0, achievement.level - 1)) : 0;

        if (level) return level;
    }

    return 0;
};

/** `offerSaveAsFile`'s name: `Habbo_` and the time as `yyyy-MM-dd_HH-mm-ss`. */
const saveFileName = () => {
    const now = new Date();
    const pad = (value: number) => String(value).padStart(2, '0');

    return `Habbo_${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}.png`;
};

export const CameraPhotoLabView = () => {
    const photo = useCameraStore(x => x.labPhoto);
    const visible = useCameraStore(x => x.labVisible);

    if (!photo) return null;

    return (
        <CameraPhotoLab visible={visible} />
    );
};

const CameraPhotoLab = ({ visible }: { visible: boolean }) => {
    const photo = useCameraStore(x => x.labPhoto)!;
    const { send } = useWebSocketContext();
    const getLocalizationValue = useSystemStore(x => x.getLocalizationValue);
    const libraryUrl = useConfigValue<string>('image.library.url') ?? '';
    const availableEffects = useConfigValue<string>('camera.available.effects');
    const filterButton = useTemplate(FILTER_BUTTON);
    const typeButton = useTemplate(TYPE_BUTTON);
    // Re-read as the achievements arrive (`ensureAchievementsInitialized`).
    useAchievementsStore(x => x.categories);
    const level = getCameraAchievementLevel();
    const effects = useMemo(() => getAvailableEffects(availableEffects), [ availableEffects ]);
    const [ images, setImages ] = useState<Map<string, HTMLImageElement | undefined>>(new Map());
    const [ states, setStates ] = useState<Map<string, EffectState>>(new Map());
    const [ selected, setSelected ] = useState<string | undefined>(undefined);
    const [ highlighted, setHighlighted ] = useState(false);
    const [ sliderShown, setSliderShown ] = useState(false);
    const [ dragValue, setDragValue ] = useState<number | undefined>(undefined);
    const [ filterType, setFilterType ] = useState<'colormatrix' | 'composite'>('colormatrix');
    const [ zoom, setZoom ] = useState(false);
    const dragStart = useRef<{ x: number; value: number } | undefined>(undefined);
    const frame = useTemplateFrame({ id: 'camera-photo-lab', centered: true, rememberPosition: false, resizeDirection: 'none', onClose: closePhotoLab });

    // `CameraFxPreloader`: the composite and frame pictures.
    useEffect(() => {
        let live = true;
        const wanted = effects.filter(entry => entry.type !== 'colormatrix');

        void Promise.all(wanted.map(entry => loadEffectImage(libraryUrl, entry.name).then(image => [ entry.name, image ] as const))).then((loaded) => {
            if (live) setImages(new Map(loaded));
        });

        return () => {
            live = false;
        };
    }, [ effects, libraryUrl ]);

    /** `createFxButton`'s thumbnail: the photo with the effect at full strength, scaled into `content`. */
    const thumbnails = useMemo(() => {
        const result = new Map<string, HTMLCanvasElement>();

        for (const entry of effects) {
            if (level < entry.achievementLevel) continue;
            if ((entry.type !== 'colormatrix') && !images.get(entry.name)) continue;

            const picture = cloneCanvas(photo.image);

            drawEffect(picture, entry, 1, images.get(entry.name));

            const thumb = document.createElement('canvas');

            thumb.width = THUMB_SIZE;
            thumb.height = THUMB_SIZE;

            const context = thumb.getContext('2d');

            if (context) {
                context.imageSmoothingEnabled = true;
                context.drawImage(picture, 0, 0, THUMB_SIZE, THUMB_SIZE);
            }

            result.set(entry.name, thumb);
        }

        return result;
    }, [ effects, images, level, photo ]);

    // `renderAllEffects`: the photo with its zoom and every effect that is on.
    const rendered = useMemo(() => {
        let picture = cloneCanvas(photo.image);

        if (zoom) picture = zoomCanvas(picture);

        for (const entry of effects) {
            const state = states.get(entry.name);

            if (state?.isOn && (entry.type !== 'frame')) drawEffect(picture, entry, strengthOf(state), images.get(entry.name));
        }

        for (const entry of effects) {
            if (states.get(entry.name)?.isOn && (entry.type === 'frame')) drawEffect(picture, entry, 1, images.get(entry.name));
        }

        return picture;
    }, [ effects, states, images, zoom, photo ]);

    const setState = (name: string, update: Partial<EffectState>) => setStates((previous) => {
        const next = new Map(previous);

        next.set(name, { ...(next.get(name) ?? { isOn: false, value: SLIDER_SCALE / 2 }), ...update });

        return next;
    });

    /** `setActiveEffect`. */
    const setActiveEffect = (entry: CameraEffectDefinition) => {
        setSelected(entry.name);
        setHighlighted(true);
        setStates((previous) => {
            const next = new Map(previous);

            next.set(entry.name, { ...(next.get(entry.name) ?? { value: SLIDER_SCALE / 2 }), isOn: true });

            // `allowsOnlyOneInstance`: a frame turns the other frames off.
            if (entry.type === 'frame') {
                for (const other of effects) {
                    if ((other.type === 'frame') && (other.name !== entry.name) && next.get(other.name)?.isOn) next.set(other.name, { ...next.get(other.name)!, isOn: false });
                }
            }

            return next;
        });
        setSliderShown(entry.type !== 'frame');
    };

    /** `effectButtonClick`'s `remove_effect_button`. */
    const removeEffect = (entry: CameraEffectDefinition) => {
        setState(entry.name, { isOn: false });

        if (selected === entry.name) {
            setSliderShown(false);
            setSelected(undefined);
        }
    };

    /** `setSelectedFxValue`. */
    const setSelectedValue = (value: number) => {
        if (!selected) return;

        setState(selected, { value: Math.max(0, Math.min(SLIDER_SCALE, Math.round(value))) });
    };

    // `buttonProcedure`: the slider button follows the pointer while it is down, and sets the value when let go.
    useEffect(() => {
        if (dragValue === undefined) return;

        const move = (event: PointerEvent) => {
            const start = dragStart.current;

            if (start) setDragValue(Math.max(0, Math.min(SLIDER_SCALE, start.value + (event.clientX - start.x))));
        };
        const up = () => {
            dragStart.current = undefined;
            setDragValue((value) => {
                if (value !== undefined) setSelectedValue(value);

                return undefined;
            });
        };

        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', up);

        return () => {
            window.removeEventListener('pointermove', move);
            window.removeEventListener('pointerup', up);
        };
    });

    /** `openPurchaseConfirmationDialog` -> `CameraWidget.sendPhotoData`: the render data with the effects and the zoom. */
    const openPurchase = async () => {
        if (!photo.render) {
            openPhotoPurchase(true);

            return;
        }

        const chosen: { name: string; alpha?: number }[] = [];

        for (const entry of effects) {
            const state = states.get(entry.name);

            if (state?.isOn && (entry.type !== 'frame')) chosen.push({ name: entry.name, alpha: Math.trunc(strengthOf(state) * 255) });
        }

        for (const entry of effects) {
            if (states.get(entry.name)?.isOn && (entry.type === 'frame')) chosen.push({ name: entry.name });
        }

        openPhotoPurchase(false);

        const data = await buildRenderRoomMessageData({ ...photo.render, effects: JSON.stringify(chosen), zoom: zoom ? 2 : 1 });

        send(new RenderRoomComposer({ data }));
    };

    const save = () => {
        const link = document.createElement('a');

        link.download = saveFileName();
        link.href = rendered.toDataURL('image/png');
        link.click();
    };

    /** The window's own procedure's default: a click elsewhere hides the slider and the selection. */
    const deselect = () => {
        setSliderShown(false);
        setHighlighted(false);
    };

    const selectedEffect = effects.find(entry => entry.name === selected);
    const selectedState = selected ? states.get(selected) : undefined;
    const sliderValue = dragValue ?? selectedState?.value ?? (SLIDER_SCALE / 2);
    const sliderInfo = selectedEffect ? `${getLocalizationValue(`camera.effect.name.${selectedEffect.name}`) || selectedEffect.name} ${Math.trunc(strengthOf(selectedState) * 100)}%` : '';

    const filterItem = (entry: CameraEffectDefinition): TemplateItem => {
        const locked = level < entry.achievementLevel;
        const isOn = states.get(entry.name)?.isOn === true;
        const thumb = thumbnails.get(entry.name);
        const description = getLocalizationValue(`camera.effect.name.${entry.name}`) || entry.name;

        return {
            key: entry.name,
            from: filterButton!,
            bindings: {
                '': {
                    tooltip: locked ? `${getLocalizationValue('camera.effect.required.level')} ${entry.achievementLevel}` : description,
                    onPointerTap: locked ? undefined : () => setActiveEffect(entry),
                },
                content: { children: thumb
                    ? (
                            <CanvasPicture
                                canvas={thumb}
                                size={THUMB_SIZE}
                                transient
                            />
                        )
                    : undefined },
                lock_indicator: { visible: locked },
                active_indicator: { visible: isOn && (entry.type !== 'frame') },
                selected_indicator: { visible: isOn && highlighted && (selected === entry.name) },
                remove_effect_button: {
                    visible: isOn,
                    onPointerTap: (event) => {
                        event.stopPropagation();
                        removeEffect(entry);
                    },
                },
            },
        };
    };

    const typeItem = (type: 'colormatrix' | 'composite', icon: string, index: number): TemplateItem => ({
        key: type,
        from: typeButton!,
        bindings: {
            '': { tooltip: type, onPointerTap: () => setFilterType(type) },
            icon: { asset: ASSET(icon) },
            active_border: { visible: filterType === type },
        },
        arrange: ({ root }) => {
            const window = root();
            const left = ITEM_GRID.x + ((ITEM_GRID.width - ((2 * (TYPE_BUTTON_WIDTH + TYPE_BUTTON_GAP)) - TYPE_BUTTON_GAP)) / 2);

            window?.setX(left + (index * (TYPE_BUTTON_WIDTH + TYPE_BUTTON_GAP)));
            window?.setY(TYPE_BUTTON_Y);
        },
    });

    /** `setValue` / `WE_RELOCATED`: the button at the value, the active track up to it. */
    const arrange = ({ find }: TemplateWindows) => {
        find('slider_button')?.setX(sliderValue);
        find('slider_base')?.setWidth(sliderValue);
    };

    const ready = !!filterButton && !!typeButton;

    const bindings: TemplateBindings = {
        '': {
            visible,
            helpPage: 'camera',
            added: ready ? [ typeItem('colormatrix', 'camera_icon_colorfilter', 0), typeItem('composite', 'camera_icon_compositefilter', 1) ] : [],
        },
        image: { children: (
            <CanvasPicture
                canvas={rendered}
                transient
                size={IMAGE_SIZE}
            />
        ), onPointerTap: deselect },
        item_grid: { spacing: 7, items: ready ? effects.filter(entry => entry.type === filterType).map(filterItem) : [] },
        slider_container: { visible: sliderShown },
        slider_base: { asset: ASSET('camera_fx_slider_bottom_active') },
        slider_button: {
            asset: ASSET('camera_fx_slider_button'),
            onPointerDown: (event) => {
                dragStart.current = { x: event.clientX, value: sliderValue };
                setDragValue(sliderValue);
            },
        },
        shaft_click_area: { onPointerDown: event => setSelectedValue(event.getLocalPosition(event.currentTarget).x) },
        slider_effect_info: { caption: sliderInfo },
        zoom_button: { onPointerTap: () => setZoom(value => !value) },
        save_button: { onPointerTap: save },
        save_click_catcher: { onPointerTap: save },
        purchase_button: { onPointerTap: () => void openPurchase() },
        purchase_display_object: { onPointerTap: () => void openPurchase() },
        cancel_button: { onPointerTap: returnToViewfinder },
    };

    return (
        <TemplateWindow
            id={TEMPLATE}
            frame={frame}
            bindings={bindings}
            arrange={arrange}
        />
    );
};
