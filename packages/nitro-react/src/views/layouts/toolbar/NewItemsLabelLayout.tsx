import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `1262_new_items_label_xml` (layout "new_items_label", 27x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NewItemsLabelLayoutProps {
    captionNewTextfield?: string;
    layout?: BoxLayout;
}

export const NewItemsLabelLayout = ({ captionNewTextfield, layout }: NewItemsLabelLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 27, height: 20, ...layout }}>
            <Border
                variant="7"
                params={16}
                tintColor="#ee2924"
                layout={{ position: 'absolute', left: 1, width: 27, top: 1, height: 20 }}
            >
                <Region
                    name="new_textfield"
                    params={4194320}
                    layout={{ position: 'absolute', left: 1, width: 22, top: 2, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionNewTextfield ?? 'new'}
                        textStyle="text-style-u-small"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Border>
        </Region>
    );
};
