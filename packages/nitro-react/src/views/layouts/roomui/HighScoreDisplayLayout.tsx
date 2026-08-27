import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Bubble, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1070_high_score_display_xml` (layout "high_score_display", 275x341) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HighScoreDisplayLayoutProps {
    captionFooter?: string;
    captionScoreHeader?: string;
    itemsEntries?: ReactNode;
    layout?: BoxLayout;
    srcCupIcon?: string;
}

export const HighScoreDisplayLayout = ({ captionFooter, captionScoreHeader, itemsEntries, layout, srcCupIcon }: HighScoreDisplayLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 275, height: 341, ...layout }}>
            <Bubble
                variant="100"
                params={1}
                layout={{ position: 'absolute', left: 0, width: 275, top: 0, height: 341 }}
            >
                <Region
                    name="title"
                    params={16}
                    backgroundColor="#3f3f3f"
                    layout={{ position: 'absolute', left: 9, width: 256, top: 8, height: 20 }}
                >
                    <Region
                        params={786640}
                        layout={{ position: 'absolute', left: 53, width: 151, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('high.score.display.caption')}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
                <Border
                    variant="100"
                    name="header"
                    params={16}
                    layout={{ position: 'absolute', left: 8, width: 258, top: 30, height: 23 }}
                >
                    <Border
                        variant="100"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 190, top: 0, height: 23 }}
                    >
                        <Region
                            params={16}
                            layout={{ position: 'absolute', left: 1, width: 163, top: 3, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={t('high.score.display.users.header')} />
                        </Region>
                    </Border>
                    <Border
                        variant="100"
                        params={16}
                        layout={{ position: 'absolute', left: 188, width: 70, top: 0, height: 23 }}
                    >
                        <Region
                            name="score_header"
                            params={262224}
                            layout={{ position: 'absolute', left: -96, width: 161, top: 3, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={captionScoreHeader ?? t('high.score.display.score.header')} />
                        </Region>
                    </Border>
                </Border>
                <Border
                    variant="108"
                    name="list_background"
                    params={16}
                    tintColor="#676767"
                    layout={{ position: 'absolute', left: 8, width: 257, top: 53, height: 255 }}
                />
                <Region
                    name="footer"
                    params={786640}
                    layout={{ position: 'absolute', left: 20, width: 233, top: 311, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionFooter ?? t('high.score.display.congratulations.footer')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#6f6f6f' }}
                    />
                </Region>
                <ThemeImage
                    name="cup_icon"
                    params={16}
                    src={srcCupIcon ?? layoutImage('high_score_highscore_cup.png')}
                    layout={{ position: 'absolute', left: 0, width: 40, top: 269, height: 70 }}
                />
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 8, width: 256, top: 53, height: 253 }}
                >
                    <Region
                        name="entries"
                        params={16}
                        layout={{ flexDirection: 'column', width: '100%' }}
                    >
                        {itemsEntries ?? (
                            <HighScoreDisplayLayoutEntryTemplateItem />
                        )}
                    </Region>
                </ScrollArea>
            </Bubble>
        </Region>
    );
};

/** Row template `entry_template` of HighScoreDisplayLayout - pass real rows through its `items…` slot. */
export interface HighScoreDisplayLayoutEntryTemplateItemProps {
    captionScore?: string;
    captionUsernames?: string;
    layout?: BoxLayout;
}

export const HighScoreDisplayLayoutEntryTemplateItem = ({ captionScore, captionUsernames, layout }: HighScoreDisplayLayoutEntryTemplateItemProps) => {
    return (
        <Region
            name="entry_template"
            params={16}
            layout={{ width: 258, height: 20, flexShrink: 0, ...layout }}
        >
            <Region
                name="usernames"
                params={80}
                layout={{ position: 'absolute', left: 2, width: 120, top: 2, height: 16, maxWidth: 180, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionUsernames ?? 'USERNAMES PH, A LIST'}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <Region
                name="score"
                params={262224}
                layout={{ position: 'absolute', left: 189, width: 56, top: 2, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionScore ?? 'SCORE PH'}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};
