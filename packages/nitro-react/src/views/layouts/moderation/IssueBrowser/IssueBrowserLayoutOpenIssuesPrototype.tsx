import { BoxLayout, Region, ThemeText } from '#base/theme';

import { IssueBrowserLayoutIssueList, IssueBrowserLayoutIssueListProps } from './IssueBrowserLayoutIssueList';

/** Named region `open_issues_prototype` of IssueBrowserLayout - configured through the parent's `openIssuesPrototype` prop. */
export interface IssueBrowserLayoutOpenIssuesPrototypeProps {
    issueList?: IssueBrowserLayoutIssueListProps;
    layout?: BoxLayout;
    visibleOpenIssuesPrototype?: boolean;
}

export const IssueBrowserLayoutOpenIssuesPrototype = ({ issueList, layout, visibleOpenIssuesPrototype }: IssueBrowserLayoutOpenIssuesPrototypeProps) => {
    return (
        (visibleOpenIssuesPrototype ?? false) && (
            <Region
                name="open_issues_prototype"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
            >
                <Region layout={{ position: 'absolute', left: 10, right: 0, top: 10, bottom: 0 }}>
                    <Region
                        name="list_header"
                        layout={{ position: 'absolute', left: 0, right: 30, top: 0, height: 15 }}
                    >
                        <ThemeText
                            text="Score"
                            layout={{ position: 'absolute', left: 0, width: 40, top: 0, bottom: 0 }}
                        />
                        <ThemeText
                            text="Category"
                            layout={{ position: 'absolute', left: 40, width: 140, top: 0, bottom: 0 }}
                        />
                        <ThemeText
                            text="Type"
                            layout={{ position: 'absolute', left: 180, width: 90, top: 0, bottom: 0 }}
                        />
                        <ThemeText
                            text="Player"
                            layout={{ position: 'absolute', left: 270, width: 120, top: 0, bottom: 0 }}
                        />
                        <ThemeText
                            text="Open"
                            layout={{ position: 'absolute', right: 77, width: 50, top: 0, bottom: 0 }}
                        />
                    </Region>
                    <IssueBrowserLayoutIssueList {...issueList} />
                    {/* <scrollbar_vertical> for issue_list - rendered by that list's ScrollArea */}
                </Region>
            </Region>
        )
    );
};
