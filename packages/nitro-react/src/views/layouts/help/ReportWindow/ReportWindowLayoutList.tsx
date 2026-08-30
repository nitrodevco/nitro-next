import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeText } from '#base/theme';

import { ReportWindowLayoutCancelLinkItem } from './ReportWindowLayoutCancelLinkItem';
import { ReportWindowLayoutInputWidgetItem } from './ReportWindowLayoutInputWidgetItem';
import { ReportWindowLayoutReportErrorItem } from './ReportWindowLayoutReportErrorItem';

/** Named region `list` of ReportWindowLayout - configured through the parent's `list` prop. */
export interface ReportWindowLayoutListProps {
    captionUrgentHelpLink?: string;
    itemsList?: ReactNode;
    layout?: BoxLayout;
    onSubmitButton?: () => void;
    onUrgentHelpLink?: () => void;
    visibleUrgentHelpLink?: boolean;
}

export const ReportWindowLayoutList = ({ captionUrgentHelpLink, itemsList, layout, onSubmitButton, onUrgentHelpLink, visibleUrgentHelpLink }: ReportWindowLayoutListProps) => {
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
            <ThemeText
                text={t('guide.help.request.emergency.desc')}
                textOptions={{ wordWrap: true, wordWrapWidth: 264 }}
                verticalAlign="top"
                layout={{ width: 264, height: 38, flexShrink: 0 }}
            />
            <Region layout={{ width: 30, height: 20, flexShrink: 0 }} />
            <Border
                variant="104"
                tintColor="#ac1d19"
                layout={{ width: 270, height: 108, flexShrink: 0, justifyContent: 'center' }}
            >
                <ThemeText
                    text={t('guide.help.request.emergency.help.title')}
                    textStyle="text-style-il-regular-white"
                    textOptions={{ wordWrap: true, wordWrapWidth: 250, align: 'center' }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 10, width: 250, top: 10, height: 30 }}
                />
                {(visibleUrgentHelpLink ?? false) && (
                    <Region
                        name="urgent_help_link"
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
                )}
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
