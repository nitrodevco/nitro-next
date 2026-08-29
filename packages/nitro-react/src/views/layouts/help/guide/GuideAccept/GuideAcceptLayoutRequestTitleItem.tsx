import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `request_title` of GuideAcceptLayout - pass real rows through its `items…` slot. */
export interface GuideAcceptLayoutRequestTitleItemProps {
    captionRequestTitle?: string;
    layout?: BoxLayout;
}

export const GuideAcceptLayoutRequestTitleItem = ({ captionRequestTitle, layout }: GuideAcceptLayoutRequestTitleItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="request_title"
            layout={{ width: 170, height: 47, flexShrink: 0, maxWidth: 170, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionRequestTitle ?? t('guide.help.request.guide.accept.request.title')}
                textStyle="text-style-il-heading-2"
            />
        </Region>
    );
};
