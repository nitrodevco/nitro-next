import { BoxLayout, Bubble, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1132_variable_value_info_bubble_xml` (layout "variable_value_info_bubble", 60x39) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface VariableValueInfoBubbleLayoutProps {
    layout?: BoxLayout;
}

export const VariableValueInfoBubbleLayout = ({ layout }: VariableValueInfoBubbleLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 60, height: 39, ...layout }}>
            <Bubble
                variant="5"
                name="border"
                tintColor="#ade6ff"
                layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 39 }}
            >
                <ThemeImage
                    params={16}
                    src={undefined}
                    layout={{ position: 'absolute', left: 2, width: 16, top: 4, height: 14 }}
                />
                <Region
                    name="value"
                    params={4194320}
                    layout={{ position: 'absolute', left: 11, width: 22, top: 3, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text="505"
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Bubble>
        </Region>
    );
};
