import { BoxLayout, Region } from '#base/theme';

import { EvidenceFrameLayoutEvidenceList, EvidenceFrameLayoutEvidenceListProps } from './EvidenceFrameLayoutEvidenceList';

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
            layout={{ position: 'absolute', left: 0, right: -2, top: 0, bottom: -9, ...layout }}
        >
            <EvidenceFrameLayoutEvidenceList {...evidenceList} />
            {/* <scrollbar_vertical> for evidence_list - rendered by that list's ScrollArea */}
        </Region>
    );
};
