import { ReactNode } from 'react';

import { BoxLayout, Region, ScrollArea } from '#base/theme';

import { IssueBrowserLayoutItemPrototypeItem3 } from './IssueBrowserLayoutItemPrototypeItem3';

/** Named region `issue_list` of IssueBrowserLayout - configured through the parent's `issueList` prop. */
export interface IssueBrowserLayoutIssueList3Props {
    itemsIssueList?: ReactNode;
    layout?: BoxLayout;
}

export const IssueBrowserLayoutIssueList3 = ({ itemsIssueList, layout }: IssueBrowserLayoutIssueList3Props) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, right: 30, top: 15, bottom: 27, ...layout }}
        >
            <Region
                name="issue_list"
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                {itemsIssueList ?? (
                    <IssueBrowserLayoutItemPrototypeItem3 />
                )}
            </Region>
        </ScrollArea>
    );
};
