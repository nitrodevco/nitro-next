/**
 * The photo lab's effects - Flash `CameraEffect` and `CameraFxPreloader`: the effects in `initEffects`'
 * order that `camera.available.effects` names, each with the camera achievement level it needs, and
 * how each draws over a picture (`CameraPhotoLab.renderAllEffects`, `createFxButton`).
 */
/** The photo's size: the viewfinder, the lab and the purchase confirmation all work on a 320 x 320 picture. */
export const CAMERA_IMAGE_SIZE = 320;

/** A camera bitmap of the window manager's library (`habbo-window-manager-com`), as the layouts name it. */
export const cameraAsset = (name: string) => `habbo-window-manager-com-${name}`;

export type CameraEffectType = 'colormatrix' | 'composite' | 'frame';

export interface CameraEffectDefinition {
    name: string;
    type: CameraEffectType;
    matrix?: number[];
    /** Flash's `BlendMode`. */
    blendmode?: string;
    achievementLevel: number;
}

const effect = (name: string, type: CameraEffectType, matrix: number[] | null, blendmode: string | null, achievementLevel = 0): CameraEffectDefinition => ({ name, type, matrix: matrix ?? undefined, blendmode: blendmode ?? undefined, achievementLevel });

/** `CameraEffect.initEffects`. */
const ALL_EFFECTS: CameraEffectDefinition[] = [
    effect('dark_sepia', 'colormatrix', [ 0.4, 0.4, 0.1, 0, 110, 0.3, 0.4, 0.1, 0, 30, 0.3, 0.2, 0.1, 0, 0, 0, 0, 0, 1, 0 ], null),
    effect('increase_saturation', 'colormatrix', [ 2, -0.5, -0.5, 0, 0, -0.5, 2, -0.5, 0, 0, -0.5, -0.5, 2, 0, 0, 0, 0, 0, 1, 0 ], null),
    effect('increase_contrast', 'colormatrix', [ 1.5, 0, 0, 0, -50, 0, 1.5, 0, 0, -50, 0, 0, 1.5, 0, -50, 0, 0, 0, 1.5, 0 ], null),
    effect('shadow_multiply_02', 'composite', null, 'multiply'),
    effect('color_1', 'colormatrix', [ 0.393, 0.769, 0.189, 0, 0, 0.349, 0.686, 0.168, 0, 0, 0.272, 0.534, 0.131, 0, 0, 0, 0, 0, 1, 0 ], null, 1),
    effect('hue_bright_sat', 'colormatrix', [ 1, 0.6, 0.2, 0, -50, 0.2, 1, 0.6, 0, -50, 0.6, 0.2, 1, 0, -50, 0, 0, 0, 1, 0 ], null, 1),
    effect('hearts_hardlight_02', 'composite', null, 'hardlight', 1),
    effect('texture_overlay', 'composite', null, 'overlay', 1),
    effect('pinky_nrm', 'composite', null, 'normal', 1),
    effect('color_2', 'colormatrix', [ 0.333, 0.333, 0.333, 0, 0, 0.333, 0.333, 0.333, 0, 0, 0.333, 0.333, 0.333, 0, 0, 0, 0, 0, 1, 0 ], null, 2),
    effect('night_vision', 'colormatrix', [ 0, 0, 0, 0, 0, 0, 1.1, 0, 0, -50, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0 ], null, 2),
    effect('stars_hardlight_02', 'composite', null, 'hardlight', 2),
    effect('coffee_mpl', 'composite', null, 'multiply', 2),
    effect('security_hardlight', 'composite', null, 'hardlight', 3),
    effect('bluemood_mpl', 'composite', null, 'multiply', 3),
    effect('rusty_mpl', 'composite', null, 'multiply', 3),
    effect('decr_conrast', 'colormatrix', [ 0.5, 0, 0, 0, 50, 0, 0.5, 0, 0, 50, 0, 0, 0.5, 0, 50, 0, 0, 0, 1, 0 ], null, 4),
    effect('green_2', 'colormatrix', [ 0.5, 0.5, 0.5, 0, 0, 0.5, 0.5, 0.5, 0, 90, 0.5, 0.5, 0.5, 0, 0, 0, 0, 0, 1, 0 ], null, 4),
    effect('alien_hrd', 'composite', null, 'hardlight', 4),
    effect('color_3', 'colormatrix', [ 0.609, 0.609, 0.082, 0, 0, 0.309, 0.609, 0.082, 0, 0, 0.309, 0.609, 0.082, 0, 0, 0, 0, 0, 1, 0 ], null, 5),
    effect('color_4', 'colormatrix', [ 0.8, -0.8, 1, 0, 70, 0.8, -0.8, 1, 0, 70, 0.8, -0.8, 1, 0, 70, 0, 0, 0, 1, 0 ], null, 5),
    effect('toxic_hrd', 'composite', null, 'hardlight', 5),
    effect('hypersaturated', 'colormatrix', [ 2, -1, 0, 0, 0, -1, 2, 0, 0, 0, 0, -1, 2, 0, 0, 0, 0, 0, 1, 0 ], null, 6),
    effect('Yellow', 'colormatrix', [ 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0 ], null, 6),
    effect('misty_hrd', 'composite', null, 'hardlight', 6),
    effect('x_ray', 'colormatrix', [ 0, 1.2, 0, 0, -100, 0, 2, 0, 0, -120, 0, 2, 0, 0, -120, 0, 0, 0, 1, 0 ], null, 7),
    effect('decrease_saturation', 'colormatrix', [ 0.7, 0.2, 0.2, 0, 0, 0.2, 0.7, 0.2, 0, 0, 0.2, 0.2, 0.7, 0, 0, 0, 0, 0, 1, 0 ], null, 7),
    effect('drops_mpl', 'composite', null, 'multiply', 8),
    effect('shiny_hrd', 'composite', null, 'hardlight', 9),
    effect('glitter_hrd', 'composite', null, 'hardlight', 10),
    effect('frame_gold', 'frame', null, null, 999),
    effect('frame_gray_4', 'frame', null, null, 999),
    effect('frame_black_2', 'frame', null, null, 999),
    effect('frame_wood_2', 'frame', null, null, 999),
    effect('finger_nrm', 'frame', null, null, 999),
    effect('color_5', 'colormatrix', [ 3.309, 0.609, 1.082, 0.2, 0, 0.309, 0.609, 0.082, 0, 0, 1.309, 0.609, 0.082, 0, 0, 0, 0, 0, 1, 0 ], null, 999),
    effect('black_white_negative', 'colormatrix', [ -0.5, -0.5, -0.5, 0, 255, -0.5, -0.5, -0.5, 0, 255, -0.5, -0.5, -0.5, 0, 255, 0, 0, 0, 1, 0 ], null, 999),
    effect('blue', 'colormatrix', [ 0.5, 0.5, 0.5, 0, -255, 0.5, 0.5, 0.5, 0, -170, 0.5, 0.5, 0.5, 0, 0, 0, 0, 0, 1, 0 ], null, 999),
    effect('red', 'colormatrix', [ 0.5, 0.5, 0.5, 0, 0, 0.5, 0.5, 0.5, 0, -170, 0.5, 0.5, 0.5, 0, -170, 0, 0, 0, 1, 0 ], null, 999),
    effect('green', 'colormatrix', [ 0.5, 0.5, 0.5, 0, -170, 0.5, 0.5, 0.5, 0, 0, 0.5, 0.5, 0.5, 0, -170, 0, 0, 0, 1, 0 ], null, 999),
];

