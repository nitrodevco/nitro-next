import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ScrollArea, ThemeText } from '#base/theme';

import { TopicsFlowHelpLayoutChatPrototypeItem } from './TopicsFlowHelpLayoutChatPrototypeItem';

/** Named region `chat_container` of TopicsFlowHelpLayout - configured through the parent's `chatContainer` prop. */
export interface TopicsFlowHelpLayoutChatContainerProps {
    itemsChatList?: ReactNode;
    layout?: BoxLayout;
    visibleChatContainer?: boolean;
}

export const TopicsFlowHelpLayoutChatContainer = ({ itemsChatList, layout, visibleChatContainer }: TopicsFlowHelpLayoutChatContainerProps) => {
    const t = useTranslation();

    return (
        (visibleChatContainer ?? false) && (
            <Region
                name="chat_container"
                layout={{ position: 'absolute', left: 0, width: 444, top: 100, height: 330, ...layout }}
            >
                <ThemeText
                    text={t('help.emergency.chat_report.subtitle')}
                    textStyle="text-style-u-headline-medium"
                    layout={{ position: 'absolute', left: 30, width: 287, top: 20, height: 21 }}
                />
                <ThemeText
                    text={t('help.emergency.chat_report.description')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 380 }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 30, width: 380, top: 40, height: 57 }}
                />
                <Border
                    variant="105"
                    layout={{ position: 'absolute', left: 30, width: 390, top: 100, height: 220 }}
                >
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 5, width: 380, top: 5, height: 209 }}
                    >
                        <Region
                            name="chat_list"
                            layout={{ flexDirection: 'column', gap: 2, width: '100%' }}
                        >
                            {itemsChatList ?? (
                                <TopicsFlowHelpLayoutChatPrototypeItem />
                            )}
                        </Region>
                    </ScrollArea>
                </Border>
            </Region>
        )
    );
};
