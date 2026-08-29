import { BoxLayout, Frame } from '#base/theme';

import { EvidenceFrameLayoutChatCont, EvidenceFrameLayoutChatContProps } from './EvidenceFrameLayoutChatCont';

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
