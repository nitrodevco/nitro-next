import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `284_instructions_list_item_xml` (layout "instructions_list_item", 236x50) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface InstructionsListItemLayoutProps {
    layout?: BoxLayout;
}

export const InstructionsListItemLayout = ({ layout }: InstructionsListItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 236, height: 50, ...layout }}>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 236, top: 0, height: 50 }}
            >
                <Region
                    name="number"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 19, top: 0, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text="1."
                        textOptions={{ fill: '#1077ac' }}
                    />
                </Region>
                <Region
                    name="text"
                    params={2192}
                    layout={{ position: 'absolute', left: 15, width: 221, top: 0, height: 50, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                />
            </Region>
        </Region>
    );
};
