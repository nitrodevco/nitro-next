import { AvatarActionStateType, type IMessageDataWrapper } from "@nitrodevco/nitro-api";

import { IRoomAvatarUpdate } from "./IRoomAvatarUpdate";

export const UserUpdateParser = (wrapper: IMessageDataWrapper): IRoomAvatarUpdate => {
    const item = {
        objectId: wrapper.readInt(),
        sourceX: wrapper.readInt(),
        sourceY: wrapper.readInt(),
        sourceZ: parseFloat(wrapper.readString()),
        headRotation: ((wrapper.readInt() % 8) * 45),
        bodyRotation: ((wrapper.readInt() % 8) * 45),
        jumpingPower: wrapper.readInt(),
        targetX: 0,
        targetY: 0,
        targetZ: 0,
        height: 0,
        didMove: false,
        canStandUp: false,
        skipPositionUpdate: false,
        actions: []
    } as IRoomAvatarUpdate;

    const status = wrapper.readString();

    const parts = status.split('/');

    for (const part of parts) {
        const pieces = part.split(' ');
        const piece = pieces[0];

        if (piece === 'wf') item.skipPositionUpdate = true;

        if (pieces[0] === '') continue;

        if (pieces.length >= 2) {
            switch (piece) {
                case AvatarActionStateType.Walk: {
                    const values = pieces[1].split(',');

                    if (values.length >= 3) {
                        item.targetX = parseInt(values[0]);
                        item.targetY = parseInt(values[1]);
                        item.targetZ = parseFloat(values[2]);
                        item.didMove = true;
                    }

                    break;
                }
                case AvatarActionStateType.Sit: {
                    if (pieces.length >= 3) item.canStandUp = (pieces[2] === '1');

                    item.height = parseFloat(pieces[1]);
                    break;
                }
                case AvatarActionStateType.Lay: {
                    item.height = Math.abs(parseFloat(pieces[1]));
                    break;
                }
            }

            item.actions.push({ key: pieces[0], value: pieces[1] });
        }
    }

    return item;
}