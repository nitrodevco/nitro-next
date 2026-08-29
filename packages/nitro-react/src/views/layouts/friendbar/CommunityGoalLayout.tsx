import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `10_community_goal_xml` (layout "community_goal", 516x200) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CommunityGoalLayoutProps {
    communityGoal?: CommunityGoalLayoutCommunityGoalProps;
    layout?: BoxLayout;
}

export const CommunityGoalLayout = ({ communityGoal, layout }: CommunityGoalLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 516, height: 200, ...layout }}>
            <CommunityGoalLayoutCommunityGoal {...communityGoal} />
        </Region>
    );
};

/** Row template `goal_caption` of CommunityGoalLayout - pass real rows through its `items…` slot. */
export interface CommunityGoalLayoutGoalCaptionItemProps {
    captionGoalCaption?: string;
    layout?: BoxLayout;
}

export const CommunityGoalLayoutGoalCaptionItem = ({ captionGoalCaption, layout }: CommunityGoalLayoutGoalCaptionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="goal_caption"
            tags={[ 'COLORABLE' ]}
            params={16}
            layout={{ width: 300, height: 24, flexShrink: 0, minWidth: 300, maxWidth: 300, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionGoalCaption ?? t('landing.view.community.caption')}
                textStyle="text-style-il-heading-1"
            />
        </Region>
    );
};

/** Row template `goal_info` of CommunityGoalLayout - pass real rows through its `items…` slot. */
export interface CommunityGoalLayoutGoalInfoItemProps {
    captionGoalInfo?: string;
    layout?: BoxLayout;
}

export const CommunityGoalLayoutGoalInfoItem = ({ captionGoalInfo, layout }: CommunityGoalLayoutGoalInfoItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="goal_info"
            tags={[ 'COLORABLE' ]}
            params={16}
            layout={{ width: 300, height: 16, flexShrink: 0, minWidth: 300, maxWidth: 300, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionGoalInfo ?? t('landing.view.community.info')}
                textOptions={{ wordWrap: true, wordWrapWidth: 300 }}
            />
        </Region>
    );
};

/** Row template `community_catalog_button` of CommunityGoalLayout - pass real rows through its `items…` slot. */
export interface CommunityGoalLayoutCommunityCatalogButtonItemProps {
    layout?: BoxLayout;
    onCommunityCatalogButton?: () => void;
}

export const CommunityGoalLayoutCommunityCatalogButtonItem = ({ layout, onCommunityCatalogButton }: CommunityGoalLayoutCommunityCatalogButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="100"
            name="community_catalog_button"
            params={131089}
            onPointerTap={onCommunityCatalogButton}
            layout={{ width: 250, height: 48, flexShrink: 0, minWidth: 250, maxWidth: 250, minHeight: 48, maxHeight: 48, ...layout }}
        >
            {t('landing.view.community_catalog_button.text')}
        </Button>
    );
};

/** Named region `info_container` of CommunityGoalLayout - configured through the parent's `infoContainer` prop. */
export interface CommunityGoalLayoutInfoContainerProps {
    itemsInfoContainer?: ReactNode;
    layout?: BoxLayout;
}

export const CommunityGoalLayoutInfoContainer = ({ itemsInfoContainer, layout }: CommunityGoalLayoutInfoContainerProps) => {
    return (
        <Region
            name="info_container"
            params={147472}
            layout={{ position: 'absolute', left: 0, top: 30, flexDirection: 'column', gap: 5, ...layout }}
        >
            {itemsInfoContainer ?? (
                <>
                    <CommunityGoalLayoutGoalCaptionItem />
                    <CommunityGoalLayoutGoalInfoItem />
                    <CommunityGoalLayoutCommunityCatalogButtonItem />
                </>
            )}
        </Region>
    );
};

/** Named region `meter_container` of CommunityGoalLayout - configured through the parent's `meterContainer` prop. */
export interface CommunityGoalLayoutMeterContainerProps {
    captionCommunityTotalStatus?: string;
    layout?: BoxLayout;
    srcMeterLevel0?: string;
    srcMeterLevel1?: string;
    srcMeterLevel1Icon?: string;
    srcMeterLevel1IconLocked?: string;
    srcMeterLevel2?: string;
    srcMeterLevel2Icon?: string;
    srcMeterLevel2IconLocked?: string;
    srcMeterLevel3?: string;
    srcMeterLevel3Icon?: string;
    srcMeterLevel3IconLocked?: string;
    srcMeterNeedle?: string;
}

