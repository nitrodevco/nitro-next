import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CheckBox, Frame, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2911_main_help_xml` (layout "main2", 420x600) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MainHelpLayoutProps {
    captionHabbowayLink?: string;
    captionSafetybookletLink?: string;
    captionSelfHelpLink?: string;
    captionSelfHelpLink2?: string;
    layout?: BoxLayout;
    onBullyButton?: () => void;
    onClose?: () => void;
    onEmergencyButton?: () => void;
    onHabbowayLink?: () => void;
    onInstructionsButton?: () => void;
    onLeaveRoom?: () => void;
    onSafetybookletLink?: () => void;
    onSelfHelpLink?: () => void;
    onSelfHelpLink2?: () => void;
}

export const MainHelpLayout = ({ captionHabbowayLink, captionSafetybookletLink, captionSelfHelpLink, captionSelfHelpLink2, layout, onBullyButton, onClose, onEmergencyButton, onHabbowayLink, onInstructionsButton, onLeaveRoom, onSafetybookletLink, onSelfHelpLink, onSelfHelpLink2 }: MainHelpLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="101"
            caption={t('help.main.frame.title')}
            onClose={onClose}
            layout={{ width: 420, height: 600, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region layout={{ position: 'absolute', left: 10, width: 400, top: 0, height: 616, flexDirection: 'column' }}>
                    <WidgetSlot
                        widgetType="separator"
                        layout={{ width: 400, height: 20, flexShrink: 0 }}
                    >
                        <Region layout={{ position: 'absolute', left: 170, width: 157, top: 2, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <ThemeText
                                text={t('help.main.help.section.title')}
                                textStyle="text-style-il-border"
                            />
                        </Region>
                    </WidgetSlot>
                    <Region layout={{ width: 408, height: 140, flexShrink: 0 }}>
                        <ThemeImage
                            src={layoutImage('help_need_help.png')}
                            layout={{ position: 'absolute', left: 17, width: 153, top: 5, height: 128 }}
                        />
                        <Region layout={{ position: 'absolute', left: 180, width: 220, alignSelf: 'center', marginTop: -2.5, marginBottom: 2.5, height: 135, minWidth: 220, maxWidth: 220, flexDirection: 'column', gap: 5 }}>
                            <Region layout={{ width: 220, height: 27, flexShrink: 0, maxWidth: 220, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                <ThemeText
                                    text={t('help.main.help.title')}
                                    textStyle="text-style-il-heading-2"
                                    textOptions={{ wordWrap: true, wordWrapWidth: 220 }}
                                />
                            </Region>
                            <Region layout={{ width: 220, height: 16, flexShrink: 0, minWidth: 220, maxWidth: 220, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                <ThemeText
                                    text={t('help.main.help.content')}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 220 }}
                                />
                            </Region>
                            <Button
                                variant="101"
                                name="instructions_button"
                                tintColor="#bbbbbb"
                                onPointerTap={onInstructionsButton}
                                layout={{ width: 159, height: 48, flexShrink: 0, minHeight: 48, maxHeight: 48 }}
                            >
                                {t('help.main.help.button')}
                            </Button>
                        </Region>
                    </Region>
                    <WidgetSlot
                        widgetType="separator"
                        layout={{ width: 400, height: 20, flexShrink: 0 }}
                    >
                        <Region layout={{ position: 'absolute', left: 170, width: 127, top: 2, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <ThemeText
                                text={t('help.main2.bully.title')}
                                textStyle="text-style-il-border"
                            />
                        </Region>
                    </WidgetSlot>
                    <Region layout={{ width: 400, height: 155, flexShrink: 0 }}>
                        <ThemeImage
                            src={layoutImage('help_illustrations_bully.png')}
                            layout={{ position: 'absolute', left: 134, width: 35, top: 0, height: 120 }}
                        />
                        <ThemeImage
                            src={layoutImage('help_feeling_confused.png')}
                            layout={{ position: 'absolute', left: -1, width: 154, top: 33, height: 125 }}
                        />
                        <Region layout={{ position: 'absolute', left: 180, width: 220, alignSelf: 'center', marginTop: -10, marginBottom: 10, height: 135, minWidth: 220, maxWidth: 220, flexDirection: 'column', gap: 5 }}>
                            <Region layout={{ width: 220, height: 27, flexShrink: 0, maxWidth: 220, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                <ThemeText
                                    text={t('help.main2.bully.subtitle')}
                                    textStyle="text-style-il-heading-2"
                                    textOptions={{ wordWrap: true, wordWrapWidth: 220 }}
                                />
                            </Region>
                            <Region layout={{ width: 220, height: 16, flexShrink: 0, minWidth: 220, maxWidth: 220, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                <ThemeText
                                    text={t('help.main2.bully.description')}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 220 }}
                                />
                            </Region>
                            <Button
                                variant="101"
                                name="bully_button"
                                tintColor="#bbbbbb"
                                onPointerTap={onBullyButton}
                                layout={{ width: 166, height: 48, flexShrink: 0, minHeight: 48, maxHeight: 48 }}
                            >
                                {t('help.main2.bully.button')}
                            </Button>
                        </Region>
                    </Region>
                    <WidgetSlot
                        widgetType="separator"
                        layout={{ width: 409, height: 20, flexShrink: 0 }}
                    >
                        <Region layout={{ position: 'absolute', left: 0, width: 144, top: 2, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <ThemeText
                                text={t('help.main.self.section.title')}
                                textStyle="text-style-il-border"
                            />
                        </Region>
                    </WidgetSlot>
                    <Border
                        variant="102"
                        layout={{ width: 400, height: 70, flexShrink: 0 }}
                    >
                        <Region layout={{ position: 'absolute', left: 10, width: 180, alignSelf: 'center', marginTop: 5, marginBottom: -5, height: 60, minWidth: 180, maxWidth: 180, flexDirection: 'column', gap: 5 }}>
                            <Region
                                name="self_help_link"
                                layout={{ width: 180, height: 17, flexShrink: 0, maxWidth: 180, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                onPointerTap={onSelfHelpLink}
                                cursor="pointer"
                            >
                                <ThemeText
                                    text={captionSelfHelpLink ?? t('help.main.self.tips.title')}
                                    textStyle="text-style-il-heading-2"
                                    textOptions={{ align: 'center' }}
                                />
                            </Region>
                            <Region
                                name="self_help_link"
                                layout={{ width: 180, height: 16, flexShrink: 0, minWidth: 180, maxWidth: 180, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                                onPointerTap={onSelfHelpLink2}
                                cursor="pointer"
                            >
                                <ThemeText
                                    text={captionSelfHelpLink2 ?? t('help.main.self.tips.content')}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 180, align: 'center' }}
                                />
                            </Region>
                        </Region>
                        <WidgetSlot
                            widgetType="separator"
                            options={{ 'separator:vertical': 'true' }}
                            layout={{ position: 'absolute', left: 180, width: 30, top: 15, height: 45 }}
                        />
                        <Region layout={{ position: 'absolute', left: 210, width: 180, alignSelf: 'center', marginTop: 2, marginBottom: -2, height: 42, minWidth: 180, maxWidth: 180, flexDirection: 'column', gap: 5 }}>
                            <Region
                                name="habboway_link"
                                layout={{ width: 180, height: 17, flexShrink: 0, maxWidth: 180, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                onPointerTap={onHabbowayLink}
                                cursor="pointer"
                            >
                                <ThemeText
                                    text={captionHabbowayLink ?? t('help.main.self.habboway.title')}
                                    textStyle="text-style-il-heading-2"
                                    textOptions={{ align: 'center' }}
                                />
                            </Region>
                            <Region
                                name="safetybooklet_link"
                                layout={{ width: 180, height: 17, flexShrink: 0, maxWidth: 180, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                onPointerTap={onSafetybookletLink}
                                cursor="pointer"
                            >
                                <ThemeText
                                    text={captionSafetybookletLink ?? t('help.main.self.safetybooklet.title')}
                                    textStyle="text-style-il-heading-2"
                                    textOptions={{ align: 'center' }}
                                />
                            </Region>
                        </Region>
                    </Border>
                    <WidgetSlot
                        widgetType="separator"
                        layout={{ width: 409, height: 20, flexShrink: 0 }}
                    />
                    <Border
                        variant="104"
                        tintColor="#ac1d19"
                        layout={{ width: 400, height: 70, flexShrink: 0 }}
                    >
                        <Region layout={{ position: 'absolute', left: 20, width: 182, top: 17, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <ThemeText
                                text={t('help.main2.emergency.title')}
                                textStyle="text-style-il-regular-white"
                            />
                        </Region>
                        <Region layout={{ position: 'absolute', left: 20, width: 162, top: 36, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <ThemeText
                                text={t('help.main2.emergency.subtitle')}
                                textStyle="text-style-il-regular-white"
                            />
                        </Region>
                        <Button
                            variant="100"
                            name="emergency_button"
                            onPointerTap={onEmergencyButton}
                            layout={{ position: 'absolute', right: 2, width: 196, top: -1, height: 48, minWidth: 196, maxWidth: 196, minHeight: 48, maxHeight: 48 }}
                        >
                            {t('help.main2.emergency.button')}
                        </Button>
                        <Region layout={{ position: 'absolute', left: 235, width: 149, top: 44, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <ThemeText
                                text={t('help.main2.emergency.leave')}
                                textStyle="text-style-il-regular-white"
                            />
                        </Region>
                        <CheckBox
                            variant="101"
                            name="leave_room"
                            onPointerTap={onLeaveRoom}
                            layout={{ position: 'absolute', left: 213, width: 175, top: 42, height: 21, minHeight: 21, maxHeight: 21 }}
                        >
                            {'                                                              '}
                        </CheckBox>
                    </Border>
                </Region>
            </Region>
        </Frame>
    );
};
