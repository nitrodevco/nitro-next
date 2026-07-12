import type { IRoomUserData } from "@nitrodevco/nitro-api";

type InfostandBotViewProps = {
    data: IRoomUserData | undefined;
    onClose: () => void;
}

export const InfostandBotView = (props: InfostandBotViewProps) => {
    if (!props.data) return null;

    return null;
}