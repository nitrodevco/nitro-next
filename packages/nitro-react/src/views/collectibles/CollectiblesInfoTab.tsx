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
import { useInterpolate, useTranslation } from '#base/context/system';
import { LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';

/** `initializeLinkStyle`'s `a:link` colour. */
const LINK_COLOR = '#006de0';

/** Each `<a href="...">text</a>`'s text in the link style, the link kept. */
const styleLinks = (html: string): string => html.replace(/(<a\b[^>]*>)(.*?)(<\/a>)/gi, `$1<font color="${LINK_COLOR}"><u>$2</u></font>$3`);

export const CollectiblesInfoTab = () => {
    const t = useTranslation();
    // The two texts' captions are `${...}` keys the window interpolates, and keep the key when it has no text.
    const interpolate = useInterpolate();

    return (
        <Region
            name="infoContainer"
            layout={{ position: 'absolute', left: 0, width: 390, top: 125, height: 419 }}
        >
            <Region
                name="category_content_background"
                layout={{ position: 'absolute', left: 0, width: 390, top: 0, height: 400, overflow: 'hidden' }}
            >
                <Region
                    name="category_collector_header_region"
                    layout={{ position: 'absolute', left: 0, width: 490, top: 0, height: 135 }}
                >
                    <Region
                        name="category_info_header_region"
                        layout={{ position: 'absolute', left: 0, width: 142, top: 4, height: 17 }}
                    >
                        <ThemeText
                            text={t('collectibles.info.title')}
                            textStyle="u_regular"
                            flashFormat={{ bold: true }}
                            name="collector_collections_header"
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 0, top: 0, minWidth: 2, maxWidth: 270 }}
                        />
                    </Region>
                    <Region
                        name="category_info_description_region"
                        layout={{ position: 'absolute', left: 0, width: 480, top: 22, height: 50 }}
                    >
                        <ThemeText
                            text={styleLinks(interpolate('${collectibles.info.description}'))}
                            textStyle="u_regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: 476 }}
                            markup
                            onLink={openCollectiblesHtmlLink}
                            clip
                            name="info_desc"
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 0, width: 480, top: 0, height: 50, maxWidth: 480 }}
                        />
                    </Region>
                    <Region
                        name="category_info_transfer_region"
                        layout={{ position: 'absolute', left: 0, width: 480, top: 75, height: 60 }}
                    >
                        <ThemeText
                            text={styleLinks(interpolate('${collectibles.info.trading}'))}
                            textStyle="u_regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: 476 }}
                            markup
                            onLink={openCollectiblesHtmlLink}
                            clip
                            name="transfer_desc"
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 0, width: 480, top: 0, height: 60, maxWidth: 480 }}
                        />
                    </Region>
                </Region>
            </Region>
            <ThemeImage
                src={LayoutImage('shared/collectables_collection_default.png')}
                bitmap={{}}
                layout={{ position: 'absolute', left: 128, width: 216, top: 155, height: 264 }}
            />
        </Region>
    );
};
