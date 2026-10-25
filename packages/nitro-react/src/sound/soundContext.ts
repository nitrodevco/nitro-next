/**
 * The one Web Audio context every sound of the client plays through - what the Flash Player's
 * `flash.media.Sound` runtime was to `HabboSoundManagerFlash10`.
 *
 * It runs at 44.1 kHz because Flash did: `Sound.extract` hands out 44.1 kHz frames whatever the
 * mp3's own rate, and `TraxSequencer` counts its bars in those frames (`SAMPLES_BAR_LENGTH` is
 * 88000 of them). `decodeAudioData` resamples to the context's rate, so a sample decoded here has
 * the same length in frames that Flash measured it by.
 *
 * A browser keeps a context suspended until the page has been interacted with. The context is made
 * lazily and resumed on the first press or key, which `bindSoundUnlock` listens for from boot; a
 * one-shot sound asked for before that is dropped rather than queued up to burst out on the first
 * click (`isSoundContextRunning`). Flash had no such gate.
 */
import { NitroLogger } from '@nitrodevco/nitro-api';

/** Flash's mixing rate: `Sound.extract` frames per second, and `TraxSequencer.SAMPLES_PER_SECOND`. */
export const SOUND_SAMPLE_RATE = 44100;

const UNLOCK_EVENTS = [ 'pointerdown', 'keydown', 'touchend' ] as const;

let context: AudioContext | undefined;
let unlockBound = false;

/** The shared context, made on first use; `undefined` where the browser has no Web Audio. */
export const getSoundContext = (): AudioContext | undefined => {
    if (context) return context;

    if (typeof AudioContext === 'undefined') return undefined;

    try {
        context = new AudioContext({ sampleRate: SOUND_SAMPLE_RATE });
    } catch {
        // A browser that will not run at 44.1 kHz still plays; the trax bars are then resampled by the source node.
        context = new AudioContext();
    }

    return context;
};

/** Whether a sound started now is heard now - false until the page has been interacted with. */
export const isSoundContextRunning = (): boolean => context?.state === 'running';

const unlock = () => {
    const audio = getSoundContext();

    if (!audio) return;

    if (audio.state === 'suspended') void audio.resume().catch(() => undefined);
};

/**
 * Resumes the context on the page's first press or key. Returns the listeners' removal, so it can
 * be bound for as long as the sound manager is.
 */
export const bindSoundUnlock = (): (() => void) => {
    if (unlockBound || (typeof window === 'undefined')) return () => undefined;

    unlockBound = true;

    for (const type of UNLOCK_EVENTS) window.addEventListener(type, unlock, { capture: true });

    return () => {
        for (const type of UNLOCK_EVENTS) window.removeEventListener(type, unlock, { capture: true });

        unlockBound = false;
    };
};

/** `Sound.load` + `extract`: an encoded file's frames at the context's rate. */
export const decodeSound = async (bytes: ArrayBuffer): Promise<AudioBuffer | undefined> => {
    const audio = getSoundContext();

    if (!audio) return undefined;

    try {
        // `decodeAudioData` detaches what it is given, and a bundle's bytes are kept for the next caller.
        return await audio.decodeAudioData(bytes.slice(0));
    } catch (err) {
        NitroLogger.error('Could not decode a sound', err);

        return undefined;
    }
};

/** `Sound.load(new URLRequest(url))`: fetches and decodes; `undefined` on any failure (Flash's `ioError`). */
export const loadSound = async (url: string): Promise<AudioBuffer | undefined> => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            NitroLogger.error(`Error loading sound ${url}: ${response.status}`);

            return undefined;
        }

        return await decodeSound(await response.arrayBuffer());
    } catch (err) {
        NitroLogger.error(`Error loading sound ${url}`, err);

        return undefined;
    }
};
