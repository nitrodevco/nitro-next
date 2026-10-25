/**
 * A Flash window template drawn in the client: loaded through `useTemplate` and drawn with the
 * client's texts and bitmaps. What the window's code does with its named elements comes in as
 * `bindings`.
 */
import { colorTemplateByTags, findTemplateChild, isTemplateInspecting, subscribeTemplateInspecting, Template, TemplateBindings, TemplateContext, TemplateInspectContext, TemplateInspectWindowContext, TemplateView, TemplateViewProps } from '@nitrodevco/nitro-theme';
import { useCallback, useMemo, useSyncExternalStore } from 'react';

import { openClientLink } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useSystemStore, useTranslation } from '#base/context/system';

import { useTemplateExtensionArrange, useTemplateExtensionBindings } from './templatePatches';
import { useTemplate } from './useTemplate';

export interface TemplateWindowProps {
    id: string;
    /**
     * One window of the template, by name, drawn on its own: what the code takes out of the layout
     * it built and moves onto the desktop (`_window.desktop.addChild(_window.findChildByName("lock_info_bubble"))`).
     * Its bindings then find in it, `''` being that window.
     */
    part?: string;
    bindings?: TemplateBindings;
    /** What the window's code does once the layout is built (`TemplateView`'s `arrange`). */
    arrange?: TemplateViewProps['arrange'];
    /**
     * Not Flash's: what the window shows, read-only, for the extensions that patch, bind or arrange it
     * as a function of it (`docs/template-patches.md` lists each window's keys). Flat values; a new
     * object with the same values is the same context.
     */
    context?: TemplateContext;
    /** How the root frame opens, when the template is a window of its own (`TemplateView`'s `frame`). */
    frame?: TemplateViewProps['frame'];
    /** The window's size as its code sets it (`TemplateView`'s `width` / `height`). */
    width?: number;
    height?: number;
    /**
     * The parameters the window's code registers for its texts before it builds the window
     * (`Localization.registerParameter`), by key: a caption's `${key}` is read filled with them.
     */
    parameters?: Readonly<Record<string, Record<string, string>>>;
    /**
     * The colour the window's code gives every window carrying a tag, by tag, as it builds the window
     * (`RewardTrackTheme.applyTo`): see `colorTemplateByTags`. Keep the object the same between renders.
     */
    tagColors?: Readonly<Record<string, number>>;
}

/** The template cut down to its window `part`, as its own template. */
const templatePart = (template: Template, part: string): Template | undefined => {
    const element = findTemplateChild(template.elements, part);

    return element && { ...template, name: `${template.name}/${part}`, width: element.width, height: element.height, elements: [ element ] };
};

/** Draws nothing until the template is loaded, as a Flash window opens once its library is in. */
export const TemplateWindow = ({ id, part, bindings, arrange, context, frame, width, height, parameters, tagColors }: TemplateWindowProps) => {
    const loaded = useTemplate(id, context);
    // The bindings extensions give the elements they added (`api.templates.bind`), under the window's
    // own - or over them, for an override.
    const allBindings = useTemplateExtensionBindings(id, bindings, context);
    // What extensions do after the window's own code has laid it out (`api.templates.arrange`).
    const allArrange = useTemplateExtensionArrange(id, arrange, context);
    const template = useMemo(() => {
        const built = (loaded && tagColors) ? colorTemplateByTags(loaded, tagColors) : loaded;

        return (built && part !== undefined) ? templatePart(built, part) : built;
    }, [ loaded, part, tagColors ]);
    const t = useTranslation();
    const { send } = useWebSocketContext();
    // `buildFromXML` points a frame's help button at `openHelpPage`, the habbo pages viewer - the
    // receiver of the `habbopages/<page>` link.
    const windowFrame = useMemo(() => (frame && { onHelp: (page: string) => openClientLink(send, `habbopages/${page}`), ...frame }), [ frame, send ]);
    // The texts' identity: a new table (texts loaded, or another language) or new parameters is a new
    // `resolveText`, which redraws every text of the template. Between those it stays the same function.
    const localizations = useSystemStore(x => x.localizations);
    const parametersKey = parameters ? JSON.stringify(parameters) : '';
    const registered = useMemo(() => (parametersKey ? JSON.parse(parametersKey) as Record<string, Record<string, string>> : undefined), [ parametersKey ]);
    // A key the texts lack shows as the key itself, as Flash does: `registerListener` makes it a text
    // whose value is its own key (CoreLocalizationManager.as:296-301), so a layout's `${ok}` reads "ok".
    const resolveText = useCallback((key: string) => (localizations[key] !== undefined ? t(key, '', registered?.[key]) : key), [ t, localizations, registered ]);
    // A bitmap the template names is a bundled asset already: `ThemeImage` reads the name as it is.
    // A `${key}` in it is a hotel variable (`${image.library.questing.url}ach_category_pets.png`).
    const config = useSystemStore(x => x.config);
    const imageUrl = useCallback((asset: string) => asset.replace(/\$\{([^}]+)\}/g, (_, key: string) => {
        const value = config[key];

        return (typeof value === 'string' || typeof value === 'number') ? String(value) : '';
    }), [ config ]);
    // While the extension inspector is on: the template it names for this window's elements (a window
    // drawn in another's element starts its own element chain). Turning it on redraws the view once.
    const inspecting = useSyncExternalStore(subscribeTemplateInspecting, isTemplateInspecting);
    const inspectWindow = useMemo(() => ({ id, part, context }), [ id, part, context ]);

    if (!template) return null;

    const view = (
        <TemplateView
            key={inspecting ? 'inspected' : 'plain'}
            template={template}
            bindings={allBindings}
            arrange={allArrange}
            frame={windowFrame}
            width={width}
            height={height}
            resolveText={resolveText}
            imageUrl={imageUrl}
        />
    );

    if (!inspecting) return view;

    return (
        <TemplateInspectWindowContext.Provider value={inspectWindow}>
            <TemplateInspectContext.Provider value={undefined}>
                {view}
            </TemplateInspectContext.Provider>
        </TemplateInspectWindowContext.Provider>
    );
};