/** `getEffects`: the ones `camera.available.effects` (comma separated) names, in `initEffects`' order. */
export const getAvailableEffects = (available: string | undefined) => {
    const names = (available ?? '').split(',').map(name => name.trim());

    return ALL_EFFECTS.filter(entry => names.includes(entry.name));
};

/** `CameraFxPreloader`: the composite and frame pictures, `<image.library.url>Habbo-Stories/<name>.png`, loaded once. */
const images = new Map<string, Promise<HTMLImageElement | undefined>>();

export const loadEffectImage = (libraryUrl: string, name: string) => {
    let image = images.get(name);

    if (!image) {
        image = new Promise<HTMLImageElement | undefined>((resolve) => {
            const element = new Image();

            element.crossOrigin = 'anonymous';
            element.onload = () => resolve(element);
            // `loadFailed`: the effect has no picture, and no button.
            element.onerror = () => resolve(undefined);
            element.src = `${libraryUrl}Habbo-Stories/${name}.png`;
        });

        images.set(name, image);
    }

    return image;
};

/** Flash `BlendMode` names as canvas composite operations. */
const COMPOSITE_OPERATION: Record<string, GlobalCompositeOperation> = {
    multiply: 'multiply',
    hardlight: 'hard-light',
    overlay: 'overlay',
    normal: 'source-over',
    screen: 'screen',
};

