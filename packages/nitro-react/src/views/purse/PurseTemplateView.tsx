import { useState } from 'react';

import { openClientLink, openClubCenter, openCreditsHabblet, rebootClient } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useEarningsStore } from '#base/context/earnings';
import { useSystemActions } from '#base/context/system';
import { useUserStore } from '#base/context/user';
import { Box, TemplateWindow } from '#base/theme';

import { PurseSettingsList } from './PurseSettingsList';
import { usePurseClubText } from './usePurseClubText';

/**
 * The purse in the top right corner - `toolbar/extensions/PurseAreaExtension`, drawn from its Flash
 * template (`habbo-toolbar-com/purse_xml`, `grid_purse`): the currency counts, the club days
 * (`PurseClubArea`, see `usePurseClubText`) whose join button opens the club centre, the earnings
 * button opening the vault with its unseen dot, and the settings button dropping the settings list.
 * The counts open the web shop and the duckets' and diamonds' catalogue pages, and the logout button
 * starts the client again. The help button toggles the help window (`toggleWindowVisibility("HELP")`).
 *
 * Every other element - borders, icons, tooltips, the hover style - comes from the template.
 */
export const PurseTemplateView = () => {
    const clubText = usePurseClubText();
    const credits = useUserStore(x => x.credits);
    const activityPoints = useUserStore(x => x.activityPoints);
    const showingIndicator = useEarningsStore(x => x.showingIndicator);
    const { showWindow, toggleWindow } = useSystemActions();
    const { send } = useWebSocketContext();
    const [ settingsVisible, setSettingsVisible ] = useState(false);

    return (
        <>
            {/* `ExtensionView.refreshItemWindow` lifts the grid 5 pixels while the purse is in it; its `spacing` is 2. */}
            <Box layout={{ position: 'relative', marginTop: -5, marginBottom: 2, flexShrink: 0 }}>
                <TemplateWindow
                    id="habbo-toolbar-com/purse_xml"
                    bindings={{
                        diamond_count: { caption: String(activityPoints[5] ?? 0) },
                        credit_count: { caption: String(credits ?? 0) },
                        ducket_count: { caption: String(activityPoints[0] ?? 0) },
                        days: { caption: clubText },
                        // `windowProcedure`: `catalog.openClubCenter()`.
                        hc_join_button: { onPointerTap: () => openClubCenter(send) },
                        earnings_button: { onPointerTap: () => openClientLink(send, 'habboUI/open/vault') },
                        earnings_unseen_indicator: { visible: showingIndicator },
                        settings_button: { onPointerTap: () => setSettingsVisible(visible => !visible) },
                        credit_count_button: { onPointerTap: () => openCreditsHabblet() },
                        ducket_count_button: { onPointerTap: () => showWindow('catalog', { pageName: 'ducket_info' }) },
                        diamond_count_button: { onPointerTap: () => showWindow('catalog', { pageName: 'loyalty_info' }) },
                        // `toolbar.toggleWindowVisibility("HELP")`: `HabboHelp.toggleNewHelpWindow`.
                        help_button: { onPointerTap: () => toggleWindow('help') },
                        // `toolbar.reboot()`.
                        logout_button: { onPointerTap: () => rebootClient() },
                    }}
                />
            </Box>
            {settingsVisible && <PurseSettingsList onClose={() => setSettingsVisible(false)} />}
        </>
    );
};
