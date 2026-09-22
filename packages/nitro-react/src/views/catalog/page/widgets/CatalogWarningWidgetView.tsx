import { useState } from 'react';

import { CatalogWidgetEventEnum } from '#base/context/catalog';
import { useInterpolate } from '#base/context/system';
import { useCatalogWidgetEvent } from '#base/hooks';
import { ThemeText } from '#base/theme';

import { CatalogWidgetProps } from '../CatalogPageRegistry';

/**
 * A warning line under a page's product, the `warningWidget` container of `layout_guild_forum` -
 * Flash's `WarningCatalogWidget`: the container's own `warning_text` (dark red `u_regular`,
 * wrapped, cut at its 360x38 box), blank until a `CWE_SHOW_WARNING_TEXT` brings the text
 * (`GuildForumSelectorCatalogWidget` sends `${catalog.alert.group_has_forum}`). The text is set as
 * the window's caption, which resolves a `${key}` in it the way the window system does
 * (`CoreLocalizationManager.interpolate`).
 */
export const CatalogWarningWidgetView = ({ page }: CatalogWidgetProps) => {
    const [ text, setText ] = useState('');
    const interpolate = useInterpolate();

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.SHOW_WARNING_TEXT, event => setText(event.text));

    return (
        <ThemeText
            name="warning_text"
            text={interpolate(text)}
            textStyle="u_regular"
            textOptions={{ fill: '#6f0000', wordWrap: true, wordWrapWidth: 356 }}
            clip
            verticalAlign="top"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 38 }}
        />
    );
};
