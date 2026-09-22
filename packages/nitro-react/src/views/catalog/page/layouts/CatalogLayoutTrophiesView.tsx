import { CatalogWidgetEnum, getCatalogPageText } from '#base/context/catalog';
import { useTranslation } from '#base/context/system';
import { Border, Region, ThemeText } from '#base/theme';
import { getOfferProduct } from '#base/utils';

import { CatalogLayoutProps } from '../CatalogPageRegistry';
import { CatalogWidgetSlot } from '../CatalogWidgetSlot';

/**
 * The `trophies` page, `layout_trophies.xml` (`ctlg_trophies`, 360x460): the page's first text in
 * the html `trophy.description` over the top 190px (`PageLocalization`'s `trophies` list sends it
 * there and the second to `trophy.enscription`), the trophy widget (360x135) at 145 - over the
 * description's foot - the colour grid under it, the inscription caption at 6,326, the style 5
 * border round the text input widget (stretched down to 37px above the bottom) and the purchase
 * widget at the bottom. The trophy and text input widgets are `EMBEDDED`: they draw their
 * containers' own children (`CatalogTrophyWidgetView`, `CatalogTextInputWidgetView`).
 *
 * `TrophyCatalogWidget.init` hides the layout's colour grid when the page has one offer that
 * cannot be coloured (its furniture's full name has no `*`); the widget reaches into the layout
 * for it, so the port does it here from the same test.
 */
export const CatalogLayoutTrophiesView = ({ page }: CatalogLayoutProps) => {
    const t = useTranslation();
    const singleProduct = (page.offers.length === 1) ? getOfferProduct(page.offers[0]) : undefined;
    const colourGridVisible = !singleProduct || (singleProduct.furnitureData?.fullName ?? '').includes('*');

    return (
        <Region
            name="ctlg_trophies"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, overflow: 'hidden' }}
        >
            <ThemeText
                name="trophy.description"
                text={getCatalogPageText(page, 'trophy.description') ?? t('loremipsum.html')}
                textStyle="u_regular"
                textOptions={{ wordWrap: true, wordWrapWidth: 356 }}
                markup
                clip
                verticalAlign="top"
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 190 }}
            />
            <CatalogWidgetSlot
                page={page}
                name={CatalogWidgetEnum.TROPHY}
                tags={[ 'EMBEDDED' ]}
                layout={{ position: 'absolute', left: 0, width: 360, top: 145, height: 135 }}
            />
            <CatalogWidgetSlot
                page={page}
                name={CatalogWidgetEnum.COLOUR_GRID}
                visible={colourGridVisible}
                layout={{ position: 'absolute', left: 0, width: 360, top: 285, height: 40 }}
            />
            <ThemeText
                name="trophy.enscription"
                text={getCatalogPageText(page, 'trophy.enscription') ?? t('lorem.title')}
                textStyle="u_small"
                textOptions={{ wordWrap: true, wordWrapWidth: 351 }}
                verticalAlign="top"
                layout={{ position: 'absolute', left: 6, width: 355, top: 326 }}
            />
            <Border
                variant="5"
                layout={{ position: 'absolute', left: 0, width: 360, top: 340, bottom: 37 }}
            >
                <CatalogWidgetSlot
                    page={page}
                    name={CatalogWidgetEnum.TEXT_INPUT}
                    tags={[ 'EMBEDDED' ]}
                    layout={{ position: 'absolute', left: 6, right: 5, top: 7, bottom: 6 }}
                />
            </Border>
            <CatalogWidgetSlot
                page={page}
                name={CatalogWidgetEnum.PURCHASE}
                layout={{ position: 'absolute', left: 0, width: 360, bottom: 0, height: 30 }}
            />
        </Region>
    );
};
