import { ISimpleRoomObjectData } from '@nitrodevco/nitro-api';

export interface InfostandBotViewPixiProps {
    objectData: ISimpleRoomObjectData;
    onClose: () => void;
}

/**
 * Pixi port of views/room-widgets/object-infostand/InfostandBotView.tsx - DOM's own source is
 * an empty stub (never actually rendered either: RoomObjectInfostandWidget.tsx routes every Bot
 * case to InfostandUserView instead), ported at the same stub fidelity.
 */
export const InfostandBotViewPixi = (_props: InfostandBotViewPixiProps) => null;
