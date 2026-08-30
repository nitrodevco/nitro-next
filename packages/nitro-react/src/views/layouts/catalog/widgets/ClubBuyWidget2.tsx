import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Icon, Region, ThemeText } from '#base/theme';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `clubBuyWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutClubBuy_1655Layout); each passes its own placement through `layout`.
 */
/** Named region `clubBuyWidget` of ClubBuyWidget2 - configured through the parent's `clubBuyWidget` prop. */
export interface ClubBuyWidget2Props extends CatalogWidgetFlags {
    captionClubHeader?: string;
    captionClubInfo?: string;
    captionClubLink?: string;
    captionClubRemaining?: string;
    itemsItemListHc?: ReactNode;
    itemsItemListVip?: ReactNode;
    layout?: BoxLayout;
}

export const ClubBuyWidget2 = ({ captionClubHeader, captionClubInfo, captionClubLink, captionClubRemaining, itemsItemListHc, itemsItemListVip, layout }: ClubBuyWidget2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="clubBuyWidget"
            layout={{ position: 'absolute', justifyContent: 'center', ...layout }}
        >
            <Border
                variant="2"
                tintColor="#dfdfdf"
                layout={{ position: 'absolute', left: 10, width: 340, top: 0, height: 22, justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionClubHeader ?? t('catalog.club.buy.header')}
                    textStyle="text-style-u-headline-small"
                    textOptions={{ align: 'center' }}
                    name="club_header"
                    layout={{ position: 'absolute', marginLeft: -16.5, marginRight: 16.5, width: 307, top: 2, height: 19 }}
                />
            </Border>
            <Border
                variant="2"
                name="club_remaining_bg"
                tintColor="#dfdfdf"
                layout={{ position: 'absolute', left: 10, width: 340, bottom: 25, height: 25 }}
            >
                <ThemeText
                    text={captionClubRemaining ?? t('catalog.club.buy.remaining')}
                    name="club_remaining"
                    layout={{ position: 'absolute', left: 6, width: 151, top: 5, height: 17 }}
                />
            </Border>
            <ThemeText
                text={captionClubInfo ?? t('catalog.club.buy.info')}
                textOptions={{ wordWrap: true, wordWrapWidth: 307 }}
                name="club_info"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 7, width: 307, top: 30, height: 17 }}
            />
            <Icon
                variant="18"
                name="icon_vip"
                layout={{ position: 'absolute', left: 40, width: 85, top: 104, height: 40 }}
            />
            <Region
                name="item_list_hc"
                layout={{ position: 'absolute', left: 0, width: 171, top: 155, bottom: 55, flexDirection: 'column', gap: 4 }}
            >
                {itemsItemListHc}
            </Region>
            <Region
                name="item_list_vip"
                layout={{ position: 'absolute', left: 180, width: 171, top: 155, bottom: 55, flexDirection: 'column', gap: 4 }}
            >
                {itemsItemListVip}
            </Region>
            <ThemeText
                text={captionClubLink ?? t('catalog.club.buy.link')}
                textOptions={{ align: 'center' }}
                name="club_link"
                layout={{ position: 'absolute', width: 340, bottom: 3, height: 17 }}
            />
        </Region>
    );
};
