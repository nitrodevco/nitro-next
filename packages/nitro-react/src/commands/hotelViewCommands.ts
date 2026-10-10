/**
 * What the reception's widgets do when clicked, where that is more than opening a window -
 * `PromoArticleWidget.followLink`.
 */
import { PromoArticleData } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { PROMO_ARTICLE_LINK_CLIENT, PROMO_ARTICLE_LINK_WEB } from '#base/context/system';

import { openClientLink } from './clientLinkCommands';

type Send = WebSocketConnection['send'];

/**
 * `PromoArticleWidget.followLink`: a web link opens its page (`HabboWebTools.openWebPage`, in the
 * hotel's `habboMain` window), a client link goes through `createLinkEvent`.
 */
export const followPromoArticleLink = (send: Send, article: PromoArticleData) => {
    switch (article.linkType) {
        case PROMO_ARTICLE_LINK_WEB:
            window.open(article.linkContent, 'habboMain');

            return;
        case PROMO_ARTICLE_LINK_CLIENT:
            openClientLink(send, article.linkContent);
    }
};
