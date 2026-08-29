import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

import { BullyReportLayoutUserListItem } from './BullyReportLayoutUserListItem';

/** Named region `user_panel` of BullyReportLayout - configured through the parent's `userPanel` prop. */
export interface BullyReportLayoutUserPanelProps {
    itemsUserPanel?: ReactNode;
    layout?: BoxLayout;
}

export const BullyReportLayoutUserPanel = ({ itemsUserPanel, layout }: BullyReportLayoutUserPanelProps) => {
    const t = useTranslation();

    return (
        <Region
            name="user_panel"
            layout={{ position: 'absolute', left: 9, minWidth: 282, top: 8, minHeight: 388, flexDirection: 'column', gap: 8, ...layout }}
        >
            {itemsUserPanel ?? (
                <BullyReportLayoutUserListItem />
            )}
            <Region layout={{ width: 122, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('help.bully.subtitle')}
                    textStyle="text-style-il-heading-1"
                    textOptions={{ fill: '#555555' }}
                />
            </Region>
            <Region layout={{ width: 270, height: 16, flexShrink: 0, minWidth: 270, maxWidth: 270, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('help.bully.description')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 270 }}
                />
            </Region>
        </Region>
    );
};
