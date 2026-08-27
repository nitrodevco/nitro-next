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
            <Region
                params={16400}
                layout={{ position: 'absolute', left: 0, width: 154, top: 0, height: 79 }}
            >
                <Border
                    variant="0"
                    params={16400}
                    layout={{ position: 'absolute', left: 0, width: 154, top: 0, height: 69 }}
                >
                    <ThemeImage
                        params={16}
                        src="${image.library.url}reception/leaf.png"
                        layout={{ position: 'absolute', left: 14, width: 21, top: 11, height: 20 }}
                    />
                    <Region
                        name="rank_desc_txt"
                        params={16}
                        layout={{ position: 'absolute', left: 13, width: 133, top: 41, height: 27, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionRankDescTxt ?? 'The garden king'}
                            textOptions={{ fill: '#666666', wordWrap: true, wordWrapWidth: 133 }}
                        />
                    </Region>
                    <Region
                        name="user_name_txt"
                        params={16}
                        layout={{ position: 'absolute', left: 37, width: 35, top: 13, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionUserNameTxt ?? 'Ibuxal'}
                            textStyle="text-style-il-heading-3"
                        />
                    </Region>
                    <Region
                        name="score_txt"
                        params={16}
                        layout={{ position: 'absolute', left: 12, width: 70, top: 27, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionScoreTxt ?? '12333 Points'}
                            textStyle="text-style-il-heading-2"
                            textOptions={{ fill: '#666666' }}
                        />
                    </Region>
                </Border>
                <ThemeImage
                    params={16}
                    src="${image.library.url}reception/sakara.png"
                    layout={{ position: 'absolute', left: 72, width: 9, top: 68, height: 6 }}
                />
            </Region>
        </Region>
    );
};
