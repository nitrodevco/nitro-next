// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IRoomDimmerPreset, RoomDimmerPresetParser } from './Data/IRoomDimmerPreset';

export type RoomDimmerPresetsMessageType = {
    selectedPresetId: number;
    presets: IRoomDimmerPreset[];
    isOn: boolean;
    itemId: number;
};

export class RoomDimmerPresetsMessage implements IIncomingPacket<RoomDimmerPresetsMessageType> {
    public parse(wrapper: IMessageDataWrapper): RoomDimmerPresetsMessageType {
        const count = wrapper.readInt();
        const selectedPresetId = wrapper.readInt();
        const presets: IRoomDimmerPreset[] = [];

        for (let i = 0; i < count; i++) presets.push(RoomDimmerPresetParser(wrapper));

        return {
            selectedPresetId,
            presets,
            isOn: wrapper.readBoolean(),
            itemId: wrapper.readInt(),
        };
    }
}
