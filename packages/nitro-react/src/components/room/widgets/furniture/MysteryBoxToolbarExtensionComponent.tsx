import { useIsInRoom } from '#base/context/room';
import { useConfigActions, useConfigBoolean, useConfigValue } from '#base/context/system';
import { useUserStore } from '#base/context/user';
import { openWebPage } from '#base/utils';
import { MysteryBoxToolbarExtensionView } from '#base/views/room-widgets/furniture/MysteryBoxToolbarExtensionView';

/**
 * Whether the mystery box tracker is docked - `FurnitureContextMenuWidgetHandler.widget`, which
 * builds its `MysteryBoxToolbarExtension` under `mysterybox.tracker.active` when the room UI makes
 * the furniture context menu widget. That widget is reused for every later room, so the extension
 * stays docked until the session ends; `ExtensionView.refreshItemWindow` leaves it out of the column
 * while the landing view shows. Here it shows while a room session is up.
 *
 * Minimising writes `mystery_box_toolbar_extension_minimised` back to the configuration
 * (`setMinimised`'s `setProperty`), so it is remembered for the session; the FAQ link opens
 * `mysterybox.faq.url` (`HabboWebTools.openWebPage`).
 */
export const MysteryBoxToolbarExtensionComponent = () => {
    const active = useConfigBoolean('mysterybox.tracker.active');
    const minimised = useConfigBoolean('mystery_box_toolbar_extension_minimised');
    const faqUrl = useConfigValue<string>('mysterybox.faq.url') ?? '';
    const boxColor = useUserStore(x => x.mysteryBoxColor);
    const keyColor = useUserStore(x => x.mysteryKeyColor);
    const inRoom = useIsInRoom();
    const { setConfigValue } = useConfigActions();

    if (!active || !inRoom) return null;

    return (
        <MysteryBoxToolbarExtensionView
            boxColor={boxColor}
            keyColor={keyColor}
            minimised={minimised}
            faqVisible={faqUrl !== ''}
            onMinimise={value => setConfigValue('mystery_box_toolbar_extension_minimised', value)}
            onFaq={() => openWebPage(faqUrl)}
        />
    );
};
