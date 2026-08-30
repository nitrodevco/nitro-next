import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `request_title` of GuardianChatReviewAcceptLayout - pass real rows through its `items…` slot. */
export interface GuardianChatReviewAcceptLayoutRequestTitleItemProps {
    captionRequestTitle?: string;
    layout?: BoxLayout;
}

export const GuardianChatReviewAcceptLayoutRequestTitleItem = ({ captionRequestTitle, layout }: GuardianChatReviewAcceptLayoutRequestTitleItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionRequestTitle ?? t('guide.bully.request.guide.accept.request.title')}
            textStyle="text-style-il-heading-2"
            name="request_title"
            layout={{ width: 170, height: 47, flexShrink: 0, maxWidth: 170, ...layout }}
        />
    );
};
