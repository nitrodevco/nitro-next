/**
 * The purse in the preview host's design window, drawn by the game's own `PurseTemplateView` with sample
 * currencies - credits, duckets, diamonds - and a club subscription or none by the state, as
 * `CreditBalance`, `ActivityPointNotification` and `ScrSendUserInfo` would fill them. Nothing is sent.
 * Not a Flash feature.
 */
import { useEffect } from 'react';

import { userStore } from '#base/context/user';
import { Box } from '#base/theme';
import { PurseTemplateView } from '#base/views/purse/PurseTemplateView';

import { designState, PURSE_WINDOW } from './designStates';

/** Activity point types: duckets (0) and diamonds (5). */
const ACTIVITY_POINTS = { 0: 1250, 5: 75 };

export const DesignPurseView = ({ state }: { state: string }) => {
    useEffect(() => {
        const own = userStore.getState();

        return () => userStore.setState(own, true);
    }, []);

    useEffect(() => {
        const club = designState(PURSE_WINDOW, state)?.tab === 'club';

        userStore.setState({
            credits: 3820,
            activityPoints: ACTIVITY_POINTS,
            clubSubscription: { clubDays: club ? 23 : 0, clubPeriods: club ? 2 : 0, isVip: club, pastClubDays: club ? 400 : 0, pastVipDays: club ? 400 : 0, isExpiring: false, minutesUntilExpiration: club ? 33120 : 0, minutesSinceLastModified: 0 },
        });
    }, [ state ]);

    // `extension_grid`'s place (`MainView`): top right, the purse's -38 taken in as padding.
    return (
        <Box layout={{ position: 'absolute', top: 0, right: 0, marginRight: 3, width: 230, paddingLeft: 38, flexDirection: 'column', alignItems: 'flex-start' }}>
            <PurseTemplateView />
        </Box>
    );
};
