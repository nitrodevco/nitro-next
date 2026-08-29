import { ReactNode } from 'react';

import { BoxLayout, Button, Frame, Region, ScrollArea, ThemeText } from '#base/theme';

/** Generated from `1112_evidence_frame_xml` (layout "chatlog", 480x565) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface EvidenceFrameLayoutProps {
    chatCont?: EvidenceFrameLayoutChatContProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const EvidenceFrameLayout = ({ chatCont, layout, onClose }: EvidenceFrameLayoutProps) => {
    return (
        <Frame
            variant="0"
            caption="Chatlog"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 480, height: 565, ...layout }}
        >
            <EvidenceFrameLayoutChatCont {...chatCont} />
        </Frame>
    );
};

/** Row template `chatline` of EvidenceFrameLayout - pass real rows through its `items…` slot. */
export interface EvidenceFrameLayoutChatlineItemProps {
    captionChatterTxt?: string;
    captionMsgTxt?: string;
    captionTimeTxt?: string;
    layout?: BoxLayout;
}

export const EvidenceFrameLayoutChatlineItem = ({ captionChatterTxt, captionMsgTxt, captionTimeTxt, layout }: EvidenceFrameLayoutChatlineItemProps) => {
    return (
        <Region
            name="chatline"
            layout={{ width: 420, height: 41, flexShrink: 0, ...layout }}
        >
            <Region
                name="time_txt"
                layout={{ position: 'absolute', left: 0, width: 33, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTimeTxt ?? '18:30'}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <Region
                name="chatter_txt"
                layout={{ position: 'absolute', left: 40, width: 95, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionChatterTxt ?? 'ROBIN_WAN_PERSI'}
            </Region>
            <Region
                name="msg_txt"
                layout={{ position: 'absolute', left: 140, width: 210, top: 0, height: 65, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionMsgTxt ?? 'Sharing your password or personal details online is dangerous. The moderators might monitor these conversations for your safety.'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 210 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `evidence_list` of EvidenceFrameLayout - configured through the parent's `evidenceList` prop. */
export interface EvidenceFrameLayoutEvidenceListProps {
    captionText?: string;
    itemsEvidenceList?: ReactNode;
    layout?: BoxLayout;
    onBtnHeaderAction?: () => void;
    onBtnHeaderAction2?: () => void;
}

export const EvidenceFrameLayoutEvidenceList = ({ captionText, itemsEvidenceList, layout, onBtnHeaderAction, onBtnHeaderAction2 }: EvidenceFrameLayoutEvidenceListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, right: 27, top: 0, bottom: 3, ...layout }}
        >
            <Region
                name="evidence_list"
                backgroundColor="#418db0"
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                {itemsEvidenceList ?? (
                    <EvidenceFrameLayoutChatlineItem />
                )}
                <Region
                    backgroundColor="#418db0"
                    layout={{ width: 450, height: 21, flexShrink: 0 }}
                >
                    <Region
                        name="text"
                        layout={{ position: 'absolute', left: 0, width: 57, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        backgroundColor="#418db0"
                    >
                        <ThemeText
                            text={captionText ?? 'Context'}
                            textStyle="text-style-u-headline-small"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <Button
                        variant="0"
                        name="btnHeaderAction"
                        onPointerTap={onBtnHeaderAction}
                        layout={{ position: 'absolute', left: 340, width: 110, top: 0, height: 22, minWidth: 110, maxWidth: 110 }}
                    >
                        Room tool
                    </Button>
                    <Button
                        variant="0"
                        name="btnHeaderAction2"
                        onPointerTap={onBtnHeaderAction2}
                        layout={{ position: 'absolute', left: 227, width: 110, top: 0, height: 22, minWidth: 110, maxWidth: 110 }}
                    >
                        Open thread
                    </Button>
                </Region>
            </Region>
        </ScrollArea>
    );
};

/** Named region `chat_cont` of EvidenceFrameLayout - configured through the parent's `chatCont` prop. */
export interface EvidenceFrameLayoutChatContProps {
    evidenceList?: EvidenceFrameLayoutEvidenceListProps;
    layout?: BoxLayout;
}

export const EvidenceFrameLayoutChatCont = ({ evidenceList, layout }: EvidenceFrameLayoutChatContProps) => {
    return (
        <Region
            name="chat_cont"
            backgroundColor="#4184b0"
            layout={{ position: 'absolute', left: 0, right: 10, top: 0, bottom: 32, ...layout }}
        >
            <EvidenceFrameLayoutEvidenceList {...evidenceList} />
            {/* <scrollbar_vertical> for evidence_list - rendered by that list's ScrollArea */}
        </Region>
    );
};
