import { TurboClientModulesMessage, TurboPluginMessagesMessage, TurboServerCapabilitiesMessage } from '@nitrodevco/nitro-packets';

import { clearClientModuleWebSession, setClientExtensionReportConnection, stopClientModules, stopPluginMessages, syncClientModules, syncPluginMessages } from '#base/commands';
import { TURBO_CLIENT_MESSAGES_CAPABILITY, TURBO_CLIENT_MODULES_CAPABILITY } from '#base/context/client-modules';
import { WebSocketConnection } from '#base/context/communication';
import { userStore } from '#base/context/user';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * Not Flash's: Turbo's `client.modules` extension - the client modules the server's plugins ship,
 * run by `syncClientModules`. The set is taken only once the server has accepted the extension, so a
 * server that uses the header for something else cannot make the client run code; one that declines
 * it stops whatever ran. The modules stop with the connection. Beside them, `client.messages`: the
 * plugins' named messages, which modules read and write by name (`pluginMessages`). A server that
 * accepted the extension hears what this client found running them (`clientExtensionReports`).
 */
export const registerClientModuleHandlers = (connection: WebSocketConnection) => {
    const unsubscribe = subscribeAll(connection.subscribe, [
        on(TurboServerCapabilitiesMessage, (data) => {
            const modules = data.capabilities.some(capability => capability.name === TURBO_CLIENT_MODULES_CAPABILITY);

            // What this client finds running the modules and patches goes to the server's inspector.
            setClientExtensionReportConnection(modules ? connection : undefined);

            if (!modules) void stopClientModules();
            if (!data.capabilities.some(capability => capability.name === TURBO_CLIENT_MESSAGES_CAPABILITY)) stopPluginMessages();
        }),

        on(TurboPluginMessagesMessage, (data) => {
            if (userStore.getState().turboCapabilities.has(TURBO_CLIENT_MESSAGES_CAPABILITY)) syncPluginMessages(connection, data.messages);
        }),

        on(TurboClientModulesMessage, (data) => {
            if (userStore.getState().turboCapabilities.has(TURBO_CLIENT_MODULES_CAPABILITY)) void syncClientModules(connection, data.modules);
        }),
    ]);

    return () => {
        unsubscribe();
        setClientExtensionReportConnection(undefined);
        clearClientModuleWebSession();
        void stopClientModules();
        stopPluginMessages();
    };
};
