import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, TextInput, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `34_task_progress_dialog_xml` (layout "task_progress_dialog", 378x370) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TaskProgressDialogLayoutProps {
    layout?: BoxLayout;
    list?: TaskProgressDialogLayoutListProps;
    onClose?: () => void;
}

export const TaskProgressDialogLayout = ({ layout, list, onClose }: TaskProgressDialogLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            caption={t('talent.track.task.progress.dialog.title')}
            onClose={onClose}
            layout={{ width: 378, height: 370, ...layout }}
        >
            <TaskProgressDialogLayoutList {...list} />
        </Frame>
    );
};

/** Named region `progress_container` of TaskProgressDialogLayout - configured through the parent's `progressContainer` prop. */
export interface TaskProgressDialogLayoutProgressContainerProps {
    layout?: BoxLayout;
    srcAchievedLeft?: string;
    srcAchievedMid?: string;
    srcAchievedRight?: string;
    srcUnachievedLeft?: string;
    srcUnachievedMid?: string;
    srcUnachievedRight?: string;
}

export const TaskProgressDialogLayoutProgressContainer = ({ layout, srcAchievedLeft, srcAchievedMid, srcAchievedRight, srcUnachievedLeft, srcUnachievedMid, srcUnachievedRight }: TaskProgressDialogLayoutProgressContainerProps) => {
    return (
        <Region
            name="progress_container"
            layout={{ position: 'absolute', left: 0, width: 350, top: 0, height: 16, ...layout }}
        >
            <ThemeImage
                name="unachieved_left"
                src={srcUnachievedLeft ?? layoutImage('talent_unachieved_left.png')}
                layout={{ position: 'absolute', left: 0, width: 4, top: 0, height: 16 }}
            />
            <ThemeImage
                name="unachieved_mid"
                src={srcUnachievedMid ?? layoutImage('talent_unachieved_mid.png')}
                layout={{ position: 'absolute', left: 4, width: 342, top: 0, height: 16 }}
            />
            <ThemeImage
                name="unachieved_right"
                src={srcUnachievedRight ?? layoutImage('talent_unachieved_right.png')}
                layout={{ position: 'absolute', left: 346, width: 4, top: 0, height: 16 }}
            />
            <ThemeImage
                name="achieved_left"
                src={srcAchievedLeft ?? layoutImage('talent_achieved_left.png')}
                layout={{ position: 'absolute', left: 0, width: 4, top: 0, height: 16 }}
            />
            <ThemeImage
                name="achieved_mid"
                src={srcAchievedMid ?? layoutImage('talent_achieved_mid.png')}
                layout={{ position: 'absolute', left: 4, width: 342, top: 0, height: 16 }}
            />
            <ThemeImage
                name="achieved_right"
                src={srcAchievedRight ?? layoutImage('talent_achieved_right.png')}
                layout={{ position: 'absolute', left: 346, width: 4, top: 0, height: 16 }}
            />
        </Region>
    );
};

/** Row template `progress_main_container` of TaskProgressDialogLayout - pass real rows through its `items…` slot. */
export interface TaskProgressDialogLayoutProgressMainContainerItemProps {
    captionProgressText?: string;
    layout?: BoxLayout;
    progressContainer?: TaskProgressDialogLayoutProgressContainerProps;
}

export const TaskProgressDialogLayoutProgressMainContainerItem = ({ captionProgressText, layout, progressContainer }: TaskProgressDialogLayoutProgressMainContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="progress_main_container"
            layout={{ width: 350, height: 47, flexShrink: 0, ...layout }}
        >
            <TaskProgressDialogLayoutProgressContainer {...progressContainer} />
            <Region
                name="progress_text"
                layout={{ position: 'absolute', left: 0, width: 349, top: 15, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionProgressText ?? t('talent.track.task.progress.dialog.progress')}
                    textStyle="text-style-il-heading-2"
                    textOptions={{ align: 'center' }}
                />
            </Region>
            <WidgetSlot
                widgetType="separator"
                name="progress_separator"
                layout={{ position: 'absolute', left: 0, width: 350, top: 46, height: 2 }}
            />
        </Region>
    );
};

/** Row template `action_link` of TaskProgressDialogLayout - pass real rows through its `items…` slot. */
export interface TaskProgressDialogLayoutActionLinkItemProps {
    layout?: BoxLayout;
    onActionLink?: () => void;
}

export const TaskProgressDialogLayoutActionLinkItem = ({ layout, onActionLink }: TaskProgressDialogLayoutActionLinkItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="101"
            name="action_link"
            tintColor="#bbbbbb"
            onPointerTap={onActionLink}
            layout={{ width: 246, height: 55, flexShrink: 0, ...layout }}
        >
            {t('talent.track.task.progress.dialog.thanks')}
        </Button>
    );
};

/** Row template `instruction` of TaskProgressDialogLayout - pass real rows through its `items…` slot. */
export interface TaskProgressDialogLayoutInstructionItemProps {
    captionInstruction?: string;
    layout?: BoxLayout;
}

