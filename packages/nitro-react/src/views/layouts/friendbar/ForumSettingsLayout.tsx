import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Frame, RadioButton, Region, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `68_forum_settings_xml` (layout "forum_permissions", 350x545) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ForumSettingsLayoutProps {
    captionLabel0?: string;
    captionLabel02?: string;
    captionLabel03?: string;
    captionLabel1?: string;
    captionLabel12?: string;
    captionLabel13?: string;
    captionLabel2?: string;
    captionLabel22?: string;
    captionLabel23?: string;
    captionLabel24?: string;
    captionLabel3?: string;
    captionLabel32?: string;
    captionLabel33?: string;
    layout?: BoxLayout;
    moderateSelector?: ForumSettingsLayoutModerateSelectorProps;
    onCancelBtn?: () => void;
    onClose?: () => void;
    onOkBtn?: () => void;
    postMessageSelector?: ForumSettingsLayoutPostMessageSelectorProps;
    postThreadSelector?: ForumSettingsLayoutPostThreadSelectorProps;
    readSelector?: ForumSettingsLayoutReadSelectorProps;
    topPart?: ForumSettingsLayoutTopPartProps;
}

export const ForumSettingsLayout = ({ captionLabel0, captionLabel02, captionLabel03, captionLabel1, captionLabel12, captionLabel13, captionLabel2, captionLabel22, captionLabel23, captionLabel24, captionLabel3, captionLabel32, captionLabel33, layout, moderateSelector, onCancelBtn, onClose, onOkBtn, postMessageSelector, postThreadSelector, readSelector, topPart }: ForumSettingsLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('groupforum.settings.window_title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 350, height: 545, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <ForumSettingsLayoutTopPart {...topPart} />
                <ContainerButton
                    variant="3"
                    name="cancel_btn"
                    tintColor="#dddddd"
                    onPointerTap={onCancelBtn}
                    layout={{ position: 'absolute', left: 25, width: 120, bottom: 37, height: 30, minWidth: 120, justifyContent: 'center' }}
                >
                    <Region layout={{ position: 'absolute', marginLeft: 20, marginRight: -20, width: 160, alignSelf: 'center', marginTop: 0.5, marginBottom: -0.5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('groupforum.settings.cancel')}
                            textStyle="text-style-u-bold"
                        />
                    </Region>
                </ContainerButton>
                <ContainerButton
                    variant="3"
                    name="ok_btn"
                    tintColor="#0a9bc5"
                    onPointerTap={onOkBtn}
                    layout={{ position: 'absolute', right: 40, width: 120, bottom: 37, height: 30, minWidth: 120, justifyContent: 'center' }}
                >
                    <Region layout={{ position: 'absolute', marginLeft: 8.5, marginRight: -8.5, width: 137, alignSelf: 'center', marginTop: 0.5, marginBottom: -0.5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('groupforum.settings.ok')}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </ContainerButton>
                <Region layout={{ position: 'absolute', left: 3, width: 444, top: 100, height: 80 }}>
                    <Region layout={{ position: 'absolute', left: 0, right: 244, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText text={t('groupforum.permissions.read_label')} />
                    </Region>
                    <Region
                        name="label0"
                        layout={{ position: 'absolute', left: 40, width: 404, top: 20, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionLabel0 ?? t('groupforum.permissions.option_all')} />
                    </Region>
                    <Region
                        name="label1"
                        layout={{ position: 'absolute', left: 40, width: 404, top: 40, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionLabel1 ?? t('groupforum.permissions.option_group_members')} />
                    </Region>
                    <Region
                        name="label2"
                        layout={{ position: 'absolute', left: 40, width: 404, top: 60, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionLabel2 ?? t('groupforum.permissions.option_group_admins')} />
                    </Region>
                    <ForumSettingsLayoutReadSelector {...readSelector} />
                </Region>
                <Region layout={{ position: 'absolute', left: 3, width: 444, top: 190, height: 100 }}>
                    <Region layout={{ position: 'absolute', left: 0, right: 188, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText text={t('groupforum.permissions.post_message_label')} />
                    </Region>
                    <Region
                        name="label0"
                        layout={{ position: 'absolute', left: 40, width: 404, top: 20, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionLabel02 ?? t('groupforum.permissions.option_all')} />
                    </Region>
                    <Region
                        name="label1"
                        layout={{ position: 'absolute', left: 40, width: 404, top: 40, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionLabel12 ?? t('groupforum.permissions.option_group_members')} />
                    </Region>
                    <Region
                        name="label2"
                        layout={{ position: 'absolute', left: 40, width: 404, top: 60, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionLabel22 ?? t('groupforum.permissions.option_group_admins')} />
                    </Region>
                    <Region
                        name="label3"
                        layout={{ position: 'absolute', left: 40, width: 404, top: 80, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionLabel3 ?? t('groupforum.permissions.option_owner')} />
                    </Region>
                    <ForumSettingsLayoutPostMessageSelector {...postMessageSelector} />
                </Region>
                <Region layout={{ position: 'absolute', left: 3, width: 444, top: 300, height: 100 }}>
                    <Region layout={{ position: 'absolute', left: 0, right: 201, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText text={t('groupforum.permissions.post_thread_label')} />
                    </Region>
                    <Region
                        name="label0"
                        layout={{ position: 'absolute', left: 40, width: 384, top: 20, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionLabel03 ?? t('groupforum.permissions.option_all')} />
                    </Region>
                    <Region
                        name="label1"
                        layout={{ position: 'absolute', left: 40, width: 404, top: 40, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionLabel13 ?? t('groupforum.permissions.option_group_members')} />
                    </Region>
                    <Region
                        name="label2"
                        layout={{ position: 'absolute', left: 40, width: 404, top: 60, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionLabel23 ?? t('groupforum.permissions.option_group_admins')} />
                    </Region>
                    <Region
                        name="label3"
                        layout={{ position: 'absolute', left: 40, width: 404, top: 80, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionLabel32 ?? t('groupforum.permissions.option_owner')} />
                    </Region>
                    <ForumSettingsLayoutPostThreadSelector {...postThreadSelector} />
                </Region>
                <Region layout={{ position: 'absolute', left: 3, width: 444, top: 410, height: 60 }}>
                    <Region layout={{ position: 'absolute', left: 0, right: 212, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText text={t('groupforum.permissions.moderate_label')} />
                    </Region>
                    <Region
                        name="label2"
                        layout={{ position: 'absolute', left: 40, width: 404, top: 20, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionLabel24 ?? t('groupforum.permissions.option_group_admins')} />
                    </Region>
                    <Region
                        name="label3"
                        layout={{ position: 'absolute', left: 40, width: 404, top: 40, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionLabel33 ?? t('groupforum.permissions.option_owner')} />
                    </Region>
                    <ForumSettingsLayoutModerateSelector {...moderateSelector} />
                </Region>
            </Region>
        </Frame>
    );
};

/** Named region `top_click_area` of ForumSettingsLayout - configured through the parent's `topClickArea` prop. */
export interface ForumSettingsLayoutTopClickAreaProps {
    layout?: BoxLayout;
    onTopClickArea?: () => void;
    tags?: string[];
}

export const ForumSettingsLayoutTopClickArea = ({ layout, onTopClickArea, tags }: ForumSettingsLayoutTopClickAreaProps) => {
    return (
        <Region
            name="top_click_area"
            tags={tags}
            onPointerTap={onTopClickArea}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 80, ...layout }}
        />
    );
};

/** Named region `icon_background` of ForumSettingsLayout - configured through the parent's `iconBackground` prop. */
export interface ForumSettingsLayoutIconBackgroundProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const ForumSettingsLayoutIconBackground = ({ layout, tags }: ForumSettingsLayoutIconBackgroundProps) => {
    return (
        <Region
            name="icon_background"
            tags={tags}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 80, top: 0, height: 80, ...layout }}
        >
            <WidgetSlot
                widgetType="badge_image"
                name="group_icon"
                layout={{ position: 'absolute', left: 20, width: 40, top: 20, height: 40 }}
            />
        </Region>
    );
};

/** Named region `top_part` of ForumSettingsLayout - configured through the parent's `topPart` prop. */
export interface ForumSettingsLayoutTopPartProps {
    captionTopHeaderText?: string;
    captionTopText?: string;
    iconBackground?: ForumSettingsLayoutIconBackgroundProps;
    layout?: BoxLayout;
    onTopPart?: () => void;
    tags?: string[];
    topClickArea?: ForumSettingsLayoutTopClickAreaProps;
}

export const ForumSettingsLayoutTopPart = ({ captionTopHeaderText, captionTopText, iconBackground, layout, onTopPart, tags, topClickArea }: ForumSettingsLayoutTopPartProps) => {
    return (
        <Region
            name="top_part"
            tags={tags}
            backgroundColor="#0e3f52"
            onPointerTap={onTopPart}
            cursor="pointer"
            layout={{ position: 'absolute', left: -5, right: 7, top: 8, height: 80, ...layout }}
        >
            <ForumSettingsLayoutTopClickArea {...topClickArea} />
            <ForumSettingsLayoutIconBackground {...iconBackground} />
            <Region
                name="top_header_text"
                layout={{ position: 'absolute', left: 90, width: 678, top: 10, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTopHeaderText ?? 'Super-duper long group title'}
                    textStyle="text-style-u-headline-big"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <Region
                name="top_text"
                layout={{ position: 'absolute', left: 90, right: 4, top: 40, height: 40, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTopText ?? 'Super-duper long goup description, maybe even multiline, but takes a few lines anyway'}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 254 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `read_selector` of ForumSettingsLayout - configured through the parent's `readSelector` prop. */
export interface ForumSettingsLayoutReadSelectorProps {
    layout?: BoxLayout;
    on_0?: () => void;
    on_1?: () => void;
    on_2?: () => void;
    tags?: string[];
}

export const ForumSettingsLayoutReadSelector = ({ layout, on_0, on_1, on_2, tags }: ForumSettingsLayoutReadSelectorProps) => {
    return (
        <Region
            name="read_selector"
            tags={tags}
            layout={{ position: 'absolute', left: 20, width: 424, top: 20, height: 60, ...layout }}
        >
            <RadioButton
                variant="3"
                name="0"
                onPointerTap={on_0}
                layout={{ position: 'absolute', left: 0, width: 424, top: 3, height: 20 }}
            />
            <RadioButton
                variant="3"
                name="1"
                onPointerTap={on_1}
                layout={{ position: 'absolute', left: 0, width: 424, top: 23, height: 20 }}
            />
            <RadioButton
                variant="3"
                name="2"
                onPointerTap={on_2}
                layout={{ position: 'absolute', left: 0, width: 424, top: 43, height: 20 }}
            />
        </Region>
    );
};

/** Named region `post_message_selector` of ForumSettingsLayout - configured through the parent's `postMessageSelector` prop. */
export interface ForumSettingsLayoutPostMessageSelectorProps {
    layout?: BoxLayout;
    on_0?: () => void;
    on_1?: () => void;
    on_2?: () => void;
    on_3?: () => void;
    tags?: string[];
}

export const ForumSettingsLayoutPostMessageSelector = ({ layout, on_0, on_1, on_2, on_3, tags }: ForumSettingsLayoutPostMessageSelectorProps) => {
    return (
        <Region
            name="post_message_selector"
            tags={tags}
            layout={{ position: 'absolute', left: 20, width: 424, top: 20, height: 80, ...layout }}
        >
            <RadioButton
                variant="3"
                name="0"
                onPointerTap={on_0}
                layout={{ position: 'absolute', left: 0, width: 424, top: 3, height: 20 }}
            />
            <RadioButton
                variant="3"
                name="1"
                onPointerTap={on_1}
                layout={{ position: 'absolute', left: 0, width: 424, top: 23, height: 20 }}
            />
            <RadioButton
                variant="3"
                name="2"
                onPointerTap={on_2}
                layout={{ position: 'absolute', left: 0, width: 424, top: 43, height: 20 }}
            />
            <RadioButton
                variant="3"
                name="3"
                onPointerTap={on_3}
                layout={{ position: 'absolute', left: 0, width: 424, top: 63, height: 20 }}
            />
        </Region>
    );
};

/** Named region `post_thread_selector` of ForumSettingsLayout - configured through the parent's `postThreadSelector` prop. */
export interface ForumSettingsLayoutPostThreadSelectorProps {
    layout?: BoxLayout;
    on_0?: () => void;
    on_1?: () => void;
    on_2?: () => void;
    on_3?: () => void;
    tags?: string[];
}

export const ForumSettingsLayoutPostThreadSelector = ({ layout, on_0, on_1, on_2, on_3, tags }: ForumSettingsLayoutPostThreadSelectorProps) => {
    return (
        <Region
            name="post_thread_selector"
            tags={tags}
            layout={{ position: 'absolute', left: 20, width: 424, top: 20, height: 80, ...layout }}
        >
            <RadioButton
                variant="3"
                name="0"
                onPointerTap={on_0}
                layout={{ position: 'absolute', left: 0, width: 424, top: 3, height: 20 }}
            />
            <RadioButton
                variant="3"
                name="1"
                onPointerTap={on_1}
                layout={{ position: 'absolute', left: 0, width: 424, top: 23, height: 20 }}
            />
            <RadioButton
                variant="3"
                name="2"
                onPointerTap={on_2}
                layout={{ position: 'absolute', left: 0, width: 424, top: 43, height: 20 }}
            />
            <RadioButton
                variant="3"
                name="3"
                onPointerTap={on_3}
                layout={{ position: 'absolute', left: 0, width: 424, top: 63, height: 20 }}
            />
        </Region>
    );
};

/** Named region `moderate_selector` of ForumSettingsLayout - configured through the parent's `moderateSelector` prop. */
export interface ForumSettingsLayoutModerateSelectorProps {
    layout?: BoxLayout;
    on_2?: () => void;
    on_3?: () => void;
    tags?: string[];
}

export const ForumSettingsLayoutModerateSelector = ({ layout, on_2, on_3, tags }: ForumSettingsLayoutModerateSelectorProps) => {
    return (
        <Region
            name="moderate_selector"
            tags={tags}
            layout={{ position: 'absolute', left: 20, width: 424, top: 20, height: 40, ...layout }}
        >
            <RadioButton
                variant="3"
                name="2"
                onPointerTap={on_2}
                layout={{ position: 'absolute', left: 0, width: 424, top: 3, height: 20 }}
            />
            <RadioButton
                variant="3"
                name="3"
                onPointerTap={on_3}
                layout={{ position: 'absolute', left: 0, width: 424, top: 23, height: 20 }}
            />
        </Region>
    );
};
