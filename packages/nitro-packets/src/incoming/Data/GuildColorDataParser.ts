import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** Flash `GuildColorData`: a badge or guild colour the editor offers, its value sent as hex. */
export interface IGuildColorData {
    id: number;
    color: number;
}

export const GuildColorDataParser = (wrapper: IMessageDataWrapper): IGuildColorData => {
    const data: IGuildColorData = {
        id: 0,
        color: 0,
    };

    data.id = wrapper.readInt();
    data.color = parseInt(wrapper.readString(), 16) >>> 0;

    return data;
};
