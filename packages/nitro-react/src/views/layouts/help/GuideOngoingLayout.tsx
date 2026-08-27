import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2914_guide_ongoing_xml` (layout "guide_ongoing", 282x340) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GuideOngoingLayoutProps {
    captionCloseLink?: string;
    captionReportLink?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    onCloseLink?: () => void;
    onInviteButton?: () => void;
    onReportLink?: () => void;
    onVisitButton?: () => void;
}

export const GuideOngoingLayout = ({ captionCloseLink, captionReportLink, layout, onClose, onCloseLink, onInviteButton, onReportLink, onVisitButton }: GuideOngoingLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="guide_ongoing"
            name="guide_ongoing"
            params={98305}
            caption="Helping out"
            onClose={onClose}
            layout={{ width: 282, height: 340, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 10, width: 258, top: 0, height: 30, flexDirection: 'row', gap: 5 }}
                >
                    <Button
                        variant="102"
                        name="visit_button"
                        tooltip={t('guide.help.request.guide.ongoing.visit.button.tooltip')}
                        params={131089}
                        onPointerTap={onVisitButton}
                        layout={{ width: 120, height: 30, flexShrink: 0, maxWidth: 120, minHeight: 30, maxHeight: 30 }}
                    >
                        {t('guide.help.request.guide.ongoing.visit.button')}
                    </Button>
                    <Button
                        variant="102"
                        name="invite_button"
                        tooltip={t('guide.help.request.guide.ongoing.invite.button.tooltip')}
                        params={131089}
                        onPointerTap={onInviteButton}
                        layout={{ width: 120, height: 30, flexShrink: 0, maxWidth: 120, minHeight: 30, maxHeight: 30 }}
                    >
                        {t('guide.help.request.guide.ongoing.invite.button')}
                    </Button>
                </Region>
                <Region
                    name="report_link"
                    tooltip={t('guide.help.common.report.link.tooltip')}
                    params={1}
                    layout={{ position: 'absolute', left: 170, width: 90, top: 15, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                    onPointerTap={onReportLink}
                    cursor="pointer"
                >
                    <ThemeText
                        text={captionReportLink ?? t('guide.help.common.report.link')}
                        textOptions={{ align: 'right' }}
                    />
                </Region>
                <ThemeImage
                    params={16}
                    src={layoutImage('illumina_horizontal_separator.png')}
                    layout={{ position: 'absolute', left: 0, width: 280, top: 37, height: 2 }}
                />
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 5, width: 270, top: 38, height: 184 }}
                >
                    <Region
                        name="chat_list"
                        params={2064}
                        layout={{ flexDirection: 'column', width: '100%' }}
                    >
                        <Region
                            params={16}
                            layout={{ width: 140, height: 21, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('guide.help.common.typing')}
                                textOptions={{ fill: '#555555' }}
                            />
                        </Region>
                    </Region>
                </ScrollArea>
                <Region
                    params={1040}
                    layout={{ position: 'absolute', left: 0, width: 280, top: 221, height: 75 }}
                >
                    <ThemeImage
                        params={147472}
                        src={layoutImage('illumina_horizontal_separator.png')}
                        layout={{ position: 'absolute', left: 0, width: 280, top: 0, height: 2, minWidth: 280, maxWidth: 280 }}
                    />
                    <WidgetSlot
                        widgetType="illumina_input"
                        name="input_widget"
                        params={16}
                        options={{ 'illumina_input:empty_message': 'Click here to chat' }}
                        layout={{ position: 'absolute', left: 10, width: 260, top: 15, height: 30 }}
                    />
                    <Region
                        name="close_link"
                        params={1}
                        layout={{ position: 'absolute', left: 10, width: 260, top: 53, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        onPointerTap={onCloseLink}
                        cursor="pointer"
                    >
                        <ThemeText
                            text={captionCloseLink ?? t('guide.help.request.guide.ongoing.close.link')}
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
