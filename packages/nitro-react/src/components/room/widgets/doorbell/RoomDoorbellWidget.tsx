import { DoorbellMessage, FlatAccessDeniedMessage, FlatAccessibleMessage, LetUserInComposer } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useTranslation, useWebSocketContext } from '#base/context';
import { useMessageListener } from '#base/hooks';
import { Frame, NitroIcon, ScrollArea } from '#base/theme';

/**
 * DoorbellWidget/DoorbellView — the rights-holder's answer list. Layout doorbell
 * (249x165, frame style 3, margins 6/25/6/7) at (95,55): red ${widgets.doorbell.info}
 * (10,13) 215x32, list container (10,48) 217x82 #EAECE8 with 200px rows + 17px
 * scrollbar. Rows (200x20, #EEEEEE, even rows white): user_name Ubuntu 12 at (3,1),
 * accept region at 155, deny region at 180.
 *
 * A ring is DoorbellMessage with a username; dupes are ignored and past 50 ringers
 * the widget auto-denies. FlatAccessible/FlatAccessDenied with a username mean
 * another rights-holder handled that ringer. The window hides itself when the list
 * empties and the X denies everyone.
 */
export const RoomDoorbellWidget = () => {
    const [users, setUsers] = useState<string[]>([]);
    const { send } = useWebSocketContext();
    const t = useTranslation();

    const answer = (username: string, accepted: boolean) => {
        send(new LetUserInComposer({ username, accepted }));

        setUsers(x => x.filter(y => y !== username));
    };

    useMessageListener(DoorbellMessage, data => {
        if (!data.username || !data.username.length) return;

        setUsers(x => {
            if (x.includes(data.username)) return x;

            if (x.length >= 50) {
                send(new LetUserInComposer({ username: data.username, accepted: false }));

                return x;
            }

            return [...x, data.username];
        });
    });

    useMessageListener(FlatAccessibleMessage, data => {
        if (data.username && data.username.length) setUsers(x => x.filter(y => y !== data.username));
    });

    useMessageListener(FlatAccessDeniedMessage, data => {
        if (data.username && data.username.length) setUsers(x => x.filter(y => y !== data.username));
    });

    if (!users.length) return null;

    const denyAll = () => {
        users.forEach(x => send(new LetUserInComposer({ username: x, accepted: false })));

        setUsers([]);
    };

    return (
        <Frame
            caption={t('widgets.doorbell.title')}
            className="absolute left-23.75 top-13.75 w-62.25 h-41.25"
            id="room-doorbell"
            resizeDirection="none"
            variant="3"
            onClose={denyAll}>
            <div className="relative size-full">
                <span className="absolute left-2.5 top-3.25 block w-53.75 h-8 font-ubuntu text-xs break-words text-[#FF0000]">{t('widgets.doorbell.info')}</span>
                <div className="absolute left-2.5 top-12 w-54.25 h-20.5 bg-[#EAECE8]">
                    <ScrollArea className="w-full h-full" variant="100">
                        {users.map((username, index) => (
                            <div key={username} className={`relative w-50 h-5 ${(index % 2 === 0) ? 'bg-white' : 'bg-[#EEEEEE]'}`}>
                                <span className="absolute left-0.75 top-0.25 font-ubuntu text-xs whitespace-nowrap">{username}</span>
                                <div className="absolute left-38.75 top-1 cursor-pointer" onClick={() => answer(username, true)}>
                                    <NitroIcon icon="icon-accept-check" />
                                </div>
                                <div className="absolute left-45 top-1 cursor-pointer" onClick={() => answer(username, false)}>
                                    <NitroIcon icon="icon-decline-x" />
                                </div>
                            </div>
                        ))}
                    </ScrollArea>
                </div>
            </div>
        </Frame>
    );
}
