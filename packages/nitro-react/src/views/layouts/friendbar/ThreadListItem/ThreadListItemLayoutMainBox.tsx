import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeText } from '#base/theme';

import { ThreadListItemLayoutDeleteThreadItem } from './ThreadListItemLayoutDeleteThreadItem';
import { ThreadListItemLayoutReportThreadItem } from './ThreadListItemLayoutReportThreadItem';
import { ThreadListItemLayoutThreadLockItem } from './ThreadListItemLayoutThreadLockItem';
import { ThreadListItemLayoutThreadPinItem } from './ThreadListItemLayoutThreadPinItem';

/** Named region `main_box` of ThreadListItemLayout - configured through the parent's `mainBox` prop. */
export interface ThreadListItemLayoutMainBoxProps {
    captionDetails?: string;
    captionHeader?: string;
    captionMessages1?: string;
    captionMessages2?: string;
    itemsInfoButtons?: ReactNode;
    itemsModButtons?: ReactNode;
    layout?: BoxLayout;
    onButtonContainer?: () => void;
    onHeaderRegion?: () => void;
    onUnreadRegion?: () => void;
    unreadRegion?: ReactNode;
}

export const ThreadListItemLayoutMainBox = ({ captionDetails, captionHeader, captionMessages1, captionMessages2, itemsInfoButtons, itemsModButtons, layout, onButtonContainer, onHeaderRegion, onUnreadRegion, unreadRegion }: ThreadListItemLayoutMainBoxProps) => {
    return (
        <Region
            name="main_box"
            layout={{ position: 'absolute', left: 0, width: 600, top: 0, height: 40, ...layout }}
        >
            <Region
                name="left_button_container"
                layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 40 }}
            >
                <Region
                    name="info_buttons"
                    layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 40, flexDirection: 'column' }}
                >
                    {itemsInfoButtons ?? (
                        <>
                            <ThreadListItemLayoutThreadLockItem />
                            <ThreadListItemLayoutThreadPinItem />
                        </>
                    )}
                </Region>
            </Region>
            <Region
                name="texts_container"
                backgroundColor="#eefeff"
                layout={{ position: 'absolute', left: 21, width: 387, top: 0, height: 40 }}
            >
                <Region
                    name="header_region"
                    onPointerTap={onHeaderRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 280, top: 0, height: 17 }}
                >
                    <Region
                        name="header"
                        layout={{ position: 'absolute', left: 0, width: 117, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        {captionHeader ?? 'Some thread header'}
                    </Region>
                </Region>
                <Region
                    name="details"
                    layout={{ position: 'absolute', left: 0, width: 460, top: 16, height: 16, overflow: 'hidden', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionDetails ?? 'By author LongLongLongName 7 days ago, last message by LongLongLongName 30 seconds ago'}
                </Region>
            </Region>
            <Region
                name="unread_texts_container"
                layout={{ position: 'absolute', left: 409, width: 140, top: 0, height: 40 }}
            >
                <Region
                    name="unread_region"
                    onPointerTap={onUnreadRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 140, top: 0, height: 40 }}
                >
                    {unreadRegion}
                </Region>
                <Region
                    name="messages1"
                    layout={{ position: 'absolute', left: 0, width: 140, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionMessages1 ?? '100 messages'}
                        textStyle="text-style-regular"
                    />
                </Region>
                <Region
                    name="messages2"
                    layout={{ position: 'absolute', left: 0, width: 140, top: 15, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionMessages2 ?? '12 new'}
                        textStyle="text-style-regular"
                    />
                </Region>
            </Region>
            <Region
                name="button_container"
                onPointerTap={onButtonContainer}
                cursor="pointer"
                layout={{ position: 'absolute', left: 550, width: 50, top: 0, height: 40 }}
            >
                <Region
                    name="mod_buttons"
                    layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 40, flexDirection: 'row' }}
                >
                    {itemsModButtons ?? (
                        <>
                            <ThreadListItemLayoutDeleteThreadItem />
                            <ThreadListItemLayoutReportThreadItem />
                        </>
                    )}
                </Region>
            </Region>
        </Region>
    );
};
