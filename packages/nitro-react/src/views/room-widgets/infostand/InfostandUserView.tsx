import type { IRoomUserData } from "@nitrodevco/nitro-api";

import { AvatarImage } from "#base/components/AvatarImage";

type InfostandUserViewProps = {
    data: IRoomUserData | undefined;
    onClose: () => void;
}

export const InfostandUserView = (props: InfostandUserViewProps) => {
    if (!props.data) return null;

    return (
        <>
            <div className="flex items-center justify-between w-full p-1 gap-1 text-white goldfish-bold text-[9px] border-b-[0.5px] border-black">
                {props.data.name}
                <i className="[background:var(--infostand-close-bg-image)] w-[13px] h-[13px] cursor-pointer" onClick={e => props.onClose()} />
            </div>
            <div className="flex-1 gap-1 p-1 size-full">
                <div className="flex items-center justify-center w-full max-w-[68px] h-[150px] rounded-sm [border-image-source:var(--infostand-bg-thumb)] [border-image-slice:6_6_6_6_fill] [border-image-width:6px] overflow-hidden">
                    <AvatarImage figure={props.data.figure} gender={props.data.gender} direction={4} />
                </div>
            </div>
        </>
    );
}