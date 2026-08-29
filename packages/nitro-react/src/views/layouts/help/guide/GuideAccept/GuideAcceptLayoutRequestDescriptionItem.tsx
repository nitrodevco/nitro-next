import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `request_description` of GuideAcceptLayout - pass real rows through its `items…` slot. */
export interface GuideAcceptLayoutRequestDescriptionItemProps {
    captionRequestDescription?: string;
    layout?: BoxLayout;
}

export const GuideAcceptLayoutRequestDescriptionItem = ({ captionRequestDescription, layout }: GuideAcceptLayoutRequestDescriptionItemProps) => {
    return (
        <Region
            name="request_description"
            layout={{ width: 195, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionRequestDescription ?? 'Help message'}
                textOptions={{ wordWrap: true, wordWrapWidth: 195 }}
            />
        </Region>
    );
};
