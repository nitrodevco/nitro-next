import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { UserGuideDisconnectedLayoutResubmitButtonItem } from './UserGuideDisconnectedLayoutResubmitButtonItem';

/** Named region `error_list` of UserGuideDisconnectedLayout - configured through the parent's `errorList` prop. */
export interface UserGuideDisconnectedLayoutErrorListProps {
    itemsErrorList?: ReactNode;
    layout?: BoxLayout;
    separatorWidget?: ReactNode;
}

export const UserGuideDisconnectedLayoutErrorList = ({ itemsErrorList, layout, separatorWidget }: UserGuideDisconnectedLayoutErrorListProps) => {
    const t = useTranslation();

    return (
        <Region
            name="error_list"
            layout={{ position: 'absolute', left: 10, right: 0, bottom: 1, flexDirection: 'column', ...layout }}
        >
            {itemsErrorList ?? (
                <UserGuideDisconnectedLayoutResubmitButtonItem />
            )}
            <Region layout={{ alignSelf: 'stretch', height: 35, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('guide.help.request.user.guide.disconnected.error.heading')}
                    textStyle="text-style-il-heading-1"
                    textOptions={{ wordWrap: true, wordWrapWidth: 260 }}
                />
            </Region>
            <Region layout={{ alignSelf: 'stretch', height: 10, flexShrink: 0 }} />
            <Region layout={{ alignSelf: 'stretch', height: 28, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('guide.help.request.user.guide.disconnected.error.desc')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 260 }}
                />
            </Region>
            <Region layout={{ alignSelf: 'stretch', height: 10, flexShrink: 0 }} />
            <WidgetSlot
                widgetType="separator"
                layout={{ alignSelf: 'stretch', height: 1, flexShrink: 0 }}
            >
                {separatorWidget}
            </WidgetSlot>
            <Region layout={{ alignSelf: 'stretch', height: 1, flexShrink: 0 }}>
                <ThemeImage
                    src={layoutImage('help_error_state.png')}
                    layout={{ position: 'absolute', left: 0, width: 81, top: -6, height: 97 }}
                />
            </Region>
            <Region layout={{ alignSelf: 'stretch', height: 50, flexShrink: 0 }} />
        </Region>
    );
};
