import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Bubble, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { HighScoreDisplayLayoutEntryTemplateItem } from './HighScoreDisplayLayoutEntryTemplateItem';

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
                layout={{ position: 'absolute', left: 0, width: 275, top: 0, height: 341, justifyContent: 'center' }}
            >
                <Region
                    name="title"
                    backgroundColor="#3f3f3f"
                    layout={{ position: 'absolute', left: 9, width: 256, top: 8, height: 20, justifyContent: 'center' }}
                >
                    <Region layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 151, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
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
                    layout={{ position: 'absolute', left: 8, width: 258, top: 30, height: 23 }}
                >
                    <Border
                        variant="100"
                        layout={{ position: 'absolute', left: 0, width: 190, top: 0, height: 23 }}
                    >
                        <Region layout={{ position: 'absolute', left: 1, width: 163, top: 3, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            {t('high.score.display.users.header')}
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
                            {captionScoreHeader ?? t('high.score.display.score.header')}
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
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 8, width: 256, top: 53, height: 253 }}
                >
                    <Region
                        name="entries"
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
