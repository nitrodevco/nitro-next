/**
 * `PromoArticleWidget`: `promo_article` - the hotel's promo articles (`PromoArticlesMessage`, asked
 * for by `registerHotelViewHandlers` at most once in ten minutes), one at a time.
 *
 * `setArticleContent`: the shown article's title and text, its button (captioned with the article's
 * button text, hidden when it has no link) and its picture (`${image.library.url}` + its image, hidden
 * when it has none); until the first answer the title is the layout's loading text. The button follows
 * the link (`followLink`: a web page, or an in-client link).
 *
 * `setNavigationDisks`: one disk of `navigation` per article (ten at most), the shown one lit; a disk
 * lights while hovered, and a click goes to its article. Going to another article fades the title,
 * text, button and picture out over half a second, swaps the content, and fades them back in
 * (`startFade` / `update`). The widget keeps its article between visits to the reception.
 */
import { GetTicker } from '@nitrodevco/nitro-renderer';
import { Ticker } from 'pixi.js';
import { useEffect, useState } from 'react';

import { followPromoArticleLink } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { hotelViewColorableBindings, HotelViewCommonSettings, promoArticleHasLink, useSystemActions, useSystemStore } from '#base/context/system';
import { findTemplateChild, TemplateBinding, TemplateBindings, TemplateItem, TemplateWindow, useTemplateLibrary } from '#base/theme';

import { HOTEL_VIEW_LIBRARY, hotelViewTemplate, hotelViewTemplateId } from './hotelViewTemplate';

/** `FADE_LENGTH`: each half of the fade, out and back in. */
const FADE_LENGTH = 500;

/** The texts the hotel's widget settings colour. */
const COLORABLE = [ 'header_txt', 'promo_title', 'promo_text' ] as const;

/** `progress_disk_flat_on` / `_off`: a navigation disk lit or not. */
const diskAsset = (lit: boolean) => `progress_disk_flat_${lit ? 'on' : 'off'}`;

export interface HotelViewPromoArticleWidgetProps {
    settings: HotelViewCommonSettings;
}

export const HotelViewPromoArticleWidget = ({ settings }: HotelViewPromoArticleWidgetProps) => {
    const articles = useSystemStore(x => x.hotelViewPromoArticles);
    const index = useSystemStore(x => x.hotelViewPromoArticleIndex);
    const { setHotelViewPromoArticleIndex } = useSystemActions();
    const { send } = useWebSocketContext();
    const templates = useTemplateLibrary(HOTEL_VIEW_LIBRARY);
    // The article whose content shows: it changes halfway through a fade (`refreshContent`).
    const [ shown, setShown ] = useState(index);
    const [ fadeTo, setFadeTo ] = useState<number | null>(null);
    const [ blend, setBlend ] = useState(1);
    const [ hovered, setHovered ] = useState<number | null>(null);

    // `update`: the blend down over the first half - the content swapped as it ends - and back up over the second.
    useEffect(() => {
        if (fadeTo === null) return;

        let elapsed = 0;

        const tick = (ticker: Ticker) => {
            const next = elapsed + ticker.deltaMS;

            if (elapsed < FADE_LENGTH) {
                setBlend(Math.max(0, 1 - (elapsed / FADE_LENGTH)));

                if (next >= FADE_LENGTH) setShown(fadeTo);
            } else {
                setBlend(Math.min(1, (elapsed - FADE_LENGTH) / FADE_LENGTH));
            }

            elapsed = next;

            if (elapsed >= (FADE_LENGTH * 2)) {
                GetTicker().remove(tick);
                setBlend(1);
                setFadeTo(null);
            }
        };

        GetTicker().add(tick);

        return () => {
            GetTicker().remove(tick);
        };
    }, [ fadeTo ]);

    const template = hotelViewTemplate(templates, 'promo_article');
    const navigation = template && findTemplateChild(template.elements, 'navigation');

    if (!navigation) return null;

    // A shorter list than the article it was on starts again at the first (`goToArticle`'s wrap).
    const showing = (shown < articles.length) ? shown : 0;
    const article = articles[showing];

    /** `goToArticle`: another article fades in; the one already chosen is only redrawn. */
    const goToArticle = (target: number) => {
        if (!articles.length || (target === index)) return;

        const next = (target < 0) ? (articles.length - 1) : (target >= articles.length) ? 0 : target;

        setHotelViewPromoArticleIndex(next);
        setFadeTo(next);
    };

    const faded: TemplateBinding = { alpha: blend };
    // `setArticleContent`: nothing until there is an article, leaving the layout's loading text.
    const content: TemplateBindings = article
        ? {
                promo_title: { ...faded, caption: article.title },
                promo_text: { ...faded, caption: article.bodyText },
                button: { ...faded, visible: promoArticleHasLink(article), caption: article.buttonText, onPointerTap: () => followPromoArticleLink(send, article) },
                promo_image: { ...faded, visible: article.imageUrl !== '', asset: `\${image.library.url}${article.imageUrl}` },
            }
        : {};

    const disks: TemplateItem[] = navigation.children.map((disk, diskIndex) => ({
        key: String(diskIndex),
        from: disk,
        bindings: {
            '': {
                visible: diskIndex < articles.length,
                onPointerTap: () => goToArticle(diskIndex),
                onPointerOver: () => setHovered(diskIndex),
                onPointerOut: () => setHovered(null),
            },
            navigation_disk: { asset: diskAsset((diskIndex === showing) || (diskIndex === hovered)) },
        },
    }));

    return (
        <TemplateWindow
            id={hotelViewTemplateId('promo_article')}
            bindings={hotelViewColorableBindings(settings, COLORABLE, { ...content, navigation: { items: disks } })}
        />
    );
};
