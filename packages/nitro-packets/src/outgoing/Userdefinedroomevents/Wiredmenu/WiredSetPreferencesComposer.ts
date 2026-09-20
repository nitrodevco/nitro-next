// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/** The wired preferences, under the names `AccountPreferencesEventMessage` delivers them by. */
export type WiredSetPreferencesComposerType = {
    /** Show the wired menu button in the room tools. */
    wiredMenuButton: boolean;
    /** Show the inspect button on furni and user info. */
    wiredInspectButton: boolean;
    playTestMode: boolean;
    wiredWhisperDisabled: boolean;
    showAllNotifications: boolean;
    /** The wired editor skin, `AccountPreferencesEventMessage.wiredUIStyle`. */
    wiredUIStyle: string;
};

/**
 * Flash `WiredSetPreferencesMessageComposer`, sent by `WiredMenuController.sendPreferences`. Seven
 * values for six arguments: between `playTestMode` and `wiredWhisperDisabled` the constructor
 * pushes a literal 0 - the slot `AccountPreferencesEventMessage.variableSyntaxMode` comes back in,
 * which this client has no setting for. The server answers with a fresh `AccountPreferencesEventMessage`.
 */
export class WiredSetPreferencesComposer implements IOutgoingPacket<WiredSetPreferencesComposerType> {
    public constructor(private params: WiredSetPreferencesComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.wiredMenuButton,
            this.params.wiredInspectButton,
            this.params.playTestMode,
            0,
            this.params.wiredWhisperDisabled,
            this.params.showAllNotifications,
            this.params.wiredUIStyle,
        ];
    }
}
