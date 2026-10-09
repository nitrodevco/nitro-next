/**
 * `BonusRarePromoWidget`: `habbo-friend-bar-com/bonus_rare_promo_xml` - the rare every so many
 * credits spent buys, and how far the user is from the next one (`BonusRareInfoMessage`, asked for
 * by `registerHotelViewHandlers`).
 *
 * The widget keeps its place in the grid but is hidden until the server has named a rare
 * (`productClassId` -1 until then), and its texts and bar are only filled once the rare's product
 * data is known (`refreshContent`): the header names it and the credits per rare, the bar fills by
 * the credits already spent towards it (`setProgress` over `bar_a_bkg`'s 292), and the status says
 * how many are still to go. The picture is the hotel's `landing.view.bonus.rare.image.uri`.
 *
 * The layout sizes the row: `buy_button` is as wide as its caption, `button_container`
 * (`accommodate` resize) takes the button's width, and the `scale_to_fit_items` item list - with the
 * border round it (`reflectToParent`) - ends where the button does.
 *
 * The button is Flash's `openCreditsHabblet`, which opens the hotel's web shop
 * (`web.shop.relativeUrl`) beside the client; the port has no hotel web page to open it under - see
 * `purchaseCredits` in `commands/targetedOfferCommands.ts` - so it is drawn and does nothing.
 */
import { hotelViewColorableBindings, HotelViewCommonSettings, hotelViewProperty, useConfigData, useSystemStore, useTranslation } from '#base/context/system';
import { Box, TemplateBindings, TemplateWindow, TemplateWindows } from '#base/theme';

/** `bonus_rare_promo`'s size, which the grid keeps while the widget is hidden. */
const WIDTH = 602;
const HEIGHT = 75;

/** `bar_a_bkg`: where the fill starts and how wide it can grow. */
const BAR_FILL_X = 4;
const BAR_FILL_WIDTH = 292;

/** The text the hotel's widget settings colour. */
const COLORABLE = [ 'header' ] as const;

export interface HotelViewBonusRareWidgetProps {
    settings: HotelViewCommonSettings;
}

export const HotelViewBonusRareWidget = ({ settings }: HotelViewBonusRareWidgetProps) => {
    const bonusRare = useSystemStore(x => x.hotelViewBonusRare);
    const product = useSystemStore(x => x.productData[bonusRare?.productType ?? '']);
    const config = useConfigData();
    const t = useTranslation();

    if (!bonusRare) return (
        <Box
            visible={false}
            layout={{ width: WIDTH, height: HEIGHT }}
        />
    );

    const total = bonusRare.totalCoinsForBonus;
    const spent = total - bonusRare.coinsStillRequiredToBuy;
    const fill = (product && (total > 0)) ? Math.trunc((spent / total) * BAR_FILL_WIDTH) : 0;

    const bindings: TemplateBindings = hotelViewColorableBindings(settings, COLORABLE, {
        '': { visible: bonusRare.productClassId !== -1 },
        preview: { visible: false },
        promo_image: { visible: !!product, asset: hotelViewProperty(config, 'landing.view.bonus.rare.image.uri') },
        header: { visible: !!product, caption: product ? t('landing.view.bonus.rare.header', '', { rarename: product.name, amount: String(total) }) : '' },
        progress_bar_cont: { visible: !!product },
        status: { caption: t('landing.view.bonus.rare.status', '', { amount: String(bonusRare.coinsStillRequiredToBuy), total: String(total) }) },
        bar_a_c: { visible: fill > 0 },
    });

    /** `setProgress`: the fill as wide as the share spent, its end just after it. */
    const arrange = ({ find }: TemplateWindows) => {
        find('bar_a_c')?.setWidth(fill);
        find('bar_a_r')?.setX(BAR_FILL_X + fill);
    };

    return (
        <Box layout={{ width: WIDTH, height: HEIGHT, flexShrink: 0 }}>
            <TemplateWindow
                id="habbo-friend-bar-com/bonus_rare_promo_xml"
                bindings={bindings}
                arrange={arrange}
            />
        </Box>
    );
};
