/**
 * `HabbiconSetRailView` + `HabbiconSetRailRowView` - the all sets tab's left rail
 * (`habbicon_view.xml`: the style 6 `set_rail_background`, 154x380, and the style 100
 * `set_rail_list`, 145x372 at 4,4 with 1px between rows), one `set_row_template` per set.
 *
 * A row: the style 10 `set_row_background`, the first habbicon's preview as the 40x40 `set_icon`
 * (hidden when there is none), the set's title, and its 69x12 progress bar. `set_row_progress_text`
 * is hidden in the layout and stays so - Flash writes `completed / total` into it all the same.
 * `updateLook` tints the background idle / hovered / active (the selected set); the border colour
 * it gives the row's own window is the `color` of a `region`, which draws nothing.
 *
 * `setSets` builds the rows anew on every whole-album refresh (`resetKey`), so their bars snap;
 * `refreshSet` glides a row's bar while the all sets tab is showing.
 */
import { useState } from 'react';

import { getHabbiconSetProgressRatio, HabbiconSetModel, useHabbiconsStore } from '#base/context/habbicons';
import { Border, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

import { HABBICON_SET_ROW_PROGRESS_BAR } from './habbiconProgressAnimation';
import { HabbiconProgressBarView } from './HabbiconProgressBarView';

/** `HabbiconSetRailRowView.BACKGROUND_IDLE` / `_HOVER` / `_ACTIVE`. */
const BACKGROUND_IDLE = '#f8ebd6';
const BACKGROUND_HOVER = '#fff2c6';
const BACKGROUND_ACTIVE = '#f0cf86';

interface HabbiconSetRailRowViewProps {
    set: HabbiconSetModel;
    active: boolean;
    animate: boolean;
    resetKey: string;
    onSelect: (set: HabbiconSetModel) => void;
}

const HabbiconSetRailRowView = ({ set, active, animate, resetKey, onSelect }: HabbiconSetRailRowViewProps) => {
    const [ hovered, setHovered ] = useState(false);
    const icon = useHabbiconsStore(x => (set.habbicons.length ? x.previews[set.habbicons[0].habbiconId] : undefined));

    return (
        <Region
            cursor="pointer"
            onPointerTap={() => onSelect(set)}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            layout={{ width: 145, height: 50, flexShrink: 0, overflow: 'hidden' }}
        >
            <Border
                variant="10"
                tintColor={active ? BACKGROUND_ACTIVE : (hovered ? BACKGROUND_HOVER : BACKGROUND_IDLE)}
                layout={{ position: 'absolute', left: 1, top: 1, width: 145, height: 49 }}
            />
            {icon && (
                <ThemeImage
                    texture={icon}
                    bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                    layout={{ position: 'absolute', left: 7, top: 4, width: 40, height: 40 }}
                />
            )}
            <ThemeText
                text={set.title}
                textStyle="u_bold"
                textOptions={{ fill: '#2b2b2b' }}
                verticalAlign="top"
                layout={{ position: 'absolute', left: 50, top: 7 }}
            />
            <HabbiconProgressBarView
                ratio={getHabbiconSetProgressRatio(set)}
                animate={animate}
                resetKey={resetKey}
                geometry={HABBICON_SET_ROW_PROGRESS_BAR}
                layout={{ left: 53, top: 28 }}
            />
        </Region>
    );
};

export interface HabbiconSetRailViewProps {
    sets: HabbiconSetModel[];
    activeCollectionId: number;
    animate: boolean;
    /** Changes with every `setSets` - the rows are built anew. */
    resetKey: string;
    onSelect: (set: HabbiconSetModel) => void;
}

export const HabbiconSetRailView = ({ sets, activeCollectionId, animate, resetKey, onSelect }: HabbiconSetRailViewProps) => (
    <>
        <Border
            variant="6"
            layout={{ position: 'absolute', left: 0, top: 0, width: 154, height: 380 }}
        />
        <ScrollArea
            orientation="vertical"
            variant="100"
            layout={{ position: 'absolute', left: 4, top: 4, width: 145, height: 372 }}
        >
            <Region layout={{ flexDirection: 'column', gap: 1, width: '100%' }}>
                {sets.map(set => (
                    <HabbiconSetRailRowView
                        key={`${resetKey}:${set.collectionId}`}
                        set={set}
                        active={set.collectionId === activeCollectionId}
                        animate={animate}
                        resetKey={resetKey}
                        onSelect={onSelect}
                    />
                ))}
            </Region>
        </ScrollArea>
    </>
);
