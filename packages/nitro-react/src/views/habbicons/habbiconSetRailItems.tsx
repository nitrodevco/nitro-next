/**
 * `HabbiconSetRailView` + `HabbiconSetRailRowView` - the all sets tab's left rail: one clone of
 * `habbicon_view.xml`'s `set_row_template` per set in `set_rail_list`.
 *
 * A row: the first habbicon's preview as `set_icon` (hidden when there is none), the set's title,
 * and its progress bar. `set_row_progress_text` is hidden in the layout and stays so - Flash writes
 * `completed / total` into it all the same. `updateLook` tints `set_row_background` idle / hovered /
 * active (the selected set); the border colour it gives the row's own window is the `color` of a
 * `region`, which draws nothing.
 *
 * `setSets` builds the rows anew on every whole-album refresh (the `resetKey` in their keys), so
 * their bars snap; `refreshSet` glides a row's bar while the all sets tab is showing.
 */
import { Texture } from 'pixi.js';

import { getHabbiconSetProgressRatio, HabbiconSetModel } from '#base/context/habbicons';
import { TemplateItem, ThemeImage } from '#base/theme';

import { HabbiconProgressBarView } from './HabbiconProgressBarView';
import { hideHabbiconProgressBar } from './habbiconTemplate';

/** `HabbiconSetRailRowView.BACKGROUND_IDLE` / `_HOVER` / `_ACTIVE`. */
const BACKGROUND_IDLE = 0xf8ebd6;
const BACKGROUND_HOVER = 0xfff2c6;
const BACKGROUND_ACTIVE = 0xf0cf86;

export interface HabbiconSetRailItemsOptions {
    sets: readonly HabbiconSetModel[];
    activeCollectionId: number;
    hoveredCollectionId: number;
    /** The first habbicon's preview of each set, by habbicon id (`getPreviewBitmap`). */
    previews: Readonly<Record<number, Texture>>;
    animate: boolean;
    /** Changes with every `setSets` - the rows are built anew. */
    resetKey: string;
    onSelect: (set: HabbiconSetModel) => void;
    onHover: (set: HabbiconSetModel, hovered: boolean) => void;
}

export const habbiconSetRailItems = ({ sets, activeCollectionId, hoveredCollectionId, previews, animate, resetKey, onSelect, onHover }: HabbiconSetRailItemsOptions): TemplateItem[] => sets.map((set) => {
    const icon = set.habbicons.length ? previews[set.habbicons[0].habbiconId] : undefined;
    const active = (set.collectionId === activeCollectionId);
    const hovered = (set.collectionId === hoveredCollectionId);

    return {
        key: `${resetKey}:${set.collectionId}`,
        from: 'set_row_template',
        bindings: {
            '': {
                onPointerTap: () => onSelect(set),
                onPointerOver: () => onHover(set, true),
                onPointerOut: () => onHover(set, false),
            },
            set_row_background: { color: (0xff000000 | (active ? BACKGROUND_ACTIVE : (hovered ? BACKGROUND_HOVER : BACKGROUND_IDLE))) >>> 0 },
            set_icon: {
                visible: !!icon,
                children: icon && (
                    <ThemeImage
                        texture={icon}
                        bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                        layout={{ position: 'absolute', left: 0, top: 0, width: 40, height: 40 }}
                    />
                ),
            },
            set_row_title: { caption: set.title },
            set_row_progress_text: { caption: `${set.completed} / ${set.total}` },
            set_row_progress_bar: {
                children: (
                    <HabbiconProgressBarView
                        part="set_row_progress_bar"
                        ratio={getHabbiconSetProgressRatio(set)}
                        animate={animate}
                        resetKey={resetKey}
                    />
                ),
            },
            ...hideHabbiconProgressBar('set_row_progress_bar'),
        },
    };
});
