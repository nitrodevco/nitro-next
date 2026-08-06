import { useRoomObjectMenuNameContext } from "#base/components";
import { Bubble } from "#base/theme";

export const InfoBubbleNameView = () => {
    const { nameData } = useRoomObjectMenuNameContext();

    if (!nameData) return null;

    return (
        <Bubble className="flex items-center justify-center min-w-17.5 py-1.5" variant="0" tintColor="#3d3d3d">
            <span className="text-style-u-regular font-[11px] text-white">{nameData.name}</span>
        </Bubble>
    );
}
