import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `request_description` of GuideAcceptLayout - pass real rows through its `items…` slot. */
export interface GuideAcceptLayoutRequestDescriptionItemProps {
    captionRequestDescription?: string;
    layout?: BoxLayout;
}

export const GuideAcceptLayoutRequestDescriptionItem = ({ captionRequestDescription, layout }: GuideAcceptLayoutRequestDescriptionItemProps) => {
    return (
        <ThemeText
            text={captionRequestDescription ?? 'Help message'}
            textOptions={{ wordWrap: true, wordWrapWidth: 195 }}
            name="request_description"
            verticalAlign="top"
            layout={{ width: 195, height: 16, flexShrink: 0, ...layout }}
        />
    );
};
