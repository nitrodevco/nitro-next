import { ReactNode, useState } from 'react';

import { BoxLayout, Button, CheckBox, Dropmenu, Frame, Region, ScrollArea, TextInput, ThemeText } from '#base/theme';

/** Generated from `1124_issue_handler_xml` (layout "issue_handler", 750x615) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IssueHandlerLayoutProps {
    buttons?: IssueHandlerLayoutButtonsProps;
    chatCont?: IssueHandlerLayoutChatContProps;
    issueCont?: IssueHandlerLayoutIssueContProps;
    layout?: BoxLayout;
    onCfhTopics?: () => void;
    onClose?: () => void;
    sanctioninfo?: IssueHandlerLayoutSanctioninfoProps;
}

export const IssueHandlerLayout = ({ buttons, chatCont, issueCont, layout, onCfhTopics, onClose, sanctioninfo }: IssueHandlerLayoutProps) => {
    return (
        <Frame
            variant="0"
            caption="Issue handling"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 750, height: 650, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Dropmenu
                    variant="100"
                    name="cfh_topics"
                    onPointerTap={onCfhTopics}
                    layout={{ position: 'absolute', left: 410, width: 320, top: 15, height: 20 }}
                >
                    CFH TOPICS:
                </Dropmenu>
                <IssueHandlerLayoutSanctioninfo {...sanctioninfo} />
                <IssueHandlerLayoutButtons {...buttons} />
                <IssueHandlerLayoutIssueCont {...issueCont} />
                <IssueHandlerLayoutChatCont {...chatCont} />
            </Region>
        </Frame>
    );
};

/** Named region `sanctioninfo` of IssueHandlerLayout - configured through the parent's `sanctioninfo` prop. */
export interface IssueHandlerLayoutSanctioninfoProps {
    captionSanctionLabel?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const IssueHandlerLayoutSanctioninfo = ({ captionSanctionLabel, layout, tags }: IssueHandlerLayoutSanctioninfoProps) => {
    return (
        <Region
            name="sanctioninfo"
            tags={tags}
            layout={{ position: 'absolute', left: 524, width: 215, top: 42, height: 18, maxHeight: 47, ...layout }}
        >
            <Region
                name="sanction_label"
                layout={{ position: 'absolute', left: 0, width: 215, top: 0, height: 17, maxWidth: 215, maxHeight: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionSanctionLabel ?? ''}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `buttons` of IssueHandlerLayout - configured through the parent's `buttons` prop. */
export interface IssueHandlerLayoutButtonsProps {
    captionHandleNextText?: string;
    layout?: BoxLayout;
    onCloseResolved?: () => void;
    onCloseSanction?: () => void;
    onCloseUseless?: () => void;
    onHandleNextCheckbox?: () => void;
    onRelease?: () => void;
    tags?: string[];
}

export const IssueHandlerLayoutButtons = ({ captionHandleNextText, layout, onCloseResolved, onCloseSanction, onCloseUseless, onHandleNextCheckbox, onRelease, tags }: IssueHandlerLayoutButtonsProps) => {
    return (
        <Region
            name="buttons"
            tags={tags}
            layout={{ position: 'absolute', left: 290, width: 444, top: 15, height: 75, ...layout }}
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
            <Region
                name="handle_next_text"
                layout={{ position: 'absolute', left: 138, width: 153, top: 53, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionHandleNextText ?? 'Automatically open next issue'}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <Button
                variant="0"
                name="close_sanction"
                onPointerTap={onCloseSanction}
                layout={{ position: 'absolute', left: 120, width: 110, top: 25, height: 22, minWidth: 110, maxWidth: 110 }}
            >
                Default Sanction
            </Button>
        </Region>
    );
};

/** Row template `issues_header` of IssueHandlerLayout - pass real rows through its `items…` slot. */
export interface IssueHandlerLayoutIssuesHeaderItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const IssueHandlerLayoutIssuesHeaderItem = ({ layout, tags }: IssueHandlerLayoutIssuesHeaderItemProps) => {
    return (
        <Region
            name="issues_header"
            tags={tags}
            layout={{ width: 280, height: 13, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <Region layout={{ position: 'absolute', marginLeft: -101, marginRight: 101, width: 78, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text="Reporter"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <Region layout={{ position: 'absolute', marginLeft: -7, marginRight: 7, width: 110, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text="Category"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <Region layout={{ position: 'absolute', marginLeft: 78, marginRight: -78, width: 60, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text="Type"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <Region layout={{ position: 'absolute', marginLeft: 124, marginRight: -124, width: 32, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text="Open"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `issues_item_list` of IssueHandlerLayout - pass real rows through its `items…` slot. */
export interface IssueHandlerLayoutIssuesItemListItemProps {
    captionCategory?: string;
    captionReporter?: string;
    captionTimeOpen?: string;
    captionType?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const IssueHandlerLayoutIssuesItemListItem = ({ captionCategory, captionReporter, captionTimeOpen, captionType, layout, tags }: IssueHandlerLayoutIssuesItemListItemProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ width: 280, height: 70, flexShrink: 0, ...layout }}
        >
            <Region
                name="issues_item_list"
                tags={tags}
                backgroundColor="#ffffff"
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                <Region layout={{ width: 280, height: 16, flexShrink: 0 }}>
                    <Region
                        name="reporter"
                        layout={{ position: 'absolute', left: 0, width: 78, top: 0, height: 13, maxWidth: 78, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionReporter ?? 'reporter'} />
                    </Region>
                    <Region
                        name="category"
                        layout={{ position: 'absolute', left: 78, width: 110, top: 0, height: 13, maxWidth: 110, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionCategory ?? 'category'} />
                    </Region>
                    <Region
                        name="type"
                        layout={{ position: 'absolute', left: 188, width: 60, top: 0, height: 13, maxWidth: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionType ?? 'type'} />
                    </Region>
                    <Region
                        name="time_open"
                        layout={{ position: 'absolute', left: 248, width: 32, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionTimeOpen ?? '00:00'} />
                    </Region>
                </Region>
            </Region>
        </ScrollArea>
    );
};

/** Row template `caller_user_info` of IssueHandlerLayout - pass real rows through its `items…` slot. */
export interface IssueHandlerLayoutCallerUserInfoItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const IssueHandlerLayoutCallerUserInfoItem = ({ layout, tags }: IssueHandlerLayoutCallerUserInfoItemProps) => {
    return (
        <Region
            name="caller_user_info"
            tags={tags}
            layout={{ width: 280, height: 207, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `msg_item_list` of IssueHandlerLayout - pass real rows through its `items…` slot. */
export interface IssueHandlerLayoutMsgItemListItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const IssueHandlerLayoutMsgItemListItem = ({ layout, tags }: IssueHandlerLayoutMsgItemListItemProps) => {
    const [ inputValue, setInputValue ] = useState('');

    return (
        <ScrollArea
            orientation="vertical"
            layout={{ width: 280, height: 70, flexShrink: 0, ...layout }}
        >
            <Region
                name="msg_item_list"
                tags={tags}
                backgroundColor="#ffffff"
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                <TextInput
                    value={inputValue}
                    onChange={setInputValue}
                    backgroundColor="#a2d6ea"
                    layout={{ width: 264, height: 49, flexShrink: 0 }}
                />
            </Region>
        </ScrollArea>
    );
};

/** Row template `reported_user_info_caption` of IssueHandlerLayout - pass real rows through its `items…` slot. */
export interface IssueHandlerLayoutReportedUserInfoCaptionItemProps {
    captionReportedUserInfoCaption?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const IssueHandlerLayoutReportedUserInfoCaptionItem = ({ captionReportedUserInfoCaption, layout, tags }: IssueHandlerLayoutReportedUserInfoCaptionItemProps) => {
    return (
        <Region
            name="reported_user_info_caption"
            tags={tags}
            layout={{ width: 120, height: 13, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionReportedUserInfoCaption ?? 'Reported User Info'}
                textOptions={{ fill: '#ffffff' }}
            />
        </Region>
    );
};

/** Row template `reported_user_info` of IssueHandlerLayout - pass real rows through its `items…` slot. */
export interface IssueHandlerLayoutReportedUserInfoItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const IssueHandlerLayoutReportedUserInfoItem = ({ layout, tags }: IssueHandlerLayoutReportedUserInfoItemProps) => {
    return (
        <Region
            name="reported_user_info"
            tags={tags}
            layout={{ width: 280, height: 207, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `issue_cont` of IssueHandlerLayout - configured through the parent's `issueCont` prop. */
export interface IssueHandlerLayoutIssueContProps {
    itemsIssueCont?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const IssueHandlerLayoutIssueCont = ({ itemsIssueCont, layout, tags }: IssueHandlerLayoutIssueContProps) => {
    return (
        <Region
            name="issue_cont"
            tags={tags}
            layout={{ position: 'absolute', left: 0, right: 465, top: 0, bottom: 26, flexDirection: 'column', gap: 3, ...layout }}
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
            <Region layout={{ width: 100, height: 13, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text="Caller User Info"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <Region layout={{ width: 60, height: 14, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text="Messages"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `evidence_list` of IssueHandlerLayout - configured through the parent's `evidenceList` prop. */
export interface IssueHandlerLayoutEvidenceListProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const IssueHandlerLayoutEvidenceList = ({ layout, tags }: IssueHandlerLayoutEvidenceListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 420, top: 0, bottom: 5, ...layout }}
        >
            <Region
                name="evidence_list"
                tags={tags}
                layout={{ flexDirection: 'column', width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `chat_cont` of IssueHandlerLayout - configured through the parent's `chatCont` prop. */
export interface IssueHandlerLayoutChatContProps {
    evidenceList?: IssueHandlerLayoutEvidenceListProps;
    layout?: BoxLayout;
    tags?: string[];
}

export const IssueHandlerLayoutChatCont = ({ evidenceList, layout, tags }: IssueHandlerLayoutChatContProps) => {
    return (
        <Region
            name="chat_cont"
            tags={tags}
            backgroundColor="#418db0"
            layout={{ position: 'absolute', left: 290, width: 445, top: 95, bottom: 75, ...layout }}
        >
            <IssueHandlerLayoutEvidenceList {...evidenceList} />
            {/* <scrollbar_vertical> for evidence_list - rendered by that list's ScrollArea */}
        </Region>
    );
};
