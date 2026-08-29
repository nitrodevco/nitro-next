import { BoxLayout, Region } from '#base/theme';
import { TextInputWidget2, TextInputWidget2Props } from '#base/views/layouts/catalog/widgets/TextInputWidget2';

/** Generated from `1677_textInputWidget_xml` (layout "textInputWidget", 229x71) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TextInputWidgetLayoutProps {
    layout?: BoxLayout;
    textInputWidget?: TextInputWidget2Props;
}

export const TextInputWidgetLayout = ({ layout, textInputWidget }: TextInputWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 229, height: 71, ...layout }}>
            <TextInputWidget2
                layout={{ position: 'absolute', left: 61, width: 229, top: 282, height: 71 }}
                {...textInputWidget}
            />
        </Region>
    );
};
