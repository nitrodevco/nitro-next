import { ReactNode } from 'react';

import { BoxLayout, Button, Frame, Region, ScrollArea, ThemeText } from '#base/theme';

/** Generated from `1112_evidence_frame_xml` (layout "chatlog", 480x565) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface EvidenceFrameLayoutProps {
    captionText?: string;
    itemsEvidenceList?: ReactNode;
    layout?: BoxLayout;
    onBtnHeaderAction?: () => void;
    onBtnHeaderAction2?: () => void;
    onClose?: () => void;
}

export const EvidenceFrameLayout = ({ captionText, itemsEvidenceList, layout, onBtnHeaderAction, onBtnHeaderAction2, onClose }: EvidenceFrameLayoutProps) => {
    return (
        <Frame
            variant="0"
            params={98305}
            caption="Chatlog"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 480, height: 565, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="chat_cont"
                    params={2192}
                    backgroundColor="#4184b0"
                    layout={{ position: 'absolute', left: 0, width: 470, top: 0, height: 533 }}
                >
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 0, width: 443, top: 0, height: 530 }}
                    >
                        <Region
                            name="evidence_list"
                            params={2193}
                            backgroundColor="#418db0"
                            layout={{ flexDirection: 'column', width: '100%' }}
                        >
                            {itemsEvidenceList ?? (
                                <EvidenceFrameLayoutChatlineItem />
                            )}
                            <Region
                                params={144}
                                backgroundColor="#418db0"
                                layout={{ width: 450, height: 21, flexShrink: 0 }}
                            >
                                <Region
                                    name="text"
                                    params={17}
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
                                    params={131089}
                                    onPointerTap={onBtnHeaderAction}
                                    layout={{ position: 'absolute', left: 340, width: 110, top: 0, height: 22, minWidth: 110, maxWidth: 110 }}
                                >
                                    Room tool
                                </Button>
                                <Button
                                    variant="0"
                                    name="btnHeaderAction2"
                                    params={131089}
                                    onPointerTap={onBtnHeaderAction2}
                                    layout={{ position: 'absolute', left: 227, width: 110, top: 0, height: 22, minWidth: 110, maxWidth: 110 }}
                                >
                                    Open thread
                                </Button>
                            </Region>
                        </Region>
                    </ScrollArea>
                </Region>
            </Region>
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
            params={144}
            layout={{ width: 420, height: 41, flexShrink: 0, ...layout }}
        >
            <Region
                name="time_txt"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 33, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTimeTxt ?? '18:30'}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <Region
                name="chatter_txt"
                params={17}
                layout={{ position: 'absolute', left: 40, width: 95, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionChatterTxt ?? 'ROBIN_WAN_PERSI'} />
            </Region>
            <Region
                name="msg_txt"
                params={16}
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
