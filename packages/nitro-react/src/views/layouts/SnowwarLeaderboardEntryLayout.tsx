import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `384_snowwar_leaderboard_entry_xml` (layout "snowwar_leaderboard_entry", 356x42) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SnowwarLeaderboardEntryLayoutProps {
    layout?: BoxLayout;
}

export const SnowwarLeaderboardEntryLayout = ({ layout }: SnowwarLeaderboardEntryLayoutProps) => {
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
                    src={layoutImage('leaderboard_highlighter.png')}
                    layout={{ position: 'absolute', left: 0, width: 356, top: 0, height: 42 }}
                />
                <Region
                    name="rank"
                    params={16}
                    layout={{ position: 'absolute', left: 7, width: 50, top: 9, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text="12345"
                        textOptions={{ fill: '#1077ac', align: 'center' }}
                    />
                </Region>
                <Region
                    name="imageRegion"
                    params={17}
                    layout={{ position: 'absolute', left: 53, width: 44, top: 1, height: 40 }}
                />
                <ThemeImage
                    name="avatarImage"
                    params={2064}
                    src={undefined}
                    layout={{ position: 'absolute', left: 50, width: 44, top: 1, height: 40 }}
                />
                <Region
                    name="name"
                    params={16}
                    layout={{ position: 'absolute', left: 98, width: 88, top: 9, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text="PlayerName"
                        textOptions={{ fill: '#1077ac' }}
                    />
                </Region>
                <Region
                    name="score"
                    params={262160}
                    layout={{ position: 'absolute', left: 284, width: 58, top: 9, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text="999999"
                        textOptions={{ fill: '#1077ac' }}
                    />
                </Region>
                <ThemeImage
                    name="divider"
                    tags={[ 'bitmap' ]}
                    params={1040}
                    src={layoutImage('leaderboard_divider.png')}
                    layout={{ position: 'absolute', left: 0, width: 350, top: 40, height: 2 }}
                />
            </Region>
        </Region>
    );
};
