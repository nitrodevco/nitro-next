import { BoxLayout, Region } from '#base/theme';

/** Row template `request_type` of GuideAcceptLayout - pass real rows through its `items…` slot. */
export interface GuideAcceptLayoutRequestTypeItemProps {
    captionRequestType?: string;
    layout?: BoxLayout;
}

export const GuideAcceptLayoutRequestTypeItem = ({ captionRequestType, layout }: GuideAcceptLayoutRequestTypeItemProps) => {
    return (
        <Region
            name="request_type"
            layout={{ width: 73, height: 16, flexShrink: 0, maxWidth: 170, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            {captionRequestType ?? 'Request type'}
        </Region>
    );
};
