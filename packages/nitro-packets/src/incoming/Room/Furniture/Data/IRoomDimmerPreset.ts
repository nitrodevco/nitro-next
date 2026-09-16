import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** One of the dimmer's saved moods: its colour, how bright, and which effect it lights the room with. */
export interface IRoomDimmerPreset {
    id: number;
    type: number;
    /** Already parsed out of the `#RRGGBB` the server sends. */
    color: number;
    light: number;
}

export const RoomDimmerPresetParser = (wrapper: IMessageDataWrapper): IRoomDimmerPreset => {
    const id = wrapper.readInt();
    const type = wrapper.readInt();
    const color = parseInt(wrapper.readString().substring(1), 16);
    const light = wrapper.readInt();

    return { id, type, color, light };
};
