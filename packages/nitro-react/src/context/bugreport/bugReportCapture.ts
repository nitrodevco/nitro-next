/**
 * Not Flash's: the client half of the `bugreport` extension of Turbo's bug report plugin. While the
 * server has accepted the extension, the client keeps its last packets both ways (header, name,
 * size, time) and its console errors and warnings; a user's `:bugreport` makes the server ask for
 * them (`TurboBugReportRequestMessage`), and `takeBugReportCapture` builds the answer. Until the
 * extension is accepted nothing is recorded and the console is left as it is.
 */
import { GetRenderer, GetRoomStage } from '@nitrodevco/nitro-renderer';
import { Rectangle } from 'pixi.js';

import { getRoom, roomStore } from '#base/context/room';
import { configString } from '#base/context/system';
import { clientBuild, clientPage, clientUptimeMs, clientViewport, describeDiagnosticValue } from '#base/utils';

/** The build's name, replaced at build time (vite.config.ts `buildId`); undefined outside Vite. */

export const TURBO_BUG_REPORT_CAPABILITY = 'bugreport';

/** The packets kept, oldest dropped first. */
const MAX_PACKETS = 300;
const MAX_CONSOLE = 100;
const MAX_CONSOLE_TEXT = 1000;
/** The image of the room view: its longest side, and the JPEG quality. */
const SCREENSHOT_SIZE = 1280;
const SCREENSHOT_QUALITY = 0.7;

type PacketEntry = { t: number; d: 'in' | 'out'; h: number; n: string; s: number };
type ConsoleEntry = { t: number; level: 'error' | 'warn'; text: string };

const packets: PacketEntry[] = [];
const consoleEntries: ConsoleEntry[] = [];
let packetIndex = 0;
let recording = false;
let restoreConsole: (() => void) | undefined;

const now = clientUptimeMs;
const describe = (value: unknown) => describeDiagnosticValue(value, true);

const addConsole = (level: ConsoleEntry['level'], values: unknown[]) => {
    const text = values.map(describe).join(' ');

    consoleEntries.push({ t: now(), level, text: text.length > MAX_CONSOLE_TEXT ? text.slice(0, MAX_CONSOLE_TEXT) : text });

    if (consoleEntries.length > MAX_CONSOLE) consoleEntries.shift();
};

const hookConsole = () => {
    const { error, warn } = console;
    const onError = (event: ErrorEvent) => addConsole('error', [ event.error ?? event.message ]);
    const onRejection = (event: PromiseRejectionEvent) => addConsole('error', [ 'Unhandled rejection:', event.reason ]);

    console.error = (...values: unknown[]) => {
        addConsole('error', values);
        error.apply(console, values);
    };
    console.warn = (...values: unknown[]) => {
        addConsole('warn', values);
        warn.apply(console, values);
    };
    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onRejection);

    return () => {
        console.error = error;
        console.warn = warn;
        window.removeEventListener('error', onError);
        window.removeEventListener('unhandledrejection', onRejection);
    };
};

/** Starts recording when the server accepts the extension, and stops when it does not. */
export const setBugReportCaptureEnabled = (enabled: boolean) => {
    if (enabled === recording) return;

    recording = enabled;
    packets.length = 0;
    consoleEntries.length = 0;
    packetIndex = 0;

    if (enabled) restoreConsole = hookConsole();
    else {
        restoreConsole?.();
        restoreConsole = undefined;
    }
};

/** One packet through the socket; nothing while the extension is not accepted. */
export const recordBugReportPacket = (direction: 'in' | 'out', header: number, name: string, size: number) => {
    if (!recording) return;

    const entry: PacketEntry = { t: now(), d: direction, h: header, n: name, s: size };

    if (packets.length < MAX_PACKETS) packets.push(entry);
    else packets[packetIndex] = entry;

    packetIndex = (packetIndex + 1) % MAX_PACKETS;
};

const orderedPackets = () => (packets.length < MAX_PACKETS) ? [ ...packets ] : [ ...packets.slice(packetIndex), ...packets.slice(0, packetIndex) ];

const roomState = () => {
    const state = roomStore.getState();
    const room = state.room;

    if (!room) return null;

    return {
        roomId: room.roomId,
        controllerLevel: state.controllerLevel,
        isRoomOwner: state.isRoomOwner,
        isSpectator: state.isSpectator,
        isDecorating: state.isDecorating,
        playTestMode: state.playTestMode,
        ownRoomIndex: state.ownRoomIndex,
        doorMode: state.doorMode,
    };
};

/** The room view as a JPEG, scaled down; empty outside a room or when it cannot be read. */
const takeScreenshot = async (): Promise<Uint8Array> => {
    try {
        const renderer = GetRenderer();
        const stage = GetRoomStage();

        if (!renderer || !stage || !getRoom()) return new Uint8Array(0);

        const width = renderer.screen.width;
        const height = renderer.screen.height;
        const resolution = Math.min(1, SCREENSHOT_SIZE / Math.max(width, height, 1));
        const { pixels, width: w, height: h } = renderer.extract.pixels({ target: stage, frame: new Rectangle(0, 0, width, height), resolution });
        const canvas = document.createElement('canvas');

        canvas.width = w;
        canvas.height = h;
        canvas.getContext('2d')?.putImageData(new ImageData(new Uint8ClampedArray(pixels), w, h), 0, 0);

        const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/jpeg', SCREENSHOT_QUALITY));

        return blob ? new Uint8Array(await blob.arrayBuffer()) : new Uint8Array(0);
    } catch {
        return new Uint8Array(0);
    }
};

/** The capture for one report: JSON as UTF-8, and the image when asked for. */
export const takeBugReportCapture = async (screenshot: boolean) => {
    const capture = {
        v: 1,
        build: clientBuild(),
        production: configString('production.version'),
        page: clientPage(),
        userAgent: navigator.userAgent,
        viewport: clientViewport(),
        uptimeMs: now(),
        takenAt: new Date().toISOString(),
        room: roomState(),
        packets: orderedPackets(),
        console: [ ...consoleEntries ],
    };

    return {
        capture: new TextEncoder().encode(JSON.stringify(capture)),
        screenshot: screenshot ? await takeScreenshot() : new Uint8Array(0),
    };
};
