import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeText } from '#base/theme';

import { IssueHandlerLayoutCallerUserInfoItem } from './IssueHandlerLayoutCallerUserInfoItem';
import { IssueHandlerLayoutIssuesHeaderItem } from './IssueHandlerLayoutIssuesHeaderItem';
import { IssueHandlerLayoutIssuesItemListItem } from './IssueHandlerLayoutIssuesItemListItem';
import { IssueHandlerLayoutMsgItemListItem } from './IssueHandlerLayoutMsgItemListItem';
import { IssueHandlerLayoutReportedUserInfoCaptionItem } from './IssueHandlerLayoutReportedUserInfoCaptionItem';
import { IssueHandlerLayoutReportedUserInfoItem } from './IssueHandlerLayoutReportedUserInfoItem';

/** Named region `issue_cont` of IssueHandlerLayout - configured through the parent's `issueCont` prop. */
export interface IssueHandlerLayoutIssueContProps {
    itemsIssueCont?: ReactNode;
    layout?: BoxLayout;
}

export const IssueHandlerLayoutIssueCont = ({ itemsIssueCont, layout }: IssueHandlerLayoutIssueContProps) => {
    return (
        <Region
            name="issue_cont"
            layout={{ position: 'absolute', left: 0, right: 453, top: 0, bottom: -15, flexDirection: 'column', gap: 3, ...layout }}
        >
            {itemsIssueCont ?? (
                <>
                    <IssueHandlerLayoutIssuesHeaderItem />
                    <IssueHandlerLayoutIssuesItemListItem />
                    <IssueHandlerLayoutCallerUserInfoItem />
                    <IssueHandlerLayoutMsgItemListItem />
                    <IssueHandlerLayoutReportedUserInfoCaptionItem />
                    <IssueHandlerLayoutReportedUserInfoItem />
                </>
            )}
            <ThemeText
                text="Caller User Info"
                textOptions={{ fill: '#ffffff' }}
                layout={{ width: 100, height: 13, flexShrink: 0 }}
            />
            <ThemeText
                text="Messages"
                textOptions={{ fill: '#ffffff' }}
                layout={{ width: 60, height: 14, flexShrink: 0 }}
            />
        </Region>
    );
};
