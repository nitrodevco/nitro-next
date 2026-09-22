import { FederatedPointerEvent, Rectangle, Sprite as PixiSprite, Texture } from 'pixi.js';
import { useEffect, useMemo, useState } from 'react';

import { BoxLayout } from '../Box';
import { useLayoutSize } from '../hooks/useLayoutEvent';
import { insetStretchAxes } from '../utils/layoutInsetStretch';
import { FlashTextCanvas, flashTextLinkAtPoint } from './flash-text';

export interface FlashTextProps {
    /** The rasterised text - see `useFlashTextCanvas`. */
    rendered: FlashTextCanvas;
    layout?: BoxLayout;
    visible?: boolean;
    alpha?: number;
    /** A pixel nudge on top of the layout position (a dynamic style's `offsetX`/`offsetY`). */
    x?: number;
    y?: number;
    /**
     * Crops the bitmap to this size from its top-left - a Flash `auto_size="none"` field, which
     * `TextController.refreshTextImage` forces to its window's box, so text past the box is cut
     * off rather than drawn over its neighbours. The field's own left/top edge is kept, which is
     * where Flash anchors a line too wide for its field whatever its alignment.
     */
    clipWidth?: number;
    clipHeight?: number;
    /**
     * Clip at the box `layout` resolves to on an axis `clipWidth` / `clipHeight` leave open - a
     * text that spans its parent (`'100%'`, or two insets) - read back once Yoga has sized it.
     */
    clip?: boolean;
    /**
     * A markup text's link was clicked: the `href` of the `<a>` whose glyphs the click landed on,
     * with Flash's `event:` prefix taken off (`TextEvent.text`, which `HTMLTextController` hands
     * on as its `WindowLinkEvent.link`). A click anywhere else on the text is not taken, and the
     * pointer turns into a hand only over a link.
     */
    onLink?: (link: string) => void;
}

/** `TextEvent.text`: an `event:` link's text after the prefix; any other href as it is. */
const linkText = (href: string) => (href.startsWith('event:') ? href.substring(6) : href);

/**
 * Flash-exact text as one sprite. The bitmap is shown 1:1 with nearest-neighbour sampling: the
 * rasterizer already grid-fitted every glyph to whole pixels, and any resampling would undo it.
 */
export const FlashText = ({ rendered, layout, visible, alpha, x, y, clipWidth: ownClipWidth, clipHeight: ownClipHeight, clip = false, onLink }: FlashTextProps) => {
    const [ node, setNode ] = useState<PixiSprite | null>(null);
    const measured = useLayoutSize(node);
    // A box the layout sizes (not a number, not left to the texture) is known only after layout.
    const laidOut = (size: BoxLayout['width']) => clip && size !== undefined && typeof size !== 'number';
    const clipWidth = ownClipWidth ?? ((laidOut(layout?.width) || insetStretchAxes(layout).x) && measured.width > 0 ? measured.width : undefined);
    const clipHeight = ownClipHeight ?? ((laidOut(layout?.height) || insetStretchAxes(layout).y) && measured.height > 0 ? measured.height : undefined);
    const texture = useMemo(() => {
        // Owned here and destroyed on change - kept out of Pixi's global `Cache`, which would
        // otherwise hold every label's canvas until that destroy.
        const created = Texture.from(rendered.canvas, true);

        created.source.scaleMode = 'nearest';

        const width = Math.max(1, Math.min(created.width, Math.floor(clipWidth ?? created.width)));
        const height = Math.max(1, Math.min(created.height, Math.floor(clipHeight ?? created.height)));

        if (width === created.width && height === created.height) return created;

        // A frame over the same source: cropping costs no copy, and `destroy(true)` still frees it.
        return new Texture({ source: created.source, frame: new Rectangle(0, 0, width, height) });
    }, [ rendered, clipWidth, clipHeight ]);

    useEffect(() => () => texture.destroy(true), [ texture ]);

    const stretchAxes = insetStretchAxes(layout);
    const linked = !!onLink && !!rendered.links?.length;
    const linkAt = (event: FederatedPointerEvent) => {
        const point = event.getLocalPosition(event.currentTarget);

        return flashTextLinkAtPoint(rendered, point.x, point.y);
    };
    const onLinkTap = (event: FederatedPointerEvent) => {
        const href = linkAt(event);

        if (href === undefined) return;

        event.stopPropagation();
        onLink?.(linkText(href));
    };
    const onLinkHover = (event: FederatedPointerEvent) => {
        event.currentTarget.cursor = (linkAt(event) === undefined) ? 'default' : 'pointer';
    };
    const sprite = (spriteLayout: BoxLayout | undefined, nudge: boolean) => (
        <pixiSprite
            ref={setNode}
            texture={texture}
            visible={visible}
            alpha={alpha}
            eventMode={linked ? 'static' : undefined}
            onPointerTap={linked ? onLinkTap : undefined}
            onPointerMove={linked ? onLinkHover : undefined}
            x={nudge ? x : undefined}
            y={nudge ? y : undefined}
            roundPixels
            layout={{
                width: texture.width,
                height: texture.height,
                objectFit: 'none',
                flexShrink: 0,
                ...spriteLayout,
            }}
        />
    );

    // A leaf sprite won't span between insets (it keeps its intrinsic size) - a container host
    // does the spanning, the text fills it and aligns itself via its objectPosition.
    if (stretchAxes.x || stretchAxes.y) {
        return (
            <pixiContainer
                eventMode={linked ? 'passive' : 'none'}
                x={x}
                y={y}
                layout={layout}
            >
                {sprite({ objectPosition: layout?.objectPosition, width: stretchAxes.x ? '100%' : undefined, height: stretchAxes.y ? '100%' : undefined }, false)}
            </pixiContainer>
        );
    }

    return sprite(layout, true);
};

FlashText.displayName = 'FlashText';
