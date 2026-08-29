import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Named region `content_cont` of QuestTrackerLayout - configured through the parent's `contentCont` prop. */
export interface QuestTrackerLayoutContentContProps {
    captionDescTxt?: string;
    captionMoreInfoTxt?: string;
    captionQuestHeaderTxt?: string;
    layout?: BoxLayout;
    moreInfoRegion?: ReactNode;
    onMoreInfoRegion?: () => void;
    srcPromptPicA?: string;
    srcPromptPicB?: string;
    srcPromptPicC?: string;
    srcPromptPicD?: string;
    srcQuestPicBitmap?: string;
    srcSuccessPic1?: string;
    srcSuccessPic2?: string;
    srcSuccessPic3?: string;
    srcSuccessPic4?: string;
    srcSuccessPic5?: string;
    srcSuccessPic6?: string;
}

export const QuestTrackerLayoutContentCont = ({ captionDescTxt, captionMoreInfoTxt, captionQuestHeaderTxt, layout, moreInfoRegion, onMoreInfoRegion, srcPromptPicA, srcPromptPicB, srcPromptPicC, srcPromptPicD, srcQuestPicBitmap, srcSuccessPic1, srcSuccessPic2, srcSuccessPic3, srcSuccessPic4, srcSuccessPic5, srcSuccessPic6 }: QuestTrackerLayoutContentContProps) => {
    const t = useTranslation();

    return (
        <Region
            name="content_cont"
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center', ...layout }}
        >
            <Region
                name="quest_header_txt"
                layout={{ position: 'absolute', marginLeft: -4, marginRight: 4, width: 134, top: 2, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionQuestHeaderTxt ?? t('quests.tracker.caption')}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <Region
                name="desc_txt"
                layout={{ position: 'absolute', left: 71, right: 6, top: 27, height: 61, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionDescTxt ?? 'Search around hotel and locate this very valuable dino egg jhg jhg jhg jh gjhg jhg jhg jhg jh gjhg jhg jhg jhg jhg jhgjhgjh gjhg jh gjhg jh gjhg jhg jhg jhg jhg jhg'}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 115 }}
                />
            </Region>
            <Region
                name="more_info_txt"
                layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 139, top: 109, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionMoreInfoTxt ?? t('quests.tracker.moreinfo')}
                    textOptions={{ fill: '#23c5ff' }}
                />
            </Region>
            <Region
                name="more_info_region"
                onPointerTap={onMoreInfoRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 15, width: 162, top: 106, height: 18 }}
            >
                {moreInfoRegion}
            </Region>
            <ThemeImage
                name="quest_pic_bitmap"
                src={srcQuestPicBitmap}
                layout={{ position: 'absolute', left: 9, width: 54, top: 32, height: 46 }}
            />
            <ThemeImage
                name="success_pic_1"
                src={srcSuccessPic1 ?? '${image.library.questing.url}checkanim1.png'}
                layout={{ position: 'absolute', left: 15, width: 41, top: 32, height: 47 }}
            />
            <ThemeImage
                name="success_pic_2"
                src={srcSuccessPic2 ?? '${image.library.questing.url}checkanim2.png'}
                layout={{ position: 'absolute', left: 15, width: 41, top: 32, height: 47 }}
            />
            <ThemeImage
                name="success_pic_3"
                src={srcSuccessPic3 ?? '${image.library.questing.url}checkanim3.png'}
                layout={{ position: 'absolute', left: 15, width: 41, top: 32, height: 47 }}
            />
            <ThemeImage
                name="success_pic_4"
                src={srcSuccessPic4 ?? '${image.library.questing.url}checkanim4.png'}
                layout={{ position: 'absolute', left: 15, width: 41, top: 32, height: 47 }}
            />
            <ThemeImage
                name="success_pic_5"
                src={srcSuccessPic5 ?? '${image.library.questing.url}checkanim5.png'}
                layout={{ position: 'absolute', left: 15, width: 41, top: 32, height: 47 }}
            />
            <ThemeImage
                name="success_pic_6"
                src={srcSuccessPic6 ?? '${image.library.questing.url}checkanim6.png'}
                layout={{ position: 'absolute', left: 15, width: 41, top: 32, height: 47 }}
            />
            <ThemeImage
                name="prompt_pic_a"
                src={srcPromptPicA}
                layout={{ position: 'absolute', left: 9, width: 54, top: 32, height: 46 }}
            />
            <ThemeImage
                name="prompt_pic_b"
                src={srcPromptPicB}
                layout={{ position: 'absolute', left: 9, width: 54, top: 32, height: 46 }}
            />
            <ThemeImage
                name="prompt_pic_c"
                src={srcPromptPicC}
                layout={{ position: 'absolute', left: 9, width: 54, top: 32, height: 46 }}
            />
            <ThemeImage
                name="prompt_pic_d"
                src={srcPromptPicD}
                layout={{ position: 'absolute', left: 9, width: 54, top: 32, height: 46 }}
            />
        </Region>
    );
};
