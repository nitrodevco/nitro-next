import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { MainWindow_3100LayoutHdr, MainWindow_3100LayoutHdrProps } from './MainWindow_3100LayoutHdr';

/** Named region `conversation` of MainWindow_3100Layout - configured through the parent's `conversation` prop. */
export interface MainWindow_3100LayoutConversationProps {
    hdr?: MainWindow_3100LayoutHdrProps;
    itemsMsgList?: ReactNode;
    layout?: BoxLayout;
}

export const MainWindow_3100LayoutConversation = ({ hdr, itemsMsgList, layout }: MainWindow_3100LayoutConversationProps) => {
    return (
        <Region
            name="conversation"
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 5, right: 5, top: 31, bottom: 5, ...layout }}
        >
            <MainWindow_3100LayoutHdr {...hdr} />
            <Region
                name="list"
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 0, right: 0, top: 32, bottom: 1 }}
            >
                <Region
                    name="msg_list"
                    backgroundColor="#ffffff"
                    layout={{ position: 'absolute', left: 0, right: 22, top: 0, bottom: 0, flexDirection: 'column' }}
                >
                    {itemsMsgList}
                </Region>
                {/* <scrollbar_vertical> for ? - rendered by that list's ScrollArea */}
            </Region>
        </Region>
    );
};
