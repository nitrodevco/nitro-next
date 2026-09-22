/**
 * `HabbiconCollectionTrayView` + `HabbiconCollectionTrayGroupView` - the owned and favourited
 * tabs (`habbicon_view.xml`'s `tray_container`, 540x380 at 7,146): the style 3 `tray_background`,
 * the tab's name as `tray_title`, a `tray_summary` (how many habbicons, or the empty text), and
 * the style 100 `tray_group_list` (526x310 at 10,59, 6px between groups), scrolled back to the
 * top on every `refresh`.
 *
 * A group is a `tray_group_template` (style 10, `#efe1c4`, 506 wide): its title, and the 486 wide
 * `tray_group_grid` of 50x50 tiles 4px apart at 10,30. `resizeToContent` grows the grid to its
 * rows and the group to hold it with `BOTTOM_PADDING` (8) below, never under the template's 89.
 * The owned tab has a group per set, the favourited tab one `${habbicons.favourites.title}` group.
 */
import { FederatedPointerEvent } from 'pixi.js';

import { HabbiconEntryModel, HabbiconSetModel, HabbiconTabMode, HabbiconTabModeName } from '#base/context/habbicons';
import { useSystemStore, useTranslation } from '#base/context/system';
import { Border, Box, Region, ScrollArea, ThemeText } from '#base/theme';

import { HabbiconTileView } from './HabbiconTileView';

/** `HabbiconCollectionTrayGroupView.BOTTOM_PADDING`. */
const BOTTOM_PADDING = 8;

interface HabbiconCollectionTrayGroupViewProps {
    group: HabbiconSetModel;
    activeTileId: string | undefined;
    onTileClick: (entry: HabbiconEntryModel, event: FederatedPointerEvent) => void;
}

const HabbiconCollectionTrayGroupView = ({ group, activeTileId, onTileClick }: HabbiconCollectionTrayGroupViewProps) => {
    const interpolate = useSystemStore(x => x.interpolate);

    return (
        <Border
            variant="10"
            tintColor="#efe1c4"
            layout={{ width: 506, minHeight: 89, flexShrink: 0, paddingTop: 30, paddingBottom: BOTTOM_PADDING, paddingLeft: 10 }}
        >
            <ThemeText
                text={interpolate(group.title)}
                textStyle="u_bold"
                textOptions={{ fill: '#2b2b2b' }}
                verticalAlign="top"
                layout={{ position: 'absolute', left: 10, top: 7 }}
            />
            <Box layout={{ width: 486, minHeight: 50, flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
                {group.habbicons.map(entry => (
                    <HabbiconTileView
                        key={entry.id}
                        entry={entry}
                        active={entry.id === activeTileId}
                        onClick={onTileClick}
                    />
                ))}
            </Box>
        </Border>
    );
};

export interface HabbiconCollectionTrayViewProps {
    tab: HabbiconTabModeName;
    groups: HabbiconSetModel[];
    /** Changes with every `refresh`, which scrolls the list back to the top. */
    resetKey: string;
    activeTileId: string | undefined;
    onTileClick: (entry: HabbiconEntryModel, event: FederatedPointerEvent) => void;
}

export const HabbiconCollectionTrayView = ({ tab, groups, resetKey, activeTileId, onTileClick }: HabbiconCollectionTrayViewProps) => {
    const t = useTranslation();
    const favourited = (tab === HabbiconTabMode.FAVOURITED);
    const count = groups.reduce((total, group) => total + group.habbicons.length, 0);

    // `resolveSummaryText`.
    let summary = t(favourited ? 'habbicon_book.tray.empty.favourited' : 'habbicon_book.tray.empty.owned');

    if (groups.length) summary = t(favourited ? 'habbicon_book.tray.favourited.summary' : 'habbicon_book.tray.owned.summary', '', { count: String(count) });

    return (
        <Region layout={{ position: 'absolute', left: 7, top: 146, width: 540, height: 380 }}>
            <Border
                variant="3"
                tintColor="#f6ebd7"
                layout={{ position: 'absolute', left: 0, top: 0, width: 540, height: 380 }}
            />
            <ThemeText
                text={t(favourited ? 'habbicon_book.tab.favourited' : 'habbicon_book.tab.owned')}
                textStyle="u_bold"
                textOptions={{ fill: '#2b2b2b', fontSize: 17 }}
                verticalAlign="top"
                layout={{ position: 'absolute', left: 12, top: 10 }}
            />
            <ThemeText
                text={summary}
                textStyle="u_regular"
                textOptions={{ fill: '#3b3b3b', fontSize: 11, wordWrap: true, wordWrapWidth: 506 }}
                clip
                verticalAlign="top"
                layout={{ position: 'absolute', left: 12, top: 34, width: 510, height: 30 }}
            />
            <ScrollArea
                orientation="vertical"
                variant="100"
                scrollResetKey={resetKey}
                layout={{ position: 'absolute', left: 10, top: 59, width: 526, height: 310 }}
            >
                <Region layout={{ flexDirection: 'column', gap: 6, width: '100%' }}>
                    {groups.map(group => (
                        <HabbiconCollectionTrayGroupView
                            key={group.id}
                            group={group}
                            activeTileId={activeTileId}
                            onTileClick={onTileClick}
                        />
                    ))}
                </Region>
            </ScrollArea>
        </Region>
    );
};
