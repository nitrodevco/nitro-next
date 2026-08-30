import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `skip_link` of GuardianChatReviewAcceptLayout - pass real rows through its `items…` slot. */
export interface GuardianChatReviewAcceptLayoutSkipLinkItemProps {
    layout?: BoxLayout;
    onSkipLink?: () => void;
}

export const GuardianChatReviewAcceptLayoutSkipLinkItem = ({ layout, onSkipLink }: GuardianChatReviewAcceptLayoutSkipLinkItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="skip_link"
            onPointerTap={onSkipLink}
            cursor="pointer"
            layout={{ width: 215, height: 30, flexShrink: 0, ...layout }}
        >
            <ThemeText
                text={t('guide.bully.request.guide.accept.skip.link')}
                textStyle="text-style-il-link-regular"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 16 }}
            />
        </Region>
    );
};
