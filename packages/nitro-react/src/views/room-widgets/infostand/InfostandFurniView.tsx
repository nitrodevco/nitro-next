import type { IFurnitureData } from "@nitrodevco/nitro-api";

import { FurnitureImage } from "#base/components/FurnitureImage";

type InfostandFurniViewProps = {
    data: IFurnitureData | undefined;
    onClose: () => void;
}

export const InfostandFurniView = (props: InfostandFurniViewProps) => {
    if (!props.data) return null;

    return (
        <>
            <div className="flex items-center justify-between w-full px-2 py-1 gap-1 text-white goldfish-bold text-[9px] border-b-[0.5px] border-black">
                {props.data.localizedName}
                <i className="[background:var(--infostand-close-bg-image)] w-[13px] h-[13px] cursor-pointer" onClick={e => props.onClose()} />
            </div>
            <div className="flex-1 gap-1 p-1 size-full">
                <div className="flex items-center justify-center w-full overflow-hidden">
                    <FurnitureImage type={props.data.className} colorIndex={props.data.colorIndex} />
                </div>
            </div>
        </>
    );
}