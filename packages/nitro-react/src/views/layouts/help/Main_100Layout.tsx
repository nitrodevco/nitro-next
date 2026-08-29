import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ScrollArea, Shape, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `100_main_xml` (layout "main", 1103x722) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface Main_100LayoutProps {
    body?: Main_100LayoutBodyProps;
    header?: Main_100LayoutHeaderProps;
    layout?: BoxLayout;
    onClose?: () => void;
    recolorDark?: string;
}

export const Main_100Layout = ({ body, header, layout, onClose, recolorDark }: Main_100LayoutProps) => {
    return (
        <Frame
            variant="3"
            caption="Reward Track"
            tintColor={recolorDark ?? '#3576b9'}
            onClose={onClose}
            layout={{ width: 1103, height: 722, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Main_100LayoutHeader {...header} />
                <Main_100LayoutBody {...body} />
            </Region>
        </Frame>
    );
};

/** Named region `cutout` of Main_100Layout - configured through the parent's `cutout` prop. */
export interface Main_100LayoutCutout2Props {
    layout?: BoxLayout;
    recolorLight?: string;
}

export const Main_100LayoutCutout2 = ({ layout, recolorLight }: Main_100LayoutCutout2Props) => {
    return (
        <Region
            name="cutout"
            layout={{ position: 'absolute', right: -32, width: 35, top: 2, bottom: 0, ...layout }}
        >
            <Shape
                shape="ellipse"
                color={recolorLight ?? '#ddebf9'}
                strokeColor="#000000"
                strokeThickness={2}
                radius={40}
                layout={{ position: 'absolute', left: -35, width: 70, top: -59, height: 300 }}
            />
        </Region>
    );
};

/** Row template `track_title_region` of Main_100Layout - pass real rows through its `items…` slot. */
export interface Main_100LayoutTrackTitleRegionItemProps {
    captionTrackTitleTxt?: string;
    layout?: BoxLayout;
    onTrackTitleRegion?: () => void;
}

export const Main_100LayoutTrackTitleRegionItem = ({ captionTrackTitleTxt, layout, onTrackTitleRegion }: Main_100LayoutTrackTitleRegionItemProps) => {
    return (
        <Region
            name="track_title_region"
            onPointerTap={onTrackTitleRegion}
            cursor="pointer"
            layout={{ width: 160, height: 24, flexShrink: 0, ...layout }}
        >
            <Region
                name="track_title_txt"
                layout={{ position: 'absolute', left: 0, top: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTrackTitleTxt ?? 'New player track'}
                    textOptions={{ wordWrap: true }}
                />
            </Region>
        </Region>
    );
};

/** Row template `spacer` of Main_100Layout - pass real rows through its `items…` slot. */
export interface Main_100LayoutSpacerItemProps {
    layout?: BoxLayout;
}

export const Main_100LayoutSpacerItem = ({ layout }: Main_100LayoutSpacerItemProps) => {
    return (
        <Region
            name="spacer"
            layout={{ width: 30, height: 2, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `track_desc_txt` of Main_100Layout - pass real rows through its `items…` slot. */
export interface Main_100LayoutTrackDescTxtItemProps {
    captionTrackDescTxt?: string;
    layout?: BoxLayout;
}

export const Main_100LayoutTrackDescTxtItem = ({ captionTrackDescTxt, layout }: Main_100LayoutTrackDescTxtItemProps) => {
    return (
        <Region
            name="track_desc_txt"
            layout={{ width: 160, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionTrackDescTxt ?? 'Kickstart your Habbo journey!'}
                textOptions={{ wordWrap: true, wordWrapWidth: 160 }}
            />
        </Region>
    );
};

/** Row template `track_instructions_txt` of Main_100Layout - pass real rows through its `items…` slot. */
export interface Main_100LayoutTrackInstructionsTxtItemProps {
    captionTrackInstructionsTxt?: string;
    layout?: BoxLayout;
}

export const Main_100LayoutTrackInstructionsTxtItem = ({ captionTrackInstructionsTxt, layout }: Main_100LayoutTrackInstructionsTxtItemProps) => {
    return (
        <Region
            name="track_instructions_txt"
            layout={{ width: 157, height: 28, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionTrackInstructionsTxt ?? 'Complete tasks to earn points and unlock rewards'}
                textOptions={{ wordWrap: true, wordWrapWidth: 157 }}
            />
        </Region>
    );
};

/** Named region `track_info` of Main_100Layout - configured through the parent's `trackInfo` prop. */
export interface Main_100LayoutTrackInfoProps {
    itemsTrackInfo?: ReactNode;
    layout?: BoxLayout;
}

export const Main_100LayoutTrackInfo = ({ itemsTrackInfo, layout }: Main_100LayoutTrackInfoProps) => {
    return (
        <Region
            name="track_info"
            layout={{ position: 'absolute', left: 0, width: 160, alignSelf: 'center', marginTop: 0.5, marginBottom: -0.5, height: 73, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsTrackInfo ?? (
                <>
                    <Main_100LayoutTrackTitleRegionItem />
                    <Main_100LayoutSpacerItem />
                    <Main_100LayoutTrackDescTxtItem />
                    <Main_100LayoutTrackInstructionsTxtItem />
                </>
            )}
        </Region>
    );
};

/** Named region `cutout` of Main_100Layout - configured through the parent's `cutout` prop. */
export interface Main_100LayoutCutoutProps {
    captionPointsTotalCollectedTxt?: string;
    captionRewardsCollectedTxt?: string;
    cutout?: Main_100LayoutCutout2Props;
    layout?: BoxLayout;
    recolorLight?: string;
    recolorMedium?: string;
    trackInfo?: Main_100LayoutTrackInfoProps;
}

export const Main_100LayoutCutout = ({ captionPointsTotalCollectedTxt, captionRewardsCollectedTxt, cutout, layout, recolorLight, recolorMedium, trackInfo }: Main_100LayoutCutoutProps) => {
    const t = useTranslation();

    return (
        <Region
            name="cutout"
            layout={{ position: 'absolute', left: 0, width: 245, top: 0, bottom: 0, ...layout }}
        >
            <Main_100LayoutCutout2 {...cutout} />
            <Border
                variant="15"
                name="profile"
                tintColor={recolorLight ?? '#ddebf9'}
                layout={{ position: 'absolute', left: 0, width: 264, top: 0, bottom: 0, justifyContent: 'center' }}
            >
                <WidgetSlot
                    widgetType="avatar_image"
                    name="own_avatar"
                    layout={{ position: 'absolute', left: -3, width: 90, top: -15, height: 130 }}
                />
                <Region layout={{ position: 'absolute', right: 2, width: 175, top: -1, bottom: 120 }}>
                    <Main_100LayoutTrackInfo {...trackInfo} />
                </Region>
                <Border
                    variant="15"
                    name="points_total_border"
                    tintColor={recolorMedium ?? '#cfe2f9'}
                    layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 179, top: 122, height: 62, justifyContent: 'center' }}
                >
                    <Region layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 72, top: 11, height: 20, minHeight: 24, maxHeight: 24, flexDirection: 'row', gap: 4 }}>
                        <ThemeImage
                            src={layoutImage('reward_track_point_large.png')}
                            layout={{ width: 27, height: 18, flexShrink: 0 }}
                        />
                        <Region
                            name="points_total_collected_txt"
                            layout={{ width: 41, height: 28, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={captionPointsTotalCollectedTxt ?? '125'} />
                        </Region>
                    </Region>
                    <Region layout={{ position: 'absolute', left: 10, width: 160, top: 36, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <ThemeText
                            text={t('reward_track.profile.points_collected')}
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                </Border>
                <Shape
                    name="splitter"
                    color={recolorLight ?? '#ddebf9'}
                    strokeThickness={1}
                    layout={{ position: 'absolute', left: 16, width: 231, top: 196, height: 2 }}
                />
                <Region layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 247, top: 204, height: 30, flexDirection: 'row', gap: 6 }}>
                    <ThemeImage
                        src={layoutImage('reward_track_checkmark.png')}
                        layout={{ width: 17, height: 15, flexShrink: 0 }}
                    />
                    <Region
                        name="rewards_collected_txt"
                        layout={{ width: 224, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionRewardsCollectedTxt ?? t('reward_track.profile.rewards_collected')} />
                    </Region>
                </Region>
            </Border>
        </Region>
    );
};

/** Named region `loading_bar` of Main_100Layout - configured through the parent's `loadingBar` prop. */
export interface Main_100LayoutLoadingBar2Props {
    layout?: BoxLayout;
}

export const Main_100LayoutLoadingBar2 = ({ layout }: Main_100LayoutLoadingBar2Props) => {
    return (
        <Region
            name="loading_bar"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <Shape
                name="shape"
                shape="round_rectangle"
                color="#71af24"
                strokeThickness={1}
                radius={6}
                layout={{ position: 'absolute', left: 0, right: -4, top: 0, bottom: 0 }}
            />
        </Region>
    );
};

/** Named region `progress` of Main_100Layout - configured through the parent's `progress` prop. */
export interface Main_100LayoutProgressProps {
    layout?: BoxLayout;
    loadingBar?: Main_100LayoutLoadingBar2Props;
}

export const Main_100LayoutProgress = ({ layout, loadingBar }: Main_100LayoutProgressProps) => {
    return (
        <Region
            name="progress"
            layout={{ position: 'absolute', left: 0, width: 300, top: 0, bottom: 0, ...layout }}
        >
            <Main_100LayoutLoadingBar2 {...loadingBar} />
            <Region
                blendMode="add"
                layout={{ position: 'absolute', left: 1, right: 0, top: 1, bottom: 1 }}
            />
        </Region>
    );
};

/** Named region `loading_bar` of Main_100Layout - configured through the parent's `loadingBar` prop. */
export interface Main_100LayoutLoadingBarProps {
    layout?: BoxLayout;
    progress?: Main_100LayoutProgressProps;
}

export const Main_100LayoutLoadingBar = ({ layout, progress }: Main_100LayoutLoadingBarProps) => {
    return (
        <Region
            name="loading_bar"
            layout={{ position: 'absolute', left: 29, right: 29, top: 92, height: 13, ...layout }}
        >
            <Shape
                name="bg"
                shape="round_rectangle"
                color="#888888"
                strokeThickness={1}
                radius={6}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <Main_100LayoutProgress {...progress} />
        </Region>
    );
};

/** Named region `track` of Main_100Layout - configured through the parent's `track` prop. */
export interface Main_100LayoutTrackProps {
    layout?: BoxLayout;
    loadingBar?: Main_100LayoutLoadingBarProps;
}

export const Main_100LayoutTrack = ({ layout, loadingBar }: Main_100LayoutTrackProps) => {
    return (
        <Region
            name="track"
            layout={{ position: 'absolute', left: 165, right: 22, top: 2, bottom: 2, ...layout }}
        >
            <Main_100LayoutLoadingBar {...loadingBar} />
        </Region>
    );
};

/** Named region `point_indicator_template` of Main_100Layout - configured through the parent's `pointIndicatorTemplate` prop. */
export interface Main_100LayoutPointIndicatorTemplateProps {
    captionPointsTxt?: string;
    layout?: BoxLayout;
    recolorMedium?: string;
    srcAvailableIcon?: string;
}

export const Main_100LayoutPointIndicatorTemplate = ({ captionPointsTxt, layout, recolorMedium, srcAvailableIcon }: Main_100LayoutPointIndicatorTemplateProps) => {
    return (
        <Region
            name="point_indicator_template"
            layout={{ position: 'absolute', left: 9, width: 80, top: 82, height: 157, ...layout }}
        >
            <ThemeImage
                name="available_icon"
                src={srcAvailableIcon ?? layoutImage('reward_track_not_available_icon.png')}
                layout={{ position: 'absolute', left: 30, width: 20, top: 7, height: 20 }}
            />
            <Shape
                shape="ellipse"
                color={recolorMedium ?? '#cfe2f9'}
                strokeThickness={3}
                layout={{ position: 'absolute', left: 37, width: 7, top: 121, height: 7 }}
            />
            <Shape
                color={recolorMedium ?? '#cfe2f9'}
                strokeThickness={3}
                layout={{ position: 'absolute', left: 40, width: 1, top: 127, height: 8 }}
            />
            <Shape
                name="connector"
                color={recolorMedium ?? '#cfe2f9'}
                strokeThickness={3}
                layout={{ position: 'absolute', left: 40, width: 1, bottom: 35, height: 9 }}
            />
            <Region
                name="points_txt"
                layout={{ position: 'absolute', left: 0, width: 80, top: 136, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionPointsTxt ?? '100'}
                    textOptions={{ align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `points_indicator` of Main_100Layout - configured through the parent's `pointsIndicator` prop. */
export interface Main_100LayoutPointsIndicatorProps {
    layout?: BoxLayout;
    pointIndicatorTemplate?: Main_100LayoutPointIndicatorTemplateProps;
}

export const Main_100LayoutPointsIndicator = ({ layout, pointIndicatorTemplate }: Main_100LayoutPointsIndicatorProps) => {
    return (
        <Region
            name="points_indicator"
            layout={{ position: 'absolute', left: 194, right: 51, top: 0, bottom: 0, ...layout }}
        >
            <Main_100LayoutPointIndicatorTemplate {...pointIndicatorTemplate} />
        </Region>
    );
};

/** Named region `points_indicator_container` of Main_100Layout - configured through the parent's `pointsIndicatorContainer` prop. */
export interface Main_100LayoutPointsIndicatorContainerProps {
    layout?: BoxLayout;
    pointsIndicator?: Main_100LayoutPointsIndicatorProps;
    recolorMedium?: string;
}

export const Main_100LayoutPointsIndicatorContainer = ({ layout, pointsIndicator, recolorMedium }: Main_100LayoutPointsIndicatorContainerProps) => {
    return (
        <Region
            name="points_indicator_container"
            layout={{ position: 'absolute', left: 2, right: 2, top: 2, bottom: 2, ...layout }}
        >
            <Border
                variant="15"
                tintColor={recolorMedium ?? '#cfe2f9'}
                blend={0.7}
                layout={{ position: 'absolute', left: 6, width: 844, bottom: -11, height: 44 }}
            >
                <Region
                    blendMode="add"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
            </Border>
            <Main_100LayoutPointsIndicator {...pointsIndicator} />
        </Region>
    );
};

/** Named region `click_region` of Main_100Layout - configured through the parent's `clickRegion` prop. */
export interface Main_100LayoutClickRegionProps {
    layout?: BoxLayout;
    onClickRegion?: () => void;
}

export const Main_100LayoutClickRegion = ({ layout, onClickRegion }: Main_100LayoutClickRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="click_region"
            tooltip={t('reward_track.rewards.reward_tooltip.claim')}
            dynamicStyle="reward_track_item"
            onPointerTap={onClickRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 12, width: 56, top: 10, height: 60, ...layout }}
        >
            <Border
                variant="1"
                name="shadow"
                blend={0.25}
                layout={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 16 }}
            />
            <Border
                variant="16"
                name="border"
                tintColor="#f9efe0"
                layout={{ position: 'absolute', left: 0, right: 0, top: 2, bottom: 2, justifyContent: 'center' }}
            >
                <WidgetSlot
                    widgetType="product_icon"
                    name="product_icon"
                    layout={{ position: 'absolute', width: 40, alignSelf: 'center', height: 40 }}
                />
                <Shape
                    name="quantity_container"
                    shape="round_rectangle"
                    color="#f9efe0"
                    strokeColor="#000000"
                    strokeThickness={1}
                    radius={5}
                    layout={{ position: 'absolute', width: 20, bottom: 5, height: 14 }}
                />
            </Border>
        </Region>
    );
};

/** Named region `connector` of Main_100Layout - configured through the parent's `connector` prop. */
export interface Main_100LayoutConnectorProps {
    layout?: BoxLayout;
}

export const Main_100LayoutConnector = ({ layout }: Main_100LayoutConnectorProps) => {
    return (
        <Region
            name="connector"
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 39, width: 2, top: 66, height: 19, ...layout }}
        />
    );
};

/** Named region `prize_template` of Main_100Layout - configured through the parent's `prizeTemplate` prop. */
export interface Main_100LayoutPrizeTemplateProps {
    clickRegion?: Main_100LayoutClickRegionProps;
    connector?: Main_100LayoutConnectorProps;
    layout?: BoxLayout;
    srcClaimedIcon?: string;
    srcLockedIcon?: string;
}

export const Main_100LayoutPrizeTemplate = ({ clickRegion, connector, layout, srcClaimedIcon, srcLockedIcon }: Main_100LayoutPrizeTemplateProps) => {
    return (
        <Region
            name="prize_template"
            layout={{ position: 'absolute', left: 9, width: 80, top: 4, height: 105, ...layout }}
        >
            <Main_100LayoutClickRegion {...clickRegion} />
            <Main_100LayoutConnector {...connector} />
            <ThemeImage
                name="locked_icon"
                src={srcLockedIcon ?? layoutImage('reward_track_locked_reward.png')}
                layout={{ position: 'absolute', left: 53, width: 18, top: 54, height: 22 }}
            />
            <ThemeImage
                name="claimed_icon"
                src={srcClaimedIcon ?? layoutImage('reward_track_checkmark.png')}
                layout={{ position: 'absolute', left: 54, width: 17, top: 4, height: 15 }}
            />
        </Region>
    );
};

/** Named region `click_region` of Main_100Layout - configured through the parent's `clickRegion` prop. */
export interface Main_100LayoutClickRegion2Props {
    layout?: BoxLayout;
    onClickRegion?: () => void;
}

export const Main_100LayoutClickRegion2 = ({ layout, onClickRegion }: Main_100LayoutClickRegion2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="click_region"
            tooltip={t('reward_track.rewards.reward_tooltip.premium')}
            dynamicStyle="reward_track_item"
            onPointerTap={onClickRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 12, width: 56, top: 34, height: 60, ...layout }}
        >
            <Border
                variant="1"
                name="shadow"
                blend={0.25}
                layout={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 16 }}
            />
            <Border
                variant="16"
                name="border"
                tintColor="#f1def7"
                layout={{ position: 'absolute', left: 0, right: 0, top: 2, bottom: 2, justifyContent: 'center' }}
            >
                <WidgetSlot
                    widgetType="product_icon"
                    name="product_icon"
                    layout={{ position: 'absolute', width: 40, alignSelf: 'center', height: 40 }}
                />
                <Shape
                    name="quantity_container"
                    shape="round_rectangle"
                    color="#f1def7"
                    strokeColor="#000000"
                    strokeThickness={1}
                    radius={5}
                    layout={{ position: 'absolute', width: 20, bottom: 5, height: 14 }}
                />
            </Border>
        </Region>
    );
};

/** Named region `connector` of Main_100Layout - configured through the parent's `connector` prop. */
export interface Main_100LayoutConnector2Props {
    layout?: BoxLayout;
}

export const Main_100LayoutConnector2 = ({ layout }: Main_100LayoutConnector2Props) => {
    return (
        <Region
            name="connector"
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 39, width: 2, bottom: 66, height: 19, ...layout }}
        />
    );
};

/** Named region `prize_template_premium` of Main_100Layout - configured through the parent's `prizeTemplatePremium` prop. */
export interface Main_100LayoutPrizeTemplatePremiumProps {
    clickRegion?: Main_100LayoutClickRegion2Props;
    connector?: Main_100LayoutConnector2Props;
    layout?: BoxLayout;
    srcClaimedIcon?: string;
    srcLockedIcon?: string;
}

export const Main_100LayoutPrizeTemplatePremium = ({ clickRegion, connector, layout, srcClaimedIcon, srcLockedIcon }: Main_100LayoutPrizeTemplatePremiumProps) => {
    return (
        <Region
            name="prize_template_premium"
            layout={{ position: 'absolute', left: 9, width: 80, top: 89, height: 104, ...layout }}
        >
            <Main_100LayoutClickRegion2 {...clickRegion} />
            <Main_100LayoutConnector2 {...connector} />
            <ThemeImage
                name="locked_icon"
                src={srcLockedIcon ?? layoutImage('reward_track_locked_reward.png')}
                layout={{ position: 'absolute', left: 53, width: 18, top: 78, height: 22 }}
            />
            <ThemeImage
                name="claimed_icon"
                src={srcClaimedIcon ?? layoutImage('reward_track_checkmark.png')}
                layout={{ position: 'absolute', left: 54, width: 17, top: 28, height: 15 }}
            />
        </Region>
    );
};

/** Named region `prize_content` of Main_100Layout - configured through the parent's `prizeContent` prop. */
export interface Main_100LayoutPrizeContentProps {
    layout?: BoxLayout;
    prizeTemplate?: Main_100LayoutPrizeTemplateProps;
    prizeTemplatePremium?: Main_100LayoutPrizeTemplatePremiumProps;
}

export const Main_100LayoutPrizeContent = ({ layout, prizeTemplate, prizeTemplatePremium }: Main_100LayoutPrizeContentProps) => {
    return (
        <Region
            name="prize_content"
            layout={{ position: 'absolute', left: 196, right: 53, top: 2, bottom: 2, ...layout }}
        >
            <Main_100LayoutPrizeTemplate {...prizeTemplate} />
            <Main_100LayoutPrizeTemplatePremium {...prizeTemplatePremium} />
        </Region>
    );
};

/** Named region `cut` of Main_100Layout - configured through the parent's `cut` prop. */
export interface Main_100LayoutCutProps {
    layout?: BoxLayout;
}

export const Main_100LayoutCut = ({ layout }: Main_100LayoutCutProps) => {
    return (
        <Region
            name="cut"
            layout={{ position: 'absolute', left: 0, right: 2, top: 0, bottom: 0, ...layout }}
        >
            <Border
                variant="15"
                name="free_tier_cont"
                tintColor="#f9efe0"
                blend={0.5}
                layout={{ position: 'absolute', left: 0, right: -5, top: 0, bottom: 0 }}
            />
        </Region>
    );
};

/** Named region `splitter` of Main_100Layout - configured through the parent's `splitter` prop. */
export interface Main_100LayoutSplitterProps {
    layout?: BoxLayout;
}

export const Main_100LayoutSplitter = ({ layout }: Main_100LayoutSplitterProps) => {
    return (
        <Region
            name="splitter"
            layout={{ position: 'absolute', right: 0, width: 2, top: 0, height: 80, ...layout }}
        >
            <Border
                variant="15"
                name="bg"
                tintColor="#f9efe0"
                blend={0.5}
                layout={{ position: 'absolute', left: -18, width: 20, top: -6, bottom: -5 }}
            />
        </Region>
    );
};

/** Named region `information` of Main_100Layout - configured through the parent's `information` prop. */
export interface Main_100LayoutInformationProps {
    captionDesc?: string;
    captionTitle?: string;
    cut?: Main_100LayoutCutProps;
    layout?: BoxLayout;
    splitter?: Main_100LayoutSplitterProps;
}

export const Main_100LayoutInformation = ({ captionDesc, captionTitle, cut, layout, splitter }: Main_100LayoutInformationProps) => {
    const t = useTranslation();

    return (
        <Region
            name="information"
            layout={{ position: 'absolute', left: 0, width: 100, top: 0, bottom: 0, ...layout }}
        >
            <Main_100LayoutCut {...cut} />
            <Main_100LayoutSplitter {...splitter} />
            <Region layout={{ position: 'absolute', left: 0, width: 100, bottom: 2, height: 21, flexDirection: 'column' }}>
                <Region
                    name="title"
                    layout={{ width: 90, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionTitle ?? t('reward_track.rewards.free')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 90, align: 'center' }}
                    />
                </Region>
                <Region
                    name="desc"
                    layout={{ width: 90, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionDesc ?? ''}
                        textOptions={{ wordWrap: true, wordWrapWidth: 90, align: 'center' }}
                    />
                </Region>
            </Region>
            <ThemeImage
                src={layoutImage('reward_track_free_track.png')}
                layout={{ position: 'absolute', left: 26, width: 49, top: 9, height: 48 }}
            />
        </Region>
    );
};

/** Named region `cut` of Main_100Layout - configured through the parent's `cut` prop. */
export interface Main_100LayoutCut2Props {
    layout?: BoxLayout;
}

export const Main_100LayoutCut2 = ({ layout }: Main_100LayoutCut2Props) => {
    return (
        <Region
            name="cut"
            layout={{ position: 'absolute', left: 0, right: 2, top: 0, bottom: 0, ...layout }}
        >
            <Border
                variant="15"
                name="free_tier_cont"
                tintColor="#f1def7"
                blend={0.5}
                layout={{ position: 'absolute', left: 0, right: -5, top: 0, bottom: 0 }}
            />
        </Region>
    );
};

/** Named region `splitter` of Main_100Layout - configured through the parent's `splitter` prop. */
export interface Main_100LayoutSplitter2Props {
    layout?: BoxLayout;
}

export const Main_100LayoutSplitter2 = ({ layout }: Main_100LayoutSplitter2Props) => {
    return (
        <Region
            name="splitter"
            layout={{ position: 'absolute', right: 0, width: 2, top: 0, height: 80, ...layout }}
        >
            <Border
                variant="15"
                name="bg"
                tintColor="#f1def7"
                blend={0.5}
                layout={{ position: 'absolute', left: -18, width: 20, top: -6, bottom: -5 }}
            />
        </Region>
    );
};

/** Named region `information` of Main_100Layout - configured through the parent's `information` prop. */
export interface Main_100LayoutInformation2Props {
    captionDesc?: string;
    captionTitle?: string;
    cut?: Main_100LayoutCut2Props;
    layout?: BoxLayout;
    splitter?: Main_100LayoutSplitter2Props;
}

export const Main_100LayoutInformation2 = ({ captionDesc, captionTitle, cut, layout, splitter }: Main_100LayoutInformation2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="information"
            layout={{ position: 'absolute', left: 0, width: 100, top: 0, bottom: 0, ...layout }}
        >
            <Main_100LayoutCut2 {...cut} />
            <Main_100LayoutSplitter2 {...splitter} />
            <Region layout={{ position: 'absolute', left: 0, width: 100, bottom: 3, height: 30, flexDirection: 'column', gap: -3 }}>
                <Region
                    name="title"
                    layout={{ width: 90, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionTitle ?? t('reward_track.rewards.premium')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 90, align: 'center' }}
                    />
                </Region>
                <Region
                    name="desc"
                    layout={{ width: 90, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionDesc ?? t('reward_track.rewards.premium.info')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 90, align: 'center' }}
                    />
                </Region>
            </Region>
        </Region>
    );
};

/** Named region `previous_btn` of Main_100Layout - configured through the parent's `previousBtn` prop. */
export interface Main_100LayoutPreviousBtnProps {
    layout?: BoxLayout;
    onPreviousBtn?: () => void;
}

export const Main_100LayoutPreviousBtn = ({ layout, onPreviousBtn }: Main_100LayoutPreviousBtnProps) => {
    return (
        <Region
            name="previous_btn"
            dynamicStyle="button"
            onPointerTap={onPreviousBtn}
            cursor="pointer"
            layout={{ position: 'absolute', left: 54, width: 33, top: 84, height: 34, ...layout }}
        >
            <ThemeImage
                src={layoutImage('icons_back.png')}
                layout={{ position: 'absolute', left: 0, width: 33, top: 0, height: 34 }}
            />
        </Region>
    );
};

/** Named region `next_btn` of Main_100Layout - configured through the parent's `nextBtn` prop. */
export interface Main_100LayoutNextBtnProps {
    layout?: BoxLayout;
    onNextBtn?: () => void;
}

export const Main_100LayoutNextBtn = ({ layout, onNextBtn }: Main_100LayoutNextBtnProps) => {
    return (
        <Region
            name="next_btn"
            dynamicStyle="button"
            onPointerTap={onNextBtn}
            cursor="pointer"
            layout={{ position: 'absolute', left: 805, width: 33, top: 84, height: 34, ...layout }}
        >
            <ThemeImage
                src={layoutImage('icons_forward.png')}
                layout={{ position: 'absolute', left: 0, width: 33, top: 0, height: 34 }}
            />
        </Region>
    );
};

/** Named region `header` of Main_100Layout - configured through the parent's `header` prop. */
export interface Main_100LayoutHeaderProps {
    captionNextUnclaimedCount?: string;
    captionPreviousUnclaimedCount?: string;
    cutout?: Main_100LayoutCutoutProps;
    information?: Main_100LayoutInformationProps;
    information2?: Main_100LayoutInformation2Props;
    layout?: BoxLayout;
    nextBtn?: Main_100LayoutNextBtnProps;
    pointsIndicatorContainer?: Main_100LayoutPointsIndicatorContainerProps;
    previousBtn?: Main_100LayoutPreviousBtnProps;
    prizeContent?: Main_100LayoutPrizeContentProps;
    recolorDark?: string;
    recolorLight?: string;
    track?: Main_100LayoutTrackProps;
    visibleNextUnclaimedIndicator?: boolean;
    visiblePreviousUnclaimedIndicator?: boolean;
}

export const Main_100LayoutHeader = ({ captionNextUnclaimedCount, captionPreviousUnclaimedCount, cutout, information, information2, layout, nextBtn, pointsIndicatorContainer, previousBtn, prizeContent, recolorDark, recolorLight, track, visibleNextUnclaimedIndicator, visiblePreviousUnclaimedIndicator }: Main_100LayoutHeaderProps) => {
    return (
        <Region
            name="header"
            layout={{ position: 'absolute', left: 0, right: 24, top: 0, height: 243, ...layout }}
        >
            <Main_100LayoutCutout {...cutout} />
            <Border
                variant="15"
                name="rewards"
                tintColor={recolorLight ?? '#ddebf9'}
                layout={{ position: 'absolute', left: 232, right: 0, top: 0, bottom: 0 }}
            >
                <ThemeImage
                    src={layoutImage('reward_track_prizes_background.png')}
                    tint={recolorDark ?? '#3576b9'}
                    layout={{ position: 'absolute', left: 2, right: 2, top: -2, height: 243 }}
                />
                <Region layout={{ position: 'absolute', left: 2, right: 2, top: 2, bottom: 2 }} />
                <ThemeImage
                    src={layoutImage('reward_track_prizes_background_stars.png')}
                    layout={{ position: 'absolute', left: 1, right: 1, top: 0, height: 243 }}
                />
                <Main_100LayoutTrack {...track} />
                <Main_100LayoutPointsIndicatorContainer {...pointsIndicatorContainer} />
                <Main_100LayoutPrizeContent {...prizeContent} />
                <Border
                    variant="15"
                    name="free_tier_cont"
                    tintColor="#f9efe0"
                    blend={0.5}
                    layout={{ position: 'absolute', left: 96, width: 700, top: 6, height: 80 }}
                >
                    <Main_100LayoutInformation {...information} />
                </Border>
                <Border
                    variant="15"
                    name="premium_tier_cont"
                    tintColor="#f1def7"
                    blend={0.5}
                    layout={{ position: 'absolute', left: 96, width: 700, top: 115, height: 80 }}
                >
                    <Main_100LayoutInformation2 {...information2} />
                    <ThemeImage
                        src={layoutImage('reward_track_premium_track.png')}
                        layout={{ position: 'absolute', left: 24, width: 58, top: 4, height: 45 }}
                    />
                </Border>
                <Main_100LayoutPreviousBtn {...previousBtn} />
                <Main_100LayoutNextBtn {...nextBtn} />
                <Region
                    visible={visiblePreviousUnclaimedIndicator ?? false}
                    layout={{ position: 'absolute', right: 756, width: 17, top: 77, height: 18 }}
                >
                    <Border
                        variant="7"
                        name="previous_unclaimed_indicator"
                        tintColor="#ee2924"
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <Region
                            name="previous_unclaimed_count"
                            layout={{ position: 'absolute', left: 3, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionPreviousUnclaimedCount ?? '2'}
                                textStyle="text-style-il-regular-white"
                            />
                        </Region>
                    </Border>
                </Region>
                <Region
                    visible={visibleNextUnclaimedIndicator ?? false}
                    layout={{ position: 'absolute', right: 3, width: 17, top: 77, height: 18 }}
                >
                    <Border
                        variant="7"
                        name="next_unclaimed_indicator"
                        tintColor="#ee2924"
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <Region
                            name="next_unclaimed_count"
                            layout={{ position: 'absolute', left: 3, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionNextUnclaimedCount ?? '2'}
                                textStyle="text-style-il-regular-white"
                            />
                        </Region>
                    </Border>
                </Region>
            </Border>
        </Region>
    );
};

/** Row template `tab_button_template` of Main_100Layout - pass real rows through its `items…` slot. */
export interface Main_100LayoutTabButtonTemplateItemProps {
    captionButtonText?: string;
    layout?: BoxLayout;
    onSelectedView?: () => void;
    onTabButtonTemplate?: () => void;
    recolorDark?: string;
}

export const Main_100LayoutTabButtonTemplateItem = ({ captionButtonText, layout, onSelectedView, onTabButtonTemplate, recolorDark }: Main_100LayoutTabButtonTemplateItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="tab_button_template"
            onPointerTap={onTabButtonTemplate}
            cursor="pointer"
            layout={{ width: 88, height: 29, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <Button
                variant="3"
                name="selected_view"
                tintColor={recolorDark ?? '#3576b9'}
                onPointerTap={onSelectedView}
                textStyle="text-style-button-shiny-regular"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 29 }}
            />
            <Shape
                name="notselected_shape"
                visible={false}
                shape="round_rectangle"
                color="#dddcdc"
                strokeColor="#b7b7b7"
                strokeThickness={2}
                radius={4}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 29 }}
            />
            <Region
                name="button_text"
                layout={{ position: 'absolute', width: 78, top: 5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionButtonText ?? t('reward_track.tasks.tab.all_tasks')}
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `tab_button_template` of Main_100Layout - pass real rows through its `items…` slot. */
export interface Main_100LayoutTabButtonTemplateItem2Props {
    captionButtonText?: string;
    layout?: BoxLayout;
    onSelectedView?: () => void;
    onTabButtonTemplate?: () => void;
    recolorDark?: string;
    visibleSelectedView?: boolean;
}

export const Main_100LayoutTabButtonTemplateItem2 = ({ captionButtonText, layout, onSelectedView, onTabButtonTemplate, recolorDark, visibleSelectedView }: Main_100LayoutTabButtonTemplateItem2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="tab_button_template"
            onPointerTap={onTabButtonTemplate}
            cursor="pointer"
            layout={{ width: 88, height: 29, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <Region
                visible={visibleSelectedView ?? false}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 29 }}
            >
                <Button
                    variant="3"
                    name="selected_view"
                    tintColor={recolorDark ?? '#3576b9'}
                    onPointerTap={onSelectedView}
                    textStyle="text-style-button-shiny-regular"
                    layout={{ width: '100%', height: '100%' }}
                />
            </Region>
            <Shape
                name="notselected_shape"
                shape="round_rectangle"
                color="#dddcdc"
                strokeColor="#b7b7b7"
                strokeThickness={2}
                radius={4}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 29 }}
            />
            <Region
                name="button_text"
                layout={{ position: 'absolute', width: 78, top: 6, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionButtonText ?? t('reward_track.tasks.tab.in_progress')}
                    textOptions={{ fill: '#444444', align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `tab_button_template` of Main_100Layout - pass real rows through its `items…` slot. */
export interface Main_100LayoutTabButtonTemplateItem3Props {
    captionButtonText?: string;
    layout?: BoxLayout;
    onSelectedView?: () => void;
    onTabButtonTemplate?: () => void;
    recolorDark?: string;
    visibleSelectedView?: boolean;
}

export const Main_100LayoutTabButtonTemplateItem3 = ({ captionButtonText, layout, onSelectedView, onTabButtonTemplate, recolorDark, visibleSelectedView }: Main_100LayoutTabButtonTemplateItem3Props) => {
    const t = useTranslation();

    return (
        <Region
            name="tab_button_template"
            onPointerTap={onTabButtonTemplate}
            cursor="pointer"
            layout={{ width: 88, height: 29, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <Region
                visible={visibleSelectedView ?? false}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 29 }}
            >
                <Button
                    variant="3"
                    name="selected_view"
                    tintColor={recolorDark ?? '#3576b9'}
                    onPointerTap={onSelectedView}
                    textStyle="text-style-button-shiny-regular"
                    layout={{ width: '100%', height: '100%' }}
                />
            </Region>
            <Shape
                name="notselected_shape"
                shape="round_rectangle"
                color="#dddcdc"
                strokeColor="#b7b7b7"
                strokeThickness={2}
                radius={4}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 29 }}
            />
            <Region
                name="button_text"
                layout={{ position: 'absolute', width: 78, top: 6, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionButtonText ?? t('reward_track.tasks.tab.completed')}
                    textOptions={{ fill: '#444444', align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `tab_selection` of Main_100Layout - configured through the parent's `tabSelection` prop. */
export interface Main_100LayoutTabSelectionProps {
    itemsTabSelection?: ReactNode;
    layout?: BoxLayout;
}

export const Main_100LayoutTabSelection = ({ itemsTabSelection, layout }: Main_100LayoutTabSelectionProps) => {
    return (
        <Region
            name="tab_selection"
            layout={{ position: 'absolute', left: 14, width: 278, top: 58, height: 30, flexDirection: 'row', gap: 7, ...layout }}
        >
            {itemsTabSelection ?? (
                <>
                    <Main_100LayoutTabButtonTemplateItem />
                    <Main_100LayoutTabButtonTemplateItem2 />
                    <Main_100LayoutTabButtonTemplateItem3 />
                </>
            )}
        </Region>
    );
};

/** Named region `header` of Main_100Layout - configured through the parent's `header` prop. */
export interface Main_100LayoutHeader2Props {
    captionTasksCompletionTxt?: string;
    layout?: BoxLayout;
    tabSelection?: Main_100LayoutTabSelectionProps;
}

export const Main_100LayoutHeader2 = ({ captionTasksCompletionTxt, layout, tabSelection }: Main_100LayoutHeader2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="header"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 95, ...layout }}
        >
            <ThemeImage
                src={layoutImage('reward_track_task_list.png')}
                layout={{ position: 'absolute', left: 19, width: 19, top: 17, height: 25 }}
            />
            <Region layout={{ position: 'absolute', left: 46, width: 83, top: 11, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text={t('reward_track.tasks')} />
            </Region>
            <Region
                name="tasks_completion_txt"
                layout={{ position: 'absolute', left: 46, width: 186, top: 31, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTasksCompletionTxt ?? t('reward_track.tasks.progress')}
                    textOptions={{ fill: '#3c3c3c' }}
                />
            </Region>
            <Main_100LayoutTabSelection {...tabSelection} />
        </Region>
    );
};

/** Named region `gradient` of Main_100Layout - configured through the parent's `gradient` prop. */
export interface Main_100LayoutGradientProps {
    layout?: BoxLayout;
}

export const Main_100LayoutGradient = ({ layout }: Main_100LayoutGradientProps) => {
    return (
        <Region
            name="gradient"
            blendMode="add"
            layout={{ position: 'absolute', left: 1, right: 1, top: 1, height: 5, ...layout }}
        />
    );
};

/** Named region `progress` of Main_100Layout - configured through the parent's `progress` prop. */
export interface Main_100LayoutProgress2Props {
    gradient?: Main_100LayoutGradientProps;
    layout?: BoxLayout;
}

export const Main_100LayoutProgress2 = ({ gradient, layout }: Main_100LayoutProgress2Props) => {
    return (
        <Region
            name="progress"
            layout={{ position: 'absolute', left: 0, width: 140, top: 0, height: 7, ...layout }}
        >
            <Shape
                name="loading_bar"
                shape="round_rectangle"
                color="#eba60c"
                strokeThickness={1}
                radius={5}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 7 }}
            />
            <Main_100LayoutGradient {...gradient} />
        </Region>
    );
};

/** Named region `loading_bar` of Main_100Layout - configured through the parent's `loadingBar` prop. */
export interface Main_100LayoutLoadingBar3Props {
    layout?: BoxLayout;
    progress?: Main_100LayoutProgress2Props;
}

export const Main_100LayoutLoadingBar3 = ({ layout, progress }: Main_100LayoutLoadingBar3Props) => {
    return (
        <Region
            name="loading_bar"
            layout={{ position: 'absolute', left: 68, width: 200, top: 44, height: 7, ...layout }}
        >
            <Shape
                name="bg"
                shape="round_rectangle"
                color="#cccccc"
                strokeColor="#777777"
                strokeThickness={1}
                radius={5}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 7 }}
            />
            <Main_100LayoutProgress2 {...progress} />
        </Region>
    );
};

/** Row template `task_template` of Main_100Layout - pass real rows through its `items…` slot. */
export interface Main_100LayoutTaskTemplateItemProps {
    captionTaskDescription?: string;
    captionTaskName?: string;
    captionTaskProgressTxt?: string;
    captionTrackRewardTxt?: string;
    layout?: BoxLayout;
    loadingBar?: Main_100LayoutLoadingBar3Props;
    onTaskTemplate?: () => void;
    srcTaskImage?: string;
    srcTrackRewardIcon?: string;
}

export const Main_100LayoutTaskTemplateItem = ({ captionTaskDescription, captionTaskName, captionTaskProgressTxt, captionTrackRewardTxt, layout, loadingBar, onTaskTemplate, srcTaskImage, srcTrackRewardIcon }: Main_100LayoutTaskTemplateItemProps) => {
    return (
        <Region
            name="task_template"
            onPointerTap={onTaskTemplate}
            cursor="pointer"
            layout={{ width: 406, height: 61, flexShrink: 0, ...layout }}
        >
            <Border
                variant="15"
                name="task_border"
                tintColor="#f0f0f0"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Region
                    name="task_name"
                    layout={{ position: 'absolute', left: 67, width: 202, top: 7, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionTaskName ?? 'Visit Rooms'} />
                </Region>
                <Region
                    name="task_description"
                    layout={{ position: 'absolute', left: 67, width: 202, top: 23, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionTaskDescription ?? 'Explore rooms made by other players'} />
                </Region>
                <Main_100LayoutLoadingBar3 {...loadingBar} />
                <Region
                    name="task_progress_txt"
                    layout={{ position: 'absolute', left: 280, width: 25, top: 38, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionTaskProgressTxt ?? '3 / 5'} />
                </Region>
                <Border
                    variant="15"
                    tintColor="#f0f0f0"
                    layout={{ position: 'absolute', right: 13, width: 62, top: 15, height: 31 }}
                >
                    <Region layout={{ position: 'absolute', left: 8, width: 44, top: 4, height: 23, flexDirection: 'row', gap: 5 }}>
                        <Region
                            name="track_reward_txt"
                            layout={{ width: 20, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={captionTrackRewardTxt ?? '30'} />
                        </Region>
                        <ThemeImage
                            name="track_reward_icon"
                            src={srcTrackRewardIcon ?? layoutImage('reward_track_point_small.png')}
                            layout={{ width: 19, height: 14, flexShrink: 0 }}
                        />
                    </Region>
                </Border>
                <ThemeImage
                    name="task_image"
                    src={srcTaskImage ?? layoutImage('reward_track_tasks_dance.png')}
                    layout={{ position: 'absolute', left: 9, width: 52, top: 6, height: 50 }}
                />
            </Border>
        </Region>
    );
};

/** Named region `tasks` of Main_100Layout - configured through the parent's `tasks` prop. */
export interface Main_100LayoutTasksProps {
    itemsTasks?: ReactNode;
    layout?: BoxLayout;
}

export const Main_100LayoutTasks = ({ itemsTasks, layout }: Main_100LayoutTasksProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 14, width: 422, top: 94, bottom: 65, ...layout }}
        >
            <Region
                name="tasks"
                layout={{ flexDirection: 'column', gap: 5, width: '100%' }}
            >
                {itemsTasks ?? (
                    <Main_100LayoutTaskTemplateItem />
                )}
                <Border
                    variant="15"
                    tintColor="#f0f0f0"
                    layout={{ width: 406, height: 61, flexShrink: 0 }}
                />
                <Border
                    variant="15"
                    tintColor="#f0f0f0"
                    layout={{ width: 406, height: 61, flexShrink: 0 }}
                />
                <Border
                    variant="15"
                    tintColor="#f0f0f0"
                    layout={{ width: 406, height: 61, flexShrink: 0 }}
                />
                <Border
                    variant="15"
                    tintColor="#f0f0f0"
                    layout={{ width: 406, height: 57, flexShrink: 0 }}
                />
            </Region>
        </ScrollArea>
    );
};

/** Named region `task_info_name_region` of Main_100Layout - configured through the parent's `taskInfoNameRegion` prop. */
export interface Main_100LayoutTaskInfoNameRegionProps {
    captionTaskInfoName?: string;
    layout?: BoxLayout;
    onTaskInfoNameRegion?: () => void;
}

export const Main_100LayoutTaskInfoNameRegion = ({ captionTaskInfoName, layout, onTaskInfoNameRegion }: Main_100LayoutTaskInfoNameRegionProps) => {
    return (
        <Region
            name="task_info_name_region"
            onPointerTap={onTaskInfoNameRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 137, width: 100, top: 35, height: 22, ...layout }}
        >
            <Region
                name="task_info_name"
                layout={{ position: 'absolute', left: 0, top: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionTaskInfoName ?? 'Visit Rooms'} />
            </Region>
        </Region>
    );
};

/** Named region `task_info_header` of Main_100Layout - configured through the parent's `taskInfoHeader` prop. */
export interface Main_100LayoutTaskInfoHeaderProps {
    captionTaskInfoDescription?: string;
    layout?: BoxLayout;
    srcTaskInfoImg?: string;
    taskInfoNameRegion?: Main_100LayoutTaskInfoNameRegionProps;
}

export const Main_100LayoutTaskInfoHeader = ({ captionTaskInfoDescription, layout, srcTaskInfoImg, taskInfoNameRegion }: Main_100LayoutTaskInfoHeaderProps) => {
    return (
        <Region
            name="task_info_header"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 128, ...layout }}
        >
            <ThemeImage
                name="task_info_img"
                src={srcTaskInfoImg ?? layoutImage('reward_track_tasks_dance.png')}
                layout={{ position: 'absolute', left: 23, width: 104, top: 23, height: 100 }}
            />
            <Main_100LayoutTaskInfoNameRegion {...taskInfoNameRegion} />
            <Region
                name="task_info_description"
                layout={{ position: 'absolute', left: 137, right: 22, top: 59, height: 63, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTaskInfoDescription ?? 'Explore the hotel and visit rooms created by other players!'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 469 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `spacer` of Main_100Layout - configured through the parent's `spacer` prop. */
export interface Main_100LayoutSpacerProps {
    layout?: BoxLayout;
}

export const Main_100LayoutSpacer = ({ layout }: Main_100LayoutSpacerProps) => {
    return (
        <Region
            name="spacer"
            backgroundColor="#d6d5d3"
            layout={{ position: 'absolute', left: 22, width: 582, top: 20, height: 2, ...layout }}
        />
    );
};

/** Named region `levels_title_bg` of Main_100Layout - configured through the parent's `levelsTitleBg` prop. */
export interface Main_100LayoutLevelsTitleBgProps {
    layout?: BoxLayout;
}

export const Main_100LayoutLevelsTitleBg = ({ layout }: Main_100LayoutLevelsTitleBgProps) => {
    const t = useTranslation();

    return (
        <Region
            name="levels_title_bg"
            backgroundColor="#f0f0f0"
            layout={{ position: 'absolute', left: 37, width: 53, top: 7, height: 18, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 3, top: 0, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('reward_track.levels.title')}
                    textOptions={{ fill: '#124b8b' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `gradient` of Main_100Layout - configured through the parent's `gradient` prop. */
export interface Main_100LayoutGradient2Props {
    layout?: BoxLayout;
}

export const Main_100LayoutGradient2 = ({ layout }: Main_100LayoutGradient2Props) => {
    return (
        <Region
            name="gradient"
            blendMode="add"
            layout={{ position: 'absolute', left: 1, right: 1, top: 1, height: 5, ...layout }}
        />
    );
};

/** Named region `progress` of Main_100Layout - configured through the parent's `progress` prop. */
export interface Main_100LayoutProgress3Props {
    gradient?: Main_100LayoutGradient2Props;
    layout?: BoxLayout;
}

export const Main_100LayoutProgress3 = ({ gradient, layout }: Main_100LayoutProgress3Props) => {
    return (
        <Region
            name="progress"
            layout={{ position: 'absolute', left: 0, width: 140, top: 0, height: 7, ...layout }}
        >
            <Shape
                name="loading_bar"
                shape="round_rectangle"
                color="#eba60c"
                strokeThickness={1}
                radius={5}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 7 }}
            />
            <Main_100LayoutGradient2 {...gradient} />
        </Region>
    );
};

/** Named region `loading_bar` of Main_100Layout - configured through the parent's `loadingBar` prop. */
export interface Main_100LayoutLoadingBar4Props {
    layout?: BoxLayout;
    progress?: Main_100LayoutProgress3Props;
}

export const Main_100LayoutLoadingBar4 = ({ layout, progress }: Main_100LayoutLoadingBar4Props) => {
    return (
        <Region
            name="loading_bar"
            layout={{ position: 'absolute', left: 94, width: 260, top: 19, height: 7, ...layout }}
        >
            <Shape
                name="bg"
                shape="round_rectangle"
                color="#cccccc"
                strokeColor="#777777"
                strokeThickness={1}
                radius={5}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 7 }}
            />
            <Main_100LayoutProgress3 {...progress} />
        </Region>
    );
};

/** Row template `level_reward_txt` of Main_100Layout - pass real rows through its `items…` slot. */
export interface Main_100LayoutLevelRewardTxtItemProps {
    captionLevelRewardTxt?: string;
    layout?: BoxLayout;
}

export const Main_100LayoutLevelRewardTxtItem = ({ captionLevelRewardTxt, layout }: Main_100LayoutLevelRewardTxtItemProps) => {
    return (
        <Region
            name="level_reward_txt"
            layout={{ width: 20, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionLevelRewardTxt ?? '30'} />
        </Region>
    );
};

/** Row template `level_reward_icon` of Main_100Layout - pass real rows through its `items…` slot. */
export interface Main_100LayoutLevelRewardIconItemProps {
    layout?: BoxLayout;
    srcLevelRewardIcon?: string;
}

export const Main_100LayoutLevelRewardIconItem = ({ layout, srcLevelRewardIcon }: Main_100LayoutLevelRewardIconItemProps) => {
    return (
        <ThemeImage
            name="level_reward_icon"
            src={srcLevelRewardIcon ?? layoutImage('reward_track_point_small.png')}
            layout={{ width: 19, height: 14, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `reward_container` of Main_100Layout - configured through the parent's `rewardContainer` prop. */
export interface Main_100LayoutRewardContainerProps {
    itemsRewardContainer?: ReactNode;
    layout?: BoxLayout;
}

export const Main_100LayoutRewardContainer = ({ itemsRewardContainer, layout }: Main_100LayoutRewardContainerProps) => {
    return (
        <Region
            name="reward_container"
            layout={{ width: 44, height: 23, flexShrink: 0, flexDirection: 'row', gap: 5, ...layout }}
        >
            {itemsRewardContainer ?? (
                <>
                    <Main_100LayoutLevelRewardTxtItem />
                    <Main_100LayoutLevelRewardIconItem />
                </>
            )}
        </Region>
    );
};

/** Row template `level_template` of Main_100Layout - pass real rows through its `items…` slot. */
export interface Main_100LayoutLevelTemplateItemProps {
    captionLevelName?: string;
    captionLevelProgressTxt?: string;
    layout?: BoxLayout;
    loadingBar?: Main_100LayoutLoadingBar4Props;
    onLevelTemplate?: () => void;
    rewardContainer?: Main_100LayoutRewardContainerProps;
    srcCompletedIcon?: string;
    srcLockedIcon?: string;
}

export const Main_100LayoutLevelTemplateItem = ({ captionLevelName, captionLevelProgressTxt, layout, loadingBar, onLevelTemplate, rewardContainer, srcCompletedIcon, srcLockedIcon }: Main_100LayoutLevelTemplateItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="level_template"
            onPointerTap={onLevelTemplate}
            cursor="pointer"
            layout={{ width: 582, height: 44, flexShrink: 0, ...layout }}
        >
            <Border
                variant="15"
                name="level_border"
                tintColor="#e3e3e3"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Region
                    name="level_name"
                    layout={{ position: 'absolute', left: 18, width: 85, top: 14, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionLevelName ?? t('reward_track.levels.level')} />
                </Region>
                <Main_100LayoutLoadingBar4 {...loadingBar} />
                <Region
                    name="level_progress_txt"
                    layout={{ position: 'absolute', left: 377, width: 25, top: 14, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionLevelProgressTxt ?? '3 / 5'} />
                </Region>
                <Region layout={{ position: 'absolute', right: 18, width: 94, top: 7, height: 30, flexDirection: 'row', gap: 10 }}>
                    <ThemeImage
                        name="completed_icon"
                        src={srcCompletedIcon ?? layoutImage('reward_track_checkmark.png')}
                        layout={{ width: 17, height: 15, flexShrink: 0 }}
                    />
                    <ThemeImage
                        name="locked_icon"
                        src={srcLockedIcon ?? layoutImage('reward_track_locked_small.png')}
                        layout={{ width: 13, height: 18, flexShrink: 0 }}
                    />
                    <Main_100LayoutRewardContainer {...rewardContainer} />
                </Region>
            </Border>
        </Region>
    );
};

/** Named region `levels` of Main_100Layout - configured through the parent's `levels` prop. */
export interface Main_100LayoutLevelsProps {
    itemsLevels?: ReactNode;
    layout?: BoxLayout;
}

export const Main_100LayoutLevels = ({ itemsLevels, layout }: Main_100LayoutLevelsProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 22, width: 598, top: 35, height: 150, ...layout }}
        >
            <Region
                name="levels"
                layout={{ flexDirection: 'column', gap: 9, width: '100%' }}
            >
                {itemsLevels ?? (
                    <Main_100LayoutLevelTemplateItem />
                )}
                <Border
                    variant="15"
                    tintColor="#bdd6ef"
                    layout={{ width: 582, height: 44, flexShrink: 0 }}
                />
                <Border
                    variant="15"
                    tintColor="#e3e3e3"
                    layout={{ width: 582, height: 44, flexShrink: 0 }}
                />
                <Border
                    variant="15"
                    tintColor="#f0f0f0"
                    layout={{ width: 582, height: 46, flexShrink: 0 }}
                />
            </Region>
        </ScrollArea>
    );
};

/** Named region `task_levels` of Main_100Layout - configured through the parent's `taskLevels` prop. */
export interface Main_100LayoutTaskLevelsProps {
    layout?: BoxLayout;
    levels?: Main_100LayoutLevelsProps;
    levelsTitleBg?: Main_100LayoutLevelsTitleBgProps;
    spacer?: Main_100LayoutSpacerProps;
}

export const Main_100LayoutTaskLevels = ({ layout, levels, levelsTitleBg, spacer }: Main_100LayoutTaskLevelsProps) => {
    return (
        <Region
            name="task_levels"
            layout={{ position: 'absolute', left: 0, right: 0, top: 127, height: 200, ...layout }}
        >
            <Main_100LayoutSpacer {...spacer} />
            <Main_100LayoutLevelsTitleBg {...levelsTitleBg} />
            <Main_100LayoutLevels {...levels} />
        </Region>
    );
};

/** Named region `body` of Main_100Layout - configured through the parent's `body` prop. */
export interface Main_100LayoutBodyProps {
    captionTaskHintText?: string;
    header?: Main_100LayoutHeader2Props;
    layout?: BoxLayout;
    onGetPremiumBtn?: () => void;
    onHintRedirectBtn?: () => void;
    taskInfoHeader?: Main_100LayoutTaskInfoHeaderProps;
    taskLevels?: Main_100LayoutTaskLevelsProps;
    tasks?: Main_100LayoutTasksProps;
}

export const Main_100LayoutBody = ({ captionTaskHintText, header, layout, onGetPremiumBtn, onHintRedirectBtn, taskInfoHeader, taskLevels, tasks }: Main_100LayoutBodyProps) => {
    const t = useTranslation();

    return (
        <Region
            name="body"
            layout={{ position: 'absolute', left: 0, right: 24, top: 249, bottom: 55, ...layout }}
        >
            <Border
                variant="15"
                name="task_list"
                tintColor="#f0f0f0"
                layout={{ position: 'absolute', left: 0, width: 444, top: 0, bottom: 0 }}
            >
                <Main_100LayoutHeader2 {...header} />
                <Main_100LayoutTasks {...tasks} />
                <Border
                    variant="15"
                    name="reward_info"
                    tintColor="#f5e1b9"
                    layout={{ position: 'absolute', left: 9, right: 9, bottom: 9, height: 48 }}
                >
                    <ThemeImage
                        src={layoutImage('reward_track_reward_gift.png')}
                        layout={{ position: 'absolute', left: 8, width: 41, top: 7, height: 36 }}
                    />
                    <Region layout={{ position: 'absolute', left: 57, width: 265, alignSelf: 'center', height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('reward_track.tasks.tip')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 265 }}
                        />
                    </Region>
                    <ThemeImage
                        src={layoutImage('reward_track_frank_and_piccolo.png')}
                        layout={{ position: 'absolute', left: 329, width: 88, top: 7, height: 39 }}
                    />
                </Border>
                <Border
                    variant="15"
                    name="reward_info_not_premium"
                    tintColor="#f1def7"
                    layout={{ position: 'absolute', left: 9, right: 9, bottom: 9, height: 48 }}
                >
                    <ThemeImage
                        src={layoutImage('reward_track_reward_gift_premium.png')}
                        layout={{ position: 'absolute', left: 8, width: 41, top: 7, height: 36 }}
                    />
                    <Region layout={{ position: 'absolute', left: 57, width: 227, alignSelf: 'center', height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('reward_track.tasks.tip_upgrade')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 227 }}
                        />
                    </Region>
                    <Button
                        variant="3"
                        name="get_premium_btn"
                        tintColor="#b265ce"
                        onPointerTap={onGetPremiumBtn}
                        textStyle="text-style-button-shiny-bold"
                        layout={{ position: 'absolute', right: 12, width: 91, top: 9, height: 30 }}
                    >
                        {t('reward_track.tasks.tip_upgrade.button')}
                    </Button>
                </Border>
            </Border>
            <Border
                variant="15"
                name="task_info"
                tintColor="#f0f0f0"
                layout={{ position: 'absolute', left: 451, right: 0, top: 0, bottom: 0 }}
            >
                <Main_100LayoutTaskInfoHeader {...taskInfoHeader} />
                <Main_100LayoutTaskLevels {...taskLevels} />
                <Border
                    variant="14"
                    name="task_hint_border"
                    tintColor="#e9e9e9"
                    layout={{ position: 'absolute', left: 16, width: 596, bottom: 13, height: 74 }}
                >
                    <Region layout={{ position: 'absolute', left: 76, width: 27, top: 10, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('reward_track.levels.tip')}
                            textOptions={{ fill: '#124b8b' }}
                        />
                    </Region>
                    <Region
                        name="task_hint_text"
                        layout={{ position: 'absolute', left: 76, width: 333, top: 29, height: 42, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionTaskHintText ?? 'Use the navigator to find cool rooms!'}
                            textOptions={{ wordWrap: true, wordWrapWidth: 333 }}
                        />
                    </Region>
                    <Button
                        variant="3"
                        name="hint_redirect_btn"
                        onPointerTap={onHintRedirectBtn}
                        textStyle="text-style-button-shiny-regular"
                        layout={{ position: 'absolute', right: 16, width: 109, top: 16, height: 30 }}
                    >
                        Open Navigator
                    </Button>
                    <ThemeImage
                        src={layoutImage('reward_track_frank_tips.png')}
                        layout={{ position: 'absolute', left: 15, width: 52, top: 7, height: 66 }}
                    />
                </Border>
            </Border>
        </Region>
    );
};
