import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, CheckBox, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `handle_selection_container` of GuideToolLayout - pass real rows through its `items…` slot. */
export interface GuideToolLayoutHandleSelectionContainerItemProps {
    disabledScreen?: ReactNode;
    layout?: BoxLayout;
    onHandleGuardianTickets?: () => void;
    onHandleGuideTickets?: () => void;
    onHandleHelperTickets?: () => void;
    srcSelectionSeparator?: string;
    visibleDisabledScreen?: boolean;
    visibleHandleGuardianTickets?: boolean;
    visibleHandleGuideTickets?: boolean;
    visibleHandleHelperTickets?: boolean;
    visibleSelectionSeparator?: boolean;
}

export const GuideToolLayoutHandleSelectionContainerItem = ({ disabledScreen, layout, onHandleGuardianTickets, onHandleGuideTickets, onHandleHelperTickets, srcSelectionSeparator, visibleDisabledScreen, visibleHandleGuardianTickets, visibleHandleGuideTickets, visibleHandleHelperTickets, visibleSelectionSeparator }: GuideToolLayoutHandleSelectionContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="handle_selection_container"
            layout={{ width: 227, height: 97, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 14, width: 246, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('guide.help.guide.tool.tickettypeselection.caption')}
                    textStyle="text-style-il-heading-3"
                />
            </Region>
            {(visibleHandleGuideTickets ?? true) && (
                <CheckBox
                    variant="101"
                    name="handle_guide_tickets"
                    onPointerTap={onHandleGuideTickets}
                    layout={{ position: 'absolute', left: 15, width: 207, top: 21, height: 21, minHeight: 21, maxHeight: 21 }}
                >
                    {t('guide.help.guide.tool.tickettypeselection.guiderequests')}
                </CheckBox>
            )}
            {(visibleHandleHelperTickets ?? true) && (
                <CheckBox
                    variant="101"
                    name="handle_helper_tickets"
                    onPointerTap={onHandleHelperTickets}
                    layout={{ position: 'absolute', left: 15, width: 207, top: 45, height: 21, minHeight: 21, maxHeight: 21 }}
                >
                    {t('guide.help.guide.tool.tickettypeselection.onlyhelprequests')}
                </CheckBox>
            )}
            {(visibleHandleGuardianTickets ?? true) && (
                <CheckBox
                    variant="101"
                    name="handle_guardian_tickets"
                    onPointerTap={onHandleGuardianTickets}
                    layout={{ position: 'absolute', left: 15, width: 207, top: 69, height: 21, minHeight: 21, maxHeight: 21 }}
                >
                    {t('guide.help.guide.tool.tickettypeselection.bullyreports')}
                </CheckBox>
            )}
            {(visibleSelectionSeparator ?? true) && (
                <ThemeImage
                    name="selection_separator"
                    src={srcSelectionSeparator ?? layoutImage('illumina_horizontal_separator.png')}
                    layout={{ position: 'absolute', left: 0, width: 229, top: 94, height: 2 }}
                />
            )}
            {(visibleDisabledScreen ?? true) && (
                <Region
                    name="disabled_screen"
                    backgroundColor="#e2e2e2"
                    layout={{ position: 'absolute', left: 0, width: 227, top: 0, height: 90 }}
                >
                    {disabledScreen}
                </Region>
            )}
        </Region>
    );
};
