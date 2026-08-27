import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `111_QuestTracker_xml` (layout "QuestTracker", 192x132) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface QuestTrackerLayoutProps {
    captionDescTxt?: string;
    captionMoreInfoTxt?: string;
    captionQuestHeaderTxt?: string;
    layout?: BoxLayout;
    onMoreInfoRegion?: () => void;
    onQuestTracker?: () => void;
    srcPromptPicA?: string;
    srcPromptPicB?: string;
    srcPromptPicC?: string;
    srcPromptPicD?: string;
    srcQuestPicBitmap?: string;
    srcQuestTrackerBg?: string;
    srcSuccessPic1?: string;
    srcSuccessPic2?: string;
    srcSuccessPic3?: string;
    srcSuccessPic4?: string;
    srcSuccessPic5?: string;
    srcSuccessPic6?: string;
}

export const QuestTrackerLayout = ({ captionDescTxt, captionMoreInfoTxt, captionQuestHeaderTxt, layout, onMoreInfoRegion, onQuestTracker, srcPromptPicA, srcPromptPicB, srcPromptPicC, srcPromptPicD, srcQuestPicBitmap, srcQuestTrackerBg, srcSuccessPic1, srcSuccessPic2, srcSuccessPic3, srcSuccessPic4, srcSuccessPic5, srcSuccessPic6 }: QuestTrackerLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 192, height: 132, ...layout }}>
            <Region
                name="quest_tracker"
                params={33105}
                onPointerTap={onQuestTracker}
                cursor="pointer"
                layout={{ position: 'absolute', right: 0, width: 192, top: 0, height: 132 }}
            >
                <ThemeImage
                    name="quest_tracker_bg"
                    src={srcQuestTrackerBg ?? '${image.library.questing.url}quest_tracker_with_bar.png'}
                    layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 133 }}
                />
                <Region
                    name="content_cont"
                    params={2176}
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                >
                    <Region
                        name="quest_header_txt"
                        params={786448}
                        layout={{ position: 'absolute', left: '50%', marginLeft: -71, width: 134, top: 2, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionQuestHeaderTxt ?? t('quests.tracker.caption')}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <Region
                        name="desc_txt"
                        params={144}
                        layout={{ position: 'absolute', left: 71, right: 6, top: 27, height: 61, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionDescTxt ?? 'Search around hotel and locate this very valuable dino egg jhg jhg jhg jh gjhg jhg jhg jhg jh gjhg jhg jhg jhg jhg jhgjhgjh gjhg jh gjhg jh gjhg jhg jhg jhg jhg jhg'}
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 115 }}
                        />
                    </Region>
                    <Region
                        name="more_info_txt"
                        params={209}
                        layout={{ position: 'absolute', left: '50%', marginLeft: -69, width: 139, top: 109, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionMoreInfoTxt ?? t('quests.tracker.moreinfo')}
                            textOptions={{ fill: '#23c5ff' }}
                        />
                    </Region>
                    <Region
                        name="more_info_region"
                        tags={[ 'FIT:questTrackerMoreInfo' ]}
                        params={17}
                        onPointerTap={onMoreInfoRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 15, width: 162, top: 106, height: 18 }}
                    />
                    <ThemeImage
                        name="quest_pic_bitmap"
                        params={16}
                        src={srcQuestPicBitmap}
                        layout={{ position: 'absolute', left: 9, width: 54, top: 32, height: 46 }}
                    />
                    <ThemeImage
                        name="success_pic_1"
                        params={16}
                        src={srcSuccessPic1 ?? '${image.library.questing.url}checkanim1.png'}
                        layout={{ position: 'absolute', left: 15, width: 41, top: 32, height: 47 }}
                    />
                    <ThemeImage
                        name="success_pic_2"
                        params={16}
                        src={srcSuccessPic2 ?? '${image.library.questing.url}checkanim2.png'}
                        layout={{ position: 'absolute', left: 15, width: 41, top: 32, height: 47 }}
                    />
                    <ThemeImage
                        name="success_pic_3"
                        params={16}
                        src={srcSuccessPic3 ?? '${image.library.questing.url}checkanim3.png'}
                        layout={{ position: 'absolute', left: 15, width: 41, top: 32, height: 47 }}
                    />
                    <ThemeImage
                        name="success_pic_4"
                        params={16}
                        src={srcSuccessPic4 ?? '${image.library.questing.url}checkanim4.png'}
                        layout={{ position: 'absolute', left: 15, width: 41, top: 32, height: 47 }}
                    />
                    <ThemeImage
                        name="success_pic_5"
                        params={16}
                        src={srcSuccessPic5 ?? '${image.library.questing.url}checkanim5.png'}
                        layout={{ position: 'absolute', left: 15, width: 41, top: 32, height: 47 }}
                    />
                    <ThemeImage
                        name="success_pic_6"
                        params={16}
                        src={srcSuccessPic6 ?? '${image.library.questing.url}checkanim6.png'}
                        layout={{ position: 'absolute', left: 15, width: 41, top: 32, height: 47 }}
                    />
                    <ThemeImage
                        name="prompt_pic_a"
                        params={16}
                        src={srcPromptPicA}
                        layout={{ position: 'absolute', left: 9, width: 54, top: 32, height: 46 }}
                    />
                    <ThemeImage
                        name="prompt_pic_b"
                        params={16}
                        src={srcPromptPicB}
                        layout={{ position: 'absolute', left: 9, width: 54, top: 32, height: 46 }}
                    />
                    <ThemeImage
                        name="prompt_pic_c"
                        params={16}
                        src={srcPromptPicC}
                        layout={{ position: 'absolute', left: 9, width: 54, top: 32, height: 46 }}
                    />
                    <ThemeImage
                        name="prompt_pic_d"
                        params={16}
                        src={srcPromptPicD}
                        layout={{ position: 'absolute', left: 9, width: 54, top: 32, height: 46 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
