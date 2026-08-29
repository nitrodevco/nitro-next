import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `request_description` of GuardianChatReviewAcceptLayout - pass real rows through its `items…` slot. */
export interface GuardianChatReviewAcceptLayoutRequestDescriptionItemProps {
    captionRequestDescription?: string;
    layout?: BoxLayout;
}

export const GuardianChatReviewAcceptLayoutRequestDescriptionItem = ({ captionRequestDescription, layout }: GuardianChatReviewAcceptLayoutRequestDescriptionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="request_description"
            layout={{ alignSelf: 'stretch', height: 38, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionRequestDescription ?? t('guide.bully.request.guide.accept.request.description')}
                textOptions={{ wordWrap: true, wordWrapWidth: 195 }}
            />
        </Region>
    );
};
