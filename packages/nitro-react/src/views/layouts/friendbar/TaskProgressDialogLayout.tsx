import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, TextInput, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `34_task_progress_dialog_xml` (layout "task_progress_dialog", 378x370) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TaskProgressDialogLayoutProps {
    itemsList?: ReactNode;
    itemsTopList?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const TaskProgressDialogLayout = ({ itemsList, itemsTopList, layout, onClose }: TaskProgressDialogLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            params={131073}
            caption={t('talent.track.task.progress.dialog.title')}
            onClose={onClose}
            layout={{ width: 378, height: 370, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="list"
                    params={8536080}
                    layout={{ position: 'absolute', left: 0, top: 0, flexDirection: 'column' }}
                >
                    {itemsList ?? (
                        <>
                            <TaskProgressDialogLayoutProgressMainContainerItem />
                            <TaskProgressDialogLayoutActionLinkItem />
                        </>
                    )}
                    <Border
                        variant="104"
                        params={147472}
                        tintColor="#e2e2e2"
                        layout={{ width: 345, height: 204, flexShrink: 0 }}
                    >
                        <Region
                            name="top_list"
                            params={147472}
                            layout={{ position: 'absolute', left: 0, top: 0, minHeight: 70, flexDirection: 'column' }}
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
                            <Region
                                params={16}
                                layout={{ width: 345, height: 10, flexShrink: 0 }}
                            >
                                <WidgetSlot
                                    widgetType="badge_image"
                                    name="badge"
                                    options={{ 'badge_image:badge_id': 'ACH_EmailVerification1', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                                    layout={{ position: 'absolute', left: 0, width: 60, top: 1, height: 70 }}
                                />
                            </Region>
                            <Region
                                params={16}
                                layout={{ width: 345, height: 10, flexShrink: 0 }}
                            />
                        </Region>
                    </Border>
                    <Region
                        params={16}
                        layout={{ width: 380, height: 15, flexShrink: 0 }}
                    />
                </Region>
            </Region>
        </Frame>
    );
};

/** Row template `progress_main_container` of TaskProgressDialogLayout - pass real rows through its `items…` slot. */
export interface TaskProgressDialogLayoutProgressMainContainerItemProps {
    captionProgressText?: string;
    layout?: BoxLayout;
    srcAchievedLeft?: string;
    srcAchievedMid?: string;
    srcAchievedRight?: string;
    srcUnachievedLeft?: string;
    srcUnachievedMid?: string;
    srcUnachievedRight?: string;
}

export const TaskProgressDialogLayoutProgressMainContainerItem = ({ captionProgressText, layout, srcAchievedLeft, srcAchievedMid, srcAchievedRight, srcUnachievedLeft, srcUnachievedMid, srcUnachievedRight }: TaskProgressDialogLayoutProgressMainContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="progress_main_container"
            params={16}
            layout={{ width: 350, height: 47, flexShrink: 0, ...layout }}
        >
            <Region
                name="progress_container"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 350, top: 0, height: 16 }}
            >
                <ThemeImage
                    name="unachieved_left"
                    params={16}
                    src={srcUnachievedLeft ?? layoutImage('talent_unachieved_left.png')}
                    layout={{ position: 'absolute', left: 0, width: 4, top: 0, height: 16 }}
                />
                <ThemeImage
                    name="unachieved_mid"
                    params={16}
                    src={srcUnachievedMid ?? layoutImage('talent_unachieved_mid.png')}
                    layout={{ position: 'absolute', left: 4, width: 342, top: 0, height: 16 }}
                />
                <ThemeImage
                    name="unachieved_right"
                    params={16}
                    src={srcUnachievedRight ?? layoutImage('talent_unachieved_right.png')}
                    layout={{ position: 'absolute', left: 346, width: 4, top: 0, height: 16 }}
                />
                <ThemeImage
                    name="achieved_left"
                    params={16}
                    src={srcAchievedLeft ?? layoutImage('talent_achieved_left.png')}
                    layout={{ position: 'absolute', left: 0, width: 4, top: 0, height: 16 }}
                />
                <ThemeImage
                    name="achieved_mid"
                    params={16}
                    src={srcAchievedMid ?? layoutImage('talent_achieved_mid.png')}
                    layout={{ position: 'absolute', left: 4, width: 342, top: 0, height: 16 }}
                />
                <ThemeImage
                    name="achieved_right"
                    params={16}
                    src={srcAchievedRight ?? layoutImage('talent_achieved_right.png')}
                    layout={{ position: 'absolute', left: 346, width: 4, top: 0, height: 16 }}
                />
            </Region>
            <Region
                name="progress_text"
                params={16}
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
                params={16}
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
            params={131281}
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
            params={16}
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
            params={16}
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
            params={16}
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
            params={16}
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
            params={16}
            layout={{ width: 325, height: 30, flexShrink: 0, minHeight: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionActionDescription ?? 'You can find the Habbo Way by clicking.'}
                textOptions={{ wordWrap: true, wordWrapWidth: 325 }}
            />
        </Region>
    );
};

/** Row template `email_container` of TaskProgressDialogLayout - pass real rows through its `items…` slot. */
export interface TaskProgressDialogLayoutEmailContainerItemProps {
    captionErrorTxt?: string;
    captionVerifiedTxt?: string;
    layout?: BoxLayout;
    onChangeEmailRegion?: () => void;
    visibleUnverifiedContainer?: boolean;
}

export const TaskProgressDialogLayoutEmailContainerItem = ({ captionErrorTxt, captionVerifiedTxt, layout, onChangeEmailRegion, visibleUnverifiedContainer }: TaskProgressDialogLayoutEmailContainerItemProps) => {
    const t = useTranslation();
    const [ emailTxtValue, setEmailTxtValue ] = useState('');

    return (
        <Region
            name="email_container"
            params={16}
            layout={{ width: 320, height: 60, flexShrink: 0, ...layout }}
        >
            <Region
                name="unverified_container"
                params={16}
                visible={visibleUnverifiedContainer ?? false}
                layout={{ position: 'absolute', left: 0, width: 320, top: 0, height: 60 }}
            >
                <Border
                    variant="105"
                    name="error_border"
                    params={16}
                    tintColor="#cc0000"
                    layout={{ position: 'absolute', left: 0, width: 271, top: 0, height: 29 }}
                />
                <Border
                    variant="105"
                    name="input_border"
                    params={16}
                    layout={{ position: 'absolute', left: 2, width: 267, top: 2, height: 24 }}
                >
                    <TextInput
                        value={emailTxtValue}
                        onChange={setEmailTxtValue}
                        layout={{ position: 'absolute', left: 4, width: 258, top: 4, height: 15 }}
                    />
                </Border>
                <Region
                    name="change_email_region"
                    params={17}
                    onPointerTap={onChangeEmailRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 3, width: 319, top: 28, height: 21 }}
                >
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 156, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={t('talent.track.progress.setemail')} />
                    </Region>
                </Region>
                <Region
                    name="error_txt"
                    params={16}
                    layout={{ position: 'absolute', left: 2, width: 318, top: 28, height: 33, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionErrorTxt ?? 'jkhgjk hgk jhg kjhg jkh lkjh lkjh lkjh lkjh lkj hlkjh lkj hlkjh lkj'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#cc0000', wordWrap: true, wordWrapWidth: 318 }}
                    />
                </Region>
                <Region
                    name="changed_container"
                    params={16}
                    layout={{ position: 'absolute', left: 2, width: 328, top: 29, height: 36 }}
                >
                    <ThemeImage
                        params={16}
                        src={layoutImage('help_accept_icon.png')}
                        layout={{ position: 'absolute', left: 0, width: 11, top: 6, height: 10 }}
                    />
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 16, width: 306, top: 2, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('talent.track.progress.emailchanged')}
                            textStyle="text-style-il-heading-3"
                            textOptions={{ wordWrap: true, wordWrapWidth: 306 }}
                        />
                    </Region>
                </Region>
            </Region>
            <Region
                name="verified_txt"
                params={16}
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