/** `ColorMatrixFilter` over the canvas: each channel a weighted sum of R, G, B, A plus an offset. */
const applyColorMatrix = (canvas: HTMLCanvasElement, matrix: number[]) => {
    const context = canvas.getContext('2d', { willReadFrequently: true });

    if (!context) return;

    const image = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = image.data;

    for (let index = 0; index < data.length; index += 4) {
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        const a = data[index + 3];

        data[index] = (matrix[0] * r) + (matrix[1] * g) + (matrix[2] * b) + (matrix[3] * a) + matrix[4];
        data[index + 1] = (matrix[5] * r) + (matrix[6] * g) + (matrix[7] * b) + (matrix[8] * a) + matrix[9];
        data[index + 2] = (matrix[10] * r) + (matrix[11] * g) + (matrix[12] * b) + (matrix[13] * a) + matrix[14];
        data[index + 3] = (matrix[15] * r) + (matrix[16] * g) + (matrix[17] * b) + (matrix[18] * a) + matrix[19];
    }

    context.putImageData(image, 0, 0);
};

const IDENTITY = [ 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0 ];

/** `getColorMatrixFilter`: the matrix mixed with the identity by the strength (the whole matrix for a button). */
const strengthMatrix = (matrix: number[], strength: number) => matrix.map((value, index) => (value * strength) + (IDENTITY[index] * (1 - strength)));

export const cloneCanvas = (source: HTMLCanvasElement) => {
    const canvas = document.createElement('canvas');

    canvas.width = source.width;
    canvas.height = source.height;
    canvas.getContext('2d')?.drawImage(source, 0, 0);

    return canvas;
};

/** One effect drawn over the canvas at a strength (0..1); a frame is drawn as it is. */
export const drawEffect = (canvas: HTMLCanvasElement, definition: CameraEffectDefinition, strength: number, image: HTMLImageElement | undefined) => {
    const context = canvas.getContext('2d');

    if (!context) return;

    switch (definition.type) {
        case 'colormatrix':
            if (definition.matrix) applyColorMatrix(canvas, (strength >= 1) ? definition.matrix : strengthMatrix(definition.matrix, strength));

            return;
        case 'composite':
            if (!image) return;

            context.save();
            context.globalAlpha = strength;
            context.globalCompositeOperation = COMPOSITE_OPERATION[definition.blendmode ?? 'normal'] ?? 'source-over';
            context.drawImage(image, 0, 0);
            context.restore();

            return;
        case 'frame':
            if (image) context.drawImage(image, 0, 0);
    }
};

/** `renderAllEffects`'s zoom: the middle half of the picture at twice its size. */
export const zoomCanvas = (source: HTMLCanvasElement) => {
    const canvas = document.createElement('canvas');

    canvas.width = source.width;
    canvas.height = source.height;

    const context = canvas.getContext('2d');

    if (context) {
        context.setTransform(2, 0, 0, 2, -source.width / 2, -source.height / 2);
        context.drawImage(source, 0, 0);
    }

    return canvas;
};
