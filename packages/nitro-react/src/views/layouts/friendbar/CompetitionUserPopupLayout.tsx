import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `20_competition_user_popup_xml` (layout "Achievement competition hall of fame", 154x79) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CompetitionUserPopupLayoutProps {
    captionRankDescTxt?: string;
    captionScoreTxt?: string;
    captionUserNameTxt?: string;
    layout?: BoxLayout;
}

export const CompetitionUserPopupLayout = ({ captionRankDescTxt, captionScoreTxt, captionUserNameTxt, layout }: CompetitionUserPopupLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 154, height: 79, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center' }}>
                <Border
                    variant="0"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 10 }}
                >
                    <ThemeImage
                        src="${image.library.url}reception/leaf.png"
                        layout={{ position: 'absolute', left: 14, width: 21, top: 11, height: 20 }}
                    />
                    <Region
                        name="rank_desc_txt"
                        layout={{ position: 'absolute', right: 8, width: 133, bottom: 1, height: 27, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionRankDescTxt ?? 'The garden king'}
                            textOptions={{ fill: '#666666', wordWrap: true, wordWrapWidth: 133 }}
                        />
                    </Region>
                    <Region
                        name="user_name_txt"
                        layout={{ position: 'absolute', left: 37, width: 35, top: 13, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionUserNameTxt ?? 'Ibuxal'}
                            textStyle="text-style-il-heading-3"
                        />
                    </Region>
                    <Region
                        name="score_txt"
                        layout={{ position: 'absolute', left: 12, width: 70, alignSelf: 'center', marginTop: 0.5, marginBottom: -0.5, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionScoreTxt ?? '12333 Points'}
                            textStyle="text-style-il-heading-2"
                            textOptions={{ fill: '#666666' }}
                        />
                    </Region>
                </Border>
                <ThemeImage
                    src="${image.library.url}reception/sakara.png"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 9, bottom: 5, height: 6 }}
                />
            </Region>
        </Region>
    );
};
