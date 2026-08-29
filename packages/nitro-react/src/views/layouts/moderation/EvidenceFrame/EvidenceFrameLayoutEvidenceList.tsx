import { ReactNode } from 'react';

import { BoxLayout, Button, Region, ScrollArea, ThemeText } from '#base/theme';

import { EvidenceFrameLayoutChatlineItem } from './EvidenceFrameLayoutChatlineItem';

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
