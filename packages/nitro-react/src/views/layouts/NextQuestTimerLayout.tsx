import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `123_NextQuestTimer_xml` (layout "QuestTracker", 195x116) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NextQuestTimerLayoutProps {
    layout?: BoxLayout;
}

export const NextQuestTimerLayout = ({ layout }: NextQuestTimerLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 195, height: 116, ...layout }}>
            <Region
                name="next_quest_timer"
                params={33105}
                layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: 116 }}
            >
                <ThemeImage
                    name="quest_timer_expanded"
                    params={1}
                    src="${image.library.questing.url}quest_timer_expanded.png"
                    layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: 116 }}
                />
                <ThemeImage
                    name="quest_timer_contracted"
                    params={1}
                    src="${image.library.questing.url}quest_timer_contracted.png"
                    layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: 25 }}
                />
                <Region
                    name="content_cont"
                    params={2176}
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: 116 }}
                >
                    <Region
                        name="quest_header_txt"
                        params={786448}
                        layout={{ position: 'absolute', left: 54, width: 67, top: 2, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="Caption PH"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <Region
                        name="desc_txt"
                        params={129}
                        layout={{ position: 'absolute', left: 71, width: 115, top: 27, height: 61, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="Search around hotel and locate this very valuable dino egg jhg jhg jhg jh gjhg jhg jhg jhg jh gjhg jhg jhg jhg jhg jhgjhgjh gjhg jh gjhg jh gjhg jhg jhg jhg jhg jhg"
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 115 }}
                        />
                    </Region>
                    <Region
                        name="more_info_txt"
                        params={209}
                        layout={{ position: 'absolute', left: 28, width: 139, top: 89, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('quests.tracker.moreinfo')}
                            textOptions={{ fill: '#23c5ff' }}
                        />
                    </Region>
                    <Region
                        name="more_info_region"
                        params={17}
                        layout={{ position: 'absolute', left: 15, width: 162, top: 86, height: 18 }}
                    />
                    <ThemeImage
                        name="quest_pic_bitmap"
                        params={16}
                        src="${image.library.questing.url}quest_timer_questionmark.png"
                        layout={{ position: 'absolute', left: 9, width: 54, top: 32, height: 46 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
