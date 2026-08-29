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
    captionTopHeaderText?: string;
    captionTopText?: string;
    layout?: BoxLayout;
    on_0?: () => void;
    on_02?: () => void;
    on_03?: () => void;
    on_1?: () => void;
    on_12?: () => void;
    on_13?: () => void;
    on_2?: () => void;
    on_22?: () => void;
    on_23?: () => void;
    on_24?: () => void;
    on_3?: () => void;
    on_32?: () => void;
    on_33?: () => void;
    onCancelBtn?: () => void;
    onClose?: () => void;
    onOkBtn?: () => void;
    onTopClickArea?: () => void;
    onTopPart?: () => void;
}

export const ForumSettingsLayout = ({ captionLabel0, captionLabel02, captionLabel03, captionLabel1, captionLabel12, captionLabel13, captionLabel2, captionLabel22, captionLabel23, captionLabel24, captionLabel3, captionLabel32, captionLabel33, captionTopHeaderText, captionTopText, layout, on_0, on_02, on_03, on_1, on_12, on_13, on_2, on_22, on_23, on_24, on_3, on_32, on_33, onCancelBtn, onClose, onOkBtn, onTopClickArea, onTopPart }: ForumSettingsLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('groupforum.settings.window_title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 350, height: 545, ...layout }}
        >
            <Region
                name="top_part"
                backgroundColor="#0e3f52"
                onPointerTap={onTopPart}
                cursor="pointer"
                layout={{ position: 'absolute', left: -5, right: 7, top: 8, height: 80 }}
            >
                <Region
                    name="top_click_area"
                    onPointerTap={onTopClickArea}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 80 }}
                />
                <Region
                    name="icon_background"
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 0, width: 80, top: 0, height: 80 }}
                >
                    <WidgetSlot
                        widgetType="badge_image"
                        name="group_icon"
                        layout={{ position: 'absolute', left: 20, width: 40, top: 20, height: 40 }}
                    />
                </Region>
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
            <ContainerButton
                variant="3"
                name="cancel_btn"
                tintColor="#dddddd"
                onPointerTap={onCancelBtn}
                layout={{ position: 'absolute', left: 25, width: 120, bottom: 37, height: 30, minWidth: 120, justifyContent: 'center' }}
            >
                <ThemeText
                    text={t('groupforum.settings.cancel')}
                    textStyle="text-style-u-bold"
                />
            </ContainerButton>
            <ContainerButton
                variant="3"
                name="ok_btn"
                tintColor="#0a9bc5"
                onPointerTap={onOkBtn}
                layout={{ position: 'absolute', right: 40, width: 120, bottom: 37, height: 30, minWidth: 120, justifyContent: 'center' }}
            >
                <ThemeText
                    text={t('groupforum.settings.ok')}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#ffffff' }}
                />
            </ContainerButton>
            <Region layout={{ position: 'absolute', left: 3, width: 444, top: 100, height: 80 }}>
                <Region layout={{ position: 'absolute', left: 0, right: 244, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    {t('groupforum.permissions.read_label')}
                </Region>
                <Region
                    name="label0"
                    layout={{ position: 'absolute', left: 40, width: 404, top: 20, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionLabel0 ?? t('groupforum.permissions.option_all')}
                </Region>
                <Region
                    name="label1"
                    layout={{ position: 'absolute', left: 40, width: 404, top: 40, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionLabel1 ?? t('groupforum.permissions.option_group_members')}
                </Region>
                <Region
                    name="label2"
                    layout={{ position: 'absolute', left: 40, width: 404, top: 60, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionLabel2 ?? t('groupforum.permissions.option_group_admins')}
                </Region>
                <Region
                    name="read_selector"
                    layout={{ position: 'absolute', left: 20, width: 424, top: 20, height: 60 }}
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
            </Region>
            <Region layout={{ position: 'absolute', left: 3, width: 444, top: 190, height: 100 }}>
                <Region layout={{ position: 'absolute', left: 0, right: 188, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    {t('groupforum.permissions.post_message_label')}
                </Region>
                <Region
                    name="label0"
                    layout={{ position: 'absolute', left: 40, width: 404, top: 20, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionLabel02 ?? t('groupforum.permissions.option_all')}
                </Region>
                <Region
                    name="label1"
                    layout={{ position: 'absolute', left: 40, width: 404, top: 40, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionLabel12 ?? t('groupforum.permissions.option_group_members')}
                </Region>
                <Region
                    name="label2"
                    layout={{ position: 'absolute', left: 40, width: 404, top: 60, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionLabel22 ?? t('groupforum.permissions.option_group_admins')}
                </Region>
                <Region
                    name="label3"
                    layout={{ position: 'absolute', left: 40, width: 404, top: 80, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionLabel3 ?? t('groupforum.permissions.option_owner')}
                </Region>
                <Region
                    name="post_message_selector"
                    layout={{ position: 'absolute', left: 20, width: 424, top: 20, height: 80 }}
                >
                    <RadioButton
                        variant="3"
                        name="0"
                        onPointerTap={on_02}
                        layout={{ position: 'absolute', left: 0, width: 424, top: 3, height: 20 }}
                    />
                    <RadioButton
                        variant="3"
                        name="1"
                        onPointerTap={on_12}
                        layout={{ position: 'absolute', left: 0, width: 424, top: 23, height: 20 }}
                    />
                    <RadioButton
                        variant="3"
                        name="2"
                        onPointerTap={on_22}
                        layout={{ position: 'absolute', left: 0, width: 424, top: 43, height: 20 }}
                    />
                    <RadioButton
                        variant="3"
                        name="3"
                        onPointerTap={on_3}
                        layout={{ position: 'absolute', left: 0, width: 424, top: 63, height: 20 }}
                    />
                </Region>
            </Region>
            <Region layout={{ position: 'absolute', left: 3, width: 444, top: 300, height: 100 }}>
                <Region layout={{ position: 'absolute', left: 0, right: 201, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    {t('groupforum.permissions.post_thread_label')}
                </Region>
                <Region
                    name="label0"
                    layout={{ position: 'absolute', left: 40, width: 384, top: 20, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionLabel03 ?? t('groupforum.permissions.option_all')}
                </Region>
                <Region
                    name="label1"
                    layout={{ position: 'absolute', left: 40, width: 404, top: 40, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionLabel13 ?? t('groupforum.permissions.option_group_members')}
                </Region>
                <Region
                    name="label2"
                    layout={{ position: 'absolute', left: 40, width: 404, top: 60, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionLabel23 ?? t('groupforum.permissions.option_group_admins')}
                </Region>
                <Region
                    name="label3"
                    layout={{ position: 'absolute', left: 40, width: 404, top: 80, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionLabel32 ?? t('groupforum.permissions.option_owner')}
                </Region>
                <Region
                    name="post_thread_selector"
                    layout={{ position: 'absolute', left: 20, width: 424, top: 20, height: 80 }}
                >
                    <RadioButton
                        variant="3"
                        name="0"
                        onPointerTap={on_03}
                        layout={{ position: 'absolute', left: 0, width: 424, top: 3, height: 20 }}
                    />
                    <RadioButton
                        variant="3"
                        name="1"
                        onPointerTap={on_13}
                        layout={{ position: 'absolute', left: 0, width: 424, top: 23, height: 20 }}
                    />
                    <RadioButton
                        variant="3"
                        name="2"
                        onPointerTap={on_23}
                        layout={{ position: 'absolute', left: 0, width: 424, top: 43, height: 20 }}
                    />
                    <RadioButton
                        variant="3"
                        name="3"
                        onPointerTap={on_32}
                        layout={{ position: 'absolute', left: 0, width: 424, top: 63, height: 20 }}
                    />
                </Region>
            </Region>
            <Region layout={{ position: 'absolute', left: 3, width: 444, top: 410, height: 60 }}>
                <Region layout={{ position: 'absolute', left: 0, right: 212, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    {t('groupforum.permissions.moderate_label')}
                </Region>
                <Region
                    name="label2"
                    layout={{ position: 'absolute', left: 40, width: 404, top: 20, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionLabel24 ?? t('groupforum.permissions.option_group_admins')}
                </Region>
                <Region
                    name="label3"
                    layout={{ position: 'absolute', left: 40, width: 404, top: 40, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionLabel33 ?? t('groupforum.permissions.option_owner')}
                </Region>
                <Region
                    name="moderate_selector"
                    layout={{ position: 'absolute', left: 20, width: 424, top: 20, height: 40 }}
                >
                    <RadioButton
                        variant="3"
                        name="2"
                        onPointerTap={on_24}
                        layout={{ position: 'absolute', left: 0, width: 424, top: 3, height: 20 }}
                    />
                    <RadioButton
                        variant="3"
                        name="3"
                        onPointerTap={on_33}
                        layout={{ position: 'absolute', left: 0, width: 424, top: 23, height: 20 }}
                    />
                </Region>
            </Region>
        </Frame>
    );
};
