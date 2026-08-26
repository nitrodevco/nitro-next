import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `905_chooser_item_xml` (layout "chooser_item", 159x18) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ChooserItemLayoutProps {
    layout?: BoxLayout;
}

export const ChooserItemLayout = ({ layout }: ChooserItemLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 159, height: 18, ...layout }}>
            <Region
                params={131217}
                backgroundColor="#eeeeee"
                layout={{ position: 'absolute', left: 0, width: 159, top: 0, height: 18 }}
            >
                <Region
                    name="itemtext"
                    params={144}
                    layout={{ position: 'absolute', left: 7, width: 152, top: 2, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={t('001_lorem_ipsum_title')} />
                </Region>
            </Region>
        </Region>
    );
};
