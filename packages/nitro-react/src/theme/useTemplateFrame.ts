import { TemplateFrameOptions, useLatest } from '@nitrodevco/nitro-theme';
import { useState } from 'react';

/**
 * A template window's `frame` options, made once - a new object would redraw the whole template, as
 * `TemplateView`'s context takes it - with an `onClose` that always calls the caller's latest one, so
 * a close handler that closes over the widget's state is never a stale copy.
 */
export const useTemplateFrame = (options: TemplateFrameOptions): TemplateFrameOptions => {
    const onClose = useLatest(options.onClose);

    // A frame its caller gave no close stays without one.
    const [ frame ] = useState<TemplateFrameOptions>(() => (options.onClose ? { ...options, onClose: () => onClose.current?.() } : options));

    return frame;
};
