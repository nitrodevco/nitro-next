import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Named region `next_quest_timer` of NextQuestTimerLayout - configured through the parent's `nextQuestTimer` prop. */
export interface NextQuestTimerLayoutNextQuestTimerProps {
    captionDescTxt?: string;
    captionMoreInfoTxt?: string;
    captionQuestHeaderTxt?: string;
    layout?: BoxLayout;
    moreInfoRegion?: ReactNode;
    onMoreInfoRegion?: () => void;
    onNextQuestTimer?: () => void;
    srcQuestPicBitmap?: string;
    srcQuestTimerContracted?: string;
    srcQuestTimerExpanded?: string;
}

export const NextQuestTimerLayoutNextQuestTimer = ({ captionDescTxt, captionMoreInfoTxt, captionQuestHeaderTxt, layout, moreInfoRegion, onMoreInfoRegion, onNextQuestTimer, srcQuestPicBitmap, srcQuestTimerContracted, srcQuestTimerExpanded }: NextQuestTimerLayoutNextQuestTimerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="next_quest_timer"
            onPointerTap={onNextQuestTimer}
            cursor="pointer"
            layout={{ position: 'absolute', right: 0, width: 195, top: 0, bottom: 0, ...layout }}
        >
            <ThemeImage
                name="quest_timer_expanded"
                src={srcQuestTimerExpanded ?? '${image.library.questing.url}quest_timer_expanded.png'}
                layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: 116 }}
            />
            <ThemeImage
                name="quest_timer_contracted"
                src={srcQuestTimerContracted ?? '${image.library.questing.url}quest_timer_contracted.png'}
                layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: 25 }}
            />
            <Region
                name="content_cont"
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionQuestHeaderTxt ?? 'Caption PH'}
                    textOptions={{ fill: '#ffffff' }}
                    name="quest_header_txt"
                    layout={{ position: 'absolute', marginLeft: -10, marginRight: 10, width: 67, top: 2, height: 18 }}
                />
                <ThemeText
                    text={captionDescTxt ?? 'Search around hotel and locate this very valuable dino egg jhg jhg jhg jh gjhg jhg jhg jhg jh gjhg jhg jhg jhg jhg jhgjhgjh gjhg jh gjhg jh gjhg jhg jhg jhg jhg jhg'}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 115 }}
                    name="desc_txt"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 71, right: 9, top: 27, height: 61 }}
                />
                <ThemeText
                    text={captionMoreInfoTxt ?? t('quests.tracker.moreinfo')}
                    textOptions={{ fill: '#23c5ff' }}
                    name="more_info_txt"
                    layout={{ position: 'absolute', width: 139, top: 89, height: 17 }}
                />
                <Region
                    name="more_info_region"
                    onPointerTap={onMoreInfoRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 15, width: 162, top: 86, height: 18 }}
                >
                    {moreInfoRegion}
                </Region>
                <ThemeImage
                    name="quest_pic_bitmap"
                    src={srcQuestPicBitmap ?? '${image.library.questing.url}quest_timer_questionmark.png'}
                    layout={{ position: 'absolute', left: 9, width: 54, top: 32, height: 46 }}
                />
            </Region>
        </Region>
    );
};
