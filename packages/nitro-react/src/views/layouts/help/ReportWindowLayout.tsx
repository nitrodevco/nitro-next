import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `2894_report_window_xml` (layout "request_report_user", 282x347) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ReportWindowLayoutProps {
    layout?: BoxLayout;
    list?: ReportWindowLayoutListProps;
    onClose?: () => void;
}

export const ReportWindowLayout = ({ layout, list, onClose }: ReportWindowLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="report_user"
            name="report_user"
            caption={t('guide.help.request.emergency.title')}
            onClose={onClose}
            layout={{ width: 282, height: 347, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <ReportWindowLayoutList {...list} />
            </Region>
        </Frame>
    );
};

/** Row template `report_error` of ReportWindowLayout - pass real rows through its `items…` slot. */
export interface ReportWindowLayoutReportErrorItemProps {
    captionReportError?: string;
    layout?: BoxLayout;
}

export const ReportWindowLayoutReportErrorItem = ({ captionReportError, layout }: ReportWindowLayoutReportErrorItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="report_error"
            visible={false}
            layout={{ width: 264, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionReportError ?? t('guide.help.request.emergency.desc.error')}
                textOptions={{ fill: '#ff0000', wordWrap: true, wordWrapWidth: 264 }}
            />
        </Region>
    );
};

/** Row template `input_widget` of ReportWindowLayout - pass real rows through its `items…` slot. */
export interface ReportWindowLayoutInputWidgetItemProps {
    layout?: BoxLayout;
}

export const ReportWindowLayoutInputWidgetItem = ({ layout }: ReportWindowLayoutInputWidgetItemProps) => {
    return (
        <WidgetSlot
            widgetType="illumina_input"
            name="input_widget"
            options={{ 'illumina_input:button_caption': '', 'illumina_input:empty_message': '${guide.help.request.emergency.input.empty}', 'illumina_input:multiline': 'true' }}
            layout={{ width: 270, height: 100, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `cancel_link` of ReportWindowLayout - pass real rows through its `items…` slot. */
export interface ReportWindowLayoutCancelLinkItemProps {
    captionCancelLink?: string;
    layout?: BoxLayout;
    onCancelLink?: () => void;
}

export const ReportWindowLayoutCancelLinkItem = ({ captionCancelLink, layout, onCancelLink }: ReportWindowLayoutCancelLinkItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="cancel_link"
            layout={{ width: 270, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
            onPointerTap={onCancelLink}
            cursor="pointer"
        >
            <ThemeText
                text={captionCancelLink ?? t('guide.help.request.user.create.cancel.link')}
                textOptions={{ wordWrap: true, wordWrapWidth: 270, align: 'center' }}
            />
        </Region>
    );
};

/** Named region `list` of ReportWindowLayout - configured through the parent's `list` prop. */
export interface ReportWindowLayoutListProps {
    captionUrgentHelpLink?: string;
    itemsList?: ReactNode;
    layout?: BoxLayout;
    onSubmitButton?: () => void;
    onUrgentHelpLink?: () => void;
}

export const ReportWindowLayoutList = ({ captionUrgentHelpLink, itemsList, layout, onSubmitButton, onUrgentHelpLink }: ReportWindowLayoutListProps) => {
    const t = useTranslation();

    return (
        <Region
            name="list"
            layout={{ position: 'absolute', left: 5, top: 0, minWidth: 270, maxWidth: 270, flexDirection: 'column', ...layout }}
        >
            {itemsList ?? (
                <>
                    <ReportWindowLayoutReportErrorItem />
                    <ReportWindowLayoutInputWidgetItem />
                    <ReportWindowLayoutCancelLinkItem />
                </>
            )}
            <Region layout={{ width: 264, height: 38, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('guide.help.request.emergency.desc')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 264 }}
                />
            </Region>
            <Region layout={{ width: 30, height: 20, flexShrink: 0 }} />
            <Border
                variant="104"
                tintColor="#ac1d19"
                layout={{ width: 270, height: 108, flexShrink: 0, justifyContent: 'center' }}
            >
                <Region layout={{ position: 'absolute', left: 10, width: 250, top: 10, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
                    <ThemeText
                        text={t('guide.help.request.emergency.help.title')}
                        textStyle="text-style-il-regular-white"
                        textOptions={{ wordWrap: true, wordWrapWidth: 250, align: 'center' }}
                    />
                </Region>
                <Region
                    name="urgent_help_link"
                    visible={false}
                    layout={{ position: 'absolute', left: 10, width: 250, top: 41, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    onPointerTap={onUrgentHelpLink}
                    cursor="pointer"
                >
                    <ThemeText
                        text={captionUrgentHelpLink ?? t('guide.help.request.emergency.help.link')}
                        textStyle="text-style-il-regular-white"
                        textOptions={{ align: 'center' }}
                    />
                </Region>
                <Button
                    variant="101"
                    name="submit_button"
                    tintColor="#bbbbbb"
                    onPointerTap={onSubmitButton}
                    layout={{ position: 'absolute', marginLeft: -7, marginRight: 7, width: 136, top: 59, height: 48, minHeight: 48, maxHeight: 48 }}
                >
                    {t('guide.help.request.user.create.input.button')}
                </Button>
            </Border>
            <Region layout={{ width: 30, height: 10, flexShrink: 0 }} />
        </Region>
    );
};
