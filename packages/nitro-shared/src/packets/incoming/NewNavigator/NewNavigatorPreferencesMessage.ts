import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type NewNavigatorPreferencesMessageType = {
  windowX: number;
  windowY: number;
  windowWidth: number;
  windowHeight: number;
  leftPaneHidden: boolean;
  resultsMode: number;
};

export class NewNavigatorPreferencesMessage implements IIncomingPacket<NewNavigatorPreferencesMessageType>
{
  public parse(wrapper: IMessageDataWrapper): NewNavigatorPreferencesMessageType
  {

    const packet: NewNavigatorPreferencesMessageType = {
      windowX: wrapper.readInt(),
      windowY: wrapper.readInt(),
      windowWidth: wrapper.readInt(),
      windowHeight: wrapper.readInt(),
      leftPaneHidden: wrapper.readBoolean(),
      resultsMode: wrapper.readInt(),
    };

    return packet;
  }
}