export const CommunityGoalLayoutMeterContainer = ({ captionCommunityTotalStatus, layout, srcMeterLevel0, srcMeterLevel1, srcMeterLevel1Icon, srcMeterLevel1IconLocked, srcMeterLevel2, srcMeterLevel2Icon, srcMeterLevel2IconLocked, srcMeterLevel3, srcMeterLevel3Icon, srcMeterLevel3IconLocked, srcMeterNeedle }: CommunityGoalLayoutMeterContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="meter_container"
            params={16400}
            layout={{ position: 'absolute', left: 290, width: 226, top: 0, height: 200, ...layout }}
        >
            <Region
                name="community_total_status"
                tags={[ 'COLORABLE' ]}
                params={16}
                layout={{ position: 'absolute', left: 10, width: 200, top: 145, height: 16, minWidth: 200, maxWidth: 200, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionCommunityTotalStatus ?? t('landing.view.community.meter')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 200, align: 'center' }}
                />
            </Region>
            <ThemeImage
                name="meter_level_0"
                params={16}
                src={srcMeterLevel0 ?? '${image.library.url}reception/meter_level_0.png'}
                layout={{ position: 'absolute', left: 20, width: 183, top: 0, height: 144 }}
            />
            <ThemeImage
                name="meter_level_1"
                params={16}
                src={srcMeterLevel1 ?? '${image.library.url}reception/meter_level_1.png'}
                layout={{ position: 'absolute', left: 30, width: 88, top: 39, height: 93 }}
            />
            <Region
                visible={false}
                layout={{ position: 'absolute', left: 30, width: 88, top: 39, height: 93 }}
            >
                <ThemeImage
                    name="meter_level_1_icon"
                    params={16}
                    src={srcMeterLevel1Icon}
                    layout={{ position: 'absolute', left: 30, width: 88, top: 39, height: 93 }}
                />
            </Region>
            <Region
                visible={false}
                layout={{ position: 'absolute', left: 30, width: 88, top: 39, height: 93 }}
            >
                <ThemeImage
                    name="meter_level_1_icon_locked"
                    params={16}
                    src={srcMeterLevel1IconLocked}
                    layout={{ position: 'absolute', left: 30, width: 88, top: 39, height: 93 }}
                />
            </Region>
            <ThemeImage
                name="meter_level_2"
                params={16}
                src={srcMeterLevel2 ?? '${image.library.url}reception/meter_level_2.png'}
                layout={{ position: 'absolute', left: 50, width: 133, top: 10, height: 78 }}
            />
            <Region
                visible={false}
                layout={{ position: 'absolute', left: 50, width: 133, top: 10, height: 78 }}
            >
                <ThemeImage
                    name="meter_level_2_icon"
                    params={16}
                    src={srcMeterLevel2Icon}
                    layout={{ position: 'absolute', left: 50, width: 133, top: 10, height: 78 }}
                />
            </Region>
            <Region
                visible={false}
                layout={{ position: 'absolute', left: 50, width: 133, top: 10, height: 78 }}
            >
                <ThemeImage
                    name="meter_level_2_icon_locked"
                    params={16}
                    src={srcMeterLevel2IconLocked}
                    layout={{ position: 'absolute', left: 50, width: 133, top: 10, height: 78 }}
                />
            </Region>
            <ThemeImage
                name="meter_level_3"
                params={16}
                src={srcMeterLevel3 ?? '${image.library.url}reception/meter_level_3.png'}
                layout={{ position: 'absolute', left: 125, width: 69, top: 39, height: 93 }}
            />
            <Region
                visible={false}
                layout={{ position: 'absolute', left: 125, width: 69, top: 39, height: 93 }}
            >
                <ThemeImage
                    name="meter_level_3_icon"
                    params={16}
                    src={srcMeterLevel3Icon}
                    layout={{ position: 'absolute', left: 125, width: 69, top: 39, height: 93 }}
                />
            </Region>
            <Region
                visible={false}
                layout={{ position: 'absolute', left: 125, width: 69, top: 39, height: 93 }}
            >
                <ThemeImage
                    name="meter_level_3_icon_locked"
                    params={16}
                    src={srcMeterLevel3IconLocked}
                    layout={{ position: 'absolute', left: 125, width: 69, top: 39, height: 93 }}
                />
            </Region>
            <ThemeImage
                name="meter_needle"
                params={16}
                src={srcMeterNeedle ?? layoutImage('landing_view_needle_meter_needle0.png')}
                layout={{ position: 'absolute', left: 60, width: 96, top: 48, height: 85 }}
            />
        </Region>
    );
};

/** Named region `community_goal` of CommunityGoalLayout - configured through the parent's `communityGoal` prop. */
export interface CommunityGoalLayoutCommunityGoalProps {
    captionCommunityTitle?: string;
    infoContainer?: CommunityGoalLayoutInfoContainerProps;
    layout?: BoxLayout;
    meterContainer?: CommunityGoalLayoutMeterContainerProps;
    srcBorderBar?: string;
    srcHdrLine?: string;
}

export const CommunityGoalLayoutCommunityGoal = ({ captionCommunityTitle, infoContainer, layout, meterContainer, srcBorderBar, srcHdrLine }: CommunityGoalLayoutCommunityGoalProps) => {
    const t = useTranslation();

    return (
        <Region
            name="community_goal"
            params={147472}
            layout={{ position: 'absolute', left: 0, width: 516, top: 0, height: 200, ...layout }}
        >
            <ThemeImage
                name="border_bar"
                params={16}
                src={srcBorderBar ?? layoutImage('illumina_light_border_top_center.png')}
                layout={{ position: 'absolute', left: 7, width: 12, top: 10, height: 4 }}
            />
            <Region
                name="community_title"
                tags={[ 'COLORABLE' ]}
                params={16}
                layout={{ position: 'absolute', left: 24, width: 154, top: 4, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCommunityTitle ?? t('landing.view.community.headline')}
                    textStyle="text-style-il-heading-3"
                />
            </Region>
            <ThemeImage
                name="hdr_line"
                params={16}
                src={srcHdrLine ?? layoutImage('illumina_light_border_top_center.png')}
                layout={{ position: 'absolute', left: 193, width: 310, top: 10, height: 4 }}
            />
            <CommunityGoalLayoutInfoContainer {...infoContainer} />
            <CommunityGoalLayoutMeterContainer {...meterContainer} />
        </Region>
    );
};
