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
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 120 }}
            >
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 23, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={t('catalog.marketplace.sort_order')}
                        textOptions={{ fill: '#666666', align: 'center' }}
                    />
                </Region>
                <Dropmenu
                    variant="3"
                    name="sort_dropmenu"
                    params={17}
                    onPointerTap={onSortDropmenu}
                    layout={{ position: 'absolute', left: 70, width: 220, top: 50, height: 24 }}
                />
                <CheckBox
                    variant="3"
                    name="combine_uniques_checkbox"
                    params={17}
                    onPointerTap={onCombineUniquesCheckbox}
                    layout={{ position: 'absolute', left: 10, width: 16, top: 92, height: 15 }}
                />
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 29, width: 218, top: 91, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('catalog.marketplace.combine_uniques')}
                        textOptions={{ fill: '#666666' }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
