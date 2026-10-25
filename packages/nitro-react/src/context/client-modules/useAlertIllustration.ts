import { NitroLogger } from '@nitrodevco/nitro-api';

import { ClientModuleAlert, ClientModuleAlertIllustration } from './store';
import { useClientModulesStore } from './useClientModulesStore';

/**
 * Not Flash's: an alert's picture once the client modules' illustration hooks (`notifications.setIllustration`)
 * have had it, in the order they were set, each shown what the one before it left. A hook that throws
 * leaves the picture as it was.
 */
export const resolveAlertIllustration = (hooks: ClientModuleAlertIllustration[], alert: ClientModuleAlert): string | undefined => hooks.reduce<string | undefined>((illustration, hook) => {
    try {
        return hook.resolve({ ...alert, illustration }) ?? illustration;
    } catch (error) {
        NitroLogger.error('ClientModules', hook.moduleKey, error);

        return illustration;
    }
}, alert.illustration);

/** `resolveAlertIllustration` for an open alert: it changes as modules set or take out their hooks. */
export const useAlertIllustration = (alert: ClientModuleAlert): string | undefined => {
    const hooks = useClientModulesStore(x => x.alertIllustrations);

    return hooks.length ? resolveAlertIllustration(hooks, alert) : alert.illustration;
};
