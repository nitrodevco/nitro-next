/**
 * `HabboPagesViewer`: the habbo pages - what a window header's help button (`openHelpPage`), the chat
 * bar's help and the club centre's info links open (`habbopages/<page>`). A page is a text file under
 * `habbopages.url`: its first line the window's caption, the rest the `htmlText` of `habbopedia_xml`'s
 * `content`, drawn in the viewer's style sheet.
 */
import { NitroLogger } from '@nitrodevco/nitro-api';

import { configString, systemStore } from '#base/context/system';

/** `onDownloadComplete`'s line break: `\n\r`, `\n` or `\r`. */
const LINE_BREAK = /\n\r|\n|\r/gm;

/**
 * `onDownloadComplete`: the first line is the caption, the others joined with nothing between them
 * the page's html - read from `parseAndSetHtml(html, caption)`, whose call the decompiler lost
 * (`parseAndSetHtml(null,null)`, `HabboPagesViewer.as:180`).
 */
export const parseHabboPage = (content: string): { caption: string; html: string } => {
    const lines = content.split(LINE_BREAK);
    const caption = lines.shift() ?? '';

    return { caption, html: lines.join('') };
};

/** Each download, so the window shows the page of the last one to arrive and scrolls back to its top (`onChanged`). */
let downloads = 0;

/**
 * `openPage`: the page downloaded afresh from `habbopages.url` - a page loaded before is removed first,
 * so it is never read from a cache - and the window shown with it once it is in. A failed download
 * only logs (`habbopages download error <status>`), the window stays as it was.
 */
export const openHabboPage = (page: string) => {
    const url = configString('habbopages.url') + page;

    void fetch(url, { cache: 'no-store' })
        .then(async (response) => {
            if (!response.ok) throw new Error(String(response.status));

            const { caption, html } = parseHabboPage(await response.text());

            systemStore.getState().showWindow('habbo_pages', { caption, html, download: ++downloads });
        })
        .catch((error: unknown) => NitroLogger.warn(`habbopages download error ${(error instanceof Error) ? error.message : 0}`));
};
