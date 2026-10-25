/**
 * Not Flash's: builds the `ClientModuleApi` one client module is activated with, and keeps what the
 * module added through it, so that `dispose` takes every packet, listener and entry out again when
 * the module stops.
 */
import { IMessageDataWrapper, NitroLogger } from '@nitrodevco/nitro-api';

import { clientModulesStore, isClientModuleHeader } from '#base/context/client-modules';
import { WebSocketConnection } from '#base/context/communication';
import { notificationStore } from '#base/context/notifications';
import { getRoom } from '#base/context/room';
import { systemStore } from '#base/context/system';
import { GetSoundManager } from '#base/sound';
import { addTemplateBinding, addTemplatePatch, templatePatchReports } from '#base/theme/templatePatches';

import { quitRoom } from '../navigator/navigatorCommands';
import { openClientLink } from '../system/clientLinkCommands';
import { ClientModuleApi, ClientModuleDispose, ClientModulePacketValue } from './ClientModuleApi';
import { clientModuleFetch } from './clientModuleHttp';
import { getClientModuleLibraries } from './clientModuleLibraries';
import { onPluginMessage, sendPluginMessage } from './pluginMessages';

let nextOverlayKey = 1;
let nextIllustrationKey = 1;
let nextNotificationId = 1;
let nextHotelViewLayerKey = 1;

