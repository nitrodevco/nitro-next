import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { DailyQuestLayoutContentContainer, DailyQuestLayoutContentContainerProps } from './DailyQuestLayoutContentContainer';

/** Generated from `96_daily_quest_xml` (layout "landing_view", 500x194) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface DailyQuestLayoutProps {
    captionHardRegionLabelTxt?: string;
    captionLabelTxt?: string;
    captionTitleTxt?: string;
    contentContainer?: DailyQuestLayoutContentContainerProps;
    layout?: BoxLayout;
    onEasyRegion?: () => void;
    onHardRegion?: () => void;
    srcBitmap?: string;
    srcBorderBar?: string;
    srcDivider?: string;
    srcHdrLine?: string;
}

export const DailyQuestLayout = ({ captionHardRegionLabelTxt, captionLabelTxt, captionTitleTxt, contentContainer, layout, onEasyRegion, onHardRegion, srcBitmap, srcBorderBar, srcDivider, srcHdrLine }: DailyQuestLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 500, height: 194, ...layout }}>
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <ThemeImage
                    name="border_bar"
                    src={srcBorderBar ?? layoutImage('illumina_light_border_top_center.png')}
                    layout={{ position: 'absolute', left: 7, width: 12, top: 10, height: 4 }}
                />
                <ThemeText
                    text={captionTitleTxt ?? 'TITLE PH'}
                    textStyle="text-style-il-heading-3"
                    name="title_txt"
                    layout={{ position: 'absolute', left: 18, width: 43, top: 3, height: 14 }}
                />
                <ThemeImage
                    name="hdr_line"
                    src={srcHdrLine ?? layoutImage('illumina_light_border_top_center.png')}
                    layout={{ position: 'absolute', left: 100, width: 400, top: 10, height: 4 }}
                />
                <ThemeImage
                    name="bitmap"
                    src={srcBitmap}
                    layout={{ position: 'absolute', left: 10, width: 20, top: 10, height: 20 }}
                />
                <DailyQuestLayoutContentContainer {...contentContainer} />
                <Region
                    name="difficulty_container"
                    layout={{ position: 'absolute', left: 285, width: 211, top: 3, height: 17 }}
                >
                    <Region
                        name="easy_region"
                        onPointerTap={onEasyRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, width: 100, top: 0, height: 18 }}
                    >
                        <ThemeText
                            text={captionLabelTxt ?? t('landing.view.quest.easy')}
                            name="label_txt"
                            layout={{ position: 'absolute', left: 0, width: 98, top: 0, height: 14 }}
                        />
                    </Region>
                    <ThemeImage
                        name="divider"
                        src={srcDivider ?? layoutImage('landing_view_reception_horizontal.png')}
                        layout={{ position: 'absolute', right: 106, width: 2, top: 0, bottom: -3 }}
                    />
                    <Region
                        name="hard_region"
                        onPointerTap={onHardRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 112, width: 99, top: 0, height: 18 }}
                    >
                        <ThemeText
                            text={captionHardRegionLabelTxt ?? t('landing.view.quest.hard')}
                            name="label_txt"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 14 }}
                        />
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};
