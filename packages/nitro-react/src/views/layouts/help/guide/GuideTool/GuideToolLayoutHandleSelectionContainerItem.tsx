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
            layout={{ alignSelf: 'stretch', height: 97, flexShrink: 0, ...layout }}
        >
            <ThemeText
                text={t('guide.help.guide.tool.tickettypeselection.caption')}
                textStyle="text-style-il-heading-3"
                layout={{ position: 'absolute', left: 14, width: 246, top: 0, height: 15 }}
            />
            {(visibleHandleGuideTickets ?? true) && (
                <CheckBox
                    variant="101"
                    name="handle_guide_tickets"
                    onPointerTap={onHandleGuideTickets}
                    layout={{ position: 'absolute', right: 5, width: 207, top: 21, height: 21, minHeight: 21, maxHeight: 21 }}
                >
                    {t('guide.help.guide.tool.tickettypeselection.guiderequests')}
                </CheckBox>
            )}
            {(visibleHandleHelperTickets ?? true) && (
                <CheckBox
                    variant="101"
                    name="handle_helper_tickets"
                    onPointerTap={onHandleHelperTickets}
                    layout={{ position: 'absolute', right: 5, width: 207, top: 45, height: 21, minHeight: 21, maxHeight: 21 }}
                >
                    {t('guide.help.guide.tool.tickettypeselection.onlyhelprequests')}
                </CheckBox>
            )}
            {(visibleHandleGuardianTickets ?? true) && (
                <CheckBox
                    variant="101"
                    name="handle_guardian_tickets"
                    onPointerTap={onHandleGuardianTickets}
                    layout={{ position: 'absolute', right: 5, width: 207, bottom: 7, height: 21, minHeight: 21, maxHeight: 21 }}
                >
                    {t('guide.help.guide.tool.tickettypeselection.bullyreports')}
                </CheckBox>
            )}
            {(visibleSelectionSeparator ?? true) && (
                <ThemeImage
                    name="selection_separator"
                    src={srcSelectionSeparator ?? layoutImage('illumina_horizontal_separator.png')}
                    layout={{ position: 'absolute', left: 0, width: 229, bottom: 1, height: 2 }}
                />
            )}
            {(visibleDisabledScreen ?? true) && (
                <Region
                    name="disabled_screen"
                    backgroundColor="#e2e2e2"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 7 }}
                >
                    {disabledScreen}
                </Region>
            )}
        </Region>
    );
};
