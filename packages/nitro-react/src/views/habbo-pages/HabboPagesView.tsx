/**
 * The habbo pages viewer's window - `HabboPagesViewer`: `habbopedia_xml`, built where its layout puts it,
 * with the last page downloaded (`openHabboPage`): its caption the frame's, its html `content`'s, in
 * the viewer's style sheet. A new page is drawn afresh, scrolled back to the top (`onChanged`:
 * `scrollV = 0`); the window keeps its place. The header's close hides it.
 *
 * A link in a page goes to the in-client link router as `HTMLTextController` hands it to the link
 * trackers; a web address (inferred: not one of the trackers' patterns) opens as a web page.
 */
import { openClientLink } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useIsWindowVisible, useWindowActions, useWindowParams } from '#base/context/system';
import { parseFlashStyleSheet, TemplateWindow, useTemplateFrame } from '#base/theme';
import { openWebPage } from '#base/utils';

/** `habbopedia_css`, the style sheet `HabboPagesViewer` embeds (`createStyleSheet`). */
const HABBOPEDIA_STYLE_SHEET = parseFlashStyleSheet(`
h1 { font-weight: bold; font-size: 23px; color: #fc6204; }
h2 { font-weight: bold; font-size: 19px; color: #fc6204; }
h3 { font-weight: bold; font-size: 15px; color: #fc6204; }
p { font-size: 12px; }
a { font-weight: bold; color: #fc6204; text-decoration: underline; }
.bullet-item { margin-left: 7px; text-indent: -7px; }
.padding-top { font-size: 1px; leading: 10px; }
.padding-bottom { font-size: 1px; leading: 5px; }
`);

/** The frame's `x` / `y` in `habbopedia_xml`, where `buildFromXML` puts the window. */
const DEFAULT_POSITION = { x: 22, y: 40 };

export const HabboPagesView = () => {
    const isVisible = useIsWindowVisible('habbo_pages');

    return isVisible ? <HabboPagesWindow /> : null;
};

const HabboPagesWindow = () => {
    const { caption, html, download } = useWindowParams('habbo_pages');
    const { hideWindow } = useWindowActions();
    const { send } = useWebSocketContext();
    const frame = useTemplateFrame({ id: 'habbopedia', defaultPosition: DEFAULT_POSITION, onClose: () => hideWindow('habbo_pages') });
    const onLink = (link: string) => (/^https?:/i.test(link) ? openWebPage(link) : openClientLink(send, link));

    return (
        <TemplateWindow
            key={download}
            id="habbo-window-manager-com/habbopedia_xml"
            frame={frame}
            bindings={{
                '': { caption: caption ?? '' },
                content: { htmlText: html ?? '', styleSheet: HABBOPEDIA_STYLE_SHEET, onLink },
            }}
        />
    );
};
