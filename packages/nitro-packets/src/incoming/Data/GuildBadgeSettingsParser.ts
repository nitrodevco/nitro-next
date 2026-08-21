import type { IMessageDataWrapper } from "@nitrodevco/nitro-api";

export interface IGuildBadgeSettings {
    partId: number;
    colorId: number;
    position: number;
}

export const GuildBadgeSettingsParser = (wrapper: IMessageDataWrapper): IGuildBadgeSettings => {
    const data: IGuildBadgeSettings = {
        partId: 0,
        colorId: 0,
        position: 0,
    };

    data.partId = wrapper.readInt();
    data.colorId = wrapper.readInt();
    data.position = wrapper.readInt();

    return data;
}
