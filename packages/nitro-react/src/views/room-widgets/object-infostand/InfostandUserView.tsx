import { ChangeMottoComposer } from "@nitrodevco/nitro-shared";
import { KeyboardEvent, useEffect, useState } from "react";

import { AvatarImage, useObjectInfostandContext } from "#base/components";
import { useWebSocketContext } from "#base/context";
import { useConfigValue, useRoomUserData } from "#base/hooks";
import { useLocalizationStore } from "#base/stores";
import { Border, CloseButton, NitroIcon } from "#base/theme";

export const InfostandUserView = () => {
    const { objectData, onClose } = useObjectInfostandContext();
    const { objectId } = objectData;
    const userData = useRoomUserData(objectId)!;
    const [isEditingMotto, setIsEditingMotto] = useState<boolean>(false);
    const [motto, setMotto] = useState<string>(userData?.motto ?? '');
    const mottoMaxLength = useConfigValue<number>('motto.max.length', 38) ?? 38;
    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);
    const { send } = useWebSocketContext();

    const onMottoKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        event.stopPropagation();

        switch (event.key) {
            case 'Enter': {
                if (!isEditingMotto || (motto.length > mottoMaxLength)) return;

                send(new ChangeMottoComposer({ text: motto }));

                setIsEditingMotto(false);

                return;
            }
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsEditingMotto(false);

        return () => setIsEditingMotto(false);
    }, [objectData]);

    if (!userData) return null;

    // 666666

    return (
        <div className="flex flex-col items-end gap-2">
            <Border variant="1" className="infostand-container">
                <div className="infostand-header">
                    <div className="flex grow gap-1.25 items-center leading-0">
                        <NitroIcon icon="icon-profile-house" />
                        {userData.name}
                    </div>
                    <CloseButton variant="1" className="infostand-close shrink-0" onClick={onClose} />
                </div>
                <hr className="infostand-separator" />
                <div className="flex w-full gap-2">
                    <Border variant="0" className="infostand-avatar-container" tintColor="#666666">
                        <AvatarImage figure={userData.figure} gender={userData.gender} direction={4} />
                    </Border>
                    <div className="flex flex-col w-full gap-1">
                        <div className="flex size-full gap-1">
                            <div className="w-10.5 h-10.5 bg-black"></div>
                            <div className="w-10.5 h-10.5 bg-black"></div>
                        </div>
                        <div className="flex size-full gap-1">
                            <div className="w-10.5 h-10.5 bg-black"></div>
                            <div className="w-10.5 h-10.5 bg-black"></div>
                        </div>
                        <div className="flex size-full gap-1">
                            <div className="w-10.5 h-10.5 bg-black"></div>
                            <div className="w-10.5 h-10.5 bg-black"></div>
                        </div>
                    </div>
                </div>
                <hr className="infostand-separator" />
                <Border variant="0" className="infostand-motto-container" tintColor="#666666">
                    {!userData.isOwnUser && <p className="text-[9px] text-white">{motto.length === 0 ? getLocalizationValue('infostand.motto.change') : motto}</p>}
                    {userData.isOwnUser && <>
                        <NitroIcon icon="pencil-icon" className="cursor-pointer shrink-0" onClick={e => setIsEditingMotto(true)} />
                        {!isEditingMotto && <p className="text-[9px] text-white font-goldfish flex-1 min-w-0 overflow-hidden wrap-break-word">{motto}</p>}
                        {isEditingMotto && <input type="text" className="p-0 border-0 size-full text-[9px] flex-1 min-w-0" maxLength={mottoMaxLength} value={motto} onChange={e => setMotto(e.target.value)} onKeyDown={onMottoKeyDown} autoFocus={true} />}
                    </>}
                </Border>
                <hr className="infostand-separator" />
                <div className="flex w-full">
                    <p className="text-[9px] text-white font-goldfish-bold">{getLocalizationValue('infostand.text.achievement_score')}<br />{userData.achievementScore}</p>
                </div>
            </Border>
        </div>
    );
}