/**
 * Where a catalogue page's texts and images go - Flash's `PageLocalization`. The server sends a
 * page's localization as two plain lists (`CatalogPageMessage`'s images and texts); the layout
 * code decides which element each entry fills. `LocalizationCatalogWidget.initLocalizables` walks
 * both lists and puts entry `i` into the element `getTextElementName(i, layoutCode)` /
 * `getImageElementName(i, layoutCode)` names - `catalog.header.description` and
 * `catalog.header.image` are the window's header, every other name an element of the page layout.
 *
 * A layout view reads its texts with `getCatalogPageText(page, '<element name>')` and its images
 * with `getCatalogPageImage`, so the element names in a view are the layout's own. The tables are
 * Flash's, entry for entry; `drift/constants.py` holds them to `PageLocalization.as`.
 */
import { ICatalogPageLocalization } from '@nitrodevco/nitro-api';

export const CATALOG_HEADER_IMAGE = 'catalog.header.image';
export const CATALOG_HEADER_ICON = 'catalog.header.icon';
export const CATALOG_HEADER_TITLE = 'catalog.header.title';
export const CATALOG_HEADER_DESCRIPTION = 'catalog.header.description';

export const DEFAULT_TEXT_FIELDS: readonly string[] = [ 'catalog.header.description', 'ctlg_description', 'ctlg_special_txt', 'ctlg_text_1', 'ctlg_text_2' ];

export const DEFAULT_IMAGE_FIELDS: readonly string[] = [ 'catalog.header.image', 'ctlg_teaserimg_1', 'ctlg_special_img', 'ctlg_teaserimg_2', 'ctlg_teaserimg_3' ];

export const LAYOUTS_IMAGE_FIELDS: Readonly<Record<string, readonly string[]>> = {
    frontpage4: [ 'catalog.header.image', 'ctlg_teaserimg_1' ],
};

export const LAYOUTS_TEXT_FIELDS: Readonly<Record<string, readonly string[]>> = {
    camera1: [ 'catalog.header.description', 'ctlg_text_1' ],
    presents: [ 'catalog.header.description', 'ctlg_text1' ],
    pets: [ 'catalog.header.description', 'ctlg_text_1', 'ctlg_text_2', 'ctlg_text_3' ],
    pets2: [ 'catalog.header.description', 'ctlg_text_1', 'ctlg_text_2', 'ctlg_text_3' ],
    pets3: [ 'catalog.header.description', 'ctlg_text_1', 'ctlg_text_2', 'ctlg_text_3' ],
    info_rentables: [ 'catalog.header.description', 'ctlg_text_1', 'ctlg_text_2', 'ctlg_text_3', 'ctlg_text_4', 'ctlg_text_5' ],
    info_duckets: [ 'ctlg_description' ],
    info_loyalty: [ 'ctlg_description' ],
    trophies: [ 'trophy.description', 'trophy.enscription' ],
    frontpage4: [ 'ctlg_txt1', 'ctlg_txt2' ],
    builders_club_frontpage: [ 'ctlg_description' ],
    builders_club_addons: [ 'ctlg_description' ],
    builders_club_loyalty: [ 'ctlg_description' ],
};

/**
 * The elements `LocalizationCatalogWidget.initLinks` makes clickable, by layout code; `onClickLink`
 * says what each does - `onCatalogPageLink` in `commands/catalogLinkCommands.ts`, which a layout
 * view calls from the element's click.
 *
 * `initStaticImages`, the widget's third part, gives every element tagged `STATIC_IMAGE` the
 * catalogue image of its own name. No layout of the client carries that tag (the info pages'
 * illustrations are tagged `S`), so it finds nothing and has no port.
 */
export const LAYOUT_LINKS: Readonly<Record<string, readonly string[]>> = {
    club_buy: [ 'club_link' ],
    mad_money: [ 'ctlg_madmoney_button' ],
    monkey: [ 'ctlg_teaserimg_1_region', 'ctlg_special_img_region' ],
    niko: [ 'ctlg_teaserimg_1_region', 'ctlg_special_img_region' ],
    pets3: [ 'ctlg_text_3' ],
};

/** The page a localization belongs to: its layout code and what the server sent. */
export interface CatalogLocalizedPage {
    readonly layoutCode: string;
    readonly localization: ICatalogPageLocalization;
}

/** `getTextElementName`: the element text `index` goes into, or '' past the layout's list. */
export const getTextElementName = (index: number, layoutCode: string) => (LAYOUTS_TEXT_FIELDS[layoutCode] ?? DEFAULT_TEXT_FIELDS)[index] ?? '';

/** `getImageElementName`: the element image `index` goes into, or '' past the layout's list. */
export const getImageElementName = (index: number, layoutCode: string) => (LAYOUTS_IMAGE_FIELDS[layoutCode] ?? DEFAULT_IMAGE_FIELDS)[index] ?? '';

/**
 * The text the page puts into `elementName` - the entry `getTextElementName` sends there (each
 * layout's list names an element once) - with `\r\n` turned into `\n` as `initLocalizables` does,
 * or `undefined` when no entry does (the element then keeps its layout caption).
 */
export const getCatalogPageText = (page: CatalogLocalizedPage | undefined, elementName: string): string | undefined => {
    if (!page) return undefined;

    const texts = page.localization.textDatas;

    for (let index = 0; index < texts.length; index++) {
        if (getTextElementName(index, page.layoutCode) === elementName) return texts[index].replace(/\r\n/g, '\n');
    }

    return undefined;
};

/** The catalogue image name the page puts into `elementName`, or `undefined`; an empty entry sets nothing, as in Flash. */
export const getCatalogPageImage = (page: CatalogLocalizedPage | undefined, elementName: string): string | undefined => {
    if (!page) return undefined;

    const images = page.localization.imageDatas;

    for (let index = 0; index < images.length; index++) {
        if ((getImageElementName(index, page.layoutCode) === elementName) && images[index].length) return images[index];
    }

    return undefined;
};

/** `getColorUintFromText`: text `index` read as a colour (`#rrggbb` or a number), 0 when there is none. */
export const getCatalogPageColor = (page: CatalogLocalizedPage, index: number) => {
    const text = page.localization.textDatas[index];

    if (text === undefined) return 0;

    const value = Number(text.replace('#', '0x'));

    return isNaN(value) ? 0 : (value >>> 0);
};

/** `hasLinks` / `getLinks`: the clickable elements of a layout. */
export const getCatalogPageLinks = (layoutCode: string): readonly string[] => LAYOUT_LINKS[layoutCode] ?? [];
