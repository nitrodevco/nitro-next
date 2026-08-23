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
                jumpPower: wrapper.readInt(),
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
            };
        };

        const parseWallMove = (wrapper: IMessageDataWrapper) => {
            return {
                objectId: wrapper.readInt(),
                isDirectionRight: wrapper.readBoolean(),
                sourceX: wrapper.readInt(),
                sourceY: wrapper.readInt(),
                sourceOffsetX: wrapper.readInt(),
                sourceOffsetY: parseFloat(wrapper.readString()),
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
            const type = wrapper.readInt();

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
