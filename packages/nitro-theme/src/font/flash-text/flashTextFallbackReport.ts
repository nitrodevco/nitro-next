/**
 * Development-only report of every text that fell back from the exact Flash renderer to the
 * browser's own text, with the renderer's reason (`FlashTextRenderer.unsupportedReason`): a glyph
 * the captured fonts lack, a letter spacing, a size, a face. A fallback draws and fails nothing,
 * which is how blurry reception captions reached a screenshot before anyone noticed them.
 *
 * Each new fallback is batched into one console summary a second later. From the browser console,
 * `__nitroTextFallbacks()` prints the whole table and returns it. Production builds record nothing.
 */
import { FlashTextRun } from './flashTextBlock';
import { FlashTextFormat } from './flashTextFormat';
import { FlashTextRenderer } from './FlashTextRenderer';

export interface FlashTextFallback {
    reason: string;
    text: string;
    style: string;
    count: number;
}

const SUMMARY_DELAY_MS = 1000;
const TEXT_PREVIEW_CHARS = 60;

const fallbacks = new Map<string, FlashTextFallback>();
let pending = 0;
let summaryTimer: ReturnType<typeof setTimeout> | undefined;

const printSummary = () => {
    summaryTimer = undefined;

    const byReason = new Map<string, number>();

    for (const fallback of fallbacks.values()) {
        const reason = fallback.reason.replace(/ \(U\+[0-9A-F]+\)$/, '');

        byReason.set(reason, (byReason.get(reason) ?? 0) + 1);
    }

    console.warn(`[text-fallback] ${pending} new text(s) drawn in browser text instead of the exact Flash renderer (${fallbacks.size} in total). Run __nitroTextFallbacks() for the list.`, Object.fromEntries(byReason));
    pending = 0;
};

const listFallbacks = (): FlashTextFallback[] => {
    const list = [ ...fallbacks.values() ].sort((a, b) => a.reason.localeCompare(b.reason));

    console.table(list);

    return list;
};

/** Why a text in these runs fell back: the first run the renderer refuses, else the block layout. */
const fallbackReason = (content: string | readonly FlashTextRun[], format: FlashTextFormat): string => {
    const runs = (typeof content === 'string') ? [ { text: content, format } ] : content;

    for (const run of runs) {
        const reason = FlashTextRenderer.unsupportedReason(run.format, run.text);

        if (reason) return reason;
    }

    return 'block layout or metrics unavailable';
};

export const reportFlashTextFallback = (content: string | readonly FlashTextRun[], format: FlashTextFormat, style: string) => {
    if (!import.meta.env.DEV) return;

    const text = (typeof content === 'string') ? content : content.map(run => run.text).join('');
    const reason = fallbackReason(content, format);
    const key = `${style}\u0000${reason}\u0000${text}`;
    const existing = fallbacks.get(key);

    if (existing) {
        existing.count++;

        return;
    }

    fallbacks.set(key, { reason, text: (text.length > TEXT_PREVIEW_CHARS) ? `${text.slice(0, TEXT_PREVIEW_CHARS)}...` : text, style, count: 1 });
    pending++;

    if (!summaryTimer) summaryTimer = setTimeout(printSummary, SUMMARY_DELAY_MS);
};

if (import.meta.env.DEV && (typeof window !== 'undefined')) (window as unknown as { __nitroTextFallbacks: typeof listFallbacks }).__nitroTextFallbacks = listFallbacks;
