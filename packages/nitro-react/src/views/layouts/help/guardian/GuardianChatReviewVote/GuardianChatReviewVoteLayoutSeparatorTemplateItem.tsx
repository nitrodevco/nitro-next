import { BoxLayout, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `separator_template` of GuardianChatReviewVoteLayout - pass real rows through its `items…` slot. */
export interface GuardianChatReviewVoteLayoutSeparatorTemplateItemProps {
    layout?: BoxLayout;
    srcSeparatorTemplate?: string;
}

export const GuardianChatReviewVoteLayoutSeparatorTemplateItem = ({ layout, srcSeparatorTemplate }: GuardianChatReviewVoteLayoutSeparatorTemplateItemProps) => {
    return (
        <ThemeImage
            name="separator_template"
            src={srcSeparatorTemplate ?? layoutImage('illumina_light_separator_horizontal.png')}
            layout={{ width: 226, height: 2, flexShrink: 0, ...layout }}
        />
    );
};
