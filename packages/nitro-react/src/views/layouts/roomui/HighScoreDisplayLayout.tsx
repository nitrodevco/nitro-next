import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Bubble, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1070_high_score_display_xml` (layout "high_score_display", 275x341) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HighScoreDisplayLayoutProps {
    captionFooter?: string;
    captionScoreHeader?: string;
    entries?: HighScoreDisplayLayoutEntriesProps;
    layout?: BoxLayout;
    srcCupIcon?: string;
    title?: HighScoreDisplayLayoutTitleProps;
}

export const HighScoreDisplayLayout = ({ captionFooter, captionScoreHeader, entries, layout, srcCupIcon, title }: HighScoreDisplayLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 275, height: 341, ...layout }}>
            <Bubble
                variant="100"
                layout={{ position: 'absolute', left: 0, width: 275, top: 0, height: 341, justifyContent: 'center' }}
            >
                <HighScoreDisplayLayoutTitle {...title} />
                <Border
                    variant="100"
                    name="header"
                    layout={{ position: 'absolute', left: 8, width: 258, top: 30, height: 23 }}
                >
                    <Border
                        variant="100"
                        layout={{ position: 'absolute', left: 0, width: 190, top: 0, height: 23 }}
                    >
                        <Region layout={{ position: 'absolute', left: 1, width: 163, top: 3, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <ThemeText text={t('high.score.display.users.header')} />
                        </Region>
                    </Border>
                    <Border
                        variant="100"
                        layout={{ position: 'absolute', left: 188, width: 70, top: 0, height: 23 }}
                    >
                        <Region
                            name="score_header"
                            layout={{ position: 'absolute', right: 5, width: 161, top: 3, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={captionScoreHeader ?? t('high.score.display.score.header')} />
                        </Region>
                    </Border>
                </Border>
                <Border
                    variant="108"
                    name="list_background"
                    tintColor="#676767"
                    layout={{ position: 'absolute', left: 8, width: 257, top: 53, height: 255 }}
                />
                <Region
                    name="footer"
                    layout={{ position: 'absolute', marginLeft: -1, marginRight: 1, width: 233, top: 311, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionFooter ?? t('high.score.display.congratulations.footer')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#6f6f6f' }}
                    />
                </Region>
                <ThemeImage
                    name="cup_icon"
                    src={srcCupIcon ?? layoutImage('high_score_highscore_cup.png')}
                    layout={{ position: 'absolute', left: 0, width: 40, top: 269, height: 70 }}
                />
                <HighScoreDisplayLayoutEntries {...entries} />
            </Bubble>
        </Region>
    );
};

/** Named region `title` of HighScoreDisplayLayout - configured through the parent's `title` prop. */
export interface HighScoreDisplayLayoutTitleProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const HighScoreDisplayLayoutTitle = ({ layout, tags }: HighScoreDisplayLayoutTitleProps) => {
    const t = useTranslation();

    return (
        <Region
            name="title"
            tags={tags}
            backgroundColor="#3f3f3f"
            layout={{ position: 'absolute', left: 9, width: 256, top: 8, height: 20, justifyContent: 'center', ...layout }}
        >
            <Region layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 151, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('high.score.display.caption')}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `entry_template` of HighScoreDisplayLayout - pass real rows through its `items…` slot. */
export interface HighScoreDisplayLayoutEntryTemplateItemProps {
    captionScore?: string;
    captionUsernames?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const HighScoreDisplayLayoutEntryTemplateItem = ({ captionScore, captionUsernames, layout, tags }: HighScoreDisplayLayoutEntryTemplateItemProps) => {
    return (
        <Region
            name="entry_template"
            tags={tags}
            layout={{ width: 258, height: 20, flexShrink: 0, ...layout }}
        >
            <Region
                name="usernames"
                layout={{ position: 'absolute', right: 136, width: 120, top: 2, height: 16, maxWidth: 180, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionUsernames ?? 'USERNAMES PH, A LIST'}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <Region
                name="score"
                layout={{ position: 'absolute', right: 13, width: 56, top: 2, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionScore ?? 'SCORE PH'}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `entries` of HighScoreDisplayLayout - configured through the parent's `entries` prop. */
export interface HighScoreDisplayLayoutEntriesProps {
    itemsEntries?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const HighScoreDisplayLayoutEntries = ({ itemsEntries, layout, tags }: HighScoreDisplayLayoutEntriesProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 8, width: 256, top: 53, height: 253, ...layout }}
        >
            <Region
                name="entries"
                tags={tags}
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                {itemsEntries ?? (
                    <HighScoreDisplayLayoutEntryTemplateItem />
                )}
            </Region>
        </ScrollArea>
    );
};
