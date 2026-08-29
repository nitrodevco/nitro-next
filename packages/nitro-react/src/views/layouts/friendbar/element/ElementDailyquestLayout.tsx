import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ContainerButton, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `91_element_dailyquest_xml` (layout "element_dailyquest", 250x70) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ElementDailyquestLayoutProps {
    difficultyContainer?: ElementDailyquestLayoutDifficultyContainerProps;
    layout?: BoxLayout;
    questdataContainer?: ElementDailyquestLayoutQuestdataContainerProps;
}

export const ElementDailyquestLayout = ({ difficultyContainer, layout, questdataContainer }: ElementDailyquestLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 250, height: 70, ...layout }}>
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 250, top: 0, height: 70 }}
            >
                <ElementDailyquestLayoutQuestdataContainer {...questdataContainer} />
                <ElementDailyquestLayoutDifficultyContainer {...difficultyContainer} />
            </Region>
        </Region>
    );
};

/** Named region `next_quest_region` of ElementDailyquestLayout - configured through the parent's `nextQuestRegion` prop. */
export interface ElementDailyquestLayoutNextQuestRegionProps {
    captionNextQuestTxt?: string;
    layout?: BoxLayout;
    onNextQuestRegion?: () => void;
    tags?: string[];
    visibleNextQuestRegion?: boolean;
}

export const ElementDailyquestLayoutNextQuestRegion = ({ captionNextQuestTxt, layout, onNextQuestRegion, tags, visibleNextQuestRegion }: ElementDailyquestLayoutNextQuestRegionProps) => {
    return (
        <Region
            name="next_quest_region"
            tags={tags}
            visible={visibleNextQuestRegion ?? false}
            onPointerTap={onNextQuestRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 250, top: 45, height: 12, ...layout }}
        >
            <Region
                name="next_quest_txt"
                tags={[ 'COLORABLE' ]}
                layout={{ position: 'absolute', left: 0, width: 137, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionNextQuestTxt ?? 'PH: Show me another easy quest'} />
            </Region>
        </Region>
    );
};

/** Named region `cancel_quest_region` of ElementDailyquestLayout - configured through the parent's `cancelQuestRegion` prop. */
export interface ElementDailyquestLayoutCancelQuestRegionProps {
    captionCancelQuestTxt?: string;
    layout?: BoxLayout;
    onCancelQuestRegion?: () => void;
    tags?: string[];
}

export const ElementDailyquestLayoutCancelQuestRegion = ({ captionCancelQuestTxt, layout, onCancelQuestRegion, tags }: ElementDailyquestLayoutCancelQuestRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="cancel_quest_region"
            tags={tags}
            onPointerTap={onCancelQuestRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 250, top: 55, height: 14, ...layout }}
        >
            <Region
                name="cancel_quest_txt"
                tags={[ 'COLORABLE' ]}
                layout={{ position: 'absolute', left: 0, width: 105, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionCancelQuestTxt ?? t('landing.view.quest.cancel')} />
            </Region>
        </Region>
    );
};

/** Named region `questdata_container` of ElementDailyquestLayout - configured through the parent's `questdataContainer` prop. */
export interface ElementDailyquestLayoutQuestdataContainerProps {
    cancelQuestRegion?: ElementDailyquestLayoutCancelQuestRegionProps;
    captionAcceptText?: string;
    captionCaptionTxt?: string;
    captionCurrentQuestTxt?: string;
    layout?: BoxLayout;
    nextQuestRegion?: ElementDailyquestLayoutNextQuestRegionProps;
    onAcceptButton?: () => void;
    onGoButton?: () => void;
    tags?: string[];
    visibleAcceptButton?: boolean;
}

