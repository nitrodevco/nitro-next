/**
 * `HabbiconAlbumHeaderView` - `habbicon_view.xml`'s `album_header` (558x110 at -2,-3, filled
 * `#2b7aa0`): the style 3 `album_header_background` (`#1f5d78`), the `bg_pattern_001` tiled over
 * it at blend 0.16, the logo, the title and subtitle, the two style 7 stat plates (owned
 * habbicons, sets completed) and the 304x18 album progress bar with
 * `habbicon_book.album_progress.count` beside it (`refresh`).
 */
import { getHabbiconAlbumProgressRatio, HabbiconAlbumStats } from '#base/context/habbicons';
import { useTranslation } from '#base/context/system';
import { Border, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';

import { HABBICON_ALBUM_PROGRESS_BAR } from './habbiconProgressAnimation';
import { HabbiconProgressBarView } from './HabbiconProgressBarView';

export interface HabbiconAlbumHeaderViewProps {
    stats: HabbiconAlbumStats;
    animate: boolean;
    resetKey: string;
}

/** A stat plate: its label over its value, both centred in the 90 wide texts at 6,5 and 6,20. */
const HabbiconAlbumStatView = ({ left, label, value }: { left: number; label: string; value: number }) => (
    <Border
        variant="7"
        tintColor="#41aad3"
        layout={{ position: 'absolute', left, top: 12, width: 102, height: 42 }}
    >
        <ThemeText
            text={label}
            textStyle="u_regular"
            textOptions={{ fill: '#ffffff', fontSize: 10, align: 'center' }}
            verticalAlign="top"
            layout={{ position: 'absolute', left: 6, top: 5, width: 90 }}
        />
        <ThemeText
            text={String(value)}
            textStyle="u_bold"
            textOptions={{ fill: '#ffffff', fontSize: 13, align: 'center' }}
            verticalAlign="top"
            layout={{ position: 'absolute', left: 6, top: 20, width: 90 }}
        />
    </Border>
);

export const HabbiconAlbumHeaderView = ({ stats, animate, resetKey }: HabbiconAlbumHeaderViewProps) => {
    const t = useTranslation();

    return (
        <Region
            backgroundColor="#2b7aa0"
            layout={{ position: 'absolute', left: -2, top: -3, width: 558, height: 110 }}
        >
            <Border
                variant="3"
                tintColor="#1f5d78"
                layout={{ position: 'absolute', left: 2, top: 2, width: 554, height: 106, overflow: 'hidden' }}
            >
                <ThemeImage
                    src={LayoutImage('catalog/bg_pattern_001.png')}
                    bitmap={{ stretchedX: false, stretchedY: false, wrapX: true, wrapY: true }}
                    alpha={0.16}
                    layout={{ position: 'absolute', left: -1, top: 2, width: 554, height: 110 }}
                />
                <ThemeImage
                    src={LayoutImage('catalog/habbicons_habbicons_logo.png')}
                    bitmap={{ stretchedX: false, stretchedY: false, fitSizeToContents: true }}
                    layout={{ position: 'absolute', left: 18, top: 20 }}
                />
                <ThemeText
                    text={t('habbicons.hud.title')}
                    textStyle="u_bold"
                    textOptions={{ fill: '#ffffff', fontSize: 18 }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 100, top: 14 }}
                />
                <ThemeText
                    text={t('habbicon_book.subtitle')}
                    textStyle="u_regular"
                    textOptions={{ fill: '#d7efe5', fontSize: 11, wordWrap: true, wordWrapWidth: 216 }}
                    clip
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 100, top: 39, width: 220, height: 32 }}
                />
                <HabbiconAlbumStatView
                    left={331}
                    label={t('habbicons.owned.description')}
                    value={stats.ownedHabbicons}
                />
                <HabbiconAlbumStatView
                    left={443}
                    label={t('habbicon_book.sets_completed')}
                    value={stats.completedSets}
                />
                <HabbiconProgressBarView
                    ratio={getHabbiconAlbumProgressRatio(stats)}
                    animate={animate}
                    resetKey={resetKey}
                    geometry={HABBICON_ALBUM_PROGRESS_BAR}
                    layout={{ left: 102, top: 79 }}
                />
                <ThemeText
                    text={t('habbicon_book.album_progress.count', '', { collected: String(stats.collected), total: String(stats.total) })}
                    textStyle="u_bold"
                    textOptions={{ fill: '#ffffff' }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 414, top: 79 }}
                />
            </Border>
        </Region>
    );
};
