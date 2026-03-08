import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(UIFlags: UIFlags): Unknown type 'UIFlags'. Add override mapping.

export type AccountPreferencesEventMessageType = {
  uIVolume: number;
  furniVolume: number;
  traxVolume: number;
  freeFlowChatDisabled: boolean;
  roomInvitesIgnored: boolean;
  roomCameraFollowDisabled: boolean;
  uIFlags: any;
  preferedChatStyle: number;
  wiredMenuButton: boolean;
  wiredInspectButton: boolean;
  playTestMode: boolean;
  variableSyntaxMode: number;
};

export class AccountPreferencesEventMessage implements IIncomingPacket<AccountPreferencesEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): AccountPreferencesEventMessageType
  {

    const packet: AccountPreferencesEventMessageType = {
      uIVolume: wrapper.readInt(),
      furniVolume: wrapper.readInt(),
      traxVolume: wrapper.readInt(),
      freeFlowChatDisabled: wrapper.readBoolean(),
      roomInvitesIgnored: wrapper.readBoolean(),
      roomCameraFollowDisabled: wrapper.readBoolean(),
      uIFlags: undefined as any, // Unknown type 'UIFlags'. Add override mapping.
      preferedChatStyle: wrapper.readInt(),
      wiredMenuButton: wrapper.readBoolean(),
      wiredInspectButton: wrapper.readBoolean(),
      playTestMode: wrapper.readBoolean(),
      variableSyntaxMode: wrapper.readInt(),
    };

    return packet;
  }
}
