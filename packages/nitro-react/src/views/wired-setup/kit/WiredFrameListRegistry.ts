/**
 * The list a wired dialog's frame stacks its elements in - what `FramePreset.createListView` and
 * `InnerBorderFramePreset.createListView` build from the presets `WiredUIBuilder.addElements`
 * collected - as seen by the elements themselves.
 *
 * Flash hands the frame an array of presets and the frame places each by its index. Here an
 * element's view (`buildInputs`) is one React component, so the frame cannot index its parts;
 * instead every top-level part registers the Pixi container it renders into, and the registry
 * works out which of them comes first from the containers' order under their common parent (the
 * document order React committed). That is all the placement needs: `FramePreset` follows every
 * element with a spacer, `InnerBorderFramePreset` every element but the first, and hides the
 * first one's splitter. See `WiredFrameListItem`.
 */
import { Container } from 'pixi.js';

export class WiredFrameListRegistry {
    private readonly _nodes = new Set<Container>();
    private readonly _listeners = new Set<() => void>();
    private _first: Container | null = null;

    public readonly subscribe = (listener: () => void): (() => void) => {
        this._listeners.add(listener);

        return () => this._listeners.delete(listener);
    };

    /** The container of the element placed first, or `null` while none is registered. */
    public get first(): Container | null {
        return this._first;
    }

    /** Adds an element's container; the returned function removes it again. Call from a layout effect, once the container is in place. */
    public register(node: Container): () => void {
        this._nodes.add(node);
        this.refresh();

        return () => {
            this._nodes.delete(node);
            this.refresh();
        };
    }

    private refresh(): void {
        let first: Container | null = null;
        let firstIndex = Number.POSITIVE_INFINITY;

        for (const node of this._nodes) {
            const index = node.parent ? node.parent.getChildIndex(node) : Number.POSITIVE_INFINITY;

            if (!first || (index < firstIndex)) {
                first = node;
                firstIndex = index;
            }
        }

        if (first === this._first) return;

        this._first = first;

        for (const listener of this._listeners) listener();
    }
}

/** What `WiredFrameList` provides: the registry, and which preset places the elements. */
export interface WiredFrameListValue {
    registry: WiredFrameListRegistry;
    /** `WiredStyle.useInnerBorder` - `InnerBorderFramePreset` rather than `FramePreset`. */
    innerBorder: boolean;
    /** `WiredStyle.sectionSpacing` - the height of every spacer the frame puts between elements. */
    spacing: number;
}
