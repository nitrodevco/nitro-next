import { Canvas } from '@napi-rs/canvas';
import { Context, Hono } from 'hono';

import { AvatarRender } from '../avatar/AvatarImager';
import { AvatarRenderRequest, AvatarRequestError, avatarRequestKey, ImageFormat, parseAvatarRequest } from '../avatar/avatarRequest';
import { GroupBadgeRender } from '../badge/GroupBadgeImager';
import { FurnitureRender } from '../furniture/FurnitureImager';
import { FurnitureRenderRequest, furnitureRequestKey, parseFurnitureRequest } from '../furniture/furnitureRequest';
import { CONTENT_TYPES, encodeImage } from '../output/encodeImage';
import { PetRender } from '../pet/PetImager';
import { parsePetRequest, PetRenderRequest, petRequestKey } from '../pet/petRequest';
import { DrawnImage, ImageCache } from './ImageCache';
import { renderIndexPage } from './indexPage';
import { RequestError } from './RequestError';

/** What draws the avatars: `AvatarImager`, or a stand-in in a test. */
export interface AvatarRenderer {
    render(request: AvatarRenderRequest): Promise<AvatarRender>;
    /** How many asset libraries it has loaded, for `/health`. */
    readonly loadedLibraries: number;
}

/** What draws the badges: `GroupBadgeImager`, or a stand-in in a test. */
export interface BadgeRenderer {
    render(code: string): Promise<GroupBadgeRender>;
    /** Which table the badges are drawn with; a new one is a new set of images. */
    readonly table: { version: string };
}

/** What draws the pets: `PetImager`, or a stand-in in a test. */
export interface PetRenderer {
    render(request: PetRenderRequest): Promise<PetRender>;
    /** The hotel's pet types, by number. */
    readonly types: readonly string[];
}

/** What draws the furniture: `FurnitureImager`, or a stand-in in a test. */
export interface FurnitureRenderer {
    render(request: FurnitureRenderRequest): Promise<FurnitureRender>;
    /** How many items the furnidata has, for `/health`. */
    readonly itemCount: { floor: number; wall: number };
}

/** A pet or furniture renderer, as `createApp` draws with either. */
interface RoomObjectRenderer<T> {
    render(request: T): Promise<{ frames: Canvas[]; missing: string[] }>;
}

export interface ImagerServices {
    avatars: AvatarRenderer;
    badges: BadgeRenderer;
    /** Unset: no pet bundles are configured, and `/pet` says so. */
    pets?: PetRenderer;
    /** Unset: no furniture bundles or furnidata are configured, and `/furni` says so. */
    furniture?: FurnitureRenderer;
    cache: ImageCache;
    /** ms between an animated avatar's frames. */
    avatarFrameDelay: number;
    /** ms between an animated pet's or furniture's frames. */
    roomObjectFrameDelay: number;
}

/** An avatar image is the same for good: its figure, actions and libraries are all in the url. */
const AVATAR_CACHE_CONTROL = 'public, max-age=604800';

/** A pet or furniture is drawn from its library, which the hotel may update: a browser asks again within the day. */
const ROOM_OBJECT_CACHE_CONTROL = 'public, max-age=86400';

/** A badge's colours can be retuned by the hotel, so a browser asks again within the hour. */
const BADGE_CACHE_CONTROL = 'public, max-age=3600';

/** An image missing part of what was asked for: drawn again next time, by a browser or proxy too. */
const INCOMPLETE_CACHE_CONTROL = 'no-store';

/** The index page changes only with a new build of the imager. */
const INDEX_CACHE_CONTROL = 'public, max-age=300';

/** `<code>.gif` / `.png`: five six-character layer tokens at most, with room for a typed-in code's slack. */
const BADGE_FILE = /^([a-zA-Z0-9]{1,64})\.(gif|png)$/;

/**
 * The imager's http api:
 *
 * - `GET /avatar?figure=...` - an avatar (`parseAvatarRequest` has the parameters); also
 *   `/avatarimage`, the name Habbo's imager gives it
 * - `GET /badge/<code>.gif` (or `.png`) - a group badge, as `badge.asset.group.url` names it
 * - `GET /pet?figure=...` - a pet (`parsePetRequest`), when pet bundles are configured
 * - `GET /furni?name=...` - a furniture (`parseFurnitureRequest`), when furniture bundles and furnidata are
 * - `GET /health` - whether it is up, and what it holds
 * - `GET /` - a page listing all of these and their parameters (`renderIndexPage`)
 *
 * The images sit at the root, for an imager on a subdomain of its own
 * (`habbo-imaging.example.com/avatar`), and under `/habbo-imaging/` as well, the path Habbo's own
 * imager has, so a url built for it only needs its host changed. Every image may be loaded from any site: the client
 * draws them into a canvas, which a cross-origin image without that header would taint.
 */
