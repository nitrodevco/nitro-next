import { SendRoomInviteComposer } from "@nitrodevco/nitro-packets";
import { useState } from "react";

import { useFriendsSelectors, useIsWindowVisible, useSystemActions, useTranslation, useWebSocketContext } from "#base/context";
import { Border, Button, Frame } from "#base/theme";

export const FriendListRoomInviteView = () => {
    const isVisible = useIsWindowVisible('friendlist_invite');
    const { toggleWindow } = useSystemActions();
    const { send } = useWebSocketContext();
    const { selectedFriendIds } = useFriendsSelectors();

    const [message, setMessage] = useState<string>('');

    const t = useTranslation();

    const sendRoomInvite = () => {
        if (selectedFriendIds.length < 1 || !message?.length || message.length > 255) return;

        send(new SendRoomInviteComposer({
            message,
            playerIds: selectedFriendIds
        }));

        toggleWindow('friendlist_invite');
    }

    if (!isVisible) return null;

    return (
        <Frame variant="0" id="friendlist-room-invite" className="w-52.75 h-43.75" caption={t('friendlist.invite.title')} onClose={() => toggleWindow('friendlist_invite')}>
            <Border className="h-29 px-2.25 py-1">
                <div className="block overflow-hidden whitespace-nowrap text-[0.7rem] mb-0.5">{t('friendlist.invite.summary', '', { 'count': selectedFriendIds.length.toString() })}</div>
                <textarea value={message} name="room_invite_text" className="block border p-0.5 border-black text-[0.57rem] w-full font-goldfish resize-none h-17.5 scrollbar-none [&::-webkit-scrollbar]:hidden" onChange={e => setMessage(e.target.value)} />
                <div className="block mt-px overflow-hidden whitespace-nowrap text-[0.7rem]">{t('friendlist.invite.note')}</div>
            </Border>
            <div className="flex justify-between items-center mt-0.75">
                <Button className="h-5.5" onClick={sendRoomInvite}>{t('friendlist.invite.send')}</Button>
                <Button className="h-5.5" onClick={() => toggleWindow('friendlist_invite')}>{t('generic.cancel')}</Button>
            </div>
        </Frame>
    );
}