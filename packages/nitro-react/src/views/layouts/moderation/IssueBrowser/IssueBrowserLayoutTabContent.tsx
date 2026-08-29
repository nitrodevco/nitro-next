import { BoxLayout, Region } from '#base/theme';

import { IssueBrowserLayoutMyIssuesPrototype, IssueBrowserLayoutMyIssuesPrototypeProps } from './IssueBrowserLayoutMyIssuesPrototype';
import { IssueBrowserLayoutOpenIssuesPrototype, IssueBrowserLayoutOpenIssuesPrototypeProps } from './IssueBrowserLayoutOpenIssuesPrototype';
import { IssueBrowserLayoutPickedIssuesPrototype, IssueBrowserLayoutPickedIssuesPrototypeProps } from './IssueBrowserLayoutPickedIssuesPrototype';

/** Named region `tab_content` of IssueBrowserLayout - configured through the parent's `tabContent` prop. */
export interface IssueBrowserLayoutTabContentProps {
    layout?: BoxLayout;
    myIssuesPrototype?: IssueBrowserLayoutMyIssuesPrototypeProps;
    openIssuesPrototype?: IssueBrowserLayoutOpenIssuesPrototypeProps;
    pickedIssuesPrototype?: IssueBrowserLayoutPickedIssuesPrototypeProps;
    visibleMyIssuesPrototype?: boolean;
    visibleOpenIssuesPrototype?: boolean;
}

export const IssueBrowserLayoutTabContent = ({ layout, myIssuesPrototype, openIssuesPrototype, pickedIssuesPrototype, visibleMyIssuesPrototype, visibleOpenIssuesPrototype }: IssueBrowserLayoutTabContentProps) => {
    return (
        <Region
            name="tab_content"
            layout={{ position: 'absolute', left: 10, right: 6, top: 30, bottom: 25, ...layout }}
        >
            {(visibleOpenIssuesPrototype ?? false) && (
                <IssueBrowserLayoutOpenIssuesPrototype {...openIssuesPrototype} />
            )}
            {(visibleMyIssuesPrototype ?? false) && (
                <IssueBrowserLayoutMyIssuesPrototype {...myIssuesPrototype} />
            )}
            <IssueBrowserLayoutPickedIssuesPrototype {...pickedIssuesPrototype} />
        </Region>
    );
};
