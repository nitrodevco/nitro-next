import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

import { EmergencyHelpRequestLayoutUserListItem } from './EmergencyHelpRequestLayoutUserListItem';

/** Named region `user_panel` of EmergencyHelpRequestLayout - configured through the parent's `userPanel` prop. */
export interface EmergencyHelpRequestLayoutUserPanelProps {
    itemsUserPanel?: ReactNode;
    layout?: BoxLayout;
    visibleUserPanel?: boolean;
}

export const EmergencyHelpRequestLayoutUserPanel = ({ itemsUserPanel, layout, visibleUserPanel }: EmergencyHelpRequestLayoutUserPanelProps) => {
    const t = useTranslation();

    return (
        (visibleUserPanel ?? false) && (
            <Region
                name="user_panel"
                layout={{ position: 'absolute', left: 309, minWidth: 282, top: 8, minHeight: 378, flexDirection: 'column', gap: 8, ...layout }}
            >
                {itemsUserPanel ?? (
                    <EmergencyHelpRequestLayoutUserListItem />
                )}
                <ThemeText
                    text={t('help.emergency.main.step.two.title')}
                    textStyle="text-style-il-heading-1"
                    textOptions={{ fill: '#555555' }}
                    layout={{ width: 237, height: 19, flexShrink: 0 }}
                />
                <ThemeText
                    text={t('help.emergency.main.step.two.description')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 270 }}
                    verticalAlign="top"
                    layout={{ width: 270, height: 16, flexShrink: 0, minWidth: 270, maxWidth: 270 }}
                />
            </Region>
        )
    );
};
