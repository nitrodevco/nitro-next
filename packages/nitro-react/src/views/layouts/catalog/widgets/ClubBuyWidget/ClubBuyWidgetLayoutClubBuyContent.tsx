import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Icon, Region, ThemeText } from '#base/theme';

/** Named region `club_buy_content` of ClubBuyWidgetLayout - configured through the parent's `clubBuyContent` prop. */
export interface ClubBuyWidgetLayoutClubBuyContentProps {
    captionClubHeader?: string;
    captionClubInfo?: string;
    captionClubLink?: string;
    captionClubRemaining?: string;
    itemsItemListHc?: ReactNode;
    itemsItemListVip?: ReactNode;
    layout?: BoxLayout;
}

export const ClubBuyWidgetLayoutClubBuyContent = ({ captionClubHeader, captionClubInfo, captionClubLink, captionClubRemaining, itemsItemListHc, itemsItemListVip, layout }: ClubBuyWidgetLayoutClubBuyContentProps) => {
    const t = useTranslation();

    return (
        <Region
            name="club_buy_content"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center', ...layout }}
        >
            <Border
                variant="2"
                tintColor="#dfdfdf"
                layout={{ position: 'absolute', left: 0, width: 307, top: 0, height: 22 }}
            />
            <Border
                variant="2"
                name="club_remaining_bg"
                tintColor="#dfdfdf"
                layout={{ position: 'absolute', left: 0, width: 307, top: 300, height: 25 }}
            />
            <ThemeText
                text={captionClubHeader ?? t('catalog.club.buy.header')}
                textStyle="text-style-u-headline-small"
                textOptions={{ align: 'center' }}
                name="club_header"
                layout={{ position: 'absolute', marginLeft: -6.5, marginRight: 6.5, width: 307, top: 2, height: 19 }}
            />
            <ThemeText
                text={captionClubInfo ?? t('catalog.club.buy.info')}
                textOptions={{ wordWrap: true, wordWrapWidth: 307 }}
                name="club_info"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 7, right: 6, top: 30, height: 17 }}
            />
            <Icon
                variant="18"
                name="icon_vip"
                layout={{ position: 'absolute', left: 40, width: 85, top: 104, height: 40 }}
            />
            <ThemeText
                text={captionClubRemaining ?? t('catalog.club.buy.remaining')}
                name="club_remaining"
                layout={{ position: 'absolute', left: 6, width: 151, top: 305, height: 17 }}
            />
            <Region
                name="item_list_hc"
                layout={{ position: 'absolute', left: 0, width: 151, top: 155, height: 140, flexDirection: 'column', gap: 4 }}
            >
                {itemsItemListHc}
            </Region>
            <Region
                name="item_list_vip"
                layout={{ position: 'absolute', left: 155, width: 151, top: 155, height: 140, flexDirection: 'column', gap: 4 }}
            >
                {itemsItemListVip}
            </Region>
            <ThemeText
                text={captionClubLink ?? t('catalog.club.buy.link')}
                textOptions={{ align: 'center' }}
                name="club_link"
                layout={{ position: 'absolute', marginLeft: -6.5, marginRight: 6.5, width: 307, bottom: -2, height: 17 }}
            />
        </Region>
    );
};
