import { useState } from 'react';

import { openClientLink, openClubCenter, openCreditsHabblet, rebootClient } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useEarningsStore } from '#base/context/earnings';
import { useHintActions } from '#base/context/hints';
import { useWindowActions } from '#base/context/system';
import { useOwnCredits, useUserStore } from '#base/context/user';
import { useHintTarget } from '#base/hooks';
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
 * The credit count is the `credit_count` hint target.
 *
 * Every other element - borders, icons, tooltips, the hover style - comes from the template.
 */
export const PurseTemplateView = () => {
    const clubText = usePurseClubText();
    const credits = useOwnCredits();
    const activityPoints = useUserStore(x => x.activityPoints);
    const showingIndicator = useEarningsStore(x => x.showingIndicator);
    const { showWindow, toggleWindow } = useWindowActions();
    const { send } = useWebSocketContext();
    const [ settingsVisible, setSettingsVisible ] = useState(false);
    const creditCountHintTarget = useHintTarget('credit_count');
    const { hideMatchingHint } = useHintActions();

    return (
        <>
            {/*
              * `ExtensionView.refreshItemWindow` lifts the grid 5 pixels while the purse is in it; its `spacing` is 2.
              * `purse.xml` puts the 230 wide purse at x -38 of the 192 wide grid, so it ends at the grid's right edge.
              */}
            <Box layout={{ position: 'relative', marginTop: -5, marginBottom: 2, marginLeft: -38, flexShrink: 0 }}>
                <TemplateWindow
                    id="habbo-toolbar-com/purse_xml"
                    bindings={{
                        diamond_count: { caption: String(activityPoints[5] ?? 0) },
                        credit_count: {
                            caption: String(credits ?? 0),
                            // `registerHintWindow("credit_count", ...)`: the count, as wide as its text.
                            children: (
                                <Box
                                    ref={creditCountHintTarget}
                                    pointerTransparent
                                    layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
                                />
                            ),
                        },
                        ducket_count: { caption: String(activityPoints[0] ?? 0) },
                        days: { caption: clubText },
                        // `windowProcedure`: `catalog.openClubCenter()`.
                        hc_join_button: { onPointerTap: () => openClubCenter(send) },
                        earnings_button: { onPointerTap: () => openClientLink(send, 'habboUI/open/vault') },
                        earnings_unseen_indicator: { visible: showingIndicator },
                        settings_button: { onPointerTap: () => setSettingsVisible(visible => !visible) },
                        // `windowProcedure`'s `hideMatchingHint(name)`: a click on the count, which fills the button, takes the arrow off it.
                        credit_count_button: {
                            onPointerTap: () => {
                                hideMatchingHint('credit_count');
                                openCreditsHabblet();
                            },
                        },
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
