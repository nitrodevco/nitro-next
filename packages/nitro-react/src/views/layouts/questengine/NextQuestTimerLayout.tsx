import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `123_NextQuestTimer_xml` (layout "QuestTracker", 195x116) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NextQuestTimerLayoutProps {
    layout?: BoxLayout;
    nextQuestTimer?: NextQuestTimerLayoutNextQuestTimerProps;
}

export const NextQuestTimerLayout = ({ layout, nextQuestTimer }: NextQuestTimerLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 195, height: 116, ...layout }}>
            <NextQuestTimerLayoutNextQuestTimer {...nextQuestTimer} />
        </Region>
    );
};

/** Named region `more_info_region` of NextQuestTimerLayout - configured through the parent's `moreInfoRegion` prop. */
export interface NextQuestTimerLayoutMoreInfoRegionProps {
    layout?: BoxLayout;
    onMoreInfoRegion?: () => void;
}

export const NextQuestTimerLayoutMoreInfoRegion = ({ layout, onMoreInfoRegion }: NextQuestTimerLayoutMoreInfoRegionProps) => {
    return (
        <Region
            name="more_info_region"
            onPointerTap={onMoreInfoRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 15, width: 162, top: 86, height: 18, ...layout }}
        />
    );
};

/** Named region `content_cont` of NextQuestTimerLayout - configured through the parent's `contentCont` prop. */
export interface NextQuestTimerLayoutContentContProps {
    captionDescTxt?: string;
    captionMoreInfoTxt?: string;
    captionQuestHeaderTxt?: string;
    layout?: BoxLayout;
    moreInfoRegion?: NextQuestTimerLayoutMoreInfoRegionProps;
    srcQuestPicBitmap?: string;
}

export const NextQuestTimerLayoutContentCont = ({ captionDescTxt, captionMoreInfoTxt, captionQuestHeaderTxt, layout, moreInfoRegion, srcQuestPicBitmap }: NextQuestTimerLayoutContentContProps) => {
    const t = useTranslation();

    return (
        <Region
            name="content_cont"
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center', ...layout }}
        >
            <Region
                name="quest_header_txt"
                layout={{ position: 'absolute', marginLeft: -10, marginRight: 10, width: 67, top: 2, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionQuestHeaderTxt ?? 'Caption PH'}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <Region
                name="desc_txt"
                layout={{ position: 'absolute', left: 71, right: 9, top: 27, height: 61, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionDescTxt ?? 'Search around hotel and locate this very valuable dino egg jhg jhg jhg jh gjhg jhg jhg jhg jh gjhg jhg jhg jhg jhg jhgjhgjh gjhg jh gjhg jh gjhg jhg jhg jhg jhg jhg'}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 115 }}
                />
            </Region>
            <Region
                name="more_info_txt"
                layout={{ position: 'absolute', width: 139, top: 89, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionMoreInfoTxt ?? t('quests.tracker.moreinfo')}
                    textOptions={{ fill: '#23c5ff' }}
                />
            </Region>
            <NextQuestTimerLayoutMoreInfoRegion {...moreInfoRegion} />
            <ThemeImage
                name="quest_pic_bitmap"
                src={srcQuestPicBitmap ?? '${image.library.questing.url}quest_timer_questionmark.png'}
                layout={{ position: 'absolute', left: 9, width: 54, top: 32, height: 46 }}
            />
        </Region>
    );
};

/** Named region `next_quest_timer` of NextQuestTimerLayout - configured through the parent's `nextQuestTimer` prop. */
export interface NextQuestTimerLayoutNextQuestTimerProps {
    contentCont?: NextQuestTimerLayoutContentContProps;
    layout?: BoxLayout;
    onNextQuestTimer?: () => void;
    srcQuestTimerContracted?: string;
    srcQuestTimerExpanded?: string;
}

export const NextQuestTimerLayoutNextQuestTimer = ({ contentCont, layout, onNextQuestTimer, srcQuestTimerContracted, srcQuestTimerExpanded }: NextQuestTimerLayoutNextQuestTimerProps) => {
    return (
        <Region
            name="next_quest_timer"
            onPointerTap={onNextQuestTimer}
            cursor="pointer"
            layout={{ position: 'absolute', right: 0, width: 195, top: 0, height: 116, ...layout }}
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
            <NextQuestTimerLayoutContentCont {...contentCont} />
        </Region>
    );
};
