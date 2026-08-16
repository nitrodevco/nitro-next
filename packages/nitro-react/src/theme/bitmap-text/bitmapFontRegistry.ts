import type {
    BitmapFontMetrics,
    BitmapTextRecipe,
    LoadedBitmapFont,
} from './types';

type BitmapFontSource = {
    image: string;
    metrics: string;
};

const BITMAP_FONT_SOURCES = {
    'regular-12': {
        image: '/assets/flash/fonts/regular-12.png',
        metrics: '/assets/flash/fonts/regular-12.json',
    },
    'bold-12': {
        image: '/assets/flash/fonts/bold-12.png',
        metrics: '/assets/flash/fonts/bold-12.json',
    },
    'bold-14': {
        image: '/assets/flash/fonts/bold-14.png',
        metrics: '/assets/flash/fonts/bold-14.json',
    },
    'bold-18': {
        image: '/assets/flash/fonts/bold-18.png',
        metrics: '/assets/flash/fonts/bold-18.json',
    },
    'bold-italic-12': {
        image: '/assets/flash/fonts/bold-italic-12.png',
        metrics: '/assets/flash/fonts/bold-italic-12.json',
    },
} as const satisfies Record<BitmapTextRecipe, BitmapFontSource>;

const fontCache = new Map<BitmapTextRecipe, Promise<LoadedBitmapFont>>();

const loadImage = (url: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();

        image.onload = () => resolve(image);
        image.onerror = () =>
            reject(new Error(`Unable to load bitmap font atlas: ${url}`));
        image.src = url;
    });

export const loadBitmapFont = (recipe: BitmapTextRecipe) => {
    const cached = fontCache.get(recipe);

    if (cached) return cached;

    const source = BITMAP_FONT_SOURCES[recipe];
    const request = Promise.all([
        fetch(source.metrics).then(response => {
            if (!response.ok)
                throw new Error(
                    `Unable to load bitmap font metrics: ${source.metrics}`,
                );

            return response.json() as Promise<BitmapFontMetrics>;
        }),
        loadImage(source.image),
    ])
        .then(([metrics, image]) => ({ metrics, image }))
        .catch(error => {
            fontCache.delete(recipe);
            throw error;
        });

    fontCache.set(recipe, request);

    return request;
};
