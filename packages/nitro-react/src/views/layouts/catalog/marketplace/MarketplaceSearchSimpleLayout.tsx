import { useTranslation } from '#base/context';
import { BoxLayout, CheckBox, Dropmenu, Region, ThemeText } from '#base/theme';

/** Generated from `1556_marketplace_search_simple_xml` (layout "marketplace_search_simple", 360x120) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MarketplaceSearchSimpleLayoutProps {
    layout?: BoxLayout;
    onCombineUniquesCheckbox?: () => void;
    onSortDropmenu?: () => void;
}

export const MarketplaceSearchSimpleLayout = ({ layout, onCombineUniquesCheckbox, onSortDropmenu }: MarketplaceSearchSimpleLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 360, height: 120, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center' }}>
                <ThemeText
                    text={t('catalog.marketplace.sort_order')}
                    textOptions={{ fill: '#666666', align: 'center' }}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 23, height: 17 }}
                />
                <Dropmenu
                    variant="3"
                    name="sort_dropmenu"
                    onPointerTap={onSortDropmenu}
                    layout={{ position: 'absolute', width: 220, alignSelf: 'center', marginTop: 2, marginBottom: -2, height: 24 }}
                />
                <CheckBox
                    variant="3"
                    name="combine_uniques_checkbox"
                    onPointerTap={onCombineUniquesCheckbox}
                    layout={{ position: 'absolute', left: 10, width: 16, top: 92, height: 15 }}
                />
                <ThemeText
                    text={t('catalog.marketplace.combine_uniques')}
                    textOptions={{ fill: '#666666' }}
                    layout={{ position: 'absolute', left: 29, width: 218, bottom: 12, height: 17 }}
                />
            </Region>
        </Region>
    );
};
