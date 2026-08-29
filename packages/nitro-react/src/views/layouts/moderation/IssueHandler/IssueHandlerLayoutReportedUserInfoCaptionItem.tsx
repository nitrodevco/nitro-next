import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `reported_user_info_caption` of IssueHandlerLayout - pass real rows through its `items…` slot. */
export interface IssueHandlerLayoutReportedUserInfoCaptionItemProps {
    captionReportedUserInfoCaption?: string;
    layout?: BoxLayout;
}

export const IssueHandlerLayoutReportedUserInfoCaptionItem = ({ captionReportedUserInfoCaption, layout }: IssueHandlerLayoutReportedUserInfoCaptionItemProps) => {
    return (
        <Region
            name="reported_user_info_caption"
            layout={{ width: 120, height: 13, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionReportedUserInfoCaption ?? 'Reported User Info'}
                textOptions={{ fill: '#ffffff' }}
            />
        </Region>
    );
};
