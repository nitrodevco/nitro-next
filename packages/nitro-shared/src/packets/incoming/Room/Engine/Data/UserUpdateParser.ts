import type { IMessageDataWrapper } from "@nitrodevco/nitro-api";
import { AvatarAction } from "@nitrodevco/nitro-api";

import { IRoomAvatarUpdate } from "./IRoomAvatarUpdate";

export const UserUpdateParser = (wrapper: IMessageDataWrapper): IRoomAvatarUpdate => {
    const item = {
        objectId: wrapper.readInt(),
        sourceX: wrapper.readInt(),
        sourceY: wrapper.readInt(),
        sourceZ: parseFloat(wrapper.readString()),
        headRotation: wrapper.readInt(),
        bodyRotation: wrapper.readInt(),
        targetX: 0,
        targetY: 0,
        targetZ: 0,
        height: 0,
        didMove: false,
        canStandUp: false,
        actions: []
    } as IRoomAvatarUpdate;

    const status = wrapper.readString();

    const parts = status.split('/');

    for (const part of parts) {
        const pieces = part.split(' ');

        if (pieces[0] === '') continue;

        if (pieces.length >= 2) {
            switch (pieces[0]) {
                case AvatarAction.POSTURE_WALK: {
                    const values = pieces[1].split(',');

                    if (values.length >= 3) {
                        item.targetX = parseInt(values[0]);
                        item.targetY = parseInt(values[1]);
                        item.targetZ = parseFloat(values[2]);
                        item.didMove = true;
                    }

                    break;
                }
                case AvatarAction.POSTURE_SIT: {
                    if (pieces.length >= 3) item.canStandUp = (pieces[2] === '1');

                    item.height = parseFloat(pieces[1]);
                    break;
                }
                case AvatarAction.POSTURE_LAY: {
                    item.height = Math.abs(parseFloat(pieces[1]));
                    break;
                }
            }

            item.actions.push({ key: pieces[0], value: pieces[1] });
        }
    }

    return item;
}