export const createClientModuleApi = (connection: WebSocketConnection, moduleKey: string, baseUrl: string): { api: ClientModuleApi; dispose: () => void } => {
    const store = clientModulesStore.getState();
    const disposers = new Set<ClientModuleDispose>();
    const composers = new Map<number, new (values: ClientModulePacketValue[]) => { compose: () => ClientModulePacketValue[] }>();
    const windowKey = (id: string) => `${moduleKey}/${id}`;

    /** Keeps `dispose` for the module's stop, and hands back one that also forgets it. */
    const track = (dispose: ClientModuleDispose): ClientModuleDispose => {
        let done = false;
        const once = () => {
            if (done) return;

            done = true;
            disposers.delete(once);
            dispose();
        };

        disposers.add(once);

        return once;
    };

    /** An extension header the module may take, or a warning naming why not. */
    const checkHeader = (header: number) => {
        if (isClientModuleHeader(header)) return true;

        NitroLogger.warn('ClientModules', `${moduleKey}: header ${header} is not an extension header (20000-32767 without 30000-30099).`);

        return false;
    };

    const api: ClientModuleApi = {
        version: 1,
        key: moduleKey,
        baseUrl,
        libs: getClientModuleLibraries(),
        windows: {
            register: (id, component, options = {}) => {
                const key = windowKey(id);

                store.addWindow({ moduleKey, key, component, onTop: options.onTop === true });

                return track(() => clientModulesStore.getState().removeWindow(key));
            },
            open: (id, params) => clientModulesStore.getState().openWindow(windowKey(id), params),
            close: id => clientModulesStore.getState().closeWindow(windowKey(id)),
            toggle: (id, params) => {
                const { openWindows, openWindow, closeWindow } = clientModulesStore.getState();
                const key = windowKey(id);

                if (key in openWindows) closeWindow(key);
                else openWindow(key, params);
            },
        },
        toolbar: {
            add: ({ id, icon, tooltip, onClick }) => {
                const key = windowKey(id);

                store.addToolbarItem({ moduleKey, key, icon, tooltip, onClick });

                return track(() => clientModulesStore.getState().removeToolbarItem(key));
            },
        },
        meMenu: {
            add: ({ id, caption, onClick }) => {
                const key = windowKey(id);

                store.addMeMenuItem({ moduleKey, key, caption, onClick });

                return track(() => clientModulesStore.getState().removeMeMenuItem(key));
            },
            toggle: () => systemStore.getState().toggleToolbarMenu('me'),
        },
        links: {
            handle: (prefix, handle) => {
                const handler = { moduleKey, prefix, handle };

                store.addLinkHandler(handler);

                return track(() => clientModulesStore.getState().removeLinkHandler(handler));
            },
            open: link => openClientLink(connection.send, link),
        },
        packets: {
            registerParser: <T>(header: number, parse: (wrapper: IMessageDataWrapper) => T, listener: (data: T) => void) => {
                if (!checkHeader(header)) return undefined;

                const Parser = class {
                    public parse(wrapper: IMessageDataWrapper) {
                        return parse(wrapper) as object;
                    }
                };

                Object.defineProperty(Parser, 'name', { value: `ClientModule${header}Message` });

                const unregister = connection.registerExtensionPacket({ direction: 'incoming', header, ctor: Parser });

                if (!unregister) {
                    NitroLogger.warn('ClientModules', `${moduleKey}: incoming header ${header} is taken.`);

                    return undefined;
                }

                const unsubscribe = connection.subscribe(Parser, data => listener(data as T));

                return track(() => {
                    unsubscribe();
                    unregister();
                });
            },
            registerComposer: (header) => {
                if (!checkHeader(header)) return undefined;

                const Composer = class {
                    public constructor(private readonly values: ClientModulePacketValue[]) { }

                    public compose() {
                        return this.values;
                    }
                };

                Object.defineProperty(Composer, 'name', { value: `ClientModule${header}Composer` });

                const unregister = connection.registerExtensionPacket({ direction: 'outgoing', header, ctor: Composer });

                if (!unregister) {
                    NitroLogger.warn('ClientModules', `${moduleKey}: outgoing header ${header} is taken.`);

                    return undefined;
                }

                composers.set(header, Composer);

                return track(() => {
                    composers.delete(header);
                    unregister();
                });
            },
            send: (header, ...values) => {
                const Composer = composers.get(header);

                if (!Composer) {
                    NitroLogger.warn('ClientModules', `${moduleKey}: header ${header} was not registered with registerComposer.`);

                    return;
                }

                connection.send(new Composer(values));
            },
        },
        messages: {
            on: (name, handler) => track(onPluginMessage(moduleKey, name, handler)),
            send: (name, data) => sendPluginMessage(moduleKey, name, data),
        },
        http: {
            get: (path, query) => clientModuleFetch(connection, moduleKey, 'GET', path, { query }),
            post: (path, body) => clientModuleFetch(connection, moduleKey, 'POST', path, { body }),
            put: (path, body) => clientModuleFetch(connection, moduleKey, 'PUT', path, { body }),
            patch: (path, body) => clientModuleFetch(connection, moduleKey, 'PATCH', path, { body }),
            delete: path => clientModuleFetch(connection, moduleKey, 'DELETE', path),
        },
        config: {
            get: key => systemStore.getState().config[key],
        },
        texts: {
            get: (key, fallback = '', replacements) => {
                const { localizations, getLocalizationValue } = systemStore.getState();

                // `getLocalizationValue` answers a missing key with parameters as the key itself, as Flash does; a module's fallback is filled instead.
                if ((localizations[key] === undefined) && replacements) return Object.entries(replacements).reduce((text, [ name, value ]) => text.replaceAll(`%${name}%`, value), fallback);

                return getLocalizationValue(key, fallback, replacements);
            },
        },
        sounds: {
            play: soundId => GetSoundManager().playSound(soundId),
        },
        room: {
            avatarOverlay: (render) => {
                const key = nextOverlayKey++;

                store.addAvatarOverlay({ moduleKey, key, render });

                return track(() => clientModulesStore.getState().removeAvatarOverlay(key));
            },
            // `HabboLandingView.onToolbarClick` HTIE_ICON_RECEPTION, as the toolbar's icon does it.
            leave: () => {
                if (!getRoom()) return;

                quitRoom(connection.send);
                systemStore.getState().endRoomSession();
            },
        },
        hotelView: {
            addLayer: (component, options = {}) => {
                const key = nextHotelViewLayerKey++;

                store.addHotelViewLayer({ moduleKey, key, component, replacesBackground: !!options.replacesBackground });

                return track(() => clientModulesStore.getState().removeHotelViewLayer(key));
            },
        },
        notifications: {
            registerLayout: (name, { template, height }) => {
                store.addNotificationLayout(name, { moduleKey, template, height });

                return track(() => {
                    if (clientModulesStore.getState().notificationLayouts[name]?.moduleKey === moduleKey) clientModulesStore.getState().removeNotificationLayout(name);
                });
            },
            add: (layout, text, options = {}) => {
                const registered = clientModulesStore.getState().notificationLayouts[layout];

                if (!registered) {
                    NitroLogger.warn('ClientModules', `${moduleKey}: notification layout ${layout} is not registered.`);

                    return () => undefined;
                }

                // Namespaced like a window's key, so one module's id never takes down another's bubble.
                const id = `${moduleKey}/${options.id ?? `#${nextNotificationId++}`}`;
                const remove = () => notificationStore.getState().removeNotificationById(id);

                notificationStore.getState().addNotification(text, 'info', options.image ?? '', options.link, {
                    id,
                    stay: options.stay === true,
                    timeDisplay: options.timeDisplay,
                    template: { id: registered.template, height: registered.height },
                });

                // One that stays would outlive the module; any other times out on its own.
                return options.stay ? track(remove) : remove;
            },
            setIllustration: (resolve) => {
                const key = nextIllustrationKey++;

                store.addAlertIllustration({ moduleKey, key, resolve });

                return track(() => clientModulesStore.getState().removeAlertIllustration(key));
            },
        },
        templates: {
            patch: (template, ops, options = {}) => track(addTemplatePatch({ owner: moduleKey, template, ops, order: options.order })),
            bind: (template, element, binding) => track(addTemplateBinding(moduleKey, template, element, binding)),
            report: template => templatePatchReports().get(template),
        },
    };

    const dispose = () => {
        for (const disposer of [ ...disposers ]) {
            try {
                disposer();
            } catch (error) {
                NitroLogger.error('ClientModules', moduleKey, error);
            }
        }

        clientModulesStore.getState().removeModule(moduleKey);
    };

    return { api, dispose };
};