export const TaskProgressDialogLayoutInstructionItem = ({ captionInstruction, layout }: TaskProgressDialogLayoutInstructionItemProps) => {
    return (
        <Region
            name="instruction"
            layout={{ width: 285, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionInstruction ?? 'Give 10 scratches to a pet.'}
                textStyle="text-style-il-heading-2"
                textOptions={{ wordWrap: true, wordWrapWidth: 285 }}
            />
        </Region>
    );
};

/** Row template `title` of TaskProgressDialogLayout - pass real rows through its `items…` slot. */
export interface TaskProgressDialogLayoutTitleItemProps {
    captionTitle?: string;
    layout?: BoxLayout;
}

export const TaskProgressDialogLayoutTitleItem = ({ captionTitle, layout }: TaskProgressDialogLayoutTitleItemProps) => {
    return (
        <Region
            name="title"
            layout={{ width: 285, height: 30, flexShrink: 0, minHeight: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionTitle ?? 'Level title'}
                textOptions={{ wordWrap: true, wordWrapWidth: 285 }}
            />
        </Region>
    );
};

/** Row template `action_separator` of TaskProgressDialogLayout - pass real rows through its `items…` slot. */
export interface TaskProgressDialogLayoutActionSeparatorItemProps {
    layout?: BoxLayout;
}

export const TaskProgressDialogLayoutActionSeparatorItem = ({ layout }: TaskProgressDialogLayoutActionSeparatorItemProps) => {
    return (
        <WidgetSlot
            widgetType="separator"
            name="action_separator"
            layout={{ width: 325, height: 30, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `action_title` of TaskProgressDialogLayout - pass real rows through its `items…` slot. */
export interface TaskProgressDialogLayoutActionTitleItemProps {
    captionActionTitle?: string;
    layout?: BoxLayout;
}

export const TaskProgressDialogLayoutActionTitleItem = ({ captionActionTitle, layout }: TaskProgressDialogLayoutActionTitleItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="action_title"
            layout={{ width: 325, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionActionTitle ?? t('talent.track.task.action.title')}
                textStyle="text-style-il-heading-2"
                textOptions={{ wordWrap: true, wordWrapWidth: 325 }}
            />
        </Region>
    );
};

/** Row template `action_description` of TaskProgressDialogLayout - pass real rows through its `items…` slot. */
export interface TaskProgressDialogLayoutActionDescriptionItemProps {
    captionActionDescription?: string;
    layout?: BoxLayout;
}

export const TaskProgressDialogLayoutActionDescriptionItem = ({ captionActionDescription, layout }: TaskProgressDialogLayoutActionDescriptionItemProps) => {
    return (
        <Region
            name="action_description"
            layout={{ width: 325, height: 30, flexShrink: 0, minHeight: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionActionDescription ?? 'You can find the Habbo Way by clicking.'}
                textOptions={{ wordWrap: true, wordWrapWidth: 325 }}
            />
        </Region>
    );
};

/** Named region `change_email_region` of TaskProgressDialogLayout - configured through the parent's `changeEmailRegion` prop. */
export interface TaskProgressDialogLayoutChangeEmailRegionProps {
    layout?: BoxLayout;
    onChangeEmailRegion?: () => void;
}

export const TaskProgressDialogLayoutChangeEmailRegion = ({ layout, onChangeEmailRegion }: TaskProgressDialogLayoutChangeEmailRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="change_email_region"
            onPointerTap={onChangeEmailRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 3, width: 319, top: 28, height: 21, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 156, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text={t('talent.track.progress.setemail')} />
            </Region>
        </Region>
    );
};

/** Named region `changed_container` of TaskProgressDialogLayout - configured through the parent's `changedContainer` prop. */
export interface TaskProgressDialogLayoutChangedContainerProps {
    layout?: BoxLayout;
}

export const TaskProgressDialogLayoutChangedContainer = ({ layout }: TaskProgressDialogLayoutChangedContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="changed_container"
            layout={{ position: 'absolute', left: 2, width: 328, top: 29, height: 36, ...layout }}
        >
            <ThemeImage
                src={layoutImage('help_accept_icon.png')}
                layout={{ position: 'absolute', left: 0, width: 11, top: 6, height: 10 }}
            />
            <Region layout={{ position: 'absolute', left: 16, width: 306, top: 2, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('talent.track.progress.emailchanged')}
                    textStyle="text-style-il-heading-3"
                    textOptions={{ wordWrap: true, wordWrapWidth: 306 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `unverified_container` of TaskProgressDialogLayout - configured through the parent's `unverifiedContainer` prop. */
export interface TaskProgressDialogLayoutUnverifiedContainerProps {
    captionErrorTxt?: string;
    changedContainer?: TaskProgressDialogLayoutChangedContainerProps;
    changeEmailRegion?: TaskProgressDialogLayoutChangeEmailRegionProps;
    layout?: BoxLayout;
    visibleUnverifiedContainer?: boolean;
}

export const TaskProgressDialogLayoutUnverifiedContainer = ({ captionErrorTxt, changedContainer, changeEmailRegion, layout, visibleUnverifiedContainer }: TaskProgressDialogLayoutUnverifiedContainerProps) => {
    const [ emailTxtValue, setEmailTxtValue ] = useState('');

    return (
        <Region
            name="unverified_container"
            visible={visibleUnverifiedContainer ?? false}
            layout={{ position: 'absolute', left: 0, width: 320, top: 0, height: 60, ...layout }}
        >
            <Border
                variant="105"
                name="error_border"
                tintColor="#cc0000"
                layout={{ position: 'absolute', left: 0, width: 271, top: 0, height: 29 }}
            />
            <Border
                variant="105"
                name="input_border"
                layout={{ position: 'absolute', left: 2, width: 267, top: 2, height: 24 }}
            >
                <TextInput
                    value={emailTxtValue}
                    onChange={setEmailTxtValue}
                    layout={{ position: 'absolute', left: 4, width: 258, top: 4, height: 15 }}
                />
            </Border>
            <TaskProgressDialogLayoutChangeEmailRegion {...changeEmailRegion} />
            <Region
                name="error_txt"
                layout={{ position: 'absolute', left: 2, width: 318, top: 28, height: 33, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionErrorTxt ?? 'jkhgjk hgk jhg kjhg jkh lkjh lkjh lkjh lkjh lkj hlkjh lkj hlkjh lkj'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#cc0000', wordWrap: true, wordWrapWidth: 318 }}
                />
            </Region>
            <TaskProgressDialogLayoutChangedContainer {...changedContainer} />
        </Region>
    );
};

/** Row template `email_container` of TaskProgressDialogLayout - pass real rows through its `items…` slot. */
export interface TaskProgressDialogLayoutEmailContainerItemProps {
    captionVerifiedTxt?: string;
    layout?: BoxLayout;
    unverifiedContainer?: TaskProgressDialogLayoutUnverifiedContainerProps;
}

export const TaskProgressDialogLayoutEmailContainerItem = ({ captionVerifiedTxt, layout, unverifiedContainer }: TaskProgressDialogLayoutEmailContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="email_container"
            layout={{ width: 320, height: 60, flexShrink: 0, ...layout }}
        >
            <TaskProgressDialogLayoutUnverifiedContainer {...unverifiedContainer} />
            <Region
                name="verified_txt"
                visible={false}
                layout={{ position: 'absolute', left: 0, width: 320, top: 0, height: 60, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionVerifiedTxt ?? t('talent.track.progress.emailverified')}
                    textStyle="text-style-il-heading-3"
                    textOptions={{ wordWrap: true, wordWrapWidth: 320 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `top_list` of TaskProgressDialogLayout - configured through the parent's `topList` prop. */
export interface TaskProgressDialogLayoutTopListProps {
    itemsTopList?: ReactNode;
    layout?: BoxLayout;
}

export const TaskProgressDialogLayoutTopList = ({ itemsTopList, layout }: TaskProgressDialogLayoutTopListProps) => {
    return (
        <Region
            name="top_list"
            layout={{ position: 'absolute', left: 0, top: 0, minHeight: 70, flexDirection: 'column', ...layout }}
        >
            {itemsTopList ?? (
                <>
                    <TaskProgressDialogLayoutInstructionItem />
                    <TaskProgressDialogLayoutTitleItem />
                    <TaskProgressDialogLayoutActionSeparatorItem />
                    <TaskProgressDialogLayoutActionTitleItem />
                    <TaskProgressDialogLayoutActionDescriptionItem />
                    <TaskProgressDialogLayoutEmailContainerItem />
                </>
            )}
            <Region layout={{ width: 345, height: 10, flexShrink: 0 }}>
                <WidgetSlot
                    widgetType="badge_image"
                    name="badge"
                    options={{ 'badge_image:badge_id': 'ACH_EmailVerification1', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                    layout={{ position: 'absolute', left: 0, width: 60, top: 1, height: 70 }}
                />
            </Region>
            <Region layout={{ width: 345, height: 10, flexShrink: 0 }} />
        </Region>
    );
};

/** Named region `list` of TaskProgressDialogLayout - configured through the parent's `list` prop. */
export interface TaskProgressDialogLayoutListProps {
    itemsList?: ReactNode;
    layout?: BoxLayout;
    topList?: TaskProgressDialogLayoutTopListProps;
}

export const TaskProgressDialogLayoutList = ({ itemsList, layout, topList }: TaskProgressDialogLayoutListProps) => {
    return (
        <Region
            name="list"
            layout={{ position: 'absolute', left: 0, top: 0, flexDirection: 'column', ...layout }}
        >
            {itemsList ?? (
                <>
                    <TaskProgressDialogLayoutProgressMainContainerItem />
                    <TaskProgressDialogLayoutActionLinkItem />
                </>
            )}
            <Border
                variant="104"
                tintColor="#e2e2e2"
                layout={{ width: 345, height: 204, flexShrink: 0 }}
            >
                <TaskProgressDialogLayoutTopList {...topList} />
            </Border>
            <Region layout={{ width: 380, height: 15, flexShrink: 0 }} />
        </Region>
    );
};
