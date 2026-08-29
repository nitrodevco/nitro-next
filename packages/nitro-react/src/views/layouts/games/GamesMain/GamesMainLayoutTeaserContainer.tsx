import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `teaser_container` of GamesMainLayout - configured through the parent's `teaserContainer` prop. */
export interface GamesMainLayoutTeaserContainerProps {
    captionHeader?: string;
    captionHeaderStroke?: string;
    captionHeaderTextContainerHeader?: string;
    captionInstructionsLink?: string;
    captionLeaderboardLink?: string;
    layout?: BoxLayout;
    onInstructionsLink?: () => void;
    onLeaderboardLink?: () => void;
    srcQuickPlayTeaser?: string;
    tintQuickPlayTeaser?: string;
}

export const GamesMainLayoutTeaserContainer = ({ captionHeader, captionHeaderStroke, captionHeaderTextContainerHeader, captionInstructionsLink, captionLeaderboardLink, layout, onInstructionsLink, onLeaderboardLink, srcQuickPlayTeaser, tintQuickPlayTeaser }: GamesMainLayoutTeaserContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="teaser_container"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 436, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="quick_play_teaser"
                src={srcQuickPlayTeaser ?? layoutImage('quick_play_teaser.png')}
                tint={tintQuickPlayTeaser}
                layout={{ position: 'absolute', left: 0, width: 407, top: 160, height: 130 }}
            />
            <Region
                name="header_text_container"
                layout={{ position: 'absolute', left: 70, width: 279, top: 107, height: 165 }}
            >
                <Region
                    name="header_stroke"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 139, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionHeaderStroke ?? t('snowwar.descriptionHeader')}
                        textOptions={{ fill: '#1077ac', align: 'center' }}
                    />
                </Region>
                <Region
                    name="header"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 139, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionHeader ?? t('snowwar.descriptionHeader')}
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
                <Region
                    name="header"
                    layout={{ position: 'absolute', left: 18, right: 18, top: 30, bottom: 117, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionHeaderTextContainerHeader ?? t('snowwar.descriptionBody')}
                        textOptions={{ fill: '#1077ac', wordWrap: true, wordWrapWidth: 243, align: 'center' }}
                    />
                </Region>
            </Region>
            <Region
                name="instructions_link"
                layout={{ position: 'absolute', width: 407, top: 280, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                onPointerTap={onInstructionsLink}
                cursor="pointer"
            >
                <ThemeText
                    text={captionInstructionsLink ?? t('snowwar.instructions.link')}
                    textOptions={{ fill: '#1077ac', align: 'center' }}
                />
            </Region>
            <Region
                name="leaderboard_link"
                layout={{ position: 'absolute', width: 407, top: 315, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                onPointerTap={onLeaderboardLink}
                cursor="pointer"
            >
                <ThemeText
                    text={captionLeaderboardLink ?? t('snowwar.leaderboards.link')}
                    textOptions={{ fill: '#1077ac', align: 'center' }}
                />
            </Region>
        </Region>
    );
};
