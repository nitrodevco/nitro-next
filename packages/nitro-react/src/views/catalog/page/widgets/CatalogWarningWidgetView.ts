import { useState } from 'react';

import { CatalogWidgetEventEnum } from '#base/context/catalog';
import { useCatalogWidgetEvent } from '#base/hooks';

import { CatalogWidgetProps } from '../CatalogPageRegistry';
import { useCatalogWidgetView } from '../catalogWidgetView';

/**
 * A warning line under a page's product, the `warningWidget` container of `layout_guild_forum` -
 * Flash's `WarningCatalogWidget`, which attaches no view: `init` blanks the container's own
 * `warning_text`, and a `CWE_SHOW_WARNING_TEXT` sets the text as its caption
 * (`GuildForumSelectorCatalogWidget` sends `${catalog.alert.group_has_forum}`), a `${key}` in it
 * read through the texts as the window system does.
 */
export const CatalogWarningWidgetView = ({ page }: CatalogWidgetProps) => {
    const [ text, setText ] = useState('');

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.SHOW_WARNING_TEXT, event => setText(event.text));

    useCatalogWidgetView({ bindings: { warning_text: { caption: text } } });

    return null;
};
