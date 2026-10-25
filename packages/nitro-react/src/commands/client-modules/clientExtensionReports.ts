/**
 * Not Flash's: what this client tells a Turbo server about the plugins' client halves, for its
 * extension inspector (Turbo's `docs/extensions.md`, roadmap step 5) - a module it refused or that
 * threw, a template patch that matched nothing or clashed with another, and the ops each plugin's
 * patches applied. Part of the `client.modules` extension: kept until the server has accepted it,
 * then sent in batches; each distinct report once per connection.
 */
import { TurboClientExtensionReport, TurboClientExtensionReportComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';

/** What the server reads of one message (`TurboClientExtensionReportMessage.MAX_REPORTS`). */
const MAX_PER_MESSAGE = 32;
/** Reports kept while there is no server to send them to; the oldest go first. */
const MAX_PENDING = 128;
/** Reports made together (a window's patches) go in one message. */
const FLUSH_DELAY_MS = 500;

let connection: WebSocketConnection | undefined;
let pending: TurboClientExtensionReport[] = [];
const sent = new Set<string>();
let timer: ReturnType<typeof setTimeout> | undefined;

const flush = () => {
    timer = undefined;

    if (!connection) return;

    while (pending.length) connection.send(new TurboClientExtensionReportComposer(pending.splice(0, MAX_PER_MESSAGE)));
};

/** Notes one report; sent once the server has accepted `client.modules`, and only once per connection. */
export const reportClientExtension = (report: TurboClientExtensionReport) => {
    const key = JSON.stringify(report);

    if (sent.has(key)) return;

    sent.add(key);
    pending.push(report);

    if (pending.length > MAX_PENDING) pending = pending.slice(-MAX_PENDING);

    if (connection && !timer) timer = setTimeout(flush, FLUSH_DELAY_MS);
};

/** The server accepted `client.modules` on this connection (or `undefined`: declined, or gone). */
export const setClientExtensionReportConnection = (next: WebSocketConnection | undefined) => {
    if (connection === next) return;

    connection = next;

    if (!next) {
        // A new connection is a new server session: its inspector has heard nothing yet.
        sent.clear();

        return;
    }

    if (pending.length && !timer) timer = setTimeout(flush, FLUSH_DELAY_MS);
};
