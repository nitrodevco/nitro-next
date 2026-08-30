import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `request_description` of GuardianChatReviewAcceptLayout - pass real rows through its `items…` slot. */
export interface GuardianChatReviewAcceptLayoutRequestDescriptionItemProps {
    captionRequestDescription?: string;
    layout?: BoxLayout;
}

export const GuardianChatReviewAcceptLayoutRequestDescriptionItem = ({ captionRequestDescription, layout }: GuardianChatReviewAcceptLayoutRequestDescriptionItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionRequestDescription ?? t('guide.bully.request.guide.accept.request.description')}
            textOptions={{ wordWrap: true, wordWrapWidth: 195 }}
            name="request_description"
            verticalAlign="top"
            layout={{ alignSelf: 'stretch', height: 38, flexShrink: 0, ...layout }}
        />
    );
};
