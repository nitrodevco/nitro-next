import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `2894_report_window_xml` (layout "request_report_user", 282x347) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ReportWindowLayoutProps {
    layout?: BoxLayout;
    onCancelLink?: () => void;
    onClose?: () => void;
    onSubmitButton?: () => void;
    onUrgentHelpLink?: () => void;
}

export const ReportWindowLayout = ({ layout, onCancelLink, onClose, onSubmitButton, onUrgentHelpLink }: ReportWindowLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="report_user"
            name="report_user"
            params={32769}
            caption={t('guide.help.request.emergency.title')}
            onClose={onClose}
            layout={{ width: 282, height: 347, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="list"
                    params={8536080}
                    layout={{ position: 'absolute', left: 5, width: 270, top: 0, height: 292, minWidth: 270, maxWidth: 270, flexDirection: 'column' }}
                >
                    <Region
                        params={16}
                        layout={{ width: 264, height: 38, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('guide.help.request.emergency.desc')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 264 }}
                        />
                    </Region>
                    <Region
                        name="report_error"
                        params={16}
                        visible={false}
                        layout={{ width: 264, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('guide.help.request.emergency.desc.error')}
                            textOptions={{ fill: '#ff0000', wordWrap: true, wordWrapWidth: 264 }}
                        />
                    </Region>
                    <WidgetSlot
                        widgetType="illumina_input"
                        name="input_widget"
                        params={16}
                        options={{ 'illumina_input:button_caption': '', 'illumina_input:empty_message': '${guide.help.request.emergency.input.empty}', 'illumina_input:multiline': 'true' }}
                        layout={{ width: 270, height: 100, flexShrink: 0 }}
                    />
                    <Region
                        params={16}
                        layout={{ width: 30, height: 20, flexShrink: 0 }}
                    />
                    <Border
                        variant="104"
                        params={16}
                        tintColor="#ac1d19"
                        layout={{ width: 270, height: 108, flexShrink: 0 }}
                    >
                        <Region
                            params={16}
                            layout={{ position: 'absolute', left: 10, width: 250, top: 10, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={t('guide.help.request.emergency.help.title')}
                                textStyle="text-style-il-regular-white"
                                textOptions={{ wordWrap: true, wordWrapWidth: 250, align: 'center' }}
                            />
                        </Region>
                        <Region
                            name="urgent_help_link"
                            params={33}
                            visible={false}
                            layout={{ position: 'absolute', left: 10, width: 250, top: 41, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                            onPointerTap={onUrgentHelpLink}
                            cursor="pointer"
                        >
                            <ThemeText
                                text={t('guide.help.request.emergency.help.link')}
                                textStyle="text-style-il-regular-white"
                                textOptions={{ align: 'center' }}
                            />
                        </Region>
                        <Button
                            variant="101"
                            name="submit_button"
                            params={147665}
                            tintColor="#bbbbbb"
                            onPointerTap={onSubmitButton}
                            layout={{ position: 'absolute', left: 60, width: 136, top: 59, height: 48, minHeight: 48, maxHeight: 48 }}
                        >
                            {t('guide.help.request.user.create.input.button')}
                        </Button>
                    </Border>
                    <Region
                        params={16}
                        layout={{ width: 30, height: 10, flexShrink: 0 }}
                    />
                    <Region
                        name="cancel_link"
                        params={1}
                        layout={{ width: 270, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                        onPointerTap={onCancelLink}
                        cursor="pointer"
                    >
                        <ThemeText
                            text={t('guide.help.request.user.create.cancel.link')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 270, align: 'center' }}
                        />
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
