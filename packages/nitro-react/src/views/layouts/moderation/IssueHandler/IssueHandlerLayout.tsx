import { ReactNode } from 'react';

import { BoxLayout, Button, CheckBox, Dropmenu, Frame, Region, ScrollArea, ThemeText } from '#base/theme';

import { IssueHandlerLayoutIssueCont, IssueHandlerLayoutIssueContProps } from './IssueHandlerLayoutIssueCont';

/** Generated from `1124_issue_handler_xml` (layout "issue_handler", 750x615) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IssueHandlerLayoutProps {
    captionHandleNextText?: string;
    captionSanctionLabel?: string;
    issueCont?: IssueHandlerLayoutIssueContProps;
    itemsEvidenceList?: ReactNode;
    layout?: BoxLayout;
    onCfhTopics?: () => void;
    onClose?: () => void;
    onCloseResolved?: () => void;
    onCloseSanction?: () => void;
    onCloseUseless?: () => void;
    onHandleNextCheckbox?: () => void;
    onRelease?: () => void;
}

export const IssueHandlerLayout = ({ captionHandleNextText, captionSanctionLabel, issueCont, itemsEvidenceList, layout, onCfhTopics, onClose, onCloseResolved, onCloseSanction, onCloseUseless, onHandleNextCheckbox, onRelease }: IssueHandlerLayoutProps) => {
    return (
        <Frame
            variant="0"
            caption="Issue handling"
            tintColor="#418db0"
            onClose={onClose}
            resizeDirection="y"
            layout={{ width: 750, height: 650, minWidth: 750, maxWidth: 750, minHeight: 390, ...layout }}
        >
            <Dropmenu
                variant="100"
                name="cfh_topics"
                onPointerTap={onCfhTopics}
                layout={{ position: 'absolute', left: 410, width: 320, top: 15, height: 20 }}
            >
                CFH TOPICS:
            </Dropmenu>
            <Region
                name="sanctioninfo"
                layout={{ position: 'absolute', left: 524, width: 215, top: 42, height: 18, maxHeight: 47 }}
            >
                <ThemeText
                    text={captionSanctionLabel ?? ''}
                    textOptions={{ fill: '#ffffff' }}
                    name="sanction_label"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 17, maxWidth: 215, maxHeight: 20 }}
                />
            </Region>
            <Region
                name="buttons"
                layout={{ position: 'absolute', left: 290, width: 444, top: 15, height: 75 }}
            >
                <Button
                    variant="0"
                    name="close_useless"
                    tintColor="#ff9090"
                    onPointerTap={onCloseUseless}
                    layout={{ position: 'absolute', left: 0, width: 110, top: 0, height: 22, minWidth: 110, maxWidth: 110 }}
                >
                    Close as useless
                </Button>
                <Button
                    variant="0"
                    name="close_resolved"
                    onPointerTap={onCloseResolved}
                    layout={{ position: 'absolute', left: 0, width: 110, top: 50, height: 22, minWidth: 110, maxWidth: 110 }}
                >
                    Close as resolved
                </Button>
                <Button
                    variant="0"
                    name="release"
                    onPointerTap={onRelease}
                    layout={{ position: 'absolute', left: 316, width: 110, top: 50, height: 22, minWidth: 110, maxWidth: 110 }}
                >
                    Release
                </Button>
                <CheckBox
                    variant="0"
                    name="handle_next_checkbox"
                    onPointerTap={onHandleNextCheckbox}
                    layout={{ position: 'absolute', left: 120, width: 17, top: 53, height: 17 }}
                >
                    Issue handling
                </CheckBox>
                <ThemeText
                    text={captionHandleNextText ?? 'Automatically open next issue'}
                    textOptions={{ fill: '#ffffff' }}
                    name="handle_next_text"
                    layout={{ position: 'absolute', left: 138, width: 153, top: 53, height: 13 }}
                />
                <Button
                    variant="0"
                    name="close_sanction"
                    onPointerTap={onCloseSanction}
                    layout={{ position: 'absolute', left: 120, width: 110, top: 25, height: 22, minWidth: 110, maxWidth: 110 }}
                >
                    Default Sanction
                </Button>
            </Region>
            <IssueHandlerLayoutIssueCont {...issueCont} />
            <Region
                name="chat_cont"
                backgroundColor="#418db0"
                layout={{ position: 'absolute', left: 290, width: 445, top: 95, bottom: 34 }}
            >
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 0, width: 420, top: 0, bottom: 5 }}
                >
                    <Region
                        name="evidence_list"
                        layout={{ flexDirection: 'column', width: '100%' }}
                    >
                        {itemsEvidenceList}
                    </Region>
                </ScrollArea>
                {/* <scrollbar_vertical> for evidence_list - rendered by that list's ScrollArea */}
            </Region>
        </Frame>
    );
};
