import { VariableFxPaintColors } from './VariableFxPaintColors';

export class VariableFxSegmentedProgress {
    public static MIN_SEGMENTS: number = 0;
    public static MAX_SEGMENTS: number = 100;

    /** The `segments` config extra, when it is a positive number (capped at 100). */
    public static resolveSegmentOverride(extra: Map<string, string> | undefined): number | undefined {
        const raw = VariableFxPaintColors.readExtra(extra, 'segments');

        if (!raw || !raw.length) return undefined;

        const parsed = Number(raw);

        if (!Number.isFinite(parsed)) return undefined;

        const segments = Math.trunc(parsed);

        if (segments <= 0) return undefined;

        return Math.min(VariableFxSegmentedProgress.MAX_SEGMENTS, segments);
    }

    public static resolveSegmentCount(width: string, extra: Map<string, string> | undefined, resolveDefault: (width: string) => number): number {
        const override = VariableFxSegmentedProgress.resolveSegmentOverride(extra);

        return override === undefined ? resolveDefault(width) : override;
    }
}
