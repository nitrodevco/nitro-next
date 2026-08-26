import { OpenFlatConnectionComposer } from '@nitrodevco/nitro-packets';
import { useEffect, useRef } from 'react';

import { useNavigatorActions, useNavigatorSelectors, useTranslation, useWebSocketContext } from '#base/context';
import { Button, Frame } from '#base/theme';

/**
 * GuestRoomPasswordInput — layout passwd_input (237x217, frame style 3, margins
 * 6/25/6/7) at (100,74): room_name (10,16) Ubuntu 12 bold, info (10,35) 205x68,
 * ${navigator.password.enter} label (10,107), bordered password field (113,107)
 * 100x19, button bar (10,142) 207x34 #EAECE8 with the underlined cancel link
 * (0,5) and the try button (110,3) h28 style 3.
 *
 * Try opens the connection with the typed password and hides the window; a wrong
 * password comes back as GenericError -100002 -> showRetry() re-shows it with
 * ${navigator.password.retryinfo} and a cleared input.
 */
export const NavigatorPasswordView = () => {
    const { passwordPrompt } = useNavigatorSelectors();
    const { hidePasswordWindow, closePasswordPrompt } = useNavigatorActions();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const inputRef = useRef<HTMLInputElement>(null);

    // show() always starts from an empty field — also on the retry pass
    useEffect(() => {
        if (passwordPrompt?.visible && inputRef.current) inputRef.current.value = '';
    }, [passwordPrompt?.visible, passwordPrompt?.retry]);

    if (!passwordPrompt || !passwordPrompt.visible) return null;

    const tryPassword = () => {
        send(new OpenFlatConnectionComposer({
            roomId: passwordPrompt.room.roomId,
            password: inputRef.current?.value ?? '',
            unknown1: -1
        }));

        hidePasswordWindow();
    };

    return (
        <Frame
            caption={t('navigator.password.title')}
            className="absolute left-25 top-18.5 w-59.25 h-54.25"
            id="navigator-password"
            resizeDirection="none"
            variant="3"
            onClose={closePasswordPrompt}>
            <div className="relative size-full">
                <span className="absolute left-2.5 top-4 block font-ubuntu text-xs font-bold whitespace-nowrap">{passwordPrompt.room.name}</span>
                <span className="absolute left-2.5 top-8.75 block w-51.25 h-17 font-ubuntu text-xs break-words">
                    {passwordPrompt.retry ? t('navigator.password.retryinfo') : t('navigator.password.info')}
                </span>
                <span className="absolute left-2.5 top-26.75 block w-24.25 font-ubuntu text-xs">{t('navigator.password.enter')}</span>
                <input
                    ref={inputRef}
                    className="absolute left-28.25 top-26.75 w-25 h-4.75 bg-white border border-black font-ubuntu text-xs px-0.75 outline-none"
                    type="password" />
                <div className="absolute left-2.5 top-35.5 w-51.75 h-8.5 bg-[#EAECE8]">
                    <div className="absolute left-0 top-1.25 w-20.75 h-6.5 flex items-center cursor-pointer" onClick={closePasswordPrompt}>
                        <span className="font-ubuntu text-xs underline">{t('generic.cancel')}</span>
                    </div>
                    <Button className="absolute left-27.5 top-0.75 h-7" variant="3" onClick={tryPassword}>
                        {t('navigator.password.button.try')}
                    </Button>
                </div>
            </div>
        </Frame>
    );
}
