import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { ElementDailyquestLayoutQuestdataContainer, ElementDailyquestLayoutQuestdataContainerProps } from './ElementDailyquestLayoutQuestdataContainer';

/** Generated from `91_element_dailyquest_xml` (layout "element_dailyquest", 250x70) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ElementDailyquestLayoutProps {
    captionHardRegionLabelTxt?: string;
    captionLabelTxt?: string;
    colorableTextColor?: string;
    layout?: BoxLayout;
    onEasyRegion?: () => void;
    onHardRegion?: () => void;
    questdataContainer?: ElementDailyquestLayoutQuestdataContainerProps;
    srcDivider?: string;
    visibleDifficultyContainer?: boolean;
}

export const ElementDailyquestLayout = ({ captionHardRegionLabelTxt, captionLabelTxt, colorableTextColor, layout, onEasyRegion, onHardRegion, questdataContainer, srcDivider, visibleDifficultyContainer }: ElementDailyquestLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 250, height: 70, ...layout }}>
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 250, top: 0, height: 70 }}
            >
                <ElementDailyquestLayoutQuestdataContainer {...questdataContainer} />
                {(visibleDifficultyContainer ?? false) && (
                    <Region
                        name="difficulty_container"
                        layout={{ position: 'absolute', left: 39, width: 211, top: 45, height: 17 }}
                    >
                        <Region
                            name="easy_region"
                            onPointerTap={onEasyRegion}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 0, width: 100, top: 0, height: 18 }}
                        >
                            <Region
                                name="label_txt"
                                layout={{ position: 'absolute', left: 0, width: 98, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionLabelTxt ?? t('landing.view.quest.easy')}
                                    textOptions={{ fill: colorableTextColor }}
                                />
                            </Region>
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
                            <Region
                                name="label_txt"
                                layout={{ position: 'absolute', left: 0, width: 99, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionHardRegionLabelTxt ?? t('landing.view.quest.hard')}
                                    textOptions={{ fill: colorableTextColor }}
                                />
                            </Region>
                        </Region>
                    </Region>
                )}
            </Region>
        </Region>
    );
};
