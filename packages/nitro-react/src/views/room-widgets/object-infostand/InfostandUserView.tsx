import { ISimpleRoomObjectData } from "@nitrodevco/nitro-api";
import { ChangeMottoComposer } from "@nitrodevco/nitro-shared";
import { KeyboardEvent, useEffect, useState } from "react";

import { NitroIcon } from "#base/components";
import { AvatarImage } from "#base/components/AvatarImage";
import { useWebSocketContext } from "#base/context";
import { useConfigValue, useRoomUserData } from "#base/hooks";
import { useLocalizationStore } from "#base/stores";

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

    return (
        <div className="flex flex-col items-end gap-2">
            <div className="infostand-container">
                <div className="infostand-header">
                    <div className="flex items-center gap-2">
                        <NitroIcon icon="icon-profile-house" />
                        {userData.name}
                    </div>
                    <i className="infostand-close" onClick={onClose} />
                </div>
                <hr className="infostand-separator" />
                <div className="flex-1 gap-1 p-1 size-full">
                    <div className="infostand-avatar-container">
                        <AvatarImage figure={userData.figure} gender={userData.gender} direction={4} />
                    </div>
                </div>
                <hr className="infostand-separator" />
                <div className="flex w-full p-1">
                    <div className="infostand-motto-container">
                        {!userData.isOwnUser && <p className="text-[9px] text-white">{motto.length === 0 ? getLocalizationValue('infostand.motto.change') : motto}</p>}
                        {userData.isOwnUser && <>
                            <NitroIcon icon="pencil-icon" cursor="pointer" className="shrink-0" onClick={e => setIsEditingMotto(true)} />
                            {!isEditingMotto && <p className="text-[9px] text-white font-goldfish flex-1 min-w-0 overflow-hidden wrap-break-word">{motto}</p>}
                            {isEditingMotto && <input type="text" className="p-0 border-0 size-full text-[9px] flex-1 min-w-0" maxLength={mottoMaxLength} value={motto} onChange={e => setMotto(e.target.value)} onKeyDown={onMottoKeyDown} autoFocus={true} />}
                        </>}
                    </div>
                </div>
                <hr className="infostand-separator" />
                <div className="flex w-full gap-1 p-1">
                    <p className="text-[9px] text-white font-goldfish-bold">{getLocalizationValue('infostand.text.achievement_score')}<br />{userData.achievementScore}</p>
                </div>
            </div>
        </div>
    );
}