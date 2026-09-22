import { CatalogLayoutProps } from '../CatalogPageRegistry';
import { CatalogPetsInfoLayout, CatalogPetsInfoLayoutView } from './CatalogLayoutPets2View';

/** Where `layout_pets3.xml` differs from `layout_pets2.xml`. */
const PETS3: CatalogPetsInfoLayout = {
    text1Width: 242,
    text2: { width: 307, caption: 'lorem.content' },
    text3: { top: 270, caption: 'lorem.newline', textStyle: 'u_bold' },
    text3Link: true,
};

/**
 * The `pets3` page, `layout_pets3.xml` (`ctlg_pets2`, 360x460) - the pet info page
 * `CatalogPetsInfoLayoutView` draws, with this layout's text widths, its bold third text 30px
 * higher, and that text clickable (`LAYOUT_LINKS`).
 */
export const CatalogLayoutPets3View = ({ page }: CatalogLayoutProps) => (
    <CatalogPetsInfoLayoutView
        page={page}
        layout={PETS3}
    />
);
