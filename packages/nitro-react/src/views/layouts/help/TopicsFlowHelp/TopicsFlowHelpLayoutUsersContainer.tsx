import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ScrollArea, ThemeText } from '#base/theme';

import { TopicsFlowHelpLayoutUserPrototypeItem } from './TopicsFlowHelpLayoutUserPrototypeItem';

/** Named region `users_container` of TopicsFlowHelpLayout - configured through the parent's `usersContainer` prop. */
export interface TopicsFlowHelpLayoutUsersContainerProps {
    itemsUserList?: ReactNode;
    layout?: BoxLayout;
    visibleUsersContainer?: boolean;
}

export const TopicsFlowHelpLayoutUsersContainer = ({ itemsUserList, layout, visibleUsersContainer }: TopicsFlowHelpLayoutUsersContainerProps) => {
    const t = useTranslation();

    return (
        (visibleUsersContainer ?? false) && (
            <Region
                name="users_container"
                layout={{ position: 'absolute', left: 0, width: 446, top: 0, height: 430, ...layout }}
            >
                <ThemeText
                    text={t('help.emergency.main.step.two.title')}
                    textStyle="text-style-u-headline-medium"
                    layout={{ position: 'absolute', left: 30, width: 278, top: 30, height: 21 }}
                />
                {/* `text` is hidden and has no name to show it by */}
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 30, width: 400, top: 100, height: 330 }}
                >
                    <Region
                        name="user_list"
                        layout={{ flexDirection: 'column', width: '100%' }}
                    >
                        {itemsUserList ?? (
                            <TopicsFlowHelpLayoutUserPrototypeItem />
                        )}
                    </Region>
                </ScrollArea>
            </Region>
        )
    );
};
