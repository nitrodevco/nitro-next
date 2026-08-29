import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `1677_textInputWidget_xml` (layout "textInputWidget", 229x71) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TextInputWidgetLayoutProps {
    layout?: BoxLayout;
    textInputWidget?: TextInputWidgetLayoutTextInputWidgetProps;
}

export const TextInputWidgetLayout = ({ layout, textInputWidget }: TextInputWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 229, height: 71, ...layout }}>
            <TextInputWidgetLayoutTextInputWidget {...textInputWidget} />
        </Region>
    );
};

/** Named region `textInputWidget` of TextInputWidgetLayout - configured through the parent's `textInputWidget` prop. */
export interface TextInputWidgetLayoutTextInputWidgetProps {
    captionInputText?: string;
    layout?: BoxLayout;
}

export const TextInputWidgetLayoutTextInputWidget = ({ captionInputText, layout }: TextInputWidgetLayoutTextInputWidgetProps) => {
    return (
        <Region
            name="textInputWidget"
            params={16}
            layout={{ position: 'absolute', left: 61, width: 229, top: 282, height: 71, ...layout }}
        >
            <Region
                name="input_text"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 229, top: 0, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionInputText ?? 'lorem ipsum'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 229 }}
                />
            </Region>
        </Region>
    );
};
