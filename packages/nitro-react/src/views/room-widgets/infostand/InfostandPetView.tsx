import type { IRoomPetData } from "@nitrodevco/nitro-api";

type InfostandPetViewProps = {
    data: IRoomPetData | undefined;
    onClose: () => void;
}

export const InfostandPetView = (props: InfostandPetViewProps) => {
    if (!props.data) return null;

    return (
        <div className="infostand-container"></div>
    );
}