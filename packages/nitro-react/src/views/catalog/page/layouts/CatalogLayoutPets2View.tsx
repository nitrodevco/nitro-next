import { onCatalogPageLink } from '#base/commands';
import { getCatalogPageText } from '#base/context/catalog';
import { useTranslation } from '#base/context/system';
import { useCatalogPageImage } from '#base/hooks';
import { Border, Region, TextStyleKey, ThemeImage, ThemeText } from '#base/theme';

import { CatalogLayoutProps } from '../CatalogPageRegistry';

/** One of the two pet info layouts: where `layout_pets2.xml` and `layout_pets3.xml` differ. */
export interface CatalogPetsInfoLayout {
    text1Width: number;
    text2: { width: number; caption: string };
    text3: { top: number; caption: string; textStyle: TextStyleKey };
    /** `pets3`'s `LAYOUT_LINKS` entry: `ctlg_text_3` is clickable. */
    text3Link: boolean;
}

const PETS2: CatalogPetsInfoLayout = {
    text1Width: 234,
    text2: { width: 297, caption: 'lorem.newline' },
    text3: { top: 300, caption: 'lorem.content', textStyle: 'u_regular' },
    text3Link: false,
};

/**
 * The pet info pages, `layout_pets2.xml` and `layout_pets3.xml` (both `ctlg_pets2`, 360x460): in
 * a grey-blue style 2 border, the page's picture in `ctlg_teaserimg_1` (57x57, centred and
 * unscaled; `catalogue/ctlg_pet_note.gif` until the page sends one), a white headline beside it
 * and two white text blocks under it. `PageLocalization`'s `pets2` / `pets3` lists send the page's
 * second to fourth texts to `ctlg_text_1` .. `ctlg_text_3`; a text the page does not send keeps
 * its layout caption. No widgets.
 *
 * The two differ in their text widths, the third text's place and style, and `pets3`'s
 * `ctlg_text_3` being one of `LocalizationCatalogWidget.initLinks`' elements - its click goes to
 * `onClickLink`, which has no case for it.
 */
export const CatalogPetsInfoLayoutView = ({ page, layout }: CatalogLayoutProps & { layout: CatalogPetsInfoLayout }) => {
    const teaserUrl = useCatalogPageImage(page, 'ctlg_teaserimg_1', 'catalogue/ctlg_pet_note.gif');
    const t = useTranslation();

    return (
        <Region
            name="ctlg_pets2"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
        >
            <Border
                variant="2"
                tintColor="#8899a2"
                layout={{ position: 'absolute', left: 10, width: 340, top: 10, bottom: 10 }}
            >
                <ThemeImage
                    name="ctlg_teaserimg_1"
                    src={teaserUrl}
                    bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                    layout={{ position: 'absolute', left: 20, width: 57, top: 10, height: 57 }}
                />
                <ThemeText
                    name="ctlg_text_1"
                    text={getCatalogPageText(page, 'ctlg_text_1') ?? t('lorem.title')}
                    textStyle="u_headline_medium"
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: layout.text1Width - 4 }}
                    markup
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 85, width: layout.text1Width, top: 26 }}
                />
                <ThemeText
                    name="ctlg_text_2"
                    text={getCatalogPageText(page, 'ctlg_text_2') ?? t(layout.text2.caption)}
                    textStyle="u_regular"
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: layout.text2.width - 4 }}
                    markup
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 20, width: layout.text2.width, top: 72 }}
                />
                <Region
                    onPointerTap={layout.text3Link ? () => onCatalogPageLink(page, 'ctlg_text_3') : undefined}
                    layout={{ position: 'absolute', left: 20, width: 306, top: layout.text3.top }}
                >
                    <ThemeText
                        name="ctlg_text_3"
                        text={getCatalogPageText(page, 'ctlg_text_3') ?? t(layout.text3.caption)}
                        textStyle={layout.text3.textStyle}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 302 }}
                        markup
                        verticalAlign="top"
                        layout={{ width: 306 }}
                    />
                </Region>
            </Border>
        </Region>
    );
};

/** The `pets2` page, `layout_pets2.xml`; see `CatalogPetsInfoLayoutView`. */
export const CatalogLayoutPets2View = ({ page }: CatalogLayoutProps) => (
    <CatalogPetsInfoLayoutView
        page={page}
        layout={PETS2}
    />
);
