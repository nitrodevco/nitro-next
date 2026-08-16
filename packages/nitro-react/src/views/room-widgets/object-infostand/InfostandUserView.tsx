import { ISimpleRoomObjectData } from "@nitrodevco/nitro-api";
import { ChangeMottoComposer } from "@nitrodevco/nitro-packets";
import { KeyboardEvent, useEffect, useState } from "react";

import { AvatarImage } from "#base/components/AvatarImage";
import { useConfigValue, useTranslation, useWebSocketContext } from "#base/context";
import { useRoomUserData } from "#base/hooks";
import { Border, CloseButton, NitroIcon } from "#base/theme";

type InfostandUserViewProps = {
    objectData: ISimpleRoomObjectData;
    onClose: () => void;
}

export const InfostandUserView = (props: InfostandUserViewProps) => {
    const { objectData, onClose } = props;
    const { objectId, category } = objectData;
    const userData = useRoomUserData(objectId)!;
    const [isEditingMotto, setIsEditingMotto] = useState<boolean>(false);
    const [motto, setMotto] = useState<string>(userData?.motto ?? '');
    const mottoMaxLength = useConfigValue<number>('motto.max.length') ?? 38;
    const t = useTranslation();
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
                    <div className="flex grow gap-1.25 items-center">
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
                    {!userData.isOwnUser && <p className="text-[9px] text-white">{motto.length === 0 ? t('infostand.motto.change') : motto}</p>}
                    {userData.isOwnUser && <>
                        <NitroIcon icon="pencil-icon" className="cursor-pointer shrink-0" onClick={e => setIsEditingMotto(true)} />
                        {!isEditingMotto && <p className="text-[9px] text-white font-goldfish flex-1 min-w-0 overflow-hidden wrap-break-word">{motto}</p>}
                        {isEditingMotto && <input type="text" className="p-0 border-0 size-full text-[9px] flex-1 min-w-0" maxLength={mottoMaxLength} value={motto} onChange={e => setMotto(e.target.value)} onKeyDown={onMottoKeyDown} autoFocus={true} />}
                    </>}
                </Border>
                <hr className="infostand-separator" />
                <div className="flex w-full">
                    <p className="text-[9px] text-white font-goldfish-bold">{t('infostand.text.achievement_score')}<br />{userData.achievementScore}</p>
                </div>
            </Border>
        </div>
    );
}