export const ElementDailyquestLayoutQuestdataContainer = ({ cancelQuestRegion, captionAcceptText, captionCaptionTxt, captionCurrentQuestTxt, layout, nextQuestRegion, onAcceptButton, onGoButton, tags, visibleAcceptButton }: ElementDailyquestLayoutQuestdataContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="questdata_container"
            tags={tags}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 250, top: 0, height: 70, ...layout }}
        >
            <Region
                visible={visibleAcceptButton ?? false}
                layout={{ position: 'absolute', left: 0, width: 250, top: 2, height: 39, minWidth: 250, maxWidth: 250 }}
            >
                <ContainerButton
                    variant="102"
                    name="accept_button"
                    onPointerTap={onAcceptButton}
                    layout={{ width: '100%', height: '100%' }}
                >
                    <Region layout={{ position: 'absolute', left: 5, top: 3, flexDirection: 'column' }}>
                        <Region
                            name="caption_txt"
                            layout={{ height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={captionCaptionTxt ?? 'DQ Title'} />
                        </Region>
                        <Region
                            name="accept_text"
                            layout={{ height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={captionAcceptText ?? t('landing.view.quest.accept')} />
                        </Region>
                    </Region>
                </ContainerButton>
            </Region>
            <ElementDailyquestLayoutNextQuestRegion {...nextQuestRegion} />
            <ElementDailyquestLayoutCancelQuestRegion {...cancelQuestRegion} />
            <Border
                variant="100"
                name="current_quest_border"
                layout={{ position: 'absolute', left: 0, width: 250, top: 0, height: 55 }}
            >
                <Button
                    variant="100"
                    name="go_button"
                    onPointerTap={onGoButton}
                    layout={{ position: 'absolute', right: -2, width: 88, top: 3, height: 50, minWidth: 88, maxWidth: 88 }}
                >
                    {t('landing.view.quest.go')}
                </Button>
                <Region
                    name="current_quest_txt"
                    tags={[ 'COLORABLE' ]}
                    layout={{ position: 'absolute', left: 13, width: 157, top: 10, height: 43, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCurrentQuestTxt ?? t('landing.view.quest.currenttask')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 157 }}
                    />
                </Region>
            </Border>
        </Region>
    );
};

/** Named region `easy_region` of ElementDailyquestLayout - configured through the parent's `easyRegion` prop. */
export interface ElementDailyquestLayoutEasyRegionProps {
    captionLabelTxt?: string;
    layout?: BoxLayout;
    onEasyRegion?: () => void;
    tags?: string[];
}

export const ElementDailyquestLayoutEasyRegion = ({ captionLabelTxt, layout, onEasyRegion, tags }: ElementDailyquestLayoutEasyRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="easy_region"
            tags={tags}
            onPointerTap={onEasyRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 100, top: 0, height: 18, ...layout }}
        >
            <Region
                name="label_txt"
                tags={[ 'COLORABLE' ]}
                layout={{ position: 'absolute', left: 0, width: 98, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionLabelTxt ?? t('landing.view.quest.easy')} />
            </Region>
        </Region>
    );
};

/** Named region `hard_region` of ElementDailyquestLayout - configured through the parent's `hardRegion` prop. */
export interface ElementDailyquestLayoutHardRegionProps {
    captionLabelTxt?: string;
    layout?: BoxLayout;
    onHardRegion?: () => void;
    tags?: string[];
}

export const ElementDailyquestLayoutHardRegion = ({ captionLabelTxt, layout, onHardRegion, tags }: ElementDailyquestLayoutHardRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="hard_region"
            tags={tags}
            onPointerTap={onHardRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 112, width: 99, top: 0, height: 18, ...layout }}
        >
            <Region
                name="label_txt"
                tags={[ 'COLORABLE' ]}
                layout={{ position: 'absolute', left: 0, width: 99, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionLabelTxt ?? t('landing.view.quest.hard')} />
            </Region>
        </Region>
    );
};

/** Named region `difficulty_container` of ElementDailyquestLayout - configured through the parent's `difficultyContainer` prop. */
export interface ElementDailyquestLayoutDifficultyContainerProps {
    easyRegion?: ElementDailyquestLayoutEasyRegionProps;
    hardRegion?: ElementDailyquestLayoutHardRegionProps;
    layout?: BoxLayout;
    srcDivider?: string;
    tags?: string[];
    visibleDifficultyContainer?: boolean;
}

export const ElementDailyquestLayoutDifficultyContainer = ({ easyRegion, hardRegion, layout, srcDivider, tags, visibleDifficultyContainer }: ElementDailyquestLayoutDifficultyContainerProps) => {
    return (
        <Region
            name="difficulty_container"
            tags={tags}
            visible={visibleDifficultyContainer ?? false}
            layout={{ position: 'absolute', left: 39, width: 211, top: 45, height: 17, ...layout }}
        >
            <ElementDailyquestLayoutEasyRegion {...easyRegion} />
            <ThemeImage
                name="divider"
                src={srcDivider ?? layoutImage('landing_view_reception_horizontal.png')}
                layout={{ position: 'absolute', right: 106, width: 2, top: 0, bottom: -3 }}
            />
            <ElementDailyquestLayoutHardRegion {...hardRegion} />
        </Region>
    );
};
