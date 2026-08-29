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
                tintColor="#ee2924"
                layout={{ position: 'absolute', left: 1, right: -1, top: 1, bottom: -1 }}
            >
                <Region
                    name="new_textfield"
                    layout={{ position: 'absolute', left: 1, top: 2, bottom: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
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
