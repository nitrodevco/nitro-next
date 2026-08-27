import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ButtonThick, Frame, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `126_dailytasks_xml` (layout "dailytasks", 428x553) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface DailytasksLayoutProps {
    itemsMainCont?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const DailytasksLayout = ({ itemsMainCont, layout, onClose }: DailytasksLayoutProps) => {
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
                <Region
                    name="main_cont"
                    params={147472}
                    layout={{ position: 'absolute', left: 0, top: 0, minWidth: 452, maxWidth: 452, flexDirection: 'column', gap: 5 }}
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

/** Row template `task_template` of DailytasksLayout - pass real rows through its `items…` slot. */
export interface DailytasksLayoutTaskTemplateItemProps {
    captionClaimTxt?: string;
    captionRewardTitleText?: string;
    captionTaskDescTxt?: string;
    captionTaskTitleTxt?: string;
    itemsRewardsList?: ReactNode;
    layout?: BoxLayout;
    onClaimButton?: () => void;
    onInfoHoverRegion?: () => void;
    srcTaskBitmap?: string;
    srcTaskStaticBitmap?: string;
    visibleProgressBarWrapper?: boolean;
}

export const DailytasksLayoutTaskTemplateItem = ({ captionClaimTxt, captionRewardTitleText, captionTaskDescTxt, captionTaskTitleTxt, itemsRewardsList, layout, onClaimButton, onInfoHoverRegion, srcTaskBitmap, srcTaskStaticBitmap, visibleProgressBarWrapper }: DailytasksLayoutTaskTemplateItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="4"
            name="task_template"
            params={16}
            tintColor="#c6e0b4"
            layout={{ width: 402, height: 119, flexShrink: 0, ...layout }}
        >
            <Region
                name="left_cont"
                params={16}
                layout={{ position: 'absolute', left: 6, width: 274, top: 6, height: 113 }}
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
                    <Region
                        name="info_hover_region"
                        params={17}
                        onPointerTap={onInfoHoverRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 254, width: 14, top: 4, height: 22 }}
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
                <Region
                    name="completion_cont"
                    params={16}
                    layout={{ position: 'absolute', left: 76, width: 198, top: 83, height: 29 }}
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
            </Region>
            <Region
                name="right_cont"
                params={16}
                layout={{ position: 'absolute', left: 286, width: 110, top: 6, height: 113 }}
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
                <Region
                    name="rewards_list"
                    params={933904}
                    layout={{ position: 'absolute', left: '50%', marginLeft: -23, top: 28, flexDirection: 'row', gap: 4 }}
                >
                    {itemsRewardsList ?? (
                        <DailytasksLayoutRewardTemplateItem />
                    )}
                </Region>
                <Region
                    name="right_bottom_cont"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 110, top: 84, height: 29 }}
                >
                    <Region
                        name="claim_button_container"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 110, top: 0, height: 23 }}
                    >
                        <Button
                            variant="5"
                            name="claim_button"
                            params={917521}
                            tintColor="#01a101"
                            onPointerTap={onClaimButton}
                            layout={{ position: 'absolute', left: '50%', marginLeft: -55, width: 110, top: 0, height: 23, minWidth: 110, maxWidth: 110 }}
                        />
                        <Region
                            name="claim_txt"
                            params={786448}
                            layout={{ position: 'absolute', left: '50%', marginLeft: -52, width: 91, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionClaimTxt ?? t('dailytasks.claim')}
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="progress_bar_wrapper"
                        params={16}
                        visible={visibleProgressBarWrapper ?? false}
                        layout={{ position: 'absolute', left: 0, width: 110, top: 0, height: 23, minWidth: 110, maxWidth: 110, minHeight: 23, maxHeight: 23 }}
                    />
                </Region>
            </Region>
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
                layout={{ position: 'absolute', left: 12, width: 289, top: '50%', marginTop: -10.5, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
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