export const createApp = (services: ImagerServices): Hono => {
    const app = new Hono();

    app.use('*', async (c, next) => {
        await next();

        c.header('Access-Control-Allow-Origin', '*');
    });

    const avatar = async (c: Context) => {
        let request: AvatarRenderRequest;

        try {
            request = parseAvatarRequest(c.req.query());
        } catch (err) {
            if (err instanceof AvatarRequestError) return c.text(err.message, 400);

            throw err;
        }

        const drawn = await services.cache.get(`avatar:${avatarRequestKey(request)}`, async () => {
            const { frames, missing } = await services.avatars.render(request);

            if (missing.length) console.warn(`${request.figure}: not cached, ${missing.join(', ')} did not draw`);

            return { image: await encodeImage(frames, request.format, services.avatarFrameDelay), complete: !missing.length };
        });

        return sendImage(c, drawn, request.format, AVATAR_CACHE_CONTROL);
    };

    const badge = async (c: Context) => {
        const match = BADGE_FILE.exec(c.req.param('file') ?? '');

        if (!match) return c.text('A badge is /badge/<code>.gif or .png', 400);

        const [ , code, format ] = match as unknown as [ string, string, ImageFormat ];
        const drawn = await services.cache.get(`badge:${services.badges.table.version}:${code}:${format}`, async () => {
            const { canvas, missing } = await services.badges.render(code);

            return canvas ? { image: await encodeImage([ canvas ], format), complete: !missing.length } : undefined;
        });

        if (!drawn) return c.text('No part of that badge could be drawn', 404);

        return sendImage(c, drawn, format, BADGE_CACHE_CONTROL);
    };

    const indexPage = renderIndexPage(services);

    /** A pet or furniture: parsed, drawn once per request key, and a request it cannot draw answered with why. */
    const roomObject = <T extends { format: ImageFormat }>(kind: string, parse: (query: Record<string, string>) => T, key: (request: T) => string, renderer: RoomObjectRenderer<T> | undefined) => async (c: Context) => {
        if (!renderer) return c.text(`This imager draws no ${kind}: it has no ${kind} bundles configured`, 404);

        try {
            const request = parse(c.req.query());
            const { format } = request;
            const drawn = await services.cache.get(`${kind}:${key(request)}`, async () => {
                const { frames, missing } = await renderer.render(request);

                return { image: await encodeImage(frames, format, services.roomObjectFrameDelay), complete: !missing.length };
            });

            return sendImage(c, drawn, format, ROOM_OBJECT_CACHE_CONTROL);
        } catch (err) {
            if (err instanceof RequestError) return c.text(err.message, err.status);

            throw err;
        }
    };

    const pet = roomObject('pet', parsePetRequest, petRequestKey, services.pets);
    const furni = roomObject('furniture', parseFurnitureRequest, furnitureRequestKey, services.furniture);

    for (const prefix of [ '', '/habbo-imaging' ]) {
        app.get(`${prefix}/`, (c) => {
            c.header('Cache-Control', INDEX_CACHE_CONTROL);

            return c.html(indexPage);
        });
        app.get(`${prefix}/avatar`, avatar);
        app.get(`${prefix}/avatarimage`, avatar);
        app.get(`${prefix}/badge/:file`, badge);
        app.get(`${prefix}/pet`, pet);
        app.get(`${prefix}/furni`, furni);
    }

    app.get('/health', (c) => {
        const memory = process.memoryUsage();

        return c.json({
            ok: true,
            cached: services.cache.size,
            cachedBytes: services.cache.bytes,
            avatarLibraries: services.avatars.loadedLibraries,
            badgeTable: services.badges.table.version,
            petTypes: services.pets?.types.length ?? 0,
            furniture: services.furniture?.itemCount ?? { floor: 0, wall: 0 },
            memory: { rss: memory.rss, heapUsed: memory.heapUsed, external: memory.external },
        });
    });

    app.onError((err, c) => {
        console.error(`${c.req.method} ${c.req.url} failed:`, err);

        return c.text('The image could not be drawn', 500);
    });

    return app;
};

const sendImage = (c: Context, drawn: DrawnImage | undefined, format: ImageFormat, cacheControl: string) => {
    if (!drawn) return c.text('The image could not be drawn', 500);

    c.header('Content-Type', CONTENT_TYPES[format]);
    c.header('Cache-Control', drawn.complete ? cacheControl : INCOMPLETE_CACHE_CONTROL);

    return c.body(new Uint8Array(drawn.image));
};
