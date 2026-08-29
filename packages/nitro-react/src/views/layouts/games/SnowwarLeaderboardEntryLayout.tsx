import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `384_snowwar_leaderboard_entry_xml` (layout "snowwar_leaderboard_entry", 356x42) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SnowwarLeaderboardEntryLayoutProps {
    captionName?: string;
    captionRank?: string;
    captionScore?: string;
    imageRegion?: ReactNode;
    layout?: BoxLayout;
    onImageRegion?: () => void;
    srcAvatarImage?: string;
    srcDivider?: string;
    srcHighlight?: string;
    tintAvatarImage?: string;
    tintDivider?: string;
    tintHighlight?: string;
}

export const SnowwarLeaderboardEntryLayout = ({ captionName, captionRank, captionScore, imageRegion, layout, onImageRegion, srcAvatarImage, srcDivider, srcHighlight, tintAvatarImage, tintDivider, tintHighlight }: SnowwarLeaderboardEntryLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 356, height: 42, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <ThemeImage
                    name="highlight"
                    src={srcHighlight ?? layoutImage('leaderboard_highlighter.png')}
                    tint={tintHighlight}
                    layout={{ position: 'absolute', left: 0, width: 356, top: 0, height: 42 }}
                />
                <Region
                    name="rank"
                    layout={{ position: 'absolute', left: 7, width: 50, top: 9, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionRank ?? '12345'}
                        textOptions={{ fill: '#1077ac', align: 'center' }}
                    />
                </Region>
                <Region
                    name="imageRegion"
                    onPointerTap={onImageRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 53, width: 44, top: 1, height: 40 }}
                >
                    {imageRegion}
                </Region>
                <ThemeImage
                    name="avatarImage"
                    src={srcAvatarImage}
                    tint={tintAvatarImage}
                    layout={{ position: 'absolute', left: 50, width: 44, top: 1, bottom: 1 }}
                />
                <Region
                    name="name"
                    layout={{ position: 'absolute', left: 98, width: 88, top: 9, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionName ?? 'PlayerName'}
                        textOptions={{ fill: '#1077ac' }}
                    />
                </Region>
                <Region
                    name="score"
                    layout={{ position: 'absolute', right: 14, width: 58, top: 9, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionScore ?? '999999'}
                        textOptions={{ fill: '#1077ac' }}
                    />
                </Region>
                <ThemeImage
                    name="divider"
                    src={srcDivider ?? layoutImage('leaderboard_divider.png')}
                    tint={tintDivider}
                    layout={{ position: 'absolute', left: 0, width: 350, bottom: 0, height: 2 }}
                />
            </Region>
        </Region>
    );
};
