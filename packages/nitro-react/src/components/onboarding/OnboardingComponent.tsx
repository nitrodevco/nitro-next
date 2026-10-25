/**
 * Mounts the new user flow over everything while it runs - `HabboLandingView.onAvatarRendererReady`:
 * the flow is shown when `AuthenticationOK` suggested login action 0 or 1 and has not run yet this
 * session (`isOnboardingRequired`), and the toolbar is hidden under it (`activate`). Its bitmaps are
 * the `onboarding` bundle, fetched when it is needed and let go of once the flow is over, as the
 * loading screen's are.
 */
import { useEffect, useState } from 'react';

import { ONBOARDING_ACTION_NAME_CHANGE, ONBOARDING_ACTION_ROOM_SELECT, useOnboardingActions, useOnboardingStore } from '#base/context/onboarding';
import { loadAssetBundle, unloadAssetBundle } from '#base/utils';
import { OnboardingView } from '#base/views/onboarding/OnboardingView';

const BUNDLE = 'onboarding';

export const OnboardingComponent = () => {
    const loginActions = useOnboardingStore(x => x.loginActions);
    const finished = useOnboardingStore(x => x.finished);
    const { startEditor } = useOnboardingActions();
    const [ bundleLoaded, setBundleLoaded ] = useState(false);
    const required = !finished && (loginActions.includes(ONBOARDING_ACTION_NAME_CHANGE) || loginActions.includes(ONBOARDING_ACTION_ROOM_SELECT));

    useEffect(() => {
        if (!required) return;

        let cancelled = false;

        void loadAssetBundle(BUNDLE).then(() => {
            if (cancelled) return;

            startEditor();
            setBundleLoaded(true);
        });

        return () => {
            cancelled = true;
        };
    }, [ required, startEditor ]);

    useEffect(() => {
        if (finished && bundleLoaded) unloadAssetBundle(BUNDLE);
    }, [ finished, bundleLoaded ]);

    if (!required || !bundleLoaded) return null;

    return <OnboardingView />;
};
