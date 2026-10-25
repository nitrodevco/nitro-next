import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

/**
 * `fetch` that also reads `file:` urls from the server's disk, which Node's own refuses. The
 * renderer loads every bundle and table with `fetch(url)`; with this in place, an address that
 * is a folder on the server (`resolveAddress` turns it into a `file:` url) loads through the very same
 * code as one on a CDN. A missing file is a 404, as a missing url would be. Every other url goes
 * to `fetch` untouched.
 */
export const fetchWithFiles = (fetch: typeof globalThis.fetch): typeof globalThis.fetch => async (input, init) => {
    const url = (input instanceof Request) ? input.url : input.toString();

    if (!url.startsWith('file:')) return fetch(input, init);

    try {
        return new Response(await readFile(fileURLToPath(url)), { status: 200 });
    } catch (err) {
        const code = (err as NodeJS.ErrnoException).code;

        if ((code === 'ENOENT') || (code === 'EISDIR')) return new Response(null, { status: 404, statusText: 'Not Found' });

        throw err;
    }
};
