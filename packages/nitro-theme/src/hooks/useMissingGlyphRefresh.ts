import { useEffect } from 'react';

import { FlashTextRenderer } from '../font/flash-text';

/**
 * `read()`, drawn at a font revision. The React Compiler keys a memo on what its callback reads,
 * not on the dependency list, so a render memo has to read the revision for a new one to draw it
 * again: `useMemo(() => readAtGlyphRevision(glyphRevision, () => render(...)), [...])`.
 */
export const readAtGlyphRevision = <T>(_revision: number, read: () => T): T => read();

/**
 * Draws a text again once the glyphs it fell back to browser text for have loaded
 * (`setMissingGlyphLoader`). `revision` is the `FlashTextRenderer.revision` the text was drawn at
 * and `refresh` sets it, the caller's render reading it (`readAtGlyphRevision`). Only a text that
 * fell back listens, so the rest of the screen is not rasterised again when the glyphs land.
 */
export const useMissingGlyphRefresh = (fellBack: boolean, revision: number, refresh: (revision: number) => void): void => {
    useEffect(() => {
        if (!fellBack) return undefined;

        // The glyphs landed between the render and this effect.
        if (FlashTextRenderer.revision !== revision) {
            refresh(FlashTextRenderer.revision);

            return undefined;
        }

        if (!FlashTextRenderer.glyphsPending) return undefined;

        return FlashTextRenderer.onGlyphsAdded(() => refresh(FlashTextRenderer.revision));
    }, [ fellBack, revision, refresh ]);
};
