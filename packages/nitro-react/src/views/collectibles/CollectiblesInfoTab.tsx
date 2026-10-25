/**
 * The info tab - `infoContainer` of `collectible_view.xml`: the title, `info_desc` and
 * `transfer_desc` (html texts) and the collector illustration.
 *
 * `CollectiblesView` gives both texts Flash's link style (`HTMLTextController.initializeLinkStyle`:
 * `a:link` underlined `#006de0`), which is drawn here by wrapping each `<a>`'s text in that colour
 * and an underline - the port's markup has no style sheet. A click on a link's glyphs opens its
 * page (`WE_LINK` -> `onClickHtmlLink`; `convertLinksToEvents` makes an `http(s)` href an
 * `event:` link whose text is the url).
 */
import { openCollectiblesHtmlLink } from '#base/commands';
import { useInterpolate } from '#base/context/system';

import { CollectiblesTabWindow } from './CollectiblesTabWindow';

/** `initializeLinkStyle`'s `a:link` colour. */
const LINK_COLOR = '#006de0';

/** Each `<a href="...">text</a>`'s text in the link style, the link kept. */
const styleLinks = (html: string): string => html.replace(/(<a\b[^>]*>)(.*?)(<\/a>)/gi, `$1<font color="${LINK_COLOR}"><u>$2</u></font>$3`);

export const CollectiblesInfoTab = () => {
    // The two texts' captions are `${...}` keys the window interpolates, and keep the key when it has no text.
    const interpolate = useInterpolate();

    return (
        <CollectiblesTabWindow
            container="infoContainer"
            bindings={{
                info_desc: { htmlText: styleLinks(interpolate('${collectibles.info.description}')), onLink: openCollectiblesHtmlLink },
                transfer_desc: { htmlText: styleLinks(interpolate('${collectibles.info.trading}')), onLink: openCollectiblesHtmlLink },
            }}
        />
    );
};
