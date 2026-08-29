import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `384_snowwar_leaderboard_entry_xml` (layout "snowwar_leaderboard_entry", 356x42) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SnowwarLeaderboardEntryLayoutProps {
    captionName?: string;
    captionRank?: string;
    captionScore?: string;
    imageRegion?: SnowwarLeaderboardEntryLayoutImageRegionProps;
    layout?: BoxLayout;
    srcAvatarImage?: string;
    srcDivider?: string;
    srcHighlight?: string;
}

export const SnowwarLeaderboardEntryLayout = ({ captionName, captionRank, captionScore, imageRegion, layout, srcAvatarImage, srcDivider, srcHighlight }: SnowwarLeaderboardEntryLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 356, height: 42, ...layout }}>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 356, top: 0, height: 42 }}
            >
                <ThemeImage
                    name="highlight"
                    tags={[ 'bitmap' ]}
                    params={16}
                    src={srcHighlight ?? layoutImage('leaderboard_highlighter.png')}
                    layout={{ position: 'absolute', left: 0, width: 356, top: 0, height: 42 }}
                />
                <Region
                    name="rank"
                    params={16}
                    layout={{ position: 'absolute', left: 7, width: 50, top: 9, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionRank ?? '12345'}
                        textOptions={{ fill: '#1077ac', align: 'center' }}
                    />
                </Region>
                <SnowwarLeaderboardEntryLayoutImageRegion {...imageRegion} />
                <ThemeImage
                    name="avatarImage"
                    params={2064}
                    src={srcAvatarImage}
                    layout={{ position: 'absolute', left: 50, width: 44, top: 1, bottom: 1 }}
                />
                <Region
                    name="name"
                    params={16}
                    layout={{ position: 'absolute', left: 98, width: 88, top: 9, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionName ?? 'PlayerName'}
                        textOptions={{ fill: '#1077ac' }}
                    />
                </Region>
                <Region
                    name="score"
                    params={262160}
                    layout={{ position: 'absolute', right: 14, width: 58, top: 9, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionScore ?? '999999'}
                        textOptions={{ fill: '#1077ac' }}
                    />
                </Region>
                <ThemeImage
                    name="divider"
                    tags={[ 'bitmap' ]}
                    params={1040}
                    src={srcDivider ?? layoutImage('leaderboard_divider.png')}
                    layout={{ position: 'absolute', left: 0, width: 350, bottom: 0, height: 2 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `imageRegion` of SnowwarLeaderboardEntryLayout - configured through the parent's `imageRegion` prop. */
export interface SnowwarLeaderboardEntryLayoutImageRegionProps {
    layout?: BoxLayout;
    onImageRegion?: () => void;
}

export const SnowwarLeaderboardEntryLayoutImageRegion = ({ layout, onImageRegion }: SnowwarLeaderboardEntryLayoutImageRegionProps) => {
    return (
        <Region
            name="imageRegion"
            params={17}
            onPointerTap={onImageRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 53, width: 44, top: 1, height: 40, ...layout }}
        />
    );
};
