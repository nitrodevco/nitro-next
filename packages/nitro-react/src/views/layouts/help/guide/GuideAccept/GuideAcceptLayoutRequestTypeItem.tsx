import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `request_type` of GuideAcceptLayout - pass real rows through its `items…` slot. */
export interface GuideAcceptLayoutRequestTypeItemProps {
    captionRequestType?: string;
    layout?: BoxLayout;
}

export const GuideAcceptLayoutRequestTypeItem = ({ captionRequestType, layout }: GuideAcceptLayoutRequestTypeItemProps) => {
    return (
        <ThemeText
            text={captionRequestType ?? 'Request type'}
            name="request_type"
            layout={{ width: 73, height: 16, flexShrink: 0, maxWidth: 170, ...layout }}
        />
    );
};
