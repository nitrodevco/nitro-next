import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `other_user_template` of GuardianChatReviewVoteLayout - pass real rows through its `items…` slot. */
export interface GuardianChatReviewVoteLayoutOtherUserTemplateItemProps {
    captionMessage?: string;
    layout?: BoxLayout;
    visibleMessage?: boolean;
}

export const GuardianChatReviewVoteLayoutOtherUserTemplateItem = ({ captionMessage, layout, visibleMessage }: GuardianChatReviewVoteLayoutOtherUserTemplateItemProps) => {
    return (
        <Region
            name="other_user_template"
            layout={{ width: 226, height: 22, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={layoutImage('help_chat_review_avatar_anonymous.png')}
                layout={{ position: 'absolute', left: 0, width: 16, top: 3, height: 17 }}
            />
            {(visibleMessage ?? true) && (
                <ThemeText
                    text={captionMessage ?? 'lorem ipsum blah blah'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 203 }}
                    name="message"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 23, width: 203, top: 0, bottom: 0 }}
                />
            )}
        </Region>
    );
};
