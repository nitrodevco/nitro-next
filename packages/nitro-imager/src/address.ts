import { existsSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

/** What an address names: a bundle per library, one file, or a folder of files the imager names. */
export type AddressKind = 'bundle' | 'file' | 'folder';

/** The placeholder the renderer fills with a library's name, in a bundle address. */
const LIBNAME = '%libname%';

/** `https://`, `http://`, `file://`: an address that is already a url. */
const URL_SCHEME = /^[a-z][a-z0-9+.-]*:\/\//i;

export class AddressError extends Error {}

/**
 * An address the imager loads from, as it is configured: a url, or a path on this server - each
 * turned into what the renderer's `fetch` takes. A path becomes a `file:` url, which the imager's
 * `fetch` reads from disk (`fetchWithFiles`), so a bundle on a CDN and one in a folder load alike.
 *
 * - `bundle`: a url with `%libname%` (`https://cdn/figures/%libname%.nitro`), a folder - each
 *   library is `<folder>/<library>.nitro` - or a path with `%libname%` in it.
 * - `file`: a url, or the path of a file (`/srv/gamedata/FigureMap.json`).
 * - `folder`: a url, or a folder, that file names are put after (`badgepart_<part>.png`).
 *
 * A protocol-relative url (`//images.habbo.com/...`, as the client's config has them) is https.
 * A relative path is from the imager's working directory. A path that is not there is an error,
 * so a mistyped folder stops the imager at start-up rather than 404ing every image.
 */
export const resolveAddress = (value: string, kind: AddressKind): string => {
    if (value.startsWith('//')) return `https:${value}`;
    if (URL_SCHEME.test(value)) return value;

    if (kind === 'bundle' && value.includes(LIBNAME)) {
        // The folder the libraries are in: everything up to the placeholder's own path segment.
        requireFolder(dirname(resolve(`${value.slice(0, value.indexOf(LIBNAME))}x`)), value);

        // `pathToFileURL` would escape the placeholder's `%`, so it is put back after.
        return pathToFileURL(resolve(value.split(LIBNAME).join('__libname__'))).href.split('__libname__').join(LIBNAME);
    }

    const path = resolve(value);

    if (kind === 'file') {
        if (!existsSync(path) || !statSync(path).isFile()) throw new AddressError(`${value} is not a file on this server`);

        return pathToFileURL(path).href;
    }

    requireFolder(path, value);

    const folder = pathToFileURL(path).href.replace(/\/?$/, '/');

    return (kind === 'bundle') ? `${folder}${LIBNAME}.nitro` : folder;
};

const requireFolder = (path: string, value: string): void => {
    if (!existsSync(path) || !statSync(path).isDirectory()) throw new AddressError(`${value} is not a folder on this server`);
};
