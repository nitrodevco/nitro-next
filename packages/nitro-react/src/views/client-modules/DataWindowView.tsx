/**
 * Not Flash's: a plugin's window defined as data (`theme/dataWindows.ts`), drawn from its template as
 * any template window is. Its frame opens centred and its close button closes it; each button its
 * file names closes the window, opens its in-client link, as a habbo page's link does, or shows its
 * page and hides the other buttons' pages (tabs: the button of the page shown is selected).
 */
import { TemplateBindings } from '@nitrodevco/nitro-theme';
import { useMemo, useState, useSyncExternalStore } from 'react';

import { openClientLink } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { TemplateWindow } from '#base/theme';
import { dataWindowOf, subscribeDataWindows } from '#base/theme/dataWindows';

export interface DataWindowViewProps {
    templateId: string;
    close: () => void;
}

export const DataWindowView = ({ templateId, close }: DataWindowViewProps) => {
    const window = useSyncExternalStore(subscribeDataWindows, () => dataWindowOf(templateId));
    const { send } = useWebSocketContext();
    const buttons = window?.buttons;
    // The page shown of those its buttons show: the first named until one is clicked.
    const pages = useMemo(() => [ ...new Set(Object.values(buttons ?? {}).flatMap(action => (action.show ? [ action.show ] : []))) ], [ buttons ]);
    const [ picked, setPicked ] = useState<string | null>(null);
    const shown = (picked && pages.includes(picked)) ? picked : (pages[0] ?? null);
    const bindings = useMemo(() => {
        const list: TemplateBindings = {};

        for (const page of pages) list[page] = { visible: page === shown };

        for (const [ name, action ] of Object.entries(buttons ?? {})) {
            // A link as a habbo page or a notice writes it (`event:navigator/goto/1`) or bare.
            const link = action.link?.replace(/^event:/, '');

            list[name] = action.show
                ? { selected: action.show === shown, onPointerTap: () => setPicked(action.show!) }
                : { onPointerTap: () => (action.close ? close() : link && openClientLink(send, link)) };
        }

        return list;
    }, [ buttons, pages, shown, close, send ]);
    const frame = useMemo(() => ({ id: `data-window-${templateId}`, centered: true, onClose: close }), [ templateId, close ]);

    if (!window) return null;

    return (
        <TemplateWindow
            id={templateId}
            bindings={bindings}
            frame={frame}
        />
    );
};
