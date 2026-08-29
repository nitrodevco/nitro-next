import { useTranslation } from '#base/context';
import { BoxLayout, Region } from '#base/theme';

/** Row template `request_type` of GuardianChatReviewAcceptLayout - pass real rows through its `items…` slot. */
export interface GuardianChatReviewAcceptLayoutRequestTypeItemProps {
    captionRequestType?: string;
    layout?: BoxLayout;
}

export const GuardianChatReviewAcceptLayoutRequestTypeItem = ({ captionRequestType, layout }: GuardianChatReviewAcceptLayoutRequestTypeItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="request_type"
            layout={{ width: 170, height: 16, flexShrink: 0, maxWidth: 170, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            {captionRequestType ?? t('guide.bully.request.guide.accept.request.type')}
        </Region>
    );
};
