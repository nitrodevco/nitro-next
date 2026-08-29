import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Frame, ThemeImage, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { GuardianChatReviewAcceptLayoutItemlist, GuardianChatReviewAcceptLayoutItemlistProps } from './GuardianChatReviewAcceptLayoutItemlist';

/** Generated from `2905_guardian_chat_review_accept_xml` (layout "guardian_chat_review_accept", 282x276) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GuardianChatReviewAcceptLayoutProps {
    countdown?: ReactNode;
    itemlist?: GuardianChatReviewAcceptLayoutItemlistProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const GuardianChatReviewAcceptLayout = ({ countdown, itemlist, layout, onClose }: GuardianChatReviewAcceptLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="guardian_chat_review_accept"
            name="guardian_chat_review_accept"
            caption={t('guide.bully.request.guide.accept.title')}
            onClose={onClose}
            resizeDirection="y"
            layout={{ width: 282, height: 276, minWidth: 282, maxWidth: 282, minHeight: 0, ...layout }}
        >
            <Border
                variant="103"
                name="border"
                layout={{ position: 'absolute', left: 0, right: -10, bottom: -9, height: 224 }}
            >
                <GuardianChatReviewAcceptLayoutItemlist {...itemlist} />
            </Border>
            <ThemeImage
                src={layoutImage('help_chat_review_perpetrator.png')}
                layout={{ position: 'absolute', left: 0, width: 70, top: 20, height: 80 }}
            />
            <Border
                variant="102"
                layout={{ position: 'absolute', right: 5, width: 80, top: 0, height: 50 }}
            >
                <WidgetSlot
                    widgetType="countdown"
                    name="countdown"
                    options={{ 'countdown:digits': '2' }}
                    layout={{ position: 'absolute', left: 10, right: 7, top: 10, bottom: 3 }}
                >
                    {countdown}
                </WidgetSlot>
            </Border>
        </Frame>
    );
};
