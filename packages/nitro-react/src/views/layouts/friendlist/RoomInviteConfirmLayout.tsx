import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ButtonThick, Frame, TextInput, ThemeText } from '#base/theme';

/** Generated from `1513_room_invite_confirm_xml` (layout "room_invite_confirm", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RoomInviteConfirmLayoutProps {
    captionInviteNote?: string;
    captionInviteSummary?: string;
    layout?: BoxLayout;
    onCancel?: () => void;
    onClose?: () => void;
    onOk?: () => void;
}

export const RoomInviteConfirmLayout = ({ captionInviteNote, captionInviteSummary, layout, onCancel, onClose, onOk }: RoomInviteConfirmLayoutProps) => {
    const t = useTranslation();
    const [ messageInputValue, setMessageInputValue ] = useState('');

    return (
        <Frame
            variant="0"
            id="alert_%202"
            name="alert_%202"
            caption={t('friendlist.invite.title')}
            onClose={onClose}
            layout={{ width: 211, height: 175, minWidth: 211, minHeight: 175, ...layout }}
        >
            <Border
                variant="0"
                name="border"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 118 }}
            >
                <ThemeText
                    text={captionInviteSummary ?? t('friendlist.invite.summary')}
                    textOptions={{ fill: '#000000' }}
                    name="invite_summary"
                    layout={{ position: 'absolute', left: 10, right: 9, top: 5, height: 20 }}
                />
                <TextInput
                    value={messageInputValue}
                    onChange={setMessageInputValue}
                    textColor="#000000"
                    layout={{ position: 'absolute', left: 10, right: 9, alignSelf: 'center', height: 70 }}
                />
                <ThemeText
                    text={captionInviteNote ?? t('friendlist.invite.note')}
                    textOptions={{ fill: '#000000' }}
                    name="invite_note"
                    layout={{ position: 'absolute', left: 10, right: 9, bottom: 0, height: 20 }}
                />
            </Border>
            <Button
                variant="0"
                name="cancel"
                onPointerTap={onCancel}
                layout={{ position: 'absolute', right: 0, width: 60, bottom: -9, height: 21, minWidth: 60, maxWidth: 60 }}
            >
                {t('generic.cancel')}
            </Button>
            <ButtonThick
                variant="0"
                name="ok"
                onPointerTap={onOk}
                layout={{ position: 'absolute', left: 0, width: 60, bottom: -9, height: 21, minWidth: 60, maxWidth: 60 }}
            >
                {t('friendlist.invite.send')}
            </ButtonThick>
        </Frame>
    );
};
