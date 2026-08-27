import { Border, BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `59_achievement_competition_prizes_xml` (layout "Member Entry", 270x352) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AchievementCompetitionPrizesLayoutProps {
    captionCaptionTxt?: string;
    captionInfoTxt?: string;
    captionRank1InfoTxt?: string;
    captionRank1Txt?: string;
    captionRank2InfoTxt?: string;
    captionRank2Txt?: string;
    captionRank3InfoTxt?: string;
    captionRank3Txt?: string;
    captionRewardInfoTxt?: string;
    captionRewardNameTxt?: string;
    captionUserRankInfoTxt?: string;
    captionUserRankTxt?: string;
    layout?: BoxLayout;
    srcBorderBar?: string;
    srcBorderBar2?: string;
    srcRewardImage?: string;
}

export const AchievementCompetitionPrizesLayout = ({ captionCaptionTxt, captionInfoTxt, captionRank1InfoTxt, captionRank1Txt, captionRank2InfoTxt, captionRank2Txt, captionRank3InfoTxt, captionRank3Txt, captionRewardInfoTxt, captionRewardNameTxt, captionUserRankInfoTxt, captionUserRankTxt, layout, srcBorderBar, srcBorderBar2, srcRewardImage }: AchievementCompetitionPrizesLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 270, height: 352, ...layout }}>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 270, top: 0, height: 352 }}
            >
                <ThemeImage
                    name="border_bar"
                    params={16}
                    src={srcBorderBar ?? layoutImage('illumina_light_border_top_center.png')}
                    layout={{ position: 'absolute', left: 11, width: 244, top: 2, height: 4 }}
                />
                <Region
                    name="caption_txt"
                    tags={[ 'COLORABLE' ]}
                    params={16}
                    layout={{ position: 'absolute', left: 8, width: 95, top: 31, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCaptionTxt ?? 'Caption txt ph'}
                        textStyle="text-style-il-heading-1"
                    />
                </Region>
                <Region
                    name="info_txt"
                    tags={[ 'COLORABLE' ]}
                    params={16}
                    layout={{ position: 'absolute', left: 8, width: 245, top: 52, height: 35, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionInfoTxt ?? 'l%F6kjl%F6kjl%F6'}
                        textOptions={{ wordWrap: true, wordWrapWidth: 245 }}
                    />
                </Region>
                <Border
                    variant="100"
                    params={16}
                    layout={{ position: 'absolute', left: 7, width: 244, top: 85, height: 235 }}
                >
                    <Region
                        name="reward_name_txt"
                        tags={[ 'COLORABLE' ]}
                        params={16}
                        layout={{ position: 'absolute', left: 89, width: 107, top: 22, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionRewardNameTxt ?? 'THE WATERING CAN PH'}
                            textStyle="text-style-il-heading-3"
                        />
                    </Region>
                    <Region
                        name="reward_info_txt"
                        tags={[ 'COLORABLE' ]}
                        params={16}
                        layout={{ position: 'absolute', left: 88, width: 146, top: 36, height: 50, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionRewardInfoTxt ?? 'l%F6kjl%F6kjl%F6'}
                            textOptions={{ wordWrap: true, wordWrapWidth: 146 }}
                        />
                    </Region>
                    <ThemeImage
                        name="border_bar"
                        params={16}
                        src={srcBorderBar2 ?? layoutImage('illumina_light_border_top_center.png')}
                        layout={{ position: 'absolute', left: 91, width: 145, top: 89, height: 4 }}
                    />
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 85, width: 150, top: 98, height: 46 }}
                    >
                        <Region
                            name="rank_1_txt"
                            tags={[ 'COLORABLE' ]}
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 41, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionRank1Txt ?? 'Gold PH'}
                                textStyle="text-style-il-heading-3"
                            />
                        </Region>
                        <Region
                            name="rank_1_info_txt"
                            tags={[ 'COLORABLE' ]}
                            params={16}
                            layout={{ position: 'absolute', left: 54, width: 95, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                        >
                            <ThemeText
                                text={captionRank1InfoTxt ?? 'Ranks 1-50'}
                                textOptions={{ align: 'right' }}
                            />
                        </Region>
                        <Region
                            name="rank_2_txt"
                            tags={[ 'COLORABLE' ]}
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 41, top: 15, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionRank2Txt ?? 'Gold PH'}
                                textStyle="text-style-il-heading-3"
                            />
                        </Region>
                        <Region
                            name="rank_2_info_txt"
                            tags={[ 'COLORABLE' ]}
                            params={16}
                            layout={{ position: 'absolute', left: 54, width: 95, top: 15, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                        >
                            <ThemeText
                                text={captionRank2InfoTxt ?? 'Ranks 1-50'}
                                textOptions={{ align: 'right' }}
                            />
                        </Region>
                        <Region
                            name="rank_3_txt"
                            tags={[ 'COLORABLE' ]}
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 41, top: 30, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionRank3Txt ?? 'Gold PH'}
                                textStyle="text-style-il-heading-3"
                            />
                        </Region>
                        <Region
                            name="rank_3_info_txt"
                            tags={[ 'COLORABLE' ]}
                            params={16}
                            layout={{ position: 'absolute', left: 54, width: 95, top: 30, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                        >
                            <ThemeText
                                text={captionRank3InfoTxt ?? 'Ranks 1-50'}
                                textOptions={{ align: 'right' }}
                            />
                        </Region>
                    </Region>
                    <Border
                        variant="100"
                        name="user_rank_border"
                        params={16}
                        layout={{ position: 'absolute', left: 13, width: 220, top: 161, height: 67 }}
                    >
                        <WidgetSlot
                            widgetType="avatar_image"
                            name="avatar_image"
                            params={1040}
                            options={{ 'avatar_image:only_head': 'true', 'avatar_image:cropped': 'true' }}
                            layout={{ position: 'absolute', left: 10, width: 33, top: 14, height: 34 }}
                        />
                        <Region
                            name="user_rank_txt"
                            tags={[ 'COLORABLE' ]}
                            params={16}
                            layout={{ position: 'absolute', left: 59, width: 118, top: 11, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionUserRankTxt ?? 'Your rank info caption'}
                                textStyle="text-style-il-heading-2"
                            />
                        </Region>
                        <Region
                            name="user_rank_info_txt"
                            tags={[ 'COLORABLE' ]}
                            params={16}
                            layout={{ position: 'absolute', left: 59, width: 151, top: 27, height: 33, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionUserRankInfoTxt ?? 'User rank info diipa daapa duupa'}
                                textOptions={{ fill: '#666666', wordWrap: true, wordWrapWidth: 151 }}
                            />
                        </Region>
                    </Border>
                    <ThemeImage
                        name="reward_image"
                        params={16}
                        src={srcRewardImage}
                        layout={{ position: 'absolute', left: 18, width: 53, top: 22, height: 125 }}
                    />
                </Border>
            </Region>
        </Region>
    );
};
