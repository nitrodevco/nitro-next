// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper, WiredMovementType } from '@nitrodevco/nitro-api';

import { IWiredFloorMove } from './Data/IWiredFloorMove';
import { IWiredUserDirection } from './Data/IWiredUserDirection';
import { IWiredUserMove } from './Data/IWiredUserMove';
import { IWiredWallMove } from './Data/IWiredWallMove';

export type WiredMovementsMessageType = {
    userMoves: IWiredUserMove[];
    floorMoves: IWiredFloorMove[];
    wallMoves: IWiredWallMove[];
    userDirections: IWiredUserDirection[];
};

export class WiredMovementsMessage implements IIncomingPacket<WiredMovementsMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredMovementsMessageType {
        const parseUserMove = (wrapper: IMessageDataWrapper) => {
            return {
                sourceX: wrapper.readInt(),
                sourceY: wrapper.readInt(),
                targetX: wrapper.readInt(),
                targetY: wrapper.readInt(),
                sourceZ: parseFloat(wrapper.readString()),
                targetZ: parseFloat(wrapper.readString()),
                objectId: wrapper.readInt(),
                moveType: wrapper.readInt(),
                animationTime: wrapper.readInt(),
                bodyRotation: wrapper.readInt(),
                headRotation: wrapper.readInt(),
                // sent only for a jump: a flag, then the power
                jumpPower: wrapper.readBoolean() ? wrapper.readInt() : NaN,
            };
        };

        const parseFloorMove = (wrapper: IMessageDataWrapper) => {
            return {
                sourceX: wrapper.readInt(),
                sourceY: wrapper.readInt(),
                targetX: wrapper.readInt(),
                targetY: wrapper.readInt(),
                sourceZ: parseFloat(wrapper.readString()),
                targetZ: parseFloat(wrapper.readString()),
                objectId: wrapper.readInt(),
                animationTime: wrapper.readInt(),
                rotation: wrapper.readInt(),
                // both optional, each behind its own flag
                overshootingDistance: wrapper.readBoolean() ? wrapper.readInt() : NaN,
                curveStrength: wrapper.readBoolean() ? wrapper.readInt() : NaN,
            };
        };

        const parseWallMove = (wrapper: IMessageDataWrapper) => {
            return {
                objectId: wrapper.readInt(),
                isDirectionRight: wrapper.readBoolean(),
                sourceX: wrapper.readInt(),
                sourceY: wrapper.readInt(),
                sourceOffsetX: wrapper.readInt(),
                sourceOffsetY: wrapper.readInt(),
                targetX: wrapper.readInt(),
                targetY: wrapper.readInt(),
                targetOffsetX: wrapper.readInt(),
                targetOffsetY: wrapper.readInt(),
                animationTime: wrapper.readInt(),
            };
        };

        const parseUserDirection = (wrapper: IMessageDataWrapper) => {
            return {
                objectId: wrapper.readInt(),
                bodyRotation: wrapper.readInt(),
                headRotation: wrapper.readInt(),
            };
        };

        const packet: WiredMovementsMessageType = {
            userMoves: [],
            floorMoves: [],
            wallMoves: [],
            userDirections: [],
        };

        let count = wrapper.readInt();

        while (count > 0) {
            const type: WiredMovementType = wrapper.readInt();

            switch (type) {
                case WiredMovementType.User: {
                    packet.userMoves.push(parseUserMove(wrapper));
                    break;
                }
                case WiredMovementType.FloorItem: {
                    packet.floorMoves.push(parseFloorMove(wrapper));
                    break;
                }
                case WiredMovementType.WallItem: {
                    packet.wallMoves.push(parseWallMove(wrapper));
                    break;
                }
                case WiredMovementType.UserDirection: {
                    packet.userDirections.push(parseUserDirection(wrapper));
                    break;
                }
            }

            count--;
        }

        return packet;
    }
}
