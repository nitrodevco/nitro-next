import { BoxLayout, Button, Frame, TabButton, TabContext } from '#base/theme';

import { IssueBrowserLayoutTabContent, IssueBrowserLayoutTabContentProps } from './IssueBrowserLayoutTabContent';

/** Generated from `1118_issue_browser_xml` (layout "issue_browser", 585x273) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IssueBrowserLayoutProps {
    layout?: BoxLayout;
    onAutoPick?: () => void;
    onClose?: () => void;
    onMyIssues?: () => void;
    onOpenIssues?: () => void;
    onPickedIssues?: () => void;
    selectedTabContext?: string;
    tabContent?: IssueBrowserLayoutTabContentProps;
}

export const IssueBrowserLayout = ({ layout, onAutoPick, onClose, onMyIssues, onOpenIssues, onPickedIssues, selectedTabContext, tabContent }: IssueBrowserLayoutProps) => {
    return (
        <Frame
            variant="0"
            caption="Issue browser"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 585, height: 273, ...layout }}
        >
            <TabContext
                variant="0"
                name="tab_context"
                layout={{ position: 'absolute', left: 3, right: 16, top: 5, bottom: 64 }}
            >
                <TabButton
                    variant="0"
                    name="open_issues"
                    selected={selectedTabContext === 'open_issues'}
                    onPointerTap={onOpenIssues}
                    layout={{ position: 'absolute', left: 0, width: 81, top: 0, height: 22 }}
                >
                    Open Issues
                </TabButton>
                <TabButton
                    variant="0"
                    name="my_issues"
                    selected={selectedTabContext === 'my_issues'}
                    onPointerTap={onMyIssues}
                    layout={{ position: 'absolute', left: 81, width: 68, top: 0, height: 22 }}
                >
                    My issues
                </TabButton>
                <TabButton
                    variant="0"
                    name="picked_issues"
                    selected={selectedTabContext === 'picked_issues'}
                    onPointerTap={onPickedIssues}
                    layout={{ position: 'absolute', left: 149, width: 88, top: 0, height: 22 }}
                >
                    Picked Issues
                </TabButton>
            </TabContext>
            <IssueBrowserLayoutTabContent {...tabContent} />
            <Button
                variant="0"
                name="auto_pick"
                onPointerTap={onAutoPick}
                layout={{ position: 'absolute', right: 406, width: 175, bottom: 36, height: 22 }}
            >
                Give me the next priority issue
            </Button>
        </Frame>
    );
};
