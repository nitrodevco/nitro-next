import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ButtonThick, Frame, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `126_dailytasks_xml` (layout "dailytasks", 428x553) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface DailytasksLayoutProps {
    layout?: BoxLayout;
    mainCont?: DailytasksLayoutMainContProps;
    onClose?: () => void;
}

export const DailytasksLayout = ({ layout, mainCont, onClose }: DailytasksLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="dailytasks_frame"
            name="dailytasks_frame"
            params={1073774593}
            caption={t('dailytasks.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 428, height: 553, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <DailytasksLayoutMainCont {...mainCont} />
            </Region>
        </Frame>
    );
};

/** Row template `spacer` of DailytasksLayout - pass real rows through its `items…` slot. */
export interface DailytasksLayoutSpacerItemProps {
    layout?: BoxLayout;
}

export const DailytasksLayoutSpacerItem = ({ layout }: DailytasksLayoutSpacerItemProps) => {
    return (
        <Region
            name="spacer"
            params={16}
            layout={{ width: 30, height: 0, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `extra_cont` of DailytasksLayout - pass real rows through its `items…` slot. */
export interface DailytasksLayoutExtraContItemProps {
    layout?: BoxLayout;
    onUnclaimedBtn?: () => void;
}

export const DailytasksLayoutExtraContItem = ({ layout, onUnclaimedBtn }: DailytasksLayoutExtraContItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="extra_cont"
            params={16}
            layout={{ width: 428, height: 30, flexShrink: 0, ...layout }}
        >
            <Button
                variant="3"
                name="unclaimed_btn"
                tooltip={t('dailytasks.unclaimed.tooltip')}
                params={393297}
                onPointerTap={onUnclaimedBtn}
                layout={{ position: 'absolute', right: 16, width: 133, top: 0, height: 30 }}
            >
                {t('dailytasks.unclaimed')}
            </Button>
        </Region>
    );
};

/** Named region `info_hover_region` of DailytasksLayout - configured through the parent's `infoHoverRegion` prop. */
export interface DailytasksLayoutInfoHoverRegionProps {
    layout?: BoxLayout;
    onInfoHoverRegion?: () => void;
}

export const DailytasksLayoutInfoHoverRegion = ({ layout, onInfoHoverRegion }: DailytasksLayoutInfoHoverRegionProps) => {
    return (
        <Region
            name="info_hover_region"
            params={17}
            onPointerTap={onInfoHoverRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 254, width: 14, top: 4, height: 22, ...layout }}
        >
            <Region
                params={16}
                layout={{ position: 'absolute', left: 1, width: 12, top: 0, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text="?"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `completion_cont` of DailytasksLayout - configured through the parent's `completionCont` prop. */
export interface DailytasksLayoutCompletionContProps {
    layout?: BoxLayout;
}

export const DailytasksLayoutCompletionCont = ({ layout }: DailytasksLayoutCompletionContProps) => {
    const t = useTranslation();

    return (
        <Region
            name="completion_cont"
            params={16}
            layout={{ position: 'absolute', left: 76, width: 198, top: 83, height: 29, ...layout }}
        >
            <ThemeImage
                params={16}
                src={layoutImage('common_icon_task_completed_s.png')}
                layout={{ position: 'absolute', left: 178, width: 20, top: 3, height: 22 }}
            />
            <Region
                params={262160}
                layout={{ position: 'absolute', right: 23, width: 143, top: 6, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={t('dailytasks.task.complete')}
                    textOptions={{ fill: '#24850b' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `left_cont` of DailytasksLayout - configured through the parent's `leftCont` prop. */
export interface DailytasksLayoutLeftContProps {
    captionTaskDescTxt?: string;
    captionTaskTitleTxt?: string;
    completionCont?: DailytasksLayoutCompletionContProps;
    infoHoverRegion?: DailytasksLayoutInfoHoverRegionProps;
    layout?: BoxLayout;
    srcTaskBitmap?: string;
    srcTaskStaticBitmap?: string;
}

export const DailytasksLayoutLeftCont = ({ captionTaskDescTxt, captionTaskTitleTxt, completionCont, infoHoverRegion, layout, srcTaskBitmap, srcTaskStaticBitmap }: DailytasksLayoutLeftContProps) => {
    return (
        <Region
            name="left_cont"
            params={16}
            layout={{ position: 'absolute', left: 6, width: 274, top: 6, height: 113, ...layout }}
        >
            <Border
                variant="4"
                name="task_name_cont"
                params={16}
                tintColor="#4bb245"
                layout={{ position: 'absolute', left: 0, width: 274, top: 0, height: 28 }}
            >
                <Region
                    name="task_title_txt"
                    params={16}
                    layout={{ position: 'absolute', left: 20, width: 79, top: 5, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTaskTitleTxt ?? 'Quest name'}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <DailytasksLayoutInfoHoverRegion {...infoHoverRegion} />
            </Border>
            <Region
                visible={false}
                layout={{ position: 'absolute', left: 0, width: 76, top: 28, height: 76, minWidth: 76, maxWidth: 76, minHeight: 76, maxHeight: 76 }}
            >
                <ThemeImage
                    name="task_bitmap"
                    params={16}
                    src={srcTaskBitmap}
                    layout={{ position: 'absolute', left: 0, width: 76, top: 28, height: 76, minWidth: 76, maxWidth: 76, minHeight: 76, maxHeight: 76 }}
                />
            </Region>
            <ThemeImage
                name="task_static_bitmap"
                params={16}
                src={srcTaskStaticBitmap}
                layout={{ position: 'absolute', left: 0, width: 76, top: 28, height: 76, minWidth: 76, maxWidth: 76, minHeight: 76, maxHeight: 76 }}
            />
            <Region
                name="task_desc_txt"
                params={16}
                layout={{ position: 'absolute', left: 76, width: 198, top: 36, height: 55, minWidth: 198, maxWidth: 198, minHeight: 55, maxHeight: 55, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTaskDescTxt ?? 'Search around hotel and locate this very valuable dino egg jhg jhg jhg jh gjhg jhg jhg jhg jh gjhg jhg jhg jhg jhg jhgjhgjh gjhg jh gjhg jh gjhg jhg jhg jhg jhg jhg'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 198 }}
                />
            </Region>
            <DailytasksLayoutCompletionCont {...completionCont} />
        </Region>
    );
};

/** Row template `reward_template` of DailytasksLayout - pass real rows through its `items…` slot. */
export interface DailytasksLayoutRewardTemplateItemProps {
    captionRewardAmountText?: string;
    layout?: BoxLayout;
    srcRewardBitmap?: string;
}

export const DailytasksLayoutRewardTemplateItem = ({ captionRewardAmountText, layout, srcRewardBitmap }: DailytasksLayoutRewardTemplateItemProps) => {
    return (
        <Region
            name="reward_template"
            params={16}
            layout={{ width: 44, height: 50, flexShrink: 0, minWidth: 44, maxWidth: 44, minHeight: 50, maxHeight: 50, ...layout }}
        >
            <WidgetSlot
                widgetType="product_icon"
                name="reward_display_widget"
                params={16}
                layout={{ position: 'absolute', left: 2, width: 40, top: 1, height: 40, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
            <Region
                visible={false}
                layout={{ position: 'absolute', left: 0, width: 44, top: 0, height: 50, minWidth: 44, maxWidth: 44, minHeight: 50, maxHeight: 50 }}
            >
                <ThemeImage
                    name="reward_bitmap"
                    params={16}
                    src={srcRewardBitmap}
                    layout={{ position: 'absolute', left: 0, width: 44, top: 0, height: 50, minWidth: 44, maxWidth: 44, minHeight: 50, maxHeight: 50 }}
                />
            </Region>
            <Border
                variant="3"
                name="reward_amount_border"
                params={934032}
                tintColor="#7c7c7c"
                blend={0.9}
                layout={{ position: 'absolute', left: 8, right: 8, top: 36, height: 14, minHeight: 14, maxHeight: 14 }}
            >
                <Region
                    name="reward_amount_text"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 28, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionRewardAmountText ?? 'x10'}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Border>
        </Region>
    );
};

/** Named region `rewards_list` of DailytasksLayout - configured through the parent's `rewardsList` prop. */
export interface DailytasksLayoutRewardsListProps {
    itemsRewardsList?: ReactNode;
    layout?: BoxLayout;
}

export const DailytasksLayoutRewardsList = ({ itemsRewardsList, layout }: DailytasksLayoutRewardsListProps) => {
    return (
        <Region
            name="rewards_list"
            params={933904}
            layout={{ position: 'absolute', marginLeft: -1, marginRight: 1, top: 28, flexDirection: 'row', gap: 4, ...layout }}
        >
            {itemsRewardsList ?? (
                <DailytasksLayoutRewardTemplateItem />
            )}
        </Region>
    );
};

/** Named region `claim_button_container` of DailytasksLayout - configured through the parent's `claimButtonContainer` prop. */
export interface DailytasksLayoutClaimButtonContainerProps {
    captionClaimTxt?: string;
    layout?: BoxLayout;
    onClaimButton?: () => void;
}

export const DailytasksLayoutClaimButtonContainer = ({ captionClaimTxt, layout, onClaimButton }: DailytasksLayoutClaimButtonContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="claim_button_container"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 110, top: 0, height: 23, justifyContent: 'center', ...layout }}
        >
            <Button
                variant="5"
                name="claim_button"
                params={917521}
                tintColor="#01a101"
                onPointerTap={onClaimButton}
                layout={{ position: 'absolute', width: 110, top: 0, height: 23, minWidth: 110, maxWidth: 110 }}
            />
            <Region
                name="claim_txt"
                params={786448}
                layout={{ position: 'absolute', marginLeft: -6.5, marginRight: 6.5, width: 91, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionClaimTxt ?? t('dailytasks.claim')}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `progress_bar_wrapper` of DailytasksLayout - configured through the parent's `progressBarWrapper` prop. */
export interface DailytasksLayoutProgressBarWrapperProps {
    layout?: BoxLayout;
    visibleProgressBarWrapper?: boolean;
}

export const DailytasksLayoutProgressBarWrapper = ({ layout, visibleProgressBarWrapper }: DailytasksLayoutProgressBarWrapperProps) => {
    return (
        <Region
            name="progress_bar_wrapper"
            params={16}
            visible={visibleProgressBarWrapper ?? false}
            layout={{ position: 'absolute', left: 0, width: 110, top: 0, height: 23, minWidth: 110, maxWidth: 110, minHeight: 23, maxHeight: 23, ...layout }}
        />
    );
};

/** Named region `right_bottom_cont` of DailytasksLayout - configured through the parent's `rightBottomCont` prop. */
export interface DailytasksLayoutRightBottomContProps {
    claimButtonContainer?: DailytasksLayoutClaimButtonContainerProps;
    layout?: BoxLayout;
    progressBarWrapper?: DailytasksLayoutProgressBarWrapperProps;
}

export const DailytasksLayoutRightBottomCont = ({ claimButtonContainer, layout, progressBarWrapper }: DailytasksLayoutRightBottomContProps) => {
    return (
        <Region
            name="right_bottom_cont"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 110, top: 84, height: 29, ...layout }}
        >
            <DailytasksLayoutClaimButtonContainer {...claimButtonContainer} />
            <DailytasksLayoutProgressBarWrapper {...progressBarWrapper} />
        </Region>
    );
};

/** Named region `right_cont` of DailytasksLayout - configured through the parent's `rightCont` prop. */
export interface DailytasksLayoutRightContProps {
    captionRewardTitleText?: string;
    layout?: BoxLayout;
    rewardsList?: DailytasksLayoutRewardsListProps;
    rightBottomCont?: DailytasksLayoutRightBottomContProps;
}

export const DailytasksLayoutRightCont = ({ captionRewardTitleText, layout, rewardsList, rightBottomCont }: DailytasksLayoutRightContProps) => {
    const t = useTranslation();

    return (
        <Region
            name="right_cont"
            params={16}
            layout={{ position: 'absolute', left: 286, width: 110, top: 6, height: 113, justifyContent: 'center', ...layout }}
        >
            <Border
                variant="2"
                name="reward_title_border"
                params={16}
                tintColor="#a6ce92"
                layout={{ position: 'absolute', left: 0, width: 110, top: 0, height: 28 }}
            >
                <Region
                    name="reward_title_text"
                    params={4194448}
                    layout={{ position: 'absolute', left: 0, top: 6, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionRewardTitleText ?? t('dailytasks.reward')}
                        textOptions={{ align: 'center' }}
                    />
                </Region>
            </Border>
            <DailytasksLayoutRewardsList {...rewardsList} />
            <DailytasksLayoutRightBottomCont {...rightBottomCont} />
        </Region>
    );
};

/** Row template `task_template` of DailytasksLayout - pass real rows through its `items…` slot. */
export interface DailytasksLayoutTaskTemplateItemProps {
    layout?: BoxLayout;
    leftCont?: DailytasksLayoutLeftContProps;
    rightCont?: DailytasksLayoutRightContProps;
}

export const DailytasksLayoutTaskTemplateItem = ({ layout, leftCont, rightCont }: DailytasksLayoutTaskTemplateItemProps) => {
    return (
        <Border
            variant="4"
            name="task_template"
            params={16}
            tintColor="#c6e0b4"
            layout={{ width: 402, height: 119, flexShrink: 0, ...layout }}
        >
            <DailytasksLayoutLeftCont {...leftCont} />
            <DailytasksLayoutRightCont {...rightCont} />
        </Border>
    );
};

/** Row template `tasks_list` of DailytasksLayout - pass real rows through its `items…` slot. */
export interface DailytasksLayoutTasksListItemProps {
    itemsTasksList?: ReactNode;
    layout?: BoxLayout;
}

export const DailytasksLayoutTasksListItem = ({ itemsTasksList, layout }: DailytasksLayoutTasksListItemProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ width: 426, height: 373, flexShrink: 0, minWidth: 426, maxWidth: 426, ...layout }}
        >
            <Region
                name="tasks_list"
                params={144}
                layout={{ flexDirection: 'column', gap: 8, width: '100%' }}
            >
                {itemsTasksList ?? (
                    <DailytasksLayoutTaskTemplateItem />
                )}
            </Region>
        </ScrollArea>
    );
};

/** Row template `hc_info_cont` of DailytasksLayout - pass real rows through its `items…` slot. */
export interface DailytasksLayoutHcInfoContItemProps {
    captionHcInfoText?: string;
    layout?: BoxLayout;
    onGetHcBtn?: () => void;
}

export const DailytasksLayoutHcInfoContItem = ({ captionHcInfoText, layout, onGetHcBtn }: DailytasksLayoutHcInfoContItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="hc_info_cont"
            params={16}
            layout={{ width: 428, height: 35, flexShrink: 0, ...layout }}
        >
            <Region
                name="hc_info_text"
                params={3145744}
                layout={{ position: 'absolute', left: 12, width: 289, alignSelf: 'center', marginTop: -2, marginBottom: 2, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionHcInfoText ?? 'You get double duckets as you are an HC member!'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 289, align: 'center' }}
                />
            </Region>
            <ButtonThick
                variant="5"
                name="get_hc_btn"
                params={393297}
                tintColor="#01a101"
                onPointerTap={onGetHcBtn}
                layout={{ position: 'absolute', right: 16, width: 107, top: 0, height: 30 }}
            >
                {t('generic.get_hc')}
            </ButtonThick>
        </Region>
    );
};

/** Named region `main_cont` of DailytasksLayout - configured through the parent's `mainCont` prop. */
export interface DailytasksLayoutMainContProps {
    itemsMainCont?: ReactNode;
    layout?: BoxLayout;
}

export const DailytasksLayoutMainCont = ({ itemsMainCont, layout }: DailytasksLayoutMainContProps) => {
    return (
        <Region
            name="main_cont"
            params={147472}
            layout={{ position: 'absolute', left: 0, top: 0, minWidth: 452, maxWidth: 452, flexDirection: 'column', gap: 5, ...layout }}
        >
            {itemsMainCont ?? (
                <>
                    <DailytasksLayoutSpacerItem />
                    <DailytasksLayoutExtraContItem />
                    <DailytasksLayoutTasksListItem />
                    <DailytasksLayoutHcInfoContItem />
                </>
            )}
        </Region>
    );
};
