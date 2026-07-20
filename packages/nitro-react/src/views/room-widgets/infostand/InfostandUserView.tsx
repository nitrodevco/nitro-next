import { type IRoomUserData } from "@nitrodevco/nitro-api";
import { ChangeMottoComposer } from "@nitrodevco/nitro-shared";
import { KeyboardEvent, useEffect, useState } from "react";

import { AvatarImage } from "#base/components/AvatarImage";
import { useOwnUserId, useWebSocketContext } from "#base/context";
import { useConfigValue } from "#base/hooks";
import { useLocalizationStore } from "#base/stores";

type InfostandUserViewProps = {
    data: IRoomUserData | undefined;
    onClose: () => void;
}

export const InfostandUserView = (props: InfostandUserViewProps) => {
    const [isEditingMotto, setIsEditingMotto] = useState<boolean>(false);
    const [motto, setMotto] = useState<string>('');
    const ownUserId = useOwnUserId();
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
        if (!props.data) return;

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsEditingMotto(false);
        setMotto(props.data?.custom);

        return () => {
            setIsEditingMotto(false);
            setMotto('');
        }
    }, [props.data]);

    if (!props.data) return null;

    const isOwnUser = props.data.webID === ownUserId;

    return (
        <div className="infostand-container">
            <div className="infostand-header">
                <div className="flex items-center gap-2">
                    <i className="cursor-pointer nitro-icon icon-profile-house" />
                    {props.data.name}
                </div>
                <i className="infostand-close" onClick={e => props.onClose()} />
            </div>
            <hr className="infostand-separator" />
            <div className="flex-1 gap-1 p-1 size-full">
                <div className="flex items-center justify-center w-full max-w-17 [border-image-source:var(--infostand-bg-thumb)] [border-image-slice:6_6_6_6_fill] [border-image-width:6px] overflow-hidden">
                    <AvatarImage figure={props.data.figure} gender={props.data.gender} direction={4} />
                </div>
            </div>
            <hr className="infostand-separator" />
            <div className="flex w-full p-1">
                <div className="flex px-2 py-0.5 gap-1 items-center w-full min-h-(--nitro-infostand-motto-height) [border-image-source:var(--infostand-bg-thumb)] [border-image-slice:6_6_6_6_fill] [border-image-width:6px] overflow-hidden font-goldfish">
                    {!isOwnUser && <p className="text-[9px] text-white">{motto.length === 0 ? getLocalizationValue('infostand.motto.change') : motto}</p>}
                    {isOwnUser && <>
                        <i className="cursor-pointer nitro-icon pencil-icon shrink-0" onClick={e => setIsEditingMotto(true)} />
                        {!isEditingMotto && <p className="text-[9px] text-white font-goldfish flex-1 min-w-0 overflow-hidden wrap-break-word">{motto}</p>}
                        {isEditingMotto && <input type="text" className="p-0 border-0 size-full text-[9px] flex-1 min-w-0" maxLength={mottoMaxLength} value={motto} onChange={e => setMotto(e.target.value)} onKeyDown={onMottoKeyDown} autoFocus={true} />}
                    </>}
                </div>
            </div>
            <hr className="infostand-separator" />
            <div className="flex w-full gap-1 p-1">
                <p className="text-[9px] text-white font-goldfish-bold">{getLocalizationValue('infostand.text.achievement_score')}<br />{props.data.activityPoints}</p>
            </div>
        </div>
    );
}