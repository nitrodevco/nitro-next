import { useState } from 'react';

import { BoxLayout, Button, CheckBox, Dropmenu, Frame, Region, ScrollArea, TextInput, ThemeText } from '#base/theme';

/** Generated from `1124_issue_handler_xml` (layout "issue_handler", 750x615) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IssueHandlerLayoutProps {
    layout?: BoxLayout;
    onCfhTopics?: () => void;
    onClose?: () => void;
    onCloseResolved?: () => void;
    onCloseSanction?: () => void;
    onCloseUseless?: () => void;
    onHandleNextCheckbox?: () => void;
    onRelease?: () => void;
}

export const IssueHandlerLayout = ({ layout, onCfhTopics, onClose, onCloseResolved, onCloseSanction, onCloseUseless, onHandleNextCheckbox, onRelease }: IssueHandlerLayoutProps) => {
    const [ inputValue, setInputValue ] = useState('');

    return (
        <Frame
            variant="0"
            params={229377}
            caption="Issue handling"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 750, height: 650, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Dropmenu
                    variant="100"
                    name="cfh_topics"
                    params={17}
                    onPointerTap={onCfhTopics}
                    layout={{ position: 'absolute', left: 410, width: 320, top: 15, height: 20 }}
                >
                    CFH TOPICS:
                </Dropmenu>
                <Region
                    name="sanctioninfo"
                    params={16}
                    layout={{ position: 'absolute', left: 524, width: 215, top: 42, height: 18, maxHeight: 47 }}
                >
                    <Region
                        name="sanction_label"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 215, top: 0, height: 17, maxWidth: 215, maxHeight: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    />
                </Region>
                <Region
                    name="buttons"
                    params={16}
                    layout={{ position: 'absolute', left: 290, width: 444, top: 15, height: 75 }}
                >
                    <Button
                        variant="0"
                        name="close_useless"
                        params={131089}
                        tintColor="#ff9090"
                        onPointerTap={onCloseUseless}
                        layout={{ position: 'absolute', left: 0, width: 110, top: 0, height: 22, minWidth: 110, maxWidth: 110 }}
                    >
                        Close as useless
                    </Button>
                    <Button
                        variant="0"
                        name="close_resolved"
                        params={131089}
                        onPointerTap={onCloseResolved}
                        layout={{ position: 'absolute', left: 0, width: 110, top: 50, height: 22, minWidth: 110, maxWidth: 110 }}
                    >
                        Close as resolved
                    </Button>
                    <Button
                        variant="0"
                        name="release"
                        params={131089}
                        onPointerTap={onRelease}
                        layout={{ position: 'absolute', left: 316, width: 110, top: 50, height: 22, minWidth: 110, maxWidth: 110 }}
                    >
                        Release
                    </Button>
                    <CheckBox
                        variant="0"
                        name="handle_next_checkbox"
                        params={17}
                        onPointerTap={onHandleNextCheckbox}
                        layout={{ position: 'absolute', left: 120, width: 17, top: 53, height: 17 }}
                    >
                        Issue handling
                    </CheckBox>
                    <Region
                        name="handle_next_text"
                        params={16}
                        layout={{ position: 'absolute', left: 138, width: 153, top: 53, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="Automatically open next issue"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <Button
                        variant="0"
                        name="close_sanction"
                        params={131089}
                        onPointerTap={onCloseSanction}
                        layout={{ position: 'absolute', left: 120, width: 110, top: 25, height: 22, minWidth: 110, maxWidth: 110 }}
                    >
                        Default Sanction
                    </Button>
                </Region>
                <Region
                    name="issue_cont"
                    params={2193}
                    layout={{ position: 'absolute', left: 0, width: 285, top: 0, height: 624, flexDirection: 'column', gap: 3 }}
                >
                    <Region
                        name="issues_header"
                        params={16}
                        layout={{ width: 280, height: 13, flexShrink: 0 }}
                    >
                        <Region
                            params={786449}
                            layout={{ position: 'absolute', left: 0, width: 78, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="Reporter"
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                        <Region
                            params={786449}
                            layout={{ position: 'absolute', left: 78, width: 110, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="Category"
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                        <Region
                            params={786449}
                            layout={{ position: 'absolute', left: 188, width: 60, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="Type"
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                        <Region
                            params={786449}
                            layout={{ position: 'absolute', left: 248, width: 32, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="Open"
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                    </Region>
                    <ScrollArea
                        orientation="vertical"
                        layout={{ width: 280, height: 70, flexShrink: 0 }}
                    >
                        <Region
                            name="issues_item_list"
                            params={17}
                            backgroundColor="#ffffff"
                            layout={{ flexDirection: 'column', width: '100%' }}
                        >
                            <Region
                                params={17}
                                layout={{ width: 280, height: 16, flexShrink: 0 }}
                            >
                                <Region
                                    name="reporter"
                                    params={16}
                                    layout={{ position: 'absolute', left: 0, width: 78, top: 0, height: 13, maxWidth: 78, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text="reporter" />
                                </Region>
                                <Region
                                    name="category"
                                    params={16}
                                    layout={{ position: 'absolute', left: 78, width: 110, top: 0, height: 13, maxWidth: 110, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text="category" />
                                </Region>
                                <Region
                                    name="type"
                                    params={16}
                                    layout={{ position: 'absolute', left: 188, width: 60, top: 0, height: 13, maxWidth: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text="type" />
                                </Region>
                                <Region
                                    name="time_open"
                                    params={16}
                                    layout={{ position: 'absolute', left: 248, width: 32, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text="00:00" />
                                </Region>
                            </Region>
                        </Region>
                    </ScrollArea>
                    <Region
                        params={786448}
                        layout={{ width: 100, height: 13, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="Caller User Info"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <Region
                        name="caller_user_info"
                        params={16}
                        layout={{ width: 280, height: 207, flexShrink: 0 }}
                    />
                    <Region
                        params={786448}
                        layout={{ width: 60, height: 14, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="Messages"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <ScrollArea
                        orientation="vertical"
                        layout={{ width: 280, height: 70, flexShrink: 0 }}
                    >
                        <Region
                            name="msg_item_list"
                            params={17}
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
                    <Region
                        name="reported_user_info_caption"
                        params={786449}
                        layout={{ width: 120, height: 13, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="Reported User Info"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <Region
                        name="reported_user_info"
                        params={16}
                        layout={{ width: 280, height: 207, flexShrink: 0 }}
                    />
                </Region>
                <Region
                    name="chat_cont"
                    params={2064}
                    backgroundColor="#418db0"
                    layout={{ position: 'absolute', left: 290, width: 445, top: 95, height: 480 }}
                >
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 0, width: 420, top: 0, height: 475 }}
                    >
                        <Region
                            name="evidence_list"
                            params={2064}
                            layout={{ flexDirection: 'column', width: '100%' }}
                        />
                    </ScrollArea>
                </Region>
            </Region>
        </Frame>
    );
